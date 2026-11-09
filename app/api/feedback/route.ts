import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse, type NextRequest } from "next/server";
import type { FeedbackComment, FeedbackStore, NewFeedbackComment } from "@/lib/feedback";

/**
 * Development-only store for on-site review comments. In production every method returns
 * 404, so this route can never be used to write to the server.
 */
const FILE = path.join(process.cwd(), ".feedback", "comments.json");
const MAX_COMMENT = 2000;

function notInDev() {
  return process.env.NODE_ENV !== "development" ? new NextResponse(null, { status: 404 }) : null;
}

/** Reads the store; upgrades the earlier plain-array format and numbers any unnumbered comment. */
async function readStore(): Promise<FeedbackStore> {
  let raw: unknown = [];
  try {
    raw = JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    // No file yet.
  }
  const store: FeedbackStore = Array.isArray(raw)
    ? { nextNumber: 1, comments: raw as FeedbackComment[] }
    : (raw as FeedbackStore);
  let next = Math.max(store.nextNumber ?? 1, ...store.comments.map((c) => (c.number ?? 0) + 1));
  for (const c of store.comments) if (!c.number) c.number = next++;
  store.nextNumber = next;
  return store;
}

async function writeStore(store: FeedbackStore) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, `${JSON.stringify(store, null, 2)}\n`, "utf8");
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
  const store = await readStore();
  return NextResponse.json({
    nextNumber: store.nextNumber,
    comments: page ? store.comments.filter((c) => c.page === page) : store.comments,
  });
}

export async function POST(request: NextRequest) {
  const blocked = notInDev();
  if (blocked) return blocked;
  const input = parseNew(await request.json().catch(() => null));
  if (!input) return NextResponse.json({ error: "Write a comment first." }, { status: 400 });
  const store = await readStore();
  const comment: FeedbackComment = {
    ...input,
    id: randomUUID(),
    number: store.nextNumber,
    status: "open",
    createdAt: new Date().toISOString(),
  };
  store.comments.push(comment);
  store.nextNumber += 1; // never reused, even if this comment is later deleted
  await writeStore(store);
  return NextResponse.json(comment, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const blocked = notInDev();
  if (blocked) return blocked;
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const store = await readStore();
  const target = store.comments.find((c) => c.id === body.id);
  if (!target) return NextResponse.json({ error: "Comment not found." }, { status: 404 });
  if (body.status === "open" || body.status === "resolved") target.status = body.status;
  if (typeof body.comment === "string" && body.comment.trim()) target.comment = body.comment.trim().slice(0, MAX_COMMENT);
  await writeStore(store);
  return NextResponse.json(target);
}

export async function DELETE(request: NextRequest) {
  const blocked = notInDev();
  if (blocked) return blocked;
  const id = request.nextUrl.searchParams.get("id");
  const store = await readStore();
  const before = store.comments.length;
  store.comments = store.comments.filter((c) => c.id !== id);
  if (store.comments.length === before) return NextResponse.json({ error: "Comment not found." }, { status: 404 });
  await writeStore(store);
  return new NextResponse(null, { status: 204 });
}
