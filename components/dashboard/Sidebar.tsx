"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Grid, Clock, Calendar as CalIcon, CheckSquare, Repeat, Folder, Book, 
  MessageSquare, BarChart, Timer, FileText, Bookmark, Plug, ChevronDown, 
  Settings as SettingsIcon, ChevronLeft, ChevronRight, Menu, X, Table2, 
  FormInput, UserCircle, Ticket, BookOpen, Lock, LogIn, UserPlus, Key, 
  ShieldCheck, AlertTriangle, LifeBuoy 
} from "lucide-react";
import { Logo } from "@/components/site/Logo";

interface SubItem {
  label: string;
  href: string;
}

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc?: string;
  href?: string;
  subItems?: SubItem[];
  dot?: boolean;
}

interface MenuSection {
  heading: string;
  items: MenuItem[];
}

const sidebarSections: MenuSection[] = [
  {
    heading: "DASHBOARD",
    items: [
      { icon: Grid, label: "Modern Overview", desc: "Your daily overview", href: "/dashboard", dot: true },
      { icon: Clock, label: "Today Plan", desc: "Focus on today's goals", href: "/dashboard/today" },
      { icon: CalIcon, label: "Calendar & Events", desc: "Schedule & events", href: "/dashboard/calendar" },
    ],
  },
  {
    heading: "APPS",
    items: [
      { icon: CheckSquare, label: "Tasks & Board", desc: "Manage your to-dos", href: "/dashboard/tasks" },
      { icon: Repeat, label: "Habits", desc: "Track daily routines", href: "/dashboard/habits" },
      { icon: Folder, label: "Projects", desc: "Organize bigger goals", href: "/dashboard/projects" },
      { icon: Book, label: "Daily Journal", desc: "Reflect and review", href: "/dashboard/journal" },
      { icon: MessageSquare, label: "AI Coach", desc: "Personalized guidance", href: "/dashboard/coach" },
      { icon: BarChart, label: "Reports", desc: "Analytics & progress", href: "/dashboard/reports" },
      { icon: FileText, label: "Notes & Capture", desc: "Scratchpad & quick thoughts", href: "/apps/notes" },
      {
        icon: BookOpen,
        label: "Insights & Articles",
        desc: "Productivity guides",
        subItems: [
          { label: "Articles Listing", href: "/apps/blog/post" },
          { label: "Article Detail", href: "/apps/blog/detail/1" },
          { label: "Create Guide", href: "/apps/blog/create" },
          { label: "Edit Guide", href: "/apps/blog/edit" },
          { label: "Manage Content", href: "/apps/blog/manage-blog" },
        ],
      },
      {
        icon: Ticket,
        label: "Support Tickets",
        desc: "Feedback & requests",
        subItems: [
          { label: "Tickets List", href: "/apps/tickets" },
          { label: "Create Ticket", href: "/apps/tickets/create" },
        ],
      },
    ],
  },
  {
    heading: "PAGES",
    items: [
      { icon: Table2, label: "Performance Tables", desc: "Data & matrices", href: "/pages/tables" },
      { icon: FormInput, label: "Goal & Task Forms", desc: "Custom configurations", href: "/pages/form" },
      { icon: UserCircle, label: "User Profile", desc: "Stats & account details", href: "/pages/user-profile" },
    ],
  },
  {
    heading: "TOOLS",
    items: [
      { icon: Timer, label: "Focus Timer", desc: "Deep work sessions", href: "/dashboard/focus" },
      { icon: Bookmark, label: "Bookmarks", desc: "Saved links & resources", href: "/dashboard/bookmarks" },
      { icon: Plug, label: "Integrations", desc: "Connect your apps", href: "/dashboard/integrations" },
    ],
  },
  {
    heading: "AUTH & SYSTEM",
    items: [
      {
        icon: LogIn,
        label: "Authentication",
        desc: "Security & access",
        subItems: [
          { label: "Boxed Login", href: "/auth/auth2/login" },
          { label: "Boxed Register", href: "/auth/auth2/register" },
          { label: "Forgot Password", href: "/auth/auth2/forgot-password" },
          { label: "Two Steps Auth", href: "/auth/auth2/two-steps" },
        ],
      },
      {
        icon: AlertTriangle,
        label: "System Pages",
        desc: "Maintenance & errors",
        subItems: [
          { label: "Maintenance Mode", href: "/auth/maintenance" },
          { label: "404 Error Page", href: "/auth/404" },
        ],
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    "Insights & Articles": false,
    "Support Tickets": false,
    "Authentication": false,
    "System Pages": false,
  });

  const toggleSubMenu = (label: string) => {
    setExpandedMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="space-y-6">
      {sidebarSections.map((section) => (
        <div key={section.heading}>
          {!isMobile && collapsed ? (
            <div className="py-2 flex justify-center"><div className="w-6 h-px bg-border" /></div>
          ) : (
            <div className="pb-2 text-[10px] font-bold tracking-widest text-muted-foreground px-3">
              {section.heading}
            </div>
          )}
          <div className="space-y-1">
            {section.items.map((item) => (
              <SideItem
                key={item.label}
                item={item}
                pathname={pathname}
                collapsed={!isMobile && collapsed}
                isExpanded={expandedMenus[item.label]}
                onToggle={() => toggleSubMenu(item.label)}
                onItemClick={() => isMobile && setMobileMenuOpen(false)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const ProfileSection = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={`border-t border-border shrink-0 relative ${!isMobile && collapsed ? "p-2" : "p-3"}`}>
      {profileOpen && (!collapsed || isMobile) && (
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
          </div>
          <button className="w-full rounded-xl bg-red-500/10 text-red-500 py-2.5 text-xs font-bold hover:bg-red-500/20 transition-colors">
            Log out
          </button>
        </div>
      )}

      <div
        onClick={() => (!collapsed || isMobile) && setProfileOpen(!profileOpen)}
        className={`flex items-center gap-3 rounded-xl cursor-pointer transition-colors ${profileOpen && (!collapsed || isMobile) ? "bg-muted" : "hover:bg-muted"} ${!isMobile && collapsed ? "justify-center p-2" : "p-2"}`}
      >
        <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-foreground/20 to-foreground/50" />
        {(!collapsed || isMobile) && (
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
        onClick={() => isMobile && setMobileMenuOpen(false)}
        className={`mt-2 flex items-center gap-2 rounded-xl text-sm transition-colors ${pathname === "/dashboard/settings" ? "bg-foreground text-background" : "hover:bg-muted"} ${!isMobile && collapsed ? "justify-center p-3" : "p-2 w-full"}`}
      >
        <SettingsIcon className="h-4 w-4 shrink-0" /> {(!collapsed || isMobile) && "Settings"}
      </Link>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 border-b border-border bg-card shrink-0 z-40">
        <Link href="/dashboard"><Logo /></Link>
        <button onClick={() => setMobileMenuOpen(true)} className="p-2 -mr-2 rounded-lg text-foreground hover:bg-muted transition-colors">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Off-Canvas Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-80 bg-card h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="p-4 flex justify-end border-b border-border">
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 -mr-2 rounded-lg text-foreground hover:bg-muted transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-4">
              <NavLinks isMobile={true} />
            </nav>
            <ProfileSection isMobile={true} />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col border-r border-border bg-card shrink-0 transition-[width] duration-300 ease-in-out ${collapsed ? "w-[72px]" : "w-64"}`}>
        <div className={`flex items-center p-5 ${collapsed ? "flex-col gap-4 justify-center" : "justify-between"}`}>
          <Logo iconOnly={collapsed} />
          <button onClick={() => setCollapsed(!collapsed)} className="rounded-lg p-1 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
        <nav className={`flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${collapsed ? "px-2" : "px-3"}`}>
          <NavLinks />
        </nav>
        <ProfileSection />
      </aside>
    </>
  );
}

function SideItem({
  item,
  pathname,
  collapsed,
  isExpanded,
  onToggle,
  onItemClick,
}: {
  item: MenuItem;
  pathname: string;
  collapsed?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
  onItemClick?: () => void;
}) {
  const Icon = item.icon;
  const hasSub = !!item.subItems && item.subItems.length > 0;
  const isActive = item.href ? pathname === item.href : item.subItems?.some((s) => pathname === s.href);

  if (hasSub && !collapsed) {
    return (
      <div className="space-y-1">
        <button
          onClick={onToggle}
          className={`flex items-start gap-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] px-3 py-2.5 w-full text-left ${isActive ? "bg-muted font-semibold text-foreground" : "text-foreground/80 hover:bg-muted"}`}
        >
          <div className="mt-0.5 shrink-0"><Icon className="h-4 w-4" /></div>
          <div className="flex-1 flex flex-col items-start min-w-0">
            <div className="flex w-full items-center justify-between gap-2">
              <span className="font-medium truncate">{item.label}</span>
              <ChevronDown className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
            </div>
            {item.desc && <span className="mt-0.5 text-[10px] truncate w-full text-left text-muted-foreground">{item.desc}</span>}
          </div>
        </button>
        {isExpanded && (
          <div className="pl-9 space-y-1 border-l-2 border-border/50 ml-4 py-1">
            {item.subItems?.map((sub) => {
              const subActive = pathname === sub.href;
              return (
                <Link
                  key={sub.label}
                  href={sub.href}
                  onClick={onItemClick}
                  className={`block rounded-lg px-3 py-1.5 text-xs transition-colors ${subActive ? "font-bold text-foreground bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
                >
                  {sub.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href || "#"}
      title={collapsed ? item.label : undefined}
      onClick={onItemClick}
      className={`flex items-start gap-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${isActive ? "bg-foreground text-background shadow-sm" : "text-foreground/80 hover:bg-muted"} ${collapsed ? "justify-center px-0 py-3" : "px-3 py-2.5 w-full"}`}
    >
      <div className={`${collapsed ? "mt-0" : "mt-0.5"} shrink-0`}><Icon className={`${collapsed ? "h-5 w-5" : "h-4 w-4"}`} /></div>
      {!collapsed && (
        <div className="flex-1 flex flex-col items-start min-w-0">
          <div className="flex w-full items-center justify-between gap-2">
            <span className="font-medium truncate">{item.label}</span>
            {item.dot && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current animate-pulse" />}
          </div>
          {item.desc && (
            <span className={`mt-0.5 text-[10px] truncate w-full text-left ${isActive ? "text-background/70" : "text-muted-foreground"}`}>
              {item.desc}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
