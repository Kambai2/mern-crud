import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js';

// Load env first
dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', userRoutes);

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }
  next();
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = (process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGODB_URL || process.env.DATABASE_URL || '').replace(/^\s+|\s+$/g, '').replace(/^['"]|['"]$/g, '');

if (!MONGO_URI) {
  console.error('Missing MONGO_URI environment variable.');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message || err);
    process.exit(1);
  });
    