import type { Metadata } from "next";
import { Plus, MoreHorizontal, Folder } from "lucide-react";
import { ProgressRing } from "@/components/mock/charts";

export const metadata: Metadata = {
  title: "Projects â€” TetherOS",
  description: "Organize bigger goals.",
};

export default function ProjectsPage() {
  return (
    <>
      <div className="flex items-center justify-between px-8 pt-6">
        <div>
          <h1 className="text-2xl font-bold">Projects ðŸš€</h1>
          <p className="text-xs text-muted-foreground">Turn ideas into reality.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background">
          <Plus className="h-4 w-4" /> New Project
        </button>
      </div>

      <div className="px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard 
            title="AI Resume Builder" 
            desc="A platform to generate tailored resumes using LLMs." 
            status="On Track" 
            pct={67} 
            color="var(--brand-blue)" 
            dueDate="Mar 15, 2025" 
          />
          <ProjectCard 
            title="TetherOS Mobile App" 
            desc="React Native companion app for TetherOS dashboard." 
            status="Behind" 
            pct={42} 
            color="oklch(0.62 0.22 25)" 
            dueDate="Apr 01, 2025" 
          />
          <ProjectCard 
            title="Personal Website" 
            desc="Portfolio redesign using Next.js and Tailwind." 
            status="On Hold" 
            pct={25} 
            color="oklch(0.75 0.15 80)" 
            dueDate="May 10, 2025" 
          />
          <ProjectCard 
            title="Reading Tracker" 
            desc="Book cataloging and progress tracking tool." 
            status="On Track" 
            pct={80} 
            color="oklch(0.72 0.17 155)" 
            dueDate="Feb 28, 2025" 
          />
          <div className="rounded-2xl border border-dashed border-border bg-transparent p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/30 cursor-pointer transition-colors min-h-[220px]">
            <Folder className="h-8 w-8 mb-2 opacity-50" />
            <span className="text-sm font-medium">Create New Project</span>
          </div>
        </div>
      </div>
    </>
  );
}

function ProjectCard({ title, desc, status, pct, color, dueDate }: { title: string; desc: string; status: string; pct: number; color: string; dueDate: string }) {
  const statusBg = status === "On Track" ? "bg-green-500/10 text-green-500" : status === "Behind" ? "bg-red-500/10 text-red-500" : "bg-orange-500/10 text-orange-500";
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${statusBg}`}>
          {status}
        </div>
        <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-5 w-5" /></button>
      </div>
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground line-clamp-2 mb-6 h-8">{desc}</p>
      
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Progress</div>
          <div className="flex items-center gap-3">
            <ProgressRing value={pct} color={color} />
            <span className="text-2xl font-bold">{pct}%</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Due Date</div>
          <div className="text-sm font-medium">{dueDate}</div>
        </div>
      </div>
    </div>
  );
}
