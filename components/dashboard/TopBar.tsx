import { Search, Plus, Bell, Sun } from "lucide-react";

export function TopBar() {
  return (
    <div className="hidden md:flex items-center gap-4 px-8 pt-5 shrink-0">
      <div className="mx-auto flex w-full max-w-lg items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
        <Search className="h-4 w-4" />
        <span className="flex-1">Search anything...</span>
        <span className="text-[10px]">⌘ K</span>
      </div>
      <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background"><Plus className="h-4 w-4" /> Quick Add</button>
      <button className="relative rounded-full border border-border bg-card p-2"><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-blue)]" /></button>
      <button className="rounded-full border border-border bg-card p-2"><Sun className="h-4 w-4" /></button>
    </div>
  );
}
