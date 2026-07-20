import type { Metadata } from "next";
import { Bookmark, Search, Plus, ExternalLink, Globe, Layout, Palette, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "Bookmarks — LifeOS",
  description: "Saved links and resources.",
};

export default function BookmarksPage() {
  return (
    <div className="flex flex-col h-full">
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
              className="bg-card border border-border rounded-full pl-9 pr-4 py-2 text-sm outline-none w-64 focus:border-[color:var(--brand-blue)]/50 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium">
            <Plus className="h-4 w-4" /> Add Link
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Folder Sidebar */}
        <div className="w-64 border-r border-border px-4 py-6 overflow-y-auto shrink-0 hidden lg:block">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-3">Collections</div>
          <div className="space-y-1">
            <FolderItem icon={<Globe className="h-4 w-4" />} label="All Bookmarks" count={124} active />
            <FolderItem icon={<Layout className="h-4 w-4" />} label="Design Inspiration" count={42} />
            <FolderItem icon={<Code className="h-4 w-4" />} label="Engineering" count={56} />
            <FolderItem icon={<Palette className="h-4 w-4" />} label="Typography" count={18} />
          </div>
        </div>

        {/* Links Grid */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <BookmarkCard 
              title="Next.js 15 Documentation"
              domain="nextjs.org"
              desc="Official documentation for Next.js App Router, Turbopack, and server actions."
              category="Engineering"
              color="bg-black text-white"
            />
            <BookmarkCard 
              title="Tailwind CSS Colors"
              domain="tailwindcss.com"
              desc="Complete color palette reference for Tailwind v4."
              category="Design Inspiration"
              color="bg-cyan-500 text-white"
            />
            <BookmarkCard 
              title="Figma Variables Tutorial"
              domain="figma.com"
              desc="How to set up advanced design tokens and variables in Figma."
              category="Design Inspiration"
              color="bg-purple-500 text-white"
            />
            <BookmarkCard 
              title="Vercel Ship 2024 Keynote"
              domain="youtube.com"
              desc="Watch the announcements for v0, Next.js, and Vercel infrastructure."
              category="Engineering"
              color="bg-red-500 text-white"
            />
            <BookmarkCard 
              title="Lucide Icons Collection"
              domain="lucide.dev"
              desc="Beautiful, consistent, and scalable icon set."
              category="Design Inspiration"
              color="bg-pink-500 text-white"
            />
            <BookmarkCard 
              title="Awwwards Winners"
              domain="awwwards.com"
              desc="Gallery of the best web design inspiration and trends."
              category="Design Inspiration"
              color="bg-zinc-800 text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FolderItem({ icon, label, count, active }: { icon: React.ReactNode; label: string; count: number; active?: boolean }) {
  return (
    <button className={`flex w-full items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors ${active ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
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
    <div className="rounded-2xl border border-border bg-card overflow-hidden group cursor-pointer hover:shadow-md hover:border-muted-foreground/30 transition-all flex flex-col h-full">
      <div className={`h-24 w-full flex items-center justify-center ${color}`}>
        <Globe className="h-8 w-8 opacity-50" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] uppercase tracking-wider font-bold text-[color:var(--brand-blue)]">{category}</div>
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
