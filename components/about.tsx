"use client";

import { motion } from "framer-motion";
import { Camera, Award, Users, Clock } from "lucide-react";
import Image from "next/image";
import { GalleryTypesDocument } from "@/prismicio-types";
import Link from "next/link";

const stats = [
    { icon: Camera, number: "500+", label: "Projects Completed" },
    { icon: Award, number: "50+", label: "Awards Won" },
    { icon: Users, number: "200+", label: "Happy Clients" },
    { icon: Clock, number: "5+", label: "Years Experience" },
];

interface AboutProps {
    galleryTypes: GalleryTypesDocument[];
}

export default function About({ galleryTypes }: AboutProps) {
    return (
        <section className='w-full bg-black text-white min-h-screen flex flex-col items-center px-4  md:px-6'>
            {/* Top Image */}
            <div className='w-full max-w-5xl mt-8 rounded-lg  overflow-hidden'>
                <Image
                    src='https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress'
                    alt='Coffee Shotit'
                    width={900}
                    height={400}
                    className='w-full h-[550px] rounded-2xl overflow-hidden object-cover'
                />
            </div>
            {/* Grid Section */}
            <div className='w-full max-w-5xl grid grid-cols-1 gap-8 mt-12'>
                {/* Left: Heading */}
                <div className='md:col-span-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
                    <h1 className='text-4xl col-span-2 md:text-5xl font-extrabold leading-tight tracking-tight mb-8'>
                        I'M COFFEE SHOTIT
                        <br />
                        BASED IN LAGOS, NG.
                    </h1>

                    <div className='flex flex-col justify-between gap-8'>
                        <div className='mb-8'>
                            <p className='text-base md:text-lg font-light'>
                                Passionate about storytelling through
                                photography, I specialize in capturing raw
                                emotions, genuine smiles, and the beauty of
                                life's special moments.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Service Cards */}
            <div className='flex flex-col gap-8'>
                {galleryTypes.map((galleryType) => (
                    <ServiceCard
                        slug={galleryType.uid as string}
                        key={galleryType.id}
                        title={galleryType.data.title as string}
                        description={galleryType.data.description as string}
                    />
                ))}
            </div>
        </section>
    );
}

function ServiceCard({
    title,
    description,
    slug,
}: {
    title: string;
    description: string;
    slug: string;
}) {
    return (
        <Link
            href={`/gallery/${slug}`}
            className='grid grid-cols-1 md:grid-cols-4 gap-8 w-full'
        >
            <div></div>
            <div className='flex gap-[2px]'>
                {[1, 2, 3].map((item) => (
                    <span
                        className={`w-2 h-2  rounded-full ${
                            item === 1 ? "bg-white" : "bg-gray-800"
                        }`}
                    ></span>
                ))}
            </div>
            <div className='flex items-start col-span-2 justify-between border-t border-white/20 pt-6'>
                <div>
                    <h3 className='text-lg md:text-xl font-bold mb-1'>
                        {title}
                    </h3>
                    <p className='text-sm md:text-base text-white/80 max-w-md'>
                        {description}
                    </p>
                </div>
                <span className='ml-4 text-2xl font-bold'>&rarr;</span>
            </div>
        </Link>
    );
}
