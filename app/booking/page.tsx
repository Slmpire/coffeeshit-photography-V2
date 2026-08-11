"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
    ArrowLeft,
    ArrowUpRight,
    Heart,
    Camera,
    PartyPopper,
    CheckCircle,
    MessageCircle,
} from "lucide-react";
import Link from "next/link";

// ── Schemas ──────────────────────────────────────────────
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

// ── Shared input styles ───────────────────────────────────
const input = (err?: boolean) =>
    `w-full bg-white/[0.03] border ${err ? "border-red-500/50" : "border-white/10 focus:border-amber-400/50"
    } rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none transition-colors duration-200`;

const label = "block text-[10px] text-white/40 uppercase tracking-[0.3em] mb-2";

// ── Package cards ─────────────────────────────────────────
const PACKAGES = [
    {
        type: "wedding" as BookingType,
        icon: Heart,
        title: "Wedding Photography",
        subtitle: "Full day · Ceremony + Reception",
        desc: "Capture every moment of your special day from getting ready to the last dance.",
        price: "From ₦250,000",
    },
    {
        type: "event" as BookingType,
        icon: PartyPopper,
        title: "Event Photography",
        subtitle: "Half day or Full day",
        desc: "Birthdays, proposals, burials, corporate events, and every celebration in between.",
        price: "From ₦80,000",
    },
    {
        type: "studio" as BookingType,
        icon: Camera,
        title: "Portrait / Studio Session",
        subtitle: "2–3 hours",
        desc: "Studio portraits, outdoor sessions, corporate headshots, and collaborations.",
        price: "From ₦50,000",
    },
];

// ── Main page ─────────────────────────────────────────────
export default function BookingPage() {
    const [bookingType, setBookingType] = useState<BookingType>(null);
    const [step, setStep] = useState<"select" | "form" | "success">("select");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [clientName, setClientName] = useState("");

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
            toast.error("Failed to submit. Please try again or message on WhatsApp.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="w-full bg-black text-white min-h-screen">
            {/* Hero */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-px w-10 bg-amber-400/60" />
                        <span className="text-[10px] text-amber-400 uppercase tracking-[0.5em]">
                            Book a Session
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-[0.9] tracking-tight max-w-2xl">
                        Reserve your
                        <br />
                        <span className="text-white/20">moment</span>
                        <br />
                        with Coffee.
                    </h1>
                </div>
            </section>

            {/* Content */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <AnimatePresence mode="wait">

                    {/* Step 1 — Select package */}
                    {step === "select" && (
                        <motion.div
                            key="select"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <p className="text-white/40 text-sm mb-10 max-w-md">
                                Choose the type of session you'd like to book. Coffee will confirm your booking within 24 hours.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {PACKAGES.map(({ type, icon: Icon, title, subtitle, desc, price }) => (
                                    <motion.button
                                        key={type}
                                        onClick={() => {
                                            setBookingType(type);
                                            setStep("form");
                                        }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="group text-left p-6 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-amber-400/30 rounded-2xl transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:bg-amber-500/20 transition-colors duration-300">
                                            <Icon size={18} className="text-amber-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-1">
                                            {title}
                                        </h3>
                                        <p className="text-[10px] text-amber-400/60 uppercase tracking-[0.2em] mb-3">
                                            {subtitle}
                                        </p>
                                        <p className="text-sm text-white/40 font-light leading-relaxed mb-5">
                                            {desc}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-semibold text-white">
                                                {price}
                                            </span>
                                            <ArrowUpRight
                                                size={16}
                                                className="text-white/20 group-hover:text-amber-400 transition-colors duration-300"
                                            />
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            {/* WhatsApp fallback */}
                            <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <p className="text-white/30 text-sm">
                                    Not sure which to pick?
                                </p>

                                <a href="https://wa.me/2348116273856?text=Hi%20Coffee%2C%20I%27d%20like%20to%20inquire%20about%20a%20photography%20session"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-[#25D366] hover:text-green-400 transition-colors"
                                >
                                    <MessageCircle size={16} />
                                    Chat with Coffee on WhatsApp
                                </a>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2 — Form */}
                    {step === "form" && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="max-w-3xl"
                        >
                            {/* Back button */}
                            <button
                                onClick={() => setStep("select")}
                                className="flex items-center gap-2 text-white/40 hover:text-white text-xs uppercase tracking-[0.2em] mb-10 transition-colors duration-200"
                            >
                                <ArrowLeft size={14} />
                                Change session type
                            </button>

                            {/* Selected package label */}
                            <div className="flex items-center gap-3 mb-10">
                                <div className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full">
                                    <span className="text-[10px] text-amber-400 uppercase tracking-[0.3em]">
                                        {bookingType === "wedding"
                                            ? "Wedding Photography"
                                            : bookingType === "event"
                                                ? "Event Photography"
                                                : "Portrait / Studio Session"}
                                    </span>
                                </div>
                            </div>

                            {bookingType === "wedding" && (
                                <WeddingForm
                                    onSubmit={handleSubmit}
                                    isSubmitting={isSubmitting}
                                />
                            )}
                            {bookingType === "event" && (
                                <EventForm
                                    onSubmit={handleSubmit}
                                    isSubmitting={isSubmitting}
                                />
                            )}
                            {bookingType === "studio" && (
                                <StudioForm
                                    onSubmit={handleSubmit}
                                    isSubmitting={isSubmitting}
                                />
                            )}
                        </motion.div>
                    )}

                    {/* Step 3 — Success */}
                    {step === "success" && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-lg mx-auto text-center py-20"
                        >
                            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={28} className="text-green-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-3">
                                You're all set{clientName ? `, ${clientName.split(" ")[0]}` : ""}!
                            </h2>
                            <p className="text-white/40 text-sm leading-relaxed mb-8">
                                Coffee has received your booking request and will get back to you within 24 hours to confirm the details.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

                                <a href="https://wa.me/2348116273856"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-green-500 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors duration-300"
                                >
                                    <MessageCircle size={14} />
                                    Message on WhatsApp
                                </a>
                                <Link href="/">
                                    <button
                                        className="px-6 py-3 border border-white/15 hover:border-white/40 text-white text-xs uppercase tracking-widest rounded-full transition-colors duration-300"
                                    >
                                        Back to Home
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </main>
    );
}

// ── Wedding Form ──────────────────────────────────────────
function WeddingForm({
    onSubmit,
    isSubmitting,
}: {
    onSubmit: (data: WeddingData) => void;
    isSubmitting: boolean;
}) {
    const { register, handleSubmit, formState: { errors } } =
        useForm<WeddingData>({ resolver: zodResolver(weddingSchema) });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <FormSection title="Your Details">
                <NameRow register={register} errors={errors} />
                <Field label="Email" error={errors.email?.message}>
                    <input {...register("email")} type="email" placeholder="amara@example.com" className={input(!!errors.email)} />
                </Field>
                <Field label="WhatsApp Number" error={errors.phone?.message}>
                    <input {...register("phone")} type="tel" placeholder="+234 800 000 0000" className={input(!!errors.phone)} />
                </Field>
                <Field label="Instagram Handle (optional)">
                    <input {...register("instagram")} placeholder="@yourhandle" className={input()} />
                </Field>
            </FormSection>

            <FormSection title="Wedding Details">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Wedding Date" error={errors.weddingDate?.message}>
                        <input {...register("weddingDate")} type="date" className={input(!!errors.weddingDate)} />
                    </Field>
                    <Field label="Reception Date (optional)">
                        <input {...register("receptionDate")} type="date" className={input()} />
                    </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Wedding Location" error={errors.weddingLocation?.message}>
                        <input {...register("weddingLocation")} placeholder="Lagos, Nigeria" className={input(!!errors.weddingLocation)} />
                    </Field>
                    <Field label="Reception Location (optional)">
                        <input {...register("receptionLocation")} placeholder="City, State" className={input()} />
                    </Field>
                </div>
            </FormSection>

            <FormSection title="Tell Coffee More">
                <Field label="About your wedding" error={errors.aboutWedding?.message}>
                    <textarea {...register("aboutWedding")} rows={4} placeholder="What coverage do you need? What's your vision?" className={`${input(!!errors.aboutWedding)} resize-none`} />
                </Field>
                <Field label="About you two" error={errors.aboutCouple?.message}>
                    <textarea {...register("aboutCouple")} rows={4} placeholder="Your story, favourite memories, interests..." className={`${input(!!errors.aboutCouple)} resize-none`} />
                </Field>
                <Field label="What draws you to Coffee's work?" error={errors.whyUs?.message}>
                    <textarea {...register("whyUs")} rows={3} placeholder="What do you love about the style?" className={`${input(!!errors.whyUs)} resize-none`} />
                </Field>
            </FormSection>

            <SubmitButton isSubmitting={isSubmitting} label="Send Booking Request" />
        </form>
    );
}

// ── Event Form ────────────────────────────────────────────
function EventForm({
    onSubmit,
    isSubmitting,
}: {
    onSubmit: (data: EventData) => void;
    isSubmitting: boolean;
}) {
    const { register, handleSubmit, control, formState: { errors } } =
        useForm<EventData>({ resolver: zodResolver(eventSchema) });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <FormSection title="Your Details">
                <NameRow register={register} errors={errors} />
                <Field label="Email" error={errors.email?.message}>
                    <input {...register("email")} type="email" placeholder="amara@example.com" className={input(!!errors.email)} />
                </Field>
                <Field label="WhatsApp Number" error={errors.phone?.message}>
                    <input {...register("phone")} type="tel" placeholder="+234 800 000 0000" className={input(!!errors.phone)} />
                </Field>
                <Field label="Instagram Handle (optional)">
                    <input {...register("instagram")} placeholder="@yourhandle" className={input()} />
                </Field>
            </FormSection>

            <FormSection title="Event Details">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Event Type" error={errors.eventType?.message}>
                        <Controller
                            name="eventType"
                            control={control}
                            render={({ field }) => (
                                <select {...field} className={`${input(!!errors.eventType)} bg-black appearance-none cursor-pointer`}>
                                    <option value="">Select event type...</option>
                                    <option value="burial">Burial</option>
                                    <option value="proposal">Proposal</option>
                                    <option value="birthday">Birthday Party</option>
                                    <option value="end-of-year">End of Year Party</option>
                                    <option value="corporate">Corporate Event</option>
                                    <option value="others">Others</option>
                                </select>
                            )}
                        />
                    </Field>
                    <Field label="Event Date" error={errors.eventDate?.message}>
                        <input {...register("eventDate")} type="date" className={input(!!errors.eventDate)} />
                    </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Event Location" error={errors.eventLocation?.message}>
                        <input {...register("eventLocation")} placeholder="Lagos, Nigeria" className={input(!!errors.eventLocation)} />
                    </Field>
                    <Field label="Event Time" error={errors.eventTime?.message}>
                        <input {...register("eventTime")} type="time" className={input(!!errors.eventTime)} />
                    </Field>
                </div>
            </FormSection>

            <FormSection title="Tell Coffee More">
                <Field label="About your event" error={errors.aboutEvent?.message}>
                    <textarea {...register("aboutEvent")} rows={4} placeholder="What coverage do you need? What's your vision?" className={`${input(!!errors.aboutEvent)} resize-none`} />
                </Field>
                <Field label="About you / your group" error={errors.aboutYou?.message}>
                    <textarea {...register("aboutYou")} rows={3} placeholder="Tell Coffee about who's involved..." className={`${input(!!errors.aboutYou)} resize-none`} />
                </Field>
                <Field label="What draws you to Coffee's work?" error={errors.whyUs?.message}>
                    <textarea {...register("whyUs")} rows={3} placeholder="What do you love about the style?" className={`${input(!!errors.whyUs)} resize-none`} />
                </Field>
            </FormSection>

            <SubmitButton isSubmitting={isSubmitting} label="Send Booking Request" />
        </form>
    );
}

// ── Studio Form ───────────────────────────────────────────
function StudioForm({
    onSubmit,
    isSubmitting,
}: {
    onSubmit: (data: StudioData) => void;
    isSubmitting: boolean;
}) {
    const { register, handleSubmit, control, formState: { errors } } =
        useForm<StudioData>({ resolver: zodResolver(studioSchema) });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <FormSection title="Your Details">
                <NameRow register={register} errors={errors} />
                <Field label="Email" error={errors.email?.message}>
                    <input {...register("email")} type="email" placeholder="amara@example.com" className={input(!!errors.email)} />
                </Field>
                <Field label="WhatsApp Number" error={errors.phone?.message}>
                    <input {...register("phone")} type="tel" placeholder="+234 800 000 0000" className={input(!!errors.phone)} />
                </Field>
                <Field label="Instagram Handle (optional)">
                    <input {...register("instagram")} placeholder="@yourhandle" className={input()} />
                </Field>
            </FormSection>

            <FormSection title="Session Details">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Session Type" error={errors.sessionType?.message}>
                        <Controller
                            name="sessionType"
                            control={control}
                            render={({ field }) => (
                                <select {...field} className={`${input(!!errors.sessionType)} bg-black appearance-none cursor-pointer`}>
                                    <option value="">Select session type...</option>
                                    <option value="studio-portraits">Studio Portraits</option>
                                    <option value="corporate">Corporate / Headshots</option>
                                    <option value="outdoor">Outdoor Session</option>
                                    <option value="collaboration">Collaboration</option>
                                    <option value="others">Others</option>
                                </select>
                            )}
                        />
                    </Field>
                    <Field label="Preferred Date" error={errors.sessionDate?.message}>
                        <input {...register("sessionDate")} type="date" className={input(!!errors.sessionDate)} />
                    </Field>
                </div>
                <Field label="Tell Coffee about your session" error={errors.aboutSession?.message}>
                    <textarea {...register("aboutSession")} rows={4} placeholder="What's your vision? Any specific look, mood, or outfit in mind?" className={`${input(!!errors.aboutSession)} resize-none`} />
                </Field>
            </FormSection>

            <SubmitButton isSubmitting={isSubmitting} label="Send Booking Request" />
        </form>
    );
}

// ── Shared sub-components ─────────────────────────────────
function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
            <p className="text-[10px] text-amber-400/60 uppercase tracking-[0.4em] mb-2">
                {title}
            </p>
            {children}
        </div>
    );
}

function Field({
    label: labelText,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className={label}>{labelText}</label>
            {children}
            {error && <span className="text-[10px] text-red-400">{error}</span>}
        </div>
    );
}

function NameRow({ register, errors }: { register: any; errors: any }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="First Name" error={errors.firstName?.message}>
                <input {...register("firstName")} placeholder="Amara" className={input(!!errors.firstName)} />
            </Field>
            <Field label="Last Name" error={errors.lastName?.message}>
                <input {...register("lastName")} placeholder="Okafor" className={input(!!errors.lastName)} />
            </Field>
        </div>
    );
}

function SubmitButton({ isSubmitting, label: labelText }: { isSubmitting: boolean; label: string }) {
    return (
        <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors duration-300 flex items-center justify-center gap-2"
        >
            {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
                <>
                    {labelText}
                    <ArrowUpRight size={14} />
                </>
            )}
        </motion.button>
    );
}