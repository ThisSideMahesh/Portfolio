"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import type { FeedbackComment, FeedbackStore, NewFeedbackComment } from "@/lib/feedback";

/**
 * On-site review tool (development only; layout.tsx renders it only when NODE_ENV is
 * "development", so it is not in the production bundle).
 *
 * 1. Click "Comment" (or press Alt+C), then click anywhere on the page.
 * 2. A numbered marker drops there; type what should change and Save (Ctrl/Cmd+Enter).
 * 3. Markers stay on the page. Click one to read it, mark it resolved, or delete it.
 * Comments are saved to .feedback/comments.json, which `pnpm feedback` prints.
 */

type Draft = Omit<NewFeedbackComment, "comment">;
type Placed = { comment: FeedbackComment; left: number; top: number };

const LAYER = "data-feedback-layer";

function cssPath(el: Element): string {
  const parts: string[] = [];
  let node: Element | null = el;
  while (node && node !== document.body && parts.length < 7) {
    if (node.id) {
      parts.unshift(`#${CSS.escape(node.id)}`);
      return parts.join(" > ");
    }
    const parent: Element | null = node.parentElement;
    if (!parent) break;
    const tag = node.tagName;
    const siblings = Array.from(parent.children).filter((c) => c.tagName === tag);
    parts.unshift(siblings.length > 1 ? `${tag.toLowerCase()}:nth-of-type(${siblings.indexOf(node) + 1})` : tag.toLowerCase());
    node = parent;
  }
  return `body > ${parts.join(" > ")}`;
}

function describeSection(el: Element): string {
  const section = el.closest("section, header, footer, nav, article");
  if (!section) return "page";
  const heading = section.querySelector("h1, h2, h3")?.textContent?.trim();
  const id = section.id ? `#${section.id}` : section.tagName.toLowerCase();
  return heading ? `${id} "${heading.slice(0, 60)}"` : id;
}

function currentTheme() {
  const set = document.documentElement.dataset.theme;
  if (set) return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark (system)" : "light (system)";
}

function targetAt(x: number, y: number): Element | null {
  return document.elementsFromPoint(x, y).find((el) => !el.closest(`[${LAYER}]`)) ?? null;
}

function place(c: FeedbackComment): Placed {
  let left = c.x;
  let top = c.y;
  try {
    const el = c.anchor.selector ? document.querySelector(c.anchor.selector) : null;
    if (el) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        left = r.left + window.scrollX + c.anchor.rx * r.width;
        top = r.top + window.scrollY + c.anchor.ry * r.height;
      }
    }
  } catch {
    // Invalid selector after a refactor: fall back to stored coordinates.
  }
  return { comment: c, left, top };
}

export function FeedbackLayer() {
  const page = usePathname();
  const [comments, setComments] = useState<FeedbackComment[]>([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [placing, setPlacing] = useState(false);
  const [hover, setHover] = useState<DOMRect | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [placed, setPlaced] = useState<Placed[]>([]);
  // true on the client, false during server render (no animation frame needed, works in background tabs)
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const [version, setVersion] = useState(0); // bump to reload after save / resolve / delete
  const textRef = useRef<HTMLTextAreaElement>(null);
  const reload = useCallback(() => setVersion((v) => v + 1), []);

  useEffect(() => {
    let alive = true;
    fetch(`/api/feedback?page=${encodeURIComponent(page)}`)
      .then((res) => (res.ok ? (res.json() as Promise<FeedbackStore>) : null))
      .then((data) => {
        if (!alive || !data) return;
        setComments(data.comments);
        setNextNumber(data.nextNumber);
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [page, version]);

  // Keep markers on their elements as the layout changes.
  useEffect(() => {
    const open = comments.filter((c) => c.status === "open");
    const update = () => setPlaced(open.map(place));
    const first = window.setTimeout(update, 0);
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    window.addEventListener("resize", update);
    return () => {
      window.clearTimeout(first);
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [comments]);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.altKey && event.code === "KeyC") {
        event.preventDefault();
        setPlacing((p) => !p);
        setDraft(null);
      }
      if (event.key === "Escape") {
        setPlacing(false);
        setDraft(null);
        setOpenId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (draft) textRef.current?.focus();
  }, [draft]);

  function pick(clientX: number, clientY: number) {
    const el = targetAt(clientX, clientY);
    if (!el) return;
    const r = el.getBoundingClientRect();
    setDraft({
      page,
      x: clientX + window.scrollX,
      y: clientY + window.scrollY,
      anchor: {
        selector: cssPath(el),
        rx: r.width ? (clientX - r.left) / r.width : 0.5,
        ry: r.height ? (clientY - r.top) / r.height : 0.5,
      },
      section: describeSection(el),
      elementText: (el.textContent ?? el.getAttribute("alt") ?? "").trim().replace(/\s+/g, " ").slice(0, 160),
      viewport: { width: window.innerWidth, height: window.innerHeight },
      theme: currentTheme(),
    });
    setText("");
    setError("");
    setPlacing(false);
    setHover(null);
  }

  async function save() {
    if (!draft) return;
    if (!text.trim()) {
      setError("Write what should change first.");
      return;
    }
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...draft, comment: text }),
    });
    if (!res.ok) {
      setError("Couldn't save. Is the dev server running?");
      return;
    }
    setDraft(null);
    reload();
  }

  async function resolve(id: string) {
    await fetch("/api/feedback", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status: "resolved" }) });
    setOpenId(null);
    reload();
  }

  async function remove(id: string) {
    await fetch(`/api/feedback?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    setOpenId(null);
    reload();
  }

  function onDraftKey(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      save().catch(() => undefined);
    }
  }

  if (!mounted) return null;
  const openCount = comments.filter((c) => c.status === "open").length;

  return createPortal(
    <div {...{ [LAYER]: "" }} className="feedback-layer">
      {/* Markers, positioned in document coordinates */}
      <div className="pointer-events-none absolute top-0 left-0 z-[96]">
        {placed.map(({ comment, left, top }) => (
          <div key={comment.id} className="pointer-events-auto absolute" style={{ left, top }}>
            <button
              type="button"
              onClick={() => setOpenId(openId === comment.id ? null : comment.id)}
              aria-label={`Comment ${comment.number}: ${comment.comment}`}
              className="fb-pin"
            >
              {comment.number}
            </button>
            {openId === comment.id ? (
              <div className="fb-card mt-2 w-72">
                <p className="fb-badge">Comment #{comment.number}</p>
                <p className="mt-2 text-xs opacity-70">{comment.section}</p>
                <p className="mt-2 text-sm whitespace-pre-wrap">{comment.comment}</p>
                <div className="mt-3 flex gap-2">
                  <button type="button" className="fb-btn fb-btn-solid" onClick={() => resolve(comment.id)}>
                    Mark resolved
                  </button>
                  <button type="button" className="fb-btn" onClick={() => remove(comment.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ))}

        {draft ? (
          <div className="pointer-events-auto absolute" style={{ left: draft.x, top: draft.y }}>
            <span className="fb-pin fb-pin-new">{nextNumber}</span>
            <div className="fb-card mt-2 w-80">
              <p className="fb-badge">Comment #{nextNumber}</p>
              <label htmlFor="fb-text" className="mt-2 block text-xs opacity-70">
                What should change here? <span className="opacity-70">({draft.section})</span>
              </label>
              <textarea
                id="fb-text"
                ref={textRef}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setError("");
                }}
                onKeyDown={onDraftKey}
                rows={4}
                className="mt-2 w-full resize-y rounded-md border border-current/20 bg-transparent p-2 text-sm"
                placeholder="Make this heading smaller on phones"
              />
              {error ? <p className="mt-1 text-xs text-[#ff8a80]">{error}</p> : null}
              <div className="mt-3 flex items-center gap-2">
                <button type="button" className="fb-btn fb-btn-solid" onClick={() => save()}>
                  Save comment
                </button>
                <button type="button" className="fb-btn" onClick={() => setDraft(null)}>
                  Cancel
                </button>
                <span className="ml-auto text-[11px] opacity-60">Ctrl/⌘ + Enter</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Placement mode: click anywhere to drop a marker */}
      {placing ? (
        <div
          className="fixed inset-0 z-[97] cursor-crosshair"
          onPointerMove={(e) => {
            const el = targetAt(e.clientX, e.clientY);
            setHover(el ? el.getBoundingClientRect() : null);
          }}
          onClick={(e) => pick(e.clientX, e.clientY)}
        >
          {hover ? (
            <span
              className="pointer-events-none fixed rounded-[4px] outline-2 outline-offset-2 outline-[#ff7a1a] outline-dashed"
              style={{ left: hover.left, top: hover.top, width: hover.width, height: hover.height }}
            />
          ) : null}
          <p className="fb-card pointer-events-none fixed top-20 left-1/2 -translate-x-1/2 text-sm">
            Click the spot you want changed. This will be comment #{nextNumber}. Press Esc to cancel.
          </p>
        </div>
      ) : null}

      {/* Toggle */}
      <button
        type="button"
        onClick={() => {
          setPlacing((p) => !p);
          setDraft(null);
        }}
        aria-pressed={placing}
        className="fb-toggle fixed right-4 bottom-4 z-[98]"
      >
        {placing ? "Cancel" : "Comment"}
        {openCount > 0 && !placing ? <span className="fb-count">{openCount}</span> : null}
      </button>
    </div>,
    document.body,
  );
}
