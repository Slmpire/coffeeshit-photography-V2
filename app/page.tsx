import MainHomepage from "@/components/main-homepage";
import { getGalleryImagesQuery } from "@/lib/query/gallery.query";
import {
    getFaq,
    getServices,
    getStoryTellerImages,
    getImageCollage,
    getSliderImage,
} from "@/lib/query/home.query";
import {
    FeaturedProjectsQuery,
    getStatsImages,
} from "@/lib/query/project.query";
import { createClient } from "@/prismicio";
import {
    FaqDocument,
    GalleryTypesDocument,
    HomepageImageCollageDocument,
    ProjectsDocument,
    ServicesDocument,
    SliderDocument,
    StatsImagesDocument,
    StoryTellerDocument,
} from "@/prismicio-types";
import React from "react";

// Set revalidation time to 60 seconds for ISR
export const revalidate = 60;

const page = async () => {
    const client = createClient();

    // Fetch all data in parallel
    const [
        featuredProjects,
        statsImages,
        services,
        faq,
        galleryTypes,
        storyTellerImages,
        imageCollage,
        sliderImage,
    ] = await Promise.all([
        FeaturedProjectsQuery(client),
        getStatsImages(client),
        getServices(client),
        getFaq(client),
        getGalleryImagesQuery(client),
        getStoryTellerImages(client),
        getImageCollage(client),
        getSliderImage(client),
    ]);

    console.log("slider data:", sliderImage);

    return (
        <MainHomepage
            statsImages={statsImages as StatsImagesDocument}
            featuredProjects={
                featuredProjects?.data
                    ?.featured_projects as unknown as ProjectsDocument[]
            }
            faq={faq as unknown as FaqDocument[]}
            services={services as unknown as ServicesDocument[]}
            galleryTypes={galleryTypes as unknown as GalleryTypesDocument[]}
            storyTellerImages={
                storyTellerImages as unknown as StoryTellerDocument[]
            }
            imageCollage={
                imageCollage as unknown as HomepageImageCollageDocument[]
            }
            slider={sliderImage as unknown as string[]}
        />
    );
};

export default page;
