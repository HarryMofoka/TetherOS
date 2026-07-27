import { NextResponse } from "next/server";
import { sanitizeObject } from "@/lib/security/sanitizer";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (process.env.DATABASE_URL) {
      const entries = await prisma.journalEntry.findMany({
        where: userId ? { userId } : undefined,
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ entries });
    }
    return NextResponse.json({ entries: [] });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch journal entries" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const body = sanitizeObject(rawBody);

    if (process.env.DATABASE_URL && body.userId) {
      const entry = await prisma.journalEntry.create({
        data: {
          userId: body.userId,
          title: body.title || "Untitled Entry",
          content: body.content || "",
          date: body.date || new Date().toISOString().split("T")[0],
        },
      });
      return NextResponse.json({ entry }, { status: 201 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid journal entry payload" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing Entry ID" }, { status: 400 });

    if (process.env.DATABASE_URL) {
      await prisma.journalEntry.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete journal entry" }, { status: 500 });
  }
}
