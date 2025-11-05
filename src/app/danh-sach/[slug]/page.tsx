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
        title: `${status} - truyenhayy.online`,
        description: `${status} tại truyenhayy.online`,
        keywords: [
            `Truyện tranh`,
            `manga`,
            `comic`,
            `manhua`,
            `manhua ${status}`,
        ],
        alternates: {
            canonical: `/danh-sach/${slug}?page=${pageQuery}`,
            languages: {
                vi: `/vi/danh-sach/${slug}?page=${pageQuery}`,
            },
        },
        openGraph: {
            title: `Truyện ${status} - truyenhayy.online`,
            description: `Truyện ${status} tại truyenhayy.online`,
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
