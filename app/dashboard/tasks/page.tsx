"use client";

import { useState } from "react";
import { Plus, MoreHorizontal, MessageSquare, ChevronRight, ChevronLeft, X } from "lucide-react";
import { useMockData, Task, TaskStatus, Priority } from "@/components/providers/MockDataProvider";

export default function TasksPage() {
  const { tasks, addTask, updateTaskStatus } = useMockData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<TaskStatus>("To Do");

  const openModal = (status: TaskStatus) => {
    setModalStatus(status);
    setIsModalOpen(true);
  };

  const todoTasks = tasks.filter(t => t.status === "To Do");
  const inProgressTasks = tasks.filter(t => t.status === "In Progress");
  const doneTasks = tasks.filter(t => t.status === "Done");

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex items-center justify-between px-8 pt-6">
        <div>
          <h1 className="text-2xl font-bold">Tasks ✅</h1>
          <p className="text-xs text-muted-foreground">Manage your workflow.</p>
        </div>
        <button 
          onClick={() => openModal("To Do")}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> New Task
        </button>
      </div>

      <div className="flex-1 overflow-x-auto px-8 py-6">
        <div className="flex gap-6 min-w-max h-full items-start">
          <TaskColumn title="To Do" count={todoTasks.length} onAdd={() => openModal("To Do")}>
            {todoTasks.map(t => (
              <TaskCard key={t.id} task={t} onMoveRight={() => updateTaskStatus(t.id, "In Progress")} />
            ))}
          </TaskColumn>
          
          <TaskColumn title="In Progress" count={inProgressTasks.length} onAdd={() => openModal("In Progress")}>
            {inProgressTasks.map(t => (
              <TaskCard key={t.id} task={t} onMoveLeft={() => updateTaskStatus(t.id, "To Do")} onMoveRight={() => updateTaskStatus(t.id, "Done")} />
            ))}
          </TaskColumn>

          <TaskColumn title="Done" count={doneTasks.length} onAdd={() => openModal("Done")}>
            {doneTasks.map(t => (
              <TaskCard key={t.id} task={t} onMoveLeft={() => updateTaskStatus(t.id, "In Progress")} />
            ))}
          </TaskColumn>
        </div>
      </div>

      {isModalOpen && (
        <NewTaskModal 
          defaultStatus={modalStatus} 
          onClose={() => setIsModalOpen(false)} 
          onSave={addTask} 
        />
      )}
    </div>
  );
}

function TaskColumn({ title, count, children, onAdd }: { title: string; count: number; children: React.ReactNode; onAdd: () => void }) {
  return (
    <div className="w-80 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{title}</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium">{count}</span>
        </div>
        <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button>
      </div>
      <div className="flex flex-col gap-3 rounded-2xl bg-card border border-border p-3 min-h-[500px]">
        {children}
        <button onClick={onAdd} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground p-2 transition-colors">
          <Plus className="h-3 w-3" /> Add task
        </button>
      </div>
    </div>
  );
}

function TaskCard({ task, onMoveLeft, onMoveRight }: { task: Task; onMoveLeft?: () => void; onMoveRight?: () => void }) {
  const pColor = task.priority === "High" ? "text-red-500 bg-red-500/10" : task.priority === "Medium" ? "text-orange-500 bg-orange-500/10" : "text-green-500 bg-green-500/10";
  return (
    <div className="group rounded-xl border border-border bg-background p-3 shadow-sm hover:shadow transition-all relative">
      <div className="flex flex-wrap gap-2 mb-2">
        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${pColor}`}>{task.priority}</span>
        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground">{task.tag}</span>
      </div>
      <div className="text-sm font-medium mb-3">{task.title}</div>
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50 text-muted-foreground">
        <div className="flex -space-x-2">
          <div className="h-6 w-6 rounded-full border-2 border-background bg-gradient-to-br from-foreground/20 to-foreground/40" />
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          {onMoveLeft && (
            <button onClick={onMoveLeft} className="p-1 hover:bg-muted rounded text-foreground transition-colors opacity-0 group-hover:opacity-100" title="Move Left">
              <ChevronLeft className="h-3 w-3" />
            </button>
          )}
          {onMoveRight && (
            <button onClick={onMoveRight} className="p-1 hover:bg-muted rounded text-foreground transition-colors opacity-0 group-hover:opacity-100" title="Move Right">
              <ChevronRight className="h-3 w-3" />
            </button>
          )}
          <MessageSquare className="h-3 w-3 ml-1" /> 0
        </div>
      </div>
    </div>
  );
}

function NewTaskModal({ defaultStatus, onClose, onSave }: { defaultStatus: TaskStatus; onClose: () => void; onSave: (task: Omit<Task, "id">) => void }) {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("Work");
  const [priority, setPriority] = useState<Priority>("Medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title, tag, priority, status: defaultStatus });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">New Task ({defaultStatus})</h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted text-muted-foreground"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Task Title</label>
            <input 
              autoFocus
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground transition-colors" 
              placeholder="e.g. Design new landing page"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Priority</label>
              <select 
                value={priority} 
                onChange={e => setPriority(e.target.value as Priority)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground transition-colors appearance-none"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Tag</label>
              <input 
                type="text" 
                value={tag} 
                onChange={e => setTag(e.target.value)} 
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground transition-colors" 
              />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
            <button type="submit" disabled={!title.trim()} className="rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 disabled:opacity-50 transition-colors">Save Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}
