"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FaqDocument } from "@/prismicio-types";

const FALLBACK_FAQS = [
    { question: "How far in advance should I book?", answer: "For weddings, at least 3–6 months in advance. For events and portrait sessions, 2–4 weeks is usually sufficient. The earlier the better to secure your preferred date." },
    { question: "How long does it take to receive my photos?", answer: "Wedding galleries are delivered within 4–6 weeks. Event photos within 2–3 weeks. Portrait sessions within 1–2 weeks. Rush delivery is available on request." },
    { question: "Does Coffee travel outside Lagos?", answer: "Yes. Coffee is available anywhere in Nigeria and internationally. Travel costs are added to the package price and confirmed during consultation." },
    { question: "What happens if it rains on my wedding day?", answer: "Rain doesn't stop the shoot. Coffee has experience shooting in all weather conditions and often creates the most dramatic and beautiful images on rainy days. If you prefer to reschedule, we can discuss options." },
    { question: "How does the deposit work?", answer: "A 50% deposit is required to secure your date. The remaining balance is due 7 days before your session. Deposits are non-refundable but transferable to another date with 30 days notice." },
    { question: "What is the cancellation policy?", answer: "Cancellations made 30+ days before the event can transfer the deposit to a new date. Cancellations within 30 days forfeit the deposit. Full payment is non-refundable within 7 days of the event." },
    { question: "What format are photos delivered in?", answer: "All photos are delivered as high-resolution JPEGs via a private Pixieset gallery. You can download full-resolution files and order prints directly from the gallery." },
    { question: "Are raw or unedited files available?", answer: "No. Raw files are not delivered. The editing process is an essential part of the final product and reflects Coffee's signature style." },
    { question: "How should I prepare for a portrait session?", answer: "Wear outfits that make you feel confident and comfortable. Avoid very busy patterns. Coffee will share a prep guide after booking with detailed tips on what to bring and how to prepare." },
    { question: "Is a second shooter available?", answer: "Yes, a second shooter can be added to wedding packages. This ensures full coverage of different moments happening simultaneously. Ask about pricing during consultation." },
];

export default function FAQClient({ faq }: { faq: FaqDocument[] }) {
    const [open, setOpen] = useState<number | null>(0);

    const items = faq?.length > 0
        ? faq.map((f) => ({
            question: f.data.question as string,
            answer: f.data.answer as string,
        }))
        : FALLBACK_FAQS;

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="max-w-3xl">
                <div className="divide-y divide-white/5">
                    {items.map((item, idx) => (
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