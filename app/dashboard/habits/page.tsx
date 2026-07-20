"use client";

import { useState } from "react";
import { Plus, Activity, Check, X } from "lucide-react";
import { useMockData } from "@/components/providers/MockDataProvider";

export default function HabitsPage() {
  const { habits, toggleHabit } = useMockData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col h-full relative">
        <div className="flex items-center justify-between px-8 pt-6">
          <div>
            <h1 className="text-2xl font-bold">Habits 🌱</h1>
            <p className="text-xs text-muted-foreground">Build consistency.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
          >
            <Plus className="h-4 w-4" /> Add Habit
          </button>
        </div>

        <div className="px-8 py-6 max-w-4xl">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="font-semibold text-lg">Your Habits</div>
              <div className="text-xs text-muted-foreground">Click today's circle to mark as done</div>
            </div>
            <div className="space-y-6">
              {habits.map((habit) => (
                <HabitRowExpanded 
                  key={habit.id} 
                  name={habit.name} 
                  streak={habit.streak} 
                  completed={habit.completedToday} 
                  onToggle={() => toggleHabit(habit.id)} 
                />
              ))}
            </div>
          </div>
        </div>
        
        {isModalOpen && <NewHabitModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </>
  );
}

function HabitRowExpanded({ name, streak, completed, onToggle }: { name: string; streak: number; completed: boolean; onToggle: () => void }) {
  // Mock out 30 days of history for visual flair
  // We place today at the far right
  const days = Array.from({ length: 30 });
  
  return (
    <div className="flex items-start lg:items-center gap-4 flex-col lg:flex-row">
      <div className="flex items-center gap-3 w-48 shrink-0">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground ring-1 ring-border">
           <Activity className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-semibold truncate w-32">{name}</div>
          <div className="text-xs flex items-center gap-1"><span className="text-foreground">🔥</span> <b>{streak}</b> <span className="text-muted-foreground">days</span></div>
        </div>
      </div>
      <div className="flex-1 overflow-x-auto w-full lg:w-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex gap-1.5 min-w-max pb-2 lg:pb-0 justify-end">
          {days.map((_, i) => {
            const isToday = i === 29;
            // Mock random completions for past days based on streak length
            const isPastCompleted = i < 29 && i >= (29 - streak);
            const isCompleted = isToday ? completed : isPastCompleted;
            
            return (
              <div 
                key={i} 
                onClick={isToday ? onToggle : undefined}
                className={`h-6 w-6 sm:h-8 sm:w-8 rounded-lg flex items-center justify-center text-[10px] sm:text-xs transition-all ${isToday ? 'cursor-pointer hover:scale-110 ring-2 ring-offset-1 ring-offset-card ring-foreground/20' : ''} ${isCompleted ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
              >
                {isCompleted && isToday ? <Check className="h-4 w-4" /> : (isToday ? "T" : "")}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NewHabitModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">New Habit</h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted text-muted-foreground"><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Habit Name</label>
            <input 
              autoFocus
              type="text" 
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground transition-colors" 
              placeholder="e.g. Meditate for 10 minutes"
            />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button onClick={onClose} className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
            <button onClick={onClose} className="rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors">Save Habit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
