"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Globe, BadgeCheck, ArrowDown } from "lucide-react";
import { HomepageImageCollageDocument } from "@/prismicio-types";

// Fallback images
const FALLBACK_IMAGES = [
    "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
    "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
    "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
];

const INFO_ITEMS = [
    {
        icon: <MapPin className="h-4 w-4 text-amber-400" />,
        label: "BASED IN LAGOS, NIGERIA",
    },
    {
        icon: <Globe className="h-4 w-4 text-white/60" />,
        label: "AVAILABLE WORLDWIDE",
    },
    {
        icon: <BadgeCheck className="h-4 w-4 text-amber-400" />,
        label: "PHOTOGRAPHER · CREATIVE DIRECTOR",
    },
];

export default function Hero({
    imageCollage,
    slider,
}: {
    imageCollage: HomepageImageCollageDocument[];
    slider: string[];
}) {
    const [current, setCurrent] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const images = slider?.length > 0 ? slider : FALLBACK_IMAGES;

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className="relative w-full min-h-screen overflow-hidden bg-black">

            {/* ── Background image slider with Ken Burns ── */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="sync">
                    <motion.div
                        key={current}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1.0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    >
                        <Image
                            src={images[current]}
                            alt="CoffeeShotIt photography"
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Layered overlays */}
                <div className="absolute inset-0 bg-black/55 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10" />

                {/* Film grain */}
                <div
                    className="absolute inset-0 z-20 opacity-[0.035] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat",
                        backgroundSize: "128px",
                    }}
                />
            </div>

            {/* ── Vertical side labels (desktop) ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4"
            >
                <span className="text-[9px] text-white/30 uppercase tracking-[0.4em] [writing-mode:vertical-rl] rotate-180">
                    Scroll to Explore
                </span>
                <div className="h-16 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4"
            >
                <span className="text-[9px] text-white/30 uppercase tracking-[0.4em] [writing-mode:vertical-rl]">
                    Lagos · Nigeria
                </span>
                <div className="h-16 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </motion.div>

            {/* ── Main content ── */}
            <div className="relative z-30 flex flex-col min-h-screen">

                {/* Center content */}
                <div className="flex-1 flex flex-col items-center justify-center px-4 text-center pt-20">

                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="flex items-center gap-3 mb-8"
                    >
                        <div className="h-px w-10 bg-amber-400/60" />
                        <span className="text-[10px] text-amber-400 uppercase tracking-[0.5em] font-medium">
                            Professional Photography
                        </span>
                        <div className="h-px w-10 bg-amber-400/60" />
                    </motion.div>

                    {/* Main title */}
                    <div className="overflow-hidden mb-4">
                        <motion.h1
                            initial={{ y: 120, opacity: 0 }}
                            animate={{ y: loaded ? 0 : 120, opacity: loaded ? 1 : 0 }}
                            transition={{ delay: 0.6, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                            className="signature-font text-[clamp(3.5rem,12vw,10rem)] leading-[0.9] text-white"
                        >
                            Coffee
                        </motion.h1>
                    </div>

                    {/* Shotit wordmark */}
                    <div className="overflow-hidden mb-10">
                        <motion.div
                            initial={{ y: 60, opacity: 0 }}
                            animate={{ y: loaded ? 0 : 60, opacity: loaded ? 1 : 0 }}
                            transition={{ delay: 0.9, duration: 1, ease: [0.76, 0, 0.24, 1] }}
                            className="flex items-center gap-4"
                        >
                            <div className="h-px w-8 md:w-16 bg-white/20" />
                            <span className="text-[clamp(0.6rem,1.5vw,0.85rem)] text-white/40 uppercase tracking-[0.6em] font-light">
                                Shotit Media
                            </span>
                            <div className="h-px w-8 md:w-16 bg-white/20" />
                        </motion.div>
                    </div>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }}
                        transition={{ delay: 1.4, duration: 1 }}
                        className="text-white/50 text-xs md:text-sm font-light uppercase tracking-[0.3em] max-w-sm md:max-w-xl leading-relaxed mb-12"
                    >
                        Capturing reality · Crafting memories · Shooting magic
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
                        transition={{ delay: 1.7, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center gap-4"
                    >
                        <Link href="/booking">
                            <motion.button
                                whileHover={{ scale: 1.03, backgroundColor: "#f59e0b" }}
                                whileTap={{ scale: 0.97 }}
                                className="px-8 py-3.5 bg-amber-500 text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300"
                            >
                                Book a Session
                            </motion.button>
                        </Link>
                        <Link href="/portfolio">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-8 py-3.5 bg-transparent border border-white/20 hover:border-white/50 text-white text-xs font-light uppercase tracking-[0.2em] rounded-full transition-all duration-300"
                            >
                                View Work
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>

                {/* ── Bottom bar ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="relative z-30 border-t border-white/10"
                >
                    <div className="grid grid-cols-3 divide-x divide-white/10">
                        {INFO_ITEMS.map((item, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center justify-center gap-2 py-5 px-2"
                            >
                                {item.icon}
                                <span className="text-[9px] md:text-[10px] text-white/50 uppercase tracking-[0.2em] text-center leading-relaxed">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* ── Image counter (desktop) ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ delay: 2.2, duration: 1 }}
                className="hidden md:flex absolute bottom-20 right-8 z-30 items-center gap-3"
            >
                <span className="text-amber-400 font-mono text-xs">
                    {String(current + 1).padStart(2, "0")}
                </span>
                <div className="flex gap-1.5">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`transition-all duration-500 rounded-full ${
                                i === current
                                    ? "w-6 h-1 bg-amber-400"
                                    : "w-1 h-1 bg-white/30 hover:bg-white/60"
                            }`}
                            aria-label={`Go to image ${i + 1}`}
                        />
                    ))}
                </div>
                <span className="text-white/30 font-mono text-xs">
                    {String(images.length).padStart(2, "0")}
                </span>
            </motion.div>

            {/* ── Scroll indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                >
                    <ArrowDown className="h-4 w-4 text-white/30" />
                </motion.div>
            </motion.div>
        </section>
    );
}