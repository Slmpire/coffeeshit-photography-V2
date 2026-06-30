"use client";

import { GalleryTypesDocument } from "@/prismicio-types";
import { motion } from "framer-motion";
import { ArrowLeft, ImageOff } from "lucide-react";
import Link from "next/link";
import ImageGrid from "@/components/ImageGrid";

export default function GalleryMainPage({
    galleryType,
}: {
    galleryType: GalleryTypesDocument;
}) {
    const themeColor = galleryType?.data?.theme || "#8B4513";
    const pageGradient = `linear-gradient(120deg, ${themeColor}0D 0%, ${themeColor}1A 100%)`; // 0D = ~5% opacity, 1A = ~10%

    return (
        <motion.div
            key={galleryType.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className='min-h-screen px-4 md:px-12 py-24'
            style={{
                background: pageGradient,
            }}
        >
            <div className='mx-auto max-w-7xl'>
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className='mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center'
                >
                    <div>
                        <Link href='/'>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className='flex items-center gap-2 text-amber-400 transition-colors hover:text-white'
                            >
                                <ArrowLeft size={20} />
                                <span>Back to Galleries</span>
                            </motion.div>
                        </Link>
                        <h1 className='signature-font mt-4 text-5xl font-bold text-white lg:text-7xl'>
                            {galleryType?.data?.title}
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className='mt-2 text-lg text-amber-400'
                        >
                            {galleryType?.data?.description}
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className='flex items-center gap-6 text-sm text-amber-500'
                    >
                        <div className='flex items-center gap-2'>
                            <ImageOff size={16} />
                            <span>
                                {galleryType?.data?.gallery?.length || 0} Photos
                            </span>
                        </div>
                    </motion.div>
                </motion.div>

                <ImageGrid
                    images={galleryType.data.gallery}
                    themeColor={themeColor}
                />
            </div>
        </motion.div>
    );
}
