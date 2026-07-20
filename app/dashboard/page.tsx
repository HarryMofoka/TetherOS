import type { Metadata } from "next";
import { ChevronDown, Play, MoreHorizontal, Calendar as CalIcon, Flame, Folder, Timer, Plus, ArrowUpRight } from "lucide-react";
import { LifeScoreRing, MiniLineChart, Donut, ProgressRing } from "@/components/mock/charts";

export const metadata: Metadata = {
  title: "Dashboard — LifeOS",
  description: "Your daily command center: plan, focus, habits, projects, and progress in one view.",
  openGraph: { url: "/dashboard" },
  alternates: { canonical: "/dashboard" },
};

export default function Dashboard() {
  return (
    <>
      <div className="px-8 pt-6">
        <h1 className="text-2xl font-bold">Good morning, Harry 👋</h1>
        <p className="text-xs text-muted-foreground">Tuesday, 11 February 2025</p>
      </div>

      <div className="grid grid-cols-12 gap-6 px-8 py-6">
        {/* Center column */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <div className="col-span-2 flex items-center gap-4 rounded-2xl border border-border bg-card p-4 md:col-span-1">
              <LifeScoreRing size={90} />
            </div>
            <Stat label="Days with LifeOS" value="47" unit="Days" delta="↑ 12 this month" />
            <Stat label="Goals Completed" value="12" unit="This year" delta="↑ 4 this month" />
            <Stat label="Current Streak" value="9" unit="days" delta="🔥 Keep it up!" />
            <Stat label="Focus Time" value="18h 42m" unit="This week" delta="↑ 2h 15m vs last week" />
          </div>

          {/* Today plan + Habits */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Today&apos;s Plan</div>
                <button className="text-xs text-muted-foreground">View Calendar</button>
              </div>
              <div className="mt-4 space-y-3">
                <PlanRow time="07:00" title="Morning Routine" sub="Workout, Shower, Read" />
                <PlanRow time="08:00" title="Deep Work Session" sub="Build Authentication Flow" duration="2h 30m" active />
                <PlanRow time="10:30" title="Short Break" sub="Walk, Stretch" />
                <PlanRow time="12:30" title="Lunch Break" sub="Recharge" />
                <PlanRow time="14:00" title="Implement API Endpoints" sub="Connect login & register" duration="1h 30m" active />
                <PlanRow time="16:00" title="Test & Debug" sub="Fix issues and test flow" />
                <PlanRow time="18:30" title="Review & Reflect" sub="What went well, what can improve?" />
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground"><span>Completed 1 of 7 tasks</span><span>14%</span></div>
                <div className="mt-2 h-1.5 rounded-full bg-muted"><div className="h-1.5 w-[14%] rounded-full bg-foreground" /></div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Habits</div>
                  <button className="text-xs text-muted-foreground">See all</button>
                </div>
                <div className="mt-4 space-y-3">
                  <HabitRow name="Workout" streak={6} dots={7} filled={6} />
                  <HabitRow name="Read Books" streak={12} dots={7} filled={5} />
                  <HabitRow name="Meditate" streak={4} dots={7} filled={4} />
                  <HabitRow name="No Sugar" streak={7} dots={7} filled={7} />
                </div>
                <button className="mt-4 w-full rounded-xl border border-dashed border-border py-2 text-xs text-muted-foreground flex items-center justify-center gap-1"><Plus className="h-3 w-3" /> Add New Habit</button>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Focus Timer <ChevronDown className="inline h-3 w-3" /></div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Deep Work</div>
                    <div className="mt-1 text-3xl font-bold">25:00</div>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background"><Play className="h-3.5 w-3.5" /> Start Focus</button>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Pomodoro</span><span>Long Break</span><span>5:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Weekly Progress</div>
                <button className="text-xs text-muted-foreground">This Week ›</button>
              </div>
              <MiniLineChart className="mt-4 w-full" />
              <div className="mt-2 grid grid-cols-7 text-center text-[10px] text-muted-foreground">
                {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => <span key={d}>{d}</span>)}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="font-semibold">Tasks Overview</div>
              <div className="mt-4 flex items-center gap-4">
                <Donut size={120} segments={[
                  { value: 8, color: "oklch(0.72 0.17 155)" },
                  { value: 6, color: "oklch(0.62 0.19 256)" },
                  { value: 3, color: "oklch(0.75 0.15 80)" },
                  { value: 1, color: "oklch(0.62 0.22 25)" },
                ]} />
                <ul className="space-y-2 text-xs">
                  <li className="flex items-center gap-2"><Dot c="oklch(0.72 0.17 155)" /> <b>8</b> Completed</li>
                  <li className="flex items-center gap-2"><Dot c="oklch(0.62 0.19 256)" /> <b>6</b> In Progress</li>
                  <li className="flex items-center gap-2"><Dot c="oklch(0.75 0.15 80)" /> <b>3</b> Pending</li>
                  <li className="flex items-center gap-2"><Dot c="oklch(0.62 0.22 25)" /> <b>1</b> Overdue</li>
                </ul>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Upcoming Events</div>
                <button className="text-xs text-muted-foreground">View Calendar</button>
              </div>
              <div className="mt-4 space-y-3">
                <EventCard month="FEB" day="12" title="Team Standup" time="10:00 AM – 10:30 AM" />
                <EventCard month="FEB" day="14" title="Product Review" time="02:00 PM – 03:00 PM" />
                <EventCard month="FEB" day="18" title="Design Meeting" time="11:00 AM – 12:00 PM" />
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-12 space-y-6 lg:col-span-3">
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-400 to-pink-500" />
              <div className="text-sm font-semibold">AI Coach</div>
              <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-semibold">AI</span>
            </div>
            <div className="mt-3 rounded-xl border border-border p-3 text-xs">
              You usually do your best work between 8–11 AM. Consider blocking distractions during that time.
              <div className="mt-2 text-[10px] text-muted-foreground">Just now</div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 text-[10px]">
              {["Plan my day","Help me focus","Reflect on today"].map(t => (
                <button key={t} className="rounded-full border border-border bg-background px-2 py-1">{t}</button>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-[11px] text-muted-foreground">
              Ask your AI Coach anything... <ArrowUpRight className="ml-auto h-4 w-4" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Projects</div>
              <button className="flex items-center gap-1 text-[11px] text-[color:var(--brand-blue)]"><Plus className="h-3 w-3" /> View all</button>
            </div>
            <div className="mt-3 space-y-3">
              <ProjectRow name="AI Resume Builder" status="On Track" pct={67} color="var(--brand-blue)" />
              <ProjectRow name="LifeOS Mobile App" status="Behind" pct={42} color="oklch(0.62 0.22 25)" />
              <ProjectRow name="Personal Website" status="On Hold" pct={25} color="oklch(0.75 0.15 80)" />
              <ProjectRow name="Reading Tracker" status="On Track" pct={80} color="oklch(0.72 0.17 155)" />
            </div>
            <button className="mt-4 w-full rounded-xl border border-dashed border-border py-2 text-xs text-muted-foreground flex items-center justify-center gap-1"><Plus className="h-3 w-3" /> New Project</button>
          </div>
        </div>
      </div>
    </>
  );
}

function Stat({ label, value, unit, delta }: { label: string; value: string; unit: string; delta: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-[10px] text-muted-foreground">{unit}</span>
      </div>
      <div className="mt-2 text-[10px] text-muted-foreground">{delta}</div>
    </div>
  );
}

function PlanRow({ time, title, sub, duration, active }: { time: string; title: string; sub: string; duration?: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 text-xs text-muted-foreground">{time}</div>
      <div className={`h-2 w-2 rounded-full ${active ? "bg-[color:var(--brand-blue)]" : "bg-muted-foreground/30"}`} />
      <div className={`flex-1 rounded-xl border border-border p-3 ${active ? "bg-muted/40" : ""}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">{title}</div>
            <div className="text-[11px] text-muted-foreground">{sub}</div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            {duration && <span className="flex items-center gap-1"><Timer className="h-3 w-3" /> {duration}</span>}
            {active ? <Play className="h-3.5 w-3.5" /> : <MoreHorizontal className="h-3.5 w-3.5" />}
          </div>
        </div>
      </div>
    </div>
  );
}

function HabitRow({ name, streak, dots, filled }: { name: string; streak: number; dots: number; filled: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-xs"><Flame className="h-4 w-4" /></div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">{name}</div>
          <div className="text-xs"><b>{streak}</b> <span className="text-muted-foreground">day streak</span></div>
        </div>
        <div className="mt-1 flex gap-1">
          {Array.from({ length: dots }).map((_, i) => (
            <div key={i} className={`h-1.5 w-4 rounded-full ${i < filled ? "bg-foreground" : "bg-muted"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ name, status, pct, color }: { name: string; status: string; pct: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background text-xs"><Folder className="h-4 w-4" /></div>
      <div className="flex-1">
        <div className="text-xs font-semibold">{name}</div>
        <div className="text-[10px] text-muted-foreground">{status}</div>
      </div>
      <ProgressRing value={pct} color={color} />
    </div>
  );
}

function EventCard({ month, day, title, time }: { month: string; day: string; title: string; time: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border p-2">
      <div className="flex h-11 w-11 flex-col items-center justify-center rounded-lg bg-muted">
        <div className="text-[9px] font-semibold text-muted-foreground">{month}</div>
        <div className="text-sm font-bold leading-none">{day}</div>
      </div>
      <div className="flex-1">
        <div className="text-xs font-semibold">{title}</div>
        <div className="text-[10px] text-muted-foreground">{time}</div>
      </div>
      <CalIcon className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}

function Dot({ c }: { c: string }) {
  return <span className="inline-block h-2 w-2 rounded-full" style={{ background: c }} />;
}
