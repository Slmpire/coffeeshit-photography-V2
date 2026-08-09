"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GalleryTypesDocument } from "@/prismicio-types";

const STATS = [
    { number: "500+", label: "Sessions Shot" },
    { number: "200+", label: "Happy Clients" },
    { number: "5+", label: "Years Active" },
    { number: "10+", label: "Cities Covered" },
];

interface AboutProps {
    galleryTypes: GalleryTypesDocument[];
}

export default function About({ galleryTypes }: AboutProps) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            id="about"
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
                        About Coffee
                    </span>
                </motion.div>

                {/* Main grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        className="relative"
                    >
                        <div className="relative h-[500px] md:h-[620px] rounded-2xl overflow-hidden">
                            <Image
                                src="https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress"
                                alt="Coffee — Professional Photographer"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            {/* Subtle overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </div>

                        {/* Floating badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="absolute -bottom-6 -right-4 md:right-6 bg-amber-500 text-black px-5 py-3 rounded-xl"
                        >
                            <p className="text-xs font-bold uppercase tracking-widest">
                                Lagos, Nigeria
                            </p>
                            <p className="text-[10px] font-light mt-0.5 opacity-70">
                                Available Worldwide
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Text content */}
                    <div className="flex flex-col gap-8 lg:pt-8">
                        <div className="overflow-hidden">
                            <motion.h2
                                initial={{ y: 80, opacity: 0 }}
                                animate={inView ? { y: 0, opacity: 1 } : {}}
                                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight"
                            >
                                I'm Coffee.
                                <br />
                                <span className="text-white/30">Based in</span>
                                <br />
                                Lagos, NG.
                            </motion.h2>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-white/50 text-base md:text-lg font-light leading-relaxed max-w-md"
                        >
                            Passionate about storytelling through photography —
                            capturing raw emotions, genuine smiles, and the beauty
                            of life's most special moments. Every frame tells a story.
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.45 }}
                            className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10"
                        >
                            {STATS.map((stat) => (
                                <div key={stat.label} className="flex flex-col gap-1">
                                    <span className="text-2xl md:text-3xl font-bold text-white">
                                        {stat.number}
                                    </span>
                                    <span className="text-[10px] text-white/40 uppercase tracking-[0.2em]">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.55 }}
                        >
                            <Link href="/about">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/50 text-white text-xs font-light uppercase tracking-[0.2em] rounded-full transition-all duration-300"
                                >
                                    More About Me
                                    <ArrowUpRight size={14} />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Services / Gallery Types */}
                {galleryTypes && galleryTypes.length > 0 && (
                    <div className="border-t border-white/10 pt-16">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-[10px] text-white/30 uppercase tracking-[0.5em] mb-10"
                        >
                            What I Shoot
                        </motion.p>

                        <div className="flex flex-col divide-y divide-white/5">
                            {galleryTypes.map((galleryType, i) => (
                                <motion.div
                                    key={galleryType.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.1 * i }}
                                >
                                    <Link
                                        href={`/gallery/${galleryType.uid}`}
                                        className="group flex items-center justify-between py-6 hover:pl-2 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-6">
                                            <span className="text-[10px] text-amber-500/50 font-mono">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <div>
                                                <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-amber-300 transition-colors duration-300">
                                                    {galleryType.data.title as string}
                                                </h3>
                                                <p className="text-sm text-white/40 font-light mt-0.5">
                                                    {galleryType.data.description as string}
                                                </p>
                                            </div>
                                        </div>
                                        <ArrowUpRight
                                            size={18}
                                            className="text-white/20 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-300"
                                        />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}