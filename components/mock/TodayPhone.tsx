import { PhoneFrame } from "./PhoneFrame";
import { CheckSquare, Calendar as CalIcon, Activity, MessageSquare, ChevronRight } from "lucide-react";

export function TodayPhone() {
  return (
    <PhoneFrame>
      <div className="space-y-3 p-4">
        <div>
          <div className="text-lg font-bold">Today</div>
          <div className="text-[10px] text-muted-foreground">Tuesday, 11 February</div>
        </div>
        <div className="rounded-xl border border-border p-3">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground"><CheckSquare className="h-3 w-3" /> TASKS</div>
          <div className="mt-1 text-xs font-semibold">Build Authentication</div>
          <div className="mt-2 flex items-center justify-between">
            <div className="h-1.5 flex-1 rounded-full bg-muted">
              <div className="h-1.5 w-2/3 rounded-full bg-foreground" />
            </div>
            <span className="ml-2 text-[10px] font-medium">67%</span>
          </div>
        </div>
        <div className="rounded-xl border border-border p-3">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground"><CalIcon className="h-3 w-3" /> Calendar</div>
          <div className="mt-1 text-xs font-semibold">3 Events Today</div>
        </div>
        <div className="rounded-xl border border-border p-3">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground"><Activity className="h-3 w-3" /> Habits</div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-xs font-semibold">9 Day Streak</span>
            <div className="flex gap-0.5">{Array.from({ length: 7 }).map((_, i) => <div key={i} className="h-1.5 w-1.5 rounded-full bg-foreground" />)}</div>
          </div>
        </div>
        <div className="rounded-xl border border-border p-3">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground"><MessageSquare className="h-3 w-3" /> AI Coach</div>
          <div className="mt-1 flex items-center justify-between text-xs font-semibold">Check-in at 07:30 AM <ChevronRight className="h-3 w-3" /></div>
        </div>
        <div>
          <div className="text-[10px] font-semibold text-muted-foreground">Up Next</div>
          <div className="mt-2 rounded-xl border border-border p-3">
            <div className="text-xs font-semibold">Deep Work Session</div>
            <div className="text-[10px] text-muted-foreground">08:00 – 10:00</div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
