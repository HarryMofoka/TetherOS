"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid, Clock, Calendar as CalIcon, CheckSquare, Repeat, Folder, Book, MessageSquare, BarChart, Timer, FileText, Bookmark, Plug, ChevronDown, Settings as SettingsIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Logo } from "@/components/site/Logo";

const sideMain = [
  { icon: Grid, label: "Dashboard", desc: "Your daily overview", href: "/dashboard" },
  { icon: Clock, label: "Today", desc: "Focus on today's goals", href: "/dashboard/today" },
  { icon: CalIcon, label: "Calendar", desc: "Schedule & events", href: "/dashboard/calendar" },
  { icon: CheckSquare, label: "Tasks", desc: "Manage your to-dos", href: "/dashboard/tasks" },
  { icon: Repeat, label: "Habits", desc: "Track daily routines", href: "/dashboard/habits" },
  { icon: Folder, label: "Projects", desc: "Organize bigger goals", href: "/dashboard/projects" },
  { icon: Book, label: "Journal", desc: "Reflect and review", href: "/dashboard/journal" },
  { icon: MessageSquare, label: "AI Coach", desc: "Personalized guidance", href: "/dashboard/coach" },
  { icon: BarChart, label: "Reports", desc: "Analytics & progress", href: "/dashboard/reports" },
];
const sideTools = [
  { icon: Timer, label: "Focus Timer", desc: "Deep work sessions", href: "/dashboard/focus" },
  { icon: FileText, label: "Notes", desc: "Capture quick thoughts", href: "/dashboard/notes" },
  { icon: Bookmark, label: "Bookmarks", desc: "Saved links & resources", href: "/dashboard/bookmarks" },
  { icon: Plug, label: "Integrations", desc: "Connect your apps", href: "/dashboard/integrations" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`flex flex-col border-r border-border bg-card shrink-0 transition-[width] duration-300 ease-in-out ${collapsed ? "w-[72px]" : "w-64"}`}>
      <div className={`flex items-center p-5 ${collapsed ? "flex-col gap-4 justify-center" : "justify-between"}`}>
        <Logo iconOnly={collapsed} />
        <button onClick={() => setCollapsed(!collapsed)} className="rounded-lg p-1 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
      <nav className={`flex-1 space-y-1.5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${collapsed ? "px-2" : "px-3"}`}>
        {sideMain.map((i) => (
          <SideItem key={i.label} icon={i.icon} label={i.label} desc={i.desc} href={i.href} active={pathname === i.href} dot={i.label === "Dashboard"} collapsed={collapsed} />
        ))}
        {collapsed ? (
          <div className="pt-6 pb-2 flex justify-center"><div className="w-6 h-px bg-border" /></div>
        ) : (
          <div className="pt-6 pb-2 text-[10px] font-semibold tracking-widest text-muted-foreground pl-3">TOOLS</div>
        )}
        {sideTools.map((i) => (
          <SideItem key={i.label} icon={i.icon} label={i.label} desc={i.desc} href={i.href} active={pathname === i.href} collapsed={collapsed} />
        ))}
      </nav>
      <div className={`border-t border-border shrink-0 relative ${collapsed ? "p-2" : "p-3"}`}>
        
        {/* Profile Dropdown */}
        {profileOpen && !collapsed && (
          <div className="absolute bottom-[calc(100%-12px)] left-3 w-[calc(100%-24px)] mb-2 rounded-2xl border border-border bg-card p-4 shadow-xl z-50 animate-in slide-in-from-bottom-2 fade-in duration-200">
             <div className="flex items-center gap-3 mb-4">
               <div className="h-10 w-10 rounded-full bg-gradient-to-br from-foreground/20 to-foreground/50 shadow-sm" />
               <div>
                 <h4 className="font-bold leading-none">Harry</h4>
                 <p className="text-xs text-muted-foreground mt-1">harry.mofoka@example.com</p>
               </div>
             </div>
             
             <div className="space-y-3 text-xs mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-medium">Subscription</span>
                  <span className="font-bold text-foreground bg-muted px-2 py-0.5 rounded-full uppercase tracking-wider text-[9px]">TetherOS Pro</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-medium">Cloud Storage</span>
                  <span className="font-semibold">4.2 GB <span className="text-muted-foreground font-normal">/ 10 GB</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-medium">Member Since</span>
                  <span className="font-semibold">Feb 2025</span>
                </div>
             </div>
             
             <button className="w-full rounded-xl bg-red-500/10 text-red-500 py-2.5 text-xs font-bold hover:bg-red-500/20 transition-colors">
               Log out
             </button>
          </div>
        )}

        <div 
          onClick={() => !collapsed && setProfileOpen(!profileOpen)}
          className={`flex items-center gap-3 rounded-xl cursor-pointer transition-colors ${profileOpen && !collapsed ? "bg-muted" : "hover:bg-muted"} ${collapsed ? "justify-center p-2" : "p-2"}`}
          title={collapsed ? "Profile" : undefined}
        >
          <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-foreground/20 to-foreground/50" />
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">Harry</div>
                <div className="text-[10px] text-muted-foreground truncate">Software Engineer</div>
              </div>
              <ChevronDown className={`shrink-0 h-4 w-4 text-muted-foreground transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
            </>
          )}
        </div>
        
        <Link 
          href="/dashboard/settings" 
          className={`mt-2 flex items-center gap-2 rounded-xl text-sm transition-colors ${pathname === '/dashboard/settings' ? "bg-foreground text-background" : "hover:bg-muted"} ${collapsed ? "justify-center p-3" : "p-2 w-full"}`}
          title={collapsed ? "Settings" : undefined}
        >
          <SettingsIcon className="h-4 w-4 shrink-0" /> {!collapsed && "Settings"}
        </Link>
      </div>
    </aside>
  );
}

function SideItem({ icon: Icon, label, desc, active, dot, href, collapsed }: { icon: React.ComponentType<{ className?: string }>; label: string; desc?: string; active?: boolean; dot?: boolean; href: string; collapsed?: boolean; }) {
  return (
    <Link 
      href={href} 
      title={collapsed ? label : undefined}
      className={`flex items-start gap-3 rounded-xl transition-colors ${active ? "bg-foreground text-background" : "text-foreground/80 hover:bg-muted"} ${collapsed ? "justify-center px-0 py-3" : "px-3 py-2.5 w-full"}`}
    >
      <div className={`${collapsed ? "mt-0" : "mt-0.5"} shrink-0`}><Icon className={`${collapsed ? "h-5 w-5" : "h-4 w-4"}`} /></div>
      {!collapsed && (
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
      )}
    </Link>
  );
}
