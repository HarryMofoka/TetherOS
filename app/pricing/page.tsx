import type { Metadata } from "next";
import { Check, ArrowRight, Star } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FaqSection, TestimonialsSection, TrustBadges } from "@/components/site/sections";

export const metadata: Metadata = {
  title: "Pricing — LifeOS",
  description: "Plans for every stage of your journey. Start free, upgrade anytime.",
  openGraph: {
    title: "Pricing — LifeOS",
    description: "Simple, transparent pricing.",
    url: "/pricing",
  },
  alternates: { canonical: "/pricing" },
};

const plans = [
  {
    name: "Free", price: "$0", per: "/forever", desc: "Get started with the basics.",
    cta: "Get Started Free",
    features: ["Daily planner", "Tasks & reminders", "Habit tracking (3 habits)", "Journal", "AI Coach (limited)", "Basic analytics", "Up to 1 integration"],
  },
  {
    name: "Pro", price: "$8", per: "/month", desc: "For focused individuals.",
    cta: "Start Pro Trial", featured: true, sub: "Billed $96 annually",
    features: ["Unlimited habits", "Advanced tasks & projects", "Calendar integrations", "AI Coach (unlimited)", "Focus timer & sessions", "Detailed analytics", "Priority support", "Custom themes"],
    inherit: "Everything in Free, plus:",
  },
  {
    name: "Team", price: "$12", per: "/user/month", desc: "For small teams and collaborators.",
    cta: "Start Team Trial", sub: "Billed $144 annually",
    features: ["Team workspaces", "Shared projects & tasks", "Team analytics", "Roles & permissions", "Centralized billing", "Priority support"],
    inherit: "Everything in Pro, plus:",
  },
  {
    name: "Enterprise", price: "Custom", per: "", desc: "For organizations that need more.",
    cta: "Contact Sales", customPrice: true,
    features: ["SSO & advanced security", "Custom integrations", "Advanced admin controls", "Audit logs", "Dedicated support", "SLA & uptime guarantee"],
    inherit: "Everything in Team, plus:",
  },
];

const compare = [
  ["Tasks", "✓", "✓", "✓", "✓"],
  ["Habits", "Up to 3", "Unlimited", "Unlimited", "Unlimited"],
  ["AI Coach", "Limited", "Unlimited", "Unlimited", "Unlimited"],
  ["Projects", "—", "Unlimited", "Unlimited", "Unlimited"],
  ["Team Collaboration", "—", "—", "✓", "✓"],
  ["Analytics", "Basic", "Advanced", "Advanced", "Advanced+"],
];

export default function PricingPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-10 text-center">
        <span className="inline-block rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium tracking-wider text-muted-foreground">SIMPLE, TRANSPARENT PRICING</span>
        <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">Plans for every stage<br />of your journey.</h1>
        <p className="mx-auto mt-4 text-sm text-muted-foreground">Start free. Upgrade anytime. Cancel anytime.</p>
        <div className="mt-6 inline-flex items-center gap-3 text-sm">
          <span>Monthly</span>
          <div className="relative h-6 w-11 rounded-full bg-foreground/80"><div className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-background" /></div>
          <span>Yearly</span>
          <span className="rounded-full bg-[color:var(--brand-green)]/20 px-2 py-0.5 text-xs font-semibold text-[color:var(--brand-green)]">Save 20%</span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="grid gap-6 md:grid-cols-4">
          {plans.map((p) => (
            <div key={p.name} className={`relative rounded-2xl border p-6 ${p.featured ? "border-[color:var(--brand-blue)]/60 bg-card shadow-lg" : "border-border bg-card"}`}>
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[color:var(--brand-blue)] px-3 py-1 text-[10px] font-bold tracking-wider text-white flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" /> MOST POPULAR
                </div>
              )}
              <div className="text-lg font-bold">{p.name}</div>
              <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className={p.customPrice ? "text-3xl font-bold" : "text-4xl font-bold"}>{p.price}</span>
                {p.per && <span className="text-xs text-muted-foreground">{p.per}</span>}
              </div>
              {p.sub && <div className="mt-1 text-[11px] text-muted-foreground">{p.sub}</div>}
              <button className={`mt-5 w-full rounded-full px-4 py-2.5 text-sm font-medium ${p.featured ? "bg-foreground text-background" : "border border-border bg-background hover:bg-muted"}`}>{p.cta}</button>
              {p.inherit && <div className="mt-6 text-xs font-medium text-muted-foreground">{p.inherit}</div>}
              <ul className="mt-4 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs">
                    <Check className="h-3.5 w-3.5 text-[color:var(--brand-green)]" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-semibold">Compare all features</div>
            <a href="#" className="text-xs text-muted-foreground">See all features →</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-3 font-medium text-muted-foreground">Features</th>
                  <th className="py-3 font-medium">Free</th>
                  <th className="py-3 font-medium">Pro</th>
                  <th className="py-3 font-medium">Team</th>
                  <th className="py-3 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {compare.map((row) => (
                  <tr key={row[0]} className="border-b border-border/60">
                    {row.map((cell, i) => (
                      <td key={i} className={`py-3 ${i===0 ? "font-medium" : "text-muted-foreground"}`}>
                        {cell === "✓" ? <Check className="h-4 w-4 text-[color:var(--brand-green)]" /> : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-[color:var(--brand-blue)]"><Star className="h-6 w-6" /></div>
          <div>
            <div className="font-semibold">Not sure which plan is right for you?</div>
            <div className="text-xs text-muted-foreground">Try LifeOS free for 14 days. No credit card required.</div>
          </div>
          <button className="ml-auto inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">Get Started Free <ArrowRight className="h-4 w-4" /></button>
        </div>
      </section>

      <TrustBadges />
      <TestimonialsSection />
      <FaqSection title="Pricing FAQs" items={[
        { q: "Do you offer a free trial on paid plans?", a: "Yes — Pro and Team include a 14-day free trial. No credit card required to start." },
        { q: "Can I switch plans anytime?", a: "Yes. Upgrades apply immediately; downgrades take effect at the end of your current billing cycle." },
        { q: "How does billing work for Team?", a: "Team is billed per active seat per month, with a single centralized invoice and volume discounts on the annual plan." },
        { q: "Is my data private on paid plans?", a: "All plans are zero-knowledge — your journal, tasks, and reflections are encrypted on-device before anything reaches our servers." },
        { q: "Do you offer discounts for students or non-profits?", a: "Yes. Verified students and registered non-profits get 50% off Pro. Contact us with proof of eligibility." },
        { q: "What payment methods do you accept?", a: "All major credit cards, Apple Pay, Google Pay, and bank transfer for annual Enterprise contracts." },
      ]} />
    </SiteLayout>
  );
}
