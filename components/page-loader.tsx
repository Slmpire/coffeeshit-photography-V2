"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PageLoader() {
    const [slow, setSlow] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setSlow(true), 4000);
        return () => clearTimeout(t);
    }, []);

    return (
        <div
            role="status"
            aria-live="polite"
            aria-label="Loading"
            className="fixed inset-0 z-[90] bg-black flex flex-col items-center justify-center gap-8 px-6"
        >
            {/* Soft gold glow */}
            <div className="absolute w-[420px] h-[420px] rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

            {/* Signature traces itself, fills with gold, fades, repeats */}
            <svg
                viewBox="0 0 700 180"
                xmlns="http://www.w3.org/2000/svg"
                className="relative w-[70vw] max-w-md"
                aria-hidden="true"
            >
                <motion.text
                    x="50%"
                    y="78%"
                    textAnchor="middle"
                    fontSize="150"
                    fontWeight="700"
                    stroke="#D4A843"
                    strokeWidth="1.2"
                    fill="#D4A843"
                    strokeDasharray={3000}
                    style={{
                        fontFamily:
                            "var(--font-dancing-script), 'Dancing Script', cursive",
                    }}
                    initial={{ strokeDashoffset: 3000, fillOpacity: 0 }}
                    animate={{
                        strokeDashoffset: [3000, 0, 0, 0, 0],
                        fillOpacity: [0, 0, 1, 1, 0],
                    }}
                    transition={{
                        duration: 3.2,
                        times: [0, 0.5, 0.7, 0.88, 1],
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                >
                    Coffee
                </motion.text>
            </svg>

            {/* Indeterminate progress bar */}
            <div className="relative w-48 h-px bg-white/10 overflow-hidden rounded-full">
                <motion.div
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "300%" }}
                    transition={{
                        duration: 1.4,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                />
            </div>

            {/* Status text */}
            <div className="relative h-10 flex flex-col items-center gap-2">
                <span className="text-[10px] text-white/30 uppercase tracking-[0.5em]">
                    Loading
                </span>
                {slow && (
                    <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] text-amber-400/60 tracking-[0.2em] text-center"
                    >
                        Still loading — thanks for your patience
                    </motion.span>
                )}
            </div>
        </div>
    );
}