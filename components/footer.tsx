"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Twitter, Youtube, Mail } from "lucide-react";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Projects", href: "/projects" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
    { icon: Instagram, href: "https://instagram.com/coffeeshotit", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com/coffeeshotit", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com/@coffeeshotit", label: "YouTube" },
    { icon: Mail, href: "mailto:hello@coffeeshotit.com", label: "Email" },
];

export default function Footer() {
    return (
        <footer className="w-full bg-black border-t border-white/5 text-white">

            {/* Main footer content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

                    {/* Brand column */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="flex items-baseline gap-1 group w-fit">
                            <span className="signature-font text-3xl text-white group-hover:text-amber-300 transition-colors duration-300">
                                Coffee
                            </span>
                            <span className="text-[9px] text-amber-400/70 uppercase tracking-[0.4em]">
                                shotit
                            </span>
                        </Link>
                        <p className="text-white/40 text-sm font-light leading-relaxed max-w-xs">
                            Professional photography and creative direction based in Lagos, Nigeria.
                            Capturing reality, crafting memories.
                        </p>

                        {/* Social links */}
                        <div className="flex items-center gap-4 mt-2">
                            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    whileHover={{ scale: 1.15, color: "#f59e0b" }}
                                    className="text-white/30 hover:text-amber-400 transition-colors duration-300"
                                >
                                    <Icon size={16} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation column */}
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] mb-2">
                            Navigation
                        </span>
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-white/50 hover:text-white transition-colors duration-200 w-fit"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Contact column */}
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] mb-2">
                            Get in Touch
                        </span>
                        
                            <a href="mailto:hello@coffeeshotit.com"
                            className="text-sm text-white/50 hover:text-white transition-colors duration-200 w-fit"
                        >
                            hello@coffeeshotit.com
                        </a>
                        
                           <a href="https://wa.me/2348116273856"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-white/50 hover:text-white transition-colors duration-200 w-fit"
                        >
                            +234 811 627 3856
                        </a>

                        {/* Availability badge */}
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                            </span>
                            <span className="text-[10px] text-green-400 uppercase tracking-widest">
                                Available for bookings
                            </span>
                        </div>

                        {/* CTA */}
                        <Link href="/booking" className="mt-2 w-fit">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors duration-300"
                            >
                                Book a Session
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-[10px] text-white/20 uppercase tracking-widest">
                        © {new Date().getFullYear()} CoffeeShotIt Media. All rights reserved.
                    </span>
                    <Link
                        href="#top"
                        className="text-[10px] text-white/20 hover:text-white/50 uppercase tracking-widest transition-colors duration-200"
                    >
                        Back to top ↑
                    </Link>
                </div>
            </div>
        </footer>
    );
}