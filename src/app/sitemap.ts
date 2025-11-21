//  ** Next.js
import type { MetadataRoute } from 'next'

//  ** Action services
import { getGenres, getListCategoryComic } from '@/lib/actions/dynamic.page';
import { getListNew, getListHome, getListPublishing, getListComplete, getListComingSoon } from '@/lib/actions/home';

// Revalidate sitemap every 24 hours (86400 seconds) to stay within Vercel free tier
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseURL = process.env.NEXT_PUBLIC_YOUR_WEBSITE || 'https://truyenhayy.online';
    
    // Fetch genres first
    const resGenres = await getGenres();
    const dataGenres: IGenres[] = resGenres?.data?.items || [];
    
    // Fetch comics from status pages
    const [newComics, homeComics, publishingComics, completeComics, comingSoonComics] = await Promise.all([
        getListNew(),
        getListHome(),
        getListPublishing(),
        getListComplete(),
        getListComingSoon(),
    ]);
    
    // Combine status comics
    const statusComics = [
        ...(newComics || []),
        ...(homeComics || []),
        ...(publishingComics || []),
        ...(completeComics || []),
        ...(comingSoonComics || []),
    ].filter(Boolean);
    
    // Fetch comics from top 10 popular genres to get more coverage
    const topGenreSlugs = ['ngon-tinh', 'action', 'manhwa', 'manga', 'manhua', 'romance', 'fantasy', 'drama', 'comedy', 'adventure'];
    const genreComicsPromises = topGenreSlugs
        .filter(slug => dataGenres.some(g => g.slug === slug))
        .map(slug => getListCategoryComic(`the-loai/${slug}`, 1).catch(() => ({ data: { items: [] } })));
    
    const genreComicsResponses = await Promise.all(genreComicsPromises);
    const genreComics = genreComicsResponses.flatMap(res => {
        const items = res?.data?.items || [];
        return Array.isArray(items) ? items : [];
    });
    
    // Combine all comics
    const allComics = [...statusComics, ...genreComics].filter(Boolean);
    
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
