"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { FaqDocument } from "@/prismicio-types";

export default function FAQ({ faq }: { faq: FaqDocument[] }) {
    const [open, setOpen] = useState<number | null>(null);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            id="faq"
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
                        FAQ
                    </span>
                </motion.div>

                {/* Heading row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-16">
                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: 80, opacity: 0 }}
                            animate={inView ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                            className="text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight"
                        >
                            Common
                            <br />
                            <span className="text-white/20">Questions</span>
                        </motion.h2>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-white/40 text-base font-light leading-relaxed max-w-sm md:ml-auto"
                    >
                        Everything you need to know before booking.
                        Can't find your answer?{" "}
                        <Link
                            href="/contact"
                            className="text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-2"
                        >
                            Just ask.
                        </Link>
                    </motion.p>
                </div>

                {/* FAQ accordion */}
                <div className="divide-y divide-white/5 mb-16">
                    {faq?.map((item, idx) => (
                        <motion.div
                            key={item.id ?? idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.05 * idx }}
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

                                {/* Question */}
                                <p className="flex-1 text-base md:text-lg font-medium text-white/80 group-hover:text-white transition-colors duration-300 pr-4">
                                    {item.data.question as string}
                                </p>

                                {/* Toggle */}
                                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-amber-400/40 transition-colors duration-300">
                                    {open === idx
                                        ? <Minus size={12} className="text-amber-400" />
                                        : <Plus size={12} className="text-white/40" />
                                    }
                                </div>
                            </button>

                            {/* Answer */}
                            <AnimatePresence initial={false}>
                                {open === idx && (
                                    <motion.div
                                        key="answer"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-white/50 text-sm md:text-base font-light leading-relaxed pl-10 pb-8 max-w-2xl">
                                            {item.data.answer as string}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* View all FAQs CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex justify-center"
                >
                    <Link href="/faq">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 px-8 py-4 border border-white/15 hover:border-white/40 text-white text-xs font-light uppercase tracking-[0.3em] rounded-full transition-all duration-300"
                        >
                            View All Questions
                            <ArrowUpRight size={14} />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}