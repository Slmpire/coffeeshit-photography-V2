"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowUpRight,
    Heart,
    Camera,
    PartyPopper,
    CheckCircle,
    MessageCircle,
    Clock,
    MapPin,
    Star,
} from "lucide-react";

// ── Schemas ───────────────────────────────────────────────
const base = z.object({
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().min(7, "Enter your WhatsApp number"),
    instagram: z.string().optional(),
});

const weddingSchema = base.extend({
    weddingDate: z.string().min(1, "Required"),
    receptionDate: z.string().optional(),
    weddingLocation: z.string().min(1, "Required"),
    receptionLocation: z.string().optional(),
    aboutWedding: z.string().min(10, "Please add more detail"),
    aboutCouple: z.string().min(10, "Please add more detail"),
    whyUs: z.string().min(10, "Please add more detail"),
});

const eventSchema = base.extend({
    eventType: z.string().min(1, "Required"),
    eventDate: z.string().min(1, "Required"),
    eventTime: z.string().min(1, "Required"),
    eventLocation: z.string().min(1, "Required"),
    aboutEvent: z.string().min(10, "Please add more detail"),
    aboutYou: z.string().min(10, "Please add more detail"),
    whyUs: z.string().min(10, "Please add more detail"),
});

const studioSchema = base.extend({
    sessionType: z.string().min(1, "Required"),
    sessionDate: z.string().min(1, "Required"),
    aboutSession: z.string().min(10, "Please add more detail"),
});

type WeddingData = z.infer<typeof weddingSchema>;
type EventData = z.infer<typeof eventSchema>;
type StudioData = z.infer<typeof studioSchema>;
type BookingType = "wedding" | "event" | "studio" | null;

// ── Packages ──────────────────────────────────────────────
const PACKAGES = [
    {
        type: "wedding" as BookingType,
        icon: Heart,
        title: "Wedding Photography",
        subtitle: "Full Day Coverage",
        desc: "From getting ready to the last dance — every moment captured with intention.",
        price: "From ₦250,000",
        includes: ["Ceremony coverage", "Reception coverage", "Edited gallery", "Private delivery"],
        image: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
    },
    {
        type: "event" as BookingType,
        icon: PartyPopper,
        title: "Event Photography",
        subtitle: "Half Day or Full Day",
        desc: "Birthdays, proposals, burials, corporate events, and every celebration in between.",
        price: "From ₦80,000",
        includes: ["Event coverage", "Edited gallery", "Private delivery", "Quick turnaround"],
        image: "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
    },
    {
        type: "studio" as BookingType,
        icon: Camera,
        title: "Portrait / Studio",
        subtitle: "2–3 Hour Session",
        desc: "Studio portraits, outdoor sessions, corporate headshots, and collaborations.",
        price: "From ₦50,000",
        includes: ["Session coverage", "Edited selects", "Private gallery", "Print-ready files"],
        image: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
    },
];

// ── Styles ────────────────────────────────────────────────
const inp = (err?: boolean) =>
    `w-full bg-white/[0.04] border ${
        err
            ? "border-red-500/50 focus:border-red-400/50"
            : "border-white/8 focus:border-amber-400/50"
    } rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none transition-colors duration-200`;

const lbl = "block text-[10px] text-white/30 uppercase tracking-[0.3em] mb-2";

// ── Main ──────────────────────────────────────────────────
export default function BookingPage() {
    const [bookingType, setBookingType] = useState<BookingType>(null);
    const [step, setStep] = useState<"select" | "form" | "success">("select");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [clientName, setClientName] = useState("");

    const selectedPackage = PACKAGES.find((p) => p.type === bookingType);

    const handleSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, bookingType }),
            });
            if (!res.ok) throw new Error();
            setClientName(`${data.firstName} ${data.lastName}`.trim());
            setStep("success");
        } catch {
            toast.error("Failed to submit. Message Coffee on WhatsApp instead.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="w-full bg-black text-white min-h-screen">
            <AnimatePresence mode="wait">

                {/* ── Step 1: Select package ── */}
                {step === "select" && (
                    <motion.div
                        key="select"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="min-h-screen"
                    >
                        {/* Hero */}
                        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                            <div className="max-w-7xl mx-auto">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="h-px w-10 bg-amber-400/60" />
                                    <span className="text-[10px] text-amber-400 uppercase tracking-[0.5em]">
                                        Book a Session
                                    </span>
                                </div>
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.9] tracking-tight mb-6">
                                    Reserve your
                                    <br />
                                    <span className="text-white/15">moment</span>
                                    <br />
                                    with Coffee.
                                </h1>
                                <p className="text-white/30 text-sm max-w-md leading-relaxed">
                                    Choose your session type below. Coffee will confirm within 24 hours and reach out directly.
                                </p>
                            </div>
                        </section>

                        {/* Package cards — image background */}
                        <section className="px-4 sm:px-6 lg:px-8 pb-32">
                            <div className="max-w-7xl mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {PACKAGES.map(({ type, icon: Icon, title, subtitle, desc, price, includes, image }) => (
                                        <motion.button
                                            key={type}
                                            onClick={() => {
                                                setBookingType(type);
                                                setStep("form");
                                            }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="group relative text-left overflow-hidden rounded-2xl h-[500px] md:h-[580px]"
                                        >
                                            {/* Background image */}
                                            <Image
                                                src={image}
                                                alt={title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />

                                            {/* Overlays */}
                                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-500" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                                            {/* Top badge */}
                                            <div className="absolute top-5 left-5">
                                                <div className="w-9 h-9 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                                                    <Icon size={16} className="text-amber-400" />
                                                </div>
                                            </div>

                                            {/* Hover arrow */}
                                            <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                                                <ArrowUpRight size={14} className="text-black" />
                                            </div>

                                            {/* Content — bottom */}
                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                {/* Includes — shows on hover */}
                                                <div className="flex flex-col gap-1.5 mb-5 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400">
                                                    {includes.map((item) => (
                                                        <div key={item} className="flex items-center gap-2">
                                                            <div className="w-1 h-1 rounded-full bg-amber-400" />
                                                            <span className="text-[10px] text-white/60 uppercase tracking-[0.2em]">
                                                                {item}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <span className="text-[9px] text-amber-400/70 uppercase tracking-[0.3em] block mb-1">
                                                    {subtitle}
                                                </span>
                                                <h3 className="text-xl font-bold text-white mb-1">
                                                    {title}
                                                </h3>
                                                <p className="text-xs text-white/40 font-light leading-relaxed mb-4">
                                                    {desc}
                                                </p>
                                                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                                                    <span className="text-sm font-bold text-white">
                                                        {price}
                                                    </span>
                                                    <span className="text-[10px] text-white/30 uppercase tracking-widest">
                                                        Tap to book
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>

                                {/* WhatsApp fallback */}
                                <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <p className="text-white/20 text-sm">Not sure which to pick?</p>
                                    
                                        < a href="https://wa.me/2348116273856?text=Hi%20Coffee%2C%20I%27d%20like%20to%20inquire%20about%20a%20photography%20session"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm text-[#25D366] hover:text-green-400 transition-colors"
                                    >
                                        <MessageCircle size={16} />
                                        Chat with Coffee on WhatsApp
                                    </a>
                                </div>
                            </div>
                        </section>
                    </motion.div>
                )}

                {/* ── Step 2: Form with split layout ── */}
                {step === "form" && selectedPackage && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="min-h-screen lg:grid lg:grid-cols-[1fr_1.2fr]"
                    >
                        {/* Left — sticky info panel */}
                        <div className="relative hidden lg:block">
                            <div className="sticky top-0 h-screen overflow-hidden">
                                {/* Background image */}
                                <Image
                                    src={selectedPackage.image}
                                    alt={selectedPackage.title}
                                    fill
                                    className="object-cover"
                                    sizes="40vw"
                                />
                                <div className="absolute inset-0 bg-black/60" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-between p-10">
                                    {/* Top */}
                                    <button
                                        onClick={() => setStep("select")}
                                        className="flex items-center gap-2 text-white/40 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors w-fit"
                                    >
                                        <ArrowLeft size={14} />
                                        Back
                                    </button>

                                    {/* Bottom */}
                                    <div>
                                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-6">
                                            <selectedPackage.icon size={18} className="text-amber-400" />
                                        </div>

                                        <p className="text-[10px] text-amber-400/60 uppercase tracking-[0.4em] mb-2">
                                            {selectedPackage.subtitle}
                                        </p>
                                        <h2 className="text-3xl font-bold text-white mb-3">
                                            {selectedPackage.title}
                                        </h2>
                                        <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
                                            {selectedPackage.desc}
                                        </p>

                                        {/* Includes */}
                                        <div className="flex flex-col gap-2 mb-6">
                                            {selectedPackage.includes.map((item) => (
                                                <div key={item} className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                                    <span className="text-xs text-white/50">
                                                        {item}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-5 border-t border-white/10">
                                            <p className="text-xl font-bold text-white">
                                                {selectedPackage.price}
                                            </p>
                                            <p className="text-[10px] text-white/20 mt-1">
                                                Final price confirmed after consultation
                                            </p>
                                        </div>

                                        {/* Social proof */}
                                        <div className="flex items-center gap-2 mt-6">
                                            <div className="flex">
                                                {[1,2,3,4,5].map((s) => (
                                                    <Star key={s} size={10} className="text-amber-400 fill-amber-400" />
                                                ))}
                                            </div>
                                            <span className="text-[10px] text-white/30">
                                                Trusted by 200+ clients worldwide
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right — scrollable form */}
                        <div className="px-4 sm:px-8 lg:px-12 pt-28 lg:pt-16 pb-24">

                            {/* Mobile back */}
                            <button
                                onClick={() => setStep("select")}
                                className="flex lg:hidden items-center gap-2 text-white/40 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors mb-8"
                            >
                                <ArrowLeft size={14} />
                                Back
                            </button>

                            {/* Mobile package label */}
                            <div className="lg:hidden mb-8 p-4 bg-white/[0.03] border border-white/8 rounded-xl flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                                    <selectedPackage.icon size={16} className="text-amber-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">{selectedPackage.title}</p>
                                    <p className="text-[10px] text-white/30">{selectedPackage.price}</p>
                                </div>
                            </div>

                            <div className="max-w-lg">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    Fill in your details
                                </h2>
                                <p className="text-white/30 text-sm mb-10">
                                    Coffee will review and confirm within 24 hours.
                                </p>

                                {bookingType === "wedding" && (
                                    <WeddingForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
                                )}
                                {bookingType === "event" && (
                                    <EventForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
                                )}
                                {bookingType === "studio" && (
                                    <StudioForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ── Step 3: Success ── */}
                {step === "success" && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="min-h-screen flex items-center justify-center px-4"
                    >
                        <div className="max-w-md w-full text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-8"
                            >
                                <CheckCircle size={32} className="text-green-400" />
                            </motion.div>

                            <h2 className="text-4xl font-bold text-white mb-3">
                                You're booked{clientName ? `,\n${clientName.split(" ")[0]}` : ""}!
                            </h2>
                            <p className="text-white/40 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
                                Coffee has received your request and will confirm within 24 hours. Check your email for a confirmation.
                            </p>

                            <div className="flex flex-col gap-3 max-w-xs mx-auto">
                                
                                   <a href="https://wa.me/2348116273856"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 py-3.5 bg-[#25D366] hover:bg-green-500 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors duration-300"
                                >
                                    <MessageCircle size={14} />
                                    Message on WhatsApp
                                </a>
                                <Link href="/">
                                    <button className="w-full py-3.5 border border-white/10 hover:border-white/30 text-white/60 hover:text-white text-xs uppercase tracking-widest rounded-full transition-all duration-300">
                                        Back to Home
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}

// ── Form components ───────────────────────────────────────
function WeddingForm({ onSubmit, isSubmitting }: { onSubmit: (d: WeddingData) => void; isSubmitting: boolean }) {
    const { register, handleSubmit, formState: { errors } } = useForm<WeddingData>({ resolver: zodResolver(weddingSchema) });
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <Section title="Personal Details">
                <Row>
                    <Field label="First Name" error={errors.firstName?.message}><input {...register("firstName")} placeholder="Amara" className={inp(!!errors.firstName)} /></Field>
                    <Field label="Last Name" error={errors.lastName?.message}><input {...register("lastName")} placeholder="Okafor" className={inp(!!errors.lastName)} /></Field>
                </Row>
                <Field label="Email" error={errors.email?.message}><input {...register("email")} type="email" placeholder="amara@example.com" className={inp(!!errors.email)} /></Field>
                <Field label="WhatsApp Number" error={errors.phone?.message}><input {...register("phone")} type="tel" placeholder="+234 800 000 0000" className={inp(!!errors.phone)} /></Field>
                <Field label="Instagram (optional)"><input {...register("instagram")} placeholder="@yourhandle" className={inp()} /></Field>
            </Section>

            <Section title="Wedding Details">
                <Row>
                    <Field label="Wedding Date" error={errors.weddingDate?.message}><input {...register("weddingDate")} type="date" className={inp(!!errors.weddingDate)} /></Field>
                    <Field label="Reception Date (optional)"><input {...register("receptionDate")} type="date" className={inp()} /></Field>
                </Row>
                <Row>
                    <Field label="Wedding Location" error={errors.weddingLocation?.message}><input {...register("weddingLocation")} placeholder="Lagos, Nigeria" className={inp(!!errors.weddingLocation)} /></Field>
                    <Field label="Reception Location (optional)"><input {...register("receptionLocation")} placeholder="City, State" className={inp()} /></Field>
                </Row>
            </Section>

            <Section title="Tell Coffee More">
                <Field label="About your wedding" error={errors.aboutWedding?.message}><textarea {...register("aboutWedding")} rows={4} placeholder="What's your vision? What coverage do you need?" className={`${inp(!!errors.aboutWedding)} resize-none`} /></Field>
                <Field label="About you two" error={errors.aboutCouple?.message}><textarea {...register("aboutCouple")} rows={3} placeholder="Your story, favourite memories, interests..." className={`${inp(!!errors.aboutCouple)} resize-none`} /></Field>
                <Field label="What draws you to Coffee's work?" error={errors.whyUs?.message}><textarea {...register("whyUs")} rows={3} placeholder="What do you love about the style?" className={`${inp(!!errors.whyUs)} resize-none`} /></Field>
            </Section>

            <Submit isSubmitting={isSubmitting} />
        </form>
    );
}

function EventForm({ onSubmit, isSubmitting }: { onSubmit: (d: EventData) => void; isSubmitting: boolean }) {
    const { register, handleSubmit, control, formState: { errors } } = useForm<EventData>({ resolver: zodResolver(eventSchema) });
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <Section title="Personal Details">
                <Row>
                    <Field label="First Name" error={errors.firstName?.message}><input {...register("firstName")} placeholder="Amara" className={inp(!!errors.firstName)} /></Field>
                    <Field label="Last Name" error={errors.lastName?.message}><input {...register("lastName")} placeholder="Okafor" className={inp(!!errors.lastName)} /></Field>
                </Row>
                <Field label="Email" error={errors.email?.message}><input {...register("email")} type="email" placeholder="amara@example.com" className={inp(!!errors.email)} /></Field>
                <Field label="WhatsApp Number" error={errors.phone?.message}><input {...register("phone")} type="tel" placeholder="+234 800 000 0000" className={inp(!!errors.phone)} /></Field>
                <Field label="Instagram (optional)"><input {...register("instagram")} placeholder="@yourhandle" className={inp()} /></Field>
            </Section>

            <Section title="Event Details">
                <Row>
                    <Field label="Event Type" error={errors.eventType?.message}>
                        <Controller name="eventType" control={control} render={({ field }) => (
                            <select {...field} className={`${inp(!!errors.eventType)} bg-black appearance-none cursor-pointer`}>
                                <option value="">Select type...</option>
                                <option value="burial">Burial</option>
                                <option value="proposal">Proposal</option>
                                <option value="birthday">Birthday</option>
                                <option value="end-of-year">End of Year Party</option>
                                <option value="corporate">Corporate Event</option>
                                <option value="others">Others</option>
                            </select>
                        )} />
                    </Field>
                    <Field label="Event Date" error={errors.eventDate?.message}><input {...register("eventDate")} type="date" className={inp(!!errors.eventDate)} /></Field>
                </Row>
                <Row>
                    <Field label="Location" error={errors.eventLocation?.message}><input {...register("eventLocation")} placeholder="Lagos, Nigeria" className={inp(!!errors.eventLocation)} /></Field>
                    <Field label="Start Time" error={errors.eventTime?.message}><input {...register("eventTime")} type="time" className={inp(!!errors.eventTime)} /></Field>
                </Row>
            </Section>

            <Section title="Tell Coffee More">
                <Field label="About your event" error={errors.aboutEvent?.message}><textarea {...register("aboutEvent")} rows={4} placeholder="What coverage do you need? What's your vision?" className={`${inp(!!errors.aboutEvent)} resize-none`} /></Field>
                <Field label="About you / your group" error={errors.aboutYou?.message}><textarea {...register("aboutYou")} rows={3} placeholder="Who's involved? Any special requirements?" className={`${inp(!!errors.aboutYou)} resize-none`} /></Field>
                <Field label="What draws you to Coffee's work?" error={errors.whyUs?.message}><textarea {...register("whyUs")} rows={3} placeholder="What do you love about the style?" className={`${inp(!!errors.whyUs)} resize-none`} /></Field>
            </Section>

            <Submit isSubmitting={isSubmitting} />
        </form>
    );
}

function StudioForm({ onSubmit, isSubmitting }: { onSubmit: (d: StudioData) => void; isSubmitting: boolean }) {
    const { register, handleSubmit, control, formState: { errors } } = useForm<StudioData>({ resolver: zodResolver(studioSchema) });
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <Section title="Personal Details">
                <Row>
                    <Field label="First Name" error={errors.firstName?.message}><input {...register("firstName")} placeholder="Amara" className={inp(!!errors.firstName)} /></Field>
                    <Field label="Last Name" error={errors.lastName?.message}><input {...register("lastName")} placeholder="Okafor" className={inp(!!errors.lastName)} /></Field>
                </Row>
                <Field label="Email" error={errors.email?.message}><input {...register("email")} type="email" placeholder="amara@example.com" className={inp(!!errors.email)} /></Field>
                <Field label="WhatsApp Number" error={errors.phone?.message}><input {...register("phone")} type="tel" placeholder="+234 800 000 0000" className={inp(!!errors.phone)} /></Field>
                <Field label="Instagram (optional)"><input {...register("instagram")} placeholder="@yourhandle" className={inp()} /></Field>
            </Section>

            <Section title="Session Details">
                <Row>
                    <Field label="Session Type" error={errors.sessionType?.message}>
                        <Controller name="sessionType" control={control} render={({ field }) => (
                            <select {...field} className={`${inp(!!errors.sessionType)} bg-black appearance-none cursor-pointer`}>
                                <option value="">Select type...</option>
                                <option value="studio-portraits">Studio Portraits</option>
                                <option value="corporate">Corporate / Headshots</option>
                                <option value="outdoor">Outdoor Session</option>
                                <option value="collaboration">Collaboration</option>
                                <option value="others">Others</option>
                            </select>
                        )} />
                    </Field>
                    <Field label="Preferred Date" error={errors.sessionDate?.message}><input {...register("sessionDate")} type="date" className={inp(!!errors.sessionDate)} /></Field>
                </Row>
                <Field label="Tell Coffee about your session" error={errors.aboutSession?.message}><textarea {...register("aboutSession")} rows={4} placeholder="What's your vision? Any specific look or mood?" className={`${inp(!!errors.aboutSession)} resize-none`} /></Field>
            </Section>

            <Submit isSubmitting={isSubmitting} />
        </form>
    );
}

// ── Shared UI ─────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-4">
            <p className="text-[10px] text-amber-400/50 uppercase tracking-[0.4em] pb-2 border-b border-white/5">
                {title}
            </p>
            {children}
        </div>
    );
}

function Row({ children }: { children: React.ReactNode }) {
    return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className={lbl}>{label}</label>
            {children}
            {error && <span className="text-[10px] text-red-400">{error}</span>}
        </div>
    );
}

function Submit({ isSubmitting }: { isSubmitting: boolean }) {
    return (
        <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors duration-300 flex items-center justify-center gap-2 mt-4"
        >
            {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
                <>Send Booking Request <ArrowUpRight size={14} /></>
            )}
        </motion.button>
    );
}