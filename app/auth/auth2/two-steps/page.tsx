"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function TwoStepsPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleInput = (index: number, val: string) => {
    if (val.length > 1) return;
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl space-y-6 animate-fade-in-up text-center">
        <div className="flex justify-center mb-2">
          <Logo />
        </div>
        
        <div className="space-y-1">
          <ShieldCheck className="h-10 w-10 mx-auto text-foreground" />
          <h1 className="text-2xl font-bold tracking-tight">Two-Step Verification</h1>
          <p className="text-xs text-muted-foreground">We sent a 6-digit code to your registered device.</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); window.location.href = "/dashboard"; }} className="space-y-6">
          <div className="flex justify-center gap-2">
            {code.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInput(i, e.target.value)}
                className="h-12 w-12 text-center text-lg font-bold rounded-xl border border-border bg-background outline-none focus:border-foreground"
              />
            ))}
          </div>

          <button type="submit" className="w-full rounded-xl bg-foreground text-background py-3 text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            Verify Code <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="text-xs text-muted-foreground">
          Didn&apos;t receive code?{" "}
          <button className="font-bold text-foreground hover:underline">Resend Code</button>
        </div>
      </div>
    </div>
  );
}
