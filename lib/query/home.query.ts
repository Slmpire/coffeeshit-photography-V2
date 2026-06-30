import { AllDocumentTypes } from "@/prismicio-types";
import * as prismic from "@prismicio/client";

export const getServices = async (client: prismic.Client<AllDocumentTypes>) =>
{
    const services = await client.getByType("services");
    return services.results;
};

export const getFaq = async (client: prismic.Client<AllDocumentTypes>) =>
{
    const faq = await client.getByType("faq");
    return faq.results;
};

export const getStoryTellerImages = async (client: prismic.Client<AllDocumentTypes>) =>
{
    const storyTellerImages = await client.getByType("story_teller");
    return storyTellerImages.results;
};

export const getImageCollage = async (client: prismic.Client<AllDocumentTypes>) =>
{
    const imageCollage = await client.getByType("homepage_image_collage");
    return imageCollage.results;
};

export const getSliderImage = async (client: prismic.Client<AllDocumentTypes>) =>
{
    const sliderImage = await client.getByType("slider");
    return sliderImage.results.length > 0 ? sliderImage.results[ 0 ]?.data?.sliders?.map((item) => item.image.url) : [];
};



