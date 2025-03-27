// pages/api/getLeaderboard.js
import prisma from '../../lib/prisma';
import fetchAudiusUser from '../../lib/fetchAudiusUser';

// Example weights
const WEIGHT_STREAMS = 0.01;
const WEIGHT_LIKES = 1;
const WEIGHT_REPOSTS = 5;
const WEIGHT_COMMENTS = 2;
const TOP5_BONUS = 50;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // e.g. ?season=S1
  const { season = 'S1' } = req.query;

  // 1) Fetch baselines for this season from the DB
  let seasonBaselines;
  try {
    seasonBaselines = await prisma.baseline.findMany({
      where: { season },
    });
  } catch (error) {
    console.error('Error fetching baselines from DB:', error);
    return res.status(500).json({ message: 'Error fetching baselines.' });
  }

  // 2) Build the leaderboard array
  const leaderboardData = [];
  for (const baseline of seasonBaselines) {
    const { id, handle, streams: baseStreams, likes: baseLikes, reposts: baseReposts, comments: baseComments } = baseline;

    // Fetch current stats from Audius
    let currentStats = { streams: 0, likes: 0, reposts: 0, comments: 0 };
    try {
      const userData = await fetchAudiusUser(handle);
      currentStats.streams = userData?.play_count || 0;
      currentStats.likes = userData?.likes_count || 0;
      currentStats.reposts = userData?.repost_count || 0;
      currentStats.comments = userData?.comment_count || 0;
    } catch (err) {
      console.error(`Error fetching current stats for ${handle}:`, err);
    }

    // Calculate deltas
    const deltaStreams = currentStats.streams - baseStreams;
    const deltaLikes = currentStats.likes - baseLikes;
    const deltaReposts = currentStats.reposts - baseReposts;
    const deltaComments = currentStats.comments - baseComments;

    // Example: top5Count logic (placeholder)
    const top5Count = 0;

    // Compute score
    const score =
      WEIGHT_STREAMS * deltaStreams +
      WEIGHT_LIKES * deltaLikes +
      WEIGHT_REPOSTS * deltaReposts +
      WEIGHT_COMMENTS * deltaComments +
      top5Count * TOP5_BONUS;

    leaderboardData.push({
      id,
      handle,
      baseStreams,
      baseLikes,
      baseReposts,
      baseComments,
      currentStreams: currentStats.streams,
      currentLikes: currentStats.likes,
      currentReposts: currentStats.reposts,
      currentComments: currentStats.comments,
      deltaStreams,
      deltaLikes,
      deltaReposts,
      deltaComments,
      score,
    });
  }

  // 3) Sort by score descending and return
  leaderboardData.sort((a, b) => b.score - a.score);
  return res.status(200).json(leaderboardData);
}
