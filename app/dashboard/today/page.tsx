import type { Metadata } from "next";
import { Play, MoreHorizontal } from "lucide-react";

export const metadata: Metadata = {
  title: "Today â€” TetherOS",
  description: "Focus on today's goals.",
};

export default function TodayPage() {
  return (
    <>
      <div className="px-8 pt-6">
        <h1 className="text-2xl font-bold">Today's Focus ðŸŽ¯</h1>
        <p className="text-xs text-muted-foreground">Make today count.</p>
      </div>
      <div className="px-8 py-6 max-w-4xl">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="font-semibold text-lg">Timeline</div>
            <div className="text-xs text-muted-foreground">14% Completed</div>
          </div>
          <div className="space-y-4">
            <PlanRow time="07:00" title="Morning Routine" sub="Workout, Shower, Read" />
            <PlanRow time="08:00" title="Deep Work Session" sub="Build Authentication Flow" duration="2h 30m" active />
            <PlanRow time="10:30" title="Short Break" sub="Walk, Stretch" />
            <PlanRow time="12:30" title="Lunch Break" sub="Recharge" />
            <PlanRow time="14:00" title="Implement API Endpoints" sub="Connect login & register" duration="1h 30m" active />
            <PlanRow time="16:00" title="Test & Debug" sub="Fix issues and test flow" />
            <PlanRow time="18:30" title="Review & Reflect" sub="What went well, what can improve?" />
          </div>
        </div>
      </div>
    </>
  );
}

function PlanRow({ time, title, sub, duration, active }: { time: string; title: string; sub: string; duration?: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-14 text-sm font-medium text-muted-foreground">{time}</div>
      <div className={`h-2.5 w-2.5 rounded-full ${active ? "bg-[color:var(--brand-blue)] ring-4 ring-[color:var(--brand-blue)]/20" : "bg-muted-foreground/30"}`} />
      <div className={`flex-1 rounded-xl border border-border p-4 transition-colors ${active ? "bg-muted/40 border-[color:var(--brand-blue)]/30" : "hover:bg-muted/20"}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">{title}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {duration && <span className="bg-background px-2 py-1 rounded-md border border-border">â± {duration}</span>}
            {active ? <Play className="h-4 w-4 text-[color:var(--brand-blue)]" /> : <MoreHorizontal className="h-4 w-4" />}
          </div>
        </div>
      </div>
    </div>
  );
}
