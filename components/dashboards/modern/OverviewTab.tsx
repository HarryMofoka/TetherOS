"use client";

import { useEffect, useState } from "react";
import { RefreshCcw, CalendarDays, Download, Sun, Moon } from "lucide-react";

export function OverviewTab() {
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good Morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17 && hour < 21) setGreeting("Good Evening");
    else setGreeting("Good Night");
  }, []);

  return (
    <div className="flex items-center flex-wrap lg:flex-nowrap justify-between gap-4 py-2">
      <div className="flex flex-col items-start">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          {greeting}, Harry 👋
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">Stay informed with today&apos;s life analytics and focus metrics.</p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <button 
          onClick={() => window.location.reload()}
          className="p-2.5 rounded-lg border border-border bg-card hover:bg-muted transition-colors"
          title="Refresh metrics"
        >
          <RefreshCcw className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span>Monthly View</span>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-xs font-bold hover:opacity-90 transition-opacity">
          <Download className="h-4 w-4" /> Export Report
        </button>
      </div>
    </div>
  );
}
