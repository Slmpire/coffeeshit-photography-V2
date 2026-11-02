import { NextResponse } from "next/server";

// Prismic exit-preview removed — site uses static content from site.config.ts
export function GET() {
    return NextResponse.redirect("/");
}
