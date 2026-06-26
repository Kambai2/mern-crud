import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api', userRoutes);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }
  next(err);
});

const MONGO_URI = (process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGODB_URL || process.env.DATABASE_URL || '')
  .replace(/^\s+|\s+$/g, '')
  .replace(/^['"]|['"]$/g, '');

export const connectToDatabase = async () => {
  if (!MONGO_URI) {
    throw new Error('Missing MongoDB connection string.');
  }

  if (globalThis.__mongooseConnection && globalThis.__mongooseConnection.readyState === 1) {
    return globalThis.__mongooseConnection;
  }

  globalThis.__mongooseConnection = await mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  });

  return globalThis.__mongooseConnection;
};

export const startServer = async (port = process.env.PORT || 5000) => {
  await connectToDatabase();
  return app.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
};

export default app;
