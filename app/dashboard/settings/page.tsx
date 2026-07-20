import type { Metadata } from "next";
import { SettingsView } from "@/components/dashboard/SettingsView";

export const metadata: Metadata = {
  title: "Settings — LifeOS",
  description: "Manage your preferences.",
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-8 pt-6 pb-6 border-b border-border shrink-0">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-xs text-muted-foreground mt-1">Manage your account and preferences.</p>
      </div>

      <SettingsView />
    </div>
  );
}
