"use client";

import { OverviewTab } from "@/components/dashboards/modern/OverviewTab";
import { UpdateBanner } from "@/components/dashboards/modern/UpdateBanner";
import { TotalSales } from "@/components/dashboards/modern/TotalSales";
import { TotalAssets } from "@/components/dashboards/modern/TotalAssets";
import { StatCard } from "@/components/dashboards/modern/StatCard";
import { ProjectsOrders } from "@/components/dashboards/modern/ProjectsOrders";
import { CheckSquare, Flame, Timer } from "lucide-react";

export default function ModernDashboardPage() {
  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in-up">
      {/* Overview Greeting Header */}
      <OverviewTab />

      {/* Main Grid Layout matching new design */}
      <div className="grid grid-cols-12 gap-6">
        {/* Update Banner */}
        <div className="col-span-12">
          <UpdateBanner />
        </div>

        {/* Total Sales (Focus Velocity Line Chart) */}
        <div className="col-span-12 lg:col-span-7">
          <TotalSales />
        </div>

        {/* Total Assets (Life OS Metrics) */}
        <div className="col-span-12 lg:col-span-5">
          <TotalAssets />
        </div>

        {/* 3 Middle Stat Cards */}
        <div className="col-span-12 lg:col-span-4">
          <StatCard 
            title="Task Execution Velocity" 
            value="24 Tasks" 
            badge="+40%" 
            subtitle="Completed this week" 
            icon={CheckSquare}
            href="/dashboard/tasks"
          />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <StatCard 
            title="Habit Consistency" 
            value="94%" 
            badge="+12%" 
            subtitle="9-day streak maintained" 
            icon={Flame}
            href="/dashboard/habits"
          />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <StatCard 
            title="Deep Work Focus" 
            value="18h 42m" 
            badge="+18%" 
            subtitle="Recorded focus time" 
            icon={Timer}
            href="/dashboard/focus"
          />
        </div>

        {/* Projects & Execution Table */}
        <div className="col-span-12">
          <ProjectsOrders />
        </div>
      </div>
    </div>
  );
}
