import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTABanner({
  title,
  description,
  primary = "Get Started Free",
  secondary,
}: {
  title: string;
  description: string;
  primary?: string;
  secondary?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="rounded-2xl border border-border bg-card px-8 py-8 md:flex md:items-center md:justify-between">
        <div className="max-w-md">
          <h3 className="text-xl font-bold leading-tight">{title}</h3>
        </div>
        <p className="mt-3 max-w-sm text-sm text-muted-foreground md:mt-0">{description}</p>
        <div className="mt-5 flex flex-wrap gap-3 md:mt-0">
          <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90">
            {primary} <ArrowRight className="h-4 w-4" />
          </Link>
          {secondary && (
            <Link href="/features" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-muted">
              {secondary} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
