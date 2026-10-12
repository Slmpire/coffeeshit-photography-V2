"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    Globe,
    BadgeCheck,
    ArrowDown,
} from "lucide-react";
import { HomepageImageCollageDocument } from "@/prismicio-types";

// ─────────────────────────────────────────────
// Fallback images
// ─────────────────────────────────────────────

const FALLBACK_IMAGES = [
    "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
    "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
    "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
    "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
    "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
    "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
];

// ─────────────────────────────────────────────
// Bottom information items
// ─────────────────────────────────────────────

const INFO_ITEMS = [
    {
        icon: MapPin,
        label: "BASED IN LAGOS, NIGERIA",
        color: "text-amber-400",
    },
    {
        icon: Globe,
        label: "AVAILABLE WORLDWIDE",
        color: "text-white/60",
    },
    {
        icon: BadgeCheck,
        label: "PHOTOGRAPHER · CREATIVE DIRECTOR",
        color: "text-amber-400",
    },
];

// ─────────────────────────────────────────────
// Desktop image grouping
// ─────────────────────────────────────────────

function chunkIntoThrees(images: string[]) {
    const chunks: string[][] = [];

    for (let i = 0; i < images.length; i += 3) {
        const chunk = images.slice(i, i + 3);

        while (chunk.length < 3 && images.length > 0) {
            chunk.push(images[(i + chunk.length) % images.length]);
        }

        if (chunk.length > 0) {
            chunks.push(chunk);
        }
    }

    return chunks;
}

// ─────────────────────────────────────────────
// Film grain overlay
// ─────────────────────────────────────────────

function FilmGrain() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 opacity-[0.025]"
            style={{
                backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E")',
                backgroundRepeat: "repeat",
                backgroundSize: "128px",
            }}
        />
    );
}

// ─────────────────────────────────────────────
// Shared bottom information bar
// ─────────────────────────────────────────────

function InfoBar({ loaded }: { loaded: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
                opacity: loaded ? 1 : 0,
                y: loaded ? 0 : 30,
            }}
            transition={{ delay: 2, duration: 1 }}
            className="relative z-30 border-t border-white/10 bg-black/40 backdrop-blur-sm"
        >
            <div className="grid grid-cols-3 divide-x divide-white/10">
                {INFO_ITEMS.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.label}
                            className="flex flex-col items-center justify-center gap-2 px-1 py-4 sm:px-2 sm:py-5"
                        >
                            <Icon className={`h-4 w-4 ${item.color}`} />

                            <span className="max-w-full text-center text-[8px] leading-relaxed tracking-[0.12em] text-white/50 sm:text-[10px] sm:tracking-[0.2em]">
                                {item.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}

// ─────────────────────────────────────────────
// Shared hero content
// ─────────────────────────────────────────────

function HeroContent({ loaded }: { loaded: boolean }) {
    return (
        <div className="flex flex-1 flex-col items-center justify-center px-4 pt-16 text-center sm:pt-20">
            {/* Eyebrow */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: loaded ? 1 : 0,
                    y: loaded ? 0 : 20,
                }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mb-7 flex items-center gap-3 sm:mb-8"
            >
                <div className="h-px w-6 bg-amber-400/60 sm:w-10" />

                <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-amber-400 sm:text-[10px] sm:tracking-[0.5em]">
                    Professional Photography
                </span>

                <div className="h-px w-6 bg-amber-400/60 sm:w-10" />
            </motion.div>

            {/* Main title */}
            <div className="mb-3 overflow-hidden sm:mb-4">
                <motion.h1
                    initial={{ y: 120, opacity: 0 }}
                    animate={{
                        y: loaded ? 0 : 120,
                        opacity: loaded ? 1 : 0,
                    }}
                    transition={{
                        delay: 0.6,
                        duration: 1.2,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                    className="signature-font text-[clamp(4rem,14vw,12rem)] leading-[0.85] text-white drop-shadow-2xl"
                >
                    Coffee
                </motion.h1>
            </div>

            {/* Wordmark */}
            <div className="mb-7 overflow-hidden sm:mb-10">
                <motion.div
                    initial={{ y: 60, opacity: 0 }}
                    animate={{
                        y: loaded ? 0 : 60,
                        opacity: loaded ? 1 : 0,
                    }}
                    transition={{
                        delay: 0.9,
                        duration: 1,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                    className="flex items-center gap-3 sm:gap-4"
                >
                    <div className="h-px w-7 bg-white/20 sm:w-16" />

                    <span className="text-[10px] font-light uppercase tracking-[0.4em] text-white/50 sm:text-sm sm:tracking-[0.6em]">
                        Shotit Media
                    </span>

                    <div className="h-px w-7 bg-white/20 sm:w-16" />
                </motion.div>
            </div>

            {/* Tagline */}
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{
                    opacity: loaded ? 1 : 0,
                    y: loaded ? 0 : 30,
                }}
                transition={{ delay: 1.4, duration: 1 }}
                className="mb-9 max-w-sm text-[10px] font-light uppercase leading-relaxed tracking-[0.2em] text-white/60 sm:mb-12 sm:max-w-xl sm:text-sm sm:tracking-[0.3em]"
            >
                Capturing reality · Crafting memories · Shooting magic
            </motion.p>

            {/* CTAs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: loaded ? 1 : 0,
                    y: loaded ? 0 : 20,
                }}
                transition={{ delay: 1.7, duration: 0.8 }}
                className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
            >
                <Link
                    href="/booking"
                    className="rounded-full bg-amber-500 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-amber-400"
                >
                    Book a Session
                </Link>

                <Link
                    href="/portfolio"
                    className="rounded-full border border-white/20 bg-transparent px-8 py-3.5 text-xs font-light uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-white/50"
                >
                    View Work
                </Link>
            </motion.div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Mobile layout: original single-image slider
// ─────────────────────────────────────────────

function MobileHero({
    images,
    loaded,
}: {
    images: string[];
    loaded: boolean;
}) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const interval = window.setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 6000);

        return () => window.clearInterval(interval);
    }, [images.length]);

    return (
        <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-black md:hidden">
            {/* Background slider */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="sync">
                    <motion.div
                        key={current}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.06 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 1.8, ease: "easeInOut" }}
                    >
                        <Image
                            src={images[current]}
                            alt="CoffeeShotIt photography"
                            fill
                            priority={current === 0}
                            sizes="100vw"
                            className="object-cover"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Original mobile overlays */}
                <div className="absolute inset-0 z-10 bg-black/55" />

                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-black/30" />

                <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
            </div>

            <FilmGrain />

            {/* Side label */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute right-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 min-[400px]:flex"
            >
                <span className="text-[8px] uppercase tracking-[0.3em] text-white/30 [writing-mode:vertical-rl]">
                    Lagos · Nigeria
                </span>

                <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </motion.div>

            {/* Main content */}
            <div className="relative z-30 flex min-h-[100svh] flex-1 flex-col">
                <HeroContent loaded={loaded} />

                <InfoBar loaded={loaded} />
            </div>

            {/* Image counter */}
            {images.length > 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: loaded ? 1 : 0 }}
                    transition={{ delay: 2.2, duration: 1 }}
                    className="absolute bottom-[112px] right-4 z-30 flex items-center gap-2 sm:bottom-[120px] sm:right-6"
                >
                    <span className="font-mono text-[10px] text-amber-400">
                        {String(current + 1).padStart(2, "0")}
                    </span>

                    <div className="flex items-center gap-1.5">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setCurrent(i)}
                                aria-label={`Go to image ${i + 1}`}
                                aria-current={i === current ? "true" : undefined}
                                className={`rounded-full transition-all duration-500 ${
                                    i === current
                                        ? "h-1 w-5 bg-amber-400"
                                        : "h-1 w-1 bg-white/40 hover:bg-white/70"
                                }`}
                            />
                        ))}
                    </div>

                    <span className="font-mono text-[10px] text-white/40">
                        {String(images.length).padStart(2, "0")}
                    </span>
                </motion.div>
            )}

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-[92px] left-1/2 z-30 flex -translate-x-1/2 flex-col items-center sm:bottom-[100px]"
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.8,
                        ease: "easeInOut",
                    }}
                >
                    <ArrowDown className="h-4 w-4 text-white/40" />
                </motion.div>
            </motion.div>
        </section>
    );
}

// ─────────────────────────────────────────────
// Desktop and landscape layout: three panels
// ─────────────────────────────────────────────

function DesktopHero({
    imageSets,
    loaded,
}: {
    imageSets: string[][];
    loaded: boolean;
}) {
    const [current, setCurrent] = useState(0);

    const activeSet = imageSets[current] ?? imageSets[0];

    useEffect(() => {
        if (imageSets.length <= 1) return;

        const interval = window.setInterval(() => {
            setCurrent((prev) => (prev + 1) % imageSets.length);
        }, 7000);

        return () => window.clearInterval(interval);
    }, [imageSets.length]);

    if (!activeSet) return null;

    return (
        <section className="relative hidden h-screen min-h-[600px] w-full overflow-hidden bg-black md:flex md:flex-col">
            {/* Three-panel cinematic background */}
            <AnimatePresence mode="sync">
                <motion.div
                    key={current}
                    className="absolute inset-0 z-0 flex gap-[2px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                >
                    {activeSet.map((src, idx) => (
                        <motion.div
                            key={`${current}-${idx}-${src}`}
                            className="relative flex-1 overflow-hidden bg-black"
                            initial={{ scale: 1.08 }}
                            animate={{ scale: 1 }}
                            transition={{
                                duration: 8,
                                ease: "easeOut",
                                delay: idx * 0.15,
                            }}
                        >
                            <Image
                                src={src}
                                alt={`CoffeeShotIt photography ${idx + 1}`}
                                fill
                                sizes="33vw"
                                quality={90}
                                priority={current === 0 && idx === 0}
                                className="object-contain"
                            />

                            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.5)]" />

                            <motion.div
                                className="absolute inset-0"
                                animate={{
                                    y: idx % 2 === 0 ? [0, -12, 0] : [0, 12, 0],
                                }}
                                transition={{
                                    duration: 10 + idx * 2,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Overlays */}
            <div className="absolute inset-0 z-10 bg-black/45" />

            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-black/30" />

            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

            {/* Panel dividers */}
            <div className="pointer-events-none absolute inset-0 z-10 flex">
                <div className="flex-1" />

                <div className="h-full w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                <div className="flex-1" />

                <div className="h-full w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                <div className="flex-1" />
            </div>

            <FilmGrain />

            {/* Left side label */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
            >
                <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 [writing-mode:vertical-rl] rotate-180">
                    Scroll to Explore
                </span>

                <div className="h-16 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </motion.div>

            {/* Right side label */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
            >
                <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 [writing-mode:vertical-rl]">
                    Lagos · Nigeria
                </span>

                <div className="h-16 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </motion.div>

            {/* Main content */}
            <div className="relative z-30 flex h-full flex-1 flex-col">
                <HeroContent loaded={loaded} />

                <InfoBar loaded={loaded} />
            </div>

            {/* Image-set counter */}
            {imageSets.length > 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: loaded ? 1 : 0 }}
                    transition={{ delay: 2.2, duration: 1 }}
                    className="absolute bottom-24 right-10 z-30 hidden items-center gap-3 md:flex"
                >
                    <span className="font-mono text-xs text-amber-400">
                        {String(current + 1).padStart(2, "0")}
                    </span>

                    <div className="flex gap-1.5">
                        {imageSets.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setCurrent(i)}
                                aria-label={`Go to image set ${i + 1}`}
                                aria-current={i === current ? "true" : undefined}
                                className={`rounded-full transition-all duration-500 ${
                                    i === current
                                        ? "h-1 w-6 bg-amber-400"
                                        : "h-1 w-1 bg-white/30 hover:bg-white/60"
                                }`}
                            />
                        ))}
                    </div>

                    <span className="font-mono text-xs text-white/30">
                        {String(imageSets.length).padStart(2, "0")}
                    </span>
                </motion.div>
            )}

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.8,
                        ease: "easeInOut",
                    }}
                >
                    <ArrowDown className="h-4 w-4 text-white/30" />
                </motion.div>
            </motion.div>
        </section>
    );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

export default function Hero({
    imageCollage,
    slider,
}: {
    imageCollage: HomepageImageCollageDocument[];
    slider: string[];
}) {
    const [loaded, setLoaded] = useState(false);

    // Prefer CMS slider images; fall back when empty.
    const images = useMemo(() => {
        const validImages = (slider ?? []).filter(
            (src): src is string =>
                typeof src === "string" && src.trim().length > 0
        );

        return validImages.length > 0
            ? validImages
            : FALLBACK_IMAGES;
    }, [slider]);

    const imageSets = useMemo(
        () => chunkIntoThrees(images),
        [images]
    );

    // Trigger the entrance animations after mount.
    useEffect(() => {
        const timer = window.setTimeout(() => {
            setLoaded(true);
        }, 100);

        return () => window.clearTimeout(timer);
    }, []);

    // Retain imageCollage in the public props for compatibility
    // with the existing Prismic page implementation.
    void imageCollage;

    return (
        <>
            <MobileHero images={images} loaded={loaded} />

            <DesktopHero
                imageSets={imageSets}
                loaded={loaded}
            />
        </>
    );
}