"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function RouteProgress() {
    const pathname = usePathname();
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);
    const interval = useRef<ReturnType<typeof setInterval> | null>(null);
    const active = useRef(false);

    const start = () => {
        if (active.current) return;
        active.current = true;
        setVisible(true);
        setProgress(8);
        interval.current = setInterval(() => {
            setProgress((p) => (p < 90 ? p + (90 - p) * 0.08 : p));
        }, 200);
    };

    const finish = () => {
        if (!active.current) return;
        active.current = false;
        if (interval.current) clearInterval(interval.current);
        setProgress(100);
        setTimeout(() => {
            setVisible(false);
            setProgress(0);
        }, 350);
    };

    // Page changed → complete the bar
    useEffect(() => {
        finish();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    // Link clicked → start the bar
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (
                e.defaultPrevented ||
                e.button !== 0 ||
                e.metaKey ||
                e.ctrlKey ||
                e.shiftKey ||
                e.altKey
            )
                return;

            const anchor = (e.target as HTMLElement).closest("a");
            if (!anchor) return;
            if (anchor.target === "_blank" || anchor.hasAttribute("download"))
                return;

            const url = new URL(anchor.href, window.location.href);
            if (url.origin !== window.location.origin) return;
            if (url.pathname === window.location.pathname) return;

            start();
        };

        document.addEventListener("click", onClick);
        return () => {
            document.removeEventListener("click", onClick);
            if (interval.current) clearInterval(interval.current);
        };
    }, []);

    return (
        <div
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-[200] h-[2px] pointer-events-none"
            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
        >
            <div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.7)]"
                style={{
                    width: `${progress}%`,
                    transition: "width 0.25s ease-out",
                }}
            />
        </div>
    );
}