import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#050506",
          backgroundImage:
            "radial-gradient(900px 500px at 75% 120%, rgba(233,236,240,0.16), transparent)",
          color: "#ececee",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#9a9ca2", letterSpacing: 6 }}>
          / UM PONTO NO ESPAÇO
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 24 }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 40, color: "#c9ccd3", marginTop: 12 }}>
          {profile.title}
        </div>
      </div>
    ),
    { ...size },
  );
}
