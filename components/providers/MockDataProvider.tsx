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
  // Start with empty arrays — real data comes from localStorage after onboarding
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
    setTasks(prev => [...prev, { ...task, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const addHabit = (name: string) => {
    setHabits(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), name, streak: 0, completedToday: false }]);
  };

  const toggleHabit = (id: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        const wasCompleted = h.completedToday;
        return {
          ...h,
          completedToday: !wasCompleted,
          streak: wasCompleted ? Math.max(0, h.streak - 1) : h.streak + 1,
        };
      }
      return h;
    }));
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const addProject = (project: Omit<Project, "id">) => {
    setProjects(prev => [...prev, { ...project, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addEvent = (event: Omit<EventItem, "id">) => {
    setEvents(prev => [...prev, { ...event, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
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
