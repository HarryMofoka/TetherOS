"use client";

import Link from "next/link";
import { BookOpen, Plus, ArrowRight, Clock, Tag } from "lucide-react";

export default function BlogListingPage() {
  const posts = [
    { id: "1", title: "Mastering Time Blocking with TetherOS", excerpt: "Learn how to structure your daily calendar into high-impact focus blocks without burning out.", author: "Harry Mofoka", date: "Feb 10, 2025", tag: "Productivity" },
    { id: "2", title: "Building Habit Streaks That Actually Stick", excerpt: "Behavioral science strategies to maintain momentum and recover quickly when you miss a day.", author: "AI Productivity Team", date: "Feb 04, 2025", tag: "Habits" },
    { id: "3", title: "How to Conduct a Powerful Daily Reflection", excerpt: "Using AI-guided prompt structures to reflect on wins, lessons, and evening gratitude.", author: "TetherOS Team", date: "Jan 28, 2025", tag: "Mindfulness" },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Productivity Insights & Guides</h1>
          <p className="text-xs text-muted-foreground mt-1">Articles, frameworks, and guides on life operating systems.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/apps/blog/create" className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" /> Create Guide
          </Link>
          <Link href="/apps/blog/manage-blog" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-bold hover:bg-muted transition-colors">
            Manage Content
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <div key={p.id} className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between interactive-card space-y-4">
            <div className="space-y-3">
              <span className="rounded-md bg-muted px-2.5 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                {p.tag}
              </span>
              <h2 className="text-base font-bold leading-snug">{p.title}</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.excerpt}</p>
            </div>
            <div className="pt-4 border-t border-border/60 flex items-center justify-between">
              <div className="text-[10px] text-muted-foreground">
                By {p.author} • {p.date}
              </div>
              <Link href={`/apps/blog/detail/${p.id}`} className="text-xs font-bold hover:underline inline-flex items-center gap-1">
                Read <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
