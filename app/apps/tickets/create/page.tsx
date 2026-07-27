"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

export default function CreateTicketPage() {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Feature Request");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-8 animate-fade-in-up">
      <Link href="/apps/tickets" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Tickets
      </Link>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Submit Feedback or Support Ticket</h1>
        <p className="text-xs text-muted-foreground mt-1">Our engineering team reviews all feature requests and bug reports daily.</p>
      </div>

      {submitted && (
        <div className="p-4 rounded-2xl bg-foreground text-background text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <Check className="h-4 w-4" /> Ticket TCK-104 successfully created!
        </div>
      )}

      <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground">Subject</label>
          <input 
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Brief summary of issue or request..."
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground transition-colors"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground">Category</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground transition-colors"
          >
            <option value="Feature Request">Feature Request</option>
            <option value="Bug Report">Bug Report</option>
            <option value="Account & Billing">Account & Billing</option>
            <option value="General Support">General Support</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground">Description & Steps to Reproduce</label>
          <textarea 
            rows={6}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Provide detailed description or context..."
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground transition-colors"
            required
          />
        </div>

        <button type="submit" className="w-full rounded-xl bg-foreground text-background py-3 text-sm font-bold hover:opacity-90 transition-opacity">
          Submit Support Ticket
        </button>
      </form>
    </div>
  );
}
