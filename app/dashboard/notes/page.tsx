"use client";

import { useState } from "react";
import { Plus, FileText, MoreVertical, Search, X } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
}

const mockNotes: Note[] = [
  {
    id: "1",
    title: "Q1 App Redesign Ideas",
    content: "We need to focus heavily on the mobile experience. The current dashboard is way too dense on small screens. Let's explore a bottom-sheet based navigation.",
    date: "Feb 11, 2025",
    tags: ["Work", "Design"]
  },
  {
    id: "2",
    title: "Grocery List",
    content: "- Oat milk\n- Almonds\n- Bananas\n- Greek yogurt\n- Spinach\n- Coffee beans (Ethiopian)",
    date: "Feb 10, 2025",
    tags: ["Personal"]
  },
  {
    id: "3",
    title: "Meeting Notes: Marketing Sync",
    content: "Sarah mentioned that the new ad campaign is performing 15% better than expected. We should double down on the creative assets for next week.\n\nAction items:\n1. Send raw files to agency\n2. Approve budget increase\n3. Schedule follow-up",
    date: "Feb 08, 2025",
    tags: ["Work", "Marketing"]
  }
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNote = (note: Omit<Note, "id" | "date">) => {
    const newNote: Note = {
      ...note,
      id: Math.random().toString(36).substr(2, 9),
      date: "Feb 11, 2025"
    };
    setNotes([newNote, ...notes]);
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex items-center justify-between px-8 pt-6 pb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6" /> Notes
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Your personal knowledge base.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search notes..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-card border border-border rounded-full pl-9 pr-4 py-2 text-sm outline-none w-64 focus:border-foreground transition-colors"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors text-sm font-medium"
          >
            <Plus className="h-4 w-4" /> New Note
          </button>
        </div>
      </div>

      <div className="px-8 pb-8 overflow-y-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredNotes.map(note => (
            <NoteCard 
              key={note.id}
              title={note.title} 
              content={note.content}
              date={note.date}
              tags={note.tags}
            />
          ))}
        </div>
      </div>
      
      {isModalOpen && <NewNoteModal onClose={() => setIsModalOpen(false)} onSave={handleAddNote} />}
    </div>
  );
}

function NoteCard({ title, content, date, tags }: { title: string; content: string; date: string; tags: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 break-inside-avoid shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-bold text-foreground leading-tight">{title}</h3>
        <button className="text-muted-foreground hover:text-foreground -mt-1 -mr-2 p-1"><MoreVertical className="h-4 w-4" /></button>
      </div>
      <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed mb-6">{content}</p>
      
      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-wrap gap-1.5">
          {tags.map(t => (
            <span key={t} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-muted text-muted-foreground uppercase tracking-wider border border-border/50">
              {t}
            </span>
          ))}
        </div>
        <div className="text-[10px] text-muted-foreground font-medium">{date}</div>
      </div>
    </div>
  );
}

function NewNoteModal({ onClose, onSave }: { onClose: () => void; onSave: (note: { title: string, content: string, tags: string[] }) => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;
    onSave({ 
      title: title || "Untitled", 
      content, 
      tags: tags.split(",").map(t => t.trim()).filter(Boolean) 
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">New Note</h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted text-muted-foreground"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              autoFocus
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-transparent text-xl font-bold border-none outline-none placeholder:text-muted-foreground/30 mb-2" 
              placeholder="Note Title"
            />
            <textarea 
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full bg-transparent text-sm border-none outline-none resize-none min-h-[150px] placeholder:text-muted-foreground/30" 
              placeholder="Write your note here..."
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Tags (comma separated)</label>
            <input 
              type="text" 
              value={tags}
              onChange={e => setTags(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground transition-colors" 
              placeholder="e.g. Work, Ideas"
            />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
            <button type="submit" className="rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors">Save Note</button>
          </div>
        </form>
      </div>
    </div>
  );
}
