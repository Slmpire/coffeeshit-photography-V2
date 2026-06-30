"use client";

import { motion } from "framer-motion";
import {
    MapPin,
    Globe,
    Camera,
    Mail,
    Phone,
    Instagram,
    Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const footerItems = [
    {
        icon: MapPin,
        title: "BASED IN LAGOS,",
        subtitle: "NIGERIA",
        color: "text-green-400",
    },
    {
        icon: Globe,
        title: "AVAILABLE ALL AROUND",
        subtitle: "WORLDWIDE",
        color: "text-blue-400",
    },
    {
        icon: Camera,
        title: "PROFESSIONAL PHOTOGRAPHER",
        subtitle: "+ CREATIVE DIRECTOR",
        color: "text-purple-400",
    },
];

const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            delay: 0.3,
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 },
    },
};

export default function Footer() {
    return (
        <footer className='w-full bg-black text-white pt-12 pb-6 flex flex-col items-center relative'>
            {/* Signature */}
            <div className='w-full flex justify-center items-center mb-8'>
                <Image
                    priority
                    src='https://images.prismic.io/coffeeshotit/aHEac0MqNJQqHzKY_CoffeeLogo-nobg.png?auto=format,compress'
                    alt='Coffee shotit'
                    width={100}
                    height={50}
                    className='w-[100px] h-[50px] object-contain'
                />
                {/* <span
                    className='text-6xl md:text-[6rem] font-signature text-white text-center drop-shadow-lg select-none'
                    style={{ lineHeight: 1, letterSpacing: 2 }}
                >
                    Coffee Shotit
                </span> */}
            </div>
            {/* Bottom Row */}
            <div className='w-full max-w-7xl flex justify-between items-center px-6'>
                {/* <div className='text-xs md:text-sm font-bold uppercase text-white/80'>
                    WEBSITE BUILT BY DreamTek
                </div> */}
                <Link
                    href='#top'
                    className='text-xs md:text-sm font-bold uppercase text-white/80 hover:underline hover:underline-offset-4 text-right'
                >
                    BACK TO TOP ↗
                </Link>
            </div>
        </footer>
    );
}
