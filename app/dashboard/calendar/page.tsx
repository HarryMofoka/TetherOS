import type { Metadata } from "next";
import { ChevronLeft, ChevronRight, Calendar as CalIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Calendar â€” TetherOS",
  description: "Schedule & events.",
};

export default function CalendarPage() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  // Mock calendar grid
  const dates = Array.from({ length: 35 }, (_, i) => {
    const day = i - 2; // offset to make 1st start on Wed
    return { day: day > 0 && day <= 28 ? day : null, active: day === 11, hasEvent: [3, 11, 14, 18, 24].includes(day) };
  });

  return (
    <>
      <div className="flex items-center justify-between px-8 pt-6">
        <div>
          <h1 className="text-2xl font-bold">Calendar ðŸ“…</h1>
          <p className="text-xs text-muted-foreground">Plan your weeks ahead.</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-1">
          <button className="rounded p-1 hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button>
          <span className="px-2 text-sm font-medium">February 2025</span>
          <button className="rounded p-1 hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="px-8 py-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="grid grid-cols-7 gap-4 text-center mb-4">
            {days.map(d => <div key={d} className="text-xs font-semibold text-muted-foreground">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-2 lg:gap-4">
            {dates.map((d, i) => (
              <div key={i} className={`flex h-20 flex-col items-center justify-center rounded-xl border ${d.active ? "border-[color:var(--brand-blue)] bg-[color:var(--brand-blue)]/10" : "border-border bg-background"} ${d.day ? "cursor-pointer hover:bg-muted/50" : "opacity-50 bg-transparent border-transparent"}`}>
                {d.day && (
                  <>
                    <span className={`text-sm font-medium ${d.active ? "text-[color:var(--brand-blue)]" : ""}`}>{d.day}</span>
                    {d.hasEvent && <div className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-400" />}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 space-y-4 max-w-2xl">
          <h3 className="font-semibold text-lg">Upcoming</h3>
          <EventCard month="FEB" day="12" title="Team Standup" time="10:00 AM â€“ 10:30 AM" />
          <EventCard month="FEB" day="14" title="Product Review" time="02:00 PM â€“ 03:00 PM" />
          <EventCard month="FEB" day="18" title="Design Meeting" time="11:00 AM â€“ 12:00 PM" />
        </div>
      </div>
    </>
  );
}

function EventCard({ month, day, title, time }: { month: string; day: string; title: string; time: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-3 hover:bg-muted/30 transition-colors cursor-pointer">
      <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-muted">
        <div className="text-[10px] font-semibold text-muted-foreground">{month}</div>
        <div className="text-lg font-bold leading-none">{day}</div>
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{time}</div>
      </div>
      <CalIcon className="h-5 w-5 text-muted-foreground mr-2" />
    </div>
  );
}
