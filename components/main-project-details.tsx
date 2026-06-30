"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ImageGallery from "@/components/image-gallery";
import { ProjectsDocument } from "@/prismicio-types";
import { PrismicRichText } from "@prismicio/react";
import ImageGrid from "./ImageGrid";

// Mock data with more images
const getProjectById = (id: string) => {
    const projects = [
        {
            id: 1,
            title: "Sarah & Michael's Wedding",
            category: "Wedding",
            location: "Lagos, Nigeria",
            date: "December 15, 2024",
            description:
                "A beautiful celebration of love captured in the heart of Lagos",
            coverImage: "/logo.jpg",
            images: Array(16).fill("/logo.jpg"),
            client: "Sarah & Michael Johnson",
            duration: "8 hours",
            deliverables: "300+ edited photos",
            tags: ["wedding", "outdoor", "traditional", "modern"],
        },
    ];

    return projects.find((p) => p.id === Number.parseInt(id)) || projects[0];
};

interface ProjectDetailsProps {
    project: ProjectsDocument;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [viewMode, setViewMode] = useState<"masonry" | "grid">("masonry");

    return (
        <div className='p-4 md:p-12 pt-24 py-24'>
            <div className='max-w-7xl mx-auto'>
                {/* Navigation & Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='flex flex-col lg:flex-row mt-12 justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0'
                >
                    {/* Left Side - Navigation & Title */}
                    <div className='flex items-center space-x-6'>
                        {/* <Link href='/projects'>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className='flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium hover:bg-white/20 transition-colors'
                            >
                                <ArrowLeft size={16} />
                                <span className='hidden sm:inline'>Back</span>
                            </motion.button>
                        </Link> */}

                        <div>
                            <h1 className='text-2xl lg:text-4xl font-bold signature-font'>
                                {project?.data?.title}
                            </h1>
                            {/* <div className='flex items-center space-x-4 mt-2 text-sm text-gray-400'>
                                <span className='flex items-center space-x-1'>
                                    <Calendar size={14} />
                                    <span>{project?.data?.date}</span>
                                </span>
                                <span className='flex items-center space-x-1'>
                                    <MapPin size={14} />
                                    <span>{project?.data?.location}</span>
                                </span>
                                <span className='flex items-center space-x-1'>
                                    <Clock size={14} />
                                    <span>{project?.data?.duration}</span>
                                </span>
                            </div> */}
                        </div>
                    </div>

                    {/* Right Side - Actions & View Toggle */}
                    <div className='flex items-center space-x-4'>
                        {/* View Mode Toggle */}
                        {/* <div className='flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-1'>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setViewMode("masonry")}
                                className={`p-2 rounded-full transition-colors ${
                                    viewMode === "masonry"
                                        ? "bg-white text-black"
                                        : "text-white hover:bg-white/20"
                                }`}
                            >
                                <LayoutGrid size={16} />
                            </motion.button>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-full transition-colors ${
                                    viewMode === "grid"
                                        ? "bg-white text-black"
                                        : "text-white hover:bg-white/20"
                                }`}
                            >
                                <Grid3X3 size={16} />
                            </motion.button>
                        </div> */}

                        {/* Action Buttons */}
                        {/* <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsLiked(!isLiked)}
                            className={`p-2 rounded-full border transition-colors ${
                                isLiked
                                    ? "bg-red-500/20 border-red-500/50 text-red-400"
                                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                            }`}
                        >
                            <Heart
                                size={16}
                                className={isLiked ? "fill-current" : ""}
                            />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors'
                        >
                            <Share2 size={16} />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='flex items-center space-x-2 bg-white text-black rounded-full px-4 py-2 text-sm font-medium hover:bg-amber-50 transition-colors'
                        >
                            <Download size={16} />
                            <span className='hidden sm:inline'>Download</span>
                        </motion.button> */}
                    </div>
                </motion.div>

                {/* Brief Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className=' mb-8 max-w-2xl'
                >
                    <PrismicRichText field={project?.data?.description} />
                    {/* {project?.data?.description} */}
                </motion.p>

                {/* Image Gallery */}
                <ImageGrid
                    images={project?.data?.gallery || []}
                    themeColor={"#8B4513"}
                />

                {/* Minimal Project Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className='mt-16 mb-16'
                >
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {project?.data?.client && (
                            <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center'>
                                <h3 className='text-lg font-semibold mb-2'>
                                    Client
                                </h3>
                                <p className='text-amber-300'>
                                    {project?.data?.client}
                                </p>
                            </div>
                        )}
                        {/* {project?.data?.duration && (
                            <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center'>
                                <h3 className='text-lg font-semibold mb-2'>
                                    Duration
                                </h3>
                                <p className='text-gray-300'>
                                    {project?.data?.duration}
                                </p>
                            </div>
                        )} */}
                        {/* {project?.data?.deliverables && (
                            <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center'>
                                <h3 className='text-lg font-semibold mb-2'>
                                    Deliverables
                                </h3>
                                <p className='text-gray-300'>
                                    {project?.data?.deliverables}
                                </p>
                            </div>
                        )} */}
                    </div>

                    {/* Tags */}
                    <div className='flex flex-wrap justify-center gap-2 mt-8'>
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className='bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-amber-300'
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Related Projects */}
                {/* <RelatedProjects
                    currentProjectId={project.id}
                    category={project.category}
                /> */}
            </div>
        </div>
    );
}
