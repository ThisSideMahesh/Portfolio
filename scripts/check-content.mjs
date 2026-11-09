#!/usr/bin/env node
/**
 * Content guard (docs/PLAN.md §3). Runs before every `next build` and exits 1 on any hit.
 * Enforces the PRD content rules mechanically, so they hold even after later edits.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["app", "components", "lib", "content"];
const SKIP_DIRS = new Set(["node_modules", ".next", "source"]); // content/source is private input, never shipped
const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".mjs", ".md", ".mdx", ".json", ".css", ".svg"]);

/** @type {{ id: string; pattern: RegExp; why: string; only?: string }[]} */
const RULES = [
  { id: "todo", pattern: /\bTODO\b/, why: "missing fact placeholder must be resolved before production" },
  { id: "phone-intl", pattern: /\+\s?91[\s-]?\d/, why: "phone numbers are never published" },
  { id: "phone-local", pattern: /(?<!\d)[6-9]\d{9}(?!\d)/, why: "phone numbers are never published" },
  { id: "dob", pattern: /date of birth|\bDOB\b/i, why: "date of birth is never published" },
  { id: "cgpa", pattern: /\bC\.?G\.?P\.?A\b/i, why: "no scores at all" },
  { id: "score-percent", pattern: /\b\d{2,3}(\.\d+)?\s?%/, why: "no scores at all", only: "content" },
  { id: "redhat-certified", pattern: /red\s*hat\s+certified|rhcsa[\s-]+certified|certified\s+(red\s*hat|rhcsa)/i, why: "Red Hat: training completed, exam pending; never 'certified'" },
  { id: "hackathon-plural", pattern: /hackathons?\s+won|hackathon\s+wins|won\s+(\w+\s+)?hackathons/i, why: "exactly one hackathon win; never pluralise" },
  { id: "coming-soon", pattern: /coming\s+soon/i, why: "the Creator door never says 'coming soon'" },
  { id: "creator-brand", pattern: /institutelevel/i, why: "the portfolio is not branded as the creator channel" },
];

/** @param {string} dir @returns {string[]} */
function walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return [];
  }
  return entries.flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return SKIP_DIRS.has(name) ? [] : walk(full);
    return EXTENSIONS.has(extname(name)) ? [full] : [];
  });
}

const failures = [];

for (const dir of SCAN_DIRS) {
  for (const file of walk(join(ROOT, dir))) {
    const rel = relative(ROOT, file);
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, index) => {
      for (const rule of RULES) {
        if (rule.only && !rel.startsWith(rule.only)) continue;
        if (rule.pattern.test(line)) failures.push(`${rel}:${index + 1}  [${rule.id}] ${rule.why}\n    ${line.trim()}`);
      }
    });
  }
}

// Private inputs must never be tracked by git.
try {
  const tracked = execFileSync("git", ["ls-files", "content/source"], { cwd: ROOT, encoding: "utf8" }).trim();
  if (tracked) failures.push(`content/source is tracked by git — remove it from the index:\n    ${tracked.split("\n").join("\n    ")}`);
} catch {
  // Not a git checkout (e.g. a deploy tarball): nothing to check.
}

if (failures.length > 0) {
  console.error(`check-content: ${failures.length} problem(s)\n\n${failures.join("\n\n")}\n`);
  process.exit(1);
}

console.log("check-content: OK");
