"use server";

import { createClient } from "@/prismicio";
import { projectQuery, projectsByCategoryQuery } from "@/lib/query/project.query";
import { revalidateTag } from "next/cache";

export const getPaginatedProjects = async (page: number, pageSize: number, category: string) =>
{
    // Revalidate the cache to ensure fresh data
    revalidateTag("prismic");
    revalidateTag("projects");

    if (category) {
        revalidateTag(`projects-${category}`);
    }

    const client = createClient();
    let projects: any;
    if (category) {
        projects = await projectsByCategoryQuery(client, category, pageSize, page);
    } else {
        projects = await projectQuery(client, pageSize, page);
    }
    console.log("projects", projects);
    return projects;
};


