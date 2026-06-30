import React from "react";
import MainPage from "./(components)/main-page";
import { createClient } from "@/prismicio";
import { categoryQuery } from "@/lib/query/project.query";
import { CategoriesDocument } from "@/prismicio-types";

export const dynamic = "force-dynamic";

const page = async () => {
    const client = createClient();
    const categories = await categoryQuery(client);

    return (
        <MainPage categories={categories as unknown as CategoriesDocument[]} />
    );
};

export default page;
