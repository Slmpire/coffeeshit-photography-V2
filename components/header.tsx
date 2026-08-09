"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Projects", href: "/projects" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    // Lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <>
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
                    scrolled
                        ? "bg-black/95 backdrop-blur-md border-b border-white/5 shadow-2xl"
                        : "bg-transparent"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-1 group">
                            <motion.div whileHover={{ scale: 1.02 }} className="flex items-baseline gap-1">
                                <span className="signature-font text-2xl md:text-3xl text-white group-hover:text-amber-300 transition-colors duration-300">
                                    Coffee
                                </span>
                                <span className="text-[10px] font-light text-amber-400/80 uppercase tracking-[0.4em] hidden sm:block">
                                    shotit
                                </span>
                            </motion.div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative text-xs uppercase tracking-[0.15em] font-medium transition-colors duration-300 group ${
                                        pathname === link.href
                                            ? "text-amber-400"
                                            : "text-white/60 hover:text-white"
                                    }`}
                                >
                                    {link.label}
                                    {/* Active underline */}
                                    <span
                                        className={`absolute -bottom-1 left-0 h-px bg-amber-400 transition-all duration-300 ${
                                            pathname === link.href
                                                ? "w-full"
                                                : "w-0 group-hover:w-full"
                                        }`}
                                    />
                                </Link>
                            ))}
                        </nav>

                        {/* Right side */}
                        <div className="flex items-center gap-4">
                            {/* Available dot */}
                            <div className="hidden md:flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                                </span>
                                <span className="text-[10px] text-green-400 uppercase tracking-widest">
                                    Available
                                </span>
                            </div>

                            {/* Book CTA — desktop */}
                            <Link href="/booking">
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-[0.15em] rounded-full transition-all duration-300"
                                >
                                    Book a Session
                                </motion.button>
                            </Link>

                            {/* Mobile hamburger */}
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="lg:hidden flex items-center justify-center w-10 h-10 text-white"
                                aria-label="Toggle menu"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {menuOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            <X size={22} />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="open"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            <Menu size={22} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Full-Screen Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[99] bg-black flex flex-col px-6 pt-24 pb-10"
                    >
                        {/* Nav links */}
                        <nav className="flex flex-col gap-2 flex-1">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={`block py-3 border-b border-white/5 text-3xl font-light transition-colors duration-200 ${
                                            pathname === link.href
                                                ? "text-amber-400"
                                                : "text-white/80 hover:text-white"
                                        }`}
                                    >
                                        <span className="text-xs text-amber-500/60 mr-3 font-mono">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Bottom of mobile menu */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col gap-4"
                        >
                            <Link href="/booking" className="w-full">
                                <button className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-widest text-sm rounded-full transition-colors">
                                    Book a Session
                                </button>
                            </Link>
                            <div className="flex items-center justify-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                                </span>
                                <span className="text-xs text-green-400 uppercase tracking-widest">
                                    Currently Available for Bookings
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}