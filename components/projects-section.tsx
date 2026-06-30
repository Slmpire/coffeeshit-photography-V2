"use client";

import { ProjectsDocument } from "@/prismicio-types";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProjectsSectionProps {
    projects: ProjectsDocument[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
    const router = useRouter();
    const project1 = projects[0];
    const project2 = projects[1];

    console.log("projects", projects);

    return (
        <section className='w-full bg-black container  text-white min-h-screen flex flex-col items-center px-4 md:px-8 py-16'>
            {/* Top Row */}
            <div className='w-full max-w-5xl grid grid-cols-3 gap-4 mx-auto items-center mb-2 text-xs font-semibold tracking-widest'>
                <div className='text-white/60'>02</div>
                <div className='text-center text-white/80'>//PORTFOLIO</div>
                <div className='text-right text-white/60'>2020 - 2025</div>
            </div>
            {/* Heading and Description */}
            <div className='w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 items-end mb-8'>
                <h1 className='text-5xl md:text-7xl font-extrabold col-span-2 leading-none md:leading-tight'>
                    LATEST
                    <br />
                    PROJECTS
                </h1>
                <div className='md:col-span-1 flex flex-col justify-end h-full'>
                    <p className='text-white/80 text-base md:text-lg max-w-xs md:text-right'>
                        Every photograph tells a story, and my projects are a
                        reflection of the moments, emotions, and artistry I've
                        captured over time.
                    </p>
                </div>
            </div>
            {/* Project Cards */}
            <div className='w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
                {/* @ts-ignore */}
                <ProjectCard project={project1?.project} />
                {/* @ts-ignore */}
                <ProjectCard project={project2?.project} />
            </div>
            {/* View More Button */}
            <div className='w-full flex justify-center mt-4'>
                <Link href='/projects'>
                    <button className='bg-white/10 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition'>
                        View more
                    </button>
                </Link>
            </div>
        </section>
    );
}

function ProjectCard({ project }: { project: ProjectsDocument | undefined }) {
    if (!project) return null;
    // Extract year from date string (YYYY-MM-DD)
    let year = "2025";
    if (project?.last_publication_date) {
        const dateStr = project.last_publication_date;
        if (typeof dateStr === "string" && dateStr.length >= 4) {
            year = dateStr.slice(0, 4);
        }
    }
    // @ts-ignore
    const category = project?.data?.category?.uid;
    return (
        <Link href={`/projects/${project?.uid || "#"}`} className='block group'>
            <div className='relative h-[400px] rounded-2xl overflow-hidden mb-4'>
                <Image
                    src={project?.data?.cover_image?.url || "/placeholder.jpg"}
                    alt={project?.data?.title || "Project"}
                    fill
                    className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-300'
                />
            </div>
            <div className='flex items-center justify-between'>
                <div>
                    <div className='text-xs text-white/60 mb-1'>{year}</div>
                    <div className='text-lg font-bold mb-1 uppercase'>
                        {project?.data?.title || "Project Title"}
                    </div>
                    <div className='text-xs text-white/60 uppercase'>
                        {category?.replace(/-/g, " ") || "CATEGORY"}
                    </div>
                </div>
                <span className='ml-4 text-2xl font-bold'>&rarr;</span>
            </div>
        </Link>
    );
}
