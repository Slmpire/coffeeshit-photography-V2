"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TOOLS = [
    {
        name: "Photoshop",
        category: "Image Editing",
        description:
            "Industry-standard retouching and compositing for professional-grade final images.",
    },
    {
        name: "Lightroom",
        category: "Photo Management & Colour Grading",
        description:
            "Cinematic colour grading and batch editing for consistent, signature tones across every gallery.",
    },
    {
        name: "Evoto",
        category: "AI-Powered Retouching",
        description:
            "AI-driven skin retouching that delivers flawless results while keeping every subject looking natural.",
    },
    {
        name: "Pixieset",
        category: "Client Gallery Delivery",
        description:
            "Beautiful private galleries where clients receive, download, and order prints from their sessions.",
    },
];

export default function Tools() {
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
                        Stack & Tools
                    </span>
                </motion.div>

                {/* Heading + list grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">

                    {/* Heading */}
                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: 80, opacity: 0 }}
                            animate={inView ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                            className="text-5xl md:text-6xl font-extrabold leading-[0.95] tracking-tight"
                        >
                            How I
                            <br />
                            <span className="text-white/20">Create</span>
                        </motion.h2>
                    </div>

                    {/* Tools list */}
                    <div className="lg:col-span-2 divide-y divide-white/5">
                        {TOOLS.map((tool, idx) => (
                            <motion.div
                                key={tool.name}
                                initial={{ opacity: 0, x: 20 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.1 * idx }}
                                className="group py-8 flex gap-6 items-start hover:pl-2 transition-all duration-300"
                            >
                                {/* Number */}
                                <span className="text-[10px] text-amber-500/40 font-mono mt-1 flex-shrink-0">
                                    {String(idx + 1).padStart(2, "0")}
                                </span>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-amber-300 transition-colors duration-300">
                                            {tool.name}
                                        </h3>
                                        <span className="text-[9px] text-white/20 uppercase tracking-[0.3em] hidden sm:block">
                                            {tool.category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-white/40 font-light leading-relaxed">
                                        {tool.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}