import { ImageResponse } from "next/og";
import { hero, site } from "@/lib/content";

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time. Edit the copy in src/lib/content.ts.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#F7F8F4",
          color: "#202820",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -140,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "#DCEBDD",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 150,
            top: 170,
            width: 190,
            height: 190,
            borderRadius: 9999,
            background: "radial-gradient(circle at 35% 30%, #A8C7A9, #355B48)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 600 }}>
          <div style={{ width: 30, height: 30, borderRadius: 9999, background: "#789780" }} />
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 780 }}>
          <div style={{ fontSize: 76, lineHeight: 1, letterSpacing: -3, fontWeight: 600 }}>{hero.headline}</div>
          <div style={{ fontSize: 30, color: "#5A635B" }}>{site.role}</div>
        </div>
      </div>
    ),
    size,
  );
}
