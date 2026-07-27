import { NextResponse } from "next/server";
import { sanitizeObject } from "@/lib/security/sanitizer";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (process.env.DATABASE_URL) {
      const events = await prisma.event.findMany({
        where: userId ? { userId } : undefined,
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ events });
    }
    return NextResponse.json({ events: [] });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const body = sanitizeObject(rawBody);

    if (process.env.DATABASE_URL && body.userId) {
      const event = await prisma.event.create({
        data: {
          userId: body.userId,
          title: body.title || "Untitled Event",
          date: body.date || new Date().toISOString().split("T")[0],
          time: body.time || "12:00 PM",
          type: (body.type?.toUpperCase() as "MEETING" | "FOCUS" | "PERSONAL") || "PERSONAL",
        },
      });
      return NextResponse.json({ event }, { status: 201 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid event payload" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing Event ID" }, { status: 400 });

    if (process.env.DATABASE_URL) {
      await prisma.event.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
