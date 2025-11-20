// ISR Revalidation: Revalidate every 6 hours to reduce ISR calls on Vercel free tier
export const revalidate = 21600;

// ** React
import { Suspense } from 'react';

// ** Components
import DynamicPageStatus from '@/components/common/DynamicPageStatus';

// ** utils
import removeExtension from '@/utils/removeExtension';

// ** Skeleton
import DynamicPageStatusSkeleton from '@/skeleton/DynamicPageStatusSkeleton';

// ** action service
import { getListStatusComic } from '@/lib/actions/dynamic.page';

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

    const res = await getListStatusComic(slug, pageQuery);

    const status = res?.data?.titlePage;

    return {
        title: `Truyện ${status} - Đọc Manga Manhwa Mới Nhất 2025 | Truyenhayy`,
        description: `Danh sách 300+ truyện ${status?.toLowerCase()} mới nhất, hot nhất. Đọc manga, manhwa, manhua online miễn phí. Cập nhật liên tục hàng ngày tại Truyenhayy.online`,
        keywords: [
            `truyen ${status?.toLowerCase()}`,
            `manga ${status?.toLowerCase()}`,
            `manhwa ${status?.toLowerCase()}`,
            `manhua ${status?.toLowerCase()}`,
            `truyen tranh moi nhat`,
            `doc truyen online`,
            `truyen tranh hot`,
            `manga moi nhat 2025`,
            `manhwa moi nhat`,
            `doc truyen mien phi`,
            `truyen tranh hay`,
            `truyen tranh ${status?.toLowerCase()}`,
        ],
        alternates: {
            canonical: `/danh-sach/${slug}?page=${pageQuery}`,
            languages: {
                vi: `/vi/danh-sach/${slug}?page=${pageQuery}`,
            },
        },
        openGraph: {
            title: `Truyện ${status} - Đọc Manga Manhwa Mới Nhất 2025`,
            description: `Danh sách 300+ truyện ${status?.toLowerCase()} mới nhất, hot nhất. Đọc manga, manhwa, manhua online miễn phí tại Truyenhayy.online`,
            url: `/danh-sach/${slug}`,
            type: 'website',
            images: [
                {
                    url: '/logothayy.png',
                    width: 1200,
                    height: 630,
                    alt: `Truyện ${status} - Truyenhayy.online`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `Truyện ${status} - Truyenhayy.online`,
            description: `Danh sách 300+ truyện ${status?.toLowerCase()} mới nhất. Đọc miễn phí tại Truyenhayy.online`,
            images: ['/logothayy.png'],
        },
    };
}

const Status = async ({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const slug = removeExtension((await params).slug, '.html');

    const pageQuery =
        parseInt(((await searchParams).page as string) || '1') || 1;
    return (
       <div className="relative">
           <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 pointer-events-none" />
           <div className="relative">
               <Suspense fallback={<DynamicPageStatusSkeleton title/>}>
                   <DynamicPageStatus
                       category={`danh-sach/${slug}`}
                       pageQuery={pageQuery}
                       title={true}
                   ></DynamicPageStatus>
               </Suspense>
           </div>
       </div>
    );
};

export default Status;
