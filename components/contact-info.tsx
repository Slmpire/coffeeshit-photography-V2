"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Instagram,
    Twitter,
    Youtube,
    MessageCircle,
} from "lucide-react";

const INFO = [
    {
        icon: Mail,
        label: "Email",
        value: "hello@coffeeshotit.com",
        href: "mailto:hello@coffeeshotit.com",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+234 811 627 3856",
        href: "tel:+2348116273856",
    },
    {
        icon: MapPin,
        label: "Based in",
        value: "Lagos, Nigeria",
        href: "#",
    },
    {
        icon: Clock,
        label: "Response time",
        value: "Within 24 hours",
        href: "#",
    },
];

const SOCIALS = [
    { icon: Instagram, href: "https://instagram.com/coffeeshotit", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com/coffeeshotit", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com/@coffeeshotit", label: "YouTube" },
];

export default function ContactInfo() {
    return (
        <div className="flex flex-col gap-8">

            {/* Availability badge */}
            <div className="flex items-center gap-2 px-4 py-3 bg-green-500/5 border border-green-500/20 rounded-xl w-fit">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-[10px] text-green-400 uppercase tracking-widest">
                    Available for bookings
                </span>
            </div>

            {/* Contact items */}
            <div className="flex flex-col gap-5">
                {INFO.map(({ icon: Icon, label, value, href }, i) => (
                    <motion.a
                        key={label}
                        href={href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="flex items-center gap-4 group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-amber-400/30 group-hover:bg-amber-500/5 transition-all duration-300">
                            <Icon size={14} className="text-white/40 group-hover:text-amber-400 transition-colors duration-300" />
                        </div>
                        <div>
                            <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] mb-0.5">
                                {label}
                            </p>
                            <p className="text-sm text-white/70 group-hover:text-white transition-colors duration-200">
                                {value}
                            </p>
                        </div>
                    </motion.a>
                ))}
            </div>

            {/* WhatsApp CTA */}

            <a href="https://wa.me/2348116273856?text=Hi%20Coffee%2C%20I%27d%20like%20to%20inquire%20about%20a%20photography%20session"
                target="_blank"
                rel="noopener noreferrer"
            >
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 px-5 py-4 bg-[#25D366]/10 border border-[#25D366]/20 hover:border-[#25D366]/50 rounded-xl cursor-pointer transition-all duration-300"
                >
                    <MessageCircle size={18} className="text-[#25D366]" />
                    <div>
                        <p className="text-sm font-medium text-white">
                            Chat on WhatsApp
                        </p>
                        <p className="text-[10px] text-white/30">
                            For faster responses
                        </p>
                    </div>
                </motion.div>
            </a>

            {/* Socials */}
            <div className="pt-6 border-t border-white/5">
                <p className="text-[9px] text-white/20 uppercase tracking-[0.4em] mb-4">
                    Follow Coffee
                </p>
                <div className="flex items-center gap-4">
                    {SOCIALS.map(({ icon: Icon, href, label }) => (

                        <a key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-amber-400/40 hover:bg-amber-500/5 transition-all duration-300"
                        >
                            <Icon size={14} className="text-white/40 hover:text-amber-400 transition-colors" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}