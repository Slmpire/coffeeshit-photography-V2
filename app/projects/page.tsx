import MainPage from "./(components)/main-page";
import { PROJECT_CATEGORIES, PROJECTS } from "@/content/site.config";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects — CoffeeShotIt",
    description: "A curated collection of wedding, event, and portrait photography by CoffeeShotIt.",
};

export default function ProjectsPage() {
    return (
        <MainPage
            categories={PROJECT_CATEGORIES}
            projects={PROJECTS}
        />
    );
}
