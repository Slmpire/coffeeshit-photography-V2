import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { createClient } from "@/prismicio";

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

const CATEGORIES = [
    { uid: "wedding", label: "Weddings" },
    { uid: "event", label: "Events" },
    { uid: "portrait", label: "Portraits" },
    { uid: "proposal", label: "Proposals" },
];

export default async function PortfolioPage() {
    const client = createClient();
    let galleryTypes: any[] = [];
    try {
        galleryTypes = await client.getAllByType("gallery_types" as any);
    } catch (e) {
        galleryTypes = [];
    }

    const categories = galleryTypes.length > 0
        ? galleryTypes.map((g: any) => ({
            uid: g.uid,
            label: g.data.title as string,
            description: g.data.description as string,
            image: g.data.cover_image?.url ?? "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
        }))
        : CATEGORIES.map((c) => ({
            ...c,
            description: `Browse Coffee's ${c.label.toLowerCase()} photography work.`,
            image: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
        }));

    return (
        <main className="w-full bg-black text-white min-h-screen">

            {/* Hero */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-px w-10 bg-amber-400/60" />
                        <span className="text-[10px] text-amber-400 uppercase tracking-[0.5em]">
                            Portfolio
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-16">
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-[0.9] tracking-tight">
                            The work
                            <br />
                            <span className="text-white/20">speaks</span>
                            <br />
                            for itself.
                        </h1>
                        <p className="text-white/40 text-base font-light leading-relaxed max-w-sm md:ml-auto">
                            Browse Coffee's photography work by category. Every image is a story worth telling.
                        </p>
                    </div>

                    {/* Category grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categories.map((cat, i) => (
                            <Link
                                key={cat.uid}
                                href={`/gallery/${cat.uid}`}
                                className="group relative overflow-hidden rounded-2xl"
                            >
                                <div className={`relative overflow-hidden ${i === 0 ? "h-[60vh]" : "h-[45vh]"}`}>
                                    <Image
                                        src={cat.image}
                                        alt={cat.label}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                    {/* Hover arrow */}
                                    <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                                        <ArrowUpRight size={14} className="text-black" />
                                    </div>

                                    {/* Info */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <p className="text-[9px] text-amber-400/60 uppercase tracking-[0.4em] mb-1">
                                            Browse Gallery
                                        </p>
                                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                                            {cat.label}
                                        </h2>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="border-t border-white/5 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-white/30 text-sm mb-6">
                        Love what you see?
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