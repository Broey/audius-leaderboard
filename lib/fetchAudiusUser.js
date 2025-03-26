export default async function fetchAudiusUser(handle) {
 const url = `https://api.audius.co/v1/users?handle=${handle}&app_name=leaderboard`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data?.data?.[0] || null;
  } catch (error) {
    console.error("Failed to fetch Audius user:", handle, error);
    return null;
  }
}
