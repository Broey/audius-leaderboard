// lib/fetchAudiusUser.js
export default async function fetchAudiusUser(handle) {
  try {
    const response = await fetch(`/api/audius?handle=${handle}`);
    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("Failed to fetch Audius user:", handle, error);
    return null;
  }
}
