import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(request: Request)
{
  try {
    const body = await request.json();

    // Check if this is a Prismic webhook
    if (body.type === 'api-update') {
      // Revalidate the homepage
      revalidatePath('/');

      // Revalidate specific tags based on content type
      if (body.documents && Array.isArray(body.documents)) {
        body.documents.forEach((doc: any) =>
        {
          if (doc.type === 'slider') {
            revalidateTag('slider');
          }
          if (doc.type === 'services') {
            revalidateTag('services');
          }
          if (doc.type === 'faq') {
            revalidateTag('faq');
          }
          if (doc.type === 'homepage_image_collage') {
            revalidateTag('homepage_image_collage');
          }
          if (doc.type === 'story_teller') {
            revalidateTag('story_teller');
          }
        });
      }

      return NextResponse.json({
        revalidated: true,
        now: Date.now(),
        message: 'Content revalidated successfully'
      });
    }

    // Fallback: revalidate all Prismic content
    revalidateTag("prismic");
    revalidatePath('/');

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: 'All content revalidated'
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    );
  }
}
