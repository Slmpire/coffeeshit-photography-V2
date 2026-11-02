/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "images.prismic.io",
            },
        ],
        formats: ["image/webp", "image/avif"],
        minimumCacheTTL: 60 * 60 * 24 * 30,
        deviceSizes: [640, 1080, 1920],
        imageSizes: [32, 64, 128, 256, 384],
    },
    compress: true,
    poweredByHeader: false,
    generateEtags: true,
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "X-Frame-Options", value: "DENY" },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "Referrer-Policy", value: "origin-when-cross-origin" },
                ],
            },
        ];
    },
    async redirects() {
        return [
            { source: "/home", destination: "/", permanent: true },
            { source: "/index.html", destination: "/", permanent: true },
        ];
    },
    output: "standalone",
    trailingSlash: false,
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    env: {
        SITE_URL: process.env.SITE_URL || "https://coffeeshotit.org",
        SITE_NAME: "CoffeeShotIt Media",
        SITE_DESCRIPTION: "Professional photography and videography services in Nigeria",
    },
};

export default nextConfig;