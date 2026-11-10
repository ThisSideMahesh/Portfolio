import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    // Content Security Policy. The site has no forms, no accounts and no third-party scripts, fonts or
    // images (next/font self-hosts the fonts), so almost everything is limited to its own origin.
    // 'unsafe-inline' stays on scripts and styles because Next.js writes small inline scripts (the
    // streamed page data) and a nonce would force every page to render per request, which would give
    // up the static, cached pages. With no user input anywhere there is nothing to inject; if forms are
    // ever added, move to a nonce set in proxy.ts (docs: guides/content-security-policy).
    // Production only: the dev server needs eval and a websocket for hot reload.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "media-src 'self'",
      "object-src 'none'",
      "manifest-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    const common = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "DENY" }, // older browsers; frame-ancestors covers the rest
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "X-DNS-Prefetch-Control", value: "off" },
      {
        key: "Permissions-Policy",
        value: "accelerometer=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=(), interest-cohort=()",
      },
    ];
    const production =
      process.env.NODE_ENV === "production"
        ? [
            { key: "Content-Security-Policy", value: csp },
            { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          ]
        : [];
    return [{ source: "/:path*", headers: [...common, ...production] }];
  },
};

export default nextConfig;
