import type { Metadata } from "next";
import { Plus, Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Habits — LifeOS",
  description: "Track daily routines.",
};

export default function HabitsPage() {
  return (
    <>
      <div className="flex items-center justify-between px-8 pt-6">
        <div>
          <h1 className="text-2xl font-bold">Habits 🌱</h1>
          <p className="text-xs text-muted-foreground">Build consistency.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background">
          <Plus className="h-4 w-4" /> Add Habit
        </button>
      </div>

      <div className="px-8 py-6 max-w-4xl">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="font-semibold text-lg">This Month</div>
            <div className="text-xs text-muted-foreground">Avg: 78% Completion</div>
          </div>
          <div className="space-y-6">
            <HabitRowExpanded name="Workout" streak={6} filled={24} total={30} emoji="💪" />
            <HabitRowExpanded name="Read Books" streak={12} filled={28} total={30} emoji="📚" />
            <HabitRowExpanded name="Meditate" streak={4} filled={15} total={30} emoji="🧘" />
            <HabitRowExpanded name="No Sugar" streak={7} filled={26} total={30} emoji="🚫" />
            <HabitRowExpanded name="Journal" streak={2} filled={10} total={30} emoji="📓" />
          </div>
        </div>
      </div>
    </>
  );
}

function HabitRowExpanded({ name, streak, filled, total, emoji }: { name: string; streak: number; filled: number; total: number; emoji: string }) {
  return (
    <div className="flex items-start lg:items-center gap-4 flex-col lg:flex-row">
      <div className="flex items-center gap-3 w-48">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-lg">{emoji}</div>
        <div>
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-xs flex items-center gap-1"><Flame className="h-3 w-3 text-orange-500" /> <b>{streak}</b> <span className="text-muted-foreground">days</span></div>
        </div>
      </div>
      <div className="flex-1 overflow-x-auto w-full lg:w-auto">
        <div className="flex gap-1.5 min-w-max pb-2 lg:pb-0">
          {Array.from({ length: total }).map((_, i) => (
            <div 
              key={i} 
              className={`h-6 w-6 sm:h-8 sm:w-8 rounded-lg flex items-center justify-center text-[10px] sm:text-xs transition-colors cursor-pointer hover:opacity-80
                ${i < filled 
                  ? "bg-foreground text-background" 
                  : "bg-muted text-muted-foreground"}`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
