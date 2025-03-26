import { useState } from "react";

export default function SelfReportForm() {
  const [handle, setHandle] = useState("");
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!handle || !link) {
      setMessage("Please provide both handle and link.");
      return;
    }

    try {
      const response = await fetch("/api/submitHandle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ handle, link }),
      });

      if (response.ok) {
        setMessage("Your handle has been submitted successfully!");
      } else {
        setMessage("Failed to submit your handle.");
      }
    } catch (error) {
      setMessage("An error occurred while submitting your handle.");
    }
  };

  return (
    <div>
      <h1>Submit Your Audius Handle</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Audius Handle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        />
        <input
          type="url"
          placeholder="Audius Profile Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
