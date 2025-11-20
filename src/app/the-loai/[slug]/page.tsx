// ISR Revalidation: Revalidate every 12 hours to reduce ISR calls on Vercel free tier
export const revalidate = 43200;

// ** React
import { Suspense } from 'react';

// ** Components
import DynamicPageStatus from '@/components/common/DynamicPageStatus';

// ** Modules
import GenreHero from '@/modules/the-loai/GenreHero';
import CompactGenreFilter from '@/modules/the-loai/CompactGenreFilter';

// ** utils
import removeExtension from '@/utils/removeExtension';

// ** Skeleton
import DynamicPageStatusSkeleton from '@/skeleton/DynamicPageStatusSkeleton';

// ** action service
import { getGenreDetail, getGenres } from '@/lib/actions/dynamic.page';

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
        title: `${genreName === 'Tất cả' ? 'Tất cả thể loại' : `Thể loại - Truyện ${genreName}`} - Truyenhayy`,
        description: `Khám phá những câu chuyện hấp dẫn thuộc thể loại ${genreName}. Đọc ngay các truyện hay nhất, mới nhất về ${genreName} tại Truyenhayy.online`,
        keywords: [
            `truyện tranh ${genreName}`,
            `truyện ${genreName}`,
            `Truyện ${genreName}`,
        ],
        alternates: {
            canonical: `/the-loai/${slug}?page=${pageQuery}`,
            languages: {
                vi: `/vi/the-loai/${slug}?page=${pageQuery}`,
            },
        },
        openGraph: {
            title: `Thể loại - Truyện ${genreName} - Truyenhayy`,
            description: `Khám phá những câu chuyện hấp dẫn thuộc thể loại ${genreName}. Đọc ngay tại Truyenhayy.online`,
            images: [
                {
                    url: '/logo-all.png',
                    width: 400,
                    height: 200,
                },
            ],
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

    return (
        <>
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
