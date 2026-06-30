import { MetadataRoute } from 'next';
import { createClient } from '@/prismicio';

export default async function sitemap(): Promise<MetadataRoute.Sitemap>
{
    const client = createClient();
    const baseUrl = process.env.SITE_URL || 'https://coffeeshotit.com';

    try {
        // Fetch all projects and categories
        const [ projects, categories, galleries ] = await Promise.all([
            client.getAllByType('projects'),
            client.getAllByType('categories'),
            client.getAllByType('gallery_types'),
        ]);

        // Build URLs array
        const urls: MetadataRoute.Sitemap = [
            // Homepage
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 1.0,
            },

            // Main Pages
            {
                url: `${baseUrl}/projects`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.9,
            },
            {
                url: `${baseUrl}/gallery`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.9,
            },
            {
                url: `${baseUrl}/contact`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.8,
            },
            {
                url: `${baseUrl}/booking`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.8,
            },

            // Dynamic Project Pages
            ...projects.map((project) => ({
                url: `${baseUrl}/projects/${project.uid}`,
                lastModified: new Date(
                    project.last_publication_date || project.first_publication_date
                ),
                changeFrequency: 'monthly' as const,
                priority: 0.7,
            })),

            // Dynamic Category/Gallery Pages
            ...categories.map((category) => ({
                url: `${baseUrl}/gallery/${category.uid}`,
                lastModified: new Date(
                    category.last_publication_date || category.first_publication_date
                ),
                changeFrequency: 'monthly' as const,
                priority: 0.6,
            })),

            // Gallery Type Pages
            ...galleries.map((gallery) => ({
                url: `${baseUrl}/gallery/${gallery.uid}`,
                lastModified: new Date(
                    gallery.last_publication_date || gallery.first_publication_date
                ),
                changeFrequency: 'monthly' as const,
                priority: 0.6,
            })),
        ];

        return urls;
    } catch (error) {
        console.error('Error generating sitemap:', error);

        // Fallback sitemap
        const fallbackUrls: MetadataRoute.Sitemap = [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 1.0,
            },
            {
                url: `${baseUrl}/projects`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.9,
            },
            {
                url: `${baseUrl}/gallery`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.9,
            },
            {
                url: `${baseUrl}/contact`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.8,
            },
            {
                url: `${baseUrl}/booking`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.8,
            },
        ];

        return fallbackUrls;
    }
}
