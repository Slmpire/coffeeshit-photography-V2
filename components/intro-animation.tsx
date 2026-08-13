"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroAnimation() {
    const [show, setShow] = useState(true);
    const [phase, setPhase] = useState<"drawing" | "hold" | "exit">("drawing");

    useEffect(() => {
        // Drawing phase — 2s
        const holdTimer = setTimeout(() => setPhase("hold"), 2000);
        // Hold phase — 0.8s
        const exitTimer = setTimeout(() => setPhase("exit"), 2800);
        // Remove overlay — 1.2s after exit starts
        const removeTimer = setTimeout(() => setShow(false), 4000);

        return () => {
            clearTimeout(holdTimer);
            clearTimeout(exitTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    key="intro"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
                >
                    {/* Logo drawing effect */}
                    <div className="relative flex flex-col items-center">

                        {/* Main signature text with clip-path reveal */}
                        <div className="relative overflow-hidden">
                            <motion.h1
                                className="signature-font text-[clamp(4rem,15vw,10rem)] text-white leading-none select-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.1 }}
                            >
                                Coffee
                            </motion.h1>

                            {/* Wipe overlay — sweeps left to right revealing the text */}
                            <motion.div
                                className="absolute inset-0 bg-black"
                                initial={{ x: "0%" }}
                                animate={phase === "drawing" ? { x: "105%" } : { x: "105%" }}
                                transition={{
                                    duration: 1.8,
                                    ease: [0.76, 0, 0.24, 1],
                                    delay: 0.2,
                                }}
                            />

                            {/* Writing cursor line */}
                            <motion.div
                                className="absolute top-0 bottom-0 w-0.5 bg-amber-400"
                                initial={{ left: "0%", opacity: 1 }}
                                animate={
                                    phase === "drawing"
                                        ? { left: "100%", opacity: 1 }
                                        : { left: "100%", opacity: 0 }
                                }
                                transition={
                                    phase === "drawing"
                                        ? { duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
                                        : { duration: 0.3 }
                                }
                            />
                        </div>

                        {/* Shotit wordmark — fades in after Coffee is drawn */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={phase !== "drawing" ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="flex items-center gap-3 mt-2"
                        >
                            <div className="h-px w-8 bg-amber-400/40" />
                            <span className="text-[10px] text-amber-400/60 uppercase tracking-[0.6em] font-light">
                                Shotit Media
                            </span>
                            <div className="h-px w-8 bg-amber-400/40" />
                        </motion.div>
                    </div>

                    {/* Bottom tagline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={phase !== "drawing" ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="absolute bottom-10 text-[9px] text-white/20 uppercase tracking-[0.6em]"
                    >
                        Capturing reality · Crafting memories
                    </motion.p>

                    {/* Exit flash — amber line sweeps up */}
                    {phase === "exit" && (
                        <motion.div
                            className="absolute inset-0 bg-black"
                            initial={{ y: "100%" }}
                            animate={{ y: "0%" }}
                            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}