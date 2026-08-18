"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader, MessageCircle } from "lucide-react";

function ConfirmationContent() {
    const searchParams = useSearchParams();
    const reference = searchParams.get("reference") ?? searchParams.get("trxref");

    const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
    const [details, setDetails] = useState<{
        customerName: string;
        serviceName: string;
        amountPaid: number;
        reference: string;
    } | null>(null);

    useEffect(() => {
        if (!reference) {
            setStatus("failed");
            return;
        }

        fetch(`/api/payment/verify?reference=${reference}`)
            .then((r) => r.json())
            .then((data) => {
                if (data.verified) {
                    setDetails(data);
                    setStatus("success");
                } else {
                    setStatus("failed");
                }
            })
            .catch(() => setStatus("failed"));
    }, [reference]);

    return (
        <main className="w-full bg-black text-white min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center py-20">

                {/* Loading */}
                {status === "loading" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <div className="w-16 h-16 rounded-full border-2 border-white/10 border-t-amber-400 animate-spin" />
                        <p className="text-white/40 text-sm uppercase tracking-widest">
                            Verifying payment...
                        </p>
                    </motion.div>
                )}

                {/* Success */}
                {status === "success" && details && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-8"
                        >
                            <CheckCircle size={32} className="text-green-400" />
                        </motion.div>

                        <h1 className="text-4xl font-extrabold text-white mb-3">
                            You're booked{details.customerName
                                ? `, ${details.customerName.split(" ")[0]}`
                                : ""}!
                        </h1>
                        <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                            Your deposit has been received and your session is confirmed. Check your email for confirmation details.
                        </p>

                        {/* Payment details */}
                        <div className="flex flex-col gap-3 text-left mb-8 p-5 bg-white/[0.03] border border-white/5 rounded-2xl">
                            <p className="text-[10px] text-amber-400/60 uppercase tracking-[0.4em] mb-2">
                                Booking Summary
                            </p>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-xs text-white/40">Service</span>
                                <span className="text-xs text-white font-medium">{details.serviceName}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-xs text-white/40">Deposit Paid</span>
                                <span className="text-xs text-green-400 font-bold">
                                    ₦{details.amountPaid.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-xs text-white/40">Reference</span>
                                <span className="text-[10px] text-white/30 font-mono">{details.reference}</span>
                            </div>
                        </div>

                        {/* Next steps */}
                        <div className="flex flex-col gap-2.5 text-left mb-8 p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <p className="text-[10px] text-amber-400/60 uppercase tracking-[0.4em] mb-2">
                                What happens next
                            </p>
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
                                    <p className="text-xs text-white/40 font-light">{step}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3">
                            
                              <a   href="https://wa.me/2348116273856"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 py-3.5 bg-[#25D366] hover:bg-green-500 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors duration-300"
                            >
                                <MessageCircle size={14} />
                                Message Coffee on WhatsApp
                            </a>
                            <Link href="/">
                                <button className="w-full py-3.5 border border-white/10 hover:border-white/30 text-white/40 hover:text-white text-xs uppercase tracking-widest rounded-full transition-all duration-300">
                                    Back to Home
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}

                {/* Failed */}
                {status === "failed" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-8">
                            <XCircle size={32} className="text-red-400" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-white mb-3">
                            Payment not verified
                        </h1>
                        <p className="text-white/40 text-sm leading-relaxed mb-8">
                            We couldn't verify your payment. If you were charged, please message Coffee directly with your reference number.
                        </p>
                        <div className="flex flex-col gap-3">
                            
                            <a  href="https://wa.me/2348116273856"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 py-3.5 bg-[#25D366] hover:bg-green-500 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors"
                            >
                                <MessageCircle size={14} />
                                Contact Coffee on WhatsApp
                            </a>
                            <Link href="/booking">
                                <button className="w-full py-3.5 border border-white/10 hover:border-white/30 text-white/40 hover:text-white text-xs uppercase tracking-widest rounded-full transition-all">
                                    Try Again
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </div>
        </main>
    );
}

export default function BookingConfirmationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/10 border-t-amber-400 rounded-full animate-spin" />
            </div>
        }>
            <ConfirmationContent />
        </Suspense>
    );
}