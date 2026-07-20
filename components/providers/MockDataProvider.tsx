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
  toggleHabit: (id: string) => void;
  addProject: (project: Omit<Project, "id">) => void;
  addEvent: (event: Omit<EventItem, "id">) => void;
}

const defaultTasks: Task[] = [
  { id: "1", title: "Draft Q1 OKRs", tag: "Work", priority: "High", status: "To Do" },
  { id: "2", title: "Buy groceries", tag: "Personal", priority: "Medium", status: "To Do" },
  { id: "3", title: "Schedule dentist appt", tag: "Health", priority: "Low", status: "To Do" },
  { id: "4", title: "Build Auth Flow", tag: "Project", priority: "High", status: "In Progress" },
  { id: "5", title: "Read 'Atomic Habits'", tag: "Personal", priority: "Medium", status: "In Progress" },
  { id: "6", title: "Weekly Team Sync", tag: "Work", priority: "Low", status: "Done" },
  { id: "7", title: "Review PRs", tag: "Project", priority: "Medium", status: "Done" },
];

const defaultHabits: Habit[] = [
  { id: "1", name: "Read 20 pages", streak: 12, completedToday: true },
  { id: "2", name: "Morning Workout", streak: 5, completedToday: false },
  { id: "3", name: "Meditate 10m", streak: 3, completedToday: true },
  { id: "4", name: "No Social Media", streak: 1, completedToday: false },
];

const defaultProjects: Project[] = [
  { id: "1", name: "TetherOS Mobile App", status: "Behind", dueDate: "Mar 5, 2025", progressPct: 42 },
  { id: "2", name: "Q1 Marketing Campaign", status: "Active", dueDate: "Apr 1, 2025", progressPct: 15 },
  { id: "3", name: "Website Redesign", status: "Completed", dueDate: "Jan 15, 2025", progressPct: 100 },
];

const defaultEvents: EventItem[] = [
  { id: "1", title: "Product Sync", date: "2025-02-12", time: "10:00 AM", type: "Meeting" },
  { id: "2", title: "Deep Work: API Design", date: "2025-02-14", time: "1:00 PM", type: "Focus" },
  { id: "3", title: "Gym Session", date: "2025-02-15", time: "5:30 PM", type: "Personal" },
];

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export function MockDataProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [habits, setHabits] = useState<Habit[]>(defaultHabits);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [events, setEvents] = useState<EventItem[]>(defaultEvents);

  const [mounted, setMounted] = useState(false);

  // Load from local storage
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

  // Save to local storage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("tetheros_tasks", JSON.stringify(tasks));
      localStorage.setItem("tetheros_habits", JSON.stringify(habits));
      localStorage.setItem("tetheros_projects", JSON.stringify(projects));
      localStorage.setItem("tetheros_events", JSON.stringify(events));
    }
  }, [tasks, habits, projects, events, mounted]);

  const addTask = (task: Omit<Task, "id">) => {
    setTasks(prev => [...prev, { ...task, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const toggleHabit = (id: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        const wasCompleted = h.completedToday;
        return {
          ...h,
          completedToday: !wasCompleted,
          streak: wasCompleted ? h.streak - 1 : h.streak + 1,
        };
      }
      return h;
    }));
  };

  const addProject = (project: Omit<Project, "id">) => {
    setProjects(prev => [...prev, { ...project, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const addEvent = (event: Omit<EventItem, "id">) => {
    setEvents(prev => [...prev, { ...event, id: Math.random().toString(36).substr(2, 9) }]);
  };

  if (!mounted) return <div className="h-screen w-full bg-background" />; // Prevent hydration mismatch

  return (
    <MockDataContext.Provider value={{ tasks, habits, projects, events, addTask, updateTaskStatus, toggleHabit, addProject, addEvent }}>
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
