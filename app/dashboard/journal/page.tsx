"use client";

import { useState } from "react";
import { PenLine, Calendar as CalIcon, Save } from "lucide-react";

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
}

const mockEntries: JournalEntry[] = [
  {
    id: "1",
    date: "Today, Feb 11",
    title: "Productive morning but afternoon slump",
    content: "Today started off really well. I managed to get through the entire morning routine and hit a 2.5 hour deep work session where I built out the authentication flow. I'm really proud of how clean the code turned out.\n\nHowever, after lunch I completely hit a wall. The context switch to implementing the API endpoints was harder than expected, and I spent an hour just staring at the screen. I think I need to start taking slightly longer breaks in the middle of the day, or maybe go for a walk outside to reset my brain.\n\nTomorrow I will focus entirely on testing and debugging the flow so I don't have to carry this over to Thursday."
  },
  {
    id: "2",
    date: "Yesterday, Feb 10",
    title: "Planning the week ahead",
    content: "Spent the evening looking over the OKRs and scheduling time blocks. I feel prepared."
  },
  {
    id: "3",
    date: "Sunday, Feb 9",
    title: "Rest and recharge",
    content: "Took the day off. Read a book and went for a long walk."
  }
];

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>(mockEntries);
  const [activeId, setActiveId] = useState<string>(mockEntries[0].id);
  const [isSaving, setIsSaving] = useState(false);

  const activeEntry = entries.find(e => e.id === activeId);

  const handleNewEntry = () => {
    const newEntry: JournalEntry = {
      id: Math.random().toString(36).substr(2, 9),
      date: `Today, Feb 11`, // Mock date
      title: "",
      content: ""
    };
    setEntries([newEntry, ...entries]);
    setActiveId(newEntry.id);
  };

  const updateEntry = (field: "title" | "content", value: string) => {
    setEntries(prev => prev.map(e => e.id === activeId ? { ...e, [field]: value } : e));
    
    // Mock save indicator
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Sidebar for Journal entries */}
      <div className="w-80 border-r border-border bg-card/50 flex flex-col h-full shrink-0">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold">Journal 📝</h1>
          <p className="text-xs text-muted-foreground mt-1">Reflect on your days.</p>
          <button 
            onClick={handleNewEntry}
            className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
          >
            <PenLine className="h-4 w-4" /> New Entry
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {entries.map(entry => (
            <JournalEntryCard 
              key={entry.id}
              date={entry.date} 
              title={entry.title || "Untitled Entry"} 
              active={entry.id === activeId} 
              onClick={() => setActiveId(entry.id)}
            />
          ))}
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col h-full bg-background relative">
        {activeEntry ? (
          <div className="absolute inset-0 max-w-3xl mx-auto w-full p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8 text-muted-foreground">
              <div className="flex items-center gap-2 text-sm font-medium">
                <CalIcon className="h-4 w-4" /> {activeEntry.date}
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <Save className={`h-4 w-4 ${isSaving ? "animate-pulse text-foreground" : ""}`} /> 
                {isSaving ? "Saving..." : "Saved"}
              </div>
            </div>
            
            <input 
              type="text" 
              placeholder="Entry Title..." 
              className="text-3xl font-bold bg-transparent border-none outline-none placeholder:text-muted-foreground/30 mb-6"
              value={activeEntry.title}
              onChange={(e) => updateEntry("title", e.target.value)}
            />
            
            <textarea 
              placeholder="Start writing..." 
              className="flex-1 bg-transparent border-none outline-none resize-none text-foreground/80 leading-relaxed placeholder:text-muted-foreground/30"
              value={activeEntry.content}
              onChange={(e) => updateEntry("content", e.target.value)}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground flex-col">
             <PenLine className="h-12 w-12 mb-4 opacity-20" />
             <p>Select an entry to read or write</p>
          </div>
        )}
      </div>
    </div>
  );
}

function JournalEntryCard({ date, title, active, onClick }: { date: string; title: string; active?: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick} className={`p-4 rounded-xl cursor-pointer transition-colors border ${active ? "bg-muted border-border" : "bg-transparent border-transparent hover:bg-muted/50"}`}>
      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{date}</div>
      <div className={`text-sm font-medium line-clamp-2 ${active ? "text-foreground" : "text-foreground/80"}`}>{title}</div>
    </div>
  );
}
