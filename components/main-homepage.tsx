"use client";
import dynamic from "next/dynamic";

import Hero from "@/components/hero";
import { type Project, type Service, type FaqItem, type PortfolioCategory } from "@/types/content";
import ContactCTA from "@/components/contact-cta";
import VideoReel from "./video-reel";
import FAQ from "./faq";

// Lazy load components that are not immediately visible
const About = dynamic(() => import("@/components/about"), {
    loading: () => <div className="h-screen" />,
});
const Projects = dynamic(() => import("@/components/projects-section"), {
    loading: () => <div className="h-screen" />,
});
const Services = dynamic(() => import("@/components/services"), {
    loading: () => <div className="h-screen" />,
});
const Stats = dynamic(() => import("@/components/stats"), {
    loading: () => <div className="h-screen" />,
});
const TheVoice = dynamic(() => import("@/components/the-voice"), {
    loading: () => <div className="h-screen" />,
});
const Testimonials = dynamic(() => import("@/components/testimonials"), {
    loading: () => <div className="h-screen" />,
});

interface MainHomepageProps {
    featuredProjects: Project[];
    services: Service[];
    faq: FaqItem[];
    galleryTypes: PortfolioCategory[];
}

export default function MainHomepage({
    featuredProjects,
    services,
    faq,
    galleryTypes,
}: MainHomepageProps) {
    return (
        <>
            <Hero />
            <About galleryTypes={galleryTypes} />
            <Projects projects={featuredProjects} />
            <Services services={services} />
            <TheVoice />
            <VideoReel />
            <Testimonials />
            <Stats />
            <FAQ faq={faq} />
            <ContactCTA />
        </>
    );
}
