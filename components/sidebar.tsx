"use client";

import { GalleryTypesDocument } from "@/prismicio-types";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    FolderOpen,
    Mail,
    Camera,
    Heart,
    Users,
    Calendar,
    Sparkles,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: FolderOpen, label: "Projects", href: "/projects" },
    { icon: Mail, label: "Reach Me", href: "/contact" },
];

const galleryItems = [
    { icon: Heart, label: "Weddings", href: "/gallery/weddings" },
    { icon: Users, label: "Portraits", href: "/gallery/portraits" },
    { icon: Calendar, label: "Events", href: "/gallery/events" },
    { icon: Sparkles, label: "Engagements", href: "/gallery/engagements" },
];

interface SidebarProps {
    galleryMenus: GalleryTypesDocument[];
}

export default function Sidebar({ galleryMenus }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) {
                setIsMobileOpen(false);
            }
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const sidebarWidth = isCollapsed ? "w-20" : "w-64";

    // Mobile Menu Button
    if (isMobile) {
        return (
            <>
                {/* Mobile Menu Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileOpen(true)}
                    className='fixed left-6 top-6  z-50 lg:hidden bg-black/20 backdrop-blur-sm border border-white/20 rounded-full p-3 text-white'
                >
                    <Menu size={20} />
                </motion.button>

                {/* Mobile Sidebar Overlay */}
                <AnimatePresence>
                    {isMobileOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileOpen(false)}
                                className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden'
                            />
                            <motion.aside
                                initial={{ x: -300 }}
                                animate={{ x: 0 }}
                                exit={{ x: -300 }}
                                transition={{
                                    type: "spring",
                                    damping: 25,
                                    stiffness: 200,
                                }}
                                className='fixed left-0 top-0 h-full w-80 bg-black/90 backdrop-blur-xl border-r border-gray-800/50 p-6 z-50 lg:hidden overflow-y-auto'
                            >
                                <MobileSidebarContent
                                    onClose={() => setIsMobileOpen(false)}
                                />
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>
            </>
        );
    }

    // Desktop Sidebar
    return (
        <motion.aside
            animate={{ width: isCollapsed ? 80 : 256 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`sticky left-0 top-0 h-screen bg-black/20 backdrop-blur-sm border-r border-gray-800/50 z-30 hidden lg:flex flex-col ${sidebarWidth}`}
        >
            {/* Collapse Toggle */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCollapsed(!isCollapsed)}
                className='absolute -right-3 top-8 w-6 h-6 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors'
            >
                {isCollapsed ? (
                    <ChevronRight size={12} />
                ) : (
                    <ChevronLeft size={12} />
                )}
            </motion.button>

            <div className='p-6 flex flex-col h-full'>
                {/* Logo */}
                <motion.div
                    className='mb-12'
                    animate={{ opacity: isCollapsed ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                >
                    {!isCollapsed && (
                        <Image
                            src='https://images.prismic.io/coffeeshotit/aHEac0MqNJQqHzKY_CoffeeLogo-nobg.png?auto=format,compress'
                            alt='Coffee shotit'
                            width={100}
                            height={50}
                            className='w-full h-full object-contain grayscale brightness-100'
                        />
                        // <h1 className='text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                        //     Coffee shotit
                        // </h1>
                    )}
                </motion.div>

                {/* Main Navigation */}
                <nav className='space-y-4 mb-8'>
                    {menuItems.map((item, index) => (
                        <SidebarItem
                            key={item.label}
                            item={item}
                            isCollapsed={isCollapsed}
                            delay={index * 0.1}
                        />
                    ))}
                </nav>

                {/* Gallery Section */}
                <div className='mb-8'>
                    <motion.h3
                        className='text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4'
                        animate={{ opacity: isCollapsed ? 0 : 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        {!isCollapsed && "Gallery"}
                    </motion.h3>
                    <nav className='space-y-3'>
                        {galleryMenus.map((item, index) => (
                            <SidebarItem
                                key={item.id}
                                item={{
                                    icon:
                                        item.uid === "weddings"
                                            ? Heart
                                            : item.uid === "portraits"
                                              ? Users
                                              : item.uid === "events"
                                                ? Calendar
                                                : item.uid === "engagements"
                                                  ? Sparkles
                                                  : Camera,
                                    label: item.data.title as string,
                                    href: `/gallery/${item.uid}`,
                                }}
                                isCollapsed={isCollapsed}
                                delay={index * 0.1}
                                isSmall
                            />
                        ))}
                    </nav>
                </div>

                {/* Profile Section */}
                <motion.div className='mt-auto'>
                    <div
                        className={`flex items-center p-3 rounded-lg bg-gray-800/30 ${
                            isCollapsed ? "justify-center" : "space-x-3"
                        }`}
                    >
                        <div className='w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center flex-shrink-0'>
                            <Camera size={20} className='text-gray-300' />
                        </div>
                        <motion.div
                            animate={{
                                opacity: isCollapsed ? 0 : 1,
                                width: isCollapsed ? 0 : "auto",
                            }}
                            transition={{ duration: 0.2 }}
                            className='overflow-hidden'
                        >
                            {!isCollapsed && (
                                <div>
                                    <p className='text-sm font-medium text-white'>
                                        Coffee shotit
                                    </p>
                                    <p className='text-xs text-gray-400'>
                                        Creative Director
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Social Links */}
                    <motion.div
                        className='mt-4'
                        animate={{ opacity: isCollapsed ? 0 : 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        {!isCollapsed && (
                            <>
                                <p className='text-xs text-gray-500 mb-2'>
                                    Follow me:
                                </p>
                                <div className='flex space-x-2'>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className='w-8 h-8 bg-gray-800/50 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-700/50 transition-colors'
                                    >
                                        <span className='text-xs'>𝕏</span>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className='w-8 h-8 bg-gray-800/50 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-700/50 transition-colors'
                                    >
                                        <Camera size={14} />
                                    </motion.div>
                                </div>
                            </>
                        )}
                    </motion.div>

                    {/* Copyright */}
                    <motion.p
                        className='text-xs text-gray-600 mt-4'
                        animate={{ opacity: isCollapsed ? 0 : 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        {!isCollapsed &&
                            "© 2025 Coffee shotit. All rights reserved."}
                    </motion.p>
                </motion.div>
            </div>
        </motion.aside>
    );
}

// Sidebar Item Component
interface SidebarItemProps {
    item: { icon: React.ElementType; label: string; href: string };
    isCollapsed: boolean;
    delay: number;
    isSmall?: boolean;
}

function SidebarItem({
    item,
    isCollapsed,
    delay,
    isSmall = false,
}: SidebarItemProps) {
    return (
        <Link href={item.href} key={item.label}>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay }}
                whileHover={{
                    x: isCollapsed ? 0 : 10,
                    scale: isCollapsed ? 1.1 : 1,
                }}
                className={`flex items-center text-gray-300 hover:text-white transition-colors group relative ${
                    isCollapsed ? "justify-center" : "space-x-3"
                }`}
                title={isCollapsed ? item.label : undefined}
            >
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`rounded-lg bg-gray-800/50 group-hover:bg-gray-700/50 transition-colors flex items-center justify-center ${
                        isSmall ? "p-1.5" : "p-2"
                    }`}
                >
                    <item.icon size={isSmall ? 16 : 18} />
                </motion.div>

                <motion.span
                    animate={{
                        opacity: isCollapsed ? 0 : 1,
                        width: isCollapsed ? 0 : "auto",
                    }}
                    transition={{ duration: 0.2 }}
                    className={`font-medium overflow-hidden whitespace-nowrap ${
                        isSmall ? "text-sm" : ""
                    }`}
                >
                    {!isCollapsed && item.label}
                </motion.span>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className='absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap z-50 pointer-events-none'
                    >
                        {item.label}
                    </motion.div>
                )}
            </motion.div>
        </Link>
    );
}

// Mobile Sidebar Content
interface MobileSidebarContentProps {
    onClose: () => void;
}

function MobileSidebarContent({ onClose }: MobileSidebarContentProps) {
    return (
        <div className='flex flex-col h-full'>
            {/* Header */}
            <div className='flex items-center justify-between mb-8'>
                <Image
                    src='https://images.prismic.io/coffeeshotit/aHEac0MqNJQqHzKY_CoffeeLogo-nobg.png?auto=format,compress'
                    alt='Coffee shotit'
                    width={100}
                    height={50}
                    className='w-full h-full object-contain grayscale brightness-100'
                />
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className='p-2 rounded-lg bg-gray-800/50 text-white'
                >
                    <X size={20} />
                </motion.button>
            </div>

            {/* Navigation */}
            <nav className='space-y-4 mb-8'>
                {menuItems.map((item, index) => (
                    <Link href={item.href} key={item.label}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={onClose}
                            className='flex items-center space-x-3 text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-gray-800/50'
                        >
                            <item.icon size={20} />
                            <span className='font-medium'>{item.label}</span>
                        </motion.div>
                    </Link>
                ))}
            </nav>

            {/* Gallery */}
            <div className='mb-8'>
                <h3 className='text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4'>
                    Gallery
                </h3>
                <nav className='space-y-3'>
                    {galleryItems.map((item, index) => (
                        <Link href={item.href} key={item.label}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (index + 3) * 0.1 }}
                                onClick={onClose}
                                className='flex items-center space-x-3 text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800/30'
                            >
                                <item.icon size={18} />
                                <span className='text-sm'>{item.label}</span>
                            </motion.div>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Profile */}
            <div className='mt-auto'>
                <div className='flex items-center space-x-3 p-3 rounded-lg bg-gray-800/30 mb-4'>
                    <div className='w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center'>
                        <Camera size={24} className='text-gray-300' />
                    </div>
                    <div>
                        <p className='text-sm font-medium text-white'>
                            Coffee shotit
                        </p>
                        <p className='text-xs text-gray-400'>
                            Creative Director
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
