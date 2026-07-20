"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Plus, X } from "lucide-react";
import { useMockData, EventItem } from "@/components/providers/MockDataProvider";

export default function CalendarPage() {
  const { events, addEvent } = useMockData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  // Mock calendar grid
  const dates = Array.from({ length: 35 }, (_, i) => {
    const day = i - 2; // offset to make 1st start on Wed
    return { day: day > 0 && day <= 28 ? day : null, active: day === 11, hasEvent: events.some(e => parseInt(e.date.split("-")[2]) === day) };
  });

  return (
    <>
      <div className="flex flex-col h-full relative">
        <div className="flex items-center justify-between px-8 pt-6">
          <div>
            <h1 className="text-2xl font-bold">Calendar 📅</h1>
            <p className="text-xs text-muted-foreground">Plan your weeks ahead.</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-1">
              <button className="rounded p-1 hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button>
              <span className="px-2 text-sm font-medium">February 2025</span>
              <button className="rounded p-1 hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
            >
              <Plus className="h-4 w-4" /> New Event
            </button>
          </div>
        </div>

        <div className="px-8 py-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="grid grid-cols-7 gap-4 text-center mb-4">
              {days.map(d => <div key={d} className="text-xs font-semibold text-muted-foreground">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2 lg:gap-4">
              {dates.map((d, i) => (
                <div key={i} className={`flex h-20 flex-col items-center justify-center rounded-xl border transition-colors ${d.active ? "border-foreground bg-foreground/5" : "border-border bg-background"} ${d.day ? "cursor-pointer hover:bg-muted" : "opacity-50 bg-transparent border-transparent"}`}>
                  {d.day && (
                    <>
                      <span className={`text-sm font-medium ${d.active ? "text-foreground font-bold" : ""}`}>{d.day}</span>
                      {d.hasEvent && <div className="mt-1 h-1.5 w-1.5 rounded-full bg-foreground" />}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 space-y-4 max-w-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Upcoming</h3>
            </div>
            {events.map((e, i) => {
              const day = e.date.split("-")[2];
              return (
                <EventCard key={e.id} month="FEB" day={day} title={e.title} time={e.time} />
              )
            })}
          </div>
        </div>
        
        {isModalOpen && <NewEventModal onClose={() => setIsModalOpen(false)} onSave={addEvent} />}
      </div>
    </>
  );
}

function EventCard({ month, day, title, time }: { month: string; day: string; title: string; time: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-3 hover:bg-muted/50 transition-colors cursor-pointer">
      <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <div className="text-[10px] font-semibold tracking-wider">{month}</div>
        <div className="text-lg font-bold leading-none">{day}</div>
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{time}</div>
      </div>
      <CalIcon className="h-5 w-5 text-muted-foreground mr-2" />
    </div>
  );
}

function NewEventModal({ onClose, onSave }: { onClose: () => void; onSave: (event: Omit<EventItem, "id">) => void }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("2025-02-12");
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title, date, time: time || "All Day", type: "Personal" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">New Event</h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted text-muted-foreground"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Event Title</label>
            <input 
              autoFocus
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground transition-colors" 
              placeholder="e.g. Sync with team"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Date (YYYY-MM-DD)</label>
              <input 
                type="text" 
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground transition-colors" 
              />
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Time</label>
              <input 
                type="text" 
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground transition-colors" 
                placeholder="e.g. 10:00 AM"
              />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
            <button type="submit" disabled={!title.trim()} className="rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 disabled:opacity-50 transition-colors">Save Event</button>
          </div>
        </form>
      </div>
    </div>
  );
}
