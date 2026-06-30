"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ImageOff, X } from "lucide-react";
import { ImageField, KeyTextField } from "@prismicio/client";
import Image from "next/image";

type ImageItem = {
    image: ImageField;
    description?: KeyTextField;
};

interface ImageGridProps {
    images: ImageItem[];
    themeColor?: string;
}

export default function ImageGrid({
    images,
    themeColor = "#8B4513",
}: ImageGridProps) {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const validImages =
        images?.filter(
            (item) => item.image && item.image.url && item.image.id
        ) || [];

    return (
        <>
            {validImages.length > 0 ? (
                <div className='columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3 xl:columns-4'>
                    {validImages.map((image, index) => (
                        <motion.div
                            key={image.image.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                delay: index * 0.12,
                                duration: 0.8,
                                ease: "easeOut",
                            }}
                            className='group relative cursor-pointer break-inside-avoid'
                            onClick={() => setSelectedImage(index)}
                        >
                            <div
                                style={{
                                    background: `linear-gradient(135deg, #4A4A4A 0%, #000000 100%)`,
                                }}
                                className='rounded-3xl p-2'
                            >
                                <div className='relative overflow-hidden rounded-2xl'>
                                    <motion.div
                                        whileHover={{ scale: 1.08 }}
                                        className='transition-all duration-700'
                                    >
                                        <Image
                                            src={image.image.url || ""}
                                            alt={image.image.alt || ""}
                                            width={400}
                                            height={600}
                                            className='h-auto w-full object-cover'
                                            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw'
                                        />
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        className='absolute inset-0 flex items-end p-4'
                                        style={{
                                            background: `linear-gradient(to top, ${themeColor}99 0%, transparent 100%)`, // 99 = 60% opacity
                                        }}
                                    >
                                        <div className='text-white'>
                                            <h3 className='text-lg font-semibold'>
                                                {image.image.alt || ""}
                                            </h3>
                                            {image.description && (
                                                <p className='text-sm text-amber-300'>
                                                    {image.description}
                                                </p>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center py-24'>
                    <div
                        className='flex items-center justify-center rounded-full shadow-lg'
                        style={{
                            width: 96,
                            height: 96,
                            background: `linear-gradient(135deg, #fff 0%, ${themeColor} 100%)`,
                        }}
                    >
                        <ImageOff size={48} style={{ color: themeColor }} />
                    </div>
                    <h2
                        className='mb-2 text-2xl font-bold'
                        style={{
                            background: `linear-gradient(90deg, #fff 0%, ${themeColor} 60%, ${themeColor} 100%)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        No Images Yet
                    </h2>
                    <p className='max-w-md text-center text-lg text-amber-400'>
                        This gallery is currently empty. Please check back soon
                        for new photos!
                    </p>
                </div>
            )}

            {/* Lightbox */}
            {selectedImage !== null && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm'
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className='relative max-h-[70vh] w-full h-full max-w-4xl'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={
                                validImages[selectedImage]?.image.url ||
                                "/placeholder.svg"
                            }
                            alt={validImages[selectedImage]?.image.alt || ""}
                            fill
                            className=' w-full rounded-lg object-contain'
                            loading='lazy'
                        />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className='absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70'
                        >
                            <X size={20} />
                        </button>
                        <div className='absolute bottom-4 left-4 text-white'>
                            <p className='text-sm text-amber-300'>
                                {selectedImage + 1} of {validImages.length}
                            </p>
                            <h3 className='font-semibold'>
                                {validImages[selectedImage]?.image.alt || ""}
                            </h3>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}
