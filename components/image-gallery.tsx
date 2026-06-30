"use client";

import type React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ImageGalleryProps {
    images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
    return (
        <div className='columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6'>
            {images.map((image, index) => (
                <motion.div
                    key={index}
                    data-cursor='view'
                    className='relative overflow-hidden rounded-lg cursor-pointer group'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        className='transition-all duration-700'
                    >
                        <Image
                            src={image}
                            alt={`Gallery Image ${index + 1}`}
                            width={400}
                            height={600}
                            className='w-full h-auto object-cover'
                            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw'
                        />
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
};

export default ImageGallery;
