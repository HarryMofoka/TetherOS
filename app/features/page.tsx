import type { Metadata } from "next";
import { Check, ChevronRight, Calendar as CalIcon } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CTABanner } from "@/components/site/CTABanner";
import { LifeScoreRing, MiniLineChart, ProgressRing } from "@/components/mock/charts";
import { MemorySection, PrivacySection, OfflineSection, FaqSection } from "@/components/site/sections";

export const metadata: Metadata = {
  title: "Features â€” TetherOS",
  description: "Planning, habit building, productivity tools, and AI guidance in one intelligent system.",
  openGraph: {
    title: "Features â€” TetherOS",
    description: "Everything you need. All in one intelligent system.",
    url: "/features",
  },
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-16 text-center">
        <span className="inline-block rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium tracking-wider text-muted-foreground">POWERFUL FEATURES</span>
        <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
          Everything you need.<br />
          All in one <span className="text-muted-foreground/70">intelligent system.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground">
          TetherOS combines planning, habit building, productivity tools, and AI guidance to help you take control of your life.
        </p>
      </section>

      {/* Feature 1 â€” Calendar */}
      <FeatureRow
        n="01"
        icon={<CalIcon className="h-5 w-5" />}
        title="Plan your day"
        desc="Organize tasks, events, and priorities in one beautiful calendar."
        bullets={["Smart scheduling with AI assistance", "Time blocking for deep focus", "Seamless calendar integrations"]}
        left={<CalendarMock />}
        right={<TodayMiniPhone />}
      />

      {/* Feature 2 & 3 */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="md:col-span-1">
              <HabitsPhone />
            </div>
            <div>
              <div className="text-sm font-semibold text-[color:var(--brand-blue)]">02</div>
              <h3 className="mt-1 text-2xl font-bold">Build better habits</h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">Create routines that stick and track your consistency over time.</p>
              <ul className="mt-5 space-y-2 text-sm">
                {["Custom habits and reminders", "Visual streaks and analytics", "Flexible goals that adapt to you"].map((b) => (
                  <li key={b} className="flex items-center gap-2"><Check className="h-4 w-4 text-[color:var(--brand-green)]" /> {b}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-[color:var(--brand-blue)]">03</div>
              <h3 className="mt-1 text-2xl font-bold">Track everything</h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">See your progress across tasks, habits, projects, and personal goals.</p>
              <ul className="mt-5 space-y-2 text-sm">
                {["Beautiful progress dashboards", "Insights that help you grow", "Celebrate wins, big or small"].map((b) => (
                  <li key={b} className="flex items-center gap-2"><Check className="h-4 w-4 text-[color:var(--brand-green)]" /> {b}</li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl border border-border p-4">
                <div className="flex items-start justify-between">
                  <LifeScoreRing size={100} />
                  <div className="space-y-2 text-right text-xs">
                    <div><div className="text-muted-foreground">Days with TetherOS</div><div className="text-base font-bold">47</div></div>
                    <div><div className="text-muted-foreground">Goals Completed</div><div className="text-base font-bold">12</div></div>
                    <div><div className="text-muted-foreground">Current Streak</div><div className="text-base font-bold">9 days</div></div>
                  </div>
                </div>
                <MiniLineChart className="mt-4 w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 4 â€” AI Coach */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="text-sm font-semibold text-[color:var(--brand-blue)]">04</div>
              <h3 className="mt-1 text-2xl font-bold">AI Coach</h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">Get personalized guidance and support whenever you need it.</p>
              <ul className="mt-5 space-y-2 text-sm">
                {["AI reflections and insights", "Personalized recommendations", "Coach mode for deeper guidance"].map((b) => (
                  <li key={b} className="flex items-center gap-2"><Check className="h-4 w-4 text-[color:var(--brand-green)]" /> {b}</li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-1">
              <AICoachMock />
            </div>
            <div>
              <JournalPhone />
            </div>
          </div>
        </div>
      </section>

      {/* Feature 5 & 6 */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="text-sm font-semibold text-[color:var(--brand-blue)]">05</div>
              <h3 className="mt-1 text-2xl font-bold">Projects & goals</h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">Manage all your projects and goals in one place.</p>
              <ul className="mt-5 space-y-2 text-sm">
                {["Break projects into actionable steps", "Track deadlines and milestones", "Stay on track, always"].map((b) => (
                  <li key={b} className="flex items-center gap-2"><Check className="h-4 w-4 text-[color:var(--brand-green)]" /> {b}</li>
                ))}
              </ul>
            </div>
            <div><ProjectsMock /></div>
            <div>
              <div className="text-sm font-semibold text-[color:var(--brand-blue)]">06</div>
              <h3 className="mt-1 text-2xl font-bold">Integrations</h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">Connect the tools you already use. Everything in sync.</p>
              <ul className="mt-5 space-y-2 text-sm">
                {["Google Calendar, Apple Health, Notion & more", "Secure and private", "More integrations coming soon"].map((b) => (
                  <li key={b} className="flex items-center gap-2"><Check className="h-4 w-4 text-[color:var(--brand-green)]" /> {b}</li>
                ))}
              </ul>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {["ðŸ“…", "N", "â™¥", "ðŸŽµ", "+"].map((i, idx) => (
                  <div key={idx} className="flex h-12 items-center justify-center rounded-xl border border-border bg-background text-lg">{i}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <MemorySection />
      <OfflineSection />
      <PrivacySection />
      <FaqSection title="Feature FAQs" items={[
        { q: "Can I time-block right from my task list?", a: "Yes. Drag any task from the priority list onto the Planner sheet to schedule it into a time block, GTD-style." },
        { q: "How are streaks calculated when I travel?", a: "Streaks use 24-hour offsets tied to your local timezone at log time, so a red-eye flight won't reset a habit you actually completed." },
        { q: "What does the Life Timeline actually show?", a: "A single chronological feed of task completions, habit logs, and journal entries â€” with emotional index values and semantic tags." },
        { q: "How does semantic search work offline?", a: "Journal entries are embedded locally with Transformers.js (all-MiniLM-L6-v2) and stored in an on-device vector index. Search runs in under 100ms without a network." },
      ]} />
      <CTABanner title="Ready to experience TetherOS?" description="Join thousands of people who are organizing their life and achieving their goals with AI." secondary="See How It Works" />
    </SiteLayout>
  );
}

function FeatureRow({ n, icon, title, desc, bullets, left, right }: { n: string; icon: React.ReactNode; title: string; desc: string; bullets: string[]; left: React.ReactNode; right: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-10 md:grid-cols-[1fr_1.5fr_1fr] md:items-center">
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card">{icon}</div>
          <div className="mt-5 text-sm font-semibold text-[color:var(--brand-blue)]">{n}</div>
          <h3 className="mt-1 text-2xl font-bold">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
          <ul className="mt-5 space-y-2 text-sm">
            {bullets.map((b: string) => (
              <li key={b} className="flex items-center gap-2"><Check className="h-4 w-4 text-[color:var(--brand-green)]" /> {b}</li>
            ))}
          </ul>
        </div>
        <div>{left}</div>
        <div>{right}</div>
      </div>
    </section>
  );
}

function CalendarMock() {
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold">Calendar</div>
        <div className="text-xs text-muted-foreground">â€¹ Today â€º</div>
      </div>
      <div className="mt-3 text-sm font-semibold">February 2025</div>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] text-muted-foreground">
        {["MON","TUE","WED","THU","FRI","SAT","SUN"].map(d => <div key={d}>{d}</div>)}
        {days.map(d => (
          <div key={d} className={`flex h-7 items-center justify-center rounded-full text-xs ${d === 11 ? "bg-foreground text-background font-semibold" : "text-foreground"}`}>{d}</div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs font-semibold">Tuesday, 11 February</div>
        <div className="text-[10px] text-[color:var(--brand-blue)]">âœ¨ Plan with AI</div>
      </div>
      <div className="mt-2 space-y-2">
        <EventRow time="08:00" title="Deep Work Session" sub="Build Authentication Flow" duration="2h 30m" />
        <EventRow time="14:00" title="Implement API Endpoints" sub="Connect login & register" duration="1h 30m" active />
      </div>
    </div>
  );
}

function EventRow({ time, title, sub, duration, active }: { time: string; title: string; sub: string; duration: string; active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 rounded-xl border border-border p-2 ${active ? "bg-muted/50" : ""}`}>
      <div className="text-xs font-medium text-muted-foreground">{time}</div>
      <div className="flex-1">
        <div className="text-xs font-semibold">{title}</div>
        <div className="text-[10px] text-muted-foreground">{sub}</div>
      </div>
      <div className="text-[10px] text-muted-foreground">â± {duration}</div>
    </div>
  );
}

function TodayMiniPhone() {
  return (
    <div className="w-[280px] mx-auto rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="space-y-2 p-1">
        <div className="text-sm font-bold">Today</div>
        <div className="text-[9px] text-muted-foreground">Tuesday, 11 February</div>
        <div className="rounded-lg border border-border p-2">
          <div className="text-[9px] text-muted-foreground">TASKS</div>
          <div className="text-[11px] font-semibold">Build Authentication</div>
          <div className="mt-1 flex items-center gap-2"><div className="h-1 flex-1 rounded-full bg-muted"><div className="h-1 w-2/3 rounded-full bg-foreground" /></div><span className="text-[9px]">67%</span></div>
        </div>
        <div className="rounded-lg border border-border p-2"><div className="text-[9px] text-muted-foreground">Calendar</div><div className="text-[11px] font-semibold">3 Events Today</div></div>
        <div className="rounded-lg border border-border p-2"><div className="text-[9px] text-muted-foreground">Habits</div><div className="text-[11px] font-semibold">9 Day Streak</div></div>
        <div className="rounded-lg border border-border p-2"><div className="text-[9px] text-muted-foreground">AI Coach</div><div className="text-[11px] font-semibold">Check-in at 07:30 AM</div></div>
        <div className="text-[9px] font-semibold text-muted-foreground">Up Next</div>
        <div className="rounded-lg border border-border p-2"><div className="text-[11px] font-semibold">Deep Work Session</div><div className="text-[9px] text-muted-foreground">08:00 â€“ 10:00</div></div>
      </div>
    </div>
  );
}

function HabitsPhone() {
  const habits = [
    { name: "Workout", streak: "6 Day Streak" },
    { name: "Read Books", streak: "12 Day Streak" },
    { name: "Meditate", streak: "4 Day Streak" },
    { name: "No Sugar", streak: "8 Day Streak" },
    { name: "Journal", streak: "7 Day Streak" },
  ];
  return (
    <div className="w-[280px] mx-auto rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="space-y-3 p-1">
        <div className="flex items-center gap-2 text-[10px]">
          <span className="rounded-full bg-foreground px-2 py-0.5 text-background">All</span>
          <span className="text-muted-foreground">Active</span>
          <span className="text-muted-foreground">Completed</span>
        </div>
        {habits.map(h => (
          <div key={h.name} className="flex items-center justify-between rounded-lg border border-border p-2">
            <div>
              <div className="text-[11px] font-semibold">{h.name}</div>
              <div className="text-[9px] text-muted-foreground">{h.streak}</div>
            </div>
            <div className="flex gap-0.5">{Array.from({length: 7}).map((_,i) => <div key={i} className="h-1.5 w-1.5 rounded-full bg-foreground/60" />)}</div>
          </div>
        ))}
        <button className="mt-2 w-full rounded-lg bg-foreground py-2 text-[10px] font-semibold text-background">+ Add New Habit</button>
      </div>
    </div>
  );
}

function JournalPhone() {
  return (
    <div className="w-[280px] mx-auto rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="space-y-3 p-1">
        <div className="text-sm font-bold">Journal</div>
        <div className="text-[9px] text-muted-foreground">Write. Reflect. Grow.</div>
        <div className="grid grid-cols-7 gap-1 text-center text-[9px]">
          {["MON","TUE","WED","THU","FRI","SAT","SUN"].map(d => <div key={d} className="text-muted-foreground">{d}</div>)}
          {[10,11,12,13,14,15,16].map(d => (
            <div key={d} className={`flex h-6 items-center justify-center rounded-full ${d===11?"bg-foreground text-background":""}`}>{d}</div>
          ))}
        </div>
        <div className="text-[10px] font-semibold">Tuesday, 11 February 2025</div>
        <div className="text-[10px] font-semibold">How was your day?</div>
        <p className="text-[9px] leading-relaxed text-muted-foreground">
          Today was productive. I finally finished the authentication flow and it feels good to see things coming together. Had a deep work session in the morning which really helped. Grateful for the progress.
        </p>
      </div>
    </div>
  );
}

function AICoachMock() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-semibold">âœ¨ AI Coach</div>
      <div className="mt-3 flex gap-2">
        <div className="h-8 w-8 shrink-0 rounded-full bg-muted" />
        <div className="rounded-xl border border-border bg-background p-3 text-xs">
          You&apos;ve been consistently productive in the mornings. Consider scheduling your most important tasks between 8â€“11 AM.
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-[10px]">
        {["Help me focus", "Plan my day", "Reflect on today"].map(t => (
          <button key={t} className="rounded-full border border-border bg-background px-3 py-1">{t}</button>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-[11px] text-muted-foreground">
        Ask your AI Coach anything... <span className="ml-auto">â†—</span>
      </div>
    </div>
  );
}

function ProjectsMock() {
  const items = [
    { name: "AI Resume Builder", status: "Active", note: "Due Feb Today", pct: 67 },
    { name: "TetherOS Mobile App", status: "Active", note: "Due Mar 5, 2025", pct: 42 },
    { name: "Personal Website", status: "On Hold", note: "No deadline", pct: 25 },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold">Projects</div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-3 flex gap-2 text-[10px]">
        <span className="rounded-full bg-foreground px-2 py-0.5 text-background">All</span>
        <span className="text-muted-foreground">Active</span>
        <span className="text-muted-foreground">On Hold</span>
        <span className="text-muted-foreground">Completed</span>
        <span className="ml-auto text-muted-foreground">Newest</span>
      </div>
      <div className="mt-3 space-y-2">
        {items.map(p => (
          <div key={p.name} className="flex items-center gap-3 rounded-xl border border-border p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-xs">ðŸ“¦</div>
            <div className="flex-1">
              <div className="text-xs font-semibold">{p.name}</div>
              <div className="text-[10px] text-muted-foreground">{p.status} Â· {p.note}</div>
            </div>
            <ProgressRing value={p.pct} />
          </div>
        ))}
      </div>
    </div>
  );
}
