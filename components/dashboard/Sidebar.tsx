"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Sun, Calendar as CalIcon, CheckCircle2, Flame, FolderKanban, BookOpen, Sparkles, LineChart, Timer, StickyNote, Bookmark, Boxes, ChevronDown, Settings as SettingsIcon, ChevronLeft } from "lucide-react";
import { Logo } from "@/components/site/Logo";

const sideMain = [
  { icon: LayoutDashboard, label: "Dashboard", desc: "Your daily overview", href: "/dashboard" },
  { icon: Sun, label: "Today", desc: "Focus on today's goals", href: "/dashboard/today" },
  { icon: CalIcon, label: "Calendar", desc: "Schedule & events", href: "/dashboard/calendar" },
  { icon: CheckCircle2, label: "Tasks", desc: "Manage your to-dos", href: "/dashboard/tasks" },
  { icon: Flame, label: "Habits", desc: "Track daily routines", href: "/dashboard/habits" },
  { icon: FolderKanban, label: "Projects", desc: "Organize bigger goals", href: "/dashboard/projects" },
  { icon: BookOpen, label: "Journal", desc: "Reflect and review", href: "/dashboard/journal" },
  { icon: Sparkles, label: "AI Coach", desc: "Personalized guidance", href: "/dashboard/coach" },
  { icon: LineChart, label: "Reports", desc: "Analytics & progress", href: "/dashboard/reports" },
];
const sideTools = [
  { icon: Timer, label: "Focus Timer", desc: "Deep work sessions", href: "/dashboard/focus" },
  { icon: StickyNote, label: "Notes", desc: "Capture quick thoughts", href: "/dashboard/notes" },
  { icon: Bookmark, label: "Bookmarks", desc: "Saved links & resources", href: "/dashboard/bookmarks" },
  { icon: Boxes, label: "Integrations", desc: "Connect your apps", href: "/dashboard/integrations" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r border-border bg-card shrink-0">
      <div className="flex items-center justify-between p-5">
        <Logo />
        <button className="rounded-lg p-1 hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button>
      </div>
      <nav className="flex-1 space-y-1.5 px-3 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {sideMain.map((i) => (
          <SideItem key={i.label} icon={i.icon} label={i.label} desc={i.desc} href={i.href} active={pathname === i.href} dot={i.label === "Dashboard"} />
        ))}
        <div className="pt-6 pb-2 text-[10px] font-semibold tracking-widest text-muted-foreground pl-3">TOOLS</div>
        {sideTools.map((i) => (
          <SideItem key={i.label} icon={i.icon} label={i.label} desc={i.desc} href={i.href} active={pathname === i.href} />
        ))}
      </nav>
      <div className="border-t border-border p-3 shrink-0">
        <div className="flex items-center gap-3 rounded-xl p-2">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-300 to-pink-500" />
          <div className="flex-1">
            <div className="text-sm font-semibold">Harry</div>
            <div className="text-[10px] text-muted-foreground">Software Engineer</div>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
        <button className="mt-2 flex w-full items-center gap-2 rounded-xl p-2 text-sm hover:bg-muted">
          <SettingsIcon className="h-4 w-4" /> Settings
        </button>
      </div>
    </aside>
  );
}

function SideItem({ icon: Icon, label, desc, active, dot, href }: { icon: React.ComponentType<{ className?: string }>; label: string; desc?: string; active?: boolean; dot?: boolean; href: string; }) {
  return (
    <Link href={href} className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${active ? "bg-foreground text-background" : "text-foreground/80 hover:bg-muted"}`}>
      <div className="mt-0.5 shrink-0"><Icon className="h-4 w-4" /></div>
      <div className="flex-1 flex flex-col items-start min-w-0">
        <div className="flex w-full items-center justify-between gap-2">
          <span className="font-medium truncate">{label}</span>
          {dot && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />}
        </div>
        {desc && (
          <span className={`mt-0.5 text-[10px] truncate w-full text-left ${active ? "text-background/70" : "text-muted-foreground"}`}>
            {desc}
          </span>
        )}
      </div>
    </Link>
  );
}
