import type { Metadata } from "next";
import { MessageSquare, ArrowUp, Clock, Calendar as CalIcon, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Coach â€” TetherOS",
  description: "Personalized guidance and insights.",
};

export default function CoachPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <div className="px-8 pt-6 pb-4 shrink-0">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-purple-500" /> AI Coach
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Your personal guide for productivity and wellness.</p>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto px-8 py-4 space-y-6">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Coach Message */}
          <div className="flex gap-4">
            <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="font-semibold text-sm">TetherOS Coach</div>
              <div className="text-sm text-foreground/90 bg-muted/40 p-4 rounded-2xl rounded-tl-sm border border-border leading-relaxed">
                Good morning, Harry! Based on your activity this week, your deep work sessions are 20% longer when you schedule them before 11 AM. 
                <br/><br/>
                I notice you have a heavy afternoon planned. Would you like me to restructure your tasks to move the highly cognitive work to the morning?
              </div>
              <div className="flex gap-2 mt-2">
                <button className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:bg-muted transition-colors font-medium">Yes, optimize my day</button>
                <button className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:bg-muted transition-colors font-medium">No, leave it as is</button>
              </div>
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-4 flex-row-reverse">
            <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-orange-300 to-pink-500" />
            <div className="flex-1 flex justify-end">
              <div className="text-sm text-background bg-foreground p-4 rounded-2xl rounded-tr-sm max-w-[80%]">
                Can you give me a summary of my weekly progress so far?
              </div>
            </div>
          </div>

          {/* Coach Message with Widget */}
          <div className="flex gap-4">
            <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="font-semibold text-sm">TetherOS Coach</div>
              <div className="text-sm text-foreground/90 bg-muted/40 p-4 rounded-2xl rounded-tl-sm border border-border leading-relaxed">
                Here's a quick look at your week so far. You're doing great on habit consistency, but your sleep has been slightly irregular.
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-background rounded-xl p-3 border border-border">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><Clock className="h-3 w-3" /> Focus Time</div>
                    <div className="font-bold text-lg">14h 20m</div>
                    <div className="text-[10px] text-green-500 mt-1">â†‘ 12% vs last week</div>
                  </div>
                  <div className="bg-background rounded-xl p-3 border border-border">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><CalIcon className="h-3 w-3" /> Habits</div>
                    <div className="font-bold text-lg">85%</div>
                    <div className="text-[10px] text-orange-500 mt-1">Consistency rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Input Area */}
      <div className="p-8 pt-4 shrink-0 max-w-4xl mx-auto w-full">
        <div className="flex flex-wrap gap-2 mb-4">
          <Suggestion text="Plan tomorrow" icon={<CalIcon className="h-3 w-3" />} />
          <Suggestion text="Analyze my focus" icon={<BarChart3 className="h-3 w-3" />} />
          <Suggestion text="I feel distracted" icon={<Clock className="h-3 w-3" />} />
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Ask your coach anything..." 
            className="w-full bg-card border border-border rounded-full pl-6 pr-12 py-4 text-sm outline-none focus:border-[color:var(--brand-blue)]/50 transition-colors shadow-sm"
          />
          <button className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center rounded-full bg-foreground text-background hover:opacity-90 transition-opacity">
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Suggestion({ text, icon }: { text: string; icon: React.ReactNode }) {
  return (
    <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card hover:bg-muted transition-colors text-xs text-muted-foreground font-medium">
      {icon} {text}
    </button>
  );
}
