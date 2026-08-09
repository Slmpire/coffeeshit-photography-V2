"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { StoryTellerDocument } from "@/prismicio-types";

const FALLBACK_IMAGES = [
    "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
    "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
    "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
    "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
];

interface TheVoiceProps {
    storyTellerImages: StoryTellerDocument[];
}

export default function TheVoice({ storyTellerImages }: TheVoiceProps) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    // Get images from Prismic or fall back
    const prismicImages =
        storyTellerImages?.[0]?.data?.images
            ?.filter((img) => img?.image?.url)
            ?.map((img) => ({
                url: img.image.url!,
                alt: img.image.alt ?? "CoffeeShotIt photography",
            })) ?? [];

    const displayImages =
        prismicImages.length > 0
            ? prismicImages
            : FALLBACK_IMAGES.map((url) => ({
                  url,
                  alt: "CoffeeShotIt photography",
              }));

    return (
        <section
            ref={ref}
            className="w-full bg-black text-white py-24 md:py-32 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3 mb-16"
                >
                    <div className="h-px w-10 bg-amber-400/60" />
                    <span className="text-[10px] text-amber-400 uppercase tracking-[0.5em]">
                        The Storyteller
                    </span>
                </motion.div>

                {/* Quote */}
                <div className="max-w-4xl mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        className="text-2xl md:text-4xl lg:text-5xl font-light leading-[1.3] text-white/80 tracking-tight"
                    >
                        "Through my lens, light becomes
                        <span className="text-white"> poetry</span>, love leaves
                        its trace, and{" "}
                        <span className="text-amber-400">time stands still.</span>"
                    </motion.p>

                    {/* Signature */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex items-center gap-4 mt-8"
                    >
                        <div className="h-px w-10 bg-white/10" />
                        <span className="signature-font text-2xl text-white/40">
                            Coffee
                        </span>
                        <span className="text-[9px] text-white/20 uppercase tracking-[0.4em]">
                            Since 2020
                        </span>
                    </motion.div>
                </div>

                {/* Image grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {displayImages.slice(0, 4).map((image, idx) => {
                        // Vary heights for editorial feel
                        const heights = [
                            "h-64 md:h-96",
                            "h-48 md:h-72",
                            "h-56 md:h-80",
                            "h-64 md:h-96",
                        ];

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.1 * idx,
                                    ease: [0.76, 0, 0.24, 1],
                                }}
                                className={`relative overflow-hidden rounded-xl ${heights[idx]} ${
                                    idx === 1 ? "mt-8" : idx === 2 ? "mt-4" : ""
                                }`}
                            >
                                <Image
                                    src={image.url}
                                    alt={image.alt}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors duration-500" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}