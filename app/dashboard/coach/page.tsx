"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, ArrowUp, Clock, Calendar as CalIcon, BarChart3, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "coach";
  content: string;
}

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "coach",
      content: "Welcome to your TetherOS AI Coach! I'm here to help you optimize your productivity, plan your day, and reflect on your progress.\n\nTry asking me to plan your tomorrow, analyze your focus patterns, or help you overcome distractions."
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg: Message = { id: Math.random().toString(36).substr(2, 9), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    const prompt = input;
    setInput("");
    setIsLoading(true);

    try {
      const userKey = localStorage.getItem("tetheros_user_ai_key") || "";
      const provider = localStorage.getItem("tetheros_ai_provider") || "tetheros";

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "coach_chat",
          prompt,
          apiKey: userKey,
          provider,
        }),
      });

      const data = await res.json();
      const reply = data.reply || data.summary || "I've noted your request. Let me know how I can assist further with your productivity goals.";

      setMessages(prev => [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        role: "coach",
        content: reply,
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        role: "coach",
        content: "I encountered an issue processing your request. Please check your API key in Settings > AI & API Keys and try again.",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
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
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-4 space-y-6">
        <div className="max-w-3xl mx-auto space-y-8">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              {msg.role === "coach" ? (
                <div className="h-8 w-8 shrink-0 rounded-full bg-foreground flex items-center justify-center text-background">
                  <MessageSquare className="h-4 w-4" />
                </div>
              ) : (
                <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-muted-foreground to-foreground flex items-center justify-center text-background text-[10px] font-bold">
                  HM
                </div>
              )}
              
              <div className={`flex-1 ${msg.role === "user" ? "flex justify-end" : "space-y-2"}`}>
                {msg.role === "coach" && <div className="font-semibold text-sm">TetherOS Coach</div>}
                
                <div className={`text-sm ${msg.role === "user" ? "text-background bg-foreground p-4 rounded-2xl rounded-tr-sm max-w-[80%]" : "text-foreground/90 bg-muted/40 p-4 rounded-2xl rounded-tl-sm border border-border leading-relaxed"}`}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4">
              <div className="h-8 w-8 shrink-0 rounded-full bg-foreground flex items-center justify-center text-background">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div className="space-y-2">
                <div className="font-semibold text-sm">TetherOS Coach</div>
                <div className="text-sm text-foreground/90 bg-muted/40 p-4 rounded-2xl rounded-tl-sm border border-border">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-8 pt-4 shrink-0 max-w-4xl mx-auto w-full">
        <div className="flex flex-wrap gap-2 mb-4">
          <Suggestion text="Plan tomorrow" icon={<CalIcon className="h-3 w-3" />} onClick={handleSuggestion} />
          <Suggestion text="Analyze my focus" icon={<BarChart3 className="h-3 w-3" />} onClick={handleSuggestion} />
          <Suggestion text="I feel distracted" icon={<Clock className="h-3 w-3" />} onClick={handleSuggestion} />
        </div>
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
            placeholder="Ask your coach anything..." 
            className="w-full bg-card border border-border rounded-full pl-6 pr-12 py-4 text-sm outline-none focus:border-foreground transition-colors shadow-sm disabled:opacity-60"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center rounded-full bg-foreground text-background hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-40"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowUp className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}

function Suggestion({ text, icon, onClick }: { text: string; icon: React.ReactNode; onClick: (text: string) => void }) {
  return (
    <button onClick={() => onClick(text)} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card hover:bg-muted transition-colors text-xs text-muted-foreground font-medium cursor-pointer">
      {icon} {text}
    </button>
  );
}
