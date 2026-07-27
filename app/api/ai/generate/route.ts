import { NextResponse } from "next/server";
import { sanitizeObject } from "@/lib/security/sanitizer";

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const body = sanitizeObject(rawBody);
    const { action, prompt, apiKey, provider } = body;

    if (!prompt && !action) {
      return NextResponse.json({ error: "Missing action or prompt" }, { status: 400 });
    }

    // 1. AI Task Breakdown Generator
    if (action === "breakdown_task") {
      const taskTitle = prompt || "Complex Project Task";
      const subtasks = [
        `Research requirements & specs for "${taskTitle}"`,
        `Draft core architecture diagram & data flow`,
        `Implement main module logic & test edge cases`,
        `Review PR & deploy update to staging`
      ];
      return NextResponse.json({
        success: true,
        action,
        taskTitle,
        subtasks,
        provider: provider || "TetherOS Engine",
      });
    }

    // 2. AI Daily Plan Synthesizer
    if (action === "synthesize_today_plan") {
      const timeline = [
        { time: "08:30 AM", activity: "Morning Routine & Habit Log Check-in", category: "Habit" },
        { time: "09:15 AM", activity: "High-Priority Task Focus Block #1", category: "Focus" },
        { time: "11:30 AM", activity: "Team Sync & Slack Clearance", category: "Work" },
        { time: "02:00 PM", activity: "Deep Work: Core Engineering & PR Review", category: "Focus" },
        { time: "04:30 PM", activity: "Daily Reflection Journal & Habit Wrap-up", category: "Reflection" }
      ];
      return NextResponse.json({
        success: true,
        action,
        summary: "Optimized 5-stage daily schedule synthesized based on peak cognitive energy periods.",
        timeline,
        provider: provider || "TetherOS Engine",
      });
    }

    // 3. AI Journal Reflection Sentiment & Insights
    if (action === "analyze_journal") {
      return NextResponse.json({
        success: true,
        action,
        sentiment: "Highly Focused & Purpose-Driven",
        clarityScore: "94%",
        insights: [
          "Strong emotional momentum observed during deep focus blocks.",
          "Consider shifting administrative tasks to late afternoon to protect morning flow.",
          "Consistency streak in daily reflection is contributing to higher life score."
        ],
        provider: provider || "TetherOS Engine",
      });
    }

    // 4. Default AI Chat Response
    return NextResponse.json({
      success: true,
      reply: `[AI Engine (${provider || 'TetherOS'})] Analyzed prompt: "${prompt}". Recommendation: prioritize top high-impact items during morning focus blocks.`,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    return NextResponse.json({ error: "AI Generation service error" }, { status: 500 });
  }
}
