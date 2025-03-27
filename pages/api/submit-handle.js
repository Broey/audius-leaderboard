// pages/api/submit-handle.js
import prisma from '../../lib/prisma';
import fetchAudiusUser from '../../lib/fetchAudiusUser';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  let { handle, profileLink } = req.body;
  if (!handle || !profileLink) {
    return res.status(400).json({ message: 'Missing handle or profile link.' });
  }

  // Normalize the handle: remove leading '@' and convert to lowercase
  handle = handle.replace(/^@/, '').toLowerCase();

  try {
    // Fetch user data from Audius
    const userData = await fetchAudiusUser(handle);
    if (!userData) {
      return res.status(400).json({ message: 'Audius user not found or invalid.' });
    }

    // Use actual field names from the Audius API.
    // We assume:
    // - userData.track_count represents the number of tracks (used as "streams")
    // - userData.likes_count represents likes (if provided; if not, default to 0)
    // - userData.repost_count represents reposts
    // - userData.comment_count represents comments (if provided; if not, default to 0)
    const streams = userData.track_count || 0;
    const likes = userData.likes_count || 0;
    const reposts = userData.repost_count || 0;
    const comments = userData.comment_count || 0;

    // For example, you might want to prevent accounts with 0 tracks.
    // Uncomment the block below if desired.
    /*
    if (streams === 0) {
      return res.status(400).json({ message: 'Audius account appears inactive (0 tracks).' });
    }
    */

    // Hard-code the season for now; later this can be dynamic.
    const season = 'S1';

    // Check if a baseline already exists for this handle and season.
    const existingBaseline = await prisma.baseline.findFirst({
      where: { handle, season },
    });

    let baseline;
    if (existingBaseline) {
      // Update the existing baseline record.
      baseline = await prisma.baseline.update({
        where: { id: existingBaseline.id },
        data: {
          streams,
          likes,
          reposts,
          comments,
          baselineSetAt: new Date(),
        },
      });
    } else {
      // Create a new baseline record.
      baseline = await prisma.baseline.create({
        data: {
          handle,
          season,
          streams,
          likes,
          reposts,
          comments,
        },
      });
    }

    return res.status(200).json({
      message: 'User submitted and baseline set successfully!',
      baseline,
    });
  } catch (error) {
    console.error('Error in submit-handle:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
}
