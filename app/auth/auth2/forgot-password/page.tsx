"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { ArrowLeft, Mail, Check } from "lucide-react";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl space-y-6 animate-fade-in-up">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Forgot Password</h1>
          <p className="text-xs text-muted-foreground">Enter your email to receive a password reset link.</p>
        </div>

        {sent ? (
          <div className="p-4 rounded-2xl bg-foreground text-background text-xs font-bold text-center space-y-2">
            <Check className="h-5 w-5 mx-auto" />
            <p>Password reset link sent to your email!</p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
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

            <button type="submit" className="w-full rounded-xl bg-foreground text-background py-3 text-xs font-bold hover:opacity-90 transition-opacity">
              Send Reset Link
            </button>
          </form>
        )}

        <div className="text-center text-xs">
          <Link href="/auth/auth2/login" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
