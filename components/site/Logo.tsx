export function Logo({ className = "", iconOnly = false }: { className?: string, iconOnly?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-foreground text-background">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="5" y="3" width="5" height="18" rx="1.5" fill="currentColor" />
          <rect x="14" y="3" width="5" height="18" rx="1.5" fill="currentColor" />
        </svg>
      </div>
      {!iconOnly && <span className="text-xl font-bold tracking-tight">TetherOS</span>}
    </div>
  );
}
