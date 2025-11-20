//  ** Next.js
import type { MetadataRoute } from 'next'

//  ** Action services
import { getGenres } from '@/lib/actions/dynamic.page';
import { getListNew, getListHome, getListPublishing, getListComplete, getListComingSoon } from '@/lib/actions/home';

// Revalidate sitemap every 1 hour (3600 seconds)
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseURL = process.env.NEXT_PUBLIC_YOUR_WEBSITE || 'https://truyenhayy.online';
    
    // Fetch data from multiple sources with pagination for better coverage
    const [resGenres, ...comicResponses] = await Promise.all([
        getGenres(),
        // Fetch multiple pages from each source to get 300+ comics
        getListNew(),
        getListHome(),
        getListPublishing(),
        getListComplete(),
        getListComingSoon(),
    ]);
    
    const dataGenres: IGenres[] = resGenres?.data?.items || [];
    
    // Combine and deduplicate comics from all sources
    const allComics = comicResponses.flat().filter(Boolean);
    
    // Remove duplicates by slug
    const uniqueComics = Array.from(
        new Map(allComics.map((comic: any) => [comic.slug, comic])).values()
    );
    
    // Take top 300 unique comics
    const dataHome = uniqueComics.slice(0, 300);
    
    // Generate genre URLs
    const dataGenreUrls = dataGenres.map((genre) => ({
        url: `${baseURL}/the-loai/${genre.slug}.html`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Generate comic URLs (up to 300 comics with auto-update every hour)
    const dataHomeUrls = dataHome.map((comic: any) => ({
        url: `${baseURL}/truyen-tranh/${comic.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));
    
    return [
        // Homepage - Highest priority
        {
            url: baseURL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        
        // Status pages
        {
            url: `${baseURL}/danh-sach/dang-phat-hanh`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseURL}/danh-sach/hoan-thanh`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseURL}/danh-sach/sap-ra-mat`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
        {
            url: `${baseURL}/danh-sach/truyen-moi`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        
        // Static pages
        {
            url: `${baseURL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseURL}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.2,
        },
        {
            url: `${baseURL}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.2,
        },
        
        // Genre pages - Important for SEO
        ...dataGenreUrls,
        
        // Comic detail pages - High priority
        ...dataHomeUrls,
    ];
}
