// Shared content types used across the site (replaces Prismic document types)

export interface ImageAsset {
    url: string;
    alt: string;
}

export interface Project {
    uid: string;
    title: string;
    category: string;
    client?: string;
    location?: string;
    date?: string;
    description?: string;
    coverImage: ImageAsset;
    gallery?: ImageAsset[];
}

export interface Service {
    uid: string;
    title: string;
    subtitle: string;
    description: string;
    image: ImageAsset;
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface Testimonial {
    initials: string;
    name: string;
    location: string;
    type: string;
    content: string;
}

export interface PortfolioCategory {
    uid: string;
    label: string;
    description: string;
    url: string;
    alt: string;
}
