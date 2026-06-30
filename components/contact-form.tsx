"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

// Zod schema for form validation
const contactFormSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
    instagram: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters long"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to submit contact form");
            }

            setIsSubmitting(false);
            setIsSuccess(true);

            // Reset form
            reset();

            // Reset success message after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (error) {
            console.error("Error submitting contact form:", error);
            setIsSubmitting(false);
            toast.error("Failed to send message. Please try again.");
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center'
            >
                <div className='text-green-400 text-6xl mb-4'>✓</div>
                <h3 className='text-xl font-semibold text-white mb-2'>
                    Message Sent!
                </h3>
                <p className='text-amber-300'>
                    Thank you for reaching out. I'll get back to you within 24
                    hours!
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8'
        >
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                {/* Name Fields */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='relative'>
                        <label className='block text-sm font-medium text-white mb-3'>
                            First Name
                        </label>
                        <input
                            type='text'
                            {...register("firstName")}
                            className={`w-full bg-amber-900/20 border rounded-lg px-4 py-3 text-white placeholder-amber-300/60 focus:outline-none transition-colors ${
                                errors.firstName
                                    ? "border-red-500 focus:border-red-400"
                                    : "border-amber-700/30 focus:border-amber-400/60"
                            }`}
                            placeholder='John'
                        />
                        {errors.firstName && (
                            <p className='text-red-400 text-sm mt-1'>
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>
                    <div className='relative'>
                        <label className='block text-sm font-medium text-white mb-3'>
                            Last Name
                        </label>
                        <input
                            type='text'
                            {...register("lastName")}
                            className={`w-full bg-amber-900/20 border rounded-lg px-4 py-3 text-white placeholder-amber-300/60 focus:outline-none transition-colors ${
                                errors.lastName
                                    ? "border-red-500 focus:border-red-400"
                                    : "border-amber-700/30 focus:border-amber-400/60"
                            }`}
                            placeholder='Doe'
                        />
                        {errors.lastName && (
                            <p className='text-red-400 text-sm mt-1'>
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Email */}
                <div className='relative'>
                    <label className='block text-sm font-medium text-white mb-3'>
                        Email
                    </label>
                    <input
                        type='email'
                        {...register("email")}
                        className={`w-full bg-amber-900/20 border rounded-lg px-4 py-3 text-white placeholder-amber-300/60 focus:outline-none transition-colors ${
                            errors.email
                                ? "border-red-500 focus:border-red-400"
                                : "border-amber-700/30 focus:border-amber-400/60"
                        }`}
                        placeholder='coffeeshotit@gmail.com'
                    />
                    {errors.email && (
                        <p className='text-red-400 text-sm mt-1'>
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Phone Number */}
                <div className='relative'>
                    <label className='block text-sm font-medium text-white mb-3'>
                        Phone Number
                    </label>
                    <input
                        type='tel'
                        {...register("phone")}
                        className='w-full bg-amber-900/20 border border-amber-700/30 rounded-lg px-4 py-3 text-white placeholder-amber-300/60 focus:outline-none focus:border-amber-400/60 transition-colors'
                        placeholder='+234 811 627 3856'
                    />
                </div>

                {/* Instagram */}
                <div className='relative'>
                    <label className='block text-sm font-medium text-white mb-3'>
                        Instagram Handle (Optional)
                    </label>
                    <input
                        type='text'
                        {...register("instagram")}
                        className='w-full bg-amber-900/20 border border-amber-700/30 rounded-lg px-4 py-3 text-white placeholder-amber-300/60 focus:outline-none focus:border-amber-400/60 transition-colors'
                        placeholder='@yourhandle'
                    />
                </div>

                {/* Message */}
                <div className='relative'>
                    <label className='block text-sm font-medium text-white mb-3'>
                        Message
                    </label>
                    <textarea
                        {...register("message")}
                        rows={4}
                        className={`w-full bg-amber-900/20 border rounded-lg px-4 py-3 text-white placeholder-amber-300/60 focus:outline-none transition-colors resize-none ${
                            errors.message
                                ? "border-red-500 focus:border-red-400"
                                : "border-amber-700/30 focus:border-amber-400/60"
                        }`}
                        placeholder='Tell me about your project and how I can help bring your vision to life...'
                    />
                    {errors.message && (
                        <p className='text-red-400 text-sm mt-1'>
                            {errors.message.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <motion.button
                    type='submit'
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='w-full bg-white text-black font-semibold py-4 px-6 rounded-xl hover:bg-amber-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2'
                >
                    {isSubmitting ? (
                        <div className='w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin' />
                    ) : (
                        <>
                            <span>Send Message</span>
                            <Send size={18} />
                        </>
                    )}
                </motion.button>

                <p className='text-sm text-amber-400 text-center'>
                    I'll get back to you within 24 hours to discuss your
                    project!
                </p>
            </form>
        </motion.div>
    );
}
