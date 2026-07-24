import { Search, Plus, Bell, Sun } from "lucide-react";

// Desktop Top Bar: Provides quick search, quick action shortcut, notification bell, and theme toggle
export function TopBar() {
  return (
    <div className="hidden md:flex items-center gap-4 px-8 pt-5 shrink-0">
      {/* Search Input Simulation */}
      <div className="mx-auto flex w-full max-w-lg items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-all duration-200 hover:border-foreground/40 cursor-pointer">
        <Search className="h-4 w-4" />
        <span className="flex-1">Search anything...</span>
        <span className="text-[10px] font-semibold bg-muted px-1.5 py-0.5 rounded">⌘ K</span>
      </div>
      
      {/* Action Controls */}
      <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm">
        <Plus className="h-4 w-4" /> Quick Add
      </button>
      <button className="relative rounded-full border border-border bg-card p-2 transition-all duration-200 hover:bg-muted active:scale-95" title="Notifications">
        <Bell className="h-4 w-4" />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-blue)] animate-pulse" />
      </button>
      <button className="rounded-full border border-border bg-card p-2 transition-all duration-200 hover:bg-muted active:scale-95" title="Theme Toggle">
        <Sun className="h-4 w-4" />
      </button>
    </div>
  );
}
