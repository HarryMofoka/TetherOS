"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Settings2, Coffee, Music, Headphones } from "lucide-react";

type Mode = "Pomodoro" | "Short Break" | "Long Break";

const MODE_TIMES = {
  "Pomodoro": 25 * 60,
  "Short Break": 5 * 60,
  "Long Break": 15 * 60,
};

export default function FocusPage() {
  const [mode, setMode] = useState<Mode>("Pomodoro");
  const [timeLeft, setTimeLeft] = useState(MODE_TIMES["Pomodoro"]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeSound, setActiveSound] = useState<string>("Café");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setTimeLeft(MODE_TIMES[newMode]);
    setIsRunning(false);
  };

  const handleReset = () => {
    setTimeLeft(MODE_TIMES[mode]);
    setIsRunning(false);
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col h-full items-center justify-center py-8 px-4 md:py-12 md:px-8 overflow-y-auto">
      
      <div className="w-full max-w-2xl flex flex-col items-center">
        {/* Mode Selector */}
        <div className="flex bg-card border border-border rounded-full p-1 mb-8 md:mb-12 shadow-sm max-w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {(Object.keys(MODE_TIMES) as Mode[]).map(m => (
            <button 
              key={m}
              onClick={() => handleModeChange(m)}
              className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-colors ${mode === m ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Timer Display */}
        <div className="relative flex items-center justify-center mb-16">
          {/* Decorative outer ring */}
          <div className="absolute inset-0 rounded-full border-[12px] border-muted/30 scale-110" />
          <div className={`absolute inset-0 rounded-full border-[12px] border-foreground/50 border-t-transparent border-l-transparent rotate-45 scale-110 blur-sm ${isRunning ? 'opacity-100 animate-pulse' : 'opacity-0'} transition-opacity duration-1000`} />
          
          <div className="z-10 bg-card border-4 border-border h-64 w-64 md:h-80 md:w-80 rounded-full flex flex-col items-center justify-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-foreground/5" />
            <div className="text-[70px] md:text-[90px] font-black tracking-tighter tabular-nums leading-none mb-2 z-10 text-foreground drop-shadow-sm">
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-widest z-10">
              Session 1 / 4
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mb-16">
          <button onClick={handleReset} className="h-14 w-14 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all shadow-sm">
            <RotateCcw className="h-6 w-6" />
          </button>
          <button onClick={toggleTimer} className="h-20 w-20 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-90 transition-all shadow-lg hover:scale-105 active:scale-95">
            {isRunning ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
          </button>
          <button className="h-14 w-14 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all shadow-sm">
            <Settings2 className="h-6 w-6" />
          </button>
        </div>

        {/* Ambient Sounds */}
        <div className="w-full bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Ambient Sounds</h3>
            <span className="text-[10px] bg-muted px-2 py-1 rounded text-muted-foreground font-semibold uppercase tracking-wider">Premium</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SoundToggle icon={<Coffee className="h-5 w-5" />} label="Café" active={activeSound === "Café"} onClick={() => setActiveSound("Café")} />
            <SoundToggle icon={<Music className="h-5 w-5" />} label="Lo-Fi" active={activeSound === "Lo-Fi"} onClick={() => setActiveSound("Lo-Fi")} />
            <SoundToggle icon={<Headphones className="h-5 w-5" />} label="Binaural" active={activeSound === "Binaural"} onClick={() => setActiveSound("Binaural")} />
          </div>
        </div>

      </div>
    </div>
  );
}

function SoundToggle({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${active ? "bg-foreground text-background border-foreground shadow-md" : "bg-background text-muted-foreground border-border hover:bg-muted/50"}`}>
      {icon}
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}
