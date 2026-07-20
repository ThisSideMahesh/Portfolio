# Incident Response Plan

This document outlines standard operational guides to troubleshoot and recover from production failures.

---

## 1. Outage: Sitemaps / Feed Failures
*   **Symptom:** Sitemap/RSS feeds generate 500 error codes.
*   **Triage:** Run `npx tsx scripts/verify-feeds.ts` to log file formatting validations.
*   **Resolution:** Revert any JSON files containing formatting errors or missing fields.

## 2. Outage: Broken Search / AI Assistants
*   **Symptom:** Search queries return empty results or AI responses hang.
*   **Triage:** Inspect search API logs (`/api/search`) to confirm indices match.
*   **Resolution:** Check for circular dependency loops in `lib/registry.ts` and restart build pipelines.
