import type { Metadata } from "next";
import { Play, Pause, RotateCcw, Settings2, Coffee, Music, Headphones } from "lucide-react";

export const metadata: Metadata = {
  title: "Focus Timer — LifeOS",
  description: "Deep work sessions.",
};

export default function FocusPage() {
  return (
    <div className="flex flex-col h-full items-center justify-center py-12 px-8 overflow-y-auto">
      
      <div className="w-full max-w-2xl flex flex-col items-center">
        {/* Mode Selector */}
        <div className="flex bg-card border border-border rounded-full p-1 mb-12 shadow-sm">
          <button className="px-6 py-2 rounded-full bg-foreground text-background text-sm font-semibold shadow-sm">Pomodoro</button>
          <button className="px-6 py-2 rounded-full text-muted-foreground hover:text-foreground text-sm font-semibold transition-colors">Short Break</button>
          <button className="px-6 py-2 rounded-full text-muted-foreground hover:text-foreground text-sm font-semibold transition-colors">Long Break</button>
        </div>

        {/* Timer Display */}
        <div className="relative flex items-center justify-center mb-16">
          {/* Decorative outer ring */}
          <div className="absolute inset-0 rounded-full border-[12px] border-muted/30 scale-110" />
          <div className="absolute inset-0 rounded-full border-[12px] border-[color:var(--brand-blue)]/90 border-t-transparent border-l-transparent rotate-45 scale-110 blur-sm opacity-50" />
          
          <div className="z-10 bg-card border-4 border-border h-80 w-80 rounded-full flex flex-col items-center justify-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-[color:var(--brand-blue)]/5" />
            <div className="text-[90px] font-black tracking-tighter tabular-nums leading-none mb-2 z-10 text-foreground drop-shadow-sm">
              25:00
            </div>
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-widest z-10">
              Session 1 / 4
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mb-16">
          <button className="h-14 w-14 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all shadow-sm">
            <RotateCcw className="h-6 w-6" />
          </button>
          <button className="h-20 w-20 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-90 transition-all shadow-lg hover:scale-105 active:scale-95">
            <Play className="h-8 w-8 ml-1" />
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
          <div className="grid grid-cols-3 gap-4">
            <SoundToggle icon={<Coffee className="h-5 w-5" />} label="Café" active />
            <SoundToggle icon={<Music className="h-5 w-5" />} label="Lo-Fi" />
            <SoundToggle icon={<Headphones className="h-5 w-5" />} label="Binaural" />
          </div>
        </div>

      </div>
    </div>
  );
}

function SoundToggle({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${active ? "bg-foreground text-background border-foreground shadow-md" : "bg-background text-muted-foreground border-border hover:bg-muted/50"}`}>
      {icon}
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}
