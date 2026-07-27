import { NextResponse } from "next/server";

// In-memory fallback dataset for initial testing
let mockTasks = [
  { id: "1", title: "Draft Q1 OKRs", tag: "Work", priority: "High", status: "To Do" },
  { id: "2", title: "Buy groceries", tag: "Personal", priority: "Medium", status: "To Do" },
  { id: "3", title: "Schedule dentist appt", tag: "Health", priority: "Low", status: "To Do" },
  { id: "4", title: "Build Auth Flow", tag: "Project", priority: "High", status: "In Progress" },
  { id: "5", title: "Read 'Atomic Habits'", tag: "Personal", priority: "Medium", status: "In Progress" },
  { id: "6", title: "Weekly Team Sync", tag: "Work", priority: "Low", status: "Done" },
  { id: "7", title: "Review PRs", tag: "Project", priority: "Medium", status: "Done" },
];

export async function GET() {
  return NextResponse.json({ tasks: mockTasks });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newTask = {
      id: Math.random().toString(36).substring(2, 9),
      title: body.title || "Untitled Task",
      tag: body.tag || "Personal",
      priority: body.priority || "Medium",
      status: body.status || "To Do",
    };
    mockTasks.push(newTask);
    return NextResponse.json({ task: newTask }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, title, priority } = body;
    mockTasks = mockTasks.map((t) =>
      t.id === id ? { ...t, ...(status && { status }), ...(title && { title }), ...(priority && { priority }) } : t
    );
    return NextResponse.json({ success: true, tasks: mockTasks });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    mockTasks = mockTasks.filter((t) => t.id !== id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 400 });
  }
}
