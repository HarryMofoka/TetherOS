"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Productivity");
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-8 animate-fade-in-up">
      <Link href="/apps/blog/post" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Articles
      </Link>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create Productivity Guide</h1>
        <p className="text-xs text-muted-foreground mt-1">Publish framework articles and insights for the TetherOS community.</p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-foreground text-background text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <Check className="h-4 w-4" /> Guide successfully created!
        </div>
      )}

      <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground">Article Title</label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. The 2-Minute Rule for Daily Habits"
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
            <option value="Productivity">Productivity</option>
            <option value="Habits">Habits</option>
            <option value="Mindfulness">Mindfulness</option>
            <option value="AI Workflows">AI Workflows</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground">Article Body</label>
          <textarea 
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your article content here in markdown format..."
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground transition-colors"
            required
          />
        </div>

        <button type="submit" className="w-full rounded-xl bg-foreground text-background py-3 text-sm font-bold hover:opacity-90 transition-opacity">
          Publish Article
        </button>
      </form>
    </div>
  );
}
