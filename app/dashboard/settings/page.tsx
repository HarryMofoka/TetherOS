import type { Metadata } from "next";
import { User, Bell, CreditCard, Palette, Shield, Laptop, MonitorSmartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Settings — LifeOS",
  description: "Manage your preferences.",
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-8 pt-6 pb-6 border-b border-border">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-xs text-muted-foreground mt-1">Manage your account and preferences.</p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Settings Navigation */}
        <div className="w-64 border-r border-border p-4 shrink-0 overflow-y-auto hidden md:block">
          <nav className="space-y-1">
            <SettingsTab icon={<User className="h-4 w-4" />} label="Account" active />
            <SettingsTab icon={<Palette className="h-4 w-4" />} label="Appearance" />
            <SettingsTab icon={<Bell className="h-4 w-4" />} label="Notifications" />
            <SettingsTab icon={<CreditCard className="h-4 w-4" />} label="Billing" />
            <SettingsTab icon={<Shield className="h-4 w-4" />} label="Security" />
            <SettingsTab icon={<Laptop className="h-4 w-4" />} label="Devices" />
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto p-8 max-w-3xl">
          
          <div className="space-y-8">
            {/* Profile Section */}
            <section>
              <h3 className="text-lg font-bold mb-4">Public Profile</h3>
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-6 mb-6 pb-6 border-b border-border">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-orange-300 to-pink-500 shadow-inner" />
                    <button className="absolute -bottom-2 -right-2 bg-foreground text-background text-[10px] font-bold px-2 py-1 rounded-full border-2 border-card">
                      Edit
                    </button>
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-1">Avatar</div>
                    <div className="text-xs text-muted-foreground max-w-[200px]">
                      JPG, GIF or PNG. 1MB max.
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <label className="text-xs font-semibold">Display Name</label>
                    <input type="text" defaultValue="Harry Mofoka" className="bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-[color:var(--brand-blue)]/50" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-xs font-semibold">Job Title</label>
                    <input type="text" defaultValue="Software Engineer" className="bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-[color:var(--brand-blue)]/50" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-xs font-semibold">Bio</label>
                    <textarea defaultValue="Building cool things on the internet." className="bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-[color:var(--brand-blue)]/50 resize-none h-24" />
                  </div>
                </div>
              </div>
            </section>

            {/* Theme Section */}
            <section>
              <h3 className="text-lg font-bold mb-4">Appearance</h3>
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="border-2 border-[color:var(--brand-blue)] rounded-xl p-4 bg-zinc-950 flex flex-col items-center gap-3 cursor-pointer">
                    <MonitorSmartphone className="h-8 w-8 text-white" />
                    <span className="text-xs font-semibold text-white">System (Dark)</span>
                  </div>
                  <div className="border border-border rounded-xl p-4 bg-white flex flex-col items-center gap-3 cursor-pointer hover:border-muted-foreground/30">
                    <SunIcon className="h-8 w-8 text-black" />
                    <span className="text-xs font-semibold text-black">Light</span>
                  </div>
                  <div className="border border-border rounded-xl p-4 bg-zinc-950 flex flex-col items-center gap-3 cursor-pointer hover:border-muted-foreground/30">
                    <Moon className="h-8 w-8 text-white" />
                    <span className="text-xs font-semibold text-white">Dark</span>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex justify-end gap-3 pt-6 border-t border-border">
              <button className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
              <button className="px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity">Save Changes</button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button className={`flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}>
      {icon}
      {label}
    </button>
  );
}

// Inline simple icons since lucide doesn't have a direct SunIcon/Moon combo matching my exact names without aliasing.
function SunIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
}
function Moon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
}
