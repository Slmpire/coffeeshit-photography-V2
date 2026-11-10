"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const BASE = "https://res.cloudinary.com/slmedia/video/upload";
const VERSION_AND_ID = "v1794214131/IMG_4948_szin70";

// Cloudinary delivers a compressed, right-sized file per format
const VIDEO_MP4 = `${BASE}/f_mp4,vc_h264,q_auto,w_1280/${VERSION_AND_ID}.mp4`;
const VIDEO_WEBM = `${BASE}/f_webm,q_auto,w_1280/${VERSION_AND_ID}.webm`;
// First frame as a poster so there's no black box while loading
const POSTER = `${BASE}/so_0,f_jpg,q_auto,w_1280/${VERSION_AND_ID}.jpg`;

export default function VideoReel() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            className="w-full bg-black text-white py-16 sm:py-20 md:py-32 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3 mb-10 md:mb-16"
                >
                    <div className="h-px w-10 bg-amber-400/60" />
                    <span className="text-[10px] text-amber-400 uppercase tracking-[0.5em]">
                        In Motion
                    </span>
                </motion.div>

                {/* Heading */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-end mb-8 md:mb-12">
                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: 80, opacity: 0 }}
                            animate={inView ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[0.95] tracking-tight"
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
                        className="text-white/40 text-sm sm:text-base font-light leading-relaxed max-w-sm md:ml-auto"
                    >
                        A highlight reel of the moments, emotions, and stories
                        captured through Coffee&apos;s lens.
                    </motion.p>
                </div>

                {/* Video */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black"
                >
                    <video
                        className="absolute inset-0 w-full h-full object-contain"
                        poster={POSTER}
                        controls
                        playsInline
                        preload="metadata"
                    >
                        <source src={VIDEO_WEBM} type="video/webm" />
                        <source src={VIDEO_MP4} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8 pt-8 border-t border-white/5"
                >
                    <p className="text-white/30 text-sm">Watch more on YouTube</p>
                    <a
                        href="https://youtube.com/@coffeeshotit"
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