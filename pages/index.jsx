// pages/index.jsx
import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
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

const leaderboardData = [
  {
    rank: 1,
    artist: "Broey.",
    handle: "broeybeats",
    score: 96.3,
    top5: 2,
    accolades: ["🥇 Season Winner", "🔥 2x Top 5"],
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
      className={`font-sans min-h-screen px-4 py-8 transition-colors duration-300 ${darkMode ? "bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 text-white" : "bg-white text-black"}`}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-wide">🎷 Audius Leaderboard - {season}
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-sm">Light</span>
            <Switch checked={darkMode} onCheckedChange={() => setDarkMode(!darkMode)} />
            <span className="text-sm">Dark</span>
          </div>
        </div>

        <div className="flex justify-start">
          <Select value={season} onValueChange={(val) => setSeason(val)}>
            <SelectTrigger
              className={`w-32 border rounded px-3 py-2 ${darkMode ? "bg-black text-white border-white/20" : "bg-white text-black border-black/20"}`}
            >
              <SelectValue placeholder="Season" />
            </SelectTrigger>
            <SelectContent
              className={`absolute z-50 mt-1 rounded shadow-lg border ${darkMode ? "bg-black text-white border-white/10" : "bg-white text-black border-black/10"}`}
            >
              <SelectItem value="S1">Season 1</SelectItem>
              <SelectItem value="S2">Season 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="h-[70vh]">
          <div className="space-y-4">
            {mounted &&
              leaderboardData.map((artist, idx) => (
                <Card
                  key={artist.rank}
                  className="border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 transform hover:scale-[1.01] hover:border-purple-500/40 hover:shadow-lg"
                  style={{
                    animation: `fadeInUp 0.3s ease ${idx * 0.05}s forwards`,
                    opacity: 0,
                  }}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-xl font-bold w-6 text-right">{artist.rank}</div>
                      <Avatar>
                        <AvatarFallback>{artist.artist.charAt(0)}</AvatarFallback>
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
                        <div className="text-muted-foreground text-sm leading-tight">
                          @{artist.handle}
                        </div>
                        {artist.accolades && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {artist.accolades.map((acc, idx) => (
                              <span
                                key={idx}
                                className="text-sm px-2 py-0.5 rounded bg-purple-600/10 text-purple-400 border border-purple-400/20 hover:bg-purple-600/20 transition-colors"
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
                  </CardContent>
                </Card>
              ))}
          </div>
        </ScrollArea>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
