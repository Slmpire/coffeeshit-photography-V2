"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactItems = [
    {
        icon: Phone,
        title: "Phone",
        value: "+234 811 627 3856",
        href: "tel:+2348116273856",
        color: "text-white",
    },
    {
        icon: Mail,
        title: "Email",
        value: "coffeeshotit@gmail.com",
        href: "mailto:coffeeshotit@gmail.com",
        color: "text-white",
    },
    {
        icon: MapPin,
        title: "Location",
        value: "Lagos, Nigeria",
        href: "#",
        color: "text-white",
    },
    {
        icon: Clock,
        title: "Response Time",
        value: "Within 24 hours",
        href: "#",
        color: "text-white",
    },
];

export default function ContactInfo() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8'
        >
            <h3 className='text-2xl font-bold mb-6'>Contact Information</h3>

            <div className='space-y-6'>
                {contactItems.map((item, index) => (
                    <motion.a
                        key={index}
                        href={item.href}
                        whileHover={{ x: 5 }}
                        className='flex items-center space-x-4 group cursor-pointer'
                    >
                        <div
                            className={`w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors ${item.color}`}
                        >
                            <item.icon size={20} />
                        </div>
                        <div>
                            <p className='text-sm text-amber-400'>
                                {item.title}
                            </p>
                            <p className='font-medium text-white group-hover:text-amber-300 transition-colors'>
                                {item.value}
                            </p>
                        </div>
                    </motion.a>
                ))}
            </div>

            {/* Availability Status */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className='mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl'
            >
                <div className='flex items-center space-x-3'>
                    <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse' />
                    <div>
                        <p className='text-green-400 font-medium'>
                            Currently Available
                        </p>
                        <p className='text-sm text-amber-300'>
                            Accepting new projects for 2025
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
