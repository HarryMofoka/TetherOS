import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Log in — LifeOS",
  description: "Log in to your LifeOS account.",
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-2">Enter your details to access your account.</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">Password</label>
              <a href="#" className="text-xs text-[color:var(--brand-blue)] hover:underline">Forgot password?</a>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
            />
          </div>
          <Link href="/dashboard" className="mt-2 w-full inline-flex justify-center items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-opacity">
            Log in <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-border"></div>
          <span className="px-3 text-xs text-muted-foreground uppercase tracking-wider font-semibold">Or continue with</span>
          <div className="h-px flex-1 bg-border"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
            <svg viewBox="0 0 24 24" className="h-4 w-4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
            Google
          </button>
          <button className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.126 3.805 3.064 1.519-.062 2.106-.987 3.937-.987 1.83 0 2.37.95 3.96.987 1.636.037 2.65-1.488 3.633-2.946 1.144-1.673 1.616-3.298 1.636-3.376-.037-.013-3.167-1.21-3.193-4.845-.02-3.04 2.483-4.516 2.597-4.588-1.425-2.083-3.633-2.366-4.42-2.42-2.105-.13-4.143 1.326-4.553 1.326zm.948-4.706c.866-1.04 1.454-2.484 1.295-3.924-1.22.048-2.736.81-3.633 1.848-.795.918-1.5 2.39-1.31 3.806 1.365.105 2.784-.687 3.648-1.73z"/></svg>
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
