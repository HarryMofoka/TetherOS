"use client";

import { useMockData } from "@/components/providers/MockDataProvider";
import { CheckSquare, Flame, Timer } from "lucide-react";
import { OverviewTab } from "@/components/dashboards/modern/OverviewTab";
import { UpdateBanner } from "@/components/dashboards/modern/UpdateBanner";
import { TotalSales } from "@/components/dashboards/modern/TotalSales";
import { TotalAssets } from "@/components/dashboards/modern/TotalAssets";
import { StatCard } from "@/components/dashboards/modern/StatCard";
import { ProjectsOrders } from "@/components/dashboards/modern/ProjectsOrders";

export default function ModernDashboardPage() {
  const { tasks, habits } = useMockData();

  const completedTasks = tasks.filter(t => t.status === "Done").length;
  const totalTasks = tasks.length;
  const taskPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const maxStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0);
  const completedHabits = habits.filter(h => h.completedToday).length;
  const habitPct = habits.length > 0 ? Math.round((completedHabits / habits.length) * 100) : 0;

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in-up">
      <OverviewTab />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <UpdateBanner />
        </div>

        <div className="col-span-12 lg:col-span-7">
          <TotalSales />
        </div>

        <div className="col-span-12 lg:col-span-5">
          <TotalAssets />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <StatCard 
            title="Task Execution" 
            value={`${completedTasks} / ${totalTasks}`} 
            badge={`${taskPct}%`} 
            subtitle="Completed tasks" 
            icon={CheckSquare}
            href="/dashboard/tasks"
          />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <StatCard 
            title="Habit Consistency" 
            value={`${habitPct}%`} 
            badge={`${maxStreak}d streak`} 
            subtitle={`${completedHabits} of ${habits.length} done today`} 
            icon={Flame}
            href="/dashboard/habits"
          />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <StatCard 
            title="Deep Work Focus" 
            value="—" 
            badge="Track sessions" 
            subtitle="Use the Focus Timer to log hours" 
            icon={Timer}
            href="/dashboard/focus"
          />
        </div>

        <div className="col-span-12">
          <ProjectsOrders />
        </div>
      </div>
    </div>
  );
}
