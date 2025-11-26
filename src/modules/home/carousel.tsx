'use client';

// ** React
import { useEffect, useRef, useState } from 'react';

// ** Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';

// ** Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// ** Components
import { Tag } from '@/components/common/Tag';
import ComicImage from '@/components/common/ComicImage';
import { Heading } from '@/components/typography/Heading';

// ** Shadcn ui
import { Button } from '@/components/ui/button';

// ** utils
import ClientTimeAgo from '@/components/common/ClientTimeAgo';

// ** next progress bar
import { useRouter } from 'next-nprogress-bar';

// ** Skeleton
import ListComicSkeleton from '@/skeleton/home/ListComicSkeleton';

// ** Lucide Icon
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({
    data,
    title,
    bgColor = false,
    href = '/',
    titleSeo = false,
}: {
    data: IComic[];
    title: string;
    bgColor?: boolean;
    href: string;
    titleSeo?: boolean;
}) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const router = useRouter();

    const [atBeginning, setAtBeginning] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    // component mounted ?
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <ListComicSkeleton />;
    }

    // limit 20
    const displayData = data.slice(0, 20);

    return (
        <section
            className={`${
                bgColor
                    ? 'bg-gradient-to-b from-slate-50/50 to-background dark:from-slate-900/30 dark:to-secondary'
                    : 'bg-gradient-to-b from-background to-background/50 dark:from-secondary dark:to-secondary/50'
            } py-8 sm:py-12 md:py-16`}
        >
            <div className="wrapper">
                <header className="mb-8 sm:mb-10 md:mb-12">
                    <div className="flex items-center justify-between">
                        {titleSeo ? (
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                                <a 
                                    href={href}
                                    className="gradient-text hover:scale-105 transition-transform duration-200 inline-flex items-center gap-3"
                                >
                                    <div className="w-1 h-8 sm:h-10 md:h-12 lg:h-14 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
                                    {title}
                                </a>
                            </h1>
                        ) : (
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                                <a 
                                    href={href}
                                    className="gradient-text hover:scale-105 transition-transform duration-200 inline-flex items-center gap-3"
                                >
                                    <div className="w-1 h-8 sm:h-10 md:h-12 lg:h-14 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
                                    {title}
                                </a>
                            </h2>
                        )}
                        <a 
                            href={href}
                            className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                        >
                            Xem tất cả →
                        </a>
                    </div>
                </header>

                <div className="relative">
                    <Swiper
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        modules={[Autoplay, Pagination]}
                        onReachBeginning={() => setAtBeginning(true)}
                        onReachEnd={() => setAtEnd(true)}
                        onFromEdge={() => {
                            setAtBeginning(false);
                            setAtEnd(false);
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 3,
                                slidesPerGroup: 3,
                                spaceBetween: 6,
                            },
                            640: {
                                slidesPerView: 3,
                                slidesPerGroup: 3,
                                spaceBetween: 8,
                            },
                            768: {
                                slidesPerView: 4,
                                slidesPerGroup: 4,
                                spaceBetween: 10,
                            },
                            1024: {
                                slidesPerView: 5,
                                slidesPerGroup: 5,
                                spaceBetween: 12,
                            },
                        }}
                    >
                        {displayData.map((item, i) => (
                            <SwiperSlide key={i}>
                                <figure className="flex flex-col group hover-lift">
                                    <div
                                        className="relative overflow-hidden modern-card"
                                        title={item.name}
                                    >
                                        <ComicImage
                                            src={`https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`}
                                            alt={item.name}
                                            priority={i <= 0}
                                            rounded="md"
                                            size="full"
                                            imgSize="xl"
                                        />
                                        <div
                                            className="absolute top-0 left-0 w-full h-full rounded-[12px] cursor-pointer bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:from-black/70 transition-all duration-300"
                                            onClick={() =>
                                                router.push(
                                                    `/truyen-tranh/${item.slug}`
                                                )
                                            }
                                        ></div>
                                        
                                        {/* Modern gradient overlay for better readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[12px]"></div>
                                        <ul className="absolute bottom-2.5 hidden sm:flex gap-1 sm:gap-2 md:gap-2.5 lg:gap-3 items-center overflow-hidden w-full px-2 sm:px-[12px] scroll-sub">
                                            {item.category
                                                ?.slice(0, 2)
                                                .map((tag, j) => (
                                                    <Tag
                                                        key={j}
                                                        href={`the-loai/${tag?.slug}.html`}
                                                        title={tag?.name}
                                                    >
                                                        {tag?.name}
                                                    </Tag>
                                                ))}
                                        </ul>
                                    </div>
                                    <figcaption className="sm:w-[180px] mt-3">
                                        <Heading
                                            as="h3"
                                            title={item.name}
                                            href={`/truyen-tranh/${item.slug}`}
                                            className="mb-2 group-hover:text-primary transition-colors duration-200"
                                            size="lgResponsive"
                                        />
                                        <div
                                            className="text-xs sm:text-sm line-clamp-1 text-muted-foreground"
                                        >
                                            <span className="inline-flex items-center gap-1">
                                                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                                                Cập nhật
                                                <span className="text-primary font-medium">
                                                    <ClientTimeAgo date={item.updatedAt} />
                                                </span>
                                            </span>
                                        </div>
                                    </figcaption>
                                </figure>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Prev button */}
                    <Button
                        shape="circle"
                        className={`
              absolute 
              -left-6 sm:-left-[36px] z-20 top-1/3 -translate-y-1/3
              bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl 
              border-2 border-purple-500/30 hover:border-purple-500/50 
              hover:from-purple-500/30 hover:to-pink-500/30
              shadow-lg hover:shadow-purple-500/25
              ${atBeginning ? 'hidden' : ''}
            `}
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        <ChevronLeft className="size-6 sm:size-8" />
                    </Button>

                    {/* Next button */}
                    <Button
                        shape="circle"
                        className={`
              absolute
              -right-6 sm:-right-[34px] z-20 top-1/3 -translate-y-1/3
              bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl 
              border-2 border-purple-500/30 hover:border-purple-500/50 
              hover:from-purple-500/30 hover:to-pink-500/30
              shadow-lg hover:shadow-purple-500/25
              ${atEnd ? 'hidden' : ''}
            `}
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        <ChevronRight className="size-6 sm:size-8" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Carousel;
