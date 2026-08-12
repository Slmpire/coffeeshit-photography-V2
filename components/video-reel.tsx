"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";

// Replace this with Coffee's actual YouTube video ID
// e.g. for https://youtube.com/watch?v=dQw4w9WgXcQ the ID is dQw4w9WgXcQ
const VIDEO_ID = "dQw4w9WgXcQ";

export default function VideoReel() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

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
                        In Motion
                    </span>
                </motion.div>

                {/* Heading */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-12">
                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: 80, opacity: 0 }}
                            animate={inView ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                            className="text-5xl md:text-6xl font-extrabold leading-[0.95] tracking-tight"
                        >
                            See the moments
                            <br />
                            <span className="text-white/20">come alive.</span>
                        </motion.h2>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-white/40 text-base font-light leading-relaxed max-w-sm md:ml-auto"
                    >
                        A highlight reel of the moments, emotions, and stories
                        captured through Coffee's lens.
                    </motion.p>
                </div>

                {/* Video embed */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative w-full rounded-2xl overflow-hidden bg-black aspect-video"
                >
                    <iframe
                        src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=0&mute=1&loop=1&playlist=${VIDEO_ID}&controls=1&modestbranding=1&rel=0`}
                        title="CoffeeShotIt Highlight Reel"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                    />
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8 pt-8 border-t border-white/5"
                >
                    <p className="text-white/30 text-sm">
                        Watch more on YouTube
                    </p>
                    
                        <a href="https://youtube.com/@coffeeshotit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300"
                    >
                        <span className="text-xs uppercase tracking-[0.2em]">
                            @coffeeshotit
                        </span>
                        <ArrowUpRight size={14} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}