'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, ChevronLeft, ChevronRight, Filter, Sparkles, Flame, Heart, Zap } from 'lucide-react';

interface ICompactGenreFilterProps {
    data: IGenres[];
    slug: string;
}

// Map genre to icon
const getGenreIcon = (genreName: string) => {
    const name = genreName.toLowerCase();
    if (name.includes('hành động') || name.includes('action')) return Zap;
    if (name.includes('lãng mạn') || name.includes('romance') || name.includes('ngôn tình')) return Heart;
    if (name.includes('hot') || name.includes('nổi bật')) return Flame;
    return Sparkles;
};

const CompactGenreFilter = ({ data, slug }: ICompactGenreFilterProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const activeRef = useRef<HTMLAnchorElement | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const allGenres = [
        { name: 'Tất cả', slug: 'tat-ca', description: 'Tất cả thể loại' },
        ...data,
    ];

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useLayoutEffect(() => {
        checkScroll();
        // Auto scroll to active item
        if (activeRef.current && scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const activeElement = activeRef.current;
            const containerRect = container.getBoundingClientRect();
            const activeRect = activeElement.getBoundingClientRect();
            
            const scrollLeft = activeElement.offsetLeft - (containerRect.width / 2) + (activeRect.width / 2);
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    }, [slug]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
            setTimeout(checkScroll, 100);
        }
    };

    return (
        <div className="relative bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 border-b border-purple-500/10">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-blue-600/5 pointer-events-none" />
            
            <div className="wrapper relative py-4">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg shadow-purple-500/20">
                            <Filter className="w-4 h-4 text-white" />
                        </div>
                        <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Lọc theo thể loại
                        </h2>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-purple-500/20 to-transparent" />
                </div>

                {/* Scrollable Genre List */}
                <div className="relative group">
                    {/* Left scroll button with smooth fade */}
                    {canScrollLeft && (
                        <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center pointer-events-none">
                            <div className="relative h-full flex items-center pr-8 pl-0 pointer-events-none">
                                {/* Multi-layer gradient fade for smooth effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-background via-background to-background/0 pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent pointer-events-none blur-sm" />
                                
                                <button
                                    onClick={() => scroll('left')}
                                    className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-2.5 rounded-full shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 pointer-events-auto opacity-0 group-hover:opacity-100 ml-2"
                                    aria-label="Scroll left"
                                >
                                    <ChevronLeft className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Genres container */}
                    <div
                        ref={scrollContainerRef}
                        onScroll={checkScroll}
                        className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth py-2 px-1"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {allGenres.map((item) => {
                            const isActive = item.slug === slug;
                            const Icon = getGenreIcon(item.name);
                            
                            return (
                                <div key={item.slug} className="flex-shrink-0">
                                    {isActive ? (
                                        <h1>
                                            <Link
                                                ref={activeRef}
                                                href={`/the-loai/${item.slug}.html`}
                                                className="group/item inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-medium whitespace-nowrap bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 transition-all duration-300 relative overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 opacity-0 group-hover/item:opacity-20 transition-opacity duration-500" />
                                                <Icon className="w-4 h-4 relative z-10" />
                                                <span className="relative z-10">{item.name}</span>
                                                <div className="relative z-10 p-0.5 bg-white/20 rounded-full">
                                                    <Check className="w-3 h-3" />
                                                </div>
                                            </Link>
                                        </h1>
                                    ) : (
                                        <h2>
                                            <Link
                                                href={`/the-loai/${item.slug}.html`}
                                                className="group/item inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-medium whitespace-nowrap bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 relative overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover/item:from-purple-600/5 group-hover/item:to-pink-600/5 transition-all duration-300" />
                                                <Icon className="w-4 h-4 text-purple-600 group-hover/item:text-pink-600 transition-colors duration-300 relative z-10" />
                                                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text group-hover/item:text-transparent transition-all duration-300 relative z-10">
                                                    {item.name}
                                                </span>
                                            </Link>
                                        </h2>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Right scroll button with smooth fade */}
                    {canScrollRight && (
                        <div className="absolute right-0 top-0 bottom-0 z-20 flex items-center pointer-events-none">
                            <div className="relative h-full flex items-center pl-8 pr-0 pointer-events-none">
                                {/* Multi-layer gradient fade for smooth effect */}
                                <div className="absolute inset-0 bg-gradient-to-l from-background via-background to-background/0 pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-l from-background/50 to-transparent pointer-events-none blur-sm" />
                                
                                <button
                                    onClick={() => scroll('right')}
                                    className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-2.5 rounded-full shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 pointer-events-auto opacity-0 group-hover:opacity-100 mr-2"
                                    aria-label="Scroll right"
                                >
                                    <ChevronRight className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Scroll indicator */}
                <div className="flex justify-center gap-1 mt-3">
                    <div className={`h-1 rounded-full transition-all duration-300 ${canScrollLeft ? 'w-2 bg-purple-600/50' : 'w-6 bg-purple-600'}`} />
                    <div className={`h-1 w-2 rounded-full transition-all duration-300 ${canScrollLeft && canScrollRight ? 'bg-pink-600' : 'bg-pink-600/20'}`} />
                    <div className={`h-1 rounded-full transition-all duration-300 ${canScrollRight ? 'w-2 bg-blue-600/50' : 'w-6 bg-blue-600'}`} />
                </div>
            </div>
        </div>
    );
};

export default CompactGenreFilter;
