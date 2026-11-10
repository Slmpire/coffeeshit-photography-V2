import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CoffeeShotIt — Professional Photography in Nigeria";
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
                {/* Background image */}
                <img
                    src="https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: 0.4,
                    }}
                />

                {/* Overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))",
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 16,
                    }}
                >
                    {/* Logo text */}
                    <div
                        style={{
                            fontSize: 96,
                            fontWeight: 700,
                            color: "#D4A843",
                            letterSpacing: "-2px",
                            lineHeight: 1,
                        }}
                    >
                        Coffee
                    </div>

                    {/* Divider */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                        }}
                    >
                        <div style={{ width: 40, height: 1, background: "rgba(212,168,67,0.4)" }} />
                        <span
                            style={{
                                fontSize: 13,
                                color: "rgba(212,168,67,0.6)",
                                letterSpacing: "0.4em",
                                textTransform: "uppercase",
                            }}
                        >
                            Shotit Media
                        </span>
                        <div style={{ width: 40, height: 1, background: "rgba(212,168,67,0.4)" }} />
                    </div>

                    {/* Tagline */}
                    <div
                        style={{
                            fontSize: 18,
                            color: "rgba(255,255,255,0.5)",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            marginTop: 8,
                        }}
                    >
                        Professional Photography · Lagos, Nigeria
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 32,
                        display: "flex",
                        alignItems: "center",
                        gap: 24,
                    }}
                >
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
                        Weddings · Events · Portraits · Proposals
                    </span>
                </div>
            </div>
        ),
        { ...size }
    );
}