import { createClient as createPrismicClient } from "@prismicio/client";
import { IMAGES, SERVICES, FAQ, FEATURED_PROJECT_UIDS, PROJECTS } from "@/content/site.config";
import MainHomepage from "@/components/main-homepage";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoffeeShotIt — Professional Photography in Lagos, Nigeria",
    description:
        "Professional photography and videography services in Nigeria. Weddings, events, portraits, proposals. Based in Lagos, available nationwide and internationally.",
    openGraph: {
        title: "CoffeeShotIt — Professional Photography",
        description:
            "Cinematic wedding, event and portrait photography based in Lagos, Nigeria.",
        images: [IMAGES.heroSlider[0].url],
    },
};

export const revalidate = 60;

export default async function HomePage() {
    const featuredProjects = PROJECTS.filter((p) =>
        FEATURED_PROJECT_UIDS.includes(p.uid)
    );

    return (
        <MainHomepage
            featuredProjects={featuredProjects}
            services={SERVICES}
            faq={FAQ}
            galleryTypes={IMAGES.portfolioCategories}
        />
    );
}
