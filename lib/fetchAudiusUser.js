// lib/fetchAudiusUser.js

export default async function fetchAudiusUser(handle) {
  // 1) Remove leading '@' and lowercase the handle
  const sanitizedHandle = handle.replace(/^@/, '').toLowerCase();

  // 2) Use the "get user by handle" endpoint with a chosen app_name
  const url = `https://discoveryprovider.audius.co/v1/users/handle/${sanitizedHandle}?app_name=leaderboard`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      // If Audius returns 404 or another error, throw so we return null later
      throw new Error(`Failed to fetch user: ${res.status}`);
    }

    const data = await res.json();
    // 3) data.data should be the single user object if found
    if (data && data.data) {
      return data.data; // Return the user object
    }
    return null; // If data.data is null or undefined
  } catch (error) {
    console.error('Error fetching Audius user:', error);
    return null; // Return null on error
  }
}
