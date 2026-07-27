"use client";

import { useState } from "react";
import { Plus, Search, FileText, Trash2, Tag, BookOpen } from "lucide-react";

export default function NotesPage() {
  const [notes, setNotes] = useState([
    { id: 1, title: "Architecture Refactoring Ideas", category: "Work", date: "Feb 10, 2025", content: "Consider moving state to local-first CRDTs with WebSockets for instant multi-tab sync." },
    { id: 2, title: "Book Highlights: Atomic Habits", category: "Personal", date: "Feb 08, 2025", content: "Make habits obvious, attractive, easy, and satisfying. Focus on system over goals." },
    { id: 3, title: "Weekly Planning Routine", category: "Productivity", date: "Feb 05, 2025", content: "Set 3 high-impact goals on Sunday evening before reviewing active projects." },
  ]);

  const [activeNoteId, setActiveNoteId] = useState(1);
  const activeNote = notes.find(n => n.id === activeNoteId) || notes[0];

  const [newTitle, setNewTitle] = useState("");

  const addNote = () => {
    if (!newTitle.trim()) return;
    const note = {
      id: Date.now(),
      title: newTitle,
      category: "Personal",
      date: "Today",
      content: "Type your notes here...",
    };
    setNotes([note, ...notes]);
    setActiveNoteId(note.id);
    setNewTitle("");
  };

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in-up h-[calc(100vh-80px)] flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Smart Notes & Quick Capture</h1>
          <p className="text-xs text-muted-foreground mt-1">Capture ideas, project specs, and quick thoughts effortlessly.</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden">
        {/* Notes Sidebar */}
        <div className="col-span-12 md:col-span-4 rounded-2xl border border-border bg-card p-4 flex flex-col gap-4 overflow-hidden">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Note title..." 
              className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-foreground"
            />
            <button onClick={addNote} className="rounded-xl bg-foreground text-background px-3 py-2 text-xs font-bold shrink-0 hover:opacity-90">
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {notes.map(n => (
              <div 
                key={n.id}
                onClick={() => setActiveNoteId(n.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${n.id === activeNoteId ? "border-foreground bg-muted shadow-sm" : "border-border/60 hover:bg-muted/40"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs truncate">{n.title}</span>
                  <span className="text-[10px] text-muted-foreground">{n.date}</span>
                </div>
                <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1">{n.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Note Editor */}
        <div className="col-span-12 md:col-span-8 rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 overflow-hidden">
          {activeNote ? (
            <>
              <div className="border-b border-border pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{activeNote.title}</h2>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="rounded-md bg-muted px-2 py-0.5 font-semibold text-[10px]">{activeNote.category}</span>
                    <span>Created: {activeNote.date}</span>
                  </div>
                </div>
              </div>
              <textarea 
                value={activeNote.content}
                onChange={(e) => {
                  const updated = notes.map(n => n.id === activeNote.id ? { ...n, content: e.target.value } : n);
                  setNotes(updated);
                }}
                className="flex-1 w-full bg-transparent resize-none outline-none text-sm leading-relaxed"
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-xs">
              Select or create a note to begin.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
