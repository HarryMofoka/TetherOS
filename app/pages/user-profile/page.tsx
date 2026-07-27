"use client";

import { useMockData } from "@/components/providers/MockDataProvider";
import { User, Shield, HardDrive, Calendar, Award, Flame, CheckCircle2 } from "lucide-react";

export default function UserProfilePage() {
  const { tasks, habits } = useMockData();

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 animate-fade-in-up">
      {/* Header Profile Card */}
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-foreground/20 to-foreground/50 border-2 border-border shrink-0 shadow-md" />
        <div className="space-y-1 text-center md:text-left flex-1">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <h1 className="text-2xl font-bold">Harry Mofoka</h1>
            <span className="rounded-full bg-muted px-3 py-1 text-[10px] font-bold tracking-wider uppercase">TetherOS Pro</span>
          </div>
          <p className="text-xs text-muted-foreground">Software Engineer • Member since Feb 2025</p>
          <div className="pt-3 flex flex-wrap justify-center md:justify-start gap-4 text-xs font-semibold">
            <div><span className="text-foreground font-black text-sm">47</span> <span className="text-muted-foreground font-normal">Days Active</span></div>
            <div><span className="text-foreground font-black text-sm">{tasks.filter(t => t.status === "Done").length}</span> <span className="text-muted-foreground font-normal">Tasks Completed</span></div>
            <div><span className="text-foreground font-black text-sm">12</span> <span className="text-muted-foreground font-normal">Max Streak</span></div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* System & Subscription Info */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-sm flex items-center gap-2 border-b border-border pb-3">
            <Shield className="h-4 w-4" /> Account Details
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-semibold">harry.mofoka@example.com</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Plan Status</span>
              <span className="font-bold text-foreground">Pro License</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Cloud Storage</span>
              <span className="font-semibold">4.2 GB / 10 GB</span>
            </div>
          </div>
          <div className="pt-2">
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-foreground w-[42%]" />
            </div>
          </div>
        </div>

        {/* Badges & Achievements */}
        <div className="col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-sm flex items-center gap-2 border-b border-border pb-3">
            <Award className="h-4 w-4" /> Achievements & Badges
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-border bg-muted/30 text-center space-y-1">
              <Flame className="h-6 w-6 mx-auto text-foreground" />
              <div className="text-xs font-bold">7-Day Habit Streak</div>
              <div className="text-[10px] text-muted-foreground">Unlocked Feb 2025</div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-muted/30 text-center space-y-1">
              <CheckCircle2 className="h-6 w-6 mx-auto text-foreground" />
              <div className="text-xs font-bold">50 Tasks Done</div>
              <div className="text-[10px] text-muted-foreground">Unlocked Jan 2025</div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-muted/30 text-center space-y-1">
              <Award className="h-6 w-6 mx-auto text-foreground" />
              <div className="text-xs font-bold">Deep Work Titan</div>
              <div className="text-[10px] text-muted-foreground">100 Focus Hours</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
