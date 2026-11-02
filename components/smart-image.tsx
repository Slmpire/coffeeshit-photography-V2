"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

// Drop-in replacement for next/image.
// The parent element must be `relative` (it already is in galleries and cards).
export default function SmartImage({
    className = "",
    onLoad,
    ...props
}: ImageProps) {
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            {!loaded && (
                <div
                    aria-hidden="true"
                    className="shimmer absolute inset-0 rounded-[inherit]"
                />
            )}
            <Image
                {...props}
                ref={(img) => {
                    // Handles images already cached before React hydrated
                    if (img?.complete) setLoaded(true);
                }}
                onLoad={(e) => {
                    setLoaded(true);
                    onLoad?.(e);
                }}
                className={`${className} transition-opacity duration-700 ${
                    loaded ? "opacity-100" : "opacity-0"
                }`}
            />
        </>
    );
}