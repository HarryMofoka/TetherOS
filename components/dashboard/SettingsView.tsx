"use client";

import { useState, useEffect } from "react";
import { User, Bell, CreditCard, Palette, Shield, Laptop, MonitorSmartphone, CheckCircle2, Bot, Key, Sparkles, LogOut, Download } from "lucide-react";

type Tab = "Account" | "AI & API Keys" | "Appearance" | "Notifications" | "Billing" | "Security" | "Devices";

export function SettingsView() {
  const [activeTab, setActiveTab] = useState<Tab>("Account");

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      {/* Settings Navigation */}
      <div className="w-64 border-r border-border p-4 shrink-0 overflow-y-auto hidden md:block">
        <nav className="space-y-1">
          <SettingsTab icon={<User className="h-4 w-4" />} label="Account" active={activeTab === "Account"} onClick={() => setActiveTab("Account")} />
          <SettingsTab icon={<Bot className="h-4 w-4" />} label="AI & API Keys" active={activeTab === "AI & API Keys"} onClick={() => setActiveTab("AI & API Keys")} />
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
          {activeTab === "AI & API Keys" && <AIApiKeysTab />}
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
      className={`flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${active ? "bg-muted text-foreground font-bold" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}
    >
      {icon}
      {label}
    </button>
  );
}

// ----------------------------------------------------------------------
// TAB CONTENTS
// ----------------------------------------------------------------------

function AIApiKeysTab() {
  const [provider, setProvider] = useState("openai");
  const [apiKey, setApiKey] = useState("");
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    const storedProvider = localStorage.getItem("tetheros_ai_provider") || "openai";
    const storedKey = localStorage.getItem("tetheros_user_ai_key") || "";
    setProvider(storedProvider);
    setApiKey(storedKey);
  }, []);

  const handleSave = () => {
    localStorage.setItem("tetheros_ai_provider", provider);
    localStorage.setItem("tetheros_user_ai_key", apiKey);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 3000);
  };

  return (
    <>
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold">Custom AI Engine & API Key</h3>
            <p className="text-xs text-muted-foreground">Load your own API key to power your TetherOS AI Coach, task breakdown, and daily plan synthesis.</p>
          </div>
          <span className="rounded-full bg-foreground/10 px-3 py-1 text-xs font-bold text-foreground flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> AI Engine Ready
          </span>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider">Select AI Provider</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "openai", name: "OpenAI (GPT-4o)", desc: "Requires sk-..." },
                { id: "gemini", name: "Google Gemini", desc: "Requires AIzaSy..." },
                { id: "tetheros", name: "TetherOS Built-in", desc: "System default" }
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setProvider(p.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    provider === p.id 
                      ? "border-foreground bg-foreground/5 font-bold" 
                      : "border-border bg-background hover:border-foreground/30"
                  }`}
                >
                  <div className="text-xs font-bold">{p.name}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {provider !== "tetheros" && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center justify-between">
                <span>{provider === "openai" ? "OpenAI API Key" : "Google Gemini API Key"}</span>
                <span className="text-[10px] text-muted-foreground font-normal">Stored locally in client browser</span>
              </label>
              <div className="relative">
                <Key className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  placeholder={provider === "openai" ? "sk-proj-..." : "AIzaSy..."}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-xs font-mono outline-none focus:border-foreground"
                />
              </div>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between">
            {savedStatus ? (
              <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> API Key & Preference Saved Successfully!
              </span>
            ) : (
              <span className="text-[10px] text-muted-foreground">Your custom key will be used for all AI calls across TetherOS.</span>
            )}
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
            >
              Save Key & Preferences
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function AccountTab() {
  return (
    <>
      <section>
        <h3 className="text-lg font-bold mb-4">Public Profile</h3>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-6 mb-6 pb-6 border-b border-border">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-neutral-300 to-neutral-700 shadow-inner flex items-center justify-center font-bold text-xl text-white">
                HM
              </div>
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
              <input type="text" defaultValue="Harry Mofoka" className="bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-foreground" />
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-semibold">Job Title</label>
              <input type="text" defaultValue="Product & Software Creator" className="bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-foreground" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function AppearanceTab() {
  return (
    <section>
      <h3 className="text-lg font-bold mb-4">Theme</h3>
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="border-2 border-foreground rounded-xl p-4 bg-background flex flex-col items-center gap-3 cursor-pointer">
            <MonitorSmartphone className="h-8 w-8 text-foreground" />
            <span className="text-xs font-semibold">Monochrome System</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function NotificationsTab() {
  return (
    <section>
      <h3 className="text-lg font-bold mb-4">Notifications</h3>
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-bold">AI Habit Nudges</div>
            <div className="text-xs text-muted-foreground">Receive daily AI recommendations for habit streaks.</div>
          </div>
          <div className="h-5 w-9 rounded-full bg-foreground p-0.5">
            <div className="h-4 w-4 rounded-full bg-background translate-x-4 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  );
}

function BillingTab() {
  return (
    <section>
      <h3 className="text-lg font-bold mb-4">Current Plan</h3>
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-foreground/10 text-foreground text-[10px] font-bold uppercase tracking-widest mb-2">
              <CheckCircle2 className="h-3 w-3" /> Active Beta
            </div>
            <h4 className="text-2xl font-bold">TetherOS Enterprise Pro</h4>
          </div>
        </div>
      </div>
    </section>
  );
}

function SecurityTab() {
  return (
    <section>
      <h3 className="text-lg font-bold mb-4">Security</h3>
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <div className="text-sm font-bold">Password & 2FA</div>
        <p className="text-xs text-muted-foreground">Two-factor authentication is active on your TetherOS account.</p>
      </div>
    </section>
  );
}

function DevicesTab() {
  return (
    <section>
      <h3 className="text-lg font-bold mb-4">Devices</h3>
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="text-xs text-muted-foreground">MacBook Pro 16&quot; • Active now</div>
      </div>
    </section>
  );
}
