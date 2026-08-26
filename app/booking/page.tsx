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
    Check,
} from "lucide-react";
import DatePickerInput from "@/components/date-picker-input";

// ── Types ─────────────────────────────────────────────────
type BookingType = "wedding" | "event" | "studio" | null;

// ── Wedding packages ──────────────────────────────────────
const WEDDING_PACKAGES = [
    {
        id: "w1",
        name: "Package One",
        prices: { one: 843750, two: 1156250 },
        includes: [
            "1 Photographer",
            "200 Digital Pictures & Online Gallery",
            "Complimentary Pre-Wedding (1 Outfit, 4 Edited Pictures)",
        ],
    },
    {
        id: "w1plus",
        name: "Package One Plus",
        prices: { one: 1218750, two: 1656250 },
        includes: [
            "1 Photographer & 1 Videographer",
            "200 Digital Images & Online Gallery",
            "Cinematic Reels & Full Video on Drive",
            "Complimentary Pre-Wedding (1 Outfit, 4 Edited Pictures & 45-sec Reel)",
        ],
    },
    {
        id: "w2",
        name: "Package Two",
        prices: { one: 1031250, two: 1406250 },
        includes: [
            "1 Photographer",
            "350 Digital Pictures",
            "1 Medium Photobook (10/24 Inches)",
            "Edited Pictures on Drive/Flash Drive",
            "Complimentary Pre-Wedding (1 Outfit, 4 Pictures)",
        ],
    },
    {
        id: "w2plus",
        name: "Package Two Plus",
        prices: { one: 1343750, two: 1968750 },
        includes: [
            "1 Photographer & 1 Videographer",
            "350 Digital Pictures",
            "1 Medium Photobook (10/24 Inches)",
            "Cinematic Thriller (Reels & Full Video)",
            "Flash Drive Containing All Media",
            "Complimentary Pre-Wedding (2 Outfits, 12 Pictures)",
        ],
    },
    {
        id: "w3",
        name: "Package Three — Deluxe",
        prices: { one: 1968750, two: 2343750 },
        includes: [
            "2 Photographers & 2 Videographers",
            "500 Digital Pictures & Online Gallery",
            "Large Photobook (12/30 Inches)",
            "Large Frame (16/20 Inches)",
            "Cinematic Thriller, Reels & Full Video on Flash Drive",
            "Complimentary Pre-Wedding (3 Outfits, 15 Pictures)",
            "Complimentary Pre-Wedding Video (Q & A)",
        ],
    },
];

// ── Event packages ────────────────────────────────────────
const EVENT_PACKAGES = [
    {
        id: "cs-basic",
        name: "CoffeeShoot Basic",
        price: 356250,
        includes: [
            "1 Photographer",
            "Online Gallery",
            "Flash Drive Containing All Pictures",
        ],
    },
    {
        id: "cs-premium",
        name: "CoffeeShoot Premium",
        price: 581250,
        includes: [
            "2 Photographers",
            "Online Gallery",
            "Standard Photobook",
            "Flash Drive Containing All Pictures",
        ],
    },
    {
        id: "day-basic",
        name: "Day's Event Basic",
        price: 750000,
        includes: [
            "1 Photographer & 1 Videographer",
            "Online Gallery",
            "Flash Drive Containing Photos & Videos",
        ],
    },
    {
        id: "day-standard",
        name: "Day's Event Standard",
        price: 1000000,
        includes: [
            "1 Photographer & 1 Videographer",
            "1 Photo Frame & 1 Photo Book",
            "Flash Drive Containing Pictures & Video",
        ],
    },
    {
        id: "day-premium",
        name: "Day's Event Premium",
        price: 1037000,
        includes: [
            "2 Photographers & 2 Videographers",
            "Flash Drive Containing Pictures & Video",
        ],
    },
    {
        id: "day-luxury",
        name: "Day's Event Luxury",
        price: 1287500,
        includes: [
            "2 Photographers & 2 Videographers",
            "2 Photo Frames & 1 Photo Book",
            "Flash Drive Containing Pictures & Videos",
        ],
    },
];

// ── Studio packages ───────────────────────────────────────
const STUDIO_PACKAGES = [
    {
        id: "studio-1",
        name: "Studio Package One",
        type: "studio",
        price: 100000,
        includes: ["4 edited pictures", "1–2 outfits", "1-hour session"],
    },
    {
        id: "studio-2",
        name: "Studio Package Two",
        type: "studio",
        price: 162500,
        includes: ["7 edited pictures", "1–3 outfits", "1 hour 30 mins session"],
    },
    {
        id: "outdoor-1",
        name: "Outdoor Package One",
        type: "outdoor",
        price: 150000,
        includes: ["5 edited pictures", "1–2 outfits", "1-hour session"],
    },
    {
        id: "outdoor-2",
        name: "Outdoor Package Two",
        type: "outdoor",
        price: 237500,
        includes: ["12 edited pictures", "1–3 outfits", "2-hour session"],
    },
];

const EXTRAS = [
    { id: "extra-hour", label: "Extra Hour", price: 31250 },
    { id: "extra-outfit", label: "Extra Outfit Change", price: 43750 },
    { id: "content-creator", label: "Content Creator Add-on", price: 100000 },
];

const CONTENT_PACKAGES = [
    { id: "c1", name: "1 Reel", price: 150000, includes: ["1 Event", "1 Cinematic Reel"] },
    { id: "c2", name: "Reels Package", price: 187500, includes: ["1 Event", "Multiple Reels"] },
    { id: "c3", name: "3 Reels", price: 237500, includes: ["1 Event", "3 Cinematic Reels"] },
];

// ── Styles ────────────────────────────────────────────────
const inp = (err?: boolean) =>
    `w-full bg-white/[0.04] border ${
        err ? "border-red-500/50 focus:border-red-400/50" : "border-white/8 focus:border-amber-400/50"
    } rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none transition-colors duration-200`;

const lbl = "block text-[10px] text-white/30 uppercase tracking-[0.3em] mb-2";

// ── Main packages for step 1 ──────────────────────────────
const MAIN_PACKAGES = [
    {
        type: "wedding" as BookingType,
        icon: Heart,
        title: "Wedding Photography",
        subtitle: "From ₦843,750",
        desc: "Full wedding coverage with optional videography. Multiple packages available.",
        image: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
    },
    {
        type: "event" as BookingType,
        icon: PartyPopper,
        title: "Event Photography",
        subtitle: "From ₦356,250",
        desc: "CoffeeShoot events or full day coverage with photo & video options.",
        image: "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
    },
    {
        type: "studio" as BookingType,
        icon: Camera,
        title: "Studio & Outdoor",
        subtitle: "From ₦100,000",
        desc: "Studio portraits or outdoor sessions with content creation add-ons.",
        image: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
    },
];

// ── Deposit = 20% of package price ───────────────────────
const calcDeposit = (price: number) => Math.round(price * 0.2);

function formatNaira(amount: number) {
    return `₦${amount.toLocaleString()}`;
}

// ── Base schema ───────────────────────────────────────────
const baseSchema = z.object({
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().min(7, "Enter your WhatsApp number"),
    instagram: z.string().optional(),
    message: z.string().optional(),
});

// ── Main ──────────────────────────────────────────────────
export default function BookingPage() {
    const [bookingType, setBookingType] = useState<BookingType>(null);
    const [step, setStep] = useState<"select" | "form" | "success">("select");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [clientName, setClientName] = useState("");

    // Wedding state
    const [selectedWeddingPkg, setSelectedWeddingPkg] = useState<string | null>(null);
    const [weddingEvents, setWeddingEvents] = useState<"one" | "two">("one");
    const [weddingDate, setWeddingDate] = useState("");

    // Event state
    const [selectedEventPkg, setSelectedEventPkg] = useState<string | null>(null);
    const [eventDate, setEventDate] = useState("");

    // Studio state
    const [selectedStudioPkg, setSelectedStudioPkg] = useState<string | null>(null);
    const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
    const [sessionDate, setSessionDate] = useState("");
    const [includeContent, setIncludeContent] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(baseSchema),
    });

    // Calculate total price
    const getTotal = () => {
        if (bookingType === "wedding" && selectedWeddingPkg) {
            const pkg = WEDDING_PACKAGES.find(p => p.id === selectedWeddingPkg);
            return pkg ? pkg.prices[weddingEvents] : 0;
        }
        if (bookingType === "event" && selectedEventPkg) {
            const pkg = EVENT_PACKAGES.find(p => p.id === selectedEventPkg);
            let total = pkg?.price ?? 0;
            if (includeContent) {
                const contentPkg = CONTENT_PACKAGES.find(p => p.id === includeContent);
                total += contentPkg?.price ?? 0;
            }
            return total;
        }
        if (bookingType === "studio" && selectedStudioPkg) {
            const pkg = STUDIO_PACKAGES.find(p => p.id === selectedStudioPkg);
            let total = pkg?.price ?? 0;
            selectedExtras.forEach(extraId => {
                const extra = EXTRAS.find(e => e.id === extraId);
                total += extra?.price ?? 0;
            });
            return total;
        }
        return 0;
    };

    const total = getTotal();
    const deposit = calcDeposit(total);

    const handleSubmitForm = async (data: any) => {
        if (!selectedWeddingPkg && bookingType === "wedding") {
            toast.error("Please select a wedding package");
            return;
        }
        if (!selectedEventPkg && bookingType === "event") {
            toast.error("Please select an event package");
            return;
        }
        if (!selectedStudioPkg && bookingType === "studio") {
            toast.error("Please select a session package");
            return;
        }

        setIsSubmitting(true);
        try {
            const bookingDetails = {
                ...data,
                bookingType,
                weddingPackage: selectedWeddingPkg,
                weddingEvents: weddingEvents,
                weddingDate,
                eventPackage: selectedEventPkg,
                eventDate,
                studioPackage: selectedStudioPkg,
                sessionDate,
                extras: selectedExtras,
                contentPackage: includeContent,
                totalPrice: total,
                depositAmount: deposit,
            };

            const res = await fetch("/api/booking/initiate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingDetails),
            });
            if (!res.ok) throw new Error();
            const { authorization_url } = await res.json();
            window.location.href = authorization_url;
        } catch {
            toast.error("Failed to initiate payment. Please message Coffee on WhatsApp.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedPkg = bookingType === "wedding"
        ? WEDDING_PACKAGES.find(p => p.id === selectedWeddingPkg)
        : bookingType === "event"
        ? EVENT_PACKAGES.find(p => p.id === selectedEventPkg)
        : STUDIO_PACKAGES.find(p => p.id === selectedStudioPkg);

    const mainPkg = MAIN_PACKAGES.find(p => p.type === bookingType);

    return (
        <main className="w-full bg-black text-white min-h-screen">
            <AnimatePresence mode="wait">

                {/* ── Step 1: Select category ── */}
                {step === "select" && (
                    <motion.div
                        key="select"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="min-h-screen"
                    >
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
                                <p className="text-white/30 text-sm max-w-md leading-relaxed mb-12">
                                    Choose your session type. You'll select the exact package and add-ons on the next step.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                                    {MAIN_PACKAGES.map(({ type, icon: Icon, title, subtitle, desc, image }) => (
                                        <motion.button
                                            key={type}
                                            onClick={() => { setBookingType(type); setStep("form"); }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="group relative text-left overflow-hidden rounded-2xl h-[480px]"
                                        >
                                            <Image src={image} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-500" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                                            <div className="absolute top-5 left-5">
                                                <div className="w-9 h-9 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                                                    <Icon size={16} className="text-amber-400" />
                                                </div>
                                            </div>
                                            <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                <ArrowUpRight size={14} className="text-black" />
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <p className="text-[9px] text-amber-400/70 uppercase tracking-[0.3em] mb-1">{subtitle}</p>
                                                <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                                                <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4">
                                    <p className="text-white/20 text-sm">Not sure which to pick?</p>
                                    <a href="https://wa.me/2348116273856?text=Hi%20Coffee%2C%20I%27d%20like%20to%20inquire%20about%20a%20photography%20session" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#25D366] hover:text-green-400 transition-colors">
                                        <MessageCircle size={16} />
                                        Chat with Coffee on WhatsApp
                                    </a>
                                </div>
                            </div>
                        </section>
                    </motion.div>
                )}

                {/* ── Step 2: Form ── */}
                {step === "form" && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="min-h-screen lg:grid lg:grid-cols-[1fr_1.3fr]"
                    >
                        {/* Left panel */}
                        <div className="relative hidden lg:block">
                            <div className="sticky top-0 h-screen overflow-hidden">
                                <Image src={mainPkg?.image ?? ""} alt={mainPkg?.title ?? ""} fill className="object-cover" sizes="40vw" />
                                <div className="absolute inset-0 bg-black/60" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                <div className="absolute inset-0 flex flex-col justify-between p-10">
                                    <button onClick={() => setStep("select")} className="flex items-center gap-2 text-white/40 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors w-fit">
                                        <ArrowLeft size={14} />Back
                                    </button>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-2">{mainPkg?.title}</h2>
                                        <p className="text-white/40 text-sm mb-6">{mainPkg?.desc}</p>

                                        {/* Price summary */}
                                        {total > 0 && (
                                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
                                                <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] mb-3">Price Summary</p>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-xs text-white/50">Package Total</span>
                                                    <span className="text-xs text-white font-semibold">{formatNaira(total)}</span>
                                                </div>
                                                <div className="flex justify-between pt-2 border-t border-white/10">
                                                    <span className="text-xs text-amber-400">Deposit (20%)</span>
                                                    <span className="text-xs text-amber-400 font-bold">{formatNaira(deposit)}</span>
                                                </div>
                                                <p className="text-[9px] text-white/20 mt-2">Balance due 7 days before session</p>
                                            </div>
                                        )}

                                        {/* WhatsApp fallback */}
                                        <a href="https://wa.me/2348116273856?text=Hi%20Coffee%2C%20I%27d%20like%20to%20book%20a%20session" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-[#25D366] hover:text-green-400 transition-colors">
                                            <MessageCircle size={12} />
                                            Prefer to book via WhatsApp?
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right — form */}
                        <div className="px-4 sm:px-8 lg:px-12 pt-28 lg:pt-16 pb-24">
                            <button onClick={() => setStep("select")} className="flex lg:hidden items-center gap-2 text-white/40 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors mb-8">
                                <ArrowLeft size={14} />Back
                            </button>

                            <div className="max-w-xl">
                                <h2 className="text-2xl font-bold text-white mb-1">Fill in your details</h2>
                                <p className="text-white/30 text-sm mb-10">Select your package then complete the form. 20% deposit required to confirm.</p>

                                <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-8">

                                    {/* ── Wedding packages ── */}
                                    {bookingType === "wedding" && (
                                        <div className="flex flex-col gap-4">
                                            <p className="text-[10px] text-amber-400/60 uppercase tracking-[0.4em] pb-2 border-b border-white/5">
                                                Select Wedding Package
                                            </p>

                                            {/* Events selector */}
                                            <div className="flex gap-2 mb-2">
                                                {(["one", "two"] as const).map((e) => (
                                                    <button
                                                        key={e}
                                                        type="button"
                                                        onClick={() => setWeddingEvents(e)}
                                                        className={`px-4 py-2 text-xs rounded-full border transition-all duration-200 ${
                                                            weddingEvents === e
                                                                ? "bg-amber-500 border-amber-500 text-black font-bold"
                                                                : "border-white/15 text-white/40 hover:border-white/40"
                                                        }`}
                                                    >
                                                        {e === "one" ? "1 Event" : "2 Events"}
                                                    </button>
                                                ))}
                                            </div>

                                            {WEDDING_PACKAGES.map((pkg) => (
                                                <button
                                                    key={pkg.id}
                                                    type="button"
                                                    onClick={() => setSelectedWeddingPkg(pkg.id)}
                                                    className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                                                        selectedWeddingPkg === pkg.id
                                                            ? "bg-amber-500/10 border-amber-500/40"
                                                            : "bg-white/[0.02] border-white/8 hover:bg-white/[0.04]"
                                                    }`}
                                                >
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <p className="text-sm font-semibold text-white">{pkg.name}</p>
                                                            <p className="text-xs text-amber-400 font-bold mt-0.5">
                                                                {formatNaira(pkg.prices[weddingEvents])}
                                                            </p>
                                                        </div>
                                                        {selectedWeddingPkg === pkg.id && (
                                                            <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                                                                <Check size={10} className="text-black" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        {pkg.includes.map((item) => (
                                                            <div key={item} className="flex items-start gap-1.5">
                                                                <div className="w-1 h-1 rounded-full bg-amber-400/40 flex-shrink-0 mt-1.5" />
                                                                <span className="text-[10px] text-white/30 leading-relaxed">{item}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </button>
                                            ))}

                                            {/* Wedding date */}
                                            <div className="flex flex-col gap-1.5 mt-2">
                                                <label className={lbl}>Wedding Date</label>
                                                <DatePickerInput
                                                    value={weddingDate}
                                                    onChange={setWeddingDate}
                                                    placeholder="Select wedding date"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* ── Event packages ── */}
                                    {bookingType === "event" && (
                                        <div className="flex flex-col gap-4">
                                            <p className="text-[10px] text-amber-400/60 uppercase tracking-[0.4em] pb-2 border-b border-white/5">
                                                Select Event Package
                                            </p>

                                            {EVENT_PACKAGES.map((pkg) => (
                                                <button
                                                    key={pkg.id}
                                                    type="button"
                                                    onClick={() => setSelectedEventPkg(pkg.id)}
                                                    className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                                                        selectedEventPkg === pkg.id
                                                            ? "bg-amber-500/10 border-amber-500/40"
                                                            : "bg-white/[0.02] border-white/8 hover:bg-white/[0.04]"
                                                    }`}
                                                >
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <p className="text-sm font-semibold text-white">{pkg.name}</p>
                                                            <p className="text-xs text-amber-400 font-bold mt-0.5">{formatNaira(pkg.price)}</p>
                                                        </div>
                                                        {selectedEventPkg === pkg.id && (
                                                            <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                                                                <Check size={10} className="text-black" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        {pkg.includes.map((item) => (
                                                            <div key={item} className="flex items-start gap-1.5">
                                                                <div className="w-1 h-1 rounded-full bg-amber-400/40 flex-shrink-0 mt-1.5" />
                                                                <span className="text-[10px] text-white/30">{item}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </button>
                                            ))}

                                            {/* Content creation add-on */}
                                            <div className="flex flex-col gap-3 mt-2">
                                                <p className="text-[10px] text-white/30 uppercase tracking-[0.3em]">
                                                    Add Content Creation (Optional)
                                                </p>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {CONTENT_PACKAGES.map((pkg) => (
                                                        <button
                                                            key={pkg.id}
                                                            type="button"
                                                            onClick={() => setIncludeContent(includeContent === pkg.id ? null : pkg.id)}
                                                            className={`text-left p-3 rounded-xl border transition-all duration-200 ${
                                                                includeContent === pkg.id
                                                                    ? "bg-amber-500/10 border-amber-500/40"
                                                                    : "bg-white/[0.02] border-white/8 hover:bg-white/[0.04]"
                                                            }`}
                                                        >
                                                            <p className="text-[10px] font-semibold text-white mb-1">{pkg.name}</p>
                                                            <p className="text-[10px] text-amber-400 font-bold">{formatNaira(pkg.price)}</p>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Event date */}
                                            <div className="flex flex-col gap-1.5">
                                                <label className={lbl}>Event Date</label>
                                                <DatePickerInput
                                                    value={eventDate}
                                                    onChange={setEventDate}
                                                    placeholder="Select event date"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* ── Studio packages ── */}
                                    {bookingType === "studio" && (
                                        <div className="flex flex-col gap-4">
                                            <p className="text-[10px] text-amber-400/60 uppercase tracking-[0.4em] pb-2 border-b border-white/5">
                                                Select Session Package
                                            </p>

                                            {/* Studio */}
                                            <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">Studio Sessions</p>
                                            {STUDIO_PACKAGES.filter(p => p.type === "studio").map((pkg) => (
                                                <button
                                                    key={pkg.id}
                                                    type="button"
                                                    onClick={() => setSelectedStudioPkg(pkg.id)}
                                                    className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                                                        selectedStudioPkg === pkg.id
                                                            ? "bg-amber-500/10 border-amber-500/40"
                                                            : "bg-white/[0.02] border-white/8 hover:bg-white/[0.04]"
                                                    }`}
                                                >
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <p className="text-sm font-semibold text-white">{pkg.name}</p>
                                                            <p className="text-xs text-amber-400 font-bold mt-0.5">{formatNaira(pkg.price)}</p>
                                                        </div>
                                                        {selectedStudioPkg === pkg.id && (
                                                            <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                                                                <Check size={10} className="text-black" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        {pkg.includes.map((item) => (
                                                            <div key={item} className="flex items-start gap-1.5">
                                                                <div className="w-1 h-1 rounded-full bg-amber-400/40 flex-shrink-0 mt-1.5" />
                                                                <span className="text-[10px] text-white/30">{item}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </button>
                                            ))}

                                            {/* Outdoor */}
                                            <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] mt-2">Outdoor Sessions</p>
                                            {STUDIO_PACKAGES.filter(p => p.type === "outdoor").map((pkg) => (
                                                <button
                                                    key={pkg.id}
                                                    type="button"
                                                    onClick={() => setSelectedStudioPkg(pkg.id)}
                                                    className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                                                        selectedStudioPkg === pkg.id
                                                            ? "bg-amber-500/10 border-amber-500/40"
                                                            : "bg-white/[0.02] border-white/8 hover:bg-white/[0.04]"
                                                    }`}
                                                >
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <p className="text-sm font-semibold text-white">{pkg.name}</p>
                                                            <p className="text-xs text-amber-400 font-bold mt-0.5">{formatNaira(pkg.price)}</p>
                                                        </div>
                                                        {selectedStudioPkg === pkg.id && (
                                                            <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                                                                <Check size={10} className="text-black" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        {pkg.includes.map((item) => (
                                                            <div key={item} className="flex items-start gap-1.5">
                                                                <div className="w-1 h-1 rounded-full bg-amber-400/40 flex-shrink-0 mt-1.5" />
                                                                <span className="text-[10px] text-white/30">{item}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </button>
                                            ))}

                                            {/* Extras */}
                                            <div className="flex flex-col gap-3 mt-2">
                                                <p className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Add Extras (Optional)</p>
                                                <div className="flex flex-col gap-2">
                                                    {EXTRAS.map((extra) => (
                                                        <button
                                                            key={extra.id}
                                                            type="button"
                                                            onClick={() => setSelectedExtras(prev =>
                                                                prev.includes(extra.id)
                                                                    ? prev.filter(e => e !== extra.id)
                                                                    : [...prev, extra.id]
                                                            )}
                                                            className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                                                                selectedExtras.includes(extra.id)
                                                                    ? "bg-amber-500/10 border-amber-500/40"
                                                                    : "bg-white/[0.02] border-white/8 hover:bg-white/[0.04]"
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                {selectedExtras.includes(extra.id) && (
                                                                    <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                                                                        <Check size={8} className="text-black" />
                                                                    </div>
                                                                )}
                                                                <span className="text-xs text-white/60">{extra.label}</span>
                                                            </div>
                                                            <span className="text-xs text-amber-400 font-bold">{formatNaira(extra.price)}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Session date */}
                                            <div className="flex flex-col gap-1.5">
                                                <label className={lbl}>Preferred Date</label>
                                                <DatePickerInput
                                                    value={sessionDate}
                                                    onChange={setSessionDate}
                                                    placeholder="Select preferred date"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* ── Personal details ── */}
                                    <div className="flex flex-col gap-4">
                                        <p className="text-[10px] text-amber-400/60 uppercase tracking-[0.4em] pb-2 border-b border-white/5">
                                            Your Details
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-1.5">
                                                <label className={lbl}>First Name</label>
                                                <input {...register("firstName")} placeholder="Amara" className={inp(!!errors.firstName)} />
                                                {errors.firstName && <span className="text-[10px] text-red-400">{errors.firstName.message as string}</span>}
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className={lbl}>Last Name</label>
                                                <input {...register("lastName")} placeholder="Okafor" className={inp(!!errors.lastName)} />
                                                {errors.lastName && <span className="text-[10px] text-red-400">{errors.lastName.message as string}</span>}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className={lbl}>Email Address</label>
                                            <input {...register("email")} type="email" placeholder="amara@example.com" className={inp(!!errors.email)} />
                                            {errors.email && <span className="text-[10px] text-red-400">{errors.email.message as string}</span>}
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className={lbl}>WhatsApp Number</label>
                                            <input {...register("phone")} type="tel" placeholder="+234 800 000 0000" className={inp(!!errors.phone)} />
                                            {errors.phone && <span className="text-[10px] text-red-400">{errors.phone.message as string}</span>}
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className={lbl}>Instagram (optional)</label>
                                            <input {...register("instagram")} placeholder="@yourhandle" className={inp()} />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className={lbl}>Additional Notes (optional)</label>
                                            <textarea {...register("message")} rows={3} placeholder="Any specific requests, questions, or details Coffee should know..." className={`${inp()} resize-none`} />
                                        </div>
                                    </div>

                                    {/* ── Price summary (mobile) ── */}
                                    {total > 0 && (
                                        <div className="lg:hidden bg-white/[0.03] border border-white/8 rounded-xl p-4">
                                            <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] mb-3">Price Summary</p>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-xs text-white/50">Package Total</span>
                                                <span className="text-xs text-white font-semibold">{formatNaira(total)}</span>
                                            </div>
                                            <div className="flex justify-between pt-2 border-t border-white/10">
                                                <span className="text-xs text-amber-400">Deposit Due Now (20%)</span>
                                                <span className="text-xs text-amber-400 font-bold">{formatNaira(deposit)}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* ── Submit ── */}
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting || total === 0}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors duration-300 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                {total > 0
                                                    ? `Pay Deposit — ${formatNaira(deposit)}`
                                                    : "Select a Package to Continue"}
                                                {total > 0 && <ArrowUpRight size={14} />}
                                            </>
                                        )}
                                    </motion.button>

                                    <p className="text-[10px] text-white/20 text-center">
                                        Secure payment via Paystack. Balance of {total > 0 ? formatNaira(total - deposit) : "—"} due 7 days before session.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}