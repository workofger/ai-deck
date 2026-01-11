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
          background: "linear-gradient(135deg, #0F1729 0%, #1A2744 50%, #0F1729 100%)",
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
              linear-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(37, 99, 235, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "300px",
            height: "300px",
            background: "rgba(37, 99, 235, 0.2)",
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
            background: "rgba(249, 115, 22, 0.2)",
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
              background: "rgba(26, 39, 68, 0.8)",
              borderRadius: "50px",
              border: "1px solid rgba(45, 63, 95, 0.8)",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#FFFFFF",
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
                background: "linear-gradient(135deg, #2563EB 0%, #F97316 100%)",
                backgroundClip: "text",
                color: "transparent",
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
              color: "#94A3B8",
              textAlign: "center",
              margin: 0,
              marginBottom: "40px",
            }}
          >
            This is what it{" "}
            <span style={{ color: "#F97316", fontWeight: 500 }}>actually</span>{" "}
            takes.
          </p>

          {/* Divider */}
          <div
            style={{
              width: "120px",
              height: "4px",
              background: "linear-gradient(90deg, #2563EB, #F97316)",
              borderRadius: "2px",
              marginBottom: "30px",
            }}
          />

          {/* Footer */}
          <p
            style={{
              fontSize: "18px",
              color: "#64748B",
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

