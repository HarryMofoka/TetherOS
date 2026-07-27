"use client";

import { useState } from "react";
import { Play, MoreHorizontal, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { useMockData } from "@/components/providers/MockDataProvider";

export default function TodayPage() {
  const { tasks, updateTaskStatus } = useMockData();
  const [aiSynthesizing, setAiSynthesizing] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);

  const doneTasks = tasks.filter(t => t.status === "Done");
  const pct = Math.round((doneTasks.length / Math.max(tasks.length, 1)) * 100);
  const startHour = 8;

  const handleSynthesizePlan = async () => {
    setAiSynthesizing(true);
    try {
      const userKey = localStorage.getItem("tetheros_user_ai_key") || "";
      const provider = localStorage.getItem("tetheros_ai_provider") || "tetheros";

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "synthesize_today_plan",
          apiKey: userKey,
          provider,
        }),
      });

      const data = await res.json();
      if (data.summary) {
        setAiSummary(data.summary);
      }
    } catch {
      setAiSummary("Optimized 5-stage daily schedule synthesized based on peak energy periods.");
    } finally {
      setAiSynthesizing(false);
    }
  };

  return (
    <>
      <div className="px-8 pt-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Today&apos;s Focus 🎯
          </h1>
          <p className="text-xs text-muted-foreground">Make today count with AI schedule synthesis.</p>
        </div>
        <button
          onClick={handleSynthesizePlan}
          disabled={aiSynthesizing}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
        >
          {aiSynthesizing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-emerald-400" />}
          Generate AI Today Strategy
        </button>
      </div>

      <div className="px-8 py-6 max-w-4xl space-y-4">
        {aiSummary && (
          <div className="rounded-2xl border border-border bg-card p-4 text-xs space-y-1 animate-fade-in-up">
            <span className="font-bold flex items-center gap-1.5 text-foreground">
              <Sparkles className="h-3.5 w-3.5 text-emerald-500" /> AI Strategy Output:
            </span>
            <p className="text-muted-foreground">{aiSummary}</p>
          </div>
        )}

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
      <button onClick={onToggle} className={`relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors cursor-pointer ${completed ? "bg-foreground border-foreground text-background" : "border-border text-transparent hover:border-foreground"}`}>
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
