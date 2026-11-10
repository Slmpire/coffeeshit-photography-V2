import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots
{
    const baseUrl = process.env.SITE_URL || 'https://coffeeshotit.com';

    return {
        rules: [
            {
                userAgent: '*',
                allow: [ '/' ],
                disallow: [
                    '/api/',
                    '/admin/',
                    '/_next/',
                    '/private/',
                    '/*.json$',
                ],
            },
            {
                userAgent: 'Googlebot',
                allow: [ '/' ],
                crawlDelay: 1,
            },
            {
                userAgent: 'Bingbot',
                allow: [ '/' ],
                crawlDelay: 1,
            },
            {
                userAgent: 'Slurp',
                allow: [ '/' ],
                crawlDelay: 1,
            },
            {
                userAgent: [ 'AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot' ],
                disallow: [ '/' ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
