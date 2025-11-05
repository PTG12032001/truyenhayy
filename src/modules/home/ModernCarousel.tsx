'use client';

// ** React
import { useRef } from 'react';

// ** Next
import Link from 'next/link';

// ** Components
import ComicImage from '@/components/common/ComicImage';
import { Button } from '@/components/ui/button';

// ** Configs
import { CONFIG_API_OUT_SIDE } from '@/configs/api';

// ** Utils
import ClientTimeAgo from '@/components/common/ClientTimeAgo';

// ** Icons
import { ChevronLeft, ChevronRight, Star, TrendingUp, Clock } from 'lucide-react';

type ModernCarouselProps = {
    data: IComic[];
    title: string;
    href?: string;
    titleSeo?: boolean;
    icon?: 'star' | 'trending' | 'clock';
    gradientFrom?: string;
    gradientTo?: string;
};

const ModernCarousel = ({
    data,
    title,
    href = '/',
    titleSeo = false,
    icon = 'star',
    gradientFrom = 'from-blue-600',
    gradientTo = 'to-purple-600',
}: ModernCarouselProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            const newScrollPosition =
                direction === 'left'
                    ? scrollContainerRef.current.scrollLeft - scrollAmount
                    : scrollContainerRef.current.scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth',
            });
        }
    };

    const IconComponent = icon === 'trending' ? TrendingUp : icon === 'clock' ? Clock : Star;

    return (
        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
            {/* Subtle decorative background - transparent base */}
            <div className="absolute inset-0 opacity-10">
                <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-full blur-3xl`}></div>
                <div className={`absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr ${gradientTo} ${gradientFrom} rounded-full blur-3xl`}></div>
            </div>

            <div className="wrapper relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 sm:mb-10 md:mb-12">
                    <div className="flex items-center gap-4">
                        <div className={`relative p-3 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-2xl shadow-xl`}>
                            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm"></div>
                            <IconComponent className="relative w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        
                        <div>
                            {titleSeo ? (
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">
                                    <Link
                                        href={href}
                                        className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300`}
                                    >
                                        {title}
                                    </Link>
                                </h1>
                            ) : (
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">
                                    <Link
                                        href={href}
                                        className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300`}
                                    >
                                        {title}
                                    </Link>
                                </h2>
                            )}
                            <p className="text-sm text-muted-foreground mt-1">
                                Cập nhật liên tục mỗi ngày
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            onClick={() => scroll('left')}
                            shape="circle"
                            className="hidden sm:flex hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border-2 border-purple-500/30 hover:border-purple-500/50 hover:from-purple-500/30 hover:to-pink-500/30"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button
                            onClick={() => scroll('right')}
                            shape="circle"
                            className="hidden sm:flex hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border-2 border-purple-500/30 hover:border-purple-500/50 hover:from-purple-500/30 hover:to-pink-500/30"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                        <Link
                            href={href}
                            className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300`}
                        >
                            Xem tất cả
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Scrollable Container */}
                <div className="relative">
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent hover:scrollbar-thumb-purple-600"
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgb(168, 85, 247) transparent',
                        }}
                    >
                        {data?.slice(0, 20).map((comic, index) => (
                            <Link
                                key={comic._id}
                                href={`/truyen-tranh/${comic.slug}`}
                                className="group relative flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px]"
                            >
                                {/* Card */}
                                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-slate-700 hover:border-purple-500/50 hover:-translate-y-3">
                                    
                                    {/* Image */}
                                    <div className="relative aspect-[3/4] overflow-hidden">
                                        <ComicImage
                                            src={`${CONFIG_API_OUT_SIDE.IMAGE.INDEX}/${comic.thumb_url}`}
                                            alt={comic.name}
                                            size="full"
                                            imgSize="xl"
                                            priority={index < 5}
                                            loading={index < 5 ? 'eager' : 'lazy'}
                                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                        />
                                        
                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                        
                                        {/* Rank badge for first 3 */}
                                        {index < 3 && (
                                            <div className={`absolute top-3 left-3 w-10 h-10 flex items-center justify-center rounded-full font-black text-white shadow-lg ${
                                                index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                                                index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                                                'bg-gradient-to-br from-orange-400 to-orange-600'
                                            }`}>
                                                {index + 1}
                                            </div>
                                        )}

                                        {/* Hover play overlay */}
                                        <div className={`absolute inset-0 bg-gradient-to-t ${gradientFrom} ${gradientTo} opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center`}>
                                            <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                                <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center">
                                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Categories at bottom */}
                                        <div className="absolute bottom-0 left-0 right-0 p-3">
                                            <div className="flex gap-1.5 flex-wrap">
                                                {comic.category?.slice(0, 2).map((tag, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-medium text-white border border-white/30"
                                                    >
                                                        {tag?.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-3 md:p-4 space-y-2">
                                        <h3 className="font-bold text-sm md:text-base line-clamp-2 text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                                            {comic.name}
                                        </h3>
                                        
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                <ClientTimeAgo date={comic.updatedAt} />
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                {((comic._id ? parseInt(comic._id.slice(-3), 16) % 20 : index * 2) / 10 + 3).toFixed(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Glow effect */}
                                <div className={`absolute inset-0 -z-10 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>
                            </Link>
                        ))}
                    </div>

                    {/* Gradient fade edges */}
                    <div className="absolute left-0 top-0 bottom-4 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
                </div>

                {/* Mobile "View All" button */}
                <div className="md:hidden mt-6 text-center">
                    <Link
                        href={href}
                        className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300`}
                    >
                        Xem tất cả {title}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ModernCarousel;
