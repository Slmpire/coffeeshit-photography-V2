import { PROJECTS, IMAGES } from "@/content/site.config";

const BASE_URL = process.env.SITE_URL || "https://coffeeshotit.org";

export function GET() {
    const urls = [
        { url: BASE_URL, changeFrequency: "weekly", priority: 1.0 },
        { url: `${BASE_URL}/projects`, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/gallery`, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/portfolio`, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/booking`, changeFrequency: "monthly", priority: 0.8 },
        ...PROJECTS.map((p) => ({
            url: `${BASE_URL}/projects/${p.uid}`,
            changeFrequency: "monthly",
            priority: 0.7,
        })),
        ...IMAGES.portfolioCategories.map((cat) => ({
            url: `${BASE_URL}/gallery/${cat.uid}`,
            changeFrequency: "weekly",
            priority: 0.7,
        })),
    ];

    return Response.json(urls);
}
