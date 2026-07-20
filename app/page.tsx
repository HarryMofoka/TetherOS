import type { Metadata } from "next";
import { ArrowRight, Calendar, Activity, CheckSquare, Book, BarChart, MessageSquare, Star } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { TodayPhone } from "@/components/mock/TodayPhone";
import { LifeScoreRing } from "@/components/mock/charts";
import { PrivacySection, MemorySection, OfflineSection, TestimonialsSection, FaqSection, TrustBadges } from "@/components/site/sections";

export const metadata: Metadata = {
  title: "LifeOS — Your life. Organized. Powered by AI.",
  description: "One intelligent system to plan your day, build better habits, and become who you're meant to be.",
  openGraph: {
    title: "LifeOS — Your life. Organized.",
    description: "AI-powered planning, habits, and reflection in one system.",
    url: "/",
  },
  alternates: { canonical: "/" },
};

const features = [
  { icon: Calendar, title: "Plan Smarter", desc: "AI-powered planning that adapts to you." },
  { icon: Activity, title: "Build Habits", desc: "Track streaks and create lasting routines." },
  { icon: CheckSquare, title: "Stay Focused", desc: "Smart tasks, time blocks and progress tracking." },
  { icon: Book, title: "Reflect Daily", desc: "Journal prompts and AI reflections." },
  { icon: BarChart, title: "Track Progress", desc: "Visualize your growth and achievements." },
  { icon: MessageSquare, title: "AI Coach", desc: "Get personalized guidance when you need it." },
];

const steps = [
  { n: 1, title: "Plan your day", desc: "Use AI to plan tasks, set priorities and schedule your time." },
  { n: 2, title: "Take action", desc: "Stay focused with your plan, build habits and track progress." },
  { n: 3, title: "Reflect & improve", desc: "Review your day, reflect with AI, and keep getting better." },
];

const brands = ["Notion", "Google", "Microsoft", "Apple", "Spotify", "airbnb"];

export default function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-8 pb-20">
        <div className="grid gap-10 md:grid-cols-2 md:gap-6">
          <div className="pt-10">
            <span className="inline-block rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium tracking-wider text-muted-foreground">
              AI-POWERED LIFE OPERATING SYSTEM
            </span>
            <h1 className="mt-8 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Your life.<br />Organized.<br />
              <span className="text-muted-foreground/70">Powered by AI.</span>
            </h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground">
              One intelligent system to plan your day, build better habits, and become who you&apos;re meant to be.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium hover:bg-muted">
                See How It Works <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted" style={{ background: `linear-gradient(135deg, hsl(${i * 60},60%,70%), hsl(${i * 60 + 30},60%,50%))` }} />
                ))}
              </div>
              <div>
                <div className="flex text-yellow-500">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}</div>
                <div className="text-xs text-muted-foreground">Join 10,000+ people building better lives</div>
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <TodayPhone />
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="border-y border-border/60 bg-background py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center text-[11px] font-medium tracking-widest text-muted-foreground">TRUSTED BY PEOPLE FROM</div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-14 gap-y-6 text-muted-foreground">
            {brands.map((b) => <span key={b} className="text-lg font-semibold opacity-70">{b}</span>)}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-center text-3xl font-bold md:text-4xl">Everything you need to take control of your life.</h2>
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-6">
          {features.map((f) => (
            <div key={f.title}>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-sm font-semibold">{f.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">How LifeOS works</h2>
            <div className="mt-10 space-y-8">
              {steps.map((s) => (
                <div key={s.n} className="flex gap-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-sm font-semibold">{s.n}</div>
                  <div>
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="mt-1 max-w-sm text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-bold">Good morning, Harry 👋</div>
                <div className="text-xs text-muted-foreground">Let&apos;s make today productive.</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <MiniStat label="Life Score" value="82" />
              <MiniStat label="Days with LifeOS" value="47" />
              <MiniStat label="Goals Completed" value="12" />
            </div>
            <div className="mt-4 rounded-xl border border-border p-3">
              <div className="text-xs text-muted-foreground">Today&apos;s Focus</div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-sm font-semibold">Build Authentication</span>
                <span className="text-[10px] text-muted-foreground">1h 20m / 3h 00m</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-muted"><div className="h-1.5 w-2/3 rounded-full bg-foreground" /></div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3 text-center">
              {[["Tasks", "8"], ["Habits", "2"], ["Events", "3"], ["Focus Time", "2h 30m"]].map(([l, v]) => (
                <div key={l} className="rounded-xl border border-border p-2">
                  <div className="text-sm font-bold">{v}</div>
                  <div className="text-[10px] text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <OfflineSection />
      <PrivacySection />
      <MemorySection />
      <TrustBadges />
      <TestimonialsSection />
      <FaqSection />

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Ready to take control<br />of your life?</h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          Join thousands who are already building better habits, achieving goals, and living with purpose.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background">Get Started Free <ArrowRight className="h-4 w-4" /></button>
          <button className="rounded-full border border-border bg-background px-6 py-3 text-sm font-medium">Explore Features</button>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-left">
            <span className="text-xs text-muted-foreground">Download on the</span>
            <span className="text-sm font-semibold">App Store</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-left">
            <span className="text-xs text-muted-foreground">GET IT ON</span>
            <span className="text-sm font-semibold">Google Play</span>
          </div>
        </div>
        <div className="mt-16 flex justify-center opacity-0"><LifeScoreRing /></div>
      </section>
    </SiteLayout>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border p-3">
      <div className="text-[10px] text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg font-bold">{value}</div>
    </div>
  );
}
