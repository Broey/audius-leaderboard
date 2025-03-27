import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("/api/getLeaderboard");
      const data = await response.json();
      setUsers(data);
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {users.map((user) => (
          <li key={user.handle}>
            <img src={user.profilePicture} alt={user.handle} />
            <a href={user.link} target="_blank" rel="noopener noreferrer">
              {user.handle}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
