import type { Metadata } from "next";
import { BarChart, BarChart3, TrendingUp, Download } from "lucide-react";
import { LifeScoreRing, Donut, MiniLineChart } from "@/components/mock/charts";

export const metadata: Metadata = {
  title: "Reports - TetherOS",
  description: "Analytics & progress.",
};

export default function ReportsPage() {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="flex items-center justify-between px-8 pt-6 pb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BarChart className="h-6 w-6 text-[color:var(--brand-blue)]" /> Analytics & Reports
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Deep dive into your productivity patterns.</p>
        </div>
        <div className="flex gap-3">
          <select className="text-sm bg-card border border-border rounded-lg px-3 py-2 outline-none">
            <option>Last 7 Days</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      <div className="px-8 pb-8 space-y-6 max-w-6xl">
        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ReportKpi title="Total Focus Time" value="32h 45m" delta="+4.2%" trend="up" />
          <ReportKpi title="Tasks Completed" value="84" delta="+12" trend="up" />
          <ReportKpi title="Habit Consistency" value="92%" delta="-3%" trend="down" />
          <ReportKpi title="Life Score" value="8.4" delta="+0.2" trend="up" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-semibold text-lg">Productivity Velocity</h3>
                <p className="text-xs text-muted-foreground">Focus hours vs Tasks completed</p>
              </div>
              <div className="flex gap-4 text-xs font-medium">
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[color:var(--brand-blue)]" /> Focus Time</div>
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-orange-400" /> Tasks</div>
              </div>
            </div>
            
            {/* Mock complex chart using SVG */}
            <div className="h-64 w-full flex items-end justify-between gap-2">
              {Array.from({ length: 14 }).map((_, i) => {
                const h1 = 30 + Math.random() * 60;
                const h2 = 20 + Math.random() * 50;
                return (
                  <div key={i} className="flex flex-col gap-1 w-full items-center group cursor-pointer">
                    <div className="w-full flex items-end justify-center gap-1 h-full relative opacity-80 group-hover:opacity-100 transition-opacity">
                      <div className="w-1/2 bg-[color:var(--brand-blue)] rounded-t-sm transition-all" style={{ height: `${h1}%` }} />
                      <div className="w-1/2 bg-orange-400 rounded-t-sm transition-all" style={{ height: `${h2}%` }} />
                    </div>
                    <div className="text-[9px] text-muted-foreground mt-2">{i + 1} Feb</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column Breakdown */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col items-center">
              <h3 className="font-semibold text-lg w-full mb-6">Task Distribution</h3>
              <Donut size={160} segments={[
                { value: 45, color: "oklch(0.72 0.17 155)" },
                { value: 25, color: "oklch(0.62 0.19 256)" },
                { value: 20, color: "oklch(0.75 0.15 80)" },
                { value: 10, color: "oklch(0.62 0.22 25)" },
              ]} />
              <div className="w-full mt-6 space-y-3">
                <LegendRow label="Engineering" pct="45%" color="oklch(0.72 0.17 155)" />
                <LegendRow label="Design" pct="25%" color="oklch(0.62 0.19 256)" />
                <LegendRow label="Marketing" pct="20%" color="oklch(0.75 0.15 80)" />
                <LegendRow label="Admin" pct="10%" color="oklch(0.62 0.22 25)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportKpi({ title, value, delta, trend }: { title: string; value: string; delta: string; trend: "up" | "down" }) {
  const trendColor = trend === "up" ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10";
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-xs text-muted-foreground mb-2">{title}</div>
      <div className="text-2xl font-bold mb-3">{value}</div>
      <div className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${trendColor}`}>
        {delta}
      </div>
    </div>
  );
}

function LegendRow({ label, pct, color }: { label: string; pct: string; color: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
        <span className="font-medium text-foreground/80">{label}</span>
      </div>
      <span className="font-bold">{pct}</span>
    </div>
  );
}
