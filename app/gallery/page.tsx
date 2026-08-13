"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Lock, CheckCircle, XCircle, MessageCircle } from "lucide-react";

// Static map of gallery codes to Pixieset URLs
// Add new clients here after each shoot
const GALLERY_CODES: Record<string, { url: string; name: string }> = {
    // Format: "CODE": { url: "pixieset_url", name: "Client Name" }
    "PRISCA2025": {
        url: "https://coffeeshotit.pixieset.com/priscadeji",
        name: "Prisca & Deji",
    },
    // Add more clients here:
    // "CODE123": { url: "https://...", name: "Client Name" },
};

type Status = "idle" | "loading" | "success" | "error";

export default function GalleryPortalPage() {
    const [code, setCode] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [clientName, setClientName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!code.trim()) return;

        setStatus("loading");

        // Simulate a small delay for UX
        await new Promise((r) => setTimeout(r, 800));

        const normalized = code.trim().toUpperCase();
        const gallery = GALLERY_CODES[normalized];

        if (gallery) {
            setClientName(gallery.name);
            setStatus("success");
            // Redirect after 1.5 seconds
            setTimeout(() => {
                window.location.href = gallery.url;
            }, 1500);
        } else {
            setStatus("error");
            // Reset after 3 seconds
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <main className="w-full bg-black text-white min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* Logo / Brand */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <Link href="/" className="inline-block">
                        <span className="signature-font text-4xl text-white hover:text-amber-300 transition-colors duration-300">
                            Coffee
                        </span>
                    </Link>
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.5em] mt-1">
                        Client Gallery Portal
                    </p>
                </motion.div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/[0.03] border border-white/8 rounded-2xl p-8"
                >
                    <AnimatePresence mode="wait">

                        {/* Idle / Input state */}
                        {(status === "idle" || status === "loading") && (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 mx-auto mb-6">
                                    <Lock size={20} className="text-amber-400" />
                                </div>

                                <h1 className="text-xl font-bold text-white text-center mb-2">
                                    Access Your Gallery
                                </h1>
                                <p className="text-white/30 text-sm text-center mb-8 leading-relaxed">
                                    Enter the unique gallery code Coffee sent you after your session.
                                </p>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] text-white/30 uppercase tracking-[0.3em]">
                                            Gallery Code
                                        </label>
                                        <input
                                            type="text"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                                            placeholder="e.g. PRISCA2025"
                                            maxLength={20}
                                            className="w-full bg-white/[0.04] border border-white/10 focus:border-amber-400/50 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/15 focus:outline-none transition-colors duration-200 uppercase tracking-[0.1em] font-mono"
                                            autoComplete="off"
                                            autoCapitalize="characters"
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={!code.trim() || status === "loading"}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors duration-300 flex items-center justify-center gap-2"
                                    >
                                        {status === "loading" ? (
                                            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                View My Gallery
                                                <ArrowUpRight size={14} />
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            </motion.div>
                        )}

                        {/* Success state */}
                        {status === "success" && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-4"
                            >
                                <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
                                    <CheckCircle size={24} className="text-green-400" />
                                </div>
                                <h2 className="text-lg font-bold text-white mb-2">
                                    Found it!
                                </h2>
                                <p className="text-white/40 text-sm mb-1">
                                    Opening gallery for
                                </p>
                                <p className="text-amber-400 font-semibold text-sm">
                                    {clientName}
                                </p>
                                <p className="text-white/20 text-xs mt-4">
                                    Redirecting you now...
                                </p>
                                <div className="w-full h-0.5 bg-white/5 rounded-full mt-4 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-amber-400"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1.5, ease: "linear" }}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Error state */}
                        {status === "error" && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-4"
                            >
                                <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-5">
                                    <XCircle size={24} className="text-red-400" />
                                </div>
                                <h2 className="text-lg font-bold text-white mb-2">
                                    Code not found
                                </h2>
                                <p className="text-white/40 text-sm leading-relaxed">
                                    That code doesn't match any gallery. Check the code Coffee sent you and try again.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Help text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 text-center"
                >
                    <p className="text-white/20 text-xs mb-3">
                        Don't have a code? Your gallery is sent after delivery.
                    </p>
                    
                       <a  href="https://wa.me/2348116273856?text=Hi%20Coffee%2C%20I%20need%20my%20gallery%20code"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs text-[#25D366] hover:text-green-400 transition-colors"
                    >
                        <MessageCircle size={12} />
                        Message Coffee for your code
                    </a>
                </motion.div>

                {/* Nav links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center gap-6 mt-8"
                >
                    <Link href="/" className="text-[10px] text-white/20 hover:text-white/50 uppercase tracking-widest transition-colors">
                        Home
                    </Link>
                    <Link href="/portfolio" className="text-[10px] text-white/20 hover:text-white/50 uppercase tracking-widest transition-colors">
                        Portfolio
                    </Link>
                    <Link href="/booking" className="text-[10px] text-white/20 hover:text-white/50 uppercase tracking-widest transition-colors">
                        Book
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}