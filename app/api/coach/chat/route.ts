import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // AI Coach contextual logic response
    const coachResponses = [
      `Great question! Based on your current 9-day streak and focus metrics, I recommend prioritizing your top 2 high-priority tasks first thing in the morning.`,
      `I noticed you logged 18+ hours of deep work this week. Remember to schedule 10-minute rest buffers to maintain mental clarity!`,
      `To optimize your daily output, try pairing your morning habit routine with a 25-minute Pomodoro focus block.`,
    ];

    const reply = coachResponses[Math.floor(Math.random() * coachResponses.length)];

    return NextResponse.json({
      sender: "AI Coach",
      reply,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({ error: "AI Coach processing failed" }, { status: 500 });
  }
}
