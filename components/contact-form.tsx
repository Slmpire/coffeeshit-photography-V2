"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Send, CheckCircle } from "lucide-react";

const schema = z.object({
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    email: z.string().email("Enter a valid email"),
    whatsapp: z.string().min(7, "Enter your WhatsApp number"),
    service: z.string().min(1, "Please select a service"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const SERVICES = [
    "Wedding Photography",
    "Event Photography",
    "Portrait / Studio Session",
    "Proposal Photography",
    "Outdoor Session",
    "Corporate / Brand Photography",
    "Other",
];

const inputClass = (hasError: boolean) =>
    `w-full bg-white/[0.03] border ${
        hasError ? "border-red-500/60" : "border-white/10"
    } rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-amber-400/50 transition-colors duration-200`;

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Failed");
            setIsSuccess(true);
            reset();
        } catch {
            toast.error("Something went wrong. Please try again or message on WhatsApp.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence mode="wait">
            {isSuccess ? (
                <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center gap-6 py-20 text-center"
                >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                        <CheckCircle size={28} className="text-green-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                            Message sent!
                        </h3>
                        <p className="text-white/40 text-sm max-w-sm">
                            Coffee will get back to you within 24 hours. For urgent enquiries,
                            reach out directly on WhatsApp.
                        </p>
                    </div>
                    
                       <a href="https://wa.me/2348116273856"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors"
                    >
                        Message on WhatsApp
                    </a>
                    <button
                        onClick={() => setIsSuccess(false)}
                        className="text-xs text-white/30 hover:text-white/60 transition-colors underline underline-offset-2"
                    >
                        Send another message
                    </button>
                </motion.div>
            ) : (
                <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                >
                    {/* Name row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] text-white/40 uppercase tracking-[0.3em]">
                                First Name
                            </label>
                            <input
                                {...register("firstName")}
                                placeholder="Amara"
                                className={inputClass(!!errors.firstName)}
                            />
                            {errors.firstName && (
                                <span className="text-[10px] text-red-400">{errors.firstName.message}</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] text-white/40 uppercase tracking-[0.3em]">
                                Last Name
                            </label>
                            <input
                                {...register("lastName")}
                                placeholder="Okafor"
                                className={inputClass(!!errors.lastName)}
                            />
                            {errors.lastName && (
                                <span className="text-[10px] text-red-400">{errors.lastName.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-white/40 uppercase tracking-[0.3em]">
                            Email Address
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="amara@example.com"
                            className={inputClass(!!errors.email)}
                        />
                        {errors.email && (
                            <span className="text-[10px] text-red-400">{errors.email.message}</span>
                        )}
                    </div>

                    {/* WhatsApp */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-white/40 uppercase tracking-[0.3em]">
                            WhatsApp Number
                        </label>
                        <input
                            {...register("whatsapp")}
                            type="tel"
                            placeholder="+234 800 000 0000"
                            className={inputClass(!!errors.whatsapp)}
                        />
                        {errors.whatsapp && (
                            <span className="text-[10px] text-red-400">{errors.whatsapp.message}</span>
                        )}
                    </div>

                    {/* Service */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-white/40 uppercase tracking-[0.3em]">
                            Service Interested In
                        </label>
                        <select
                            {...register("service")}
                            className={`${inputClass(!!errors.service)} bg-black appearance-none cursor-pointer`}
                        >
                            <option value="" className="bg-black">Select a service...</option>
                            {SERVICES.map((s) => (
                                <option key={s} value={s} className="bg-black">
                                    {s}
                                </option>
                            ))}
                        </select>
                        {errors.service && (
                            <span className="text-[10px] text-red-400">{errors.service.message}</span>
                        )}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-white/40 uppercase tracking-[0.3em]">
                            Message
                        </label>
                        <textarea
                            {...register("message")}
                            rows={5}
                            placeholder="Tell Coffee about your event, date, location, and any specific shots you have in mind..."
                            className={`${inputClass(!!errors.message)} resize-none`}
                        />
                        {errors.message && (
                            <span className="text-[10px] text-red-400">{errors.message.message}</span>
                        )}
                    </div>

                    {/* Submit */}
                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors duration-300 mt-2"
                    >
                        {isSubmitting ? (
                            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        ) : (
                            <>
                                Send Message
                                <Send size={14} />
                            </>
                        )}
                    </motion.button>

                    <p className="text-[10px] text-white/20 text-center">
                        Coffee typically responds within 24 hours. For urgent enquiries use WhatsApp.
                    </p>
                </motion.form>
            )}
        </AnimatePresence>
    );
}