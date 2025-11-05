// ** Next
import Link from 'next/link';

// ** Shadcn ui
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';

// ** action service
import {
    getListCategoryComic,
    getListNewComic,
} from '@/lib/actions/dynamic.page';

// ** Components
import ComicImage from '@/components/common/ComicImage';

const DynamicPageStatus = async ({
    category,
    pageQuery,
    title = false,
}: {
    category: string;
    pageQuery: number;
    title?: boolean;
}) => {
    let res;
    if (category == 'the-loai/tat-ca') {
        res = await getListNewComic(pageQuery);
    } else {
        res = await getListCategoryComic(category, pageQuery);
    }

    const itemsPerPage = 24;

    const totalItems = res?.data?.params?.pagination?.totalItems || 0;
    const dataGenre: IComic[] = res?.data?.items;

    return (
        <section className="wrapper pt-6 pb-20">
            {title && (
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        {res?.data?.titlePage}
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5 mb-10">
                {dataGenre.map((item, index) => {
                    return (
                        <Link 
                            key={index}
                            href={`/truyen-tranh/${item.slug}`}
                            className="group"
                        >
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1">
                                <div className="aspect-[2/3] relative overflow-hidden">
                                    <ComicImage
                                        src={`${res?.data?.APP_DOMAIN_CDN_IMAGE}/uploads/comics/${item.thumb_url}`}
                                        imgSize="lg"
                                        alt={item.name}
                                        priority={index <= 0 ? true : false}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="p-3">
                                    <h2 
                                        className="text-sm font-medium line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                                        title={item.name}
                                    >
                                        {item.name}
                                    </h2>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <div className="flex justify-center">
                <div className="inline-flex rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 p-1 border border-purple-500/20">
                    <PaginationWithLinks
                        page={pageQuery}
                        pageSize={itemsPerPage}
                        totalCount={totalItems}
                    />
                </div>
            </div>
        </section>
    );
};

export default DynamicPageStatus;
