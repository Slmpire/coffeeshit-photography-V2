"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function IntroAnimation() {
    const [show, setShow] = useState(false);
    const [filled, setFilled] = useState(false);
    const [exiting, setExiting] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Only show on the homepage
        if (pathname !== "/") {
            setShow(false);
            return;
        }

        // Show every time the homepage is entered/reloaded
        setShow(true);
        setFilled(false);
        setExiting(false);

        // Trace completes
        const fillTimer = setTimeout(() => {
            setFilled(true);
        }, 2200);

        // Start exit animation
        const exitTimer = setTimeout(() => {
            setExiting(true);
        }, 3200);

        // Remove overlay
        const removeTimer = setTimeout(() => {
            setShow(false);
        }, 3900);

        return () => {
            clearTimeout(fillTimer);
            clearTimeout(exitTimer);
            clearTimeout(removeTimer);
        };
    }, [pathname]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    key="intro"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center gap-4"
                >
                    {/* SVG traced signature */}
                    <svg
                        viewBox="0 0 700 180"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[85vw] max-w-2xl"
                    >
                        <motion.text
                            x="50%"
                            y="78%"
                            textAnchor="middle"
                            fontFamily="Dancing Script, cursive"
                            fontWeight="700"
                            fontSize="150"
                            fill="none"
                            stroke="#D4A843"
                            strokeWidth="1.2"
                            initial={{
                                strokeDasharray: 4000,
                                strokeDashoffset: 4000,
                            }}
                            animate={{
                                strokeDashoffset: 0,
                            }}
                            transition={{
                                duration: 2.2,
                                ease: [0.4, 0, 0.2, 1],
                            }}
                        >
                            Coffee
                        </motion.text>

                        {/* Fill layer */}
                        <text
                            x="50%"
                            y="78%"
                            textAnchor="middle"
                            fontFamily="Dancing Script, cursive"
                            fontWeight="700"
                            fontSize="150"
                            fill="#D4A843"
                            stroke="none"
                            style={{
                                opacity: filled ? 1 : 0,
                                transition: "opacity 0.8s ease-in-out",
                            }}
                        >
                            Coffee
                        </text>
                    </svg>

                    {/* Shotit wordmark */}
                    <div
                        style={{
                            opacity: filled ? 1 : 0,
                            transform: filled
                                ? "translateY(0)"
                                : "translateY(8px)",
                            transition: "all 0.6s ease-out",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                        }}
                    >
                        <div
                            style={{
                                height: 1,
                                width: 32,
                                background: "rgba(212,168,67,0.4)",
                            }}
                        />

                        <span
                            style={{
                                fontSize: "9px",
                                color: "rgba(212,168,67,0.6)",
                                textTransform: "uppercase",
                                letterSpacing: "0.6em",
                                fontFamily: "inherit",
                                fontWeight: 300,
                            }}
                        >
                            Shotit Media
                        </span>

                        <div
                            style={{
                                height: 1,
                                width: 32,
                                background: "rgba(212,168,67,0.4)",
                            }}
                        />
                    </div>

                    {/* Bottom tagline */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: 32,
                            opacity: filled ? 1 : 0,
                            transition: "opacity 0.6s ease-out 0.3s",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "9px",
                                color: "rgba(255,255,255,0.15)",
                                textTransform: "uppercase",
                                letterSpacing: "0.5em",
                            }}
                        >
                            Capturing reality · Crafting memories
                        </span>
                    </div>

                    {/* Exit curtain */}
                    {exiting && (
                        <motion.div
                            className="absolute inset-0 bg-black"
                            initial={{ y: "100%" }}
                            animate={{ y: "0%" }}
                            transition={{
                                duration: 0.6,
                                ease: [0.76, 0, 0.24, 1],
                            }}
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}