import type { Metadata } from "next";
import { PenLine, Calendar as CalIcon, Save } from "lucide-react";

export const metadata: Metadata = {
  title: "Journal â€” TetherOS",
  description: "Reflect and review.",
};

export default function JournalPage() {
  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Sidebar for Journal entries */}
      <div className="w-80 border-r border-border bg-card/50 flex flex-col h-full shrink-0">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold">Journal ðŸ““</h1>
          <p className="text-xs text-muted-foreground mt-1">Reflect on your days.</p>
          <button className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background">
            <PenLine className="h-4 w-4" /> New Entry
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <JournalEntryCard date="Today, Feb 11" title="Productive morning but afternoon slump" active />
          <JournalEntryCard date="Yesterday, Feb 10" title="Planning the week ahead" />
          <JournalEntryCard date="Sunday, Feb 9" title="Rest and recharge" />
          <JournalEntryCard date="Saturday, Feb 8" title="Hiking in the mountains" />
          <JournalEntryCard date="Friday, Feb 7" title="End of week reflections" />
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col h-full bg-background relative">
        <div className="absolute inset-0 max-w-3xl mx-auto w-full p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8 text-muted-foreground">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CalIcon className="h-4 w-4" /> Tuesday, 11 February 2025
            </div>
            <button className="flex items-center gap-2 text-xs font-semibold hover:text-foreground transition-colors">
              <Save className="h-4 w-4" /> Saved
            </button>
          </div>
          
          <input 
            type="text" 
            placeholder="Entry Title..." 
            className="text-3xl font-bold bg-transparent border-none outline-none placeholder:text-muted-foreground/30 mb-6"
            defaultValue="Productive morning but afternoon slump"
          />
          
          <textarea 
            placeholder="Start writing..." 
            className="flex-1 bg-transparent border-none outline-none resize-none text-foreground/80 leading-relaxed placeholder:text-muted-foreground/30"
            defaultValue="Today started off really well. I managed to get through the entire morning routine and hit a 2.5 hour deep work session where I built out the authentication flow. I'm really proud of how clean the code turned out.

However, after lunch I completely hit a wall. The context switch to implementing the API endpoints was harder than expected, and I spent an hour just staring at the screen. I think I need to start taking slightly longer breaks in the middle of the day, or maybe go for a walk outside to reset my brain.

Tomorrow I will focus entirely on testing and debugging the flow so I don't have to carry this over to Thursday."
          />
        </div>
      </div>
    </div>
  );
}

function JournalEntryCard({ date, title, active }: { date: string; title: string; active?: boolean }) {
  return (
    <div className={`p-4 rounded-xl cursor-pointer transition-colors border ${active ? "bg-muted border-border" : "bg-transparent border-transparent hover:bg-muted/50"}`}>
      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{date}</div>
      <div className={`text-sm font-medium line-clamp-2 ${active ? "text-foreground" : "text-foreground/80"}`}>{title}</div>
    </div>
  );
}
