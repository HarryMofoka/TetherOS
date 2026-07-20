import React from "react";

export function JournalCard() {
  return (
    <div className="w-[320px] rounded-2xl border border-border bg-card p-6 shadow-xl">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold">Daily Reflection</div>
            <div className="text-[10px] text-muted-foreground">Evening Review</div>
          </div>
          <div className="text-xs font-semibold">Today, 8:00 PM</div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="text-sm font-semibold">What went well today?</div>
            <div className="mt-2 rounded-xl border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
              I managed to complete the core feature for the new app. The deep work session was very effective.
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold">What could be improved?</div>
            <div className="mt-2 rounded-xl border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
              I got distracted by social media during my afternoon slump.
            </div>
          </div>
          <div className="rounded-xl border border-border p-4 bg-muted/30">
            <div className="flex gap-2">
              <div className="h-4 w-4 shrink-0 rounded-full bg-foreground" />
              <div>
                <div className="text-xs font-semibold">AI Insight</div>
                <div className="mt-1 text-[10px] text-muted-foreground">
                  You consistently report higher focus when scheduling "deep work" blocks before noon. Consider moving all creative tasks to the morning.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
