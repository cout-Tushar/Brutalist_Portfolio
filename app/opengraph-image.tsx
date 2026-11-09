import { ImageResponse } from "next/og";
export const alt =
  "Tushar Mishra — Backend / Full-Stack Developer. Engineering with intent.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#111310",
        color: "#eeeee5",
        display: "flex",
        flexDirection: "column",
        padding: 70,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 21,
          color: "#d0ed8c",
        }}
      >
        <span>TUSHAR MISHRA</span>
        <span>BACKEND / FULL-STACK DEVELOPER</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 88,
          letterSpacing: -5,
          lineHeight: 1.05,
          marginTop: 80,
        }}
      >
        <span>Built to work.</span>
        <span style={{ color: "#d0ed8c" }}>Engineered to connect.</span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 20,
          color: "#a2a69a",
          marginTop: 65,
        }}
      >
        SYSTEMS · REAL-TIME APPLICATIONS · DEVELOPER TOOLS
      </div>
    </div>,
    size,
  );
}
