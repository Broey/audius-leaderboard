// pages/index.jsx
import { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ScrollArea } from "../components/ui/scroll-area";
import { Switch } from "../components/ui/switch";
import { getProfileImageUrl } from "../lib/getProfileImage";

import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const leaderboardData = [
  {
    rank: 1,
    artist: "Broey.",
    handle: "broeybeats",
    score: 96.3,
    top5: 2,
    accolades: ["🏇 Season Winner", "🔥 2x Top 5"],
  },
  {
    rank: 2,
    artist: "chillhopmusic",
    handle: "chillhopmusic",
    score: 78.9,
    top5: 1,
    accolades: ["🥈 Runner-Up", "🔥 Top 5"],
  },
  {
    rank: 3,
    artist: "dreameaterism",
    handle: "dreameaterism",
    score: 72.4,
    top5: 0,
    accolades: ["🚀 Breakout Artist"],
  },
  {
    rank: 4,
    artist: "sadboysnow",
    handle: "sadboysnow",
    score: 70.1,
    top5: 1,
  },
  {
    rank: 5,
    artist: "phuture",
    handle: "phuture",
    score: 68.8,
    top5: 0,
  },
  {
    rank: 6,
    artist: "underbelly",
    handle: "underbelly",
    score: 52.5,
    top5: 0,
  },
  {
    rank: 7,
    artist: "ellzo",
    handle: "ellzoofficial",
    score: 50.7,
    top5: 0,
  },
  {
    rank: 8,
    artist: "laxcity",
    handle: "laxcitymusic",
    score: 49.2,
    top5: 0,
  },
  {
    rank: 9,
    artist: "aedhus",
    handle: "aedhusmusic",
    score: 47.8,
    top5: 0,
  },
  {
    rank: 10,
    artist: "manhattanbeats",
    handle: "manhattanbeats",
    score: 47.1,
    top5: 0,
  },
];

export default function Leaderboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [season, setSeason] = useState("S1");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`relative z-0 max-w-4xl mx-auto px-4 sm:px-6 py-6 transition-colors duration-300 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 relative z-10">
        <div className="mb-4 sm:mb-0">
          <Select value={season} onValueChange={(val) => setSeason(val)}>
            <SelectTrigger
              className={`w-32 ${darkMode ? "bg-black text-white border-white/20" : "bg-white text-black border-black/20"}`}
            >
              <SelectValue placeholder="Season" />
            </SelectTrigger>
            <SelectContent className={`${darkMode ? "bg-black text-white" : "bg-white text-black"} z-50`} style={{ position: "absolute", top: "100%" }}>
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
            leaderboardData.map((artist) => (
              <Card
                key={artist.rank}
                className="border border-white/10 hover:shadow-lg hover:scale-[1.01] transition-transform duration-200"
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="text-xl font-bold w-6 text-right">
                      {artist.rank}
                    </div>
                    <Avatar>
  <img
    src={getProfileImageUrl(artist.handle)}
    alt={artist.artist}
    className="w-full h-full rounded-full object-cover"
    onError={(e) => {
      e.target.style.display = "none";
    }}
  />
  <AvatarFallback>
    <div className="w-full h-full flex items-center justify-center bg-gray-500 text-white rounded-full text-sm">
      {artist.artist.charAt(0)}
    </div>
  </AvatarFallback>
</Avatar>

                    <div>
                      <div className="text-lg font-semibold">
                        <a
                          href={`https://audius.co/${artist.handle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {artist.artist}
                        </a>
                      </div>
                      <div className="text-muted-foreground text-sm">
                        @{artist.handle}
                      </div>
                      {artist.accolades && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {artist.accolades.map((acc, idx) => (
                            <span
                              key={idx}
                              className="text-sm px-2 py-0.5 rounded bg-purple-600/10 text-purple-400 border border-purple-400/20"
                            >
                              {acc}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {artist.top5 > 0 && (
                      <Badge variant="default">🔥 {artist.top5}x Top 5</Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </ScrollArea>
      <footer className="mt-8 text-center text-xs opacity-60">
        Built by Broey using the Audius API 🚀
      </footer>
    </div>
  );
}
