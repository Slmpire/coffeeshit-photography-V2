import { AllDocumentTypes } from '@/prismicio-types';
import * as prismic from '@prismicio/client';

export const galleryMenusQuery = async (client: prismic.Client<AllDocumentTypes>) =>
{
    try {

        // graphql

        const response = await client.getByType("gallery_types", {
            graphQuery: `{
                gallery_types {

                        title

                }
            }`,
        });
        console.log(response?.results[ 0 ]?.uid);
        return response.results;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getSingleGalleryQuery = async (client: prismic.Client<AllDocumentTypes>, slug: string) =>
{
    try {
        const response = await client.getByUID("gallery_types", slug);
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};


export const getGalleryImagesQuery = async (client: prismic.Client<AllDocumentTypes>) =>
{
    try {
        const response = await client.getByType("gallery_types", {
            graphQuery: `{
                gallery_types {
                    title
                    description
                }
            }`,
        });
        return response.results;
    } catch (error) {
        console.error(error);
        return null;
    }
};
