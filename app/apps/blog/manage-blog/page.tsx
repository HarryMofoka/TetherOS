"use client";

import Link from "next/link";
import { Plus, Edit, Trash2, ArrowUpRight } from "lucide-react";

export default function ManageBlogPage() {
  const articles = [
    { id: "1", title: "Mastering Time Blocking with TetherOS", category: "Productivity", date: "Feb 10, 2025", status: "Published" },
    { id: "2", title: "Building Habit Streaks That Actually Stick", category: "Habits", date: "Feb 04, 2025", status: "Published" },
    { id: "3", title: "How to Conduct a Powerful Daily Reflection", category: "Mindfulness", date: "Jan 28, 2025", status: "Draft" },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Content Management Table</h1>
          <p className="text-xs text-muted-foreground mt-1">Manage published guides and draft productivity articles.</p>
        </div>
        <Link href="/apps/blog/create" className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" /> Create Guide
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="py-3 px-4 font-semibold">Title</th>
              <th className="py-3 px-4 font-semibold">Category</th>
              <th className="py-3 px-4 font-semibold">Date</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {articles.map(a => (
              <tr key={a.id} className="hover:bg-muted/40 transition-colors">
                <td className="py-3 px-4 font-bold text-foreground">{a.title}</td>
                <td className="py-3 px-4">
                  <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    {a.category}
                  </span>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{a.date}</td>
                <td className="py-3 px-4">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${a.status === "Published" ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>
                    {a.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  <Link href="/apps/blog/edit" className="inline-flex items-center p-1.5 rounded-lg border border-border hover:bg-muted transition-colors" title="Edit Article">
                    <Edit className="h-3.5 w-3.5" />
                  </Link>
                  <button className="inline-flex items-center p-1.5 rounded-lg border border-border text-red-500 hover:bg-red-500/10 transition-colors" title="Delete">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
