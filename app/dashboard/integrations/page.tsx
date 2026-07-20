import type { Metadata } from "next";
import { Plug, Settings, Calendar as CalIcon, MessageSquare, Music, FileText, Grid, Database, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Integrations â€” TetherOS",
  description: "Connect your apps.",
};

export default function IntegrationsPage() {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="flex items-center justify-between px-8 pt-6 pb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Plug className="h-6 w-6 text-pink-500" /> Integrations
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Connect your favorite tools to sync data automatically.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium hover:bg-muted transition-colors">
          <Settings className="h-4 w-4" /> Manage API Keys
        </button>
      </div>

      <div className="px-8 pb-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <IntegrationCard 
            name="Google Calendar" 
            desc="Two-way sync for all your events and meetings."
            icon={<CalIcon className="h-6 w-6 text-blue-500" />}
            status="connected"
          />
          <IntegrationCard 
            name="Notion" 
            desc="Import notes, tasks, and project databases."
            icon={<FileText className="h-6 w-6 text-foreground" />}
            status="connected"
          />
          <IntegrationCard 
            name="Slack" 
            desc="Send Focus Timer statuses to your workspace."
            icon={<MessageSquare className="h-6 w-6 text-purple-500" />}
            status="disconnected"
          />
          <IntegrationCard 
            name="Spotify" 
            desc="Control your ambient and deep work playlists directly."
            icon={<Music className="h-6 w-6 text-green-500" />}
            status="connected"
          />
          <IntegrationCard 
            name="Linear" 
            desc="Sync your engineering tickets and sprints."
            icon={<Grid className="h-6 w-6 text-indigo-500" />}
            status="disconnected"
          />
          <IntegrationCard 
            name="GitHub" 
            desc="Track pull requests and commit activity."
            icon={<Database className="h-6 w-6 text-foreground" />}
            status="disconnected"
          />
        </div>
      </div>
    </div>
  );
}

function IntegrationCard({ name, desc, icon, status }: { name: string; desc: string; icon: React.ReactNode; status: "connected" | "disconnected" }) {
  const isConnected = status === "connected";
  
  return (
    <div className={`rounded-2xl border bg-card p-6 transition-all flex flex-col ${isConnected ? "border-[color:var(--brand-blue)]/50 shadow-sm" : "border-border"}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="h-12 w-12 rounded-xl bg-muted/50 flex items-center justify-center border border-border">
          {icon}
        </div>
        <div className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ${isConnected ? "bg-[color:var(--brand-blue)]" : "bg-muted"}`}>
          <span className="sr-only">Use setting</span>
          <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${isConnected ? "translate-x-4" : "translate-x-0"}`} />
        </div>
      </div>
      
      <h3 className="text-base font-bold mb-1">{name}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed mb-6 flex-1">{desc}</p>
      
      <div className="pt-4 border-t border-border flex items-center justify-between">
        {isConnected ? (
          <>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-500 uppercase tracking-wider">
              <Check className="h-3 w-3" /> Connected
            </div>
            <button className="text-[10px] font-semibold text-muted-foreground hover:text-foreground">Configure</button>
          </>
        ) : (
          <button className="w-full text-xs font-semibold bg-foreground text-background py-2 rounded-lg hover:opacity-90 transition-opacity">
            Connect
          </button>
        )}
      </div>
    </div>
  );
}
