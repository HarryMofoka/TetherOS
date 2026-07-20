"use client";

import { ChevronDown, Play, MoreHorizontal, Calendar as CalIcon, Flame, Folder, Timer, Plus, ArrowUpRight, Target, Calendar, Video, CheckCircle2, Circle } from "lucide-react";
import { LifeScoreRing, MiniLineChart, Donut, ProgressRing } from "@/components/mock/charts";
import { useMockData } from "@/components/providers/MockDataProvider";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const { tasks, habits, projects, events, toggleHabit, updateTaskStatus } = useMockData();
  const [timerRunning, setTimerRunning] = useState(false);

  const pendingTasks = tasks.filter(t => t.status !== "Done");
  const doneTasks = tasks.filter(t => t.status === "Done");
  const todoTasksCount = tasks.filter(t => t.status === "To Do").length;
  const inProgressTasksCount = tasks.filter(t => t.status === "In Progress").length;
  
  // Calculate life score
  const score = Math.round(((doneTasks.length + habits.filter(h => h.completedToday).length) / Math.max(tasks.length + habits.length, 1)) * 100);

  return (
    <>
      <div className="px-4 md:px-8 pt-6">
        <h1 className="text-2xl font-bold">Good morning, Harry👋</h1>
        <p className="text-xs text-muted-foreground">Tuesday, 11 February 2025</p>
      </div>

      <div className="grid grid-cols-12 gap-6 px-4 md:px-8 py-6">
        {/* Center column */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <div className="relative col-span-2 overflow-hidden rounded-2xl border border-border bg-card p-4 md:col-span-1">
              <div className="relative z-10">
                <div className="text-[10px] font-bold tracking-wider text-muted-foreground">LIFE SCORE</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-3xl font-black">{score}</span>
                </div>
                <div className="mt-2 text-xs font-bold text-foreground">Great progress!</div>
                <div className="mt-0.5 text-[10px] text-muted-foreground">Top 10% this week</div>
              </div>
              <div className="absolute -bottom-6 -right-6 opacity-[0.15]">
                <LifeScoreRing size={110} showText={false} strokeWidth={16} />
              </div>
            </div>
            <Stat label="Days with TetherOS" value="47" unit="Days" delta="↑ 12 this month" icon={Calendar} />
            <Stat label="Goals Completed" value={doneTasks.length.toString()} unit="Total" delta="Keep it up" icon={Target} />
            <Stat label="Current Streak" value="9" unit="days" delta="Keep it up!" icon={Flame} />
            <Stat label="Focus Time" value="18h 42m" unit="This week" delta="↑ 2h 15m vs last week" icon={Timer} />
          </div>

          {/* Today plan + Habits */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Today's Tasks</div>
                <Link href="/dashboard/tasks" className="text-xs text-muted-foreground hover:text-foreground">View Tasks</Link>
              </div>
              <div className="mt-4 space-y-3">
                {tasks.slice(0, 5).map((t) => (
                  <PlanRow 
                    key={t.id}
                    title={t.title} 
                    sub={t.tag} 
                    active={t.status === "In Progress"} 
                    completed={t.status === "Done"}
                    onToggle={() => updateTaskStatus(t.id, t.status === "Done" ? "To Do" : "Done")}
                  />
                ))}
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Completed {doneTasks.length} of {tasks.length} tasks</span>
                  <span>{Math.round((doneTasks.length / Math.max(tasks.length, 1)) * 100)}%</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-muted">
                  <div className="h-1.5 rounded-full bg-foreground transition-all" style={{ width: `${(doneTasks.length / Math.max(tasks.length, 1)) * 100}%` }} />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5">
                <div className="relative z-10 flex items-center justify-between">
                  <div className="font-semibold">Habits</div>
                  <Link href="/dashboard/habits" className="text-xs text-muted-foreground hover:text-foreground">See all</Link>
                </div>
                <div className="mt-4 space-y-3">
                  {habits.slice(0, 4).map((h) => (
                    <HabitRow 
                      key={h.id} 
                      name={h.name} 
                      streak={h.streak} 
                      completed={h.completedToday}
                      onToggle={() => toggleHabit(h.id)} 
                    />
                  ))}
                </div>
                <Link href="/dashboard/habits" className="mt-4 w-full rounded-xl border border-dashed border-border py-2 text-xs text-muted-foreground flex items-center justify-center gap-1 hover:bg-muted transition-colors"><Plus className="h-3 w-3" /> Manage Habits</Link>
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
                  <button onClick={() => setTimerRunning(!timerRunning)} className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background transition-transform hover:scale-105 hover:bg-foreground/90">
                    <Play className="h-4 w-4 fill-current" /> {timerRunning ? "Pause" : "Start"}
                  </button>
                </div>
                <div className="relative z-10 mt-5 flex items-center justify-between border-t border-border/50 pt-3 text-[10px] font-medium text-muted-foreground">
                  <Link href="/dashboard/focus" className="text-foreground hover:underline">Pomodoro Timer &rarr;</Link>
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
                <span className="text-xs text-background">✨</span>
              </div>
              <div className="text-sm font-bold">AI Coach</div>
              <span className="ml-auto rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">ONLINE</span>
            </div>
            <div className="relative z-10 mt-4 rounded-xl border border-border bg-muted/50 p-4 text-xs">
              <p className="leading-relaxed text-foreground">You usually do your best work between 8–11 AM. Consider blocking distractions during that time.</p>
              <div className="mt-3 text-[10px] font-medium text-muted-foreground">Just now</div>
            </div>
            <div className="relative z-10 mt-4 flex flex-wrap gap-2">
              {["Plan my day","Help me focus","Reflect on today"].map(t => (
                <button key={t} className="rounded-full border border-border bg-background px-3 py-1.5 text-[10px] font-medium transition-colors hover:bg-muted">{t}</button>
              ))}
            </div>
            <Link href="/dashboard/coach" className="relative z-10 mt-4 flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-xs text-muted-foreground shadow-sm transition-shadow hover:shadow-md cursor-pointer">
              Ask your AI Coach anything... <ArrowUpRight className="ml-auto h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Projects</div>
              <Link href="/dashboard/projects" className="flex items-center gap-1 text-[11px] hover:text-muted-foreground"><Plus className="h-3 w-3" /> View all</Link>
            </div>
            <div className="mt-4 space-y-1">
              {projects.slice(0, 4).map(p => (
                <ProjectRow key={p.id} name={p.name} status={p.status} pct={p.progressPct} color={p.status === "Active" ? "oklch(0.62 0.19 256)" : p.status === "Completed" ? "oklch(0.72 0.17 155)" : "oklch(0.62 0.22 25)"} />
              ))}
            </div>
            <Link href="/dashboard/projects" className="mt-4 w-full rounded-xl border border-dashed border-border py-2 text-xs text-muted-foreground flex items-center justify-center gap-1 hover:bg-muted/50 transition-colors"><Plus className="h-3 w-3" /> View Projects</Link>
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
                💡 You've been <b>20% more focused</b> than last week. Keep up the great momentum, Harry!
              </div>
            </div>
            
            <div className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="font-semibold">Tasks Overview</div>
              <p className="mt-1 text-[11px] text-muted-foreground">You have {tasks.length} total tasks on your plate.</p>
              <div className="mt-5 flex flex-1 items-center gap-6">
                <div className="relative flex shrink-0 items-center justify-center">
                  <div className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.05)]" />
                  <Donut size={120} segments={[
                    { value: doneTasks.length || 1, color: "oklch(0.72 0.17 155)" },
                    { value: inProgressTasksCount || 1, color: "oklch(0.62 0.19 256)" },
                    { value: todoTasksCount || 1, color: "oklch(0.75 0.15 80)" },
                  ]} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-foreground">{tasks.length}</span>
                    <span className="text-[9px] font-bold tracking-wider text-muted-foreground uppercase">Tasks</span>
                  </div>
                </div>
                <ul className="w-full space-y-3 text-xs">
                  <li>
                    <div className="mb-1 flex items-center justify-between"><span className="flex items-center gap-1.5"><Dot c="oklch(0.72 0.17 155)" /> Completed</span> <b>{doneTasks.length}</b></div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full transition-all" style={{ backgroundColor: "oklch(0.72 0.17 155)", width: `${(doneTasks.length/Math.max(tasks.length,1))*100}%` }} /></div>
                  </li>
                  <li>
                    <div className="mb-1 flex items-center justify-between"><span className="flex items-center gap-1.5"><Dot c="oklch(0.62 0.19 256)" /> In Progress</span> <b>{inProgressTasksCount}</b></div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full transition-all" style={{ backgroundColor: "oklch(0.62 0.19 256)", width: `${(inProgressTasksCount/Math.max(tasks.length,1))*100}%` }} /></div>
                  </li>
                  <li>
                    <div className="mb-1 flex items-center justify-between"><span className="flex items-center gap-1.5"><Dot c="oklch(0.75 0.15 80)" /> Pending</span> <b>{todoTasksCount}</b></div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full transition-all" style={{ backgroundColor: "oklch(0.75 0.15 80)", width: `${(todoTasksCount/Math.max(tasks.length,1))*100}%` }} /></div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Upcoming Events</div>
                <p className="mt-1 text-[11px] text-muted-foreground">Your next event starts soon.</p>
              </div>
              <Link href="/dashboard/calendar" className="text-[11px] text-muted-foreground hover:text-foreground">View Calendar</Link>
            </div>
            <div className="relative z-10 mt-5 grid gap-4 md:grid-cols-3">
              {events.slice(0, 3).map((e, i) => (
                <EventCard key={e.id} month="FEB" day={12 + i + ""} title={e.title} time={e.time} upNext={i === 0} />
              ))}
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

function PlanRow({ title, sub, active, completed, onToggle }: { title: string; sub: string; active?: boolean; completed?: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center gap-3">
      <button onClick={onToggle} className={`relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${completed ? "bg-foreground border-foreground text-background" : "border-border text-transparent hover:border-foreground"}`}>
        <CheckCircle2 className="h-4 w-4 fill-current" />
      </button>
      <div className={`flex-1 rounded-xl border p-3 transition-colors ${active && !completed ? "border-border bg-muted/50 shadow-sm backdrop-blur-md" : "border-border/50 bg-card/50"}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-sm font-semibold ${(active || completed) ? "text-foreground" : ""} ${completed ? "line-through text-muted-foreground" : ""}`}>{title}</div>
            <div className={`text-[11px] ${completed ? "text-muted-foreground/50" : "text-muted-foreground"}`}>{sub}</div>
          </div>
          <div className={`flex items-center gap-2 text-[11px] ${active && !completed ? "text-foreground" : "text-muted-foreground"}`}>
            {active && !completed ? <Play className="h-3.5 w-3.5 fill-current" /> : <MoreHorizontal className="h-3.5 w-3.5" />}
          </div>
        </div>
      </div>
    </div>
  );
}

function HabitRow({ name, streak, completed, onToggle }: { name: string; streak: number; completed: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center gap-3">
      <button onClick={onToggle} className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ring-1 ${completed ? "bg-foreground text-background ring-foreground" : "bg-muted text-muted-foreground ring-border hover:bg-muted/80"}`}>
        <Flame className="h-4 w-4" />
      </button>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className={`text-sm font-medium ${completed ? "line-through text-muted-foreground" : ""}`}>{name}</div>
          <div className="text-[10px]"><b>{streak}</b> <span className="text-muted-foreground">day streak</span></div>
        </div>
        <div className="mt-1 flex gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={`h-1.5 w-5 rounded-full ${i < Math.min(streak, 7) ? "bg-foreground" : "bg-muted"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ name, status, pct, color }: { name: string; status: string; pct: number; color: string }) {
  return (
    <Link href="/dashboard/projects" className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted/50">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
        <Folder className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold group-hover:text-foreground">{name}</div>
        <div className="text-[10px] font-medium text-muted-foreground">{status}</div>
      </div>
      <ProgressRing value={pct} color={color} size={36} />
    </Link>
  );
}

function EventCard({ month, day, title, time, upNext, location }: { month: string; day: string; title: string; time: string; upNext?: boolean; location?: string }) {
  return (
    <Link href="/dashboard/calendar" className={`relative flex items-center gap-3 overflow-hidden rounded-xl border transition-shadow hover:shadow-md ${upNext ? "border-foreground/50 bg-muted/30 p-3 shadow-[0_0_20px_rgba(0,0,0,0.05)]" : "border-border bg-card p-2 shadow-sm"}`}>
      <div className={`absolute left-0 top-0 h-full w-1 ${upNext ? "bg-foreground" : "bg-muted-foreground/30"}`} />
      <div className={`ml-1 flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg ${upNext ? "bg-foreground text-background shadow-sm" : "bg-muted text-muted-foreground"}`}>
        <div className="text-[9px] font-bold tracking-wider">{month}</div>
        <div className="text-sm font-black leading-none">{day}</div>
      </div>
      <div className="flex-1">
        {upNext && <div className="mb-0.5 text-[9px] font-black tracking-wider text-foreground">UP NEXT • IN 30 MINS</div>}
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
    </Link>
  );
}

function Dot({ c }: { c: string }) {
  return <span className="inline-block h-2 w-2 rounded-full" style={{ background: c }} />;
}
