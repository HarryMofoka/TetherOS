import type { Metadata } from "next";
import { Plus, StickyNote, MoreVertical, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Notes — LifeOS",
  description: "Capture quick thoughts.",
};

export default function NotesPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-8 pt-6 pb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <StickyNote className="h-6 w-6 text-yellow-500" /> Notes
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Your personal knowledge base.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search notes..." 
              className="bg-card border border-border rounded-full pl-9 pr-4 py-2 text-sm outline-none w-64 focus:border-[color:var(--brand-blue)]/50 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium">
            <Plus className="h-4 w-4" /> New Note
          </button>
        </div>
      </div>

      <div className="px-8 pb-8 overflow-y-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          <NoteCard 
            title="Q1 App Redesign Ideas" 
            content="We need to focus heavily on the mobile experience. The current dashboard is way too dense on small screens. Let's explore a bottom-sheet based navigation."
            date="Feb 11, 2025"
            tags={["Work", "Design"]}
            color="bg-yellow-500/10 border-yellow-500/20"
          />
          <NoteCard 
            title="Grocery List" 
            content="- Oat milk
- Almonds
- Bananas
- Greek yogurt
- Spinach
- Coffee beans (Ethiopian)"
            date="Feb 10, 2025"
            tags={["Personal"]}
            color="bg-green-500/10 border-green-500/20"
          />
          <NoteCard 
            title="Meeting Notes: Marketing Sync" 
            content="Sarah mentioned that the new ad campaign is performing 15% better than expected. We should double down on the creative assets for next week. 
            
Action items:
1. Send raw files to agency
2. Approve budget increase
3. Schedule follow-up"
            date="Feb 08, 2025"
            tags={["Work", "Marketing"]}
            color="bg-blue-500/10 border-blue-500/20"
          />
          <NoteCard 
            title="Book Recommendations" 
            content="1. The Pragmatic Programmer
2. Designing Data-Intensive Applications
3. Deep Work
4. Atomic Habits (re-read)"
            date="Feb 05, 2025"
            tags={["Reading"]}
            color="bg-purple-500/10 border-purple-500/20"
          />
          <NoteCard 
            title="Workout Routine - Upper Body" 
            content="Bench Press 4x8
Incline DB Press 3x10
Pull-ups 4xMax
Barbell Rows 3x10
Bicep Curls 3x12
Tricep Extensions 3x12"
            date="Feb 01, 2025"
            tags={["Health"]}
            color="bg-red-500/10 border-red-500/20"
          />
          <NoteCard 
            title="Quick thought on AI integration" 
            content="What if we used the coach to proactively suggest restructuring the calendar when a user misses a habit? Needs more research on API limits."
            date="Jan 28, 2025"
            tags={["Product", "Ideas"]}
            color="bg-orange-500/10 border-orange-500/20"
          />
        </div>
      </div>
    </div>
  );
}

function NoteCard({ title, content, date, tags, color }: { title: string; content: string; date: string; tags: string[]; color: string }) {
  return (
    <div className={`rounded-2xl border p-5 break-inside-avoid shadow-sm hover:shadow-md transition-shadow cursor-pointer ${color}`}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-bold text-foreground leading-tight">{title}</h3>
        <button className="text-foreground/50 hover:text-foreground -mt-1 -mr-2 p-1"><MoreVertical className="h-4 w-4" /></button>
      </div>
      <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed mb-6">{content}</p>
      
      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-wrap gap-1.5">
          {tags.map(t => (
            <span key={t} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-background/50 text-foreground/70 uppercase tracking-wider border border-border/50">
              {t}
            </span>
          ))}
        </div>
        <div className="text-[10px] text-foreground/50 font-medium">{date}</div>
      </div>
    </div>
  );
}
