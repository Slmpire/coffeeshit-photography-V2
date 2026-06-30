import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest)
{
    try {
        const body = await request.json();

        // Log the webhook payload for debugging
        console.log("Prismic webhook received:", body);

        // Revalidate the prismic cache tag
        revalidateTag("prismic");

        // You can also revalidate specific tags based on the content type
        if (body.type === "api-update") {
            // Revalidate specific content types if needed
            if (body.documents && body.documents.length > 0) {
                body.documents.forEach((doc: any) =>
                {
                    if (doc.type === "projects") {
                        revalidateTag("projects");
                    }
                    if (doc.type === "categories") {
                        revalidateTag("categories");
                    }
                });
            }
        }

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            message: "Cache revalidated successfully"
        });
    } catch (error) {
        console.error("Error processing Prismic webhook:", error);
        return NextResponse.json(
            { error: "Failed to process webhook" },
            { status: 500 }
        );
    }
}

// Handle GET requests for webhook verification
export async function GET()
{
    return NextResponse.json({
        message: "Prismic webhook endpoint is active",
        timestamp: Date.now()
    });
}
