// pages/api/get-submissions.js

// Import the helper function from submit-handle.js
useEffect(() => {
    async function load() {
      const res = await fetch("/api/get-submissions");
      const data = await res.json();
      setSubmissions(data);
    }
    load();
  }, []);
  

export default function handler(req, res) {
  // Allow only GET requests
  if (req.method === 'GET') {
    // Retrieve the in-memory submissions array
    const allSubs = getSubmissions();
    // Return the submissions as JSON
    return res.status(200).json(allSubs);
  }

  // For any non-GET request, return a 405 error
  return res.status(405).json({ message: 'Method not allowed' });
}
