'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import useTailwindBreakpoints from '@/hooks/useTailwindBreakpoints';
import Link from 'next/link';
import { Check, Sparkles, Flame, Heart, Zap } from 'lucide-react';

interface IListGenreProps {
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

const ModernListGenre = ({ data, slug }: IListGenreProps) => {
    const activeRef = useRef<HTMLAnchorElement | null>(null);
    const { isSm } = useTailwindBreakpoints();
    const [mounted, setMounted] = useState(false);

    useLayoutEffect(() => {
        setMounted(true);
        if (!isSm && activeRef.current) {
            const parent = activeRef.current.closest('div');
            if (parent) {
                const parentRect = parent.getBoundingClientRect();
                const itemRect = activeRef.current.getBoundingClientRect();
                parent.scrollTop += itemRect.top - parentRect.top + 4;
            }
        }
    }, [slug, isSm]);

    const allGenres = [
        ...data,
        { name: 'Tất cả', slug: 'tat-ca', description: 'Tất cả thể loại' }
    ];

    return (
        <div className="wrapper py-8">
            {/* Section header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full" />
                    <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Chọn thể loại
                    </h2>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-500/20 to-transparent" />
            </div>

            {/* Genre grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                {allGenres.map((item, index) => {
                    const isActive = item.slug === slug;
                    const Icon = getGenreIcon(item.name);
                    
                    return (
                        <div
                            key={item.slug}
                            style={{
                                animation: mounted ? `fadeInUp 0.4s ease-out ${index * 0.03}s both` : 'none',
                            }}
                        >
                            {isActive ? (
                                <h1>
                                    <Link
                                        ref={activeRef}
                                        href={`/the-loai/${item.slug}.html`}
                                        className="group block"
                                    >
                                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 p-[2px] shadow-xl shadow-purple-500/30">
                                            <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-4 h-full">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                                        <Icon className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div className="p-1 bg-white/20 rounded-full backdrop-blur-sm">
                                                        <Check className="w-4 h-4 text-white" />
                                                    </div>
                                                </div>
                                                <h3 className="text-white font-bold text-sm mb-1 line-clamp-1">
                                                    {item.name}
                                                </h3>
                                                <div className="flex items-center gap-1 text-white/80 text-xs">
                                                    <Sparkles className="w-3 h-3" />
                                                    <span>Đang xem</span>
                                                </div>
                                            </div>
                                            {/* Animated border glow */}
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 opacity-75 blur-xl animate-pulse" />
                                        </div>
                                    </Link>
                                </h1>
                            ) : (
                                <h2>
                                    <Link
                                        href={`/the-loai/${item.slug}.html`}
                                        className="group block"
                                    >
                                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 border border-purple-500/10 hover:border-purple-500/30 p-4 h-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="p-2 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300">
                                                    <Icon className="w-5 h-5 text-purple-600 group-hover:text-pink-600 transition-colors duration-300" />
                                                </div>
                                            </div>
                                            <h3 className="font-bold text-sm mb-1 line-clamp-1 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text group-hover:text-transparent transition-all duration-300">
                                                {item.name}
                                            </h3>
                                            <div className="text-muted-foreground/60 text-xs">
                                                Xem ngay →
                                            </div>
                                            
                                            {/* Hover gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/5 group-hover:to-pink-600/5 rounded-2xl transition-all duration-300 pointer-events-none" />
                                        </div>
                                    </Link>
                                </h2>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ModernListGenre;
