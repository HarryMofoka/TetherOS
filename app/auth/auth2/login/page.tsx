"use client";

import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { ArrowRight, Lock, Mail } from "lucide-react";

export default function BoxedLoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl space-y-6 animate-fade-in-up">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Sign in to TetherOS</h1>
          <p className="text-xs text-muted-foreground">Access your daily operating system, habits & AI coach.</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = "/onboarding"; }}>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input 
                type="email" 
                placeholder="harry.mofoka@example.com" 
                defaultValue="harry.mofoka@example.com"
                className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-xs outline-none focus:border-foreground"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-muted-foreground">Password</label>
              <Link href="/auth/auth2/forgot-password" className="text-[10px] font-semibold text-muted-foreground hover:text-foreground">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input 
                type="password" 
                placeholder="••••••••" 
                defaultValue="password123"
                className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-xs outline-none focus:border-foreground"
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full rounded-xl bg-foreground text-background py-3 text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            Sign In to TetherOS <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="text-center text-xs text-muted-foreground pt-2">
          Don&apos;t have an account?{" "}
          <Link href="/auth/auth2/register" className="font-bold text-foreground hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
