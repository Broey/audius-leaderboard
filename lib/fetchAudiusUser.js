// lib/fetchAudiusUser.js
export default async function fetchAudiusUser(handle) {
  try {
    const response = await fetch(`https://api.audius.co/v1/users?handle=${handle}&app_name=audius_leaderboard_app`); // Added app_name
    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("Failed to fetch Audius user:", handle, error);
    return null;
  }
}
