"use client";

import Link from "next/link";
import { Plus, Ticket, ArrowUpRight, MessageSquare, CheckCircle2, Clock } from "lucide-react";

export default function TicketsPage() {
  const tickets = [
    { id: "TCK-101", title: "Option to export daily journal entries to PDF", category: "Feature Request", status: "In Progress", date: "Feb 09, 2025" },
    { id: "TCK-102", title: "Habit streak reset offset issue across timezones", category: "Bug Report", status: "Resolved", date: "Feb 05, 2025" },
    { id: "TCK-103", title: "Custom ambient sound file support in Focus Timer", category: "Feature Request", status: "Open", date: "Jan 30, 2025" },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Feedback & Support Tickets</h1>
          <p className="text-xs text-muted-foreground mt-1">Submit bug reports, feature requests, or support inquiries.</p>
        </div>
        <Link href="/apps/tickets/create" className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" /> Create Ticket
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="py-3 px-4 font-semibold">Ticket ID</th>
              <th className="py-3 px-4 font-semibold">Subject</th>
              <th className="py-3 px-4 font-semibold">Category</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {tickets.map(t => (
              <tr key={t.id} className="hover:bg-muted/40 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-foreground">{t.id}</td>
                <td className="py-3 px-4 font-semibold text-foreground">{t.title}</td>
                <td className="py-3 px-4">
                  <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {t.category}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${t.status === "Resolved" ? "bg-foreground text-background" : t.status === "In Progress" ? "bg-muted text-foreground border border-border" : "bg-muted/50 text-muted-foreground"}`}>
                    {t.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
