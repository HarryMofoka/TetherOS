"use client";

import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { AlertTriangle, Clock, RefreshCw } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-6 text-center">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl space-y-6 animate-fade-in-up">
        <div className="flex justify-center mb-2">
          <Logo />
        </div>

        <div className="space-y-2">
          <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mx-auto">
            <AlertTriangle className="h-6 w-6 text-foreground" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">System Under Maintenance</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We are performing scheduled infrastructure upgrades to enhance performance & security. TetherOS will be back online shortly.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-muted/30 text-xs font-semibold text-muted-foreground flex items-center justify-center gap-2">
          <Clock className="h-4 w-4" /> Estimated Completion: ~15 mins
        </div>

        <button onClick={() => window.location.reload()} className="w-full rounded-xl bg-foreground text-background py-3 text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <RefreshCw className="h-4 w-4" /> Refresh Status
        </button>

        <div className="text-xs">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground font-semibold">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
