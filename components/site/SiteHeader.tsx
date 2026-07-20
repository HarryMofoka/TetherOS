"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/features", label: "Features" },
  { to: "/how-it-works", label: "How it Works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 right-0 top-6 z-50 w-full px-6 pointer-events-none">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          
          {/* Pill 1: Logo */}
          <div className="pointer-events-auto rounded-full border border-border bg-background/80 px-4 py-2 backdrop-blur shadow-sm">
            <Link href="/"><Logo /></Link>
          </div>

          {/* Pill 2: Nav (Desktop) */}
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

          {/* Pill 3: Auth (Desktop) */}
          <div className="pointer-events-auto hidden md:flex items-center gap-2 rounded-full border border-border bg-background/80 p-1.5 backdrop-blur shadow-sm">
            <Link href="/login" className="rounded-full px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">Log in</Link>
            <Link href="/signup" className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity">Get Started</Link>
          </div>

          {/* Pill 4: Mobile Menu Toggle (Mobile) */}
          <div className="pointer-events-auto md:hidden flex items-center justify-center rounded-full border border-border bg-background/80 p-2 backdrop-blur shadow-sm">
            <button onClick={() => setMobileMenuOpen(true)} className="p-1 rounded-full text-foreground hover:bg-muted transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Overlay & Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-72 bg-card h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
             <div className="p-6 flex justify-end">
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 -mr-2 rounded-lg text-foreground hover:bg-muted transition-colors">
                  <X className="h-5 w-5" />
                </button>
             </div>
             <nav className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
                {nav.map((item) => {
                  const active = pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      href={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-medium transition-colors ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <div className="mt-8 pt-8 border-t border-border flex flex-col gap-4">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center rounded-xl py-3 font-semibold border border-border bg-background hover:bg-muted transition-colors">
                    Log in
                  </Link>
                  <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full text-center rounded-xl py-3 font-semibold bg-foreground text-background hover:opacity-90 transition-opacity">
                    Get Started
                  </Link>
                </div>
             </nav>
          </div>
        </div>
      )}
    </>
  );
}
