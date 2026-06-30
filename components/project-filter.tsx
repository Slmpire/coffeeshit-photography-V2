"use client";

import { motion } from "framer-motion";
import { CategoriesDocument } from "@/prismicio-types";

interface ProjectFilterProps {
    categories: CategoriesDocument[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function ProjectFilter({
    categories,
    selectedCategory,
    onCategoryChange,
}: ProjectFilterProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='flex flex-wrap justify-center gap-4 mb-12'
        >
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCategoryChange("all")}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === "all"
                        ? "bg-white text-black"
                        : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                }`}
            >
                All
            </motion.button>
            {categories.map((category) => (
                <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onCategoryChange(category.uid as string)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category.uid
                            ? "bg-white text-black"
                            : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                    }`}
                >
                    {category.data.title}
                </motion.button>
            ))}
        </motion.div>
    );
}
