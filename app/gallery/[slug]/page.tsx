import { createClient } from "@/prismicio";
import { getSingleGalleryQuery } from "@/lib/query/gallery.query";
import React from "react";
import MainPage from "./(components)/main-page";
import { GalleryTypesDocument } from "@/prismicio-types";

export const dynamic = "force-dynamic";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const client = createClient();
    const galleryType = await getSingleGalleryQuery(client, slug);

    return (
        <MainPage
            galleryType={galleryType as unknown as GalleryTypesDocument}
        />
    );
};

export default page;