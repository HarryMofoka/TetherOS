"use client";

import { useState } from "react";
import { Plus, MoreHorizontal, Folder, X } from "lucide-react";
import { ProgressRing } from "@/components/mock/charts";
import { useMockData, Project } from "@/components/providers/MockDataProvider";

export default function ProjectsPage() {
  const { projects, addProject } = useMockData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col h-full relative">
        <div className="flex items-center justify-between px-8 pt-6">
          <div>
            <h1 className="text-2xl font-bold">Projects 🚀</h1>
            <p className="text-xs text-muted-foreground">Turn ideas into reality.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
          >
            <Plus className="h-4 w-4" /> New Project
          </button>
        </div>

        <div className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard 
                key={project.id}
                title={project.name} 
                desc="Project description and notes." 
                status={project.status} 
                pct={project.progressPct} 
                color={project.status === "Active" ? "oklch(0.62 0.19 256)" : project.status === "Completed" ? "oklch(0.72 0.17 155)" : "oklch(0.62 0.22 25)"} 
                dueDate={project.dueDate} 
              />
            ))}
            
            <div onClick={() => setIsModalOpen(true)} className="rounded-2xl border border-dashed border-border bg-transparent p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 hover:text-foreground cursor-pointer transition-colors min-h-[220px]">
              <Folder className="h-8 w-8 mb-2 opacity-50" />
              <span className="text-sm font-medium">Create New Project</span>
            </div>
          </div>
        </div>
        
        {isModalOpen && <NewProjectModal onClose={() => setIsModalOpen(false)} onSave={addProject} />}
      </div>
    </>
  );
}

function ProjectCard({ title, desc, status, pct, color, dueDate }: { title: string; desc: string; status: string; pct: number; color: string; dueDate: string }) {
  const statusBg = status === "Active" ? "bg-green-500/10 text-green-500" : status === "Behind" ? "bg-red-500/10 text-red-500" : "bg-orange-500/10 text-orange-500";
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${statusBg}`}>
          {status}
        </div>
        <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-5 w-5" /></button>
      </div>
      <h3 className="text-lg font-bold mb-1 truncate" title={title}>{title}</h3>
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

function NewProjectModal({ onClose, onSave }: { onClose: () => void; onSave: (project: Omit<Project, "id">) => void }) {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ 
      name, 
      dueDate: dueDate || "TBD", 
      status: "Active", 
      progressPct: 0 
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">New Project</h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted text-muted-foreground"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Project Name</label>
            <input 
              autoFocus
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground transition-colors" 
              placeholder="e.g. Q3 Launch"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Due Date</label>
            <input 
              type="text" 
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground transition-colors" 
              placeholder="e.g. Aug 15, 2025"
            />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
            <button type="submit" disabled={!name.trim()} className="rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 disabled:opacity-50 transition-colors">Create Project</button>
          </div>
        </form>
      </div>
    </div>
  );
}
