// pages/api/create-badge.js
import prisma from '../../lib/prisma';

/**
 * This endpoint lets you create (or upsert) a badge in the Badge table.
 * Example POST payload:
 * {
 *   "name": "Season Winner",
 *   "description": "Awarded to the top artist of the season"
 * }
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Missing required field: name' });
  }

  try {
    // Upsert means: if a badge with this name exists, update it; otherwise create a new one.
    const badge = await prisma.badge.create({
        data: {
          name,
          description: description || null,
        },
      });
      
    return res.status(200).json({
      message: 'Badge created or updated successfully!',
      badge,
    });
  } catch (error) {
    console.error('Error creating badge:', error); // <--- Must be here!
    return res.status(500).json({ message: 'Server error.' });
  }
  
}
