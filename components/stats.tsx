"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { StatsImagesDocument } from "@/prismicio-types";

const STATS = [
    { number: "100+", label: "Projects Done" },
    { number: "6+", label: "Years Experience" },
    { number: "5+", label: "Recognitions" },
    { number: "99%", label: "Happy Clients" },
];

export default function Stats({ statsImages }: { statsImages: StatsImagesDocument }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    const images = useMemo(() => {
        const group = statsImages?.data?.group_one ?? [];
        return [...group, ...group];
    }, [statsImages?.data?.group_one]);

    const animationDuration = useMemo(() => {
        const imageWidth = 220;
        return (images.length * imageWidth) / 60;
    }, [images.length]);

    const largeImage = statsImages?.data?.feature_image?.url;

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
                        By the Numbers
                    </span>
                </motion.div>

                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 border-y border-white/5 py-12">
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 * i }}
                            className="flex flex-col items-center md:items-start gap-2"
                        >
                            <span className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-none">
                                {stat.number}
                            </span>
                            <span className="text-[10px] text-white/30 uppercase tracking-[0.3em]">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Marquee — full width, no container constraint */}
            {images.length > 0 && (
                <div className="w-full overflow-hidden mb-20">
                    <div
                        className="flex gap-4"
                        style={{
                            animation: `marquee-left ${animationDuration}s linear infinite`,
                            width: "max-content",
                        }}
                    >
                        {images.map((imgSrc, index) => (
                            <div
                                key={index}
                                className="w-52 h-52 md:w-64 md:h-64 rounded-xl overflow-hidden flex-shrink-0 bg-white/5"
                            >
                                {imgSrc?.images?.url && (
                                    <Image
                                        src={imgSrc.images.url}
                                        alt="CoffeeShotIt work"
                                        width={256}
                                        height={256}
                                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                        draggable={false}
                                        quality={75}
                                        sizes="256px"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Large feature image */}
            {largeImage && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="relative h-[400px] md:h-[560px] rounded-2xl overflow-hidden"
                    >
                        <Image
                            src={largeImage}
                            alt="CoffeeShotIt featured"
                            fill
                            className="object-cover"
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </motion.div>
                </div>
            )}

            <style jsx>{`
                @keyframes marquee-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
}