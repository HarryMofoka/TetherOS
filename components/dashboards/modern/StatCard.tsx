"use client";

import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: string;
  badge: string;
  subtitle: string;
  icon: LucideIcon;
  href: string;
}

export function StatCard({ title, value, badge, subtitle, icon: Icon, href }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between interactive-card">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground font-medium">{title}</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black">{value}</span>
            <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] font-bold text-foreground">{badge}</span>
          </div>
        </div>
        <div className="rounded-lg border border-border p-2.5 bg-background">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground">{subtitle}</span>
        <Link href={href} className="text-xs font-bold hover:underline inline-flex items-center gap-1">
          View <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
