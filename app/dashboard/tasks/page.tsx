import type { Metadata } from "next";
import { Plus, MoreHorizontal, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Tasks — LifeOS",
  description: "Manage your to-dos.",
};

export default function TasksPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-8 pt-6">
        <div>
          <h1 className="text-2xl font-bold">Tasks ✅</h1>
          <p className="text-xs text-muted-foreground">Manage your workflow.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background">
          <Plus className="h-4 w-4" /> New Task
        </button>
      </div>

      <div className="flex-1 overflow-x-auto px-8 py-6">
        <div className="flex gap-6 min-w-max h-full items-start">
          <TaskColumn title="To Do" count={3}>
            <TaskCard title="Draft Q1 OKRs" tag="Work" priority="High" />
            <TaskCard title="Buy groceries" tag="Personal" priority="Medium" />
            <TaskCard title="Schedule dentist appt" tag="Health" priority="Low" />
          </TaskColumn>
          
          <TaskColumn title="In Progress" count={2}>
            <TaskCard title="Build Auth Flow" tag="Project" priority="High" />
            <TaskCard title="Read 'Atomic Habits'" tag="Personal" priority="Medium" />
          </TaskColumn>

          <TaskColumn title="Done" count={5}>
            <TaskCard title="Weekly Team Sync" tag="Work" priority="Low" />
            <TaskCard title="Review PRs" tag="Project" priority="Medium" />
          </TaskColumn>
        </div>
      </div>
    </div>
  );
}

function TaskColumn({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <div className="w-80 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{title}</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium">{count}</span>
        </div>
        <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button>
      </div>
      <div className="flex flex-col gap-3 rounded-2xl bg-card border border-border p-3 min-h-[500px]">
        {children}
        <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground p-2">
          <Plus className="h-3 w-3" /> Add task
        </button>
      </div>
    </div>
  );
}

function TaskCard({ title, tag, priority }: { title: string; tag: string; priority: string }) {
  const pColor = priority === "High" ? "text-red-500 bg-red-500/10" : priority === "Medium" ? "text-orange-500 bg-orange-500/10" : "text-green-500 bg-green-500/10";
  return (
    <div className="rounded-xl border border-border bg-background p-3 shadow-sm hover:shadow cursor-pointer transition-all hover:border-[color:var(--brand-blue)]/50">
      <div className="flex flex-wrap gap-2 mb-2">
        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${pColor}`}>{priority}</span>
        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground">{tag}</span>
      </div>
      <div className="text-sm font-medium mb-3">{title}</div>
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50 text-muted-foreground">
        <div className="flex -space-x-2">
          <div className="h-6 w-6 rounded-full border-2 border-background bg-gradient-to-br from-orange-300 to-pink-500" />
        </div>
        <div className="flex items-center gap-1 text-[10px]">
          <MessageSquare className="h-3 w-3" /> 2
        </div>
      </div>
    </div>
  );
}
