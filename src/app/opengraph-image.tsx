import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site-seo";

export const runtime = "edge";
export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 80px",
          background: "linear-gradient(145deg, #0a0a0a 0%, #111111 55%, #1a1210 100%)",
          color: "#ededed",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#d99178",
            marginBottom: 24,
            letterSpacing: "-0.02em",
          }}
        >
          rule<span style={{ color: "#ededed" }}>hub</span>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 900,
            letterSpacing: "-0.03em",
          }}
        >
          Agent Skills 市场
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 28,
            color: "#a3a3a3",
            maxWidth: 820,
            lineHeight: 1.4,
          }}
        >
          发现 Claude / Codex Skills · VibeCoding 项目 · AI 行业动态
        </div>
      </div>
    ),
    { ...size }
  );
}
