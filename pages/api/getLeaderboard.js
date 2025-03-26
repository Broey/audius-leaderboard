// pages/api/getLeaderboard.js
export default async function handler(req, res) {
  try {
    // Here you fetch the stored user data (could be from DB or in-memory)
    const leaderboardData = await getLeaderboardData();
    return res.status(200).json(leaderboardData);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch leaderboard." });
  }
}

async function getLeaderboardData() {
  // Here we return a sample leaderboard or fetch it from the database
  return [
    { handle: "broeybeats", profilePicture: "https://example.com/image.jpg", link: "https://audius.co/broeybeats" },
    // More users can be added here dynamically
  ];
}
