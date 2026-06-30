"use client";

import { StatsImagesDocument } from "@/prismicio-types";
import Image from "next/image";
import { useMemo } from "react";

export default function Stats({
    statsImages,
}: {
    statsImages: StatsImagesDocument;
}) {
    // Prepare images for the marquee
    const images = useMemo(() => {
        const group = statsImages.data.group_one || [];
        // Duplicate for seamless marquee
        return [...group, ...group];
    }, [statsImages.data.group_one]);

    // Calculate dynamic animation duration based on content length
    const animationDuration = useMemo(() => {
        const baseSpeed = 60; // pixels per second
        const imageWidth = 220; // 192px width + 28px gap
        const totalWidth = images.length * imageWidth;
        return totalWidth / baseSpeed;
    }, [images.length]);

    // Get a large image for the bottom (first image or placeholder)
    const largeImage = statsImages.data?.feature_image?.url;

    console.log("largeImage", largeImage);

    return (
        <section className='w-full bg-black text-white min-h-screen flex flex-col items-center px-2 md:px-0 py-16'>
            {/* Top Row */}
            <div className='w-full max-w-6xl grid grid-cols-3 items-center mb-2 text-xs font-semibold tracking-widest'>
                <div className='text-white/60'>06</div>
                <div className='text-center text-white/80'>//STATS</div>
                <div className='text-right text-white/60'>FUN FACTS</div>
            </div>
            {/* Stats Row */}
            <div className='w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 mb-8'>
                <div className='text-center'>
                    <div className='text-5xl md:text-6xl font-extrabold mb-2'>
                        100+
                    </div>
                    <div className='text-xs md:text-sm uppercase tracking-wider text-white/80'>
                        Projects Done
                    </div>
                </div>
                <div className='text-center'>
                    <div className='text-5xl md:text-6xl font-extrabold mb-2'>
                        6+
                    </div>
                    <div className='text-xs md:text-sm uppercase tracking-wider text-white/80'>
                        Years of Experience
                    </div>
                </div>
                <div className='text-center'>
                    <div className='text-5xl md:text-6xl font-extrabold mb-2'>
                        5+
                    </div>
                    <div className='text-xs md:text-sm uppercase tracking-wider text-white/80'>
                        Recognitions
                    </div>
                </div>
                <div className='text-center'>
                    <div className='text-5xl md:text-6xl font-extrabold mb-2'>
                        99%
                    </div>
                    <div className='text-xs md:text-sm uppercase tracking-wider text-white/80'>
                        Happy Clients
                    </div>
                </div>
            </div>
            {/* Sliding Images Row */}
            <div className='w-full max-w-6xl overflow-hidden mb-8'>
                <div
                    className='flex space-x-8 animate-marquee-left'
                    style={{
                        ["--marquee-duration" as any]: `${animationDuration}s`,
                    }}
                >
                    {images.map((imgSrc, index) => (
                        <div
                            key={`${imgSrc.images?.url}-${index}`}
                            className='w-56 h-56 rounded-xl overflow-hidden shadow-xl bg-white/10 border border-white/20 flex items-center justify-center hover:scale-105 transition-transform duration-300 flex-shrink-0'
                        >
                            <Image
                                src={imgSrc.images?.url || ""}
                                alt=''
                                width={220}
                                height={220}
                                className='object-cover w-full h-full'
                                loading='lazy'
                                draggable={false}
                                aria-hidden='true'
                                quality={75}
                                sizes='220px'
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* Large Centered Image */}
            <div className='w-full max-w-3xl mx-auto mt-8'>
                <Image
                    src={largeImage as string}
                    alt='Stats Large'
                    width={900}
                    height={500}
                    className='rounded-xl object-cover w-full h-[400px]'
                    sizes='(max-width: 768px) 100vw, 900px'
                />
            </div>
            <style jsx>{`
                @keyframes marquee-left {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-marquee-left {
                    animation: marquee-left var(--marquee-duration) linear
                        infinite;
                }
            `}</style>
        </section>
    );
}
