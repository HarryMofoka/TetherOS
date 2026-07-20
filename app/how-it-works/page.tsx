import type { Metadata } from "next";
import { SiteLayout } from "@/components/site/SiteLayout";

export const metadata: Metadata = {
  title: "How it Works â€” TetherOS",
  description: "Plan, act, reflect. See how TetherOS helps you build a better life.",
  openGraph: { url: "/how-it-works" },
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  { n: 1, title: "Plan your day", desc: "Use AI to plan tasks, set priorities and schedule your time â€” all in one place." },
  { n: 2, title: "Take action", desc: "Stay focused with your plan, build habits, and track progress in real time." },
  { n: 3, title: "Reflect & improve", desc: "Review your day, reflect with AI, and keep getting better week over week." },
];

export default function HowPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-24 text-center">
        <h1 className="text-4xl font-bold md:text-5xl">How TetherOS works</h1>
        <p className="mt-4 text-sm text-muted-foreground">A simple three-step loop that compounds over time.</p>
      </section>
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <div className="space-y-6">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-6 rounded-2xl border border-border bg-card p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border font-semibold">{s.n}</div>
              <div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
