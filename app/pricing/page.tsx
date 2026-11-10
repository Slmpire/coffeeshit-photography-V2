import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

export const metadata: Metadata = {
    title: "Pricing",
    description: "Photography and videography pricing packages — studio, outdoor, events, weddings, and content creation.",
};

const PRICING = [
    {
        category: "Studio Sessions",
        tiers: [
            {
                name: "Package One",
                price: "₦100,000",
                includes: [
                    "4 edited pictures",
                    "1–2 outfits",
                    "1-hour session",
                ],
            },
            {
                name: "Package Two",
                price: "₦162,500",
                featured: true,
                includes: [
                    "7 edited pictures",
                    "1–3 outfits",
                    "1 hour 30 mins session",
                ],
            },
        ],
    },
    {
        category: "Outdoor Sessions",
        tiers: [
            {
                name: "Package One",
                price: "₦150,000",
                includes: [
                    "5 edited pictures",
                    "1–2 outfits",
                    "1-hour session",
                ],
            },
            {
                name: "Package Two",
                price: "₦237,500",
                featured: true,
                includes: [
                    "12 edited pictures",
                    "1–3 outfits",
                    "2-hour session",
                ],
            },
        ],
    },
    {
        category: "CoffeeShoot for Events",
        tiers: [
            {
                name: "Basic",
                price: "₦356,250",
                includes: [
                    "1 Photographer",
                    "Online Gallery",
                    "Flash Drive Containing All Pictures",
                ],
            },
            {
                name: "Premium",
                price: "₦581,250",
                featured: true,
                includes: [
                    "2 Photographers",
                    "Online Gallery",
                    "Standard Photobook",
                    "Flash Drive Containing All Pictures",
                ],
            },
        ],
    },
    {
        category: "Day's Event Packages",
        tiers: [
            {
                name: "Basic",
                price: "₦750,000",
                includes: [
                    "1 Photographer & 1 Videographer",
                    "Online Gallery",
                    "Flash Drive Containing Photos & Videos",
                ],
            },
            {
                name: "Standard",
                price: "₦1,000,000",
                includes: [
                    "1 Photographer & 1 Videographer",
                    "1 Photo Frame & 1 Photo Book",
                    "Flash Drive Containing Pictures & Video",
                ],
            },
            {
                name: "Premium",
                price: "₦1,037,000",
                featured: true,
                includes: [
                    "2 Photographers & 2 Videographers",
                    "Flash Drive Containing Pictures & Video",
                ],
            },
            {
                name: "Luxury",
                price: "₦1,287,500",
                includes: [
                    "2 Photographers & 2 Videographers",
                    "2 Photo Frames & 1 Photo Book",
                    "Flash Drive Containing Pictures & Videos",
                ],
            },
        ],
    },
    {
        category: "Wedding Packages",
        tiers: [
            {
                name: "Package One",
                price: "From ₦843,750",
                subtitle: "One Event · Two Events: ₦1,156,250",
                includes: [
                    "1 Photographer",
                    "200 Digital Pictures & Online Gallery",
                    "Complimentary Pre-Wedding (1 Outfit, 4 Edited Pictures)",
                ],
            },
            {
                name: "Package One Plus",
                price: "From ₦1,218,750",
                subtitle: "One Event · Two Events: ₦1,656,250",
                includes: [
                    "1 Photographer & 1 Videographer",
                    "200 Digital Images & Online Gallery",
                    "Cinematic Reels & Full Video on Drive",
                    "Complimentary Pre-Wedding (1 Outfit, 4 Edited Pictures & 45-sec Reel)",
                ],
            },
            {
                name: "Package Two",
                price: "From ₦1,031,250",
                subtitle: "One Event · Two Events: ₦1,406,250",
                featured: true,
                includes: [
                    "1 Photographer",
                    "350 Digital Pictures",
                    "1 Medium Photobook (10/24 Inches)",
                    "Edited Pictures on Google Drive/Flash Drive",
                    "Complimentary Pre-Wedding (1 Outfit, 4 Pictures)",
                ],
            },
            {
                name: "Package Two Plus",
                price: "From ₦1,343,750",
                subtitle: "One Event · Two Events: ₦1,968,750",
                includes: [
                    "1 Photographer & 1 Videographer",
                    "350 Digital Pictures",
                    "1 Medium Photobook (10/24 Inches)",
                    "Cinematic Thriller (Reels & Full Video)",
                    "Flash Drive Containing All Media",
                    "Complimentary Pre-Wedding (2 Outfits, 12 Pictures)",
                ],
            },
            {
                name: "Package Three — Deluxe",
                price: "From ₦1,968,750",
                subtitle: "One Event · Two Events: ₦2,343,750",
                includes: [
                    "2 Photographers & 2 Videographers",
                    "500 Digital Pictures & Online Gallery",
                    "Large Photobook (12/30 Inches)",
                    "Large Frame (16/20 Inches)",
                    "Cinematic Thriller, Reels & Full Video on Flash Drive",
                    "Complimentary Pre-Wedding (3 Outfits, 15 Pictures)",
                    "Complimentary Pre-Wedding Video (Q & A)",
                ],
            },
        ],
    },
    {
        category: "Content Creation",
        tiers: [
            {
                name: "1 Reel",
                price: "₦150,000",
                includes: ["1 Event", "1 Cinematic Reel"],
            },
            {
                name: "Reels Package",
                price: "₦187,500",
                featured: true,
                includes: ["1 Event", "Multiple Reels"],
            },
            {
                name: "3 Reels",
                price: "₦237,500",
                includes: ["1 Event", "3 Cinematic Reels"],
            },
        ],
    },
];

const EXTRAS = [
    { label: "Extra Hour (Studio & Outdoor)", price: "₦31,250" },
    { label: "Extra Outfit Change", price: "₦43,750" },
    { label: "Content Creator Add-on", price: "₦100,000" },
];

export default function PricingPage() {
    return (
        <main className="w-full bg-black text-white min-h-screen">

            {/* Hero */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-px w-10 bg-amber-400/60" />
                        <span className="text-[10px] text-amber-400 uppercase tracking-[0.5em]">
                            Pricing
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-4">
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-[0.9] tracking-tight">
                            Simple,
                            <br />
                            <span className="text-white/20">transparent</span>
                            <br />
                            pricing.
                        </h1>
                        <p className="text-white/40 text-base font-light leading-relaxed max-w-sm md:ml-auto">
                            All prices are fixed rate. Contact Coffee for custom packages or destination shoots.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pricing tables */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="flex flex-col gap-20">
                    {PRICING.map((pkg) => (
                        <div key={pkg.category}>

                            {/* Category header */}
                            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/5">
                                <h2 className="text-lg font-bold text-white">
                                    {pkg.category}
                                </h2>
                            </div>

                            {/* Tiers grid */}
                            <div className={`grid grid-cols-1 gap-4 ${
                                pkg.tiers.length === 2
                                    ? "md:grid-cols-2"
                                    : pkg.tiers.length === 3
                                    ? "md:grid-cols-3"
                                    : "md:grid-cols-2 lg:grid-cols-4"
                            }`}>
                                {pkg.tiers.map((tier) => (
                                    <div
                                        key={tier.name}
                                        className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-300 ${
                                            tier.featured
                                                ? "bg-amber-500/5 border-amber-500/30"
                                                : "bg-white/[0.02] border-white/8 hover:bg-white/[0.04]"
                                        }`}
                                    >
                                        {tier.featured && (
                                            <div className="absolute -top-3 left-6">
                                                <span className="px-3 py-1 bg-amber-500 text-black text-[9px] font-bold uppercase tracking-[0.3em] rounded-full">
                                                    Popular
                                                </span>
                                            </div>
                                        )}

                                        <div className="mb-5">
                                            <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] mb-2">
                                                {tier.name}
                                            </p>
                                            <p className="text-2xl md:text-3xl font-extrabold text-white mb-1">
                                                {tier.price}
                                            </p>
                                            {(tier as any).subtitle && (
                                                <p className="text-[10px] text-amber-400/50 leading-relaxed mt-1">
                                                    {(tier as any).subtitle}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2.5 flex-1 mb-6">
                                            {tier.includes.map((item) => (
                                                <div key={item} className="flex items-start gap-2.5">
                                                    <Check size={11} className="text-amber-400 flex-shrink-0 mt-0.5" />
                                                    <span className="text-xs text-white/50 font-light leading-relaxed">
                                                        {item}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <Link href="/booking">
                                            <button className={`w-full py-2.5 text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${
                                                tier.featured
                                                    ? "bg-amber-500 hover:bg-amber-400 text-black"
                                                    : "border border-white/15 hover:border-white/40 text-white"
                                            }`}>
                                                Book Now
                                            </button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Extra Services */}
                <div className="mt-20 pt-8 border-t border-white/5">
                    <h2 className="text-lg font-bold text-white mb-6">
                        Extra Services
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {EXTRAS.map((extra) => (
                            <div
                                key={extra.label}
                                className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl"
                            >
                                <span className="text-sm text-white/50 font-light">
                                    {extra.label}
                                </span>
                                <span className="text-sm font-bold text-amber-400 flex-shrink-0 ml-4">
                                    {extra.price}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-12 pt-8 border-t border-white/5">
                    <p className="text-white/20 text-sm text-center max-w-2xl mx-auto leading-relaxed">
                        All prices are in Nigerian Naira (₦). Travel outside Lagos is charged separately.
                        Contact Coffee for destination shoots, custom packages, or corporate rates.
                    </p>
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
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/booking">
                            <button className="flex items-center gap-2 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors duration-300">
                                Book a Session
                                <ArrowUpRight size={14} />
                            </button>
                        </Link>
                        
                         <a   href="https://wa.me/2348116273856?text=Hi%20Coffee%2C%20I%27d%20like%20to%20get%20a%20custom%20quote"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3.5 border border-white/20 hover:border-white/50 text-white text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300"
                        >
                            Get a Custom Quote
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}