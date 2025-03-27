// pages/api/get-baselines.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const filePath = path.join(process.cwd(), 'data', 'baselines.json');
  try {
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      const baselines = JSON.parse(fileData);
      return res.status(200).json(baselines);
    } else {
      // If file doesn't exist, return an empty array
      return res.status(200).json([]);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error reading baselines file.' });
  }
}
