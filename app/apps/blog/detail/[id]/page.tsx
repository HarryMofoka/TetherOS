"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, User, Share2 } from "lucide-react";

export default function BlogDetailPage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <Link href="/apps/blog/post" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Guides & Insights
      </Link>

      <div className="space-y-4">
        <span className="rounded-md bg-muted px-3 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
          Productivity Framework
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Mastering Time Blocking with TetherOS</h1>
        <div className="flex items-center gap-4 text-xs text-muted-foreground border-b border-border pb-6">
          <span>By Harry Mofoka</span>
          <span>•</span>
          <span>Feb 10, 2025</span>
          <span>•</span>
          <span>5 min read</span>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none text-sm text-foreground/90 space-y-4 leading-relaxed">
        <p>
          Time blocking is one of the most effective methods to maintain deep focus in an era of constant notifications and context switching. By assigning specific hours to distinct categories—such as Deep Work, Administration, and Personal Recovery—you eliminate decision fatigue throughout your workday.
        </p>

        <h3 className="text-base font-bold text-foreground pt-4">1. Define Your Deep Work Windows</h3>
        <p>
          Identify the hours during which your mental energy peaks (e.g. 8:00 AM to 11:30 AM). Schedule your highest priority tasks into these blocks and enable TetherOS Focus Mode.
        </p>

        <h3 className="text-base font-bold text-foreground pt-4">2. Combine Tasks with Habits</h3>
        <p>
          Pair habit check-ins immediately after deep work sessions to reward momentum. For instance, after finishing a 90-minute coding sprint, log your daily hydration or brief meditation habit.
        </p>
      </div>
    </div>
  );
}
