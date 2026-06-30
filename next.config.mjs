/** @type {import('next').NextConfig} */
const nextConfig = {
    // eslint: {
    //     ignoreDuringBuilds: true,
    // },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.prismic.io",
            },
        ],
        formats: ["image/webp", "image/avif"],
        minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    },
    // SEO and Performance Optimizations
    compress: true,
    poweredByHeader: false,
    generateEtags: true,

    // Security Headers for SEO and Security
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    // Security Headers
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "origin-when-cross-origin",
                    },
                ],
            },
        ];
    },

    // Redirects for SEO
    async redirects() {
        return [
            {
                source: "/home",
                destination: "/",
                permanent: true,
            },
            {
                source: "/index.html",
                destination: "/",
                permanent: true,
            },
        ];
    },

    // Rewrites for SEO-friendly URLs
    // async rewrites() {
    //     return [
    //         {
    //             source: "/sitemap.xml",
    //             destination: "/api/sitemap",
    //         },
    //         {
    //             source: "/robots.txt",
    //             destination: "/api/robots",
    //         },
    //     ];
    // },

    // Output configuration for static optimization
    output: "standalone",

    // Trailing slash configuration for SEO
    trailingSlash: false,

    // remove console logs in production
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },

    // Environment variables for SEO
    env: {
        SITE_URL: process.env.SITE_URL || "https://coffeeshotit.com",
        SITE_NAME: "Coffeeshotit Media",
        SITE_DESCRIPTION:
            "Professional photography and videography services in Nigeria",
    },
};

export default nextConfig;
