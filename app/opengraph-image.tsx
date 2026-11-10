import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: tech, teaching and management`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DOORS = [
  { label: "Tech", bg: "#2d3e57" },
  { label: "Teaching", bg: "#3b5949" },
  { label: "Management", bg: "#8a3a48" },
  { label: "Digital Creator", bg: "#c44d00" },
] as const;

/**
 * The link preview shown when the site is shared (LinkedIn, WhatsApp, X). Same palette as the
 * opening animation: warm near-black, one orange accent, one pill per door.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#171514",
          color: "#ece7e1",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, color: "#a39a91" }}>
          <div style={{ width: 14, height: 14, borderRadius: 14, background: "#ff7a1a" }} />
          {site.username}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{site.name}</div>
          <div style={{ marginTop: 24, fontSize: 40, color: "#a39a91" }}>Tech, teaching and management.</div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {DOORS.map((door) => (
            <div key={door.label} style={{ display: "flex", background: door.bg, color: "#ffffff", fontSize: 28, padding: "14px 28px", borderRadius: 999 }}>
              {door.label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
