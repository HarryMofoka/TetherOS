import { NextResponse } from "next/server";
import { sanitizeObject } from "@/lib/security/sanitizer";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (process.env.DATABASE_URL) {
      const dbTasks = await prisma.task.findMany({
        where: userId ? { userId } : undefined,
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ tasks: dbTasks });
    }
    return NextResponse.json({ tasks: [] });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const body = sanitizeObject(rawBody);

    if (process.env.DATABASE_URL && body.userId) {
      const created = await prisma.task.create({
        data: {
          userId: body.userId,
          title: body.title || "Untitled Task",
          tag: body.tag || "Personal",
          priority: (body.priority?.toUpperCase() as "HIGH" | "MEDIUM" | "LOW") || "MEDIUM",
          status: body.status === "Done" ? "DONE" : body.status === "In Progress" ? "IN_PROGRESS" : "TODO",
        },
      });
      return NextResponse.json({ task: created }, { status: 201 });
    }

    const newTask = {
      id: Math.random().toString(36).substring(2, 9),
      title: body.title || "Untitled Task",
      tag: body.tag || "Personal",
      priority: body.priority || "Medium",
      status: body.status || "To Do",
    };
    return NextResponse.json({ task: newTask }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const rawBody = await request.json();
    const body = sanitizeObject(rawBody);
    const { id, status, title, priority } = body;

    if (!id) return NextResponse.json({ error: "Missing Task ID" }, { status: 400 });

    if (process.env.DATABASE_URL) {
      const updated = await prisma.task.update({
        where: { id },
        data: {
          ...(title && { title }),
          ...(status && { status: status === "Done" ? "DONE" : status === "In Progress" ? "IN_PROGRESS" : "TODO" }),
          ...(priority && { priority: priority.toUpperCase() as "HIGH" | "MEDIUM" | "LOW" }),
        },
      });
      return NextResponse.json({ success: true, task: updated });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing Task ID" }, { status: 400 });

    if (process.env.DATABASE_URL) {
      await prisma.task.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
