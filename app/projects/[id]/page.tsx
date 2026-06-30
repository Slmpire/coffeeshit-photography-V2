import ProjectDetails from "@/components/main-project-details";
import { SingleProjectQuery } from "@/lib/query/project.query";
import { createClient } from "@/prismicio";
import { ProjectsDocument } from "@/prismicio-types";
import React from "react";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export const dynamic = "force-dynamic";

const page = async ({ params }: PageProps) => {
    const { id } = await params;
    const client = createClient();
    const project = await SingleProjectQuery(client, id);
    return <ProjectDetails project={project as unknown as ProjectsDocument} />;
};

export default page;
