import { useState } from "react";
import { Plus } from "lucide-react";
import { FaqDocument } from "@/prismicio-types";

const faqs = [
    {
        question: "How do I book a session?",
        answer: "You can book a session by contacting me via email or the contact form on my website. I will guide you through the process and confirm your booking.",
    },
    {
        question: "What's included in your photography packages?",
        answer: "All packages include a pre-session consultation, the photo session, professional editing, and a digital gallery. Custom packages are also available.",
    },
    {
        question: "How long does it take to receive my photos?",
        answer: "Typically, you will receive your edited photos within 2-3 weeks after your session.",
    },
    {
        question: "Do you offer destination wedding photography?",
        answer: "Yes, I am available for destination weddings and travel worldwide to capture your special moments.",
    },
    {
        question: "Can we choose the location for our shoot?",
        answer: "Absolutely! I am happy to suggest locations or work with your preferred spot.",
    },
    {
        question: "What should we wear for our session?",
        answer: "Wear outfits that make you feel comfortable and confident. I can provide style tips if needed.",
    },
    {
        question: "Do you offer prints and albums?",
        answer: "Yes, I offer a variety of print and album options to showcase your photos beautifully.",
    },
    {
        question: "What happens if it rains on the day of our outdoor shoot?",
        answer: "We can reschedule or find an indoor location. Your comfort and satisfaction are my priority.",
    },
    {
        question: "Do you edit all the photos?",
        answer: "Yes, all delivered photos are professionally edited for color, lighting, and style.",
    },
    {
        question: "Can I request specific shots or styles?",
        answer: "Of course! I welcome your ideas and will do my best to accommodate your requests.",
    },
];

export default function FAQ({ faq }: { faq: FaqDocument[] }) {
    const [open, setOpen] = useState<number | null>(null);
    return (
        <section className='w-full bg-black text-white min-h-screen flex flex-col items-center px-2 md:px-0 py-16'>
            {/* Top Row */}
            <div className='w-full max-w-5xl grid grid-cols-3 items-center mb-2 text-xs font-semibold tracking-widest'>
                <div className='text-white/60'>09</div>
                <div className='text-center text-white/80'>//FAQ</div>
                <div className='text-right text-white/60'>CONCERNS</div>
            </div>
            {/* Heading */}
            <h1 className='text-2xl md:text-4xl font-extrabold text-center mt-8 mb-12 tracking-tight leading-tight uppercase max-w-3xl mx-auto'>
                FREQUENTLY
                <br />
                ASKED QUESTIONS
            </h1>
            {/* FAQ List */}
            <div className='w-full max-w-5xl divide-y divide-white/10 mt-8'>
                {faq?.map((faq, idx) => (
                    <div key={idx}>
                        <button
                            className='flex items-center w-full py-6 px-2 md:px-0 group hover:bg-white/5 transition focus:outline-none'
                            onClick={() => setOpen(open === idx ? null : idx)}
                            aria-expanded={open === idx}
                        >
                            <div className='w-12 text-xs font-bold text-white/60 flex-shrink-0'>
                                {String(idx + 1).padStart(2, "0")}
                            </div>
                            <div className='flex-1 text-left'>
                                <div className='font-bold text-white text-base md:text-lg uppercase'>
                                    {faq.data.question}
                                </div>
                            </div>
                            <div
                                className='w-8 flex justify-end transition-transform duration-300'
                                style={{
                                    transform:
                                        open === idx
                                            ? "rotate(45deg)"
                                            : "rotate(0deg)",
                                }}
                            >
                                <Plus className='w-4 h-4 text-white/60' />
                            </div>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-500 bg-black ${open === idx ? "max-h-40 py-4 opacity-100" : "max-h-0 py-0 opacity-0"}`}
                        >
                            {open === idx && (
                                <div className='text-white/80 text-base md:text-lg px-4 md:px-12'>
                                    {faq.data.answer}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
