import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES, IMAGES } from "@/content/site.config";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Services — CoffeeShotIt",
    description:
        "Professional photography services: weddings, events, studio portraits, proposals and outdoor sessions in Lagos, Nigeria.",
    openGraph: {
        title: "Photography Services | CoffeeShotIt",
        description: "Weddings, events, portraits and proposals — every service approached with care.",
        images: [IMAGES.aboutHero.url],
    },
};

export default function ServicesPage() {
    return (
        <main className="w-full bg-black text-white min-h-screen">
            {/* Hero */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-px w-10 bg-amber-400/60" />
                        <span className="text-[10px] text-amber-400 uppercase tracking-[0.5em]">
                            Services
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-20">
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-[0.9] tracking-tight">
                            What Coffee
                            <br />
                            <span className="text-white/20">shoots</span>
                            <br />
                            best.
                        </h1>
                        <p className="text-white/40 text-base font-light leading-relaxed max-w-sm md:ml-auto">
                            Every service is approached with the same level of care,
                            creativity, and professionalism. No two shoots are the same.
                        </p>
                    </div>

                    {/* Service list */}
                    <div className="divide-y divide-white/5">
                        {SERVICES.map((service, i) => (
                            <div
                                key={service.uid}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-16 group"
                            >
                                <div className="flex flex-col justify-center gap-4">
                                    <span className="text-[10px] text-amber-500/40 font-mono">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                                        {service.title}
                                    </h2>
                                    <p className="text-xs text-amber-400/60 uppercase tracking-[0.3em]">
                                        {service.subtitle}
                                    </p>
                                    <p className="text-white/40 text-sm font-light leading-relaxed max-w-md">
                                        {service.description}
                                    </p>
                                    <Link href="/booking" className="w-fit mt-2">
                                        <button className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors duration-300">
                                            Book This
                                            <ArrowUpRight size={12} />
                                        </button>
                                    </Link>
                                </div>
                                <div className="relative h-[400px] rounded-2xl overflow-hidden">
                                    <Image
                                        src={service.image.url}
                                        alt={service.image.alt}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="border-t border-white/5 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-[0.95] mb-4">
                        Ready to book?
                    </h2>
                    <p className="text-white/30 text-sm mb-8">
                        Secure your date before it&apos;s gone.
                    </p>
                    <Link href="/booking">
                        <button className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors duration-300">
                            Book a Session
                        </button>
                    </Link>
                </div>
            </section>
        </main>
    );
}