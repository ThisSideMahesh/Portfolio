import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse, type NextRequest } from "next/server";
import type { FeedbackComment, NewFeedbackComment } from "@/lib/feedback";

/**
 * Development-only store for on-site review comments. In production every method returns
 * 404, so this route can never be used to write to the server.
 */
const FILE = path.join(process.cwd(), ".feedback", "comments.json");
const MAX_COMMENT = 2000;

function notInDev() {
  return process.env.NODE_ENV !== "development" ? new NextResponse(null, { status: 404 }) : null;
}

async function readAll(): Promise<FeedbackComment[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as FeedbackComment[];
  } catch {
    return [];
  }
}

async function writeAll(comments: FeedbackComment[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, `${JSON.stringify(comments, null, 2)}\n`, "utf8");
}

const isNum = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

function parseNew(body: unknown): NewFeedbackComment | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  const anchor = (b.anchor ?? {}) as Record<string, unknown>;
  const viewport = (b.viewport ?? {}) as Record<string, unknown>;
  const comment = str(b.comment, MAX_COMMENT).trim();
  const page = str(b.page, 200);
  if (!comment || !page.startsWith("/") || !isNum(b.x) || !isNum(b.y)) return null;
  return {
    page,
    comment,
    x: b.x,
    y: b.y,
    anchor: {
      selector: str(anchor.selector, 500),
      rx: isNum(anchor.rx) ? anchor.rx : 0.5,
      ry: isNum(anchor.ry) ? anchor.ry : 0.5,
    },
    section: str(b.section, 200),
    elementText: str(b.elementText, 200),
    viewport: { width: isNum(viewport.width) ? viewport.width : 0, height: isNum(viewport.height) ? viewport.height : 0 },
    theme: str(b.theme, 40),
  };
}

export async function GET(request: NextRequest) {
  const blocked = notInDev();
  if (blocked) return blocked;
  const page = request.nextUrl.searchParams.get("page");
  const all = await readAll();
  return NextResponse.json(page ? all.filter((c) => c.page === page) : all);
}

export async function POST(request: NextRequest) {
  const blocked = notInDev();
  if (blocked) return blocked;
  const input = parseNew(await request.json().catch(() => null));
  if (!input) return NextResponse.json({ error: "Write a comment first." }, { status: 400 });
  const comment: FeedbackComment = { ...input, id: randomUUID(), status: "open", createdAt: new Date().toISOString() };
  const all = await readAll();
  all.push(comment);
  await writeAll(all);
  return NextResponse.json(comment, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const blocked = notInDev();
  if (blocked) return blocked;
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const all = await readAll();
  const target = all.find((c) => c.id === body.id);
  if (!target) return NextResponse.json({ error: "Comment not found." }, { status: 404 });
  if (body.status === "open" || body.status === "resolved") target.status = body.status;
  if (typeof body.comment === "string" && body.comment.trim()) target.comment = body.comment.trim().slice(0, MAX_COMMENT);
  await writeAll(all);
  return NextResponse.json(target);
}

export async function DELETE(request: NextRequest) {
  const blocked = notInDev();
  if (blocked) return blocked;
  const id = request.nextUrl.searchParams.get("id");
  const all = await readAll();
  const next = all.filter((c) => c.id !== id);
  if (next.length === all.length) return NextResponse.json({ error: "Comment not found." }, { status: 404 });
  await writeAll(next);
  return new NextResponse(null, { status: 204 });
}
