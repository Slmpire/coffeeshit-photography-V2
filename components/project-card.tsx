"use client";

import type React from "react";
import { motion } from "framer-motion";
import { ProjectsDocument } from "@/prismicio-types";
import Link from "next/link";
import { ArrowUpRight, Calendar, Tag } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
    project: ProjectsDocument;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    // Safely get category title
    const getCategoryTitle = (): string | null => {
        if (
            project?.data?.category &&
            "data" in project.data.category &&
            project.data.category.data
        ) {
            const categoryData = project.data.category.data as any;
            return categoryData.title || null;
        }
        return null;
    };

    // Safely get description text
    const getDescription = (): string | null => {
        if (project?.data?.description && "text" in project.data.description) {
            return project.data.description.text as string;
        }
        return null;
    };

    return (
        <motion.div
            data-cursor='view'
            className='group relative overflow-hidden rounded-xl bg-gradient-to-br  backdrop-blur-sm border border-white/10  transition-all duration-500'
            whileHover={{
                scale: 1.02,
                y: -8,
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <Link href={`/projects/${project.uid}`} className='block'>
                {/* Image Container */}
                <div className='relative overflow-hidden'>
                    <Image
                        src={project?.data.cover_image?.url || ""}
                        alt={project?.data.title || ""}
                        className='w-full h-[550px] object-cover object-center transition-transform duration-700 group-hover:scale-110'
                        width={500}
                        height={500}
                    />

                    {/* Overlay Gradient */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                    {/* Category Badge */}
                    {getCategoryTitle() && (
                        <div className='absolute top-4 left-4'>
                            <span className='inline-flex items-center gap-1 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-medium text-white/90'>
                                <Tag className='w-3 h-3' />
                                {getCategoryTitle()}
                            </span>
                        </div>
                    )}

                    {/* View Icon */}
                    <div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
                        <div className='w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center'>
                            <ArrowUpRight className='w-4 h-4 text-white' />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className='p-6'>
                    {/* Title */}
                    {/* <h3 className='text-xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors duration-300 line-clamp-2'>
                        {project?.data.title}
                    </h3> */}

                    {/* Description */}
                    {getDescription() && (
                        <p className='text-amber-300 text-sm leading-relaxed mb-4 line-clamp-3'>
                            {getDescription()}
                        </p>
                    )}

                    {/* Meta Information */}
                    <div className='flex items-center justify-between pt-4 border-t border-white/10'>
                        {/* Date */}
                        {/* <div className='flex items-center gap-2 text-amber-400 text-sm'>
                            <Calendar className='w-4 h-4' />
                            <span>
                                {project.first_publication_date
                                    ? formatDate(project.first_publication_date)
                                    : "Recently"}
                            </span>
                        </div> */}

                        {/* View Project Text */}
                        <span className='text-white/60 text-sm font-medium group-hover:text-white transition-colors duration-300'>
                            View Project
                        </span>
                    </div>
                </div>

                {/* Hover Border Effect */}
                <div className='absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-white/20 transition-all duration-500 pointer-events-none' />
            </Link>
        </motion.div>
    );
};

export default ProjectCard;
