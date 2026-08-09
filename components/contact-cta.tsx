"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Instagram, Twitter, Youtube } from "lucide-react";

const SOCIALS = [
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/coffeeshotit" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/coffeeshotit" },
    { icon: Youtube, label: "YouTube", href: "https://youtube.com/@coffeeshotit" },
];

export default function ContactCTA() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
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
                        Let's Work Together
                    </span>
                </motion.div>

                {/* Main CTA grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

                    {/* Left — text */}
                    <div className="flex flex-col gap-8">
                        <div className="overflow-hidden">
                            <motion.h2
                                initial={{ y: 100, opacity: 0 }}
                                animate={inView ? { y: 0, opacity: 1 } : {}}
                                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                                className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight"
                            >
                                Let's create
                                <br />
                                <span className="text-white/20">something</span>
                                <br />
                                amazing.
                            </motion.h2>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-white/40 text-base font-light leading-relaxed max-w-md"
                        >
                            I'm Coffee — a photographer who sees stories in every moment.
                            Passion for emotion and detail, capturing love, light, and
                            memories that last forever.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.45 }}
                            className="flex flex-wrap items-center gap-4"
                        >
                            <Link href="/booking">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors duration-300"
                                >
                                    Book a Session
                                    <ArrowUpRight size={14} />
                                </motion.button>
                            </Link>

                            <Link href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center gap-2 px-7 py-3.5 border border-white/20 hover:border-white/50 text-white text-xs font-light uppercase tracking-[0.2em] rounded-full transition-all duration-300"
                                >
                                    Get in Touch
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Socials */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex items-center gap-6 pt-4 border-t border-white/5"
                        >
                            {SOCIALS.map(({ icon: Icon, label, href }) => (
                                
                                  <a key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-white/30 hover:text-white transition-colors duration-300 text-xs uppercase tracking-widest"
                                >
                                    <Icon size={14} />
                                    <span className="hidden sm:block">{label}</span>
                                </a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right — image */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </div>

                        {/* Info badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="absolute -bottom-6 left-6 right-6 flex justify-between"
                        >
                            <div className="bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3">
                                <p className="text-[9px] text-white/40 uppercase tracking-widest">Location</p>
                                <p className="text-xs text-white font-medium mt-0.5">Lagos, Nigeria</p>
                            </div>
                            <div className="bg-amber-500 rounded-xl px-4 py-3">
                                <p className="text-[9px] text-black/60 uppercase tracking-widest">Status</p>
                                <p className="text-xs text-black font-bold mt-0.5">Available Now</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}