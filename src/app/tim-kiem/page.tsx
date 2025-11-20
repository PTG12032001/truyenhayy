// ISR Revalidation: Search results revalidate every 6 hours to reduce ISR calls on Vercel free tier
export const revalidate = 21600;

// ** Next
import Link from 'next/link';

// ** Shadcn ui
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';

// ** action service
import { getSearchComic } from '@/lib/actions/search';

// ** Components
import ComicImage from '@/components/common/ComicImage';
import { Heading } from '@/components/typography/Heading';

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const keyword = (await searchParams).keyword || '';
    return {
        title: `Tìm Kiếm "${keyword}" - Kết Quả Tìm Truyện Tranh | Truyenhayy`,
        description: `Kết quả tìm kiếm cho "${keyword}". Tìm kiếm và đọc manga, manhwa, manhua miễn phí tại Truyenhayy.online. Hàng nghìn truyện tranh đang chờ bạn khám phá!`,
        keywords: [
            `tim kiem truyen tranh`,
            `tim truyen ${keyword}`,
            `search manga`,
            `search manhwa`,
            `tim kiem ${keyword}`,
            `doc truyen ${keyword}`,
            `truyen tranh ${keyword}`,
            `tim truyen tranh online`,
            `search truyen tranh`,
        ],
        // Prevent search pages from being indexed (SEO best practice)
        robots: {
            index: false,
            follow: true,
            noarchive: true,
            nosnippet: true,
            noimageindex: true,
        },
        alternates: {
            canonical: `/tim-kiem?keyword=${keyword}`,
            languages: {
                vi: `/vi/tim-kiem?keyword=${keyword}`,
            },
        },
        openGraph: {
            title: `Tìm Kiếm "${keyword}" - Truyenhayy.online`,
            description: `Kết quả tìm kiếm cho "${keyword}". Tìm và đọc truyện tranh miễn phí tại Truyenhayy.online`,
            url: `/tim-kiem?keyword=${keyword}`,
            type: 'website',
            images: [
                {
                    url: '/logothayy.png',
                    width: 1200,
                    height: 630,
                    alt: 'Tìm kiếm truyện tranh - Truyenhayy.online',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `Tìm Kiếm "${keyword}" - Truyenhayy.online`,
            description: `Kết quả tìm kiếm cho "${keyword}"`,
            images: ['/logothayy.png'],
        },
    };
}
const SearchPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const keywordParam  = (await searchParams).keyword || '';
    const keyword = Array.isArray(keywordParam) ? keywordParam[0] : keywordParam || "";
    const pageQuery =
        parseInt(((await searchParams).page as string) || '1') || 1;
    const res = await getSearchComic(keyword, pageQuery);
    const data: IComic[] = res?.data?.items;
    const itemsPerPage = 24;
    const totalItems = res?.data?.params?.pagination?.totalItems || 0;
    return (
        <section className="wrapper">
            <div className="flex gap-[5px] text-sm py-8">
                <span className="text-primaryColor">{`"${keyword}"`}</span>
                <span>Kết quả tìm kiếm</span>
            </div>
            <div className="flex flex-wrap gap-4">
                {data.map((item, index) => {
                    return (
                        <figure
                            key={index}
                            className="flex gap-4 lg:w-[calc(100%/3-16px)]"
                        >
                            <Link href={`/truyen-tranh/${item.slug}`}>
                                <ComicImage
                                    src={`${res?.data?.APP_DOMAIN_CDN_IMAGE}/uploads/comics/${item.thumb_url}`}
                                    alt={item.name}
                                    priority={index <= 0 ? true : false}
                                />
                            </Link>
                            <figcaption className="w-[180px] mt-1.5 text-lg flex flex-col justify-between">
                                <Heading as='h2' title={item.name} href={`/truyen-tranh/${item.slug}`} fontWeight='medium' size='lg' />
                                <div className="text-xs text-black/30 dark:text-white/30">
                                    <ul className="flex gap-2 line-clamp-1">
                                        {item.author.map((author, index) => (
                                            <li
                                                key={index}
                                                className="flex-shrink-0"
                                            >
                                                {author}
                                            </li>
                                        ))}
                                    </ul>
                                    <ul className="flex gap-2 line-clamp-1">
                                        {item.category.map(
                                            (category, index) => (
                                                <li
                                                    key={index}
                                                    className="flex-shrink-0"
                                                >
                                                    {category.name}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    <div>{item.status}</div>
                                </div>
                            </figcaption>
                        </figure>
                    );
                })}
            </div>
            <div className='pt-8 pb-20'>
                <PaginationWithLinks
                    page={pageQuery}
                    pageSize={itemsPerPage}
                    totalCount={totalItems}
                />
            </div>
        </section>
    );
};
export default SearchPage;
