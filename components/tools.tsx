"use client";

import { motion } from "framer-motion";

const tools = [
    {
        name: "PHOTOSHOP",
        category: "IMAGE EDITING SOFTWARE",
        description:
            "Adobe Photoshop is a powerful image editing software used for graphic design, photo retouching, and digital art.",
    },
    {
        name: "LIGHTROOM",
        category: "PHOTO MANAGEMENT & EDITING",
        description:
            "Adobe Lightroom is a photo editing and organization tool designed for photographers to enhance and catalog images efficiently.",
    },
    {
        name: "EVOTO",
        category: "AI-POWERED PHOTO EDITOR",
        description:
            "Evoto is an AI-driven photo editing software that automates retouching, making professional-grade edits quick and effortless.",
    },
    {
        name: "PIXIESET",
        category: "ONLINE GALLERY & CLIENT DELIVERY",
        description:
            "Pixieset is a platform for photographers to showcase, deliver, and sell their work through beautifully designed online galleries.",
    },
];

export default function Tools() {
    return (
        <section className='w-full bg-black text-white min-h-screen flex flex-col items-center px-2 md:px-0 py-16'>
            {/* Top Row */}
            <div className='w-full max-w-5xl grid grid-cols-3 items-center mb-2 text-xs font-semibold tracking-widest'>
                <div className='text-white/60'>07</div>
                <div className='text-center text-white/80'>//MY TOOLS</div>
                <div className='text-right text-white/60'>HOW I CREATE</div>
            </div>
            <div className='w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-8'>
                {/* Left: Heading */}
                <div className='md:col-span-1 flex flex-col justify-start'>
                    <h1 className='text-4xl md:text-5xl font-extrabold text-left mb-8 md:mb-0'>
                        STACK & TOOLS
                    </h1>
                </div>
                {/* Right: Tools List */}
                <div className='md:col-span-2 flex flex-col divide-y divide-white/10'>
                    {tools.map((tool, idx) => (
                        <div key={idx} className='py-8 px-2 md:px-8'>
                            <div className='text-xl md:text-2xl font-bold uppercase mb-2'>
                                {tool.name}
                            </div>
                            <div className='text-xs font-semibold uppercase text-white/40 mb-2 tracking-widest'>
                                {tool.category}
                            </div>
                            <div className='text-sm md:text-base text-white/80 max-w-2xl'>
                                {tool.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
