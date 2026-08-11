import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, MessageCircle, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Booking Confirmed",
    description: "Your booking request has been received.",
};

export default function BookingConfirmationPage() {
    return (
        <main className="w-full bg-black text-white min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center py-20">

                <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-8">
                    <CheckCircle size={32} className="text-green-400" />
                </div>

                <h1 className="text-4xl font-extrabold text-white mb-3">
                    You're booked!
                </h1>
                <p className="text-white/40 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
                    Coffee has received your booking request and will confirm within 24 hours. Check your email for a confirmation message.
                </p>

                {/* Next steps */}
                <div className="flex flex-col gap-3 text-left mb-10 p-5 bg-white/[0.03] border border-white/5 rounded-2xl">
                    <p className="text-[10px] text-amber-400/60 uppercase tracking-[0.4em] mb-2">
                        What happens next
                    </p>
                    {[
                        "Coffee reviews your request within 24 hours",
                        "You'll receive a confirmation email with details",
                        "Coffee will reach out on WhatsApp to discuss specifics",
                        "Invoice and contract sent before your session",
                    ].map((step, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <span className="text-[10px] text-amber-500/40 font-mono mt-0.5 flex-shrink-0">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <p className="text-sm text-white/50 font-light">
                                {step}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-3">
                    
                       <a href="https://wa.me/2348116273856"
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