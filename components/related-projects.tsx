"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedProjectsProps {
    currentProjectId: number;
    category: string;
}

const relatedProjects = [
    {
        id: 2,
        title: "Corporate Headshots",
        category: "Corporate",
        coverImage: "/placeholder.svg?height=300&width=400",
    },
    {
        id: 3,
        title: "Fashion Editorial",
        category: "Fashion",
        coverImage: "/placeholder.svg?height=300&width=400",
    },
    {
        id: 4,
        title: "Family Portraits",
        category: "Portrait",
        coverImage: "/placeholder.svg?height=300&width=400",
    },
    {
        id: 5,
        title: "Product Launch",
        category: "Event",
        coverImage: "/placeholder.svg?height=300&width=400",
    },
];

export default function RelatedProjects({
    currentProjectId,
    category,
}: RelatedProjectsProps) {
    const filteredProjects = relatedProjects
        .filter((project) => project.id !== currentProjectId)
        .slice(0, 3);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='mt-20'
        >
            <div className='flex items-center justify-between mb-8'>
                <h2 className='text-2xl lg:text-3xl font-bold'>
                    More Projects
                </h2>
                <Link href='/projects'>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='flex items-center space-x-2 text-amber-300 hover:text-white transition-colors'
                    >
                        <span>View All</span>
                        <ArrowRight size={16} />
                    </motion.button>
                </Link>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {filteredProjects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                        className='group'
                    >
                        <Link href={`/projects/${project.id}`}>
                            <div className='relative h-64 rounded-2xl overflow-hidden'>
                                <div className='absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-900' />
                                <div className='absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300' />

                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <div className='text-5xl text-white/20'>
                                        📸
                                    </div>
                                </div>

                                <div className='absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent'>
                                    <span className='text-xs text-amber-300 uppercase tracking-wider'>
                                        {project.category}
                                    </span>
                                    <h3 className='text-lg font-semibold text-white mt-1 group-hover:text-amber-300 transition-colors'>
                                        {project.title}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
