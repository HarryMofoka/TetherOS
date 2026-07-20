import type { Metadata } from "next";
import { ChevronDown, Play, MoreHorizontal, Calendar as CalIcon, Flame, Folder, Timer, Plus, ArrowUpRight, Target, Calendar, Video } from "lucide-react";
import { LifeScoreRing, MiniLineChart, Donut, ProgressRing } from "@/components/mock/charts";

export const metadata: Metadata = {
  title: "Dashboard â€” TetherOS",
  description: "Your daily command center: plan, focus, habits, projects, and progress in one view.",
  openGraph: { url: "/dashboard" },
  alternates: { canonical: "/dashboard" },
};

export default function Dashboard() {
  return (
    <>
      <div className="px-8 pt-6">
        <h1 className="text-2xl font-bold">Good morning, Harry ðŸ‘‹</h1>
        <p className="text-xs text-muted-foreground">Tuesday, 11 February 2025</p>
      </div>

      <div className="grid grid-cols-12 gap-6 px-8 py-6">
        {/* Center column */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <div className="relative col-span-2 overflow-hidden rounded-2xl border border-border bg-card p-4 md:col-span-1">
              <div className="relative z-10">
                <div className="text-[10px] font-bold tracking-wider text-muted-foreground">LIFE SCORE</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-3xl font-black">82</span>
                </div>
                <div className="mt-2 text-xs font-bold text-foreground">Great progress!</div>
                <div className="mt-0.5 text-[10px] text-muted-foreground">Top 10% this week</div>
              </div>
              <div className="absolute -bottom-6 -right-6 opacity-[0.15]">
                <LifeScoreRing size={110} showText={false} strokeWidth={16} />
              </div>
            </div>
            <Stat label="Days with TetherOS" value="47" unit="Days" delta="â†‘ 12 this month" icon={Calendar} />
            <Stat label="Goals Completed" value="12" unit="This year" delta="â†‘ 4 this month" icon={Target} />
            <Stat label="Current Streak" value="9" unit="days" delta="Keep it up!" icon={Flame} />
            <Stat label="Focus Time" value="18h 42m" unit="This week" delta="â†‘ 2h 15m vs last week" icon={Timer} />
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
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5">
                <div className="relative z-10 flex items-center justify-between">
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

              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="absolute -right-8 -top-8 opacity-[0.05]">
                  <Timer size={140} />
                </div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="font-semibold">Focus Timer <ChevronDown className="inline h-3 w-3" /></div>
                </div>
                <div className="relative z-10 mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold tracking-wider text-muted-foreground">DEEP WORK</div>
                    <div className="mt-1 text-4xl font-black text-foreground">25:00</div>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background transition-transform hover:scale-105 hover:bg-foreground/90"><Play className="h-4 w-4 fill-current" /> Start</button>
                </div>
                <div className="relative z-10 mt-5 flex items-center justify-between border-t border-border/50 pt-3 text-[10px] font-medium text-muted-foreground">
                  <span className="text-foreground">Pomodoro</span>
                  <span className="cursor-pointer transition-colors hover:text-foreground">Short Break</span>
                  <span className="cursor-pointer transition-colors hover:text-foreground">Long Break</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-12 space-y-6 lg:col-span-3">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5">
            <div className="relative z-10 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
                <span className="text-xs text-background">âœ¨</span>
              </div>
              <div className="text-sm font-bold">AI Coach</div>
              <span className="ml-auto rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">ONLINE</span>
            </div>
            <div className="relative z-10 mt-4 rounded-xl border border-border bg-muted/50 p-4 text-xs">
              <p className="leading-relaxed text-foreground">You usually do your best work between 8â€“11 AM. Consider blocking distractions during that time.</p>
              <div className="mt-3 text-[10px] font-medium text-muted-foreground">Just now</div>
            </div>
            <div className="relative z-10 mt-4 flex flex-wrap gap-2">
              {["Plan my day","Help me focus","Reflect on today"].map(t => (
                <button key={t} className="rounded-full border border-border bg-background px-3 py-1.5 text-[10px] font-medium transition-colors hover:bg-muted">{t}</button>
              ))}
            </div>
            <div className="relative z-10 mt-4 flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-xs text-muted-foreground shadow-sm transition-shadow hover:shadow-md">
              Ask your AI Coach anything... <ArrowUpRight className="ml-auto h-4 w-4" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Projects</div>
              <button className="flex items-center gap-1 text-[11px] hover:text-muted-foreground"><Plus className="h-3 w-3" /> View all</button>
            </div>
            <div className="mt-4 space-y-1">
              <ProjectRow name="AI Resume Builder" status="On Track" pct={67} color="oklch(0.62 0.19 256)" />
              <ProjectRow name="TetherOS Mobile App" status="Behind" pct={42} color="oklch(0.62 0.22 25)" />
              <ProjectRow name="Personal Website" status="On Hold" pct={25} color="oklch(0.75 0.15 80)" />
              <ProjectRow name="Reading Tracker" status="On Track" pct={80} color="oklch(0.72 0.17 155)" />
            </div>
            <button className="mt-4 w-full rounded-xl border border-dashed border-border py-2 text-xs text-muted-foreground flex items-center justify-center gap-1 hover:bg-muted/50 transition-colors"><Plus className="h-3 w-3" /> New Project</button>
          </div>
        </div>

        {/* Bottom area */}
        <div className="col-span-12 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Weekly Progress</div>
                <button className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[10px] font-bold text-muted-foreground hover:bg-muted/80"><Plus className="h-3 w-3" /> This Week</button>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-black text-foreground">34h 12m</span>
                <span className="text-xs font-medium text-muted-foreground">total focus</span>
              </div>
              <MiniLineChart className="mt-6 w-full" />
              <div className="mt-2 grid grid-cols-7 text-center text-[10px] font-semibold text-muted-foreground">
                {["M","T","W","T","F","S","S"].map((d, i) => (
                  <div key={i} className={`flex h-6 w-6 items-center justify-center place-self-center rounded-full transition-colors ${i === 1 ? "bg-foreground text-background shadow-sm" : "hover:bg-muted"}`}>
                    {d}
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl border border-border bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">
                ðŸ’¡ You've been <b>20% more focused</b> than last week. Keep up the great momentum, Harry!
              </div>
            </div>
            
            <div className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="font-semibold">Tasks Overview</div>
              <p className="mt-1 text-[11px] text-muted-foreground">You have 1 overdue task, but you're almost done with today's list!</p>
              <div className="mt-5 flex flex-1 items-center gap-6">
                <div className="relative flex shrink-0 items-center justify-center">
                  <div className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.05)]" />
                  <Donut size={120} segments={[
                    { value: 8, color: "oklch(0.72 0.17 155)" },
                    { value: 6, color: "oklch(0.62 0.19 256)" },
                    { value: 3, color: "oklch(0.75 0.15 80)" },
                    { value: 1, color: "oklch(0.62 0.22 25)" },
                  ]} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-foreground">18</span>
                    <span className="text-[9px] font-bold tracking-wider text-muted-foreground uppercase">Tasks</span>
                  </div>
                </div>
                <ul className="w-full space-y-3 text-xs">
                  <li>
                    <div className="mb-1 flex items-center justify-between"><span className="flex items-center gap-1.5"><Dot c="oklch(0.72 0.17 155)" /> Completed</span> <b>8</b></div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full" style={{ backgroundColor: "oklch(0.72 0.17 155)", width: "44%" }} /></div>
                  </li>
                  <li>
                    <div className="mb-1 flex items-center justify-between"><span className="flex items-center gap-1.5"><Dot c="oklch(0.62 0.19 256)" /> In Progress</span> <b>6</b></div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full" style={{ backgroundColor: "oklch(0.62 0.19 256)", width: "33%" }} /></div>
                  </li>
                  <li>
                    <div className="mb-1 flex items-center justify-between"><span className="flex items-center gap-1.5"><Dot c="oklch(0.75 0.15 80)" /> Pending</span> <b>3</b></div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full" style={{ backgroundColor: "oklch(0.75 0.15 80)", width: "17%" }} /></div>
                  </li>
                  <li>
                    <div className="mb-1 flex items-center justify-between"><span className="flex items-center gap-1.5"><Dot c="oklch(0.62 0.22 25)" /> Overdue</span> <b style={{ color: "oklch(0.62 0.22 25)" }}>1</b></div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full" style={{ backgroundColor: "oklch(0.62 0.22 25)", width: "6%" }} /></div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Upcoming Events</div>
                <p className="mt-1 text-[11px] text-muted-foreground">Your next meeting starts in 30 minutes.</p>
              </div>
              <button className="text-[11px] text-muted-foreground hover:text-foreground">View Calendar</button>
            </div>
            <div className="relative z-10 mt-5 grid gap-4 md:grid-cols-3">
              <EventCard month="FEB" day="12" title="Team Standup" time="10:00 AM â€“ 10:30 AM" location="Google Meet" upNext />
              <EventCard month="FEB" day="14" title="Product Review" time="02:00 PM â€“ 03:00 PM" location="Zoom" />
              <EventCard month="FEB" day="18" title="Design Meeting" time="11:00 AM â€“ 12:00 PM" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Stat({ label, value, unit, delta, icon: Icon }: { label: string; value: string; unit: string; delta: string; icon: any }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-md">
      <div className="relative z-10">
        <div className="text-[10px] font-bold tracking-wider text-muted-foreground">{label.toUpperCase()}</div>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-3xl font-black text-foreground">{value}</span>
          <span className="text-[10px] font-medium text-muted-foreground">{unit}</span>
        </div>
        <div className="mt-2 text-[10px] font-medium text-muted-foreground">{delta}</div>
      </div>
      <div className="absolute -bottom-6 -right-6 opacity-[0.05]">
        <Icon size={100} className="text-foreground" strokeWidth={2} />
      </div>
    </div>
  );
}

function PlanRow({ time, title, sub, duration, active }: { time: string; title: string; sub: string; duration?: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 text-xs font-medium text-muted-foreground">{time}</div>
      <div className="relative flex h-3 w-3 items-center justify-center">
        {active && <div className="absolute h-full w-full animate-ping rounded-full bg-foreground opacity-20" />}
        <div className={`h-2 w-2 rounded-full ${active ? "bg-foreground" : "bg-muted-foreground/30"}`} />
      </div>
      <div className={`flex-1 rounded-xl border p-3 transition-colors ${active ? "border-border bg-muted/50 shadow-sm backdrop-blur-md" : "border-border/50 bg-card/50"}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-sm font-semibold ${active ? "text-foreground" : ""}`}>{title}</div>
            <div className="text-[11px] text-muted-foreground">{sub}</div>
          </div>
          <div className={`flex items-center gap-2 text-[11px] ${active ? "text-foreground" : "text-muted-foreground"}`}>
            {duration && <span className="flex items-center gap-1"><Timer className="h-3 w-3" /> {duration}</span>}
            {active ? <Play className="h-3.5 w-3.5 fill-current" /> : <MoreHorizontal className="h-3.5 w-3.5" />}
          </div>
        </div>
      </div>
    </div>
  );
}

function HabitRow({ name, streak, dots, filled }: { name: string; streak: number; dots: number; filled: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground ring-1 ring-border"><Flame className="h-4 w-4" /></div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">{name}</div>
          <div className="text-[10px]"><b>{streak}</b> <span className="text-muted-foreground">day streak</span></div>
        </div>
        <div className="mt-1 flex gap-1">
          {Array.from({ length: dots }).map((_, i) => (
            <div key={i} className={`h-1.5 w-5 rounded-full ${i < filled ? "bg-foreground" : "bg-muted"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ name, status, pct, color }: { name: string; status: string; pct: number; color: string }) {
  return (
    <div className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted/50">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
        <Folder className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold group-hover:text-foreground">{name}</div>
        <div className="text-[10px] font-medium text-muted-foreground">{status}</div>
      </div>
      <ProgressRing value={pct} color={color} size={36} />
    </div>
  );
}

function EventCard({ month, day, title, time, upNext, location }: { month: string; day: string; title: string; time: string; upNext?: boolean; location?: string }) {
  return (
    <div className={`relative flex items-center gap-3 overflow-hidden rounded-xl border transition-shadow hover:shadow-md ${upNext ? "border-foreground/50 bg-muted/30 p-3 shadow-[0_0_20px_rgba(0,0,0,0.05)]" : "border-border bg-card p-2 shadow-sm"}`}>
      <div className={`absolute left-0 top-0 h-full w-1 ${upNext ? "bg-foreground" : "bg-muted-foreground/30"}`} />
      <div className={`ml-1 flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg ${upNext ? "bg-foreground text-background shadow-sm" : "bg-muted text-muted-foreground"}`}>
        <div className="text-[9px] font-bold tracking-wider">{month}</div>
        <div className="text-sm font-black leading-none">{day}</div>
      </div>
      <div className="flex-1">
        {upNext && <div className="mb-0.5 text-[9px] font-black tracking-wider text-foreground">UP NEXT â€¢ IN 30 MINS</div>}
        <div className={`font-semibold ${upNext ? "text-sm text-foreground" : "text-xs"}`}>{title}</div>
        <div className="mt-0.5 flex items-center gap-2 text-[10px] font-medium text-muted-foreground">
          <span>{time}</span>
          {location && <span className="flex items-center gap-0.5"><Video className="h-3 w-3" /> {location}</span>}
        </div>
      </div>
      {upNext ? (
        <button className="mr-1 rounded-full bg-foreground px-3 py-1.5 text-xs font-bold text-background shadow-md transition-transform hover:scale-105">Join</button>
      ) : (
        <div className="mr-2 rounded-full bg-muted p-1.5 text-muted-foreground">
          <CalIcon className="h-3 w-3" />
        </div>
      )}
    </div>
  );
}

function Dot({ c }: { c: string }) {
  return <span className="inline-block h-2 w-2 rounded-full" style={{ background: c }} />;
}
