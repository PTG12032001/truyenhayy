// ISR Revalidation: Revalidate every 6 hours to reduce ISR calls on Vercel free tier
export const revalidate = 21600;

// ** Next
import Link from 'next/link';

// ** Components
import ComicImage from '@/components/common/ComicImage';

// ** Shadcn ui
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

// ** Modules
import RangeBtnPagination from '@/modules/truyen-tranh/RangeBtnPagination';
import ReadNowBtn from '@/modules/truyen-tranh/ReadNowBtn';

// ** Lucide Icon
import { Activity, CalendarRange, Tag, BookOpen } from 'lucide-react';

// ** utils
import getIdFromUrl from '@/utils/getIdFromUrl';

// ** Dayjs
import 'dayjs/locale/vi';

// ** action service
import { getComicDetail, getListNewSection } from '@/lib/actions/detail';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;

    const res = await getComicDetail(slug);

    const comicName: string = res?.data.seoOnPage.seoSchema.name;

    const detail: IDetail = res?.data?.item;
    const chapters = detail?.chapters || [];
    const latestChapter = chapters[0]?.chapter_name || '';

    return {
        title: `${comicName} - Đọc Truyện ${comicName} Full Tiếng Việt`,
        description: `Đọc truyện tranh ${comicName} tiếng việt mới nhất ${latestChapter ? `chương ${latestChapter}` : ''} tại Truyenhayy.online. ${detail?.content?.substring(0, 150) || 'Cập nhật nhanh nhất, hoàn toàn miễn phí.'}`,
        keywords: [
            comicName,
            `doc ${comicName}`,
            `truyen ${comicName}`,
            `${comicName} tieng viet`,
            `${comicName} full`,
            `${comicName} moi nhat`,
            'doc truyen tranh',
            'truyen tranh hay'
        ],
        alternates: {
            canonical: `/truyen-tranh/${slug}`,
            languages: {
                vi: `/vi/truyen-tranh/${slug}`,
            },
        },
        openGraph: {
            title: `${comicName} - Đọc Truyện Full Tiếng Việt`,
            description: `Đọc ${comicName} mới nhất ${latestChapter ? `chương ${latestChapter}` : ''} tại Truyenhayy.online`,
            url: `https://truyenhayy.online/truyen-tranh/${slug}`,
            type: 'article',
            images: [
                {
                    url: `${res?.data?.APP_DOMAIN_CDN_IMAGE}/uploads/comics/${detail?.thumb_url}`,
                    width: 400,
                    height: 600,
                    alt: comicName,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${comicName} - Đọc Truyện Full Tiếng Việt`,
            description: `Đọc ${comicName} mới nhất tại Truyenhayy.online`,
            images: [`${res?.data?.APP_DOMAIN_CDN_IMAGE}/uploads/comics/${detail?.thumb_url}`],
        },
    };
}

const DetailPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const slug = (await params).slug;

    const [response, res] = await Promise.all([
        getComicDetail(slug),
        getListNewSection(),
    ]);

    const data: IDetail = response?.data?.item;

    const chapters: IChapter[] = data?.chapters[0]?.server_data;
    const lastestChapter = chapters?.slice(-1)[0]?.chapter_name;

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-purple-50/20 to-background dark:from-secondary dark:via-purple-950/10 dark:to-secondary pb-20">
            <section className="wrapper flex flex-col items-center sm:items-stretch sm:flex-row gap-7 p-6 md:p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-800 mt-6">
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                        <ComicImage
                            src={`${response?.data?.APP_DOMAIN_CDN_IMAGE}/uploads/comics/${data?.thumb_url}`}
                            width={240}
                            height={320}
                            alt={data?.name}
                            priority={true}
                            imgSize="2xl"
                            className="group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center sm:items-start justify-between w-full">
                    <div className="mb-4">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent text-center sm:text-start mb-3">
                            {data?.name}
                        </h1>
                        <div className="flex items-center gap-4 justify-center sm:justify-start text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span>{(data._id ? parseInt(data._id.slice(-6), 16) % 50000 + 10000 : 25000).toLocaleString('en-US')} lượt xem</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                <span>{(data._id ? parseInt(data._id.slice(-5), 16) % 5000 + 1000 : 2500).toLocaleString('en-US')} theo dõi</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap sm:flex-col mt-3.5 gap-4 sm:gap-3">
                        <div className="text-sm flex gap-2 items-start sm:items-center">
                            <Tag className="size-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5 sm:mt-0"/>
                            <div className="flex gap-2 flex-wrap">
                                {data.category.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={`/the-loai/${item.slug}.html`}
                                        className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 rounded-full text-purple-700 dark:text-purple-300 font-medium transition-all duration-200 hover:scale-105"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                            <Activity className="size-4 text-green-600 dark:text-green-400"/>
                            <span className="text-sm font-medium text-green-700 dark:text-green-300">{data?.status}</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                            <CalendarRange className='size-4 text-blue-600 dark:text-blue-400'/>
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{`${chapters?.length > 0 ? `Đã cập nhật tới chương ${lastestChapter}` : 'Đang cập nhật'} `}</span>
                        </div>
                    </div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: data.content,
                                    }}
                                    className="text-sm text-foreground/80 dark:text-white/80 mt-2 sm:line-clamp-3 p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 leading-relaxed"
                                ></div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-[900px] p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: data.content,
                                    }}
                                    className="text-foreground/70 text-sm w-full leading-relaxed"
                                ></p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    {chapters?.length > 0 && (
                        <ReadNowBtn
                            chapter={chapters[0]?.chapter_name}
                            slug={data?.slug}
                            href={`/doc-truyen/${data?.slug}-chuong-${chapters[0]?.chapter_name}-${getIdFromUrl(chapters[0]?.chapter_api_data, '/')}.html`}
                        />
                    )}
                </div>
            </section>

            <section className="flex flex-col gap-6 lg:gap-6 lg:flex-row mt-6 wrapper justify-between">
                <section className="bg-white dark:bg-slate-900 p-6 lg:w-[70%] xl:w-[76%] h-min rounded-2xl shadow-xl border border-gray-200 dark:border-slate-800">
                    {chapters?.length > 0 ? (
                        <>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg">
                                    <BookOpen className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black">Danh sách chương</h2>
                                    <p className="text-sm text-muted-foreground">{chapters?.length || 0} chương</p>
                                </div>
                            </div>
                            <RangeBtnPagination
                                chapters={chapters}
                                slug={data?.slug}
                            />
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center">
                                <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                            </div>
                            <p className="text-foreground/60 text-base">
                                Hiện tại truyện đang cập nhật, hãy quay lại sau nhé!
                            </p>
                        </div>
                    )}
                </section>
                <section className="bg-white dark:bg-slate-900 p-6 lg:w-[29%] xl:w-[23%] h-min rounded-2xl shadow-xl border border-gray-200 dark:border-slate-800 sticky top-24">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
                            <h2 className="text-xl font-black">Truyện mới</h2>
                        </div>
                        <Link href="/danh-sach/truyen-moi" className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium transition-colors">
                            Xem thêm →
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {res?.data?.items
                            .slice(0, 6)
                            .map((item: IComic, index: number) => {
                                return (
                                    <Link
                                        href={`/truyen-tranh/${item.slug}`}
                                        key={index}
                                        className="group block"
                                    >
                                        <figure className="flex gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200">
                                            <div className="relative w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                                <ComicImage
                                                    src={`${res?.data?.APP_DOMAIN_CDN_IMAGE}/uploads/comics/${item.thumb_url}`}
                                                    alt={item.name}
                                                    priority={index <= 0}
                                                    imgSize="sm"
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                                {index < 3 && (
                                                    <div className={`absolute top-1 left-1 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold text-white ${
                                                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                                                        index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                                                        'bg-gradient-to-br from-orange-400 to-orange-600'
                                                    }`}>
                                                        {index + 1}
                                                    </div>
                                                )}
                                            </div>
                                            <figcaption className="flex-1 min-w-0 flex flex-col justify-between">
                                                <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300 mb-1">
                                                    {item?.name}
                                                </h3>
                                                <div className="flex flex-col gap-1">
                                                    <div className="text-muted-foreground flex gap-1 items-center">
                                                        <Activity className="size-3 flex-shrink-0"/>
                                                        <span className="text-xs">{data.status}</span>
                                                    </div>
                                                    <div className="text-muted-foreground flex gap-1 items-center">
                                                        <CalendarRange className='size-3 flex-shrink-0'/>
                                                        <span
                                                            className="text-xs line-clamp-1"
                                                            title={`${item.chaptersLatest !== null ? `Chương ${item?.chaptersLatest[0]?.chapter_name}` : 'Đang cập nhật'}`}
                                                        >{`${item.chaptersLatest !== null ? `Chương ${item?.chaptersLatest[0]?.chapter_name}` : 'Đang cập nhật'}`}</span>
                                                    </div>
                                                </div>
                                            </figcaption>
                                        </figure>
                                    </Link>
                                );
                            })}
                    </div>
                </section>
            </section>
        </div>
    );
};

export default DetailPage;
