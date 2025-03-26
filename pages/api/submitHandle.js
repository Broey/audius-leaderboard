// pages/api/submitHandle.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { handle, link } = req.body;

    if (!handle || !link) {
      return res.status(400).json({ error: "Missing handle or link." });
    }

    try {
      // Fetch Audius user data based on handle
      const user = await fetchAudiusUser(handle);

      if (!user) {
        return res.status(404).json({ error: "Handle not found on Audius." });
      }

      // Here you could save the user to the database or store it in-memory
      // For now, we'll simulate a DB call with a simple object
      saveUserData({ handle, link, profilePicture: user.profile_picture['150x150'] });

      return res.status(200).json({ message: "Handle submitted successfully." });
    } catch (error) {
      console.error("Failed to fetch Audius user:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed." });
  }
}

async function fetchAudiusUser(handle) {
  const response = await fetch(`https://discoveryprovider.audius.co/v1/users?handle=${handle}&app_name=audius_leaderboard_app`);
  const data = await response.json();
  return data?.data?.[0] || null;
}

function saveUserData(userData) {
  // Here we can simulate saving the data (or save to a database like MongoDB)
  console.log("Saving user data:", userData);
}
