import { notFound } from "next/navigation";
import { IMAGES } from "@/content/site.config";
import type { Metadata } from "next";
import GalleryMainPage from "./(components)/main-page";

export async function generateStaticParams() {
    return IMAGES.portfolioCategories.map((cat) => ({ slug: cat.uid }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const cat = IMAGES.portfolioCategories.find((c) => c.uid === slug);
    if (!cat) return {};
    return {
        title: `${cat.label} — CoffeeShotIt`,
        description: cat.description,
        openGraph: {
            title: `${cat.label} | CoffeeShotIt`,
            description: cat.description,
            images: [cat.url],
        },
    };
}

export default async function GallerySlugPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const cat = IMAGES.portfolioCategories.find((c) => c.uid === slug);
    if (!cat) notFound();

    return <GalleryMainPage category={cat} />;
}