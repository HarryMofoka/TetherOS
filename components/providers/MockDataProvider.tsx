"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Priority = "High" | "Medium" | "Low";
export type TaskStatus = "To Do" | "In Progress" | "Done";

export interface Task {
  id: string;
  title: string;
  tag: string;
  priority: Priority;
  status: TaskStatus;
}

export interface Habit {
  id: string;
  name: string;
  streak: number;
  completedToday: boolean;
}

export interface Project {
  id: string;
  name: string;
  status: "Active" | "Behind" | "Completed";
  progressPct: number;
  dueDate: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "Meeting" | "Focus" | "Personal";
}

interface MockDataContextType {
  tasks: Task[];
  habits: Habit[];
  projects: Project[];
  events: EventItem[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;
  addHabit: (name: string) => void;
  toggleHabit: (id: string) => void;
  deleteHabit: (id: string) => void;
  addProject: (project: Omit<Project, "id">) => void;
  deleteProject: (id: string) => void;
  addEvent: (event: Omit<EventItem, "id">) => void;
  deleteEvent: (id: string) => void;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export function MockDataProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tetheros_tasks");
    const storedHabits = localStorage.getItem("tetheros_habits");
    const storedProjects = localStorage.getItem("tetheros_projects");
    const storedEvents = localStorage.getItem("tetheros_events");

    if (storedTasks) setTasks(JSON.parse(storedTasks));
    if (storedHabits) setHabits(JSON.parse(storedHabits));
    if (storedProjects) setProjects(JSON.parse(storedProjects));
    if (storedEvents) setEvents(JSON.parse(storedEvents));
    
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("tetheros_tasks", JSON.stringify(tasks));
      localStorage.setItem("tetheros_habits", JSON.stringify(habits));
      localStorage.setItem("tetheros_projects", JSON.stringify(projects));
      localStorage.setItem("tetheros_events", JSON.stringify(events));
    }
  }, [tasks, habits, projects, events, mounted]);

  const addTask = (task: Omit<Task, "id">) => {
    const newTask = { ...task, id: Math.random().toString(36).substr(2, 9) };
    setTasks(prev => [...prev, newTask]);

    fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    }).catch(() => {});
  };

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));

    fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    }).catch(() => {});
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));

    fetch(`/api/tasks?id=${id}`, {
      method: "DELETE",
    }).catch(() => {});
  };

  const addHabit = (name: string) => {
    const newHabit = { id: Math.random().toString(36).substr(2, 9), name, streak: 0, completedToday: false };
    setHabits(prev => [...prev, newHabit]);

    fetch("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newHabit),
    }).catch(() => {});
  };

  const toggleHabit = (id: string) => {
    let isCompletedNow = false;
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        const wasCompleted = h.completedToday;
        isCompletedNow = !wasCompleted;
        return {
          ...h,
          completedToday: !wasCompleted,
          streak: wasCompleted ? Math.max(0, h.streak - 1) : h.streak + 1,
        };
      }
      return h;
    }));

    fetch("/api/habits", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completedToday: isCompletedNow }),
    }).catch(() => {});
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));

    fetch(`/api/habits?id=${id}`, {
      method: "DELETE",
    }).catch(() => {});
  };

  const addProject = (project: Omit<Project, "id">) => {
    const newProj = { ...project, id: Math.random().toString(36).substr(2, 9) };
    setProjects(prev => [...prev, newProj]);

    fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProj),
    }).catch(() => {});
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));

    fetch(`/api/projects?id=${id}`, {
      method: "DELETE",
    }).catch(() => {});
  };

  const addEvent = (event: Omit<EventItem, "id">) => {
    const newEvt = { ...event, id: Math.random().toString(36).substr(2, 9) };
    setEvents(prev => [...prev, newEvt]);

    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvt),
    }).catch(() => {});
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));

    fetch(`/api/events?id=${id}`, {
      method: "DELETE",
    }).catch(() => {});
  };

  if (!mounted) return <div className="h-screen w-full bg-background" />;

  return (
    <MockDataContext.Provider 
      value={{ 
        tasks, habits, projects, events, 
        addTask, updateTaskStatus, deleteTask, 
        addHabit, toggleHabit, deleteHabit, 
        addProject, deleteProject, 
        addEvent, deleteEvent 
      }}
    >
      {children}
    </MockDataContext.Provider>
  );
}

export function useMockData() {
  const context = useContext(MockDataContext);
  if (!context) {
    throw new Error("useMockData must be used within a MockDataProvider");
  }
  return context;
}
