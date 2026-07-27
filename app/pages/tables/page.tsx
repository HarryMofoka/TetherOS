"use client";

import { useMockData } from "@/components/providers/MockDataProvider";
import { Table, CheckCircle2, Clock, Flame, Tag, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function PerformanceTablesPage() {
  const { tasks, habits, projects } = useMockData();

  return (
    <div className="p-6 md:p-8 space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Performance Tables & Data Matrix</h1>
        <p className="text-xs text-muted-foreground mt-1">Comprehensive audit matrix of your tasks, habits, and active project velocities.</p>
      </div>

      {/* Task Performance Table */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-base">Tasks Matrix</h2>
            <p className="text-xs text-muted-foreground">All active and completed tasks across workspace projects.</p>
          </div>
          <Link href="/dashboard/tasks" className="text-xs font-semibold hover:underline flex items-center gap-1">
            Open Kanban Board <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="py-3 px-4 font-semibold">Title</th>
                <th className="py-3 px-4 font-semibold">Tag</th>
                <th className="py-3 px-4 font-semibold">Priority</th>
                <th className="py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {tasks.map((t) => (
                <tr key={t.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-foreground flex items-center gap-2">
                    <CheckCircle2 className={`h-4 w-4 ${t.status === "Done" ? "text-foreground" : "text-muted-foreground/40"}`} />
                    {t.title}
                  </td>
                  <td className="py-3 px-4">
                    <span className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
                      {t.tag}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-semibold text-[10px] uppercase tracking-wider ${t.priority === "High" ? "text-red-500" : t.priority === "Medium" ? "text-yellow-600" : "text-muted-foreground"}`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${t.status === "Done" ? "bg-foreground text-background" : t.status === "In Progress" ? "bg-muted text-foreground border border-border" : "bg-muted/50 text-muted-foreground"}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Habit Consistency Table */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-base">Habits Streak Matrix</h2>
            <p className="text-xs text-muted-foreground">Consistency streaks and daily completion markers.</p>
          </div>
          <Link href="/dashboard/habits" className="text-xs font-semibold hover:underline flex items-center gap-1">
            Manage Habits <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="py-3 px-4 font-semibold">Habit Name</th>
                <th className="py-3 px-4 font-semibold">Current Streak</th>
                <th className="py-3 px-4 font-semibold">Today Status</th>
                <th className="py-3 px-4 font-semibold">Weekly Visualization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {habits.map((h) => (
                <tr key={h.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-foreground flex items-center gap-2">
                    <Flame className={`h-4 w-4 ${h.completedToday ? "text-foreground" : "text-muted-foreground/40"}`} />
                    {h.name}
                  </td>
                  <td className="py-3 px-4 font-bold">{h.streak} Days</td>
                  <td className="py-3 px-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${h.completedToday ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>
                      {h.completedToday ? "Completed" : "Pending"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className={`h-2 w-4 rounded-full ${i < Math.min(h.streak, 7) ? "bg-foreground" : "bg-muted"}`} />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
