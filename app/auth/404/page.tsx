"use client";

import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { Home, ArrowLeft } from "lucide-react";

export default function Custom404Page() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-6 text-center">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl space-y-6 animate-fade-in-up">
        <div className="flex justify-center mb-2">
          <Logo />
        </div>

        <div className="space-y-2">
          <span className="text-6xl font-black text-foreground tracking-tighter">404</span>
          <h1 className="text-xl font-bold tracking-tight">Page Not Found</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The page or feature route you are looking for does not exist or has been moved.
          </p>
        </div>

        <Link href="/dashboard" className="w-full rounded-xl bg-foreground text-background py-3 text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <Home className="h-4 w-4" /> Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
