export default async function handler(req, res) {
  const mod = await import('../server/app.js');
  const app = mod.default;
  const connectToDatabase = mod.connectToDatabase;
  await connectToDatabase();
  return app(req, res);
}
