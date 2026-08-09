"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { ServicesDocument } from "@/prismicio-types";
import { PrismicRichText } from "@prismicio/react";

interface ServicesProps {
    services: ServicesDocument[];
}

export default function Services({ services }: ServicesProps) {
    const [open, setOpen] = useState<number | null>(null);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            id="services"
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
                        What I Do
                    </span>
                </motion.div>

                {/* Heading row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-20">
                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: 80, opacity: 0 }}
                            animate={inView ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                            className="text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight"
                        >
                            Pro
                            <br />
                            <span className="text-white/20">Services</span>
                        </motion.h2>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-white/40 text-base md:text-lg font-light leading-relaxed max-w-sm md:ml-auto"
                    >
                        Whether it's the joy of a wedding, the intimacy of a
                        portrait, or the essence of a brand — every session is
                        crafted to make memories last.
                    </motion.p>
                </div>

                {/* Services accordion */}
                <div className="divide-y divide-white/5 mb-20">
                    {services.map((service, idx) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 * idx }}
                        >
                            <button
                                className="flex items-center w-full py-7 group text-left"
                                onClick={() => setOpen(open === idx ? null : idx)}
                                aria-expanded={open === idx}
                            >
                                {/* Number */}
                                <span className="text-[10px] text-amber-500/40 font-mono w-10 flex-shrink-0">
                                    {String(idx + 1).padStart(2, "0")}
                                </span>

                                {/* Title + subtitle */}
                                <div className="flex-1">
                                    <p className="text-xl md:text-2xl font-semibold text-white group-hover:text-amber-300 transition-colors duration-300">
                                        {service.data.title as string}
                                    </p>
                                    <p className="text-xs text-white/30 uppercase tracking-[0.2em] mt-1">
                                        {service.data.subtitle as string}
                                    </p>
                                </div>

                                {/* Toggle icon */}
                                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-amber-400/40 transition-colors duration-300">
                                    {open === idx
                                        ? <Minus size={12} className="text-amber-400" />
                                        : <Plus size={12} className="text-white/40" />
                                    }
                                </div>
                            </button>

                            {/* Expanded content */}
                            <AnimatePresence initial={false}>
                                {open === idx && (
                                    <motion.div
                                        key="content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10 pl-10">
                                            {/* Description */}
                                            <div className="text-white/50 text-sm md:text-base font-light leading-relaxed prose prose-invert prose-sm max-w-none">
                                                <PrismicRichText field={service.data.description} />
                                            </div>

                                            {/* Image */}
                                            {service?.data?.feature_image?.url && (
                                                <div className="relative h-56 md:h-64 rounded-xl overflow-hidden">
                                                    <Image
                                                        src={service.data.feature_image.url}
                                                        alt={service.data.title ?? "Service"}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                    />
                                                    <div className="absolute inset-0 bg-black/20" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Book CTA inside expanded */}
                                        <div className="pb-8 pl-10">
                                            <Link href="/booking">
                                                <motion.button
                                                    whileHover={{ scale: 1.03 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors duration-300"
                                                >
                                                    Book This Service
                                                    <ArrowUpRight size={12} />
                                                </motion.button>
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom full-width image */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="relative h-[400px] md:h-[560px] rounded-2xl overflow-hidden"
                >
                    <Image
                        src="https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress"
                        alt="CoffeeShotIt in action"
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Overlay text */}
                    <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                        <p className="text-white/60 text-xs uppercase tracking-[0.3em] max-w-xs">
                            Every frame tells a story worth keeping forever
                        </p>
                        <Link href="/portfolio">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-2 px-5 py-2.5 border border-white/30 hover:border-white text-white text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300"
                            >
                                View Portfolio
                                <ArrowUpRight size={12} />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}