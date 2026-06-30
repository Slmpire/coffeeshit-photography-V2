"use client";

import { ServicesDocument } from "@/prismicio-types";
import { PrismicRichText } from "@prismicio/react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ServicesProps {
    services: ServicesDocument[];
}

export default function Services({ services }: ServicesProps) {
    const [open, setOpen] = useState<number | null>(null);
    return (
        <section className='w-full bg-black text-white min-h-screen flex flex-col items-center px-2 md:px-0 py-16'>
            {/* Top Row */}
            <div className='w-full max-w-5xl grid grid-cols-3 items-center mb-2 text-xs font-semibold tracking-widest'>
                <div className='text-white/60'>04</div>
                <div className='text-center text-white/80'>//SERVICES</div>
                <div className='text-right text-white/60'>FAST DELIVERY</div>
            </div>
            {/* Heading and Description Row */}
            <div className='w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8 mt-8'>
                <h1 className='text-6xl md:text-[6rem] font-extrabold leading-none md:col-span-2 text-left'>
                    PRO
                    <br />
                    SERVICES
                </h1>
                <div className='md:col-span-1 flex flex-col justify-start h-full mt-8 md:mt-0'>
                    <p className='text-white/80 text-base md:text-lg max-w-xs md:text-right'>
                        Whether it's the joy of a wedding, the intimacy of a
                        portrait, or the essence of a brand, my photography is
                        crafted to make memories last a lifetime.
                    </p>
                </div>
            </div>
            {/* Services List */}
            <div className='w-full max-w-5xl divide-y divide-white/10 mt-8'>
                {services.map((service, idx) => (
                    <div key={service.id}>
                        <button
                            className='flex items-center w-full py-6 px-2 md:px-0 group hover:bg-white/5 transition focus:outline-none'
                            onClick={() => setOpen(open === idx ? null : idx)}
                            aria-expanded={open === idx}
                        >
                            <div className='w-12 text-xs font-bold text-white/60 flex-shrink-0'>
                                {String(idx + 1).padStart(2, "0")}
                            </div>
                            <div className='flex-1 text-left'>
                                <div className='font-bold text-white text-base md:text-lg'>
                                    {service.data.title}
                                </div>
                                <div className='text-xs md:text-sm text-white/40 uppercase mt-1'>
                                    {service.data.subtitle}
                                </div>
                            </div>
                            <div
                                className='w-8 flex justify-end transition-transform duration-300'
                                style={{
                                    transform:
                                        open === idx
                                            ? "rotate(180deg)"
                                            : "rotate(0deg)",
                                }}
                            >
                                <ChevronDown className='w-4 h-4' />
                            </div>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-500 bg-black ${open === idx ? "max-h-[400px] py-6 opacity-100" : "max-h-0 py-0 opacity-0"}`}
                            style={{}}
                        >
                            {open === idx && (
                                <div className='flex flex-col md:flex-row gap-6 items-center'>
                                    <div className='flex-1'>
                                        <div className='text-white/80 text-base mb-4 max-w-md'>
                                            <PrismicRichText
                                                field={service.data.description}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex-1 flex justify-center'>
                                        <Image
                                            src={
                                                service?.data?.feature_image
                                                    ?.url as string
                                            }
                                            alt={service.data.title ?? ""}
                                            width={400}
                                            height={300}
                                            className='rounded-xl object-cover w-full max-w-xs h-56'
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className='w-full max-w-5xl mt-6 '>
                <Image
                    src='https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress'
                    alt='Service 1'
                    width={500}
                    height={500}
                    className='w-full  h-[500px] object-cover overflow-hidden rounded-xl'
                />
            </div>
        </section>
    );
}
