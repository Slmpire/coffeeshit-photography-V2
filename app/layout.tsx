import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Dancing_Script } from "next/font/google";
import { Raleway } from "next/font/google";
import "./globals.css";
import FloatingBookingButton from "@/components/floating-booking-button";
import Sidebar from "@/components/sidebar";
import ParticleBackground from "@/components/particle-background";
import Header from "@/components/header";
import Provider from "@/components/Provider";
import CustomCursor from "@/components/custom-cursor";
import { createClient } from "@/prismicio";
import { galleryMenusQuery } from "@/lib/query/gallery.query";
import { GalleryTypesDocument } from "@/prismicio-types";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });
const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-dancing-script",
});
const raleway = Raleway({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-raleway",
});

export const metadata: Metadata = {
    title: {
        default:
            "Coffeeshotit Media - Professional Photography & Videography Services",
        template: "%s | Coffeeshotit Media",
    },
    description:
        "Professional photography and videography services in Nigeria. Specializing in weddings, events, studio portraits, and corporate photography. Capture your special moments with Coffeeshotit Media.",
    keywords: [
        "photography",
        "videography",
        "wedding photography",
        "event photography",
        "studio portraits",
        "corporate photography",
        "Nigeria photographer",
        "professional photographer",
        "wedding videographer",
        "event videographer",
        "portrait photography",
        "family photography",
        "engagement photography",
        "birthday photography",
        "proposal photography",
        "Coffeeshotit Media",
    ],
    authors: [{ name: "Coffeeshotit Media" }],
    creator: "Coffeeshotit Media",
    publisher: "Coffeeshotit Media",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL("https://coffeeshotit.com"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://coffeeshotit.com",
        siteName: "Coffeeshotit Media",
        title: "Coffeeshotit Media - Professional Photography & Videography Services",
        description:
            "Professional photography and videography services in Nigeria. Specializing in weddings, events, studio portraits, and corporate photography.",
        images: [
            {
                url: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
                width: 1200,
                height: 630,
                alt: "Coffeeshotit Media - Professional Photography Services",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Coffeeshotit Media - Professional Photography & Videography Services",
        description:
            "Professional photography and videography services in Nigeria. Specializing in weddings, events, studio portraits, and corporate photography.",
        images: [
            "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
        ],
        creator: "@coffeeshotit",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    category: "photography",
    classification: "photography services",
    other: {
        "theme-color": "#000000",
        "msapplication-TileColor": "#000000",
        "apple-mobile-web-app-capable": "yes",
        "apple-mobile-web-app-status-bar-style": "black-translucent",
    },
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const client = createClient();
    const galleryMenus = await galleryMenusQuery(client);

    return (
        <html lang='en'>
            <head>
                {/* Favicon */}
                <link
                    rel='icon'
                    type='image/png'
                    sizes='32x32'
                    href='https://images.prismic.io/coffeeshotit/aHEac0MqNJQqHzKY_CoffeeLogo-nobg.png?auto=format,compress&w=32&h=32'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='16x16'
                    href='https://images.prismic.io/coffeeshotit/aHEac0MqNJQqHzKY_CoffeeLogo-nobg.png?auto=format,compress&w=16&h=16'
                />
                <link
                    rel='apple-touch-icon'
                    sizes='180x180'
                    href='https://images.prismic.io/coffeeshotit/aHEac0MqNJQqHzKY_CoffeeLogo-nobg.png?auto=format,compress&w=180&h=180'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='192x192'
                    href='https://images.prismic.io/coffeeshotit/aHEac0MqNJQqHzKY_CoffeeLogo-nobg.png?auto=format,compress&w=192&h=192'
                />

                {/* Manifest */}
                <link rel='manifest' href='/manifest.json' />

                {/* Preconnect to external domains for performance */}
                <link rel='preconnect' href='https://images.prismic.io' />
                <link rel='dns-prefetch' href='https://images.prismic.io' />
            </head>
            <body
                className={`${raleway.className} ${dancingScript.variable} overflow-x-hidden`}
            >
                <Provider>
                    <ParticleBackground />
                    <div className='min-h-screen bg-black lg:flex  text-white'>
                        <Sidebar
                            galleryMenus={
                                galleryMenus as GalleryTypesDocument[]
                            }
                        />
                        <main className='flex-1 bg-black container mx-auto  transition-all duration-300'>
                            <Header />
                            {children}
                            <FloatingBookingButton />
                            <div className='hidden md:block'>
                                <CustomCursor />
                            </div>
                        </main>
                    </div>
                    <Toaster />
                </Provider>
            </body>
        </html>
    );
}
