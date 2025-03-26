// pages/index.jsx
import { useState } from "react";

// Import your UI components from the separate files in /components/ui
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

  return (
    <div
      className={`max-w-4xl mx-auto p-6 transition-colors duration-300 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-center w-full">
          🎧 Audius Leaderboard - {season}
        </h1>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Select value={season} onValueChange={(val) => setSeason(val)}>
  {({ value, onValueChange, open, setOpen }) => (
    <>
      <SelectTrigger
        className={`w-28 ${darkMode ? 'bg-black text-white border-white/20' : 'bg-white text-black border-black/20'}`}
        onClick={() => setOpen(!open)}
      >
        <SelectValue placeholder="Season" />
      </SelectTrigger>
      <SelectContent open={open} className={darkMode ? 'bg-black text-white' : 'bg-white text-black'}>
        <SelectItem value="S1" onSelect={(val) => { onValueChange(val); setOpen(false); }}>Season 1</SelectItem>
        <SelectItem value="S2" onSelect={(val) => { onValueChange(val); setOpen(false); }}>Season 2</SelectItem>
      </SelectContent>
    </>
  )}
</Select>


        <div className="flex items-center gap-2">
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
          {leaderboardData.map((artist) => (
            <Card key={artist.rank} className="border border-white/10">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="text-xl font-bold w-6 text-right">
                    {artist.rank}
                  </div>
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
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
