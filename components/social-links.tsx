"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter, Camera, Youtube } from "lucide-react";

const socialLinks = [
    {
        icon: Instagram,
        name: "Instagram",
        handle: "@coffeeshotit",
        href: "https://instagram.com/coffeeshotit",
        color: "from-amber-700 to-orange-800",
    },
    {
        icon: Twitter,
        name: "Twitter",
        handle: "@coffeeshotit",
        href: "https://twitter.com/coffeeshotit",
        color: "from-amber-600 to-orange-700",
    },
    {
        icon: Camera,
        name: "Behance",
        handle: "coffeeshotit",
        href: "https://behance.net/coffeeshotit",
        color: "from-amber-800 to-orange-900",
    },
    {
        icon: Youtube,
        name: "YouTube",
        handle: "Coffee shotit",
        href: "https://youtube.com/@coffeeshotit",
        color: "from-amber-500 to-orange-600",
    },
];

export default function SocialLinks() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8'
        >
            <h3 className='text-2xl font-bold mb-6'>Follow My Work</h3>

            <div className='space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {socialLinks.map((social, index) => (
                    <motion.a
                        key={index}
                        href={social.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className='flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group'
                    >
                        <div
                            className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center`}
                        >
                            <social.icon size={20} className='text-white' />
                        </div>
                        <div className='flex-1'>
                            <p className='font-medium text-white group-hover:text-amber-300 transition-colors'>
                                {social.name}
                            </p>
                            <p className='text-sm text-amber-400'>
                                {social.handle}
                            </p>
                        </div>
                        <motion.div
                            whileHover={{ x: 5 }}
                            className='text-amber-400 group-hover:text-white transition-colors'
                        >
                            →
                        </motion.div>
                    </motion.a>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className='mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center'
            >
                <p className='text-amber-400 font-medium mb-1'>Stay Updated</p>
                <p className='text-sm text-amber-300'>
                    Follow for behind-the-scenes content and latest work
                </p>
            </motion.div>
        </motion.div>
    );
}
