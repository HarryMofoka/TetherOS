import { NextResponse } from "next/server";
import { sanitizeObject } from "@/lib/security/sanitizer";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (process.env.DATABASE_URL) {
      const projects = await prisma.project.findMany({
        where: userId ? { userId } : undefined,
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ projects });
    }
    return NextResponse.json({ projects: [] });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const body = sanitizeObject(rawBody);

    if (process.env.DATABASE_URL && body.userId) {
      const project = await prisma.project.create({
        data: {
          userId: body.userId,
          name: body.name || "Untitled Project",
          description: body.description || "",
          dueDate: body.dueDate || null,
          status: body.status?.toUpperCase() || "ACTIVE",
          progressPct: body.progressPct || 0,
        },
      });
      return NextResponse.json({ project }, { status: 201 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid project payload" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing Project ID" }, { status: 400 });

    if (process.env.DATABASE_URL) {
      await prisma.project.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
