"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import Link from "next/link";

export default function Header() {
    return (
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className='absolute  bg-black/50 backdrop-blur-sm top-0 right-0 p-4 md:p-6 z-[1000] lg:pr-12'
        >
            <div className='flex items-center z-[2000] bg-black space-x-6'>
                {/* Available Status */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className='hidden sm:flex items-center space-x-2'
                >
                    <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                    <span className='text-sm text-amber-300'>Available</span>
                </motion.div>

                {/* Reach Me Button */}
                <Link href='/contact'>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className='flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium hover:bg-white/20 transition-colors'
                    >
                        <Phone size={16} />
                        <span className='hidden sm:inline'>Reach Me</span>
                    </motion.button>
                </Link>
            </div>
        </motion.header>
    );
}
