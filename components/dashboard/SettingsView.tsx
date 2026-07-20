"use client";

import { useState } from "react";
import { User, Bell, CreditCard, Palette, Shield, Laptop, MonitorSmartphone, CheckCircle2, AlertTriangle, KeyRound, Smartphone, LogOut, Download } from "lucide-react";

type Tab = "Account" | "Appearance" | "Notifications" | "Billing" | "Security" | "Devices";

export function SettingsView() {
  const [activeTab, setActiveTab] = useState<Tab>("Account");

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      {/* Settings Navigation */}
      <div className="w-64 border-r border-border p-4 shrink-0 overflow-y-auto hidden md:block">
        <nav className="space-y-1">
          <SettingsTab icon={<User className="h-4 w-4" />} label="Account" active={activeTab === "Account"} onClick={() => setActiveTab("Account")} />
          <SettingsTab icon={<Palette className="h-4 w-4" />} label="Appearance" active={activeTab === "Appearance"} onClick={() => setActiveTab("Appearance")} />
          <SettingsTab icon={<Bell className="h-4 w-4" />} label="Notifications" active={activeTab === "Notifications"} onClick={() => setActiveTab("Notifications")} />
          <SettingsTab icon={<CreditCard className="h-4 w-4" />} label="Billing" active={activeTab === "Billing"} onClick={() => setActiveTab("Billing")} />
          <SettingsTab icon={<Shield className="h-4 w-4" />} label="Security" active={activeTab === "Security"} onClick={() => setActiveTab("Security")} />
          <SettingsTab icon={<Laptop className="h-4 w-4" />} label="Devices" active={activeTab === "Devices"} onClick={() => setActiveTab("Devices")} />
        </nav>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto p-8 max-w-3xl">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {activeTab === "Account" && <AccountTab />}
          {activeTab === "Appearance" && <AppearanceTab />}
          {activeTab === "Notifications" && <NotificationsTab />}
          {activeTab === "Billing" && <BillingTab />}
          {activeTab === "Security" && <SecurityTab />}
          {activeTab === "Devices" && <DevicesTab />}
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}
    >
      {icon}
      {label}
    </button>
  );
}

// ----------------------------------------------------------------------
// TAB CONTENTS
// ----------------------------------------------------------------------

function AccountTab() {
  return (
    <>
      <section>
        <h3 className="text-lg font-bold mb-4">Public Profile</h3>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-6 mb-6 pb-6 border-b border-border">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-orange-300 to-pink-500 shadow-inner" />
              <button className="absolute -bottom-2 -right-2 bg-foreground text-background text-[10px] font-bold px-2 py-1 rounded-full border-2 border-card hover:opacity-90 transition-opacity">
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

      <section>
        <h3 className="text-lg font-bold mb-4 text-red-500">Danger Zone</h3>
        <div className="border border-red-500/20 bg-red-500/5 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-sm text-red-500 mb-1">Delete Account</h4>
            <p className="text-xs text-red-500/80">Permanently delete your account and all associated data.</p>
          </div>
          <button className="px-4 py-2 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition-colors">
            Delete Account
          </button>
        </div>
      </section>

      <SaveFooter />
    </>
  );
}

function AppearanceTab() {
  return (
    <>
      <section>
        <h3 className="text-lg font-bold mb-4">Theme</h3>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="border-2 border-[color:var(--brand-blue)] rounded-xl p-4 bg-zinc-950 flex flex-col items-center gap-3 cursor-pointer">
              <MonitorSmartphone className="h-8 w-8 text-white" />
              <span className="text-xs font-semibold text-white">System</span>
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

      <section>
        <h3 className="text-lg font-bold mb-4">Accent Color</h3>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex gap-4">
            <ColorDot color="bg-blue-500" active />
            <ColorDot color="bg-purple-500" />
            <ColorDot color="bg-orange-500" />
            <ColorDot color="bg-green-500" />
            <ColorDot color="bg-pink-500" />
            <ColorDot color="bg-zinc-500" />
          </div>
        </div>
      </section>
      <SaveFooter />
    </>
  );
}

function NotificationsTab() {
  return (
    <>
      <section>
        <h3 className="text-lg font-bold mb-4">Email Notifications</h3>
        <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
          <ToggleRow label="Weekly Digest" desc="Receive a weekly summary of your productivity and habits." defaultChecked />
          <ToggleRow label="Product Updates" desc="News, feature releases, and announcements." defaultChecked={false} />
          <ToggleRow label="Tips & Tutorials" desc="Advice on how to get the most out of LifeOS." defaultChecked />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold mb-4">Push Notifications</h3>
        <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
          <ToggleRow label="Focus Session Alerts" desc="Get notified when a Pomodoro session or break ends." defaultChecked />
          <ToggleRow label="Daily Reminders" desc="A gentle nudge to complete your daily habits." defaultChecked />
          <ToggleRow label="Task Deadlines" desc="Alerts for tasks due within 24 hours." defaultChecked />
        </div>
      </section>
    </>
  );
}

function BillingTab() {
  return (
    <>
      <section>
        <h3 className="text-lg font-bold mb-4">Current Plan</h3>
        <div className="bg-card border border-[color:var(--brand-blue)]/50 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[color:var(--brand-blue)]/10 rounded-bl-full" />
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[color:var(--brand-blue)]/10 text-[color:var(--brand-blue)] text-[10px] font-bold uppercase tracking-widest mb-3">
                <CheckCircle2 className="h-3 w-3" /> Active
              </div>
              <h4 className="text-2xl font-bold mb-1">LifeOS Pro</h4>
              <p className="text-sm text-muted-foreground mb-6">Unlimited projects, AI Coach, and priority support.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black">$12</span>
                <span className="text-sm text-muted-foreground font-medium">/ month</span>
              </div>
            </div>
            <button className="px-4 py-2 bg-foreground text-background text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">
              Manage Plan
            </button>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold mb-4">Payment Method</h3>
        <div className="bg-card border border-border rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-10 w-16 bg-muted rounded-md flex items-center justify-center font-bold text-xs border border-border">
              VISA
            </div>
            <div>
              <div className="font-semibold text-sm">Visa ending in 4242</div>
              <div className="text-xs text-muted-foreground">Expires 12/2026</div>
            </div>
          </div>
          <button className="text-xs font-semibold hover:text-[color:var(--brand-blue)] transition-colors">Edit</button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold mb-4">Billing History</h3>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="divide-y divide-border">
            <InvoiceRow date="Feb 01, 2025" amount="$12.00" status="Paid" />
            <InvoiceRow date="Jan 01, 2025" amount="$12.00" status="Paid" />
            <InvoiceRow date="Dec 01, 2024" amount="$12.00" status="Paid" />
          </div>
        </div>
      </section>
    </>
  );
}

function SecurityTab() {
  return (
    <>
      <section>
        <h3 className="text-lg font-bold mb-4">Password</h3>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="space-y-4 max-w-sm">
            <div className="grid gap-2">
              <label className="text-xs font-semibold">Current Password</label>
              <input type="password" placeholder="••••••••" className="bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-[color:var(--brand-blue)]/50" />
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-semibold">New Password</label>
              <input type="password" placeholder="••••••••" className="bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-[color:var(--brand-blue)]/50" />
            </div>
            <button className="mt-2 px-4 py-2 bg-foreground text-background text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">
              Update Password
            </button>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold mb-4">Two-Factor Authentication</h3>
        <div className="bg-card border border-border rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-[color:var(--brand-blue)]/10 rounded-full flex items-center justify-center text-[color:var(--brand-blue)]">
              <KeyRound className="h-6 w-6" />
            </div>
            <div>
              <div className="font-semibold text-sm mb-1">Authenticator App</div>
              <div className="text-xs text-muted-foreground">Add an extra layer of security to your account.</div>
            </div>
          </div>
          <button className="px-4 py-2 bg-foreground text-background text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">
            Enable 2FA
          </button>
        </div>
      </section>
    </>
  );
}

function DevicesTab() {
  return (
    <section>
      <h3 className="text-lg font-bold mb-4">Logged In Devices</h3>
      <p className="text-xs text-muted-foreground mb-6">These devices are currently signed in to your account. Revoke access if you don't recognize them.</p>
      
      <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
        <DeviceRow 
          icon={<Laptop className="h-5 w-5" />}
          name="MacBook Pro 16&quot;"
          location="San Francisco, CA"
          time="Active now"
          current
        />
        <DeviceRow 
          icon={<Smartphone className="h-5 w-5" />}
          name="iPhone 14 Pro"
          location="San Francisco, CA"
          time="Last active 2 hours ago"
        />
        <DeviceRow 
          icon={<Laptop className="h-5 w-5" />}
          name="Chrome on Windows"
          location="New York, NY"
          time="Last active 3 days ago"
        />
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// HELPER COMPONENTS
// ----------------------------------------------------------------------

function SaveFooter() {
  return (
    <div className="flex justify-end gap-3 pt-6 border-t border-border">
      <button className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
      <button className="px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity">Save Changes</button>
    </div>
  );
}

function ColorDot({ color, active }: { color: string; active?: boolean }) {
  return (
    <div className={`h-8 w-8 rounded-full ${color} cursor-pointer flex items-center justify-center transition-transform hover:scale-110 ${active ? "ring-2 ring-foreground ring-offset-2 ring-offset-background" : ""}`}>
      {active && <CheckCircle2 className="h-4 w-4 text-white" />}
    </div>
  );
}

function ToggleRow({ label, desc, defaultChecked }: { label: string; desc: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between cursor-pointer" onClick={() => setChecked(!checked)}>
      <div>
        <div className="font-semibold text-sm mb-0.5">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <div className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${checked ? "bg-[color:var(--brand-blue)]" : "bg-muted"}`}>
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? "translate-x-4" : "translate-x-0"}`} />
      </div>
    </div>
  );
}

function InvoiceRow({ date, amount, status }: { date: string; amount: string; status: string }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-6">
        <div className="text-sm font-semibold w-24">{date}</div>
        <div className="text-sm font-medium">{amount}</div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">{status}</div>
      </div>
      <button className="p-1.5 hover:bg-muted rounded-md text-muted-foreground"><Download className="h-4 w-4" /></button>
    </div>
  );
}

function DeviceRow({ icon, name, location, time, current }: { icon: React.ReactNode; name: string; location: string; time: string; current?: boolean }) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 bg-muted rounded-xl flex items-center justify-center text-foreground">
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="font-semibold text-sm">{name}</div>
            {current && <span className="text-[9px] font-bold uppercase tracking-wider text-[color:var(--brand-blue)] bg-[color:var(--brand-blue)]/10 px-1.5 py-0.5 rounded-sm">Current</span>}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">{location} • {time}</div>
        </div>
      </div>
      {!current && (
        <button className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
          <LogOut className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function SunIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
}
function Moon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
}
