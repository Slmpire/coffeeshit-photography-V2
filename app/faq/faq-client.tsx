"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

type FAQItem = { question: string; answer: string };

export default function FAQClient({ faq }: { faq: FAQItem[] }) {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="max-w-3xl">
                <div className="divide-y divide-white/5">
                    {faq.map((item, idx) => (
                        <div key={idx}>
                            <button
                                onClick={() => setOpen(open === idx ? null : idx)}
                                className="flex items-center w-full py-7 text-left group"
                                aria-expanded={open === idx}
                            >
                                <span className="text-[10px] text-amber-500/30 font-mono w-10 flex-shrink-0">
                                    {String(idx + 1).padStart(2, "0")}
                                </span>
                                <p className="flex-1 text-base md:text-lg font-medium text-white/70 group-hover:text-white transition-colors duration-300 pr-4">
                                    {item.question}
                                </p>
                                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-amber-400/40 transition-colors duration-300">
                                    {open === idx
                                        ? <Minus size={12} className="text-amber-400" />
                                        : <Plus size={12} className="text-white/40" />
                                    }
                                </div>
                            </button>

                            <AnimatePresence initial={false}>
                                {open === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-white/50 text-sm font-light leading-relaxed pl-10 pb-8 max-w-2xl">
                                            {item.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}