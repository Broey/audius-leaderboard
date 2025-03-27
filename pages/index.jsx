// pages/index.jsx
import { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ScrollArea } from "../components/ui/scroll-area";
import { Switch } from "../components/ui/switch";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Transition } from "@headlessui/react";
import fetchAudiusUser from "../lib/fetchAudiusUser";
import SelfReportForm from "../components/SelfReportForm";

export default function Leaderboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [season, setSeason] = useState("S1");
  const [mounted, setMounted] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [profileImages, setProfileImages] = useState({});
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    async function loadSubs() {
      const res = await fetch("/api/get-submissions");
      const data = await res.json();
      setSubmissions(data);
    }
    loadSubs();
  }, []);

  useEffect(() => {
    setMounted(true);
    fetchLeaderboard();
  }, [season]);

  async function fetchLeaderboard() {
    try {
      const res = await fetch(`/api/getLeaderboard?season=${season}`);
      if (!res.ok) throw new Error("Failed to fetch leaderboard");
      const data = await res.json();
      setLeaderboardData(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function loadProfileImages() {
      if (leaderboardData.length === 0) return;
      const imageMap = {};
      for (const artist of leaderboardData) {
        try {
          const user = await fetchAudiusUser(artist.handle);
          if (user?.profile_picture) {
            if (
              typeof user.profile_picture === "object" &&
              user.profile_picture["150x150"]
            ) {
              imageMap[artist.handle] = user.profile_picture["150x150"];
            } else if (typeof user.profile_picture === "string") {
              imageMap[artist.handle] = user.profile_picture;
            }
          }
        } catch (err) {
          console.error(`Error fetching profile image for ${artist.handle}`, err);
        }
      }
      setProfileImages(imageMap);
    }
    loadProfileImages();
  }, [leaderboardData]);

  async function fetchSubmissions() {
    try {
      const res = await fetch("/api/get-submissions");
      if (!res.ok) throw new Error("Failed to fetch submissions");
      const data = await res.json();
      setSubmissions(data);
    } catch (err) {
      console.error(err);
    }
  }

  const handleFormSuccess = () => {
    setShowLeaderboard(true);
    fetchSubmissions();
    fetchLeaderboard();
  };

  const leaderboardUI = (
    <div
      className={`max-w-4xl mx-auto px-4 sm:px-6 py-6 transition-colors duration-300 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div className="mb-4 sm:mb-0 relative z-10">
          <Select value={season} onValueChange={(val) => setSeason(val)}>
            <SelectTrigger
              className={`w-32 ${
                darkMode
                  ? "bg-black text-white border-white/20"
                  : "bg-white text-black border-black/20"
              }`}
            >
              <SelectValue placeholder="Season" />
            </SelectTrigger>
            <SelectContent
              className={`${
                darkMode ? "bg-black text-white" : "bg-white text-black"
              } z-50`}
            >
              <SelectItem value="S1">Season 1</SelectItem>
              <SelectItem value="S2">Season 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <h1 className="text-3xl font-bold text-center w-full sm:w-auto">
          🎷 Audius Leaderboard - {season}
        </h1>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <span className="text-sm">Light</span>
          <Switch
            checked={darkMode}
            onCheckedChange={() => setDarkMode(!darkMode)}
          />
          <span className="text-sm">Dark</span>
        </div>
      </div>

      <ScrollArea className="h-[70vh]">
        <div className="space-y-4">
          {mounted &&
            leaderboardData.map((artist, index) => {
              const displayHandle = artist.handle.replace(/^@/, "");
              return (
                <Card
                  key={index}
                  className="border border-white/10 hover:shadow-lg hover:scale-[1.01] transition-transform duration-200"
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-xl font-bold w-6 text-right">
                        {index + 1}
                      </div>
                      <Avatar>
                        {profileImages[artist.handle] ? (
                          <img
                            src={profileImages[artist.handle]}
                            alt={artist.handle}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <AvatarFallback>
                            <div className="w-full h-full flex items-center justify-center bg-gray-500 text-white rounded-full text-sm">
                              {artist.handle.charAt(0).toUpperCase()}
                            </div>
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <div className="text-lg font-semibold">
                          <a
                            href={`https://audius.co/${displayHandle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {artist.handle}
                          </a>
                        </div>
                        <div className="text-muted-foreground text-sm">
                          Score: {artist.score.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-400">
                          Δ Streams: {artist.deltaStreams} | Δ Likes: {artist.deltaLikes} | Δ Reposts: {artist.deltaReposts} | Δ Comments: {artist.deltaComments}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {artist.score > 100 && (
                        <Badge variant="default">🔥 High Score</Badge>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
        </div>
      </ScrollArea>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">User Submissions</h2>
        {submissions.length === 0 ? (
          <p>No user submissions yet.</p>
        ) : (
          <div className="space-y-2">
            {submissions.map((sub, idx) => (
              <div key={idx} className="border p-2 rounded hover:shadow">
                <p>
                  <strong>Handle:</strong> {sub.handle}
                </p>
                <p>
                  <strong>Profile Link:</strong> {sub.profileLink}
                </p>
                <p className="text-xs text-gray-400">
                  Submitted at: {new Date(sub.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="mt-8 text-center text-xs opacity-60">
        Built by Broey using the Audius API 🚀
      </footer>
    </div>
  );

  return (
    <>
      <Transition
        show={!showLeaderboard}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
          <SelfReportForm onSuccess={handleFormSuccess} />
        </div>
      </Transition>

      <Transition
        show={showLeaderboard}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        {leaderboardUI}
      </Transition>
    </>
  );
}
