"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function UpdateBanner() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm flex items-center justify-between flex-wrap gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
          </span>
          <span className="font-bold">System Update</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground font-medium">
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        <p className="text-sm font-semibold text-foreground">
          Life Score increased <span className="text-emerald-500 font-bold">+40%</span> this week based on completed habits & focus sessions.
        </p>
      </div>

      <Link 
        href="/dashboard/reports" 
        className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-xs font-bold hover:bg-muted transition-colors"
      >
        See Detailed Analytics <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
