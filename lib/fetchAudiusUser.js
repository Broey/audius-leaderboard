export default async function fetchAudiusUser(handle) {
  try {
    const response = await fetch(`/api/fetch-user?handle=${handle}`);
    if (!response.ok) {
      console.error("Failed to fetch from internal API:", response.status);
      return null;
    }

    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("Failed to fetch Audius user:", handle, error);
    return null;
  }
}
