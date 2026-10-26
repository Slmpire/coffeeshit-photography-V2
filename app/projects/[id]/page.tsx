import ProjectDetails from "@/components/main-project-details";
import { PROJECTS } from "@/content/site.config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return PROJECTS.map((p) => ({ id: p.uid }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const project = PROJECTS.find((p) => p.uid === id);
    if (!project) return {};
    return {
        title: `${project.title} — CoffeeShotIt`,
        description: project.description ?? `Photography project by CoffeeShotIt: ${project.title}`,
    };
}

export default async function ProjectPage({ params }: PageProps) {
    const { id } = await params;
    const project = PROJECTS.find((p) => p.uid === id);

    if (!project) notFound();

    return <ProjectDetails project={project} />;
}
