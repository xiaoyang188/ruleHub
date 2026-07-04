import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          borderRadius: 32,
          fontSize: 72,
          fontWeight: 800,
          letterSpacing: -2,
        }}
      >
        <span style={{ color: "#ededed" }}>rule</span>
        <span style={{ color: "#d99178" }}>hub</span>
      </div>
    ),
    { ...size }
  );
}
