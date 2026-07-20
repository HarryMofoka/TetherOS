"use client";

import { useState } from "react";
import { Lock, WifiOff, Cpu, MessageSquare, ShieldCheck, Fingerprint, Database, Cloud, ChevronDown, Star, Quote } from "lucide-react";

export function PrivacySection() {
  const items = [
    { icon: Lock, title: "Zero-knowledge encryption", desc: "Argon2/PBKDF2 keys and AES-GCM 256-bit encryption. Your data is unlocked only on your device." },
    { icon: WifiOff, title: "Local-first architecture", desc: "IndexedDB and WebAssembly SQLite keep everything on-device. Sync only what you choose." },
    { icon: Fingerprint, title: "Biometric unlock", desc: "Unlock your second brain with Face ID, Touch ID, or a password you own â€” never a corporate login." },
    { icon: Cloud, title: "Optional, encrypted sync", desc: "Last-Write-Wins sync with version checks â€” encrypted before it ever leaves your device." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <span className="inline-block rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium tracking-wider text-muted-foreground">PRIVACY BY DESIGN</span>
        <h2 className="mt-6 text-3xl font-bold md:text-4xl">Your second brain. <span className="text-muted-foreground/70">Yours alone.</span></h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
          TetherOS is built local-first with zero-knowledge encryption. Not us, not our servers, not a data broker â€” no one but you can read your notes, habits, or reflections.
        </p>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-4">
        {items.map((i) => (
          <div key={i.title} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted"><i.icon className="h-5 w-5" /></div>
            <h3 className="mt-5 text-sm font-semibold">{i.title}</h3>
            <p className="mt-2 text-xs text-muted-foreground">{i.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MemorySection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <span className="inline-block rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium tracking-wider text-muted-foreground">MEMORY SYNAPSE</span>
          <h2 className="mt-6 text-3xl font-bold md:text-4xl">
            Every reflection, ready when you need it.
          </h2>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            TetherOS turns your journal, tasks, and habits into a searchable memory graph. Semantic embeddings (all-MiniLM-L6-v2) run entirely on-device, so you can ask questions in plain English and get answers in under 100ms â€” offline.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              { icon: Cpu, text: "On-device vector search over your whole timeline" },
              { icon: MessageSquare, text: "RAG-powered AI coach that cites your real memories" },
              { icon: Database, text: "Chronological life timeline: tasks, habits, journal, emotion" },
            ].map((r) => (
              <li key={r.text} className="flex items-start gap-3">
                <r.icon className="mt-0.5 h-4 w-4 text-[color:var(--brand-blue)]" />
                <span>{r.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold"><MessageSquare className="h-4 w-4" /> Ask your memory</div>
          <div className="mt-4 rounded-xl border border-border bg-background px-4 py-3 text-sm">
            &quot;When did I last feel this stuck on a project?&quot;
          </div>
          <div className="mt-4 space-y-2">
            {[
              { date: "Nov 12, 2024", tag: "Journal", text: "Feeling blocked on the auth flow. Emotion 4/10." },
              { date: "Aug 03, 2024", tag: "Reflection", text: "Similar plateau on the launch checklist â€” took a walk, unblocked in an hour." },
              { date: "Feb 21, 2024", tag: "Habit", text: "Broke a 30-day streak. Started deep-work windows the next week." },
            ].map((m) => (
              <div key={m.date} className="rounded-xl border border-border p-3">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>{m.date}</span>
                  <span className="rounded-full bg-muted px-2 py-0.5">{m.tag}</span>
                </div>
                <div className="mt-1 text-xs">{m.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function OfflineSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-3xl border border-border bg-card p-10 md:p-14">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-block rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium tracking-wider text-muted-foreground">OFFLINE-FIRST</span>
            <h2 className="mt-6 text-3xl font-bold md:text-4xl">Works on a plane. Works on a mountain.</h2>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Create tasks, log habits, search memories â€” with or without a connection. When you come back online, encrypted deltas sync in the background using Last-Write-Wins reconciliation.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { k: "<100ms", v: "Search latency, on-device" },
              { k: "100%", v: "Works offline" },
              { k: "AES-256", v: "End-to-end encryption" },
              { k: "0", v: "Plaintext bytes on our servers" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl border border-border bg-background p-5">
                <div className="text-2xl font-bold">{s.k}</div>
                <div className="mt-1 text-[11px] text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { name: "Amelia R.", role: "Product Designer", text: "The gap between what I planned and what I actually did used to haunt me. TetherOS quietly closed it.", avatar: 0 },
  { name: "Jordan K.", role: "Founder", text: "The weekly AI reflection reads like a therapist who's actually read my journal â€” because it has, privately, on my laptop.", avatar: 1 },
  { name: "Priya S.", role: "PhD Student", text: "Semantic search over three years of notes changed how I think. Everything I've ever written is one question away.", avatar: 2 },
  { name: "Marcus T.", role: "Engineer", text: "Finally an app that respects both my time and my data. Offline-first is not a buzzword here.", avatar: 3 },
];

export function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Loved by people who take their inner life seriously.</h2>
        <div className="mt-4 flex items-center justify-center gap-1 text-yellow-500">
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
          <span className="ml-2 text-sm text-muted-foreground">4.9 Â· 2,300+ reviews</span>
        </div>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t) => (
          <div key={t.name} className="rounded-2xl border border-border bg-card p-6">
            <Quote className="h-5 w-5 text-muted-foreground" />
            <p className="mt-3 text-sm">{t.text}</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full" style={{ background: `linear-gradient(135deg, hsl(${t.avatar*70},60%,70%), hsl(${t.avatar*70+40},60%,50%))` }} />
              <div>
                <div className="text-xs font-semibold">{t.name}</div>
                <div className="text-[10px] text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const defaultFaq = [
  { q: "Is TetherOS really offline-first?", a: "Yes. The app runs on your device against a local IndexedDB + WebAssembly SQLite store. You can create tasks, log habits, journal, and run semantic searches with no network at all." },
  { q: "How does the AI reflection coach work without leaking my data?", a: "Locally-computed embeddings retrieve the most relevant slices of your timeline. Only that anonymized context is proxied to a cloud LLM (Gemini Pro / Claude) via our REST proxy â€” never your full database." },
  { q: "What happens if I forget my password?", a: "Because encryption is zero-knowledge, we cannot recover it. We recommend storing your recovery phrase in a password manager the moment you set up your vault." },
  { q: "Can I use TetherOS on multiple devices?", a: "Yes. Optional encrypted sync uses Last-Write-Wins with version checks. Ciphertext is all our servers ever see." },
  { q: "Do you offer a native mobile app?", a: "A native client is planned for Milestone 7. In the meantime, the web app installs to your home screen and works fully offline." },
  { q: "Can I export my data?", a: "Anytime. Export encrypted or plaintext JSON, or hand your local SQLite database to any tool that reads it." },
];

export function FaqSection({ items = defaultFaq, title = "Frequently asked questions" }: { items?: { q: string; a: string }[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h2 className="text-center text-3xl font-bold md:text-4xl">{title}</h2>
      <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <button
              key={item.q}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full flex-col items-start px-6 py-5 text-left"
            >
              <div className="flex w-full items-center justify-between">
                <span className="text-sm font-semibold">{item.q}</span>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </div>
              {isOpen && <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function TrustBadges() {
  const badges = [
    { icon: ShieldCheck, label: "AES-256 encrypted" },
    { icon: Lock, label: "Zero-knowledge" },
    { icon: WifiOff, label: "Offline-first" },
    { icon: Fingerprint, label: "Biometric unlock" },
  ];
  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-border bg-card px-6 py-5">
        {badges.map((b) => (
          <div key={b.label} className="flex items-center gap-2 text-xs text-muted-foreground">
            <b.icon className="h-4 w-4" /> {b.label}
          </div>
        ))}
      </div>
    </div>
  );
}
