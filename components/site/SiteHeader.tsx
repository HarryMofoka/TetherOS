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
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/"><Logo /></Link>
        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                href={item.to}
                className={`text-sm ${active ? "font-semibold text-foreground underline underline-offset-8 decoration-2" : "text-foreground/80 hover:text-foreground"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="rounded-full border border-border bg-background px-5 py-2 text-sm font-medium hover:bg-muted">Log in</Link>
          <Link href="/signup" className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background hover:opacity-90">Get Started</Link>
        </div>
      </div>
    </header>
  );
}
