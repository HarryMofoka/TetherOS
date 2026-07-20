"use client";

import { Play, MoreHorizontal, CheckCircle2 } from "lucide-react";
import { useMockData } from "@/components/providers/MockDataProvider";

export default function TodayPage() {
  const { tasks, updateTaskStatus } = useMockData();
  
  // Group tasks to display as a timeline
  const pendingTasks = tasks.filter(t => t.status !== "Done");
  const doneTasks = tasks.filter(t => t.status === "Done");
  const pct = Math.round((doneTasks.length / Math.max(tasks.length, 1)) * 100);

  // Distribute tasks roughly over the day for the mock timeline
  const startHour = 8;

  return (
    <>
      <div className="px-8 pt-6">
        <h1 className="text-2xl font-bold">Today's Focus 🎯</h1>
        <p className="text-xs text-muted-foreground">Make today count.</p>
      </div>
      <div className="px-8 py-6 max-w-4xl">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="font-semibold text-lg">Timeline</div>
            <div className="text-xs text-muted-foreground">{pct}% Completed</div>
          </div>
          <div className="space-y-4">
            {tasks.map((task, i) => {
              const hour = startHour + i * 2;
              const timeString = `${hour < 10 ? '0' : ''}${hour}:00`;
              return (
                <PlanRow 
                  key={task.id}
                  time={timeString} 
                  title={task.title} 
                  sub={task.tag} 
                  active={task.status === "In Progress"} 
                  completed={task.status === "Done"}
                  onToggle={() => updateTaskStatus(task.id, task.status === "Done" ? "To Do" : "Done")}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function PlanRow({ time, title, sub, duration, active, completed, onToggle }: { time: string; title: string; sub: string; duration?: string; active?: boolean; completed?: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-14 text-sm font-medium text-muted-foreground">{time}</div>
      <button onClick={onToggle} className={`relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${completed ? "bg-foreground border-foreground text-background" : "border-border text-transparent hover:border-foreground"}`}>
        <CheckCircle2 className="h-4 w-4 fill-current" />
      </button>
      <div className={`flex-1 rounded-xl border p-4 transition-colors ${active && !completed ? "bg-muted/40 border-foreground/30 shadow-sm" : "border-border hover:bg-muted/20"}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-sm font-semibold ${completed ? "line-through text-muted-foreground" : ""}`}>{title}</div>
            <div className={`text-xs mt-0.5 ${completed ? "text-muted-foreground/50" : "text-muted-foreground"}`}>{sub}</div>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {duration && <span className="bg-background px-2 py-1 rounded-md border border-border">⏱ {duration}</span>}
            {active && !completed ? <Play className="h-4 w-4 text-foreground" /> : <MoreHorizontal className="h-4 w-4" />}
          </div>
        </div>
      </div>
    </div>
  );
}
