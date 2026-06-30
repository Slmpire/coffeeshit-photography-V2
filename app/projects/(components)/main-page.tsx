"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ProjectCard from "@/components/project-card";
import ProjectFilter from "@/components/project-filter";
import { CategoriesDocument, ProjectsDocument } from "@/prismicio-types";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedProjects } from "../actions";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Camera, Filter, Search, RefreshCw } from "lucide-react";

interface MainPageProps {
    categories: CategoriesDocument[];
}

export default function Projects({ categories }: MainPageProps) {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const {
        data: projects,
        isLoading,
        isError,
        refetch,
        isRefetching,
    } = useQuery({
        queryKey: ["projects", selectedCategory, currentPage],
        queryFn: () =>
            getPaginatedProjects(
                currentPage,
                10,
                selectedCategory === "all" ? "" : selectedCategory
            ),
        staleTime: 1000 * 60 * 5, // 5 minutes - data becomes stale after 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes - cache garbage collection
        refetchOnWindowFocus: true, // Refetch when window regains focus
        refetchOnMount: true, // Always refetch when component mounts
        retry: 3, // Retry failed requests 3 times
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    });

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Reset to first page when category changes
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleRefresh = () => {
        refetch();
    };

    // Generate page numbers for pagination
    const generatePageNumbers = () => {
        if (!projects?.totalPages) return [];

        const totalPages = projects.totalPages;
        const current = currentPage;
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            // Show all pages if total is 7 or less
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (current > 3) {
                pages.push("ellipsis-start");
            }

            // Show pages around current page
            const start = Math.max(2, current - 1);
            const end = Math.min(totalPages - 1, current + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (current < totalPages - 2) {
                pages.push("ellipsis-end");
            }

            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    // Empty state component
    const EmptyState = () => (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-center py-20'
        >
            <div className='relative mb-8'>
                <motion.div
                    animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className='inline-flex items-center justify-center w-24 h-24 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6'
                >
                    <Camera className='w-12 h-12 text-white/60' />
                </motion.div>

                {/* Floating elements */}
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className='absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-sm'
                />
                <motion.div
                    animate={{
                        y: [0, 10, 0],
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                    className='absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-sm'
                />
            </div>

            <h3 className='text-2xl lg:text-3xl font-bold mb-4 signature-font'>
                {selectedCategory === "all"
                    ? "No Projects Found"
                    : `No ${selectedCategory} Projects`}
            </h3>

            <p className='text-lg text-amber-300 max-w-md mx-auto mb-8 leading-relaxed'>
                {selectedCategory === "all"
                    ? "It looks like there are no projects available at the moment. Check back soon for new photography work!"
                    : `No projects found in the ${selectedCategory} category. Try selecting a different category or check back later.`}
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategoryChange("all")}
                    className='flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-sm font-medium hover:bg-white/20 transition-colors'
                >
                    <Search className='w-4 h-4' />
                    View All Projects
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className='flex items-center gap-2 bg-transparent border border-white/20 rounded-full px-6 py-3 text-sm font-medium hover:bg-white/10 transition-colors'
                >
                    <Filter className='w-4 h-4' />
                    Change Category
                </motion.button>
            </div>

            {/* Decorative background elements */}
            <div className='absolute inset-0 pointer-events-none overflow-hidden'>
                <div className='absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-full blur-3xl' />
                <div className='absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-full blur-3xl' />
            </div>
        </motion.div>
    );

    return (
        <div className='p-4 md:p-12 pt-24'>
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-center mb-16'
            >
                <h1 className='text-4xl lg:text-6xl font-bold mb-6 signature-font'>
                    My Projects
                </h1>
                <p className='text-lg lg:text-xl  max-w-2xl mx-auto'>
                    A curated collection of my photography work across various
                    disciplines and moments
                </p>
            </motion.div>

            {/* Filter */}
            <ProjectFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />

            {/* Refresh Button */}
            <div className='flex justify-end mb-8'>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRefresh}
                    disabled={isRefetching}
                    className='flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    <RefreshCw
                        className={`w-4 h-4 ${isRefetching ? "animate-spin" : ""}`}
                    />
                    {isRefetching ? "Refreshing..." : "Refresh"}
                </motion.button>
            </div>

            {/* Loading State */}
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='text-center py-20'
                >
                    <div className='inline-flex items-center justify-center w-16 h-16 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6'>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className='w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full'
                        />
                    </div>
                    <p className='text-lg text-amber-300'>
                        Loading projects...
                    </p>
                </motion.div>
            )}

            {/* Error State */}
            {isError && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='text-center py-20'
                >
                    <div className='inline-flex items-center justify-center w-16 h-16 bg-red-500/10 backdrop-blur-sm rounded-full border border-red-500/20 mb-6'>
                        <div className='w-8 h-8 text-red-400'>⚠️</div>
                    </div>
                    <h3 className='text-xl font-bold mb-2'>
                        Something went wrong
                    </h3>
                    <p className='text-amber-300 mb-4'>
                        Failed to load projects. Please try again later.
                    </p>
                    <div className='flex gap-4 justify-center'>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => refetch()}
                            className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-sm font-medium hover:bg-white/20 transition-colors'
                        >
                            Try Again
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.reload()}
                            className='bg-transparent border border-white/20 rounded-full px-6 py-3 text-sm font-medium hover:bg-white/10 transition-colors'
                        >
                            Reload Page
                        </motion.button>
                    </div>
                </motion.div>
            )}

            {/* Projects Grid or Empty State */}
            {!isLoading && !isError && (
                <>
                    {projects?.data && projects.data.length > 0 ? (
                        <>
                            <motion.div
                                layout
                                className='grid grid-cols-1 md:grid-cols-2  gap-8'
                            >
                                {projects.data.map(
                                    (project: ProjectsDocument) => (
                                        <ProjectCard
                                            key={project.id}
                                            project={project}
                                        />
                                    )
                                )}
                            </motion.div>

                            {/* Pagination */}
                            {projects && projects.totalPages > 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    viewport={{ once: true }}
                                    className='mt-16'
                                >
                                    <Pagination>
                                        <PaginationContent>
                                            {/* Previous Button */}
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    href='#'
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (currentPage > 1) {
                                                            handlePageChange(
                                                                currentPage - 1
                                                            );
                                                        }
                                                    }}
                                                    className={
                                                        currentPage <= 1
                                                            ? "pointer-events-none opacity-50"
                                                            : ""
                                                    }
                                                />
                                            </PaginationItem>

                                            {/* Page Numbers */}
                                            {generatePageNumbers().map(
                                                (page, index) => (
                                                    <PaginationItem key={index}>
                                                        {page ===
                                                            "ellipsis-start" ||
                                                        page ===
                                                            "ellipsis-end" ? (
                                                            <PaginationEllipsis />
                                                        ) : (
                                                            <PaginationLink
                                                                href='#'
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    handlePageChange(
                                                                        page as number
                                                                    );
                                                                }}
                                                                isActive={
                                                                    currentPage ===
                                                                    page
                                                                }
                                                            >
                                                                {page}
                                                            </PaginationLink>
                                                        )}
                                                    </PaginationItem>
                                                )
                                            )}

                                            {/* Next Button */}
                                            <PaginationItem>
                                                <PaginationNext
                                                    href='#'
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (
                                                            currentPage <
                                                            projects.totalPages
                                                        ) {
                                                            handlePageChange(
                                                                currentPage + 1
                                                            );
                                                        }
                                                    }}
                                                    className={
                                                        currentPage >=
                                                        projects.totalPages
                                                            ? "pointer-events-none opacity-50"
                                                            : ""
                                                    }
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </motion.div>
                            )}
                        </>
                    ) : (
                        <EmptyState />
                    )}
                </>
            )}
        </div>
    );
}
