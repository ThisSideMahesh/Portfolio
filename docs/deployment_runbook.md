# Deployment Runbook

This document details the configuration maps and setup steps for hosting environments.

---

## 1. Hosting Target: Vercel / Netlify
The platform compiles to a fully static site (SSG), making it suitable for modern CDN hosting:
*   **Build Command:** `npm run build`
*   **Output Directory:** `.next` or `out` (configured via Next.js standard export output settings).
*   **Node.js Engine Version:** `^20` or `^22`.

## 2. Environment Variables configuration
Configure the following keys in your hosting provider's dashboard:
*   `NEXT_PUBLIC_SITE_URL`: Primary canonical domain URL (e.g. `https://thissidemahesh.com`).
*   `NEXT_PUBLIC_ANALYTICS_ID`: (Optional) Production telemetry tracker key.

## 3. Custom Domain & DNS Settings
Verify DNS CNAME and A record parameters are routed cleanly before launching version tags.
