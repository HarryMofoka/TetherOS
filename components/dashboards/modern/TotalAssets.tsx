"use client";

import { Box, CheckSquare, Flame, Timer, Folder } from "lucide-react";
import { useMockData } from "@/components/providers/MockDataProvider";

export function TotalAssets() {
  const { tasks, habits, projects } = useMockData();

  const completedTasks = tasks.filter(t => t.status === "Done").length;
  const maxStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0);
  const activeProjects = projects.filter(p => p.status !== "Completed").length;

  const assets = [
    { title: "Tasks Completed", value: completedTasks, icon: CheckSquare, label: "Total Done" },
    { title: "Best Habit Streak", value: `${maxStreak} Days`, icon: Flame, label: "Current Best" },
    { title: "Focus Time", value: "—", icon: Timer, label: "Use Focus Timer" },
    { title: "Active Projects", value: activeProjects, icon: Folder, label: "In Progress" },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm flex flex-col h-full">
      <div className="border-b border-border p-6 font-bold text-sm flex items-center gap-2">
        <Box className="h-4 w-4 text-muted-foreground" />
        Life OS Metrics & Assets
      </div>
      <div className="grid grid-cols-2 flex-1 divide-x divide-y divide-border">
        {assets.map((a, i) => {
          const Icon = a.icon;
          return (
            <div key={i} className="p-6 flex flex-col justify-between hover:bg-muted/30 transition-colors">
              <div className="rounded-lg border border-border p-2 w-fit bg-background">
                <Icon className="h-4 w-4" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-black">{a.value}</div>
                <div className="text-xs font-semibold text-foreground mt-0.5">{a.title}</div>
                <div className="text-[10px] text-muted-foreground">{a.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
