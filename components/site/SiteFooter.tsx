import { Logo } from "./Logo";
import { Globe, AtSign, Link2 } from "lucide-react";

const cols = [
  { title: "Product", links: ["Features", "How it Works", "Pricing", "Updates"] },
  { title: "Company", links: ["About Us", "Blog", "Careers", "Contact"] },
  { title: "Resources", links: ["Help Center", "Guides", "Templates", "API"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Your life. Organized.<br />Powered by AI.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="mb-4 text-sm font-semibold">{c.title}</h4>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex items-center justify-between border-t border-border/60 pt-6">
          <p className="text-xs text-muted-foreground">(c) 2025 TetherOS. All rights reserved.</p>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a href="#" aria-label="Twitter"><Globe className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram"><AtSign className="h-4 w-4" /></a>
            <a href="#" aria-label="LinkedIn"><Link2 className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
