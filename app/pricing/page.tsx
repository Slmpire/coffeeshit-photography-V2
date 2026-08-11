import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

export const metadata: Metadata = {
    title: "Pricing",
    description: "Photography pricing packages for weddings, events, and portrait sessions.",
};

const PACKAGES = [
    {
        category: "Wedding Photography",
        tiers: [
            {
                name: "Essential",
                price: "₦250,000",
                duration: "6 hours",
                includes: [
                    "6 hours of coverage",
                    "1 photographer",
                    "300+ edited photos",
                    "Private online gallery",
                    "14-day delivery",
                ],
            },
            {
                name: "Premium",
                price: "₦400,000",
                duration: "10 hours",
                includes: [
                    "10 hours of coverage",
                    "1 photographer",
                    "500+ edited photos",
                    "Private online gallery",
                    "Engagement session",
                    "21-day delivery",
                ],
                featured: true,
            },
            {
                name: "Full Coverage",
                price: "₦600,000",
                duration: "Full day",
                includes: [
                    "Full day coverage",
                    "2 photographers",
                    "700+ edited photos",
                    "Private online gallery",
                    "Engagement session",
                    "Drone coverage",
                    "30-day delivery",
                ],
            },
        ],
    },
    {
        category: "Event Photography",
        tiers: [
            {
                name: "Essential",
                price: "₦80,000",
                duration: "3 hours",
                includes: [
                    "3 hours of coverage",
                    "150+ edited photos",
                    "Private online gallery",
                    "7-day delivery",
                ],
            },
            {
                name: "Premium",
                price: "₦150,000",
                duration: "6 hours",
                includes: [
                    "6 hours of coverage",
                    "300+ edited photos",
                    "Private online gallery",
                    "10-day delivery",
                ],
                featured: true,
            },
            {
                name: "Full Coverage",
                price: "₦250,000",
                duration: "Full day",
                includes: [
                    "Full day coverage",
                    "500+ edited photos",
                    "Private online gallery",
                    "Same-week highlights",
                    "14-day full delivery",
                ],
            },
        ],
    },
    {
        category: "Portrait / Studio",
        tiers: [
            {
                name: "Essential",
                price: "₦50,000",
                duration: "1 hour",
                includes: [
                    "1 hour session",
                    "1 outfit/look",
                    "30+ edited photos",
                    "Private online gallery",
                    "7-day delivery",
                ],
            },
            {
                name: "Premium",
                price: "₦90,000",
                duration: "2 hours",
                includes: [
                    "2 hour session",
                    "2 outfits/looks",
                    "60+ edited photos",
                    "Private online gallery",
                    "7-day delivery",
                ],
                featured: true,
            },
            {
                name: "Full Coverage",
                price: "₦150,000",
                duration: "3 hours",
                includes: [
                    "3 hour session",
                    "3 outfits/looks",
                    "100+ edited photos",
                    "Private online gallery",
                    "Location scouting",
                    "7-day delivery",
                ],
            },
        ],
    },
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-[0.9] tracking-tight">
                            Simple,
                            <br />
                            <span className="text-white/20">transparent</span>
                            <br />
                            pricing.
                        </h1>
                        <p className="text-white/40 text-base font-light leading-relaxed max-w-sm md:ml-auto">
                            All prices are starting rates. Final pricing is confirmed during consultation based on your specific needs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pricing tables */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="flex flex-col gap-20">
                    {PACKAGES.map((pkg) => (
                        <div key={pkg.category}>
                            {/* Category header */}
                            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/5">
                                <h2 className="text-lg font-bold text-white">
                                    {pkg.category}
                                </h2>
                            </div>

                            {/* Tiers */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                                    Most Popular
                                                </span>
                                            </div>
                                        )}

                                        <div className="mb-6">
                                            <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] mb-1">
                                                {tier.name}
                                            </p>
                                            <p className="text-3xl font-extrabold text-white mb-1">
                                                {tier.price}
                                            </p>
                                            <p className="text-xs text-amber-400/60 uppercase tracking-[0.2em]">
                                                {tier.duration}
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-3 flex-1 mb-8">
                                            {tier.includes.map((item) => (
                                                <div key={item} className="flex items-start gap-3">
                                                    <Check size={12} className="text-amber-400 flex-shrink-0 mt-0.5" />
                                                    <span className="text-sm text-white/50 font-light">
                                                        {item}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <Link href="/booking">
                                            <button className={`w-full py-3 text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${
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

                {/* Disclaimer */}
                <div className="mt-16 pt-8 border-t border-white/5">
                    <p className="text-white/20 text-sm text-center max-w-2xl mx-auto leading-relaxed">
                        Prices vary based on location, duration, and specific requirements.
                        Travel outside Lagos is charged separately. Contact Coffee for a custom quote.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="border-t border-white/5 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-[0.95] mb-4">
                        Not sure which package?
                    </h2>
                    <p className="text-white/30 text-sm mb-8">
                        Chat with Coffee directly to get a custom quote for your needs.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        
                           <a href="https://wa.me/2348116273856?text=Hi%20Coffee%2C%20I%27d%20like%20to%20get%20a%20custom%20quote"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors duration-300"
                        >
                            Get a Custom Quote
                            <ArrowUpRight size={14} />
                        </a>
                        <Link href="/contact">
                            <button className="px-8 py-3.5 border border-white/20 hover:border-white/50 text-white text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300">
                                Contact Coffee
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}