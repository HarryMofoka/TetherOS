"use client";

import { useState } from "react";
import { useMockData } from "@/components/providers/MockDataProvider";
import { Plus, Check, Calendar, Tag, Target, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GoalAndTaskFormPage() {
  const { addTask, addHabit, addProject } = useMockData() as any;
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"task" | "habit" | "project">("task");

  // Task form state
  const [taskTitle, setTaskTitle] = useState("");
  const [taskTag, setTaskTag] = useState("Work");
  const [taskPriority, setTaskPriority] = useState<"High" | "Medium" | "Low">("Medium");

  // Habit form state
  const [habitName, setHabitName] = useState("");
  
  // Project form state
  const [projectName, setProjectName] = useState("");
  const [projectDueDate, setProjectDueDate] = useState("Mar 15, 2025");

  const [successMsg, setSuccessMsg] = useState("");

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    addTask({ title: taskTitle, tag: taskTag, priority: taskPriority, status: "To Do" });
    setTaskTitle("");
    setSuccessMsg("Task successfully added!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Goal & Task Configuration Forms</h1>
        <p className="text-xs text-muted-foreground mt-1">Configure new priorities, habit routines, and long-term milestone projects.</p>
      </div>

      {/* Form Tabs */}
      <div className="flex bg-card border border-border rounded-full p-1 max-w-md">
        <button
          onClick={() => setActiveTab("task")}
          className={`flex-1 py-2 text-xs font-bold rounded-full transition-colors ${activeTab === "task" ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          New Task
        </button>
        <button
          onClick={() => setActiveTab("habit")}
          className={`flex-1 py-2 text-xs font-bold rounded-full transition-colors ${activeTab === "habit" ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          New Habit
        </button>
        <button
          onClick={() => setActiveTab("project")}
          className={`flex-1 py-2 text-xs font-bold rounded-full transition-colors ${activeTab === "project" ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          New Project
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-foreground text-background text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="h-4 w-4" /> {successMsg}
        </div>
      )}

      {/* Task Form */}
      {activeTab === "task" && (
        <form onSubmit={handleTaskSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
          <h2 className="font-bold text-base border-b border-border pb-3">Create New Task</h2>
          
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground">Task Title</label>
            <input 
              type="text" 
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g. Complete Q1 Financial Analysis" 
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Category Tag</label>
              <select 
                value={taskTag}
                onChange={(e) => setTaskTag(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground transition-colors"
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Health">Health</option>
                <option value="Project">Project</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Priority Level</label>
              <select 
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value as any)}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground transition-colors"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full rounded-xl bg-foreground text-background py-3 text-sm font-bold hover:opacity-90 transition-opacity">
            Add Task to Kanban Board
          </button>
        </form>
      )}

      {/* Habit Form */}
      {activeTab === "habit" && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
          <h2 className="font-bold text-base border-b border-border pb-3">Create Daily Habit</h2>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground">Habit Name</label>
            <input 
              type="text" 
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              placeholder="e.g. Read 20 pages daily" 
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground transition-colors"
            />
          </div>
          <button onClick={() => { setSuccessMsg("Habit created!"); setHabitName(""); }} className="w-full rounded-xl bg-foreground text-background py-3 text-sm font-bold hover:opacity-90 transition-opacity">
            Save Habit Tracker
          </button>
        </div>
      )}

      {/* Project Form */}
      {activeTab === "project" && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
          <h2 className="font-bold text-base border-b border-border pb-3">Create Milestone Project</h2>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground">Project Name</label>
            <input 
              type="text" 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. Website Redesign v2" 
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground transition-colors"
            />
          </div>
          <button onClick={() => { setSuccessMsg("Project initialized!"); setProjectName(""); }} className="w-full rounded-xl bg-foreground text-background py-3 text-sm font-bold hover:opacity-90 transition-opacity">
            Initialize Project Roadmap
          </button>
        </div>
      )}
    </div>
  );
}
