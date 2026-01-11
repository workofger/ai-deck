import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Partrunner - Infrastructure & AI Enablement";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
          position: "relative",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(250, 204, 21, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(250, 204, 21, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Yellow gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "300px",
            height: "300px",
            background: "rgba(250, 204, 21, 0.1)",
            borderRadius: "50%",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "10%",
            width: "300px",
            height: "300px",
            background: "rgba(250, 204, 21, 0.1)",
            borderRadius: "50%",
            filter: "blur(80px)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            padding: "40px",
          }}
        >
          {/* Logo text */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "30px",
              padding: "12px 24px",
              background: "#141414",
              borderRadius: "50px",
              border: "1px solid #262626",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#FACC15",
                letterSpacing: "0.1em",
              }}
            >
              PARTRUNNER
            </span>
          </div>

          {/* Main title */}
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#FFFFFF",
              textAlign: "center",
              lineHeight: 1.1,
              margin: 0,
              marginBottom: "16px",
            }}
          >
            This isn&apos;t another{" "}
            <span
              style={{
                color: "#FACC15",
              }}
            >
              AI demo
            </span>
            .
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "28px",
              color: "#A3A3A3",
              textAlign: "center",
              margin: 0,
              marginBottom: "40px",
            }}
          >
            This is what it{" "}
            <span style={{ color: "#FACC15", fontWeight: 500 }}>actually</span>{" "}
            takes.
          </p>

          {/* Divider - Yellow */}
          <div
            style={{
              width: "120px",
              height: "4px",
              background: "#FACC15",
              borderRadius: "2px",
              marginBottom: "30px",
            }}
          />

          {/* Footer */}
          <p
            style={{
              fontSize: "18px",
              color: "#737373",
              textAlign: "center",
            }}
          >
            Infrastructure & AI Enablement • Technical Report
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
