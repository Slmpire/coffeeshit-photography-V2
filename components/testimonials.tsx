"use client";

import { TestimonialsDocument } from "@/prismicio-types";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        initials: "AG",
        name: "Austin & Gbemii",
        location: "Toronto, Canada",
        content:
            '"Coffee Shotit made us really comfortable, he was very professional, made us laugh and forgot we were having our pictures taken."',
    },
    {
        initials: "ML",
        name: "Manuel & Lara",
        location: "New York, USA",
        content:
            '"Coffee Shotit captured our lovestory beautifully, we had an amazing and fun experience with our session."',
    },
    {
        initials: "NL",
        name: "Nifemi & Lola",
        location: "London, UK",
        content: `The pictures are so timeless and his eyes for details, so beautiful. I'd book him over and over again.`,
    },
    {
        initials: "FT",
        name: "Fehintoluwa",
        location: "Dubai, UAE",
        content: `Had my headshot session with Coffee Shotit and it's the best photo session I've had. The photos were exceptional and got other professionals asking for his services.`,
    },
    {
        initials: "AR",
        name: "Adams & Romola",
        location: "Madrid, Spain",
        content: `Captured our wedding lovestory so beautifully, details, moments and memories were so perfect!`,
    },
    {
        initials: "TM",
        name: "Temi & Mariam",
        location: "Berlin, Germany",
        content: `The results from all the sessions we had with Coffee Shotit got better and better, it was seamless and it was exactly what we wanted.`,
    },
];

function splitTestimonials(arr: any) {
    const half = Math.ceil(arr?.length / 2);
    return [arr?.slice(0, half), arr?.slice(half)];
}

export default function Testimonials({
    testimonials,
}: {
    testimonials: TestimonialsDocument[];
}) {
    const [row1, row2] = splitTestimonials(testimonials);

    // Duplicate for seamless marquee
    const marquee1 = [...row1, ...row1];
    const marquee2 = [...row2, ...row2];
    const duration = 30;

    return (
        <section className='w-full bg-black text-white min-h-screen flex flex-col items-center px-2 md:px-0 py-16'>
            {/* Top Row */}
            <div className='w-full max-w-5xl grid grid-cols-3 items-center mb-2 text-xs font-semibold tracking-widest'>
                <div className='text-white/60'>08</div>
                <div className='text-center text-white/80'>//TESTIMONIAL</div>
                <div className='text-right text-white/60'>VOICES</div>
            </div>
            {/* Heading */}
            <h1 className='text-2xl md:text-4xl font-extrabold text-center mt-8 mb-12 tracking-tight leading-tight uppercase max-w-3xl mx-auto'>
                TRUSTED BY
                <br />
                INTERNATIONAL BRANDS
            </h1>
            {/* Marquee Rows */}
            <div className='w-full max-w-5xl space-y-8'>
                {/* Row 1 */}
                <div className='overflow-hidden'>
                    <div
                        className='flex space-x-8 animate-marquee-left'
                        style={{
                            ["--marquee-duration" as any]: `${duration}s`,
                        }}
                    >
                        {marquee1.map((t, i) => (
                            <TestimonialCard key={i + t.name} {...t} />
                        ))}
                    </div>
                </div>
                {/* Row 2 */}
                <div className='overflow-hidden'>
                    <div
                        className='flex space-x-8 animate-marquee-right'
                        style={{
                            ["--marquee-duration" as any]: `${duration + 10}s`,
                        }}
                    >
                        {marquee2.map((t, i) => (
                            <TestimonialCard key={i + t.name} {...t} />
                        ))}
                    </div>
                </div>
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
                @keyframes marquee-right {
                    0% {
                        transform: translateX(-50%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }
                .animate-marquee-left {
                    animation: marquee-left var(--marquee-duration) linear
                        infinite;
                }
                .animate-marquee-right {
                    animation: marquee-right var(--marquee-duration) linear
                        infinite;
                }
            `}</style>
        </section>
    );
}

function TestimonialCard({
    initials,
    name,
    location,
    content,
}: {
    initials: string;
    name: string;
    location: string;
    content: string;
}) {
    return (
        <div className='min-w-[320px] max-w-xs bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-4'>
            <div className='flex items-center gap-4 mb-2'>
                <div className='w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 font-bold text-lg uppercase'>
                    {initials}
                </div>
                <div>
                    <div className='text-xs font-bold uppercase text-white mb-1'>
                        {name}
                    </div>
                    <div className='text-[10px] uppercase text-white/40 tracking-widest'>
                        {location}
                    </div>
                </div>
            </div>
            <div
                className='text-white text-base font-bold leading-snug'
                style={{ fontFamily: "inherit" }}
            >
                {content}
            </div>
        </div>
    );
}
