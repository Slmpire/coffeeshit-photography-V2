"use client";

import { motion, Variants } from "framer-motion";
import { BadgeCheck, Globe, MapPin, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HomepageImageCollageDocument } from "@/prismicio-types";
import { useState, useEffect } from "react";

const nameVariants: Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.2,
            ease: "easeOut",
            delay: 0.3,
        },
    },
};

const taglineVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            ease: "easeOut",
            delay: 1.5,
        },
    },
};

const bottomInfoVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 1,
            delay: 2,
            staggerChildren: 0.3,
        },
    },
};

const bottomInfoItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

// Fallback images for testing - grouped in sets of 3
const fallbackImageSets = [
    [
        "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
        "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
        "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
    ],
    [
        "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
        "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
        "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
    ],
    [
        "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
        "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
        "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
    ],
];

// Helper function to group images into sets of 3
const groupImagesIntoCollages = (images: string[]) => {
    console.log("Hero: groupImagesIntoCollages called with:", images);
    const collages = [];
    for (let i = 0; i < images.length; i += 3) {
        const collage = images.slice(i, i + 3);
        // If we don't have 3 images, pad with the first image
        while (collage.length < 3) {
            collage.push(images[0] || fallbackImageSets[0][0]);
        }
        collages.push(collage);
    }
    console.log("Hero: Created collages:", collages);
    return collages;
};

export default function Hero({
    imageCollage,
    slider,
}: {
    imageCollage: HomepageImageCollageDocument[];
    slider: string[];
}) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Use slider data if available, otherwise use fallback images
    const backgroundImages =
        slider && slider.length > 0 ? slider : fallbackImageSets.flat();

    // Group images into collages of 3
    const imageCollages = groupImagesIntoCollages(backgroundImages);

    // Log when slider data changes
    useEffect(() => {
        console.log("Hero: Slider data received:", slider);
        console.log("Hero: Background images:", backgroundImages);
        console.log("Hero: Image collages:", imageCollages);
    }, [slider, backgroundImages, imageCollages]);

    // Auto-slide background images
    useEffect(() => {
        console.log(
            "Hero: useEffect triggered with imageCollages:",
            imageCollages
        );
        if (imageCollages && imageCollages.length > 1) {
            console.log(
                "Hero: Setting up interval for slider with",
                imageCollages.length,
                "collages"
            );
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => {
                    const newIndex = (prevIndex + 1) % imageCollages.length;
                    console.log("Hero: Changing to collage index:", newIndex);
                    return newIndex;
                });
            }, 5000); // Change image every 5 seconds

            return () => {
                console.log("Hero: Clearing interval");
                clearInterval(interval);
            };
        } else {
            console.log(
                "Hero: No interval set up - only",
                imageCollages?.length,
                "collage(s)"
            );
        }
    }, [imageCollages]);

    console.log("Hero: imageCollage:", imageCollage);

    // Early return if no collages
    if (!imageCollages || imageCollages.length === 0) {
        console.log(
            "Hero: No image collages available, rendering without background"
        );
        return (
            <section className='flex flex-col items-center justify-between bg-black px-0 pt-20 pb-0 md:hidden'>
                <div className='text-white text-center'>
                    <h1>COFFEE SHOTIT</h1>
                    <p>No background images available</p>
                </div>
            </section>
        );
    }

    return (
        <>
            {/* Mobile Hero */}
            <section className='flex flex-col items-center justify-between bg-black px-0 pt-20 pb-0 md:hidden relative overflow-hidden min-h-screen'>
                {/* Background Image Slider - Mobile shows single images */}
                <div className='absolute inset-0 z-0'>
                    {backgroundImages.map((image, imageIndex) => {
                        console.log(
                            `Hero: Rendering mobile image ${imageIndex}:`,
                            image
                        );
                        return (
                            <motion.div
                                key={imageIndex}
                                className='absolute inset-0'
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity:
                                        imageIndex === currentImageIndex
                                            ? 1
                                            : 0,
                                }}
                                transition={{ duration: 1.5 }}
                            >
                                {/* Single Image Layout for Mobile */}
                                <div className='h-full w-full'>
                                    <Image
                                        src={image}
                                        alt={`Background ${imageIndex + 1}`}
                                        fill
                                        className='object-cover'
                                        priority={imageIndex === 0}
                                        sizes='100vw'
                                    />
                                </div>
                                {/* Dark overlay for better text readability */}
                                <div className='absolute inset-0 bg-black/60' />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Content with relative positioning */}
                <div className='relative z-10 flex flex-col items-center justify-between w-full h-full'>
                    {/* Name in script font */}
                    <motion.h1
                        variants={nameVariants}
                        initial='hidden'
                        animate='visible'
                        className='font-signature text-3xl text-white mb-2'
                    >
                        COFFEE SHOTIT
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        variants={taglineVariants}
                        initial='hidden'
                        animate='visible'
                        className='text-white text-center text-sm font-light max-w-xs mb-4'
                    >
                        CAPTURING REALITY, CRAFTING MEMORIES. LET'S SHOOT MAGIC
                        TOGETHER.
                    </motion.p>

                    {/* CTA Button */}
                    <Link href='/contact'>
                        <button className='bg-neutral-900 text-white px-6 py-2 rounded-xl font-semibold flex items-center gap-2 mb-6 mx-auto border border-white/10'>
                            Reach Me
                            <span className='ml-1'>📩</span>
                        </button>
                    </Link>

                    {/* Bottom info stacked for mobile */}
                    <motion.div
                        variants={bottomInfoVariants}
                        initial='hidden'
                        animate='visible'
                        className='w-full flex flex-col gap-0 border-t border-white/10 text-center text-white/70'
                    >
                        <motion.div
                            variants={bottomInfoItemVariants}
                            className='flex flex-col items-center justify-center gap-2 py-4 border-b border-white/10'
                        >
                            <MapPin className='mb-1 h-5 w-5 text-amber-400' />
                            <p className='text-xs font-light leading-relaxed tracking-widest'>
                                BASED IN LAGOS,
                                <br />
                                NIGERIA
                            </p>
                        </motion.div>
                        <motion.div
                            variants={bottomInfoItemVariants}
                            className='flex flex-col items-center justify-center gap-2 py-4 border-b border-white/10'
                        >
                            <Globe className='mb-1 h-5 w-5' />
                            <p className='text-xs font-light leading-relaxed tracking-widest'>
                                AVAILABLE ALL AROUND
                                <br />
                                WORLDWIDE
                            </p>
                        </motion.div>
                        <motion.div
                            variants={bottomInfoItemVariants}
                            className='flex flex-col items-center justify-center gap-2 py-4'
                        >
                            <BadgeCheck className='mb-1 h-5 w-5 text-amber-400' />
                            <p className='text-xs font-light leading-relaxed tracking-widest'>
                                PROFESSIONAL PHOTOGRAPHER
                                <br />+ CREATIVE DIRECTOR
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Image Slider Indicators */}
                {backgroundImages && backgroundImages.length > 1 && (
                    <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2'>
                        {backgroundImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    index === currentImageIndex
                                        ? "bg-white w-6"
                                        : "bg-white/50 hover:bg-white/75"
                                }`}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Desktop Hero */}
            <section className='hidden md:grid min-h-screen lg:mt-12   relative overflow-hidden'>
                {/* Background Image Collage Slider - Desktop shows side-by-side collages */}
                <div className='absolute inset-0 z-0'>
                    {imageCollages.map((collage, collageIndex) => (
                        <motion.div
                            key={collageIndex}
                            className='absolute inset-0'
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity:
                                    collageIndex === currentImageIndex ? 1 : 0,
                            }}
                            transition={{ duration: 1.5 }}
                        >
                            {/* Side by Side Collage Layout */}
                            <div className='flex h-full'>
                                {/* First Image */}
                                <div className='flex-1 relative'>
                                    <Image
                                        src={collage[0]}
                                        alt={`Collage ${collageIndex + 1} - Image 1`}
                                        fill
                                        className='object-cover'
                                        priority={collageIndex === 0}
                                        sizes='33vw'
                                    />
                                </div>
                                {/* Second Image */}
                                <div className='flex-1 relative'>
                                    <Image
                                        src={collage[1]}
                                        alt={`Collage ${collageIndex + 1} - Image 2`}
                                        fill
                                        className='object-cover'
                                        priority={collageIndex === 0}
                                        sizes='33vw'
                                    />
                                </div>
                                {/* Third Image */}
                                <div className='flex-1 relative'>
                                    <Image
                                        src={collage[2]}
                                        alt={`Collage ${collageIndex + 1} - Image 3`}
                                        fill
                                        className='object-cover'
                                        priority={collageIndex === 0}
                                        sizes='33vw'
                                    />
                                </div>
                            </div>
                            {/* Dark overlay for better text readability */}
                            <div className='absolute inset-0 bg-black/50' />
                        </motion.div>
                    ))}
                </div>

                {/* Content with relative positioning */}
                <div className='relative z-10 w-full max-w-5xl mx-auto col-span-3 row-span-1 grid grid-cols-subgrid'>
                    <div className='col-start-1 h-full border-r border-white/10'></div>
                    <div className='col-start-2 flex flex-col items-center justify-center text-center'>
                        <motion.h1
                            variants={nameVariants}
                            initial='hidden'
                            animate='visible'
                            className='signature-font mb-8 text-7xl font-bold text-white'
                        >
                            COFFEE SHOTIT
                        </motion.h1>
                        <motion.p
                            variants={taglineVariants}
                            initial='hidden'
                            animate='visible'
                            className='max-w-3xl text-lg font-light leading-relaxed tracking-wider text-white/80 md:text-xl'
                        >
                            CAPTURING REALITY, CRAFTING MEMORIES. LET'S SHOOT
                            MAGIC TOGETHER.
                        </motion.p>
                    </div>
                    <div className='col-start-3 h-full border-l border-white/10'></div>
                </div>

                {/* Bottom info section */}
                <motion.div
                    variants={bottomInfoVariants}
                    initial='hidden'
                    animate='visible'
                    className='relative z-10 col-span-3 grid px-4 grid-cols-3 border-t border-white/10 text-center text-white/70'
                >
                    <motion.div
                        variants={bottomInfoItemVariants}
                        className='flex flex-col items-center justify-center gap-2 border-r border-white/10 py-8'
                    >
                        <MapPin className='mb-1 h-5 w-5 text-amber-400' />
                        <p className='text-xs font-light leading-relaxed tracking-widest'>
                            BASED IN LAGOS,
                            <br />
                            NIGERIA
                        </p>
                    </motion.div>
                    <motion.div
                        variants={bottomInfoItemVariants}
                        className='flex flex-col items-center justify-center gap-2 border-r border-white/10 py-8'
                    >
                        <Globe className='mb-1 h-5 w-5' />
                        <p className='text-xs font-light leading-relaxed tracking-widest'>
                            AVAILABLE ALL AROUND
                            <br />
                            WORLDWIDE
                        </p>
                    </motion.div>
                    <motion.div
                        variants={bottomInfoItemVariants}
                        className='flex flex-col items-center justify-center gap-2 py-8'
                    >
                        <BadgeCheck className='mb-1 h-5 w-5 text-amber-400' />
                        <p className='text-xs font-light leading-relaxed tracking-widest'>
                            PROFESSIONAL PHOTOGRAPHER
                            <br />+ CREATIVE DIRECTOR
                        </p>
                    </motion.div>
                </motion.div>

                {/* Image Slider Indicators */}
                {imageCollages && imageCollages.length > 1 && (
                    <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2'>
                        {imageCollages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    index === currentImageIndex
                                        ? "bg-white w-6"
                                        : "bg-white/50 hover:bg-white/75"
                                }`}
                                aria-label={`Go to collage ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}
