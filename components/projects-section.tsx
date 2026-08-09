"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectsDocument } from "@/prismicio-types";

interface ProjectsSectionProps {
    projects: ProjectsDocument[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    const validProjects = projects?.filter(Boolean).slice(0, 4) ?? [];

    return (
        <section
            ref={ref}
            id="projects"
            className="w-full bg-black text-white py-24 md:py-32 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3 mb-16"
                >
                    <div className="h-px w-10 bg-amber-400/60" />
                    <span className="text-[10px] text-amber-400 uppercase tracking-[0.5em]">
                        Featured Work
                    </span>
                </motion.div>

                {/* Heading row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-16">
                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: 80, opacity: 0 }}
                            animate={inView ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                            className="text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight"
                        >
                            Latest
                            <br />
                            <span className="text-white/20">Projects</span>
                        </motion.h2>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-white/40 text-base font-light leading-relaxed max-w-sm md:ml-auto"
                    >
                        Every photograph tells a story. These are a reflection
                        of the moments, emotions, and artistry captured over time.
                    </motion.p>
                </div>

                {/* Project grid */}
                {validProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-16">
                        {validProjects.map((item: any, idx) => {
                            const project = item?.project ?? item;
                            if (!project) return null;

                            const year = project?.last_publication_date
                                ? String(project.last_publication_date).slice(0, 4)
                                : "2025";
                            const category = project?.data?.category?.uid
                                ?.replace(/-/g, " ")
                                ?.toUpperCase() ?? "PHOTOGRAPHY";
                            const isLarge = idx === 0;

                            return (
                                <motion.div
                                    key={project.id ?? idx}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.7, delay: 0.1 * idx }}
                                    className={isLarge ? "md:row-span-2" : ""}
                                >
                                    <Link
                                        href={`/projects/${project?.uid ?? "#"}`}
                                        className="group block relative overflow-hidden rounded-2xl"
                                    >
                                        {/* Image */}
                                        <div className={`relative overflow-hidden ${isLarge ? "h-[480px] md:h-[620px]" : "h-[280px] md:h-[300px]"}`}>
                                            <Image
                                                src={project?.data?.cover_image?.url ?? "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress"}
                                                alt={project?.data?.title ?? "Project"}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                                            {/* Hover arrow */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileHover={{ opacity: 1, scale: 1 }}
                                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            >
                                                <ArrowUpRight size={16} className="text-black" />
                                            </motion.div>
                                        </div>

                                        {/* Card info */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <div className="flex items-end justify-between">
                                                <div>
                                                    <span className="text-[9px] text-amber-400/70 uppercase tracking-[0.3em] block mb-1">
                                                        {category} · {year}
                                                    </span>
                                                    <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                                                        {project?.data?.title ?? "Untitled Project"}
                                                    </h3>
                                                </div>
                                                <ArrowUpRight
                                                    size={20}
                                                    className="text-white/30 group-hover:text-amber-400 transition-colors duration-300 flex-shrink-0 ml-4"
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    /* Empty state */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="h-[280px] rounded-2xl bg-white/5 border border-white/5 animate-pulse"
                            />
                        ))}
                    </div>
                )}

                {/* View all CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex justify-center"
                >
                    <Link href="/projects">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-3 px-8 py-4 border border-white/15 hover:border-white/40 text-white text-xs font-light uppercase tracking-[0.3em] rounded-full transition-all duration-300"
                        >
                            View All Projects
                            <ArrowUpRight size={14} />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}