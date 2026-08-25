"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    CheckCircle,
    MessageCircle,
    Calendar,
    Loader,
    XCircle,
} from "lucide-react";
import dynamic from "next/dynamic";

const CalEmbed = dynamic(() => import("@/components/cal-embed"), {
    loading: () => (
        <div className="flex items-center justify-center h-64">
            <div className="w-6 h-6 border-2 border-white/10 border-t-amber-400 rounded-full animate-spin" />
        </div>
    ),
    ssr: false,
});

// Cal.com event links per booking type
// Replace with Coffee's actual Cal.com username and event slugs
const CAL_LINKS: Record<string, string> = {
    wedding: "coffeeshotit/wedding-photography",
    event: "coffeeshotit/event-photography",
    studio: "coffeeshotit/portrait-session",
};

const BOOKING_LABELS: Record<string, string> = {
    wedding: "Wedding Photography",
    event: "Event Photography",
    studio: "Portrait / Studio Session",
};

type Status = "loading" | "success" | "failed";

export default function BookingConfirmationPage() {
    const searchParams = useSearchParams();
    const reference = searchParams.get("reference");
    const [status, setStatus] = useState<Status>("loading");
    const [bookingData, setBookingData] = useState<any>(null);
    const [showCal, setShowCal] = useState(false);

    useEffect(() => {
        if (!reference) {
            setStatus("failed");
            return;
        }

        const verify = async () => {
            try {
                const res = await fetch(`/api/payment/verify?reference=${reference}`);
                const data = await res.json();

                if (data.verified) {
                    setBookingData(data);
                    setStatus("success");
                } else {
                    setStatus("failed");
                }
            } catch {
                setStatus("failed");
            }
        };

        verify();
    }, [reference]);

    // Loading state
    if (status === "loading") {
        return (
            <main className="w-full bg-black text-white min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-white/10 border-t-amber-400 rounded-full animate-spin" />
                    <p className="text-white/30 text-xs uppercase tracking-[0.3em]">
                        Verifying payment...
                    </p>
                </div>
            </main>
        );
    }

    // Failed state
    if (status === "failed") {
        return (
            <main className="w-full bg-black text-white min-h-screen flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
                        <XCircle size={28} className="text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">
                        Payment not verified
                    </h2>
                    <p className="text-white/40 text-sm leading-relaxed mb-8">
                        We couldn't verify your payment. If you were charged,
                        please message Coffee directly with your reference number.
                    </p>
                    {reference && (
                        <p className="text-white/20 text-xs font-mono mb-8">
                            Ref: {reference}
                        </p>
                    )}
                    <div className="flex flex-col gap-3 max-w-xs mx-auto">
                        
                           <a  href={`https://wa.me/2348116273856?text=Hi%20Coffee%2C%20I%20just%20made%20a%20payment%20but%20it%20wasn't%20verified.%20Reference:%20${reference}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white text-xs font-bold uppercase tracking-widest rounded-full"
                        >
                            <MessageCircle size={14} />
                            Contact Coffee on WhatsApp
                        </a>
                        <Link href="/booking">
                            <button className="w-full py-3.5 border border-white/10 text-white/40 text-xs uppercase tracking-widest rounded-full">
                                Try Again
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    // Success state
    const calLink = CAL_LINKS[bookingData?.bookingType] ?? "coffeeshotit/photography-session";

    return (
        <main className="w-full bg-black text-white min-h-screen">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">

                {/* Success header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle size={28} className="text-green-400" />
                    </motion.div>

                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        You're booked{bookingData?.customerName
                            ? `, ${bookingData.customerName.split(" ")[0]}`
                            : ""}!
                    </h1>
                    <p className="text-white/40 text-sm">
                        Your deposit has been received and your session is confirmed. Check your email for confirmation details.
                    </p>
                </motion.div>

                {/* Booking summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 mb-6"
                >
                    <p className="text-[10px] text-amber-400/60 uppercase tracking-[0.4em] mb-4">
                        Booking Summary
                    </p>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-white/40 text-sm">Service</span>
                            <span className="text-amber-400 text-sm font-semibold">
                                {bookingData?.serviceName}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-white/40 text-sm">Deposit Paid</span>
                            <span className="text-green-400 text-sm font-bold">
                                ₦{bookingData?.amountPaid?.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-white/40 text-sm">Reference</span>
                            <span className="text-white/30 text-xs font-mono">
                                {reference}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Next steps */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 mb-8"
                >
                    <p className="text-[10px] text-amber-400/60 uppercase tracking-[0.4em] mb-4">
                        What Happens Next
                    </p>
                    <div className="flex flex-col gap-3">
                        {[
                            "Coffee will reach out within 24 hours",
                            "You'll receive a contract before your session",
                            "Balance due 7 days before your session",
                            "Your gallery is delivered after the shoot",
                        ].map((step, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <span className="text-[10px] text-amber-500/40 font-mono mt-0.5 flex-shrink-0">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <p className="text-sm text-white/50 font-light">{step}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Schedule session with Cal.com */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-[10px] text-amber-400/60 uppercase tracking-[0.4em] mb-1">
                                Optional
                            </p>
                            <h3 className="text-base font-semibold text-white">
                                Schedule your session
                            </h3>
                            <p className="text-white/30 text-xs mt-0.5">
                                Pick a date and time that works for you
                            </p>
                        </div>
                        <motion.button
                            onClick={() => setShowCal(!showCal)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-[0.15em] rounded-full transition-colors duration-300 flex-shrink-0"
                        >
                            <Calendar size={12} />
                            {showCal ? "Hide" : "Pick a Date"}
                        </motion.button>
                    </div>

                    {/* Cal.com embed */}
                    {showCal && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white/[0.02] border border-white/8 rounded-2xl overflow-hidden"
                            style={{ minHeight: "600px" }}
                        >
                            <CalEmbed calLink={calLink} />
                        </motion.div>
                    )}
                </motion.div>

                {/* Action buttons */}
                <div className="flex flex-col gap-3">
                    
                      <a  href="https://wa.me/2348116273856"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3.5 bg-[#25D366] hover:bg-green-500 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors duration-300"
                    >
                        <MessageCircle size={14} />
                        Message Coffee on WhatsApp
                    </a>
                    <Link href="/">
                        <button className="w-full py-3.5 border border-white/10 hover:border-white/30 text-white/50 hover:text-white text-xs uppercase tracking-widest rounded-full transition-all duration-300">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}