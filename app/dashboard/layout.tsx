"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { MockDataProvider } from "@/components/providers/MockDataProvider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onboarded = localStorage.getItem("tetheros_onboarded");
    if (!onboarded) {
      router.replace("/onboarding");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) {
    return <div className="h-screen w-full bg-background" />;
  }

  return (
    <MockDataProvider>
      <div className="flex h-screen bg-background overflow-hidden flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </MockDataProvider>
  );
}
