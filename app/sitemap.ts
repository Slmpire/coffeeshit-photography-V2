import { MetadataRoute } from "next";
import { createClient } from "@/prismicio";

const BASE_URL = "https://coffeeshotit.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/services`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/portfolio`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/projects`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/pricing`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/faq`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/booking`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/gallery`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
    ];

    // Dynamic project pages from Prismic
    let projectPages: MetadataRoute.Sitemap = [];
    let galleryPages: MetadataRoute.Sitemap = [];

    try {
        const client = createClient();

        // Projects
        const projects = await client.getAllByType("projects");
        projectPages = projects.map((project) => ({
            url: `${BASE_URL}/projects/${project.uid}`,
            lastModified: new Date(project.last_publication_date),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        }));

        // Gallery categories
        const galleries = await client.getAllByType("gallery_types" as any);
        galleryPages = galleries.map((gallery: any) => ({
            url: `${BASE_URL}/gallery/${gallery.uid}`,
            lastModified: new Date(gallery.last_publication_date),
            changeFrequency: "weekly" as const,
            priority: 0.7,
        }));
    } catch (e) {
        console.error("Sitemap: Prismic fetch failed", e);
    }

    return [...staticPages, ...projectPages, ...galleryPages];
}