"use client";

import { Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FloatingBookingButton() {
    return (
        <motion.div
            className='fixed bottom-6 right-6 z-50'
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5, type: "spring" }}
        >
            <Link href='/booking'>
                <motion.button
                    className='group relative flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-600/90 to-orange-600/90 backdrop-blur-md border border-white/20 rounded-full text-white font-medium shadow-2xl hover:shadow-amber-500/25 transition-all duration-300'
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Calendar className='w-5 h-5' />
                    <span className='sm:block'>Book Now</span>

                    {/* Glow effect */}
                    <div className='absolute inset-0 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300' />
                </motion.button>
            </Link>
        </motion.div>
    );
}
