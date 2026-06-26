import app, { connectToDatabase } from '../server/app.js';

export default async function handler(req, res) {
  await connectToDatabase();
  return app(req, res);
}
