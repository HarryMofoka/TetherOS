"use client";

import { BriefcaseBusiness, ArrowDownUp, MoreHorizontal, CheckCircle2 } from "lucide-react";
import { useMockData } from "@/components/providers/MockDataProvider";

export function ProjectsOrders() {
  const { tasks, projects } = useMockData();

  const statusConfig: Record<string, { bg: string; text: string }> = {
    "Done": { bg: "bg-foreground text-background", text: "text-background" },
    "In Progress": { bg: "bg-muted text-foreground border border-border", text: "text-foreground" },
    "To Do": { bg: "bg-muted/50 text-muted-foreground", text: "text-muted-foreground" },
  };

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="border-b border-border p-6 font-bold text-sm flex items-center gap-2">
        <BriefcaseBusiness className="h-4 w-4 text-foreground" />
        Projects & Priority Task Execution
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground bg-muted/20">
              <th className="py-3 px-6 font-semibold">
                <div className="flex items-center gap-1">Task / Project <ArrowDownUp className="h-3 w-3" /></div>
              </th>
              <th className="py-3 px-4 font-semibold">
                <div className="flex items-center gap-1">Category Tag <ArrowDownUp className="h-3 w-3" /></div>
              </th>
              <th className="py-3 px-4 font-semibold">
                <div className="flex items-center gap-1">Priority <ArrowDownUp className="h-3 w-3" /></div>
              </th>
              <th className="py-3 px-4 font-semibold">
                <div className="flex items-center gap-1">Status <ArrowDownUp className="h-3 w-3" /></div>
              </th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {tasks.map((t) => {
              const config = statusConfig[t.status] || statusConfig["To Do"];
              return (
                <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`h-4 w-4 ${t.status === "Done" ? "text-foreground" : "text-muted-foreground/40"}`} />
                      {t.title}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="rounded-md bg-muted px-2 py-1 text-[10px] font-semibold text-muted-foreground">
                      {t.tag}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold uppercase text-[10px]">
                    <span className={t.priority === "High" ? "text-red-500 font-bold" : "text-muted-foreground"}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${config.bg}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
