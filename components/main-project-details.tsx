"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, MapPin, Calendar, User } from "lucide-react";
import { ProjectsDocument } from "@/prismicio-types";
import { PrismicRichText } from "@prismicio/react";

interface ProjectDetailsProps {
    project: ProjectsDocument;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
    const [selected, setSelected] = useState<string | null>(null);

    const gallery = project?.data?.gallery ?? [];
    const coverImage = project?.data?.cover_image?.url;
    const title = project?.data?.title as string;
    const client = project?.data?.client as string;
    const location = project?.data?.location as string;
    const date = project?.data?.date as string;
    const category = (project?.data?.category as any)?.uid ?? "";

    const year = date ? new Date(date).getFullYear() : null;

    return (
        <main className="w-full bg-black text-white min-h-screen">

            {/* Hero — full viewport cover image */}
            <section className="relative h-screen overflow-hidden">
                {coverImage && (
                    <Image
                        src={coverImage}
                        alt={title ?? "Project"}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                )}
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Back button */}
                <div className="absolute top-24 left-4 sm:left-8 z-20">
                    <Link href="/projects">
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-2 text-white/50 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors duration-200"
                        >
                            <ArrowLeft size={14} />
                            All Projects
                        </motion.button>
                    </Link>
                </div>

                {/* Hero content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-16 z-10">
                    <div className="max-w-7xl mx-auto">

                        {/* Category + year */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-3 mb-4"
                        >
                            <div className="h-px w-10 bg-amber-400/60" />
                            <span className="text-[10px] text-amber-400 uppercase tracking-[0.5em]">
                                {category.replace(/-/g, " ")}
                                {year && ` · ${year}`}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <div className="overflow-hidden mb-6">
                            <motion.h1
                                initial={{ y: 80, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                                className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight max-w-3xl"
                            >
                                {title}
                            </motion.h1>
                        </div>

                        {/* Meta */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap items-center gap-6"
                        >
                            {client && (
                                <div className="flex items-center gap-2 text-white/40 text-xs">
                                    <User size={12} className="text-amber-400/60" />
                                    <span>{client}</span>
                                </div>
                            )}
                            {location && (
                                <div className="flex items-center gap-2 text-white/40 text-xs">
                                    <MapPin size={12} className="text-amber-400/60" />
                                    <span>{location}</span>
                                </div>
                            )}
                            {date && (
                                <div className="flex items-center gap-2 text-white/40 text-xs">
                                    <Calendar size={12} className="text-amber-400/60" />
                                    <span>{new Date(date).toLocaleDateString("en-NG", { month: "long", year: "numeric" })}</span>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Description */}
            {project?.data?.description && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div className="flex items-center gap-3">
                            <div className="h-px w-10 bg-amber-400/60 flex-shrink-0" />
                            <span className="text-[10px] text-amber-400 uppercase tracking-[0.5em]">
                                About this project
                            </span>
                        </div>
                        <div className="text-white/50 text-base font-light leading-relaxed prose prose-invert prose-sm max-w-none">
                            <PrismicRichText field={project.data.description} />
                        </div>
                    </div>
                </section>
            )}

            {/* Gallery */}
            {gallery.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

                    <div className="flex items-center gap-3 mb-10">
                        <div className="h-px w-10 bg-amber-400/60" />
                        <span className="text-[10px] text-amber-400 uppercase tracking-[0.5em]">
                            Gallery · {gallery.length} photos
                        </span>
                    </div>

                    {/* Masonry-style grid */}
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
                                    transition={{ duration: 0.6, delay: Math.min(idx * 0.04, 0.4) }}
                                    className="break-inside-avoid relative overflow-hidden rounded-xl cursor-pointer group"
                                    onClick={() => setSelected(url)}
                                >
                                    <Image
                                        src={url}
                                        alt={item?.image?.alt ?? `Gallery image ${idx + 1}`}
                                        width={800}
                                        height={600}
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <ArrowUpRight size={12} className="text-white" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Lightbox */}
            {selected && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[500] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setSelected(null)}
                >
                    <button
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        onClick={() => setSelected(null)}
                    >
                        ✕
                    </button>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="relative max-w-5xl max-h-[90vh] w-full h-full"
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
                </motion.div>
            )}

            {/* Bottom CTA */}
            <section className="border-t border-white/5 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold leading-[0.95] mb-3">
                                Love this work?
                                <br />
                                <span className="text-white/20">Let's create yours.</span>
                            </h2>
                            <p className="text-white/40 text-sm font-light">
                                Book a session with Coffee and get the same level of care and artistry for your special moment.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4 md:justify-end">
                            <Link href="/booking">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors duration-300"
                                >
                                    Book a Session
                                    <ArrowUpRight size={14} />
                                </motion.button>
                            </Link>
                            <Link href="/projects">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center gap-2 px-7 py-3.5 border border-white/20 hover:border-white/50 text-white text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300"
                                >
                                    More Projects
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}