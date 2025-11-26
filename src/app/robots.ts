import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_YOUR_WEBSITE || 'https://truyenhayy.online'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // Block internal/system paths
          '/api/',
          '/_next/',
          '/admin/',
          
          // Block tracking parameters (prevent duplicate content indexing)
          '/*?utm_',
          '/*?fbclid=',
          '/*?gclid=',
          '/*?ref=',
          '/*?source=',
          
          // Block print and share versions
          '/*?print=',
          '/*?share=',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
        ],
        // Encourage crawling important pages
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/static/',
        ],
        // Allow image bot to crawl comic images
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
        ],
      },
      {
        // Block aggressive SEO tools and scrapers
        userAgent: [
          'SemrushBot',
          'AhrefsBot',
          'DotBot',
          'MJ12bot',
          'BLEXBot',
          'PetalBot',
          'DataForSeoBot',
          'Bytespider',
          'ZoominfoBot',
          'proximic',
          'MegaIndex',
          'BrandVerity',
          'Screaming Frog',
          'LinkpadBot',
        ],
        disallow: '/',
      },
      {
        // Block known bad bots
        userAgent: [
          'CCBot',
          'ChatGPT-User',
          'GPTBot',
          'Google-Extended',
          'anthropic-ai',
          'Claude-Web',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
