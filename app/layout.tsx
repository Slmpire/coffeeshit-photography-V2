import type React from "react";
import type { Metadata } from "next";
import { Dancing_Script, Raleway } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/sonner";

const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-dancing-script",
});

const raleway = Raleway({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-raleway",
});

export const metadata: Metadata = {
    title: {
        default: "CoffeeShotIt — Professional Photography in Nigeria",
        template: "%s | CoffeeShotIt",
    },
    description:
        "Professional photography services in Nigeria. Weddings, events, studio portraits, proposals, and outdoor shoots. Book Coffee today.",
    keywords: [
        "photography Nigeria",
        "wedding photographer Lagos",
        "event photographer Nigeria",
        "portrait photography Lagos",
        "professional photographer Nigeria",
        "CoffeeShotIt",
    ],
    authors: [{ name: "CoffeeShotIt" }],
    creator: "CoffeeShotIt",
    metadataBase: new URL("https://coffeeshotit.com"),
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        locale: "en_NG",
        url: "https://coffeeshotit.com",
        siteName: "CoffeeShotIt",
        title: "CoffeeShotIt — Professional Photography in Nigeria",
        description:
            "Weddings, events, portraits, proposals. Capture every moment with CoffeeShotIt.",
        images: [
            {
                url: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
                width: 1200,
                height: 630,
                alt: "CoffeeShotIt Photography",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "CoffeeShotIt — Professional Photography in Nigeria",
        description: "Weddings, events, portraits, proposals. Book Coffee today.",
        images: ["https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress"],
        creator: "@coffeeshotit",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="https://images.prismic.io/coffeeshotit/aHEac0MqNJQqHzKY_CoffeeLogo-nobg.png?auto=format,compress&w=32&h=32"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="https://images.prismic.io/coffeeshotit/aHEac0MqNJQqHzKY_CoffeeLogo-nobg.png?auto=format,compress&w=180&h=180"
                />
                <link rel="preconnect" href="https://images.prismic.io" />
                <meta name="theme-color" content="#000000" />
            </head>
            <body
                className={`${raleway.variable} ${dancingScript.variable} font-[family-name:var(--font-raleway)] bg-black text-white overflow-x-hidden antialiased`}
            >
                <Provider>
                    <Header />
                    <main className="min-h-screen">
                        {children}
                    </main>
                    <Footer />
                    <Toaster position="bottom-right" />
                </Provider>
            </body>
        </html>
    );
}