"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CategoriesDocument, ProjectsDocument } from "@/prismicio-types";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedProjects } from "../actions";

interface MainPageProps {
    categories: CategoriesDocument[];
}

export default function ProjectsMainPage({ categories }: MainPageProps) {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading } = useQuery({
        queryKey: ["projects", selectedCategory, currentPage],
        queryFn: () =>
            getPaginatedProjects(
                currentPage,
                12,
                selectedCategory === "all" ? "" : selectedCategory
            ),
        staleTime: 1000 * 60 * 5,
    });

    const handleCategory = (cat: string) => {
        setSelectedCategory(cat);
        setCurrentPage(1);
    };

    const projects = data?.data ?? [];
    const totalPages = data?.totalPages ?? 1;

    return (
        <main className="w-full bg-black text-white min-h-screen">

            {/* Hero */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-px w-10 bg-amber-400/60" />
                        <span className="text-[10px] text-amber-400 uppercase tracking-[0.5em]">
                            Projects
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-[0.9] tracking-tight">
                            All
                            <br />
                            <span className="text-white/20">Projects</span>
                        </h1>
                        <p className="text-white/40 text-base font-light leading-relaxed max-w-sm md:ml-auto">
                            A curated collection of moments, emotions, and stories captured through Coffee's lens.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter */}
            <section className="px-4 sm:px-6 lg:px-8 mb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap items-center gap-2">
                        {/* All button */}
                        <motion.button
                            onClick={() => handleCategory("all")}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`px-4 py-2 text-[10px] uppercase tracking-[0.3em] rounded-full border transition-all duration-300 ${
                                selectedCategory === "all"
                                    ? "bg-amber-500 border-amber-500 text-black font-bold"
                                    : "border-white/15 text-white/40 hover:border-white/40 hover:text-white"
                            }`}
                        >
                            All
                        </motion.button>

                        {/* Category buttons */}
                        {categories?.map((cat) => (
                            <motion.button
                                key={cat.id}
                                onClick={() => handleCategory(cat.uid)}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className={`px-4 py-2 text-[10px] uppercase tracking-[0.3em] rounded-full border transition-all duration-300 ${
                                    selectedCategory === cat.uid
                                        ? "bg-amber-500 border-amber-500 text-black font-bold"
                                        : "border-white/15 text-white/40 hover:border-white/40 hover:text-white"
                                }`}
                            >
                                {cat.data.title as string}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        /* Skeleton */
                        <motion.div
                            key="skeleton"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        >
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div
                                    key={i}
                                    className="h-[40vh] rounded-2xl bg-white/[0.03] animate-pulse"
                                />
                            ))}
                        </motion.div>
                    ) : projects.length > 0 ? (
                        <motion.div
                            key={`${selectedCategory}-${currentPage}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        >
                            {projects.map((project: ProjectsDocument, idx: number) => {
                                const year = project?.last_publication_date
                                    ? String(project.last_publication_date).slice(0, 4)
                                    : "2025";
                                const category = (project?.data?.category as any)?.uid
                                    ?.replace(/-/g, " ")
                                    ?.toUpperCase() ?? "PHOTOGRAPHY";
                                const isLarge = idx === 0;

                                return (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: Math.min(idx * 0.07, 0.4) }}
                                        className={isLarge ? "md:col-span-2" : ""}
                                    >
                                        <Link
                                            href={`/projects/${project.uid}`}
                                            className="group block relative overflow-hidden rounded-2xl"
                                        >
                                            <div className={`relative overflow-hidden ${
                                                isLarge ? "h-[55vh]" : "h-[40vh]"
                                            }`}>
                                                <Image
                                                    src={project?.data?.cover_image?.url ?? "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress"}
                                                    alt={project?.data?.title as string ?? "Project"}
                                                    fill
                                                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                                                    sizes={isLarge
                                                        ? "(max-width: 768px) 100vw, 66vw"
                                                        : "(max-width: 768px) 100vw, 33vw"
                                                    }
                                                    loading={idx < 3 ? "eager" : "lazy"}
                                                />

                                                {/* Gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                                                {/* Hover overlay */}
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                                                {/* Category tag */}
                                                <div className="absolute top-4 left-4">
                                                    <span className="text-[9px] text-white/60 uppercase tracking-[0.3em] bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                                                        {category}
                                                    </span>
                                                </div>

                                                {/* Hover arrow */}
                                                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                                                    <ArrowUpRight size={14} className="text-black" />
                                                </div>

                                                {/* Info */}
                                                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                                                    <span className="text-[9px] text-amber-400/60 uppercase tracking-[0.3em] block mb-1.5">
                                                        {year}
                                                    </span>
                                                    <div className="flex items-end justify-between">
                                                        <h3 className={`font-bold text-white leading-tight ${
                                                            isLarge ? "text-xl md:text-2xl" : "text-base md:text-lg"
                                                        }`}>
                                                            {project?.data?.title as string ?? "Untitled"}
                                                        </h3>
                                                        <ArrowUpRight
                                                            size={18}
                                                            className="text-white/20 group-hover:text-amber-400 transition-colors duration-300 flex-shrink-0 ml-3"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    ) : (
                        /* Empty state */
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-32 text-center"
                        >
                            <p className="text-white/20 text-sm uppercase tracking-[0.3em] mb-3">
                                No projects found
                            </p>
                            <p className="text-white/10 text-xs mb-8">
                                {selectedCategory !== "all"
                                    ? "Try a different category"
                                    : "Check back soon"}
                            </p>
                            {selectedCategory !== "all" && (
                                <button
                                    onClick={() => handleCategory("all")}
                                    className="px-6 py-2.5 border border-white/15 hover:border-white/40 text-white/40 hover:text-white text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300"
                                >
                                    View All
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && !isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-2 mt-16"
                    >
                        {/* Prev */}
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-[10px] uppercase tracking-[0.2em] border border-white/15 hover:border-white/40 text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed rounded-full transition-all duration-300"
                        >
                            Prev
                        </button>

                        {/* Pages */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => {
                                    setCurrentPage(page);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                                className={`w-9 h-9 text-xs rounded-full border transition-all duration-300 ${
                                    currentPage === page
                                        ? "bg-amber-500 border-amber-500 text-black font-bold"
                                        : "border-white/15 text-white/40 hover:border-white/40 hover:text-white"
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Next */}
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-[10px] uppercase tracking-[0.2em] border border-white/15 hover:border-white/40 text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed rounded-full transition-all duration-300"
                        >
                            Next
                        </button>
                    </motion.div>
                )}
            </section>
        </main>
    );
}