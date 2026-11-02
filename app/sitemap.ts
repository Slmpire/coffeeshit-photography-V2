import { MetadataRoute } from "next";
import { PROJECTS, IMAGES } from "@/content/site.config";

const BASE_URL = "https://coffeeshotit.org";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticPages: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
        { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/booking`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ];

    // Dynamic project pages from site.config.ts
    const projectPages: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
        url: `${BASE_URL}/projects/${project.uid}`,
        lastModified: new Date(project.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    // Dynamic gallery category pages from site.config.ts
    const galleryPages: MetadataRoute.Sitemap = IMAGES.portfolioCategories.map((cat) => ({
        url: `${BASE_URL}/gallery/${cat.uid}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    return [...staticPages, ...projectPages, ...galleryPages];
}