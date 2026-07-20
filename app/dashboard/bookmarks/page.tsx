"use client";

import { useState } from "react";
import { Bookmark, Search, Plus, ExternalLink, Globe, Layout, Palette, Code, X } from "lucide-react";

type Folder = "All Bookmarks" | "Design Inspiration" | "Engineering" | "Typography";

interface BookmarkItem {
  id: string;
  title: string;
  domain: string;
  desc: string;
  category: Folder;
  color: string;
}

const initialBookmarks: BookmarkItem[] = [
  {
    id: "1",
    title: "Next.js 15 Documentation",
    domain: "nextjs.org",
    desc: "Official documentation for Next.js App Router, Turbopack, and server actions.",
    category: "Engineering",
    color: "bg-black text-white"
  },
  {
    id: "2",
    title: "Tailwind CSS Colors",
    domain: "tailwindcss.com",
    desc: "Complete color palette reference for Tailwind v4.",
    category: "Design Inspiration",
    color: "bg-cyan-500 text-white"
  },
  {
    id: "3",
    title: "Figma Variables Tutorial",
    domain: "figma.com",
    desc: "How to set up advanced design tokens and variables in Figma.",
    category: "Design Inspiration",
    color: "bg-purple-500 text-white"
  },
  {
    id: "4",
    title: "Vercel Ship 2024 Keynote",
    domain: "youtube.com",
    desc: "Watch the announcements for v0, Next.js, and Vercel infrastructure.",
    category: "Engineering",
    color: "bg-red-500 text-white"
  },
  {
    id: "5",
    title: "Lucide Icons Collection",
    domain: "lucide.dev",
    desc: "Beautiful, consistent, and scalable icon set.",
    category: "Design Inspiration",
    color: "bg-pink-500 text-white"
  },
  {
    id: "6",
    title: "Awwwards Winners",
    domain: "awwwards.com",
    desc: "Gallery of the best web design inspiration and trends.",
    category: "Design Inspiration",
    color: "bg-zinc-800 text-white"
  }
];

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(initialBookmarks);
  const [activeFolder, setActiveFolder] = useState<Folder>("All Bookmarks");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookmarks = bookmarks.filter(b => 
    (activeFolder === "All Bookmarks" || b.category === activeFolder) &&
    (b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAdd = (bookmark: Omit<BookmarkItem, "id" | "color">) => {
    const newItem: BookmarkItem = {
      ...bookmark,
      id: Math.random().toString(),
      color: "bg-foreground text-background"
    };
    setBookmarks([newItem, ...bookmarks]);
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex items-center justify-between px-8 pt-6 pb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bookmark className="h-6 w-6 text-blue-500" /> Bookmarks
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Curated links, articles, and inspiration.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search links..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-card border border-border rounded-full pl-9 pr-4 py-2 text-sm outline-none w-64 focus:border-[color:var(--brand-blue)]/50 transition-colors"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            <Plus className="h-4 w-4" /> Add Link
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Folder Sidebar */}
        <div className="w-64 border-r border-border px-4 py-6 overflow-y-auto shrink-0 hidden lg:block">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-3">Collections</div>
          <div className="space-y-1">
            <FolderItem icon={<Globe className="h-4 w-4" />} label="All Bookmarks" count={bookmarks.length} active={activeFolder === "All Bookmarks"} onClick={() => setActiveFolder("All Bookmarks")} />
            <FolderItem icon={<Layout className="h-4 w-4" />} label="Design Inspiration" count={bookmarks.filter(b=>b.category === "Design Inspiration").length} active={activeFolder === "Design Inspiration"} onClick={() => setActiveFolder("Design Inspiration")} />
            <FolderItem icon={<Code className="h-4 w-4" />} label="Engineering" count={bookmarks.filter(b=>b.category === "Engineering").length} active={activeFolder === "Engineering"} onClick={() => setActiveFolder("Engineering")} />
            <FolderItem icon={<Palette className="h-4 w-4" />} label="Typography" count={bookmarks.filter(b=>b.category === "Typography").length} active={activeFolder === "Typography"} onClick={() => setActiveFolder("Typography")} />
          </div>
        </div>

        {/* Links Grid */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBookmarks.map(b => (
              <BookmarkCard 
                key={b.id}
                title={b.title}
                domain={b.domain}
                desc={b.desc}
                category={b.category}
                color={b.color}
              />
            ))}
          </div>
        </div>
      </div>
      
      {isModalOpen && <NewBookmarkModal onClose={() => setIsModalOpen(false)} onSave={handleAdd} />}
    </div>
  );
}

function FolderItem({ icon, label, count, active, onClick }: { icon: React.ReactNode; label: string; count: number; active?: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex w-full items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors ${active ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-[10px] font-semibold opacity-70">{count}</span>
    </button>
  );
}

function BookmarkCard({ title, domain, desc, category, color }: { title: string; domain: string; desc: string; category: string; color: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden group cursor-pointer hover:shadow-md hover:border-foreground/30 transition-all flex flex-col h-full">
      <div className={`h-24 w-full flex items-center justify-center ${color}`}>
        <Globe className="h-8 w-8 opacity-50" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] uppercase tracking-wider font-bold text-foreground/50">{category}</div>
          <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <h3 className="font-bold text-base mb-1 leading-tight">{title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">{desc}</p>
        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border">
          <div className="h-4 w-4 rounded bg-muted flex items-center justify-center text-[8px] font-bold">W</div>
          <span className="text-[10px] text-muted-foreground font-medium">{domain}</span>
        </div>
      </div>
    </div>
  );
}

function NewBookmarkModal({ onClose, onSave }: { onClose: () => void; onSave: (b: Omit<BookmarkItem, "id" | "color">) => void }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState<Folder>("Design Inspiration");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;
    
    let domain = url;
    try {
      const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
      domain = parsed.hostname.replace("www.", "");
    } catch(e) {}
    
    onSave({ title, domain, desc, category });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Add Bookmark</h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted text-muted-foreground"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">URL</label>
            <input 
              autoFocus
              type="text" 
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground transition-colors" 
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Title</label>
            <input 
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground transition-colors" 
              placeholder="Website Title"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Category</label>
            <select 
              value={category}
              onChange={e => setCategory(e.target.value as Folder)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground transition-colors" 
            >
              <option value="Design Inspiration">Design Inspiration</option>
              <option value="Engineering">Engineering</option>
              <option value="Typography">Typography</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Description</label>
            <textarea 
              value={desc}
              onChange={e => setDesc(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground transition-colors resize-none h-20" 
              placeholder="Optional notes about this link..."
            />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
            <button type="submit" className="rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors">Add Bookmark</button>
          </div>
        </form>
      </div>
    </div>
  );
}
