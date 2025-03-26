// pages/api/audius.js
export default async function handler(req, res) {
  const { handle } = req.query;

  if (!handle) {
    return res.status(400).json({ error: "Missing handle" });
  }

  try {
    const apiUrl = `https://discoveryprovider.audius.co/v1/users?handle=${handle}&app_name=leaderboard`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    return res.status(200).json(data?.data?.[0] || null);
  } catch (error) {
    console.error("API Route Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
