import app, { connectToDatabase } from '../app.js';

export default async function handler(req, res) {
  await connectToDatabase();
  return app(req, res);
}
