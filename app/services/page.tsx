import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { createClient } from "@/prismicio";
import { ServicesDocument } from "@/prismicio-types";
import { PrismicRichText } from "@prismicio/react";

export const metadata: Metadata = {
    title: "About",
    description: "Learn about Coffee — professional photographer and creative director based in Lagos, Nigeria.",
    openGraph: {
        title: "About Coffee | CoffeeShotIt",
        description: "The person behind the lens — professional photographer based in Lagos, Nigeria.",
        images: ["https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress"],
    },
};

export const revalidate = 60;

const FALLBACK_SERVICES = [
    { title: "Wedding Photography", subtitle: "Full Day Coverage", description: "From getting ready to the last dance — every emotion, every moment, captured with intention and artistry.", image: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress" },
    { title: "Event Photography", subtitle: "Half Day or Full Day", description: "Birthdays, proposals, burials, corporate events — every celebration deserves to be remembered.", image: "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress" },
    { title: "Portrait Sessions", subtitle: "Studio & Outdoor", description: "Professional headshots, personal branding, creative portraits — images that tell your story.", image: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress" },
    { title: "Proposal Photography", subtitle: "Surprise Coverage", description: "Capture the moment she says yes. Discreet, professional coverage of your most important question.", image: "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress" },
];

export default async function ServicesPage() {
    const client = createClient();
    let services: ServicesDocument[] = [];
    try {
        services = await client.getAllByType("services") as unknown as ServicesDocument[];
    } catch (e) {
        services = [];
    }

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
                            Every service is approached with the same level of care, creativity, and professionalism. No two shoots are the same.
                        </p>
                    </div>

                    {/* Service list from Prismic or fallback */}
                    {services.length > 0 ? (
                        <div className="divide-y divide-white/5">
                            {services.map((service, i) => (
                                <div key={service.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-16 group">
                                    <div className="flex flex-col justify-center gap-4">
                                        <span className="text-[10px] text-amber-500/40 font-mono">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                                            {service.data.title as string}
                                        </h2>
                                        <p className="text-xs text-amber-400/60 uppercase tracking-[0.3em]">
                                            {service.data.subtitle as string}
                                        </p>
                                        <div className="text-white/40 text-sm font-light leading-relaxed max-w-md prose prose-invert prose-sm">
                                            <PrismicRichText field={service.data.description} />
                                        </div>
                                        <Link href="/booking" className="w-fit mt-2">
                                            <button className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors duration-300">
                                                Book This
                                                <ArrowUpRight size={12} />
                                            </button>
                                        </Link>
                                    </div>
                                    {service.data.feature_image?.url && (
                                        <div className="relative h-[400px] rounded-2xl overflow-hidden">
                                            <Image
                                                src={service.data.feature_image.url}
                                                alt={service.data.title as string}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                sizes="(max-width: 1024px) 100vw, 50vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="divide-y divide-white/5">
                            {FALLBACK_SERVICES.map((service, i) => (
                                <div key={service.title} className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-16 group">
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
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="border-t border-white/5 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-[0.95] mb-4">
                        Ready to book?
                    </h2>
                    <p className="text-white/30 text-sm mb-8">
                        Secure your date before it's gone.
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