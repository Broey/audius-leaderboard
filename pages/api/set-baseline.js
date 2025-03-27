// pages/api/set-baseline.js
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { handle, season, streams, likes, reposts, comments } = req.body;
  if (!handle || !season) {
    return res
      .status(400)
      .json({ message: 'Missing required fields (handle, season).' });
  }

  try {
    // Check if there's already a baseline for this handle & season
    const existing = await prisma.baseline.findFirst({
      where: {
        handle: handle,
        season: season,
      },
    });

    if (existing) {
      // Update existing baseline
      const updated = await prisma.baseline.update({
        where: { id: existing.id },
        data: {
          streams: streams || 0,
          likes: likes || 0,
          reposts: reposts || 0,
          comments: comments || 0,
          baselineSetAt: new Date(),
        },
      });
      return res
        .status(200)
        .json({ message: 'Baseline updated successfully!', baseline: updated });
    } else {
      // Create new baseline
      const created = await prisma.baseline.create({
        data: {
          handle,
          season,
          streams: streams || 0,
          likes: likes || 0,
          reposts: reposts || 0,
          comments: comments || 0,
        },
      });
      return res
        .status(200)
        .json({ message: 'Baseline created successfully!', baseline: created });
    }
  } catch (error) {
    console.error('Error setting baseline:', error);
    return res.status(500).json({ message: 'Error setting baseline.' });
  }
}
