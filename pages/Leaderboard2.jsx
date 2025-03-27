"use client";
import { useState } from "react";
import UserSubmissionForm from "../components/SelfReportForm";

export default function Leaderboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [season, setSeason] = useState("S1");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [submittedUsers, setSubmittedUsers] = useState([]);

  const handleSubmissionSuccess = (user) => {
    setSubmittedUsers((prev) => [...prev, user]);
    setShowLeaderboard(true);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-black text-white" : "bg-white text-black"} p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Audius Leaderboard</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-sm px-4 py-2 border rounded"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <p className="mb-4">Season: {season}</p>

      {!showLeaderboard ? (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Submit Your Audius Profile</h2>
          <UserSubmissionForm onSuccess={handleSubmissionSuccess} />
        </div>
      ) : (
        <div className="mt-10 space-y-6">
          <h2 className="text-xl font-semibold">Leaderboard (Demo)</h2>
          <ul className="space-y-2">
            {submittedUsers.map((user, index) => (
              <li
                key={index}
                className="border p-4 rounded bg-white text-black dark:bg-zinc-900 dark:text-white"
              >
                <p className="font-semibold">{user.handle}</p>
                <a
                  href={user.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  {user.profileUrl}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
