import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

const app = express();
app.use(bodyParser.json());
// Load environment variables as early as possible
dotenv.config();

const PORT = process.env.PORT || 5000;
// Accept several common env names so existing .env files work
let MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGODB_URL || process.env.DATABASE_URL;

// Normalize the URI: trim whitespace and strip surrounding quotes if present
if (typeof MONGO_URI === 'string') {
  MONGO_URI = MONGO_URI.trim();
  if ((MONGO_URI.startsWith('"') && MONGO_URI.endsWith('"')) || (MONGO_URI.startsWith("'") && MONGO_URI.endsWith("'"))) {
    MONGO_URI = MONGO_URI.slice(1, -1);
  }
}

if (!MONGO_URI) {
  console.error('\nERROR: Missing MongoDB connection string.');
  console.error('Set `MONGO_URI` in a `.env` file or in your environment variables.');
  console.error('Example .env content: MONGO_URI=mongodb://127.0.0.1:27017/mern-crud\n');
  process.exit(1);
}

// Connect with default options (modern MongoDB driver ignores old flags)
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:');
    console.error(error);
    process.exit(1);
  });
    