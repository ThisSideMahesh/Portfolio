# Maintenance Guide

This document describes how to update portfolio information, add blog posts, and manage data files.

---

## 1. Updating Content Files
All contents are stored in JSON/MDX datasets under `/content`:
*   **Projects:** Edit `content/projects/` markdown/json files.
*   **Blogs:** Add new posts in `content/blogs/`. Make sure slugs are unique and titles match the standard SEO tags.
*   **Experiences:** Update data files under `content/experiences/`.

## 2. Dynamic Search Indices
After modifying or adding entries, compile a test build locally to confirm sitemaps and search indexes generate correctly.
