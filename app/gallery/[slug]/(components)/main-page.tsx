"use client";

import { GalleryTypesDocument } from "@/prismicio-types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, X } from "lucide-react";

export default function GalleryMainPage({
    galleryType,
}: {
    galleryType: GalleryTypesDocument;
}) {
    const [selected, setSelected] = useState<string | null>(null);
    const [selectedIdx, setSelectedIdx] = useState<number>(0);

    const gallery = galleryType?.data?.gallery ?? [];
    const title = galleryType?.data?.title as string;
    const description = galleryType?.data?.description as string;

    const openLightbox = (url: string, idx: number) => {
        setSelected(url);
        setSelectedIdx(idx);
    };

    const navigate = (dir: 1 | -1) => {
        const validImages = gallery.filter((item: any) => item?.image?.url);
        const newIdx = (selectedIdx + dir + validImages.length) % validImages.length;
        setSelectedIdx(newIdx);
        setSelected((validImages[newIdx] as any)?.image?.url);
    };

    return (
        <main className="w-full bg-black text-white min-h-screen">

            {/* Hero */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    {/* Back */}
                    <Link href="/portfolio">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-white/30 hover:text-white text-xs uppercase tracking-[0.2em] mb-10 transition-colors w-fit"
                        >
                            <ArrowLeft size={14} />
                            Portfolio
                        </motion.div>
                    </Link>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-16">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-px w-10 bg-amber-400/60" />
                                <span className="text-[10px] text-amber-400 uppercase tracking-[0.5em]">
                                    Portfolio
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-extrabold leading-[0.9] tracking-tight">
                                {title}
                            </h1>
                        </div>
                        <div className="md:ml-auto">
                            <p className="text-white/40 text-base font-light leading-relaxed max-w-sm mb-3">
                                {description}
                            </p>
                            <p className="text-[10px] text-white/20 uppercase tracking-[0.3em]">
                                {gallery.filter((item: any) => item?.image?.url).length} photos
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery masonry */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                {gallery.length > 0 ? (
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
                        {gallery.map((item: any, idx: number) => {
                            const url = item?.image?.url;
                            if (!url) return null;

                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: Math.min(idx * 0.03, 0.3) }}
                                    className="break-inside-avoid relative overflow-hidden rounded-xl cursor-pointer group"
                                    onClick={() => openLightbox(url, idx)}
                                >
                                    <Image
                                        src={url}
                                        alt={item?.image?.alt ?? `${title} photo ${idx + 1}`}
                                        width={800}
                                        height={600}
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        loading={idx < 6 ? "eager" : "lazy"}
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500" />
                                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <ArrowUpRight size={12} className="text-white" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <p className="text-white/20 text-sm uppercase tracking-[0.3em]">
                            No photos yet
                        </p>
                        <p className="text-white/10 text-xs mt-2">
                            Check back soon
                        </p>
                    </div>
                )}
            </section>

            {/* CTA */}
            <section className="border-t border-white/5 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-white/30 text-sm mb-6">
                        Love what you see?
                    </p>
                    <Link href="/booking">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors duration-300"
                        >
                            Book a Session
                        </motion.button>
                    </Link>
                </div>
            </section>

            {/* Lightbox */}
            {selected && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-[500] bg-black/97 backdrop-blur-md flex items-center justify-center"
                    onClick={() => setSelected(null)}
                >
                    {/* Close */}
                    <button
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
                        onClick={() => setSelected(null)}
                    >
                        <X size={16} />
                    </button>

                    {/* Prev */}
                    <button
                        className="absolute left-4 md:left-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
                        onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                    >
                        <ArrowLeft size={16} />
                    </button>

                    {/* Next */}
                    <button
                        className="absolute right-4 md:right-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
                        onClick={(e) => { e.stopPropagation(); navigate(1); }}
                    >
                        <ArrowUpRight size={16} className="rotate-90" />
                    </button>

                    {/* Image */}
                    <motion.div
                        key={selected}
                        initial={{ scale: 0.92, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full max-w-5xl max-h-[85vh] mx-auto px-16"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selected}
                            alt="Full size"
                            fill
                            className="object-contain"
                            sizes="100vw"
                        />
                    </motion.div>

                    {/* Counter */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white/30 uppercase tracking-[0.3em]">
                        {selectedIdx + 1} / {gallery.filter((i: any) => i?.image?.url).length}
                    </div>
                </motion.div>
            )}
        </main>
    );
}