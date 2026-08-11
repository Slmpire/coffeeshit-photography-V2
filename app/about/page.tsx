import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
    title: "About",
    description: "Learn about Coffee — professional photographer and creative director based in Lagos, Nigeria.",
};

const STATS = [
    { number: "100+", label: "Projects Done" },
    { number: "6+", label: "Years Experience" },
    { number: "200+", label: "Happy Clients" },
    { number: "99%", label: "Satisfaction Rate" },
];

const TIMELINE = [
    { year: "2019", title: "Started Photography", desc: "Picked up a camera and never put it down. First shoots were portraits of friends and family." },
    { year: "2020", title: "First Wedding", desc: "Photographed the first wedding and fell in love with capturing love stories." },
    { year: "2021", title: "CoffeeShotIt Founded", desc: "Officially launched CoffeeShotIt Media as a full-time photography business." },
    { year: "2022", title: "Expanded to Events", desc: "Grew the portfolio to include corporate events, proposals, and editorial work." },
    { year: "2023", title: "International Clients", desc: "Started serving clients from the UK, US, Canada, and across Europe." },
    { year: "2025", title: "Still Shooting", desc: "Still passionate, still growing, still capturing moments that matter." },
];

const TOOLS = [
    { name: "Photoshop", desc: "Professional retouching and compositing" },
    { name: "Lightroom", desc: "Cinematic colour grading" },
    { name: "Evoto AI", desc: "AI-powered skin retouching" },
    { name: "Pixieset", desc: "Private client gallery delivery" },
];

export default function AboutPage() {
    return (
        <main className="w-full bg-black text-white">

            {/* Hero */}
            <section className="relative min-h-[70vh] flex items-end pb-16 pt-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress"
                        alt="Coffee — Photographer"
                        fill
                        className="object-cover object-top"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-px w-10 bg-amber-400/60" />
                        <span className="text-[10px] text-amber-400 uppercase tracking-[0.5em]">
                            About Coffee
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.9] tracking-tight max-w-2xl">
                        The person
                        <br />
                        <span className="text-white/20">behind</span>
                        <br />
                        the lens.
                    </h1>
                </div>
            </section>

            {/* Bio section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    <div className="flex flex-col gap-8">
                        <p className="text-2xl md:text-3xl font-light text-white/80 leading-relaxed">
                            I'm Coffee — a photographer and creative director
                            based in <span className="text-white">Lagos, Nigeria</span>,
                            with an eye for detail and a love for storytelling.
                        </p>

                        <p className="text-white/40 text-base font-light leading-relaxed">
                            With every click of the shutter, I seek to capture beauty in its truest form —
                            raw, radiant, and real. From the joy of "I do" to the quiet confidence of a
                            portrait, my lens tells stories that speak. My style is honest yet artful,
                            blending light, emotion, and thoughtful composition to craft timeless visuals
                            that linger in the heart.
                        </p>

                        <p className="text-white/40 text-base font-light leading-relaxed">
                            I specialize in weddings, events, studio portraits, proposals, and outdoor
                            sessions. Based in Lagos but available to travel anywhere in Nigeria and
                            internationally.
                        </p>

                        <div className="flex flex-wrap gap-3 pt-4">
                            <Link href="/booking">
                                <button className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors duration-300">
                                    Book a Session
                                    <ArrowUpRight size={14} />
                                </button>
                            </Link>
                            <Link href="/portfolio">
                                <button className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/50 text-white text-xs font-light uppercase tracking-[0.2em] rounded-full transition-all duration-300">
                                    View Portfolio
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        {STATS.map((stat) => (
                            <div
                                key={stat.label}
                                className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl"
                            >
                                <p className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                                    {stat.number}
                                </p>
                                <p className="text-[10px] text-white/30 uppercase tracking-[0.3em]">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="border-t border-white/5 py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex items-center gap-3 mb-16">
                        <div className="h-px w-10 bg-amber-400/60" />
                        <span className="text-[10px] text-amber-400 uppercase tracking-[0.5em]">
                            The Journey
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {TIMELINE.map((item, i) => (
                            <div
                                key={item.year}
                                className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors duration-300"
                            >
                                <span className="text-[10px] text-amber-400/60 font-mono uppercase tracking-[0.3em] block mb-3">
                                    {item.year}
                                </span>
                                <h3 className="text-base font-bold text-white mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-white/40 font-light leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tools */}
            <section className="border-t border-white/5 py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex items-center gap-3 mb-16">
                        <div className="h-px w-10 bg-amber-400/60" />
                        <span className="text-[10px] text-amber-400 uppercase tracking-[0.5em]">
                            Stack & Tools
                        </span>
                    </div>

                    <div className="divide-y divide-white/5">
                        {TOOLS.map((tool, i) => (
                            <div
                                key={tool.name}
                                className="flex items-center justify-between py-6 group hover:pl-2 transition-all duration-300"
                            >
                                <div className="flex items-center gap-6">
                                    <span className="text-[10px] text-amber-500/30 font-mono">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div>
                                        <p className="text-lg font-semibold text-white group-hover:text-amber-300 transition-colors duration-300">
                                            {tool.name}
                                        </p>
                                        <p className="text-xs text-white/30 mt-0.5">
                                            {tool.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="border-t border-white/5 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-6xl font-extrabold leading-[0.95] tracking-tight mb-6">
                        Ready to work
                        <br />
                        <span className="text-white/20">together?</span>
                    </h2>
                    <p className="text-white/40 text-sm mb-8 max-w-sm mx-auto">
                        Let's create something beautiful. Book a session or reach out to discuss your project.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/booking">
                            <button className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors duration-300">
                                Book a Session
                            </button>
                        </Link>
                        <Link href="/contact">
                            <button className="px-8 py-3.5 border border-white/20 hover:border-white/50 text-white text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300">
                                Get in Touch
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}