"use client";

import { useState } from "react";
import { MessageSquare, ArrowUp, Clock, Calendar as CalIcon, BarChart3 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "coach";
  content: string;
  widget?: React.ReactNode;
}

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "coach",
      content: "Good morning, Harry! Based on your activity this week, your deep work sessions are 20% longer when you schedule them before 11 AM.\n\nI notice you have a heavy afternoon planned. Would you like me to restructure your tasks to move the highly cognitive work to the morning?"
    },
    {
      id: "2",
      role: "user",
      content: "Can you give me a summary of my weekly progress so far?"
    },
    {
      id: "3",
      role: "coach",
      content: "Here's a quick look at your week so far. You're doing great on habit consistency, but your sleep has been slightly irregular.",
      widget: (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-background rounded-xl p-3 border border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><Clock className="h-3 w-3" /> Focus Time</div>
            <div className="font-bold text-lg">14h 20m</div>
            <div className="text-[10px] text-green-500 mt-1">↑ 12% vs last week</div>
          </div>
          <div className="bg-background rounded-xl p-3 border border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><CalIcon className="h-3 w-3" /> Habits</div>
            <div className="font-bold text-lg">85%</div>
            <div className="text-[10px] text-orange-500 mt-1">Consistency rate</div>
          </div>
        </div>
      )
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMsg: Message = { id: Math.random().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    
    // Mock response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        role: "coach",
        content: "I've noted that down. Keep up the great work! Let me know if you need any adjustments to your schedule."
      }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <div className="px-8 pt-6 pb-4 shrink-0">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="h-6 w-6" /> AI Coach
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Your personal guide for productivity and wellness.</p>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto px-8 py-4 space-y-6">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              {msg.role === "coach" ? (
                <div className="h-8 w-8 shrink-0 rounded-full bg-foreground flex items-center justify-center text-background">
                  <MessageSquare className="h-4 w-4" />
                </div>
              ) : (
                <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-muted-foreground to-foreground" />
              )}
              
              <div className={`flex-1 ${msg.role === "user" ? "flex justify-end" : "space-y-2"}`}>
                {msg.role === "coach" && <div className="font-semibold text-sm">TetherOS Coach</div>}
                
                <div className={`text-sm ${msg.role === "user" ? "text-background bg-foreground p-4 rounded-2xl rounded-tr-sm max-w-[80%]" : "text-foreground/90 bg-muted/40 p-4 rounded-2xl rounded-tl-sm border border-border leading-relaxed"}`}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  {msg.widget && msg.widget}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Input Area */}
      <div className="p-8 pt-4 shrink-0 max-w-4xl mx-auto w-full">
        <div className="flex flex-wrap gap-2 mb-4">
          <Suggestion text="Plan tomorrow" icon={<CalIcon className="h-3 w-3" />} onClick={(t) => setInput(t)} />
          <Suggestion text="Analyze my focus" icon={<BarChart3 className="h-3 w-3" />} onClick={(t) => setInput(t)} />
          <Suggestion text="I feel distracted" icon={<Clock className="h-3 w-3" />} onClick={(t) => setInput(t)} />
        </div>
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask your coach anything..." 
            className="w-full bg-card border border-border rounded-full pl-6 pr-12 py-4 text-sm outline-none focus:border-foreground transition-colors shadow-sm"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center rounded-full bg-foreground text-background hover:opacity-90 transition-opacity"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Suggestion({ text, icon, onClick }: { text: string; icon: React.ReactNode; onClick: (text: string) => void }) {
  return (
    <button onClick={() => onClick(text)} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card hover:bg-muted transition-colors text-xs text-muted-foreground font-medium">
      {icon} {text}
    </button>
  );
}
