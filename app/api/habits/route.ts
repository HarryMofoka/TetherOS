import { NextResponse } from "next/server";

let mockHabits = [
  { id: "1", name: "Read 20 pages", streak: 12, completedToday: true },
  { id: "2", name: "Morning Workout", streak: 5, completedToday: false },
  { id: "3", name: "Meditate 10m", streak: 3, completedToday: true },
  { id: "4", name: "No Social Media", streak: 1, completedToday: false },
];

export async function GET() {
  return NextResponse.json({ habits: mockHabits });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newHabit = {
      id: Math.random().toString(36).substring(2, 9),
      name: body.name || "New Habit",
      streak: 0,
      completedToday: false,
    };
    mockHabits.push(newHabit);
    return NextResponse.json({ habit: newHabit }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;
    mockHabits = mockHabits.map((h) => {
      if (h.id === id) {
        const wasCompleted = h.completedToday;
        return {
          ...h,
          completedToday: !wasCompleted,
          streak: wasCompleted ? Math.max(0, h.streak - 1) : h.streak + 1,
        };
      }
      return h;
    });
    return NextResponse.json({ success: true, habits: mockHabits });
  } catch (err) {
    return NextResponse.json({ error: "Failed to toggle habit" }, { status: 400 });
  }
}
