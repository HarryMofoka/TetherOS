import { NextResponse } from "next/server";
import { sanitizeObject } from "@/lib/security/sanitizer";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (process.env.DATABASE_URL) {
      const habits = await prisma.habit.findMany({
        where: userId ? { userId } : undefined,
        include: { logs: true },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ habits });
    }
    return NextResponse.json({ habits: [] });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch habits" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const body = sanitizeObject(rawBody);

    if (process.env.DATABASE_URL && body.userId) {
      const habit = await prisma.habit.create({
        data: {
          userId: body.userId,
          name: body.name || "New Habit",
          targetFrequency: body.targetFrequency || 1,
        },
      });
      return NextResponse.json({ habit }, { status: 201 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid habit payload" }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const rawBody = await request.json();
    const body = sanitizeObject(rawBody);
    const { id, completedToday } = body;

    if (!id) return NextResponse.json({ error: "Missing Habit ID" }, { status: 400 });

    if (process.env.DATABASE_URL) {
      const todayStr = new Date().toISOString().split("T")[0];
      if (completedToday) {
        await prisma.habitLog.upsert({
          where: { habitId_dateDate: { habitId: id, dateDate: todayStr } },
          create: { habitId: id, dateDate: todayStr },
          update: {},
        });
        await prisma.habit.update({
          where: { id },
          data: { currentStreak: { increment: 1 } },
        });
      } else {
        await prisma.habitLog.deleteMany({
          where: { habitId: id, dateDate: todayStr },
        });
        await prisma.habit.update({
          where: { id },
          data: { currentStreak: { decrement: 1 } },
        });
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to toggle habit" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing Habit ID" }, { status: 400 });

    if (process.env.DATABASE_URL) {
      await prisma.habit.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete habit" }, { status: 500 });
  }
}
