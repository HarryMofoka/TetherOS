import type { ReactNode } from "react";

export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto w-[280px] rounded-[42px] border-[6px] border-foreground bg-foreground p-1 shadow-2xl ${className}`}>
      <div className="relative overflow-hidden rounded-[36px] bg-background">
        <div className="relative flex h-6 items-center justify-between bg-background px-6 pt-2 text-[10px] font-semibold">
          <span>9:41</span>
          <div className="absolute left-1/2 top-1 h-4 w-20 -translate-x-1/2 rounded-full bg-foreground" />
          <span>••• 📶 🔋</span>
        </div>
        {children}
      </div>
    </div>
  );
}
