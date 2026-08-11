import type { Metadata } from "next";
import { createClient } from "@/prismicio";
import { FaqDocument } from "@/prismicio-types";
import FAQClient from "./faq-client";
import Link from "next/link";

export const metadata: Metadata = {
    title: "FAQ",
    description: "Frequently asked questions about CoffeeShotIt photography services.",
};

export const revalidate = 60;

export default async function FAQPage() {
    const client = createClient();
    let faq: FaqDocument[] = [];
    try {
        faq = await client.getAllByType("faq") as unknown as FaqDocument[];
    } catch (e) {
        faq = [];
    }

    return (
        <main className="w-full bg-black text-white min-h-screen">

            {/* Hero */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-px w-10 bg-amber-400/60" />
                        <span className="text-[10px] text-amber-400 uppercase tracking-[0.5em]">
                            FAQ
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-[0.9] tracking-tight">
                            Common
                            <br />
                            <span className="text-white/20">Questions</span>
                        </h1>
                        <p className="text-white/40 text-base font-light leading-relaxed max-w-sm md:ml-auto">
                            Everything you need to know before booking.
                            Can't find your answer?{" "}
                            <Link href="/contact" className="text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-2">
                                Just ask.
                            </Link>
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ list */}
            <FAQClient faq={faq} />

            {/* CTA */}
            <section className="border-t border-white/5 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-white/30 text-sm mb-6">
                        Still have questions?
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact">
                            <button className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors duration-300">
                                Contact Coffee
                            </button>
                        </Link>
                        
                            <a href="https://wa.me/2348116273856"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3.5 border border-white/20 hover:border-white/50 text-white text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}