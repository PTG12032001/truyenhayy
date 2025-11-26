// ISR Revalidation: Revalidate every 12 hours to reduce ISR calls on Vercel free tier
export const revalidate = 43200;

// ** React
import { Suspense } from 'react';

// ** Components
import DynamicPageStatus from '@/components/common/DynamicPageStatus';
import { BreadcrumbSchema, ItemListSchema } from '@/components/seo/StructuredData';

// ** Modules
import GenreHero from '@/modules/the-loai/GenreHero';
import CompactGenreFilter from '@/modules/the-loai/CompactGenreFilter';

// ** utils
import removeExtension from '@/utils/removeExtension';

// ** Skeleton
import DynamicPageStatusSkeleton from '@/skeleton/DynamicPageStatusSkeleton';

// ** action service
import { getGenreDetail, getGenres, getListCategoryComic } from '@/lib/actions/dynamic.page';

export async function generateMetadata({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const slug = removeExtension((await params).slug, '.html');

    const pageQuery =
        parseInt(((await searchParams).page as string) || '1') || 1;

    const res = await getGenreDetail(slug)

    const genreName: string = res?.data.titlePage || 'Tất cả';

    return {
        title: `Truyện ${genreName} Hay Nhất - Đọc Manga Manhwa ${genreName} 2025 | Truyenhayy`,
        description: `Top 200+ truyện ${genreName.toLowerCase()} hay nhất, mới nhất 2025. Đọc manga ${genreName.toLowerCase()}, manhwa ${genreName.toLowerCase()}, manhua ${genreName.toLowerCase()} online miễn phí. Cập nhật liên tục tại Truyenhayy.online`,
        keywords: [
            `truyen ${genreName.toLowerCase()}`,
            `truyen ${genreName.toLowerCase()} hay nhat`,
            `manga ${genreName.toLowerCase()}`,
            `manhwa ${genreName.toLowerCase()}`,
            `manhua ${genreName.toLowerCase()}`,
            `doc truyen ${genreName.toLowerCase()}`,
            `truyen ${genreName.toLowerCase()} hay`,
            `truyen ${genreName.toLowerCase()} moi nhat`,
            `truyen ${genreName.toLowerCase()} 2025`,
            `truyen ${genreName.toLowerCase()} mien phi`,
            `truyen tranh ${genreName.toLowerCase()}`,
            `doc truyen ${genreName.toLowerCase()} online`,
        ],
        alternates: {
            canonical: `/the-loai/${slug}?page=${pageQuery}`,
            languages: {
                vi: `/vi/the-loai/${slug}?page=${pageQuery}`,
            },
        },
        openGraph: {
            title: `Truyện ${genreName} Hay Nhất - Đọc Manga Manhwa ${genreName} 2025`,
            description: `Top 200+ truyện ${genreName.toLowerCase()} hay nhất, mới nhất. Đọc manga, manhwa, manhua ${genreName.toLowerCase()} online miễn phí tại Truyenhayy.online`,
            url: `/the-loai/${slug}`,
            type: 'website',
            images: [
                {
                    url: '/logothayy.png',
                    width: 1200,
                    height: 630,
                    alt: `Truyện ${genreName} - Truyenhayy.online`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `Truyện ${genreName} Hay Nhất - Truyenhayy.online`,
            description: `Top 200+ truyện ${genreName.toLowerCase()} hay nhất. Đọc miễn phí tại Truyenhayy.online`,
            images: ['/logothayy.png'],
        },
    };
}

const Genre = async ({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const slug = removeExtension((await params).slug, '.html');

    const pageQuery =
        parseInt(((await searchParams).page as string) || '1') || 1;
    
    const response = await getGenres();
    const data: IGenres[] = response?.data?.items;
    
    const genreDetail = await getGenreDetail(slug);
    const genreName = genreDetail?.data?.titlePage || 'Tất cả';
    const totalComics = genreDetail?.data?.params?.pagination?.totalItems || 0;
    
    // Fetch comics list for schema
    const comicsResponse = await getListCategoryComic(`the-loai/${slug}`, pageQuery);
    const comicItems = comicsResponse?.data?.items || [];

    return (
        <>
            {/* Schema Markup for SEO */}
            <BreadcrumbSchema
                items={[
                    { name: 'Trang chủ', url: 'https://truyenhayy.online' },
                    { name: 'Thể loại', url: 'https://truyenhayy.online/the-loai' },
                    { name: genreName, url: `https://truyenhayy.online/the-loai/${slug}` },
                ]}
            />
            <ItemListSchema
                name={`Truyện ${genreName}`}
                url={`https://truyenhayy.online/the-loai/${slug}`}
                items={comicItems.slice(0, 20).map((comic: any) => ({
                    name: comic.name || '',
                    url: `https://truyenhayy.online/truyen-tranh/${comic.slug}`,
                    image: comic.thumb_url ? `https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}` : undefined,
                }))}
            />
            
            {/* Hero Section with Stats */}
            <GenreHero genreName={genreName} totalComics={totalComics} />

            {/* Compact Genre Filter - Horizontal Scroll */}
            <CompactGenreFilter data={data} slug={slug} />

            {/* Comics Grid */}
            <Suspense fallback={<DynamicPageStatusSkeleton/>}>
                <DynamicPageStatus
                    category={`the-loai/${slug}`}
                    pageQuery={pageQuery}
                ></DynamicPageStatus>
            </Suspense>
        </>
    );
};

export default Genre;
