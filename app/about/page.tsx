import type { Metadata } from "next";
import { ArrowRight, Send, Activity, MessageSquare, Shield, Heart, Plug, Globe, Mail } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Logo } from "@/components/site/Logo";
import { FaqSection, PrivacySection } from "@/components/site/sections";

export const metadata: Metadata = {
  title: "About — LifeOS",
  description: "We built LifeOS to help people take control of their lives.",
  openGraph: {
    title: "About — LifeOS",
    description: "Our story, mission, and the founders behind LifeOS.",
    url: "/about",
  },
  alternates: { canonical: "/about" },
};

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "1M+", label: "Tasks Completed" },
  { value: "50+", label: "Countries" },
  { value: "4.9/5", label: "User Rating" },
];

const values = [
  { icon: Activity, title: "Clarity", desc: "We believe clarity creates momentum." },
  { icon: MessageSquare, title: "Simplicity", desc: "We build simple tools that work beautifully." },
  { icon: Send, title: "Growth", desc: "We're here to help you grow, every day." },
  { icon: Shield, title: "Privacy", desc: "Your data. Your life. Always protected." },
  { icon: Heart, title: "Human First", desc: "We combine AI intelligence with human understanding." },
];

const founders = [
  { name: "Harry", role: "Co-founder & CEO", desc: "Passionate about productivity, habits, and human potential." },
  { name: "Sarah", role: "Co-founder & CTO", desc: "Loves turning complex problems into simple, beautiful solutions." },
  { name: "David", role: "Co-founder & Head of AI", desc: "Focused on building AI that truly understands you." },
];

export default function AboutPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-block rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium tracking-wider text-muted-foreground">OUR STORY</span>
            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
              We built LifeOS to help people take control of <span className="text-muted-foreground/70">their lives.</span>
            </h1>
            <p className="mt-5 max-w-md text-sm text-muted-foreground">LifeOS is more than a productivity app. It&apos;s an AI-powered operating system for your life.</p>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">We believe that when you plan better, build better habits, and reflect daily, you become the best version of yourself.</p>
            <div className="mt-8 grid grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-[11px] text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex aspect-[5/4] items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-muted to-background">
            <div className="absolute inset-0 grid grid-cols-6 opacity-30">
              {Array.from({ length: 48 }).map((_, i) => <div key={i} className="border border-border/40" />)}
            </div>
            <div className="relative scale-150"><Logo /></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold">Our mission</h2>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">To empower everyone with the tools, insights, and AI guidance they need to live with clarity, purpose, and intention.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Our vision</h2>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">A world where technology aligns with human potential — helping millions of people build better lives, every day.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold">The values that guide us</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-5">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted"><v.icon className="h-5 w-5" /></div>
              <h3 className="mt-5 text-sm font-semibold">{v.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="text-xl font-bold">The founders</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {founders.map((f, i) => (
            <div key={f.name} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full" style={{ background: `linear-gradient(135deg, hsl(${i*80},60%,70%), hsl(${i*80+40},60%,50%))` }} />
                <div>
                  <div className="text-sm font-semibold">{f.name}</div>
                  <div className="text-xs text-muted-foreground">{f.role}</div>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">{f.desc}</p>
              <div className="mt-4 flex items-center gap-3 text-muted-foreground">
                <Plug className="h-4 w-4" /><Globe className="h-4 w-4" /><Mail className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold">Where we&apos;re headed</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">
          A public roadmap so you always know what&apos;s shipping next.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {[
            { tag: "SHIPPED", title: "Local vault & encryption", desc: "Zero-knowledge AES-256 vault with biometric unlock." },
            { tag: "SHIPPED", title: "Mission Control dashboard", desc: "Unified daily view with progress rings and rollover." },
            { tag: "IN PROGRESS", title: "Memory Synapse RAG", desc: "On-device semantic search feeding the reflection coach." },
            { tag: "NEXT", title: "Native mobile client", desc: "iOS & Android with full offline parity — Milestone 7." },
          ].map((r) => (
            <div key={r.title} className="rounded-2xl border border-border bg-card p-5">
              <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                r.tag === "SHIPPED" ? "bg-[color:var(--brand-green)]/15 text-[color:var(--brand-green)]" :
                r.tag === "IN PROGRESS" ? "bg-[color:var(--brand-blue)]/15 text-[color:var(--brand-blue)]" :
                "bg-muted text-muted-foreground"
              }`}>{r.tag}</span>
              <h3 className="mt-4 text-sm font-semibold">{r.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Principles we build by</h2>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              A short list we return to whenever we&apos;re deciding what to add — and, more often, what to leave out.
            </p>
          </div>
          <ul className="space-y-4">
            {[
              ["Calm over clever", "Interfaces should lower cognitive load, not compete for attention."],
              ["Local over cloud", "If it can run on your device, it does. The cloud is opt-in."],
              ["Reflection over metrics", "Streaks matter less than what they teach you about yourself."],
              ["Objective, never judgmental", "The AI coach is a mirror, not a manager."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-2xl border border-border bg-card p-5">
                <div className="text-sm font-semibold">{t}</div>
                <div className="mt-1 text-xs text-muted-foreground">{d}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PrivacySection />
      <FaqSection title="About LifeOS" items={[
        { q: "Who is LifeOS for?", a: "Anyone who wants to close the gap between their intentions and their actions — students, founders, engineers, creatives, and quietly ambitious humans." },
        { q: "How is LifeOS funded?", a: "Subscriptions. No ads, no data sales, no venture-scale pressure to squeeze users. If you pay, we work for you." },
        { q: "Is the company remote?", a: "Yes, fully remote across four timezones. We meet in person twice a year." },
        { q: "How can I get involved?", a: "Join our public beta, share feedback in our community, or apply from the Careers page — we're hiring thoughtfully." },
      ]} />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted"><Send className="h-5 w-5" /></div>
          <div>
            <div className="font-semibold">Join thousands building better lives with LifeOS.</div>
            <div className="text-xs text-muted-foreground">Start your journey today — it changes everything.</div>
          </div>
          <button className="ml-auto inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">Get Started Free <ArrowRight className="h-4 w-4" /></button>
        </div>
      </section>
    </SiteLayout>
  );
}
