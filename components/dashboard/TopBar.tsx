"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Bell, Sun, Moon, MessageSquare, X, User, Shield, CreditCard, LogOut } from "lucide-react";
import Link from "next/link";

export function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("tetheros_theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("tetheros_theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("tetheros_theme", "dark");
      setIsDark(true);
    }
  };

  const [notifications, setNotifications] = useState([
    { id: 1, title: "Task Due Soon", desc: "Build Auth Flow is due in 2 hours.", time: "10m ago", read: false },
    { id: 2, title: "Habit Streak!", desc: "You completed 5 days of Morning Workout.", time: "1h ago", read: false },
    { id: 3, title: "AI Coach Check-in", desc: "Your weekly reflection is ready to review.", time: "3h ago", read: true },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const messages = [
    { id: 1, sender: "AI Coach", text: "Remember to log your focus hours for today!", time: "09:30 AM" },
    { id: 2, sender: "TetherOS Bot", text: "New integration available: Notion Sync.", time: "Yesterday" },
  ];

  return (
    <>
      <div className="hidden md:flex items-center gap-4 px-8 pt-5 shrink-0 relative z-30">
        {/* Quick Search Bar */}
        <div 
          onClick={() => setSearchOpen(true)}
          className="mx-auto flex w-full max-w-lg items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-all duration-200 hover:border-foreground/40 hover:shadow-sm cursor-pointer"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1">Search tasks, habits, notes or AI prompts...</span>
          <span className="text-[10px] font-semibold bg-muted px-1.5 py-0.5 rounded">⌘ K</span>
        </div>
        
        {/* Action Controls */}
        <Link href="/pages/form" className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm cursor-pointer">
          <Plus className="h-4 w-4" /> Quick Add
        </Link>

        {/* AI Messages Dropdown */}
        <div className="relative">
          <button 
            onClick={() => { setMessagesOpen(!messagesOpen); setNotificationsOpen(false); setProfileOpen(false); }}
            className="relative rounded-full border border-border bg-card p-2 transition-all duration-200 hover:bg-muted active:scale-95 cursor-pointer" 
            title="Messages & AI Prompts"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-foreground" />
          </button>

          {messagesOpen && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-border bg-card p-4 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
                <span className="font-bold text-sm">Messages</span>
                <span className="text-[10px] bg-muted px-2 py-0.5 rounded font-semibold text-muted-foreground">AI Coach</span>
              </div>
              <div className="space-y-3">
                {messages.map(m => (
                  <div key={m.id} className="p-2.5 rounded-xl border border-border/60 bg-muted/30 text-xs hover:bg-muted transition-colors cursor-pointer">
                    <div className="flex items-center justify-between font-semibold">
                      <span>{m.sender}</span>
                      <span className="text-[10px] font-normal text-muted-foreground">{m.time}</span>
                    </div>
                    <p className="mt-1 text-muted-foreground leading-snug">{m.text}</p>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/coach" onClick={() => setMessagesOpen(false)} className="mt-3 block text-center text-xs font-bold text-foreground hover:underline">
                Open AI Coach Chat &rarr;
              </Link>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => { setNotificationsOpen(!notificationsOpen); setMessagesOpen(false); setProfileOpen(false); }}
            className="relative rounded-full border border-border bg-card p-2 transition-all duration-200 hover:bg-muted active:scale-95 cursor-pointer" 
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            {notifications.some(n => !n.read) && (
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-border bg-card p-4 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
                <span className="font-bold text-sm">Notifications</span>
                <button onClick={markAllRead} className="text-[10px] text-muted-foreground hover:text-foreground font-semibold cursor-pointer">
                  Mark all read
                </button>
              </div>
              <div className="space-y-2.5">
                {notifications.map(n => (
                  <div key={n.id} className="p-2.5 rounded-xl border border-border/50 bg-background text-xs hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="flex items-center gap-1.5">
                        {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-foreground" />}
                        {n.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{n.time}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Working Theme / Night Mode Button */}
        <button 
          onClick={toggleTheme}
          className="rounded-full border border-border bg-card p-2 transition-all duration-200 hover:bg-muted active:scale-95 cursor-pointer" 
          title={isDark ? "Switch to Light Mode" : "Switch to Night / Dark Mode"}
        >
          {isDark ? <Moon className="h-4 w-4 text-amber-400" /> : <Sun className="h-4 w-4" />}
        </button>

        {/* User Profile Avatar Popover */}
        <div className="relative">
          <div 
            onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false); setMessagesOpen(false); }}
            className="h-9 w-9 rounded-full bg-gradient-to-br from-foreground/20 to-foreground/50 border border-border cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-sm"
          />

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-border bg-card p-4 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-3 border-b border-border pb-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-foreground/20 to-foreground/50" />
                <div>
                  <h4 className="font-bold text-sm leading-none">Harry</h4>
                  <p className="text-[10px] text-muted-foreground mt-1">harry.mofoka@example.com</p>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <Link href="/pages/user-profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 p-2 rounded-xl hover:bg-muted transition-colors">
                  <User className="h-4 w-4" /> Profile & Stats
                </Link>
                <Link href="/dashboard/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 p-2 rounded-xl hover:bg-muted transition-colors">
                  <Shield className="h-4 w-4" /> Account Settings
                </Link>
              </div>
              <div className="border-t border-border pt-2 mt-2">
                <Link href="/auth/auth2/login" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 p-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors text-xs font-semibold">
                  <LogOut className="h-4 w-4" /> Log out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 border-b border-border pb-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input 
                autoFocus 
                type="text" 
                placeholder="Search tasks, habits, notes or AI prompts..." 
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button onClick={() => setSearchOpen(false)} className="p-1 rounded-lg hover:bg-muted cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="py-4 space-y-2 text-xs">
              <div className="text-[10px] font-bold tracking-wider text-muted-foreground px-2">QUICK SUGGESTIONS</div>
              <Link href="/dashboard/tasks" onClick={() => setSearchOpen(false)} className="flex items-center justify-between p-2 rounded-xl hover:bg-muted transition-colors">
                <span>View pending tasks</span>
                <span className="text-[10px] text-muted-foreground">App</span>
              </Link>
              <Link href="/dashboard/habits" onClick={() => setSearchOpen(false)} className="flex items-center justify-between p-2 rounded-xl hover:bg-muted transition-colors">
                <span>Check daily habits streak</span>
                <span className="text-[10px] text-muted-foreground">Habits</span>
              </Link>
              <Link href="/dashboard/focus" onClick={() => setSearchOpen(false)} className="flex items-center justify-between p-2 rounded-xl hover:bg-muted transition-colors">
                <span>Start 25m Pomodoro Focus Timer</span>
                <span className="text-[10px] text-muted-foreground">Tools</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
