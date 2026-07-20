import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { MockDataProvider } from "@/components/providers/MockDataProvider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
