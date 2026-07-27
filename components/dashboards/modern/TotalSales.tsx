"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";

const performanceData = [
  { date: "Mon", focusHours: 4.2, val: 50 },
  { date: "Tue", focusHours: 5.5, val: 75 },
  { date: "Wed", focusHours: 3.8, val: 40 },
  { date: "Thu", focusHours: 6.0, val: 90 },
  { date: "Fri", focusHours: 5.2, val: 70 },
  { date: "Sat", focusHours: 2.5, val: 30 },
  { date: "Sun", focusHours: 4.0, val: 55 },
];

export function TotalSales() {
  const [period, setPeriod] = useState("Last 7 Days");

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2 font-bold text-sm">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          Focus & Productivity Velocity
        </div>
        <select 
          value={period} 
          onChange={(e) => setPeriod(e.target.value)}
          className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold outline-none"
        >
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Last 30 Days">Last 30 Days</option>
        </select>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs text-muted-foreground font-medium font-sans">Total Focus Hours</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black">31.2 hrs</span>
            <span className="text-xs font-bold text-emerald-500">+22%</span>
            <span className="text-[10px] text-muted-foreground">vs last week</span>
          </div>
        </div>
      </div>

      {/* SVG Responsive Line Graph */}
      <div className="relative h-48 w-full pt-4">
        <svg className="h-full w-full overflow-visible" viewBox="0 0 400 120" preserveAspectRatio="none">
          <line x1="0" y1="20" x2="400" y2="20" stroke="var(--color-border)" strokeDasharray="4 4" strokeWidth="1" />
          <line x1="0" y1="60" x2="400" y2="60" stroke="var(--color-border)" strokeDasharray="4 4" strokeWidth="1" />
          <line x1="0" y1="100" x2="400" y2="100" stroke="var(--color-border)" strokeDasharray="4 4" strokeWidth="1" />

          {/* Area gradient */}
          <defs>
            <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-foreground)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--color-foreground)" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path 
            d="M 0,70 Q 60,30 120,65 T 240,15 T 320,50 T 400,35 L 400,120 L 0,120 Z" 
            fill="url(#velocityGrad)" 
          />

          <path 
            d="M 0,70 Q 60,30 120,65 T 240,15 T 320,50 T 400,35" 
            fill="none" 
            stroke="var(--color-foreground)" 
            strokeWidth="3" 
            strokeLinecap="round" 
          />

          {/* Dots */}
          {[
            { x: 0, y: 70 }, { x: 67, y: 35 }, { x: 133, y: 65 }, 
            { x: 200, y: 15 }, { x: 267, y: 50 }, { x: 333, y: 40 }, { x: 400, y: 35 }
          ].map((pt, i) => (
            <circle key={i} cx={pt.x} cy={pt.y} r="4" fill="var(--color-background)" stroke="var(--color-foreground)" strokeWidth="2.5" />
          ))}
        </svg>

        <div className="flex justify-between text-[10px] font-semibold text-muted-foreground mt-2">
          {performanceData.map((d) => (
            <span key={d.date}>{d.date}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
