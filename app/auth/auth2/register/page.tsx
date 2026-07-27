"use client";

import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { ArrowRight, Lock, Mail, User } from "lucide-react";

export default function BoxedRegisterPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl space-y-6 animate-fade-in-up">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Create TetherOS Account</h1>
          <p className="text-xs text-muted-foreground">Start organizing your tasks, habits & focus today.</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = "/dashboard"; }}>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Harry Mofoka" 
                className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-xs outline-none focus:border-foreground"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input 
                type="email" 
                placeholder="harry.mofoka@example.com" 
                className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-xs outline-none focus:border-foreground"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input 
                type="password" 
                placeholder="Create password" 
                className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-xs outline-none focus:border-foreground"
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full rounded-xl bg-foreground text-background py-3 text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            Create Account <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="text-center text-xs text-muted-foreground pt-2">
          Already have an account?{" "}
          <Link href="/auth/auth2/login" className="font-bold text-foreground hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
