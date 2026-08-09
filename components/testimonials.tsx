"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
    {
        initials: "AG",
        name: "Austin & Gbemii",
        location: "Toronto, Canada",
        type: "Wedding Photography",
        content:
            "Coffee made us really comfortable — very professional, made us laugh and forget we were even having our pictures taken.",
    },
    {
        initials: "ML",
        name: "Manuel & Lara",
        location: "New York, USA",
        type: "Couples Session",
        content:
            "Coffee captured our love story beautifully. We had an amazing and fun experience from start to finish.",
    },
    {
        initials: "NL",
        name: "Nifemi & Lola",
        location: "London, UK",
        type: "Wedding Photography",
        content:
            "The pictures are so timeless and his eye for detail is beautiful. I'd book him over and over again.",
    },
    {
        initials: "FT",
        name: "Fehintoluwa",
        location: "Dubai, UAE",
        type: "Portrait Session",
        content:
            "Best photo session I've had. The photos were exceptional — got other professionals asking for his contact.",
    },
    {
        initials: "AR",
        name: "Adams & Romola",
        location: "Madrid, Spain",
        type: "Wedding Photography",
        content:
            "Captured our wedding love story so beautifully. Every detail, moment, and memory was perfect.",
    },
    {
        initials: "TM",
        name: "Temi & Mariam",
        location: "Berlin, Germany",
        type: "Event Photography",
        content:
            "Every session with Coffee got better and better. Seamless process — exactly what we wanted.",
    },
];

function splitInHalf<T>(arr: T[]): [T[], T[]] {
    const half = Math.ceil(arr.length / 2);
    return [arr.slice(0, half), arr.slice(half)];
}

export default function Testimonials() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    const [row1, row2] = splitInHalf(TESTIMONIALS);
    const marquee1 = [...row1, ...row1];
    const marquee2 = [...row2, ...row2];

    return (
        <section
            ref={ref}
            className="w-full bg-black text-white py-24 md:py-32 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">

                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3 mb-16"
                >
                    <div className="h-px w-10 bg-amber-400/60" />
                    <span className="text-[10px] text-amber-400 uppercase tracking-[0.5em]">
                        Client Love
                    </span>
                </motion.div>

                {/* Heading */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: 80, opacity: 0 }}
                            animate={inView ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                            className="text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight"
                        >
                            Trusted
                            <br />
                            <span className="text-white/20">Worldwide</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-white/40 text-base font-light leading-relaxed max-w-sm md:ml-auto"
                    >
                        Real words from real clients — couples, families, and
                        brands who trusted Coffee with their most important moments.
                    </motion.p>
                </div>
            </div>

            {/* Marquee row 1 — scrolls left */}
            <div className="w-full overflow-hidden mb-4">
                <div
                    className="flex gap-4"
                    style={{
                        animation: "marquee-left 35s linear infinite",
                        width: "max-content",
                    }}
                >
                    {marquee1.map((t, i) => (
                        <TestimonialCard key={i} {...t} />
                    ))}
                </div>
            </div>

            {/* Marquee row 2 — scrolls right */}
            <div className="w-full overflow-hidden">
                <div
                    className="flex gap-4"
                    style={{
                        animation: "marquee-right 45s linear infinite",
                        width: "max-content",
                    }}
                >
                    {marquee2.map((t, i) => (
                        <TestimonialCard key={i} {...t} />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </section>
    );
}

function TestimonialCard({
    initials,
    name,
    location,
    type,
    content,
}: {
    initials: string;
    name: string;
    location: string;
    type: string;
    content: string;
}) {
    return (
        <div className="w-[320px] md:w-[380px] flex-shrink-0 bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex flex-col gap-5 hover:bg-white/[0.06] transition-colors duration-300">

            {/* Quote icon */}
            <Quote size={16} className="text-amber-400/40" />

            {/* Content */}
            <p className="text-white/70 text-sm font-light leading-relaxed flex-1">
                {content}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xs font-bold flex-shrink-0">
                    {initials}
                </div>
                <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">
                        {name}
                    </p>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest truncate">
                        {type} · {location}
                    </p>
                </div>
            </div>
        </div>
    );
}