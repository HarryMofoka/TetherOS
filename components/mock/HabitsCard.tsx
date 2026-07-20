import React from "react";

export function HabitsCard() {
  const habits = [
    { name: "Workout", streak: "6 Day Streak" },
    { name: "Read Books", streak: "12 Day Streak" },
    { name: "Meditate", streak: "4 Day Streak" },
    { name: "No Sugar", streak: "8 Day Streak" },
    { name: "Journal", streak: "7 Day Streak" },
  ];
  return (
    <div className="w-[320px] rounded-2xl border border-border bg-card p-6 shadow-xl">
      <div className="space-y-4">
        <div>
          <div className="text-lg font-bold">Habits</div>
          <div className="text-[10px] text-muted-foreground">Track your daily progress</div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-foreground px-3 py-1 font-medium text-background">All</span>
          <span className="text-muted-foreground">Active</span>
          <span className="text-muted-foreground">Completed</span>
        </div>
        <div className="space-y-2">
          {habits.map(h => (
            <div key={h.name} className="flex items-center justify-between rounded-xl border border-border p-3">
              <div>
                <div className="text-sm font-semibold">{h.name}</div>
                <div className="text-[10px] text-muted-foreground">{h.streak}</div>
              </div>
              <div className="flex gap-1">{Array.from({length: 7}).map((_,i) => <div key={i} className="h-2 w-2 rounded-full bg-foreground/60" />)}</div>
            </div>
          ))}
        </div>
        <button className="mt-2 w-full rounded-xl bg-foreground py-3 text-xs font-semibold text-background">+ Add New Habit</button>
      </div>
    </div>
  );
}
