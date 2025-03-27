// components/SelfReportForm.jsx
import React, { useState } from 'react';

export default function SelfReportForm({ onSuccess }) {
  const [handle, setHandle] = useState('');
  const [profileLink, setProfileLink] = useState('');
  const [message, setMessage] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setMessage('');

    // 1) Validate or just proceed
    if (!handle || !profileLink) {
      setMessage('Please enter both handle and link.');
      return;
    }

    // 2) POST to your submit-handle API
    try {
      const res = await fetch('/api/submit-handle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle, profileLink }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || 'Failed to submit handle.');
      }

      // 3) If success, call onSuccess to notify the parent
      setMessage('Handle submitted successfully!');
      onSuccess();  // <-- This tells the parent to re-fetch leaderboard
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="p-4 bg-gray-800 text-white rounded">
      <h2 className="text-xl font-bold mb-2">Submit Your Audius Handle</h2>
      <form onSubmit={onSubmit}>
        <label className="block mb-2">
          Audius Handle
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            className="w-full p-2 mt-1 mb-4 rounded text-black"
            placeholder="Type Your Handle Without @"
          />
        </label>

        <label className="block mb-2">
          Profile Link
          <input
            type="url"
            value={profileLink}
            onChange={(e) => setProfileLink(e.target.value)}
            className="w-full p-2 mt-1 mb-4 rounded text-black"
            placeholder="https://audius.co/username"
          />
        </label>

        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
        >
          Submit
        </button>
      </form>

      {message && (
        <p className="mt-2 text-sm">
          {message}
        </p>
      )}
    </div>
  );
}
