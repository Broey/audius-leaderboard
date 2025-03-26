export default async function fetchAudiusUser(handle) {
  const url = `https://api.audius.co/v1/users?handle=${handle}&app_name=leaderboard`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const user = data?.data?.[0] || null;
    
    // Check both profilePicture and profile_picture keys for the image URL
    if (user) {
      const imageUrl = user.profile_picture || user.profilePicture;
      return imageUrl ? imageUrl : null;
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch Audius user:", handle, error);
    return null;
  }
}
