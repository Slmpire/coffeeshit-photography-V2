"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/contact-form";
import ContactInfo from "@/components/contact-info";
import SocialLinks from "@/components/social-links";
import {
    Camera,
    MapPin,
    Clock,
    Phone,
    Mail,
    Calendar,
    CheckCircle,
    Coffee,
} from "lucide-react";
import Image from "next/image";

export default function Contact() {
    return (
        <>
            {/* Hero Section with Photographer Image */}
            <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
                {/* Background Elements */}
                <div className='absolute inset-0'>
                    <div className='absolute top-20 left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse' />
                    <div
                        className='absolute bottom-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse'
                        style={{ animationDelay: "2s" }}
                    />
                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/2 rounded-full blur-3xl' />
                </div>

                <div className='relative z-10 max-w-7xl mx-auto px-4 md:px-12 pt-24'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
                        {/* Left Side - Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className='space-y-8'
                        >
                            <div>
                                <motion.h1
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className='text-5xl lg:text-7xl font-bold mb-6 signature-font'
                                >
                                    Let's Create
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className='text-xl lg:text-2xl  leading-relaxed mb-8'
                                >
                                    Ready to capture your story? I'm here to
                                    bring your vision to life through the lens
                                    of creativity and passion.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className='flex flex-wrap gap-4'
                                >
                                    <div className='flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2'>
                                        <div className='w-2 h-2 bg-amber-500 rounded-full animate-pulse' />
                                        <span className='text-sm'>
                                            Available for new projects
                                        </span>
                                    </div>
                                    <div className='flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2'>
                                        <div className='w-2 h-2 bg-amber-500 rounded-full animate-pulse' />
                                        <span className='text-sm'>
                                            Quick response time
                                        </span>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Quick Contact Options */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className='grid grid-cols-1 sm:grid-cols-2 gap-4'
                            >
                                <motion.a
                                    href='tel:+2348116273856'
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className='flex items-center space-x-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-all duration-300 group'
                                >
                                    <div className='w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center group-hover:bg-amber-500/30 transition-colors'>
                                        <Phone
                                            size={24}
                                            className='text-amber-400'
                                        />
                                    </div>
                                    <div>
                                        <p className='text-sm text-amber-400'>
                                            Call me
                                        </p>
                                        <p className='font-medium'>
                                            +234 811 627 3856
                                        </p>
                                    </div>
                                </motion.a>

                                <motion.a
                                    href='mailto:coffeeshotit@gmail.com'
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className='flex items-center space-x-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-all duration-300 group'
                                >
                                    <div className='w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center group-hover:bg-amber-500/30 transition-colors'>
                                        <Mail
                                            size={24}
                                            className='text-amber-400'
                                        />
                                    </div>
                                    <div>
                                        <p className='text-sm text-amber-400'>
                                            Email me
                                        </p>
                                        <p className='font-medium'>
                                            coffeeshotit@gmail.com
                                        </p>
                                    </div>
                                </motion.a>
                            </motion.div>
                        </motion.div>

                        {/* Right Side - Photographer Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className='relative'
                        >
                            <div className='relative'>
                                {/* Main Image Container */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    className='relative w-full h-[600px] rounded-3xl overflow-hidden'
                                >
                                    {/* Photographer Image Placeholder */}
                                    <div className='absolute inset-0 bg-gradient-to-br '>
                                        <div className='absolute inset-0 flex items-center justify-center'></div>
                                    </div>
                                    <Image
                                        src='https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress'
                                        alt='Contact Image'
                                        fill
                                        className='object-contain object-center relative w-full h-full'
                                    />

                                    {/* Overlay Gradient */}
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />

                                    {/* Floating Info Card */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1 }}
                                        className='absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6'
                                    >
                                        <div className='flex items-center space-x-4'>
                                            <div className='w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center'>
                                                <Camera
                                                    size={24}
                                                    className='text-white'
                                                />
                                            </div>
                                            <div>
                                                <h3 className='text-xl font-bold text-white'>
                                                    Coffee Shotit
                                                </h3>
                                                <p className='text-amber-300'>
                                                    Professional Photographer
                                                </p>
                                                <p className='text-sm text-amber-400'>
                                                    Lagos, Nigeria
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>

                                {/* Floating Elements */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{
                                        duration: 3,
                                        repeat: Number.POSITIVE_INFINITY,
                                    }}
                                    className='absolute -top-6 -right-6 w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20'
                                >
                                    <span className='text-2xl'>📸</span>
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{
                                        duration: 4,
                                        repeat: Number.POSITIVE_INFINITY,
                                        delay: 1,
                                    }}
                                    className='absolute -bottom-6 -left-6 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20'
                                >
                                    <span className='text-xl'>✨</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className='py-24 px-4 md:px-12 relative'>
                <div className='max-w-7xl mx-auto'>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className='text-center mb-16'
                    >
                        <h2 className='text-4xl lg:text-6xl font-bold mb-6 signature-font'>
                            Get In Touch
                        </h2>
                        <p className='text-xl  max-w-2xl mx-auto'>
                            Let's discuss your project over a cup of coffee
                        </p>
                    </motion.div>

                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
                        {/* Contact Form */}
                        <div className='lg:col-span-2'>
                            <ContactForm />
                        </div>

                        {/* Contact Information */}
                        <div className='space-y-8'>
                            <ContactInfo />
                        </div>
                        <div className='lg:col-span-3'>
                            <SocialLinks />
                        </div>
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section className='py-24 px-4 md:px-12 bg-white/5 backdrop-blur-sm'>
                <div className='max-w-7xl mx-auto'>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'
                    >
                        <div>
                            <h2 className='text-4xl font-bold mb-6 signature-font'>
                                Based in Lagos
                            </h2>
                            <p className='text-xl  mb-8'>
                                Located in the heart of Nigeria's creative
                                capital, but available for projects worldwide.
                                Let's bring your vision to life, wherever you
                                are.
                            </p>

                            <div className='space-y-4'>
                                <div className='flex items-center space-x-3'>
                                    <MapPin
                                        size={20}
                                        className='text-amber-400'
                                    />
                                    <span>Lagos, Nigeria</span>
                                </div>
                                <div className='flex items-center space-x-3'>
                                    <Calendar
                                        size={20}
                                        className='text-amber-400'
                                    />
                                    <span>Available for travel worldwide</span>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className='relative h-80 rounded-2xl overflow-hidden'
                        >
                            <div className='absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800'>
                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <div className='text-6xl text-white/20'>
                                        <Coffee size={200} />
                                    </div>
                                </div>
                            </div>
                            <div className='absolute inset-0 bg-black/20' />
                            <div className='absolute bottom-6 left-6 right-6'>
                                <h3 className='text-xl font-bold text-white mb-2'>
                                    Lagos, Nigeria
                                </h3>
                                <p className='text-amber-200'>
                                    Creative hub of West Africa
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
