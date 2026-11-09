#!/usr/bin/env node
/** Prints open on-site review comments (from `pnpm dev` → Comment button), grouped by page. */
import { readFileSync } from "node:fs";

let comments = [];
try {
  const raw = JSON.parse(readFileSync(".feedback/comments.json", "utf8"));
  comments = Array.isArray(raw) ? raw : raw.comments;
} catch {
  console.log("No comments yet. Run `pnpm dev`, click Comment, then click a spot on the page.");
  process.exit(0);
}
const open = comments.filter((c) => c.status === "open");
if (open.length === 0) {
  console.log("No open comments.");
  process.exit(0);
}
const byPage = Map.groupBy(open, (c) => c.page);
for (const [page, list] of byPage) {
  console.log(`\n${page}`);
  list.forEach((c, i) => {
    console.log(`  #${c.number ?? i + 1} [${c.section}] ${c.comment}`);
    console.log(`     at: ${c.anchor.selector}  (${c.viewport.width}x${c.viewport.height}, ${c.theme})`);
    if (c.elementText) console.log(`     text there: "${c.elementText.slice(0, 80)}"`);
  });
}
