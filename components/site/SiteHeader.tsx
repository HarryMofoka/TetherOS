"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const nav = [
  { to: "/features", label: "Features" },
  { to: "/how-it-works", label: "How it Works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="fixed left-0 right-0 top-6 z-50 w-full px-6 pointer-events-none">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* Pill 1: Logo */}
        <div className="pointer-events-auto rounded-full border border-border bg-background/80 px-4 py-2 backdrop-blur shadow-sm">
          <Link href="/"><Logo /></Link>
        </div>

        {/* Pill 2: Nav */}
        <nav className="pointer-events-auto hidden items-center gap-8 rounded-full border border-border bg-background/80 px-6 py-2.5 backdrop-blur shadow-sm md:flex">
          {nav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                href={item.to}
                className={`text-sm transition-colors ${active ? "font-semibold text-foreground" : "text-foreground/70 hover:text-foreground"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Pill 3: Auth */}
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-border bg-background/80 p-1.5 backdrop-blur shadow-sm">
          <Link href="/login" className="rounded-full px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">Log in</Link>
          <Link href="/signup" className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity">Get Started</Link>
        </div>

      </div>
    </header>
  );
}
