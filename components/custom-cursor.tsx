"use client";

import { useEffect, useRef, useCallback } from "react";

export default function EnhancedCustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const trailRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: 0, y: 0 });
    const ring = useRef({ x: 0, y: 0 });
    const trail = useRef({ x: 0, y: 0 });
    // @ts-ignore
    const raf = useRef<number>();
    const isHovering = useRef(false);

    // High-performance animation loop
    const animate = useCallback(() => {
        // Smooth ring following with easing
        const ringEase = isHovering.current ? 0.25 : 0.15;
        ring.current.x += (mouse.current.x - ring.current.x) * ringEase;
        ring.current.y += (mouse.current.y - ring.current.y) * ringEase;

        // Trailing element with different easing
        trail.current.x += (mouse.current.x - trail.current.x) * 0.08;
        trail.current.y += (mouse.current.y - trail.current.y) * 0.08;

        // Use transform3d for GPU acceleration
        if (ringRef.current) {
            ringRef.current.style.transform = `translate3d(${ring.current.x - 24}px, ${ring.current.y - 24}px, 0)`;
        }

        if (trailRef.current) {
            trailRef.current.style.transform = `translate3d(${trail.current.x - 16}px, ${trail.current.y - 16}px, 0)`;
        }

        raf.current = requestAnimationFrame(animate);
    }, []);

    // Initialize animation loop
    useEffect(() => {
        raf.current = requestAnimationFrame(animate);
        return () => {
            if (raf.current) cancelAnimationFrame(raf.current);
        };
    }, [animate]);

    // Optimized mouse tracking
    useEffect(() => {
        const move = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;

            // Direct cursor movement for immediate response
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${e.clientX - 6}px, ${e.clientY - 6}px, 0)`;
            }
        };

        document.addEventListener("mousemove", move, { passive: true });
        return () => document.removeEventListener("mousemove", move);
    }, []);

    // Enhanced hover effects with smooth transitions
    useEffect(() => {
        const handleEnter = (e: Event) => {
            isHovering.current = true;
            const target = e.target as HTMLElement;
            const isButton =
                target.tagName === "BUTTON" ||
                target.getAttribute("role") === "button";

            if (cursorRef.current && ringRef.current && trailRef.current) {
                // Main cursor grows
                cursorRef.current.style.transform += " scale(1.8)";
                cursorRef.current.style.backgroundColor = isButton
                    ? "#8B4513"
                    : "#A0522D";

                // Ring becomes more prominent
                ringRef.current.style.borderColor = isButton
                    ? "#8B4513"
                    : "#A0522D";
                ringRef.current.style.borderWidth = "3px";
                ringRef.current.style.boxShadow = isButton
                    ? "0 0 32px 8px #8B451380"
                    : "0 0 28px 6px #A0522D80";

                // Trail effect
                trailRef.current.style.opacity = "0.6";
                trailRef.current.style.backgroundColor = isButton
                    ? "#8B4513"
                    : "#A0522D";
            }
        };

        const handleLeave = () => {
            isHovering.current = false;

            if (cursorRef.current && ringRef.current && trailRef.current) {
                // Reset cursor
                cursorRef.current.style.transform =
                    cursorRef.current.style.transform.replace(
                        / scale\([\d.]+\)/,
                        ""
                    );
                cursorRef.current.style.backgroundColor = "#D2691E";

                // Reset ring
                ringRef.current.style.borderColor = "rgba(255,255,255,0.4)";
                ringRef.current.style.borderWidth = "2px";
                ringRef.current.style.boxShadow = "0 0 16px 2px #D2691E40";

                // Reset trail
                trailRef.current.style.opacity = "0.3";
                trailRef.current.style.backgroundColor = "#D2691E";
            }
        };

        // More comprehensive selector for interactive elements
        const selectors =
            'a, button, [role="button"], input, textarea, select, label, [tabindex], .cursor-pointer';
        const elements = document.querySelectorAll(selectors);

        elements.forEach((el) => {
            el.addEventListener("mouseenter", handleEnter);
            el.addEventListener("mouseleave", handleLeave);
        });

        return () => {
            elements.forEach((el) => {
                el.removeEventListener("mouseenter", handleEnter);
                el.removeEventListener("mouseleave", handleLeave);
            });
        };
    }, []);

    // Hide default cursor and add body styles
    useEffect(() => {
        const originalCursor = document.body.style.cursor;
        const originalUserSelect = document.body.style.userSelect;

        document.body.style.cursor = "none";
        document.body.style.userSelect = "none";

        // Add smooth cursor class to body
        document.body.classList.add("custom-cursor-active");

        return () => {
            document.body.style.cursor = originalCursor;
            document.body.style.userSelect = originalUserSelect;
            document.body.classList.remove("custom-cursor-active");
        };
    }, []);

    return (
        <>
            {/* Main cursor dot */}
            <div
                ref={cursorRef}
                className='fixed z-[10000] w-3 h-3 bg-amber-500 rounded-full pointer-events-none will-change-transform'
                style={{
                    left: 0,
                    top: 0,
                    transform: "translate3d(-50vw, -50vh, 0)",
                    mixBlendMode: "difference",
                    transition:
                        "background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 0 12px 2px #D2691E60",
                }}
            />

            {/* Outer ring */}
            <div
                ref={ringRef}
                className='fixed z-[9999] w-12 h-12 border-2 border-white/40 rounded-full pointer-events-none will-change-transform'
                style={{
                    left: 0,
                    top: 0,
                    transform: "translate3d(-50vw, -50vh, 0)",
                    transition:
                        "border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-width 0.2s ease, box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 0 16px 2px #D2691E40",
                }}
            />

            {/* Trailing element */}
            <div
                ref={trailRef}
                className='fixed z-[9998] w-8 h-8 bg-orange-600 rounded-full pointer-events-none will-change-transform opacity-30'
                style={{
                    left: 0,
                    top: 0,
                    transform: "translate3d(-50vw, -50vh, 0)",
                    transition:
                        "background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                    filter: "blur(1px)",
                }}
            />

            {/* Global styles */}
            <style jsx global>{`
                .custom-cursor-active * {
                    cursor: none !important;
                }

                .custom-cursor-active a,
                .custom-cursor-active button,
                .custom-cursor-active [role="button"],
                .custom-cursor-active input,
                .custom-cursor-active textarea,
                .custom-cursor-active select,
                .custom-cursor-active label,
                .custom-cursor-active [tabindex],
                .custom-cursor-active .cursor-pointer {
                    cursor: none !important;
                }
            `}</style>
        </>
    );
}
