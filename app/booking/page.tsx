"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Heart,
    Camera,
    Calendar,
    MapPin,
    Users,
    Sparkles,
    Mail,
    Home,
    PartyPopper,
} from "lucide-react";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Image from "next/image";

type BookingType = "wedding" | "event" | "studio" | null;
type BookingState = "selection" | "form" | "success";

// Zod schemas for different booking types
const baseBookingSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(1, "Phone number is required"),
    instagram: z.string().optional(),
});

const weddingBookingSchema = baseBookingSchema.extend({
    weddingDate: z.string().min(1, "Wedding date is required"),
    receptionDate: z.string().optional(),
    weddingLocation: z.string().min(1, "Wedding location is required"),
    receptionLocation: z.string().optional(),
    aboutWedding: z
        .string()
        .min(10, "Please provide more details about your wedding"),
    aboutCouple: z.string().min(10, "Please tell us more about you two"),
    whyUs: z.string().min(10, "Please tell us what draws you to our work"),
});

const eventBookingSchema = baseBookingSchema.extend({
    eventType: z.string().min(1, "Event type is required"),
    eventDate: z.string().min(1, "Event date is required"),
    eventTime: z.string().min(1, "Event time is required"),
    eventLocation: z.string().min(1, "Event location is required"),
    aboutEvent: z
        .string()
        .min(10, "Please provide more details about your event"),
    aboutYou: z
        .string()
        .min(10, "Please tell us more about yourself/your group"),
    whyUs: z.string().min(10, "Please tell us what draws you to our work"),
});

const studioBookingSchema = baseBookingSchema.extend({
    sessionType: z.string().min(1, "Session type is required"),
    sessionDate: z.string().min(1, "Session date is required"),
});

type WeddingBookingData = z.infer<typeof weddingBookingSchema>;
type EventBookingData = z.infer<typeof eventBookingSchema>;
type StudioBookingData = z.infer<typeof studioBookingSchema>;

export default function BookingPage() {
    const [bookingType, setBookingType] = useState<BookingType>(null);
    const [bookingState, setBookingState] = useState<BookingState>("selection");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [clientName, setClientName] = useState("");

    const handleSubmit = async (data: any) => {
        setIsSubmitting(true);

        try {
            // Add booking type to data
            const formData = {
                ...data,
                bookingType,
            };

            // Extract name for display
            const firstName = data.firstName || "";
            const lastName = data.lastName || "";
            setClientName(`${firstName} ${lastName}`.trim());

            // Submit to API
            const response = await fetch("/api/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit booking");
            }

            setIsSubmitting(false);
            setBookingState("success");
        } catch (error) {
            console.error("Error submitting booking:", error);
            setIsSubmitting(false);
            toast.error("Failed to submit booking. Please try again.");
        }
    };

    const resetBooking = () => {
        setBookingType(null);
        setBookingState("selection");
        setClientName("");
    };

    const goHome = () => {
        window.location.href = "/";
    };

    return (
        <div className=''>
            <div className='container mx-auto px-4 md:px-12 py-12 md:py-20'>
                <AnimatePresence mode='wait'>
                    {bookingState === "selection" ? (
                        <BookingTypeSelector
                            key='selector'
                            onSelect={(type) => {
                                setBookingType(type);
                                setBookingState("form");
                            }}
                        />
                    ) : bookingState === "form" ? (
                        bookingType === "wedding" ? (
                            <WeddingBookingForm
                                key='wedding'
                                onBack={() => setBookingState("selection")}
                                onSubmit={handleSubmit}
                                isSubmitting={isSubmitting}
                            />
                        ) : bookingType === "event" ? (
                            <EventBookingForm
                                key='event'
                                onBack={() => setBookingState("selection")}
                                onSubmit={handleSubmit}
                                isSubmitting={isSubmitting}
                            />
                        ) : (
                            <StudioBookingForm
                                key='studio'
                                onBack={() => setBookingState("selection")}
                                onSubmit={handleSubmit}
                                isSubmitting={isSubmitting}
                            />
                        )
                    ) : (
                        <BookingSuccess
                            key='success'
                            clientName={clientName}
                            bookingType={bookingType}
                            onGoHome={goHome}
                            onBookAnother={resetBooking}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// Success Page Component
function BookingSuccess({
    clientName,
    bookingType,
    onGoHome,
    onBookAnother,
}: {
    clientName: string;
    bookingType: BookingType;
    onGoHome: () => void;
    onBookAnother: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className='max-w-2xl mx-auto text-center'
        >
            {/* Success Message */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='mb-8'
            >
                <div className='flex items-center justify-center gap-3 mb-4'>
                    <Mail size={32} className='text-white' />
                </div>
                <h1 className='text-3xl lg:text-4xl font-bold text-white mb-2'>
                    Your Message Has Been Sent!
                </h1>
            </motion.div>

            {/* Success Image */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className='mb-8'
            >
                <div className='relative h-[420px] mx-auto rounded-2xl overflow-hidden'>
                    <Image
                        width={420}
                        height={420}
                        src='https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress'
                        alt='Celebration moment'
                        className='w-full h-full object-cover grayscale'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                </div>
            </motion.div>

            {/* Thank You Message */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className='mb-8'
            >
                <p className='text-xl  mb-2'>
                    Thank you for reaching out to us,
                </p>
                <p className='text-2xl font-bold text-white mb-6'>
                    {clientName || "Friend"}!
                </p>

                <div className='bg-black/40 backdrop-blur-sm border border-amber-800/50 rounded-xl p-6 mb-6'>
                    <p className='   leading-relaxed'>
                        We've received your{" "}
                        {bookingType === "wedding"
                            ? "wedding photography"
                            : bookingType === "event"
                              ? "event photography"
                              : "studio session"}{" "}
                        inquiry and we're excited to potentially work with you!
                        We'll review your details and get back to you within
                        24-48 hours.
                    </p>
                    <p className=' leading-relaxed mt-4'>
                        If you don't receive a response within 48 hours, please
                        check your spam folder. In some cases, our reply has
                        ended up there.
                    </p>
                </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className='flex flex-col sm:flex-row gap-4 justify-center'
            >
                <Button
                    onClick={onGoHome}
                    className='bg-white text-black hover:bg-amber-50 font-semibold px-8 py-3 rounded-xl flex items-center gap-2'
                >
                    <Home size={18} />
                    Go Home
                </Button>

                <Button
                    onClick={onBookAnother}
                    variant='outline'
                    className='border-amber-600 text-amber-300 hover:bg-amber-800 hover:text-white font-semibold px-8 py-3 rounded-xl'
                >
                    Book Another Session
                </Button>
            </motion.div>

            {/* Additional Info */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className='mt-12 text-center'
            >
                <p className='text-sm text-amber-500'>
                    Follow us on social media for the latest updates and
                    behind-the-scenes content
                </p>
            </motion.div>
        </motion.div>
    );
}

// Booking Type Selector Component (unchanged)
function BookingTypeSelector({
    onSelect,
}: {
    onSelect: (type: BookingType) => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='max-w-6xl mx-auto text-center'
        >
            <motion.h1
                className='text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                Book Your Session
            </motion.h1>

            <motion.p
                className='text-xl  mb-12'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                Choose the type of photography session you'd like to book
            </motion.p>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
                {/* Wedding Photography Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    onClick={() => onSelect("wedding")}
                    className='group cursor-pointer'
                >
                    <div className='bg-black/40 backdrop-blur-sm border border-amber-800/50 rounded-2xl p-8 h-full hover:border-amber-800/30 transition-all duration-300'>
                        <div className='w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform'>
                            <Heart size={32} className='text-white' />
                        </div>

                        <h3 className='text-2xl font-bold text-white mb-4'>
                            Wedding
                        </h3>
                        <p className=' mb-6 leading-relaxed'>
                            Capture your special day with comprehensive wedding
                            photography coverage including ceremony, reception,
                            and all the precious moments in between.
                        </p>

                        <div className='space-y-2 text-sm '>
                            <div className='flex items-center gap-2'>
                                <Calendar size={16} />
                                <span>Full day coverage</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <MapPin size={16} />
                                <span>Multiple locations</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Users size={16} />
                                <span>Couple & family portraits</span>
                            </div>
                        </div>

                        <Button className='w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0'>
                            Book Wedding
                        </Button>
                    </div>
                </motion.div>

                {/* Event Photography Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    onClick={() => onSelect("event")}
                    className='group cursor-pointer'
                >
                    <div className='bg-black/40 backdrop-blur-sm border border-amber-800/50 rounded-2xl p-8 h-full hover:border-amber-800/30 transition-all duration-300'>
                        <div className='w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform'>
                            <PartyPopper size={32} className='text-white' />
                        </div>

                        <h3 className='text-2xl font-bold text-white mb-4'>
                            Event
                        </h3>
                        <p className=' mb-6 leading-relaxed'>
                            Professional photography for all your special events
                            including birthdays, proposals, corporate events,
                            and celebrations. Let us capture your memorable
                            moments.
                        </p>

                        <div className='space-y-2 text-sm '>
                            <div className='flex items-center gap-2'>
                                <Calendar size={16} />
                                <span>Flexible scheduling</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <MapPin size={16} />
                                <span>Your preferred location</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Users size={16} />
                                <span>Group & individual shots</span>
                            </div>
                        </div>

                        <Button className='w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0'>
                            Book Event
                        </Button>
                    </div>
                </motion.div>

                {/* Studio/Outdoor Photography Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    onClick={() => onSelect("studio")}
                    className='group cursor-pointer'
                >
                    <div className='bg-black/40 backdrop-blur-sm border border-amber-800/50 rounded-2xl p-8 h-full hover:border-amber-800/30 transition-all duration-300'>
                        <div className='w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform'>
                            <Camera size={32} className='text-white' />
                        </div>

                        <h3 className='text-2xl font-bold text-white mb-4'>
                            Studio/Outdoor Session
                        </h3>
                        <p className=' mb-6 leading-relaxed'>
                            Professional portrait sessions in our studio or
                            beautiful outdoor locations. Perfect for
                            individuals, couples, families, or professional
                            headshots.
                        </p>

                        <div className='space-y-2 text-sm '>
                            <div className='flex items-center gap-2'>
                                <Sparkles size={16} />
                                <span>Professional lighting</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <MapPin size={16} />
                                <span>Studio or outdoor</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Users size={16} />
                                <span>Individual or group</span>
                            </div>
                        </div>

                        <Button className='w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0'>
                            Book Session
                        </Button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

// Wedding Booking Form Component
function WeddingBookingForm({
    onBack,
    onSubmit,
    isSubmitting,
}: {
    onBack: () => void;
    onSubmit: (data: WeddingBookingData) => void;
    isSubmitting: boolean;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<WeddingBookingData>({
        resolver: zodResolver(weddingBookingSchema),
    });

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className='max-w-4xl mx-auto'
        >
            <div className='flex items-center gap-4 mb-8'>
                <Button
                    onClick={onBack}
                    variant='ghost'
                    className='text-amber-400 hover:text-white p-2'
                >
                    <ArrowLeft size={20} />
                </Button>
                <div>
                    <h1 className='text-3xl lg:text-4xl font-bold text-white'>
                        Wedding Booking
                    </h1>
                    <p className=''>Tell us about your special day</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
                <div className='bg-black/40 backdrop-blur-sm border border-amber-800/50 rounded-2xl p-8'>
                    <h3 className='text-xl font-semibold text-white mb-6'>
                        Personal Information
                    </h3>

                    <div className='grid md:grid-cols-2 gap-6 mb-6'>
                        <div>
                            <Label
                                htmlFor='firstName'
                                className='text-white mb-2 block'
                            >
                                First Name
                            </Label>
                            <Input
                                id='firstName'
                                {...register("firstName")}
                                placeholder='John'
                                className={`bg-amber-800/50 border text-white placeholder:text-amber-500 ${
                                    errors.firstName
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.firstName && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label
                                htmlFor='lastName'
                                className='text-white mb-2 block'
                            >
                                Last Name
                            </Label>
                            <Input
                                id='lastName'
                                {...register("lastName")}
                                placeholder='Doe'
                                className={`bg-amber-800/50 border text-white placeholder:text-amber-500 ${
                                    errors.lastName
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.lastName && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className='space-y-6'>
                        <div>
                            <Label
                                htmlFor='email'
                                className='text-white mb-2 block'
                            >
                                Email
                            </Label>
                            <Input
                                id='email'
                                type='email'
                                {...register("email")}
                                placeholder='coffeeshotit@gmail.com'
                                className={`bg-amber-800/50 border text-white placeholder:text-amber-500 ${
                                    errors.email
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.email && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label
                                htmlFor='instagram'
                                className='text-white mb-2 block'
                            >
                                Instagram Handle
                            </Label>
                            <Input
                                id='instagram'
                                {...register("instagram")}
                                placeholder='@yourhandle'
                                className='bg-amber-800/50 border border-amber-700 text-white placeholder:text-amber-500 focus:border-amber-400'
                            />
                        </div>

                        <div>
                            <Label
                                htmlFor='phone'
                                className='text-white mb-2 block'
                            >
                                Phone Number
                            </Label>
                            <Input
                                id='phone'
                                type='tel'
                                {...register("phone")}
                                placeholder='+234 811 627 3856'
                                className={`bg-amber-800/50 border text-white placeholder:text-amber-500 ${
                                    errors.phone
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.phone && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className='bg-black/40 backdrop-blur-sm border border-amber-800/50 rounded-2xl p-8'>
                    <h3 className='text-xl font-semibold text-white mb-6'>
                        Wedding Details
                    </h3>

                    <div className='grid md:grid-cols-2 gap-6 mb-6'>
                        <div>
                            <Label
                                htmlFor='weddingDate'
                                className='text-white mb-2 block'
                            >
                                Wedding Date
                            </Label>
                            <Input
                                id='weddingDate'
                                type='date'
                                {...register("weddingDate")}
                                className={`bg-amber-800/50 border text-white ${
                                    errors.weddingDate
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.weddingDate && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.weddingDate.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label
                                htmlFor='receptionDate'
                                className='text-white mb-2 block'
                            >
                                Reception Date
                            </Label>
                            <Input
                                id='receptionDate'
                                type='date'
                                {...register("receptionDate")}
                                className='bg-amber-800/50 border border-amber-700 text-white focus:border-amber-400'
                            />
                        </div>
                    </div>

                    <div className='grid md:grid-cols-2 gap-6 mb-6'>
                        <div>
                            <Label
                                htmlFor='weddingLocation'
                                className='text-white mb-2 block'
                            >
                                Wedding Location
                            </Label>
                            <Input
                                id='weddingLocation'
                                {...register("weddingLocation")}
                                placeholder='City, State'
                                className={`bg-amber-800/50 border text-white placeholder:text-amber-500 ${
                                    errors.weddingLocation
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.weddingLocation && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.weddingLocation.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label
                                htmlFor='receptionLocation'
                                className='text-white mb-2 block'
                            >
                                Reception Location
                            </Label>
                            <Input
                                id='receptionLocation'
                                {...register("receptionLocation")}
                                placeholder='City, State'
                                className='bg-amber-800/50 border border-amber-700 text-white placeholder:text-amber-500 focus:border-amber-400'
                            />
                        </div>
                    </div>
                </div>

                <div className='bg-black/40 backdrop-blur-sm border border-amber-800/50 rounded-2xl p-8'>
                    <h3 className='text-xl font-semibold text-white mb-6'>
                        Tell Us More
                    </h3>

                    <div className='space-y-6'>
                        <div>
                            <Label
                                htmlFor='aboutWedding'
                                className='text-white mb-2 block'
                            >
                                Tell us about your wedding
                            </Label>
                            <Textarea
                                id='aboutWedding'
                                {...register("aboutWedding")}
                                placeholder="What coverage do you require? What's your vision? What does it look like?"
                                className={`bg-amber-800/50 border text-white placeholder:text-amber-500 min-h-[120px] ${
                                    errors.aboutWedding
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.aboutWedding && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.aboutWedding.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label
                                htmlFor='aboutCouple'
                                className='text-white mb-2 block'
                            >
                                Tell us all about you two!
                            </Label>
                            <Textarea
                                id='aboutCouple'
                                {...register("aboutCouple")}
                                placeholder='Your proposal, best dates, favourite memory, interest/hobbies, etc.'
                                className={`bg-amber-800/50 border text-white placeholder:text-amber-500 min-h-[120px] ${
                                    errors.aboutCouple
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.aboutCouple && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.aboutCouple.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label
                                htmlFor='whyUs'
                                className='text-white mb-2 block'
                            >
                                What draws you to our work?
                            </Label>
                            <Textarea
                                id='whyUs'
                                {...register("whyUs")}
                                placeholder='Tell us what you love about our photography style...'
                                className={`bg-amber-800/50 border text-white placeholder:text-amber-500 min-h-[120px] ${
                                    errors.whyUs
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.whyUs && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.whyUs.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <Button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white py-4 text-lg font-semibold'
                >
                    {isSubmitting ? "Sending Message..." : "Send Message →"}
                </Button>
            </form>
        </motion.div>
    );
}

// Event Booking Form Component
function EventBookingForm({
    onBack,
    onSubmit,
    isSubmitting,
}: {
    onBack: () => void;
    onSubmit: (data: EventBookingData) => void;
    isSubmitting: boolean;
}) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<EventBookingData>({
        resolver: zodResolver(eventBookingSchema),
    });

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className='max-w-4xl mx-auto'
        >
            <div className='flex items-center gap-4 mb-8'>
                <Button
                    onClick={onBack}
                    variant='ghost'
                    className='text-amber-400 hover:text-white p-2'
                >
                    <ArrowLeft size={20} />
                </Button>
                <div>
                    <h1 className='text-3xl lg:text-4xl font-bold text-white'>
                        Event Booking
                    </h1>
                    <p className=''>Tell us about your event</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
                <div className='bg-black/40 backdrop-blur-sm border border-amber-800/50 rounded-2xl p-8'>
                    <h3 className='text-xl font-semibold text-white mb-6'>
                        Personal Information
                    </h3>

                    <div className='grid md:grid-cols-2 gap-6 mb-6'>
                        <div>
                            <Label
                                htmlFor='firstName'
                                className='text-white mb-2 block'
                            >
                                First Name
                            </Label>
                            <Input
                                id='firstName'
                                {...register("firstName")}
                                placeholder='John'
                                className={`bg-amber-800/50 border text-white placeholder:text-amber-500 ${
                                    errors.firstName
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.firstName && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label
                                htmlFor='lastName'
                                className='text-white mb-2 block'
                            >
                                Last Name
                            </Label>
                            <Input
                                id='lastName'
                                {...register("lastName")}
                                placeholder='Doe'
                                className={`bg-amber-800/50 border text-white placeholder:text-amber-500 ${
                                    errors.lastName
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.lastName && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className='space-y-6'>
                        <div>
                            <Label
                                htmlFor='email'
                                className='text-white mb-2 block'
                            >
                                Email
                            </Label>
                            <Input
                                id='email'
                                type='email'
                                {...register("email")}
                                placeholder='coffeeshotit@gmail.com'
                                className={`bg-amber-800/50 border text-white placeholder:text-amber-500 ${
                                    errors.email
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.email && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label
                                htmlFor='instagram'
                                className='text-white mb-2 block'
                            >
                                Instagram Handle
                            </Label>
                            <Input
                                id='instagram'
                                {...register("instagram")}
                                placeholder='@yourhandle'
                                className='bg-amber-800/50 border border-amber-700 text-white placeholder:text-amber-500 focus:border-amber-400'
                            />
                        </div>

                        <div>
                            <Label
                                htmlFor='phone'
                                className='text-white mb-2 block'
                            >
                                Phone Number
                            </Label>
                            <Input
                                id='phone'
                                type='tel'
                                {...register("phone")}
                                placeholder='(123) 456-7890'
                                className={`bg-amber-800/50 border text-white placeholder:text-amber-500 ${
                                    errors.phone
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.phone && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className='bg-black/40 backdrop-blur-sm border border-amber-800/50 rounded-2xl p-8'>
                    <h3 className='text-xl font-semibold text-white mb-6'>
                        Event Details
                    </h3>

                    <div className='grid md:grid-cols-2 gap-6 mb-6'>
                        <div>
                            <Label
                                htmlFor='eventType'
                                className='text-white mb-2 block'
                            >
                                Event Type
                            </Label>
                            <Controller
                                name='eventType'
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger
                                            className={`bg-amber-800/50 border text-white ${
                                                errors.eventType
                                                    ? "border-red-500 focus:border-red-400"
                                                    : "border-amber-700 focus:border-amber-400"
                                            }`}
                                        >
                                            <SelectValue placeholder='Select event type' />
                                        </SelectTrigger>
                                        <SelectContent className='bg-amber-800 border-amber-700'>
                                            <SelectItem
                                                value='burial'
                                                className='text-white hover:bg-amber-700'
                                            >
                                                Burial
                                            </SelectItem>
                                            <SelectItem
                                                value='proposal'
                                                className='text-white hover:bg-amber-700'
                                            >
                                                Proposal
                                            </SelectItem>
                                            <SelectItem
                                                value='birthday'
                                                className='text-white hover:bg-amber-700'
                                            >
                                                Birthday Party
                                            </SelectItem>
                                            <SelectItem
                                                value='end-of-year'
                                                className='text-white hover:bg-amber-700'
                                            >
                                                End of the Year Party
                                            </SelectItem>
                                            <SelectItem
                                                value='others'
                                                className='text-white hover:bg-amber-700'
                                            >
                                                Others
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.eventType && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.eventType.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label
                                htmlFor='eventDate'
                                className='text-white mb-2 block'
                            >
                                Event Date
                            </Label>
                            <Input
                                id='eventDate'
                                type='date'
                                {...register("eventDate")}
                                className={`bg-amber-800/50 border text-white ${
                                    errors.eventDate
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.eventDate && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.eventDate.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className='grid md:grid-cols-2 gap-6 mb-6'>
                        <div>
                            <Label
                                htmlFor='eventLocation'
                                className='text-white mb-2 block'
                            >
                                Event Location
                            </Label>
                            <Input
                                id='eventLocation'
                                {...register("eventLocation")}
                                placeholder='City, State'
                                className={`bg-amber-800/50 border text-white placeholder:text-amber-500 ${
                                    errors.eventLocation
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.eventLocation && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.eventLocation.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label
                                htmlFor='eventTime'
                                className='text-white mb-2 block'
                            >
                                Event Time
                            </Label>
                            <Input
                                id='eventTime'
                                type='time'
                                {...register("eventTime")}
                                className={`bg-amber-800/50 border text-white ${
                                    errors.eventTime
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.eventTime && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.eventTime.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className='bg-black/40 backdrop-blur-sm border border-amber-800/50 rounded-2xl p-8'>
                    <h3 className='text-xl font-semibold text-white mb-6'>
                        Tell Us More
                    </h3>

                    <div className='space-y-6'>
                        <div>
                            <Label
                                htmlFor='aboutEvent'
                                className='text-white mb-2 block'
                            >
                                Tell us about your event
                            </Label>
                            <Textarea
                                id='aboutEvent'
                                {...register("aboutEvent")}
                                placeholder="What coverage do you require? What's your vision? What does it look like?"
                                className={`bg-amber-800/50 border text-white placeholder:text-amber-500 min-h-[120px] ${
                                    errors.aboutEvent
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.aboutEvent && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.aboutEvent.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label
                                htmlFor='aboutYou'
                                className='text-white mb-2 block'
                            >
                                Tell us about yourself/your group
                            </Label>
                            <Textarea
                                id='aboutYou'
                                {...register("aboutYou")}
                                placeholder='Tell us about the people involved, any special requirements, etc.'
                                className={`bg-amber-800/50 border text-white placeholder:text-amber-500 min-h-[120px] ${
                                    errors.aboutYou
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.aboutYou && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.aboutYou.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label
                                htmlFor='whyUs'
                                className='text-white mb-2 block'
                            >
                                What draws you to our work?
                            </Label>
                            <Textarea
                                id='whyUs'
                                {...register("whyUs")}
                                placeholder='Tell us what you love about our photography style...'
                                className={`bg-amber-800/50 border text-white placeholder:text-amber-500 min-h-[120px] ${
                                    errors.whyUs
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.whyUs && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.whyUs.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <Button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white py-4 text-lg font-semibold'
                >
                    {isSubmitting ? "Sending Message..." : "Send Message →"}
                </Button>
            </form>
        </motion.div>
    );
}

// Studio Booking Form Component
function StudioBookingForm({
    onBack,
    onSubmit,
    isSubmitting,
}: {
    onBack: () => void;
    onSubmit: (data: StudioBookingData) => void;
    isSubmitting: boolean;
}) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<StudioBookingData>({
        resolver: zodResolver(studioBookingSchema),
    });

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className='max-w-3xl mx-auto'
        >
            <div className='flex items-center gap-4 mb-8'>
                <Button
                    onClick={onBack}
                    variant='ghost'
                    className='text-amber-400 hover:text-white p-2'
                >
                    <ArrowLeft size={20} />
                </Button>
                <div>
                    <h1 className='text-3xl lg:text-4xl font-bold text-white'>
                        Studio & Outdoor Booking
                    </h1>
                    <p className='text-amber-400'>Book your portrait session</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
                <div className='bg-black/40 backdrop-blur-sm border border-amber-800/50 rounded-2xl p-8'>
                    <h3 className='text-xl font-semibold text-white mb-6'>
                        Session Information
                    </h3>

                    <div className='grid md:grid-cols-2 gap-6 mb-6'>
                        <div>
                            <Label
                                htmlFor='firstName'
                                className='text-white mb-2 block'
                            >
                                First Name
                            </Label>
                            <Input
                                id='firstName'
                                {...register("firstName")}
                                placeholder='John'
                                className={`bg-amber-800/50 border text-white placeholder:text-amber-500 ${
                                    errors.firstName
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.firstName && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label
                                htmlFor='lastName'
                                className='text-white mb-2 block'
                            >
                                Last Name
                            </Label>
                            <Input
                                id='lastName'
                                {...register("lastName")}
                                placeholder='Doe'
                                className={`bg-amber-800/50 border text-white placeholder:text-amber-500 ${
                                    errors.lastName
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.lastName && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className='space-y-6'>
                        <div>
                            <Label
                                htmlFor='email'
                                className='text-white mb-2 block'
                            >
                                Email
                            </Label>
                            <Input
                                id='email'
                                type='email'
                                {...register("email")}
                                placeholder='coffeeshotit@gmail.com'
                                className={`bg-amber-800/50 border text-white placeholder:text-amber-500 ${
                                    errors.email
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.email && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label
                                htmlFor='instagram'
                                className='text-white mb-2 block'
                            >
                                IG Handle
                            </Label>
                            <Input
                                id='instagram'
                                {...register("instagram")}
                                placeholder='@yourhandle'
                                className='bg-amber-800/50 border border-amber-700 text-white placeholder:text-amber-500 focus:border-amber-400'
                            />
                        </div>

                        <div>
                            <Label
                                htmlFor='phone'
                                className='text-white mb-2 block'
                            >
                                Phone Number (WhatsApp)
                            </Label>
                            <Input
                                id='phone'
                                type='tel'
                                {...register("phone")}
                                placeholder='+234 811 627 3856'
                                className={`bg-amber-800/50 border text-white placeholder:text-amber-500 ${
                                    errors.phone
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.phone && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label
                                htmlFor='sessionType'
                                className='text-white mb-2 block'
                            >
                                What type of session
                            </Label>
                            <Controller
                                name='sessionType'
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger
                                            className={`bg-amber-800/50 border text-white ${
                                                errors.sessionType
                                                    ? "border-red-500 focus:border-red-400"
                                                    : "border-amber-700 focus:border-amber-400"
                                            }`}
                                        >
                                            <SelectValue placeholder='Select session type' />
                                        </SelectTrigger>
                                        <SelectContent className='bg-amber-800 border-amber-700'>
                                            <SelectItem
                                                value='studio-portraits'
                                                className='text-white hover:bg-amber-700'
                                            >
                                                Studio portraits
                                            </SelectItem>
                                            <SelectItem
                                                value='corporate'
                                                className='text-white hover:bg-amber-700'
                                            >
                                                Corporate
                                            </SelectItem>
                                            <SelectItem
                                                value='outdoor'
                                                className='text-white hover:bg-amber-700'
                                            >
                                                Outdoor
                                            </SelectItem>
                                            <SelectItem
                                                value='collaboration'
                                                className='text-white hover:bg-amber-700'
                                            >
                                                Collaboration
                                            </SelectItem>
                                            <SelectItem
                                                value='others'
                                                className='text-white hover:bg-amber-700'
                                            >
                                                Others
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.sessionType && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.sessionType.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label
                                htmlFor='sessionDate'
                                className='text-white mb-2 block'
                            >
                                Session Date
                            </Label>
                            <Input
                                id='sessionDate'
                                type='date'
                                {...register("sessionDate")}
                                className={`bg-amber-800/50 border text-white ${
                                    errors.sessionDate
                                        ? "border-red-500 focus:border-red-400"
                                        : "border-amber-700 focus:border-amber-400"
                                }`}
                            />
                            {errors.sessionDate && (
                                <p className='text-red-400 text-sm mt-1'>
                                    {errors.sessionDate.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <Button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white py-4 text-lg font-semibold'
                >
                    {isSubmitting ? "Booking Session..." : "Book Session →"}
                </Button>
            </form>
        </motion.div>
    );
}
