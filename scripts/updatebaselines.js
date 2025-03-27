// scripts/updateBaselines.js
const fs = require('fs');
const path = require('path');
const fetchAudiusUser = require('../lib/fetchAudiusUser').default;
 // Adjust path if necessary

// Define your demo list of artists
const demoArtists = [
  { handle: 'broeybeats' },
  { handle: 'chillhopmusic' },
  { handle: 'dreameaterism' },
  { handle: 'sadboysnow' },
  { handle: 'phuture' },
  { handle: 'underbelly' },
  { handle: 'ellzoofficial' },
  { handle: 'laxcitymusic' },
  { handle: 'aedhusmusic' },
  { handle: 'manhattanbeats' }
];

const season = 'S1'; // Set the current season
const baselinesFilePath = path.join(process.cwd(), 'data', 'baselines.json');

// Helper function: Read existing baselines from the JSON file
function readBaselines() {
  if (fs.existsSync(baselinesFilePath)) {
    const fileData = fs.readFileSync(baselinesFilePath, 'utf8');
    try {
      return JSON.parse(fileData);
    } catch (err) {
      console.error('Error parsing baselines.json:', err);
      return [];
    }
  }
  return [];
}

// Helper function: Write the baselines array back to the file
function writeBaselines(baselines) {
  fs.writeFileSync(baselinesFilePath, JSON.stringify(baselines, null, 2), 'utf8');
}

// Main async function to update baselines for demo artists
async function updateBaselines() {
  let baselines = readBaselines();
  
  for (const artist of demoArtists) {
    const handle = artist.handle;
    let userData;
    
    try {
      userData = await fetchAudiusUser(handle);
    } catch (err) {
      console.error(`Error fetching data for ${handle}:`, err);
      continue;
    }
    
    // Extract baseline stats from userData (adjust the field names if needed)
    const baselineEntry = {
      handle,
      season,
      streams: userData?.play_count || 0,
      likes: userData?.likes_count || 0,
      reposts: userData?.repost_count || 0,
      comments: userData?.comment_count || 0,
      baselineSetAt: new Date().toISOString(),
    };
    
    // Check if an entry for this handle and season already exists, update if so
    const index = baselines.findIndex(b => b.handle === handle && b.season === season);
    if (index >= 0) {
      baselines[index] = baselineEntry;
    } else {
      baselines.push(baselineEntry);
    }
    
    console.log(`Baseline set for ${handle}`);
  }
  
  // Write the updated baselines back to the file
  writeBaselines(baselines);
  console.log('All baselines updated.');
}

// Run the update function
updateBaselines();
