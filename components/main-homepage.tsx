"use client";
import dynamic from "next/dynamic";

import Hero from "@/components/hero";
import {
    FaqDocument,
    GalleryTypesDocument,
    ProjectsDocument,
    ServicesDocument,
    StatsImagesDocument,
    // TestimonialsDocument,
    StoryTellerDocument,
    HomepageImageCollageDocument,
} from "@/prismicio-types";
import FeaturedPhoto from "@/components/featured-photo";
import GalleryGrid from "@/components/gallery-grid";
import ContactCTA from "@/components/contact-cta";
import Signature from "@/components/signature";
import TheVoice from "./the-voice";
import FAQ from "./faq";

// Lazy load components that are not immediately visible
const About = dynamic(() => import("@/components/about"), {
    loading: () => <div className='h-screen' />,
});
const Projects = dynamic(() => import("@/components/projects-section"), {
    loading: () => <div className='h-screen' />,
});
const Services = dynamic(() => import("@/components/services"), {
    loading: () => <div className='h-screen' />,
});
const Stats = dynamic(() => import("@/components/stats"), {
    loading: () => <div className='h-screen' />,
});
const Tools = dynamic(() => import("@/components/tools"), {
    loading: () => <div className='h-screen' />,
});
const Testimonials = dynamic(() => import("@/components/testimonials"), {
    loading: () => <div className='h-screen' />,
});
const Footer = dynamic(() => import("@/components/footer"), {
    loading: () => <div className='h-screen' />,
});

interface MainHomepageProps {
    featuredProjects: ProjectsDocument[];
    statsImages: StatsImagesDocument;
    // testimonials: TestimonialsDocument[];
    faq: FaqDocument[];
    services: ServicesDocument[];
    galleryTypes: GalleryTypesDocument[];
    storyTellerImages: StoryTellerDocument[];
    imageCollage: HomepageImageCollageDocument[];
    slider: string[];
}

export default function MainHomepage({
    featuredProjects,
    statsImages,
    // testimonials,
    faq,
    services,
    galleryTypes,
    storyTellerImages,
    imageCollage,
    slider,
}: MainHomepageProps) {
    console.log("slider", slider);
    return (
        <>
            {/* <Header /> */}
            <Hero imageCollage={imageCollage} slider={slider} />
            <About galleryTypes={galleryTypes} />
            <Projects projects={featuredProjects} />
            <Services services={services as ServicesDocument[]} />
            <TheVoice storyTellerImages={storyTellerImages} />
            <Stats statsImages={statsImages} />
            <Tools />
            <Testimonials />
            <FAQ faq={faq} />
            <ContactCTA />
            <Footer />
            {/* <Signature /> */}
        </>
    );
}
//
