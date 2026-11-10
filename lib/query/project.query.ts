import { AllDocumentTypes } from '@/prismicio-types';
import * as prismic from '@prismicio/client';

export const projectQuery = async (client: prismic.Client<AllDocumentTypes>, pageSize?: number, currentPage?: number) =>
{
    try {
        const response = await client.getByType("projects", {
            graphQuery: `{
                projects {

                        title
                       cover_image
                       category

                }
            }`,
            fetchLinks: [ "category.title" ],
            pageSize,
            page: currentPage,
            orderings: {
                field: 'document.first_publication_date',
                direction: 'desc',
            },
        });

        return {
            data: response.results,
            totalPages: response.total_pages,
            currentPage: currentPage,
        };

    } catch (error) {
        console.error(error);
        return null;
    }


};



export const categoryQuery = async (client: prismic.Client<AllDocumentTypes>) =>
{
    try {
        const response = await client.getByType("categories", {
            graphQuery: `{
                categories {
                    title
                }
            }`
        });

        return response.results;

    } catch (error) {
        console.error(error);
        return null;
    }
};

export const projectsByCategoryQuery = async (client: prismic.Client<AllDocumentTypes>, slug: string, pageSize?: number, currentPage?: number) =>
{
    try {
        const category = await client.getByUID("categories", slug);

        const response = await client.getByType("projects", {
            graphQuery: `{
                projects {

                        title
                        cover_image
                        category

                }
            }`,
            fetchLinks: [ "category.title" ],
            pageSize,
            page: currentPage,
            filters: [
                prismic.filter.at("my.projects.category", category.id),
            ],
        });
        return {
            data: response.results,
            totalPages: response.total_pages,
            currentPage: currentPage,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const SingleProjectQuery = async (client: prismic.Client<AllDocumentTypes>, slug: string) =>
{
    try {
        const response = await client.getByUID("projects", slug);
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const FeaturedProjectsQuery = async (client: prismic.Client<AllDocumentTypes>) =>
{
    try {
        const response = await client.getByType("featured_projects", {
            fetchLinks: [ "project.title", "project.cover_image", "project.category", "project.description", "project.category.title" ],
            graphQuery: `{
                featured_projects {
                    featured_projects {
                        project {
                        title
                        cover_image
                        category
                        description

                        }
                    }
                }
            }`,
            pageSize: 1,
            orderings: {
                field: 'document.first_publication_date',
                direction: 'desc',
            },
        });
        return response.results[ 0 ];
    } catch (error) {
        console.error(error);
        return null;
    }
};


export const getStatsImages = async (client: prismic.Client<AllDocumentTypes>) =>
{
    try {
        const response = await client.getByType("stats_images", {
            pageSize: 1,
        });
        return response.results[ 0 ];
    } catch (error) {
        console.error(error);
        return null;
    }
};

