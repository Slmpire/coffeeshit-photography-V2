import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Book a Photography Session — CoffeeShotIt";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "#000000",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                }}
            >
                <img
                    src="https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: 0.35,
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.85))",
                    }}
                />
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 12,
                    }}
                >
                    <div style={{ fontSize: 13, color: "#D4A843", letterSpacing: "0.5em", textTransform: "uppercase" }}>
                        CoffeeShotIt Media
                    </div>
                    <div style={{ fontSize: 72, fontWeight: 800, color: "#ffffff", letterSpacing: "-2px", lineHeight: 1 }}>
                        Book a Session
                    </div>
                    <div style={{ fontSize: 18, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginTop: 8 }}>
                        Wedding · Event · Portrait
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}