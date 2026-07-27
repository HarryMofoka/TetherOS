"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Sparkles, Target, Zap, Clock, ShieldCheck } from "lucide-react";
import { MockDataProvider, useMockData } from "@/components/providers/MockDataProvider";

function OnboardingContent() {
  const router = useRouter();
  const { addTask, addHabit } = useMockData();
  const [step, setStep] = useState(1);

  // Form State
  const [goal, setGoal] = useState("Master daily time & tasks");
  const [focusHours, setFocusHours] = useState("4");
  const [selectedHabits, setSelectedHabits] = useState<string[]>([
    "Morning 10m Meditation",
    "Read 20 pages",
    "No Distractions Focus Session"
  ]);
  const [topTask, setTopTask] = useState("");

  const availableHabits = [
    "Morning 10m Meditation",
    "Read 20 pages",
    "No Distractions Focus Session",
    "30-min Daily Exercise",
    "Evening Reflection Journal",
    "8 Hours Sleep Target"
  ];

  const toggleHabit = (habit: string) => {
    if (selectedHabits.includes(habit)) {
      setSelectedHabits(selectedHabits.filter(h => h !== habit));
    } else {
      setSelectedHabits([...selectedHabits, habit]);
    }
  };

  const handleFinish = () => {
    // Populate user starter data
    selectedHabits.forEach(h => {
      addHabit(h);
    });

    if (topTask.trim()) {
      addTask({ title: topTask.trim(), tag: "Personal", priority: "High", status: "To Do" });
    } else {
      addTask({ title: "Set up first project milestone", tag: "Work", priority: "High", status: "To Do" });
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between p-6 md:p-12 relative overflow-hidden">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-foreground text-background font-black flex items-center justify-center text-base">
            T
          </div>
          <span className="font-bold text-lg tracking-tight">TetherOS</span>
        </div>

        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step ? "w-8 bg-foreground" : s < step ? "w-2 bg-foreground/40" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content Card */}
      <div className="max-w-xl mx-auto w-full my-auto z-10">
        {step === 1 && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="space-y-2 text-center md:text-left">
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Step 1 of 4
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Welcome! What is your main focus with TetherOS?
              </h1>
              <p className="text-sm text-muted-foreground">
                We will personalize your layout and intelligent AI assistant based on your primary objective.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { title: "Master daily time & tasks", desc: "Organize workload, set priorities, and stop procrastinating.", icon: Target },
                { title: "Build long-term daily habits", desc: "Track streaks, build discipline, and form lasting routines.", icon: Zap },
                { title: "Deep work & focus sessions", desc: "Block out distractions and log immersive focus hours.", icon: Clock },
                { title: "All-in-one life management", desc: "Full control across tasks, projects, notes, and reflection.", icon: ShieldCheck }
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = goal === opt.title;
                return (
                  <div
                    key={opt.title}
                    onClick={() => setGoal(opt.title)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                      isSelected
                        ? "border-foreground bg-foreground/5 shadow-sm"
                        : "border-border bg-card hover:border-foreground/40"
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl border ${isSelected ? "bg-foreground text-background border-foreground" : "bg-muted border-border"}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold flex items-center justify-between">
                        {opt.title}
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-foreground" />}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{opt.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-2xl bg-foreground text-background font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="space-y-2 text-center md:text-left">
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Step 2 of 4
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Set your daily focus target
              </h1>
              <p className="text-sm text-muted-foreground">
                How many hours of deep work would you like to achieve each day?
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-3 gap-3">
                {["2", "4", "6"].map((h) => (
                  <button
                    key={h}
                    onClick={() => setFocusHours(h)}
                    className={`py-4 rounded-2xl border text-center font-bold text-lg transition-all cursor-pointer ${
                      focusHours === h
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-card hover:border-foreground/40 text-foreground"
                    }`}
                  >
                    {h} Hours / Day
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-2xl border border-border bg-card space-y-2">
                <label className="text-xs font-bold block text-muted-foreground uppercase tracking-wider">
                  What is your #1 task for today?
                </label>
                <input
                  type="text"
                  placeholder="e.g. Finish client strategy proposal..."
                  value={topTask}
                  onChange={(e) => setTopTask(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-foreground"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-3.5 rounded-2xl border border-border bg-card font-bold text-sm hover:bg-muted cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 py-3.5 rounded-2xl bg-foreground text-background font-bold text-sm hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="space-y-2 text-center md:text-left">
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Step 3 of 4
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Pick starter habits
              </h1>
              <p className="text-sm text-muted-foreground">
                Select daily habits to track immediately. You can customize them anytime later.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {availableHabits.map((habit) => {
                const isSelected = selectedHabits.includes(habit);
                return (
                  <div
                    key={habit}
                    onClick={() => toggleHabit(habit)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "border-foreground bg-foreground/5 font-bold"
                        : "border-border bg-card hover:border-foreground/40 text-muted-foreground"
                    }`}
                  >
                    <span className="text-xs">{habit}</span>
                    {isSelected ? (
                      <CheckCircle2 className="h-4 w-4 text-foreground shrink-0" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-border shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 py-3.5 rounded-2xl border border-border bg-card font-bold text-sm hover:bg-muted cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="w-2/3 py-3.5 rounded-2xl bg-foreground text-background font-bold text-sm hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer"
              >
                Final Step <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 text-center animate-fade-in-up">
            <div className="mx-auto h-16 w-16 rounded-3xl bg-foreground text-background flex items-center justify-center shadow-lg">
              <Sparkles className="h-8 w-8 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-tight">Your TetherOS workspace is ready!</h1>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                We customized your dashboard, habits tracker, and AI Coach parameters based on your <span className="font-bold text-foreground font-mono">{focusHours} hours/day</span> target.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-border bg-card text-left space-y-2 text-xs">
              <div className="font-bold text-foreground">Summary of initial setup:</div>
              <ul className="space-y-1.5 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Focus Goal: {goal}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Active Starter Habits: {selectedHabits.length} selected
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Daily Focus Target: {focusHours} Hours
                </li>
              </ul>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-4 rounded-2xl bg-foreground text-background font-black text-base hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              Launch My TetherOS Dashboard 🚀
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto w-full text-center text-xs text-muted-foreground z-10">
        TetherOS Intelligence • Powered by AI
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <MockDataProvider>
      <OnboardingContent />
    </MockDataProvider>
  );
}
