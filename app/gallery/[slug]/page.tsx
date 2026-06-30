import { createClient } from "@/prismicio";
import { getSingleGalleryQuery } from "@/lib/query/gallery.query";
import React from "react";
import MainPage from "./(components)/main-page";
import { GalleryTypesDocument } from "@/prismicio-types";

export const dynamic = "force-dynamic";

const page = async ({ params }: { params: { slug: string } }) => {
    const client = createClient();
    const galleryType = await getSingleGalleryQuery(client, params.slug);

    console.log(galleryType);

    return (
        <MainPage
            galleryType={galleryType as unknown as GalleryTypesDocument}
        />
    );
};

export default page;
