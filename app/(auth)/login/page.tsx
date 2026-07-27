import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Log in - TetherOS",
  description: "Log in to your TetherOS account.",
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-md animate-fade-in-up">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-2">Enter your details to access your account.</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              defaultValue="harry.mofoka@example.com"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Password</label>
              <Link href="/auth/auth2/forgot-password" className="text-xs text-muted-foreground hover:underline">Forgot password?</Link>
            </div>
            <input 
              type="password" 
              placeholder="********" 
              defaultValue="password123"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
            />
          </div>
          <Link href="/onboarding" className="mt-2 w-full inline-flex justify-center items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-bold text-background hover:opacity-90 transition-opacity">
            Log in to TetherOS <ArrowRight className="h-4 w-4" />
          </Link>
        </form>

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-border"></div>
          <span className="px-3 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Or continue with</span>
          <div className="h-px flex-1 bg-border"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-xs font-semibold hover:bg-muted transition-colors">
            Google
          </button>
          <button className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-xs font-semibold hover:bg-muted transition-colors">
            Apple
          </button>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Don&apos;t have an account? <Link href="/signup" className="text-foreground font-semibold hover:underline">Sign up</Link>
      </p>
    </div>
  );
}
