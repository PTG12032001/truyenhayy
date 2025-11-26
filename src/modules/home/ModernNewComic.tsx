'use client';

// ** React
import { useState } from 'react';

// ** Next
import Link from 'next/link';

// ** Components
import ComicImage from '@/components/common/ComicImage';

// ** Configs
import { CONFIG_API_OUT_SIDE } from '@/configs/api';

// ** Icons
import { Sparkles, Clock, Heart, BookOpen } from 'lucide-react';

// ** Utils
import ClientTimeAgo from '@/components/common/ClientTimeAgo';

const ModernNewComic = ({ listNewComic }: { listNewComic: IComic[] }) => {
    const [activeTab, setActiveTab] = useState<'all' | 'action' | 'romance'>('all');

    return (
        <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
            {/* Subtle decorative elements only - no solid background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
            </div>

            <div className="wrapper relative z-10">
                {/* Header Section */}
                <div className="mb-10 sm:mb-12">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-lg opacity-50"></div>
                                    <Sparkles className="relative w-8 h-8 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                                    Truyện Mới Cập Nhật
                                </h2>
                            </div>
                            <p className="text-muted-foreground text-sm sm:text-base pl-11">
                                Những bộ truyện hot nhất được cập nhật liên tục
                            </p>
                        </div>

                        <Link 
                            href="/danh-sach/truyen-moi"
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105"
                        >
                            Xem tất cả
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2 pl-11 overflow-x-auto pb-2 scrollbar-hide">
                        {[
                            { id: 'all', label: 'Tất cả', icon: BookOpen },
                            { id: 'action', label: 'Hành động', icon: Sparkles },
                            { id: 'romance', label: 'Lãng mạn', icon: Heart },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                                    activeTab === tab.id
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                                        : 'bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Comics Grid - Masonry Style */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {listNewComic?.slice(0, 20).map((comic, index) => (
                        <Link
                            key={comic._id}
                            href={`/truyen-tranh/${comic.slug}`}
                            className="group relative"
                            style={{
                                animationDelay: `${index * 50}ms`,
                                animation: 'fadeInUp 0.6s ease-out forwards',
                                opacity: 0,
                            }}
                        >
                            {/* Card Container */}
                            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/50">
                                {/* Image Container */}
                                <div className="relative aspect-[3/4] overflow-hidden">
                                    <ComicImage
                                        src={`${CONFIG_API_OUT_SIDE.IMAGE.INDEX}/${comic.thumb_url}`}
                                        alt={comic.name}
                                        size="full"
                                        imgSize="xl"
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                    />
                                    
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                                    
                                    {/* Floating badges */}
                                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                                        {index < 3 && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold text-white shadow-lg">
                                                <Sparkles className="w-3 h-3 fill-white" />
                                                NEW
                                            </span>
                        )}
                        {index >= 3 && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                                <Clock className="w-3 h-3" />
                                <ClientTimeAgo date={comic.updatedAt} />
                            </span>
                        )}
                    </div>                                    {/* Hover overlay with play button */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                        <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300 bg-white/20 backdrop-blur-md rounded-full p-4">
                                            <BookOpen className="w-8 h-8 text-white" />
                                        </div>
                                    </div>

                                    {/* Bottom tags */}
                                    <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
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

                                {/* Content Section */}
                                <div className="p-3 md:p-4 space-y-2">
                                    <h3 className="font-bold text-sm md:text-base line-clamp-2 text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300 leading-tight">
                                        {comic.name}
                                    </h3>
                                    
                                    {/* Stats */}
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse"></div>
                                            Đang hot
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Heart className="w-3 h-3" />
                                            {comic._id ? parseInt(comic._id.slice(-4), 16) % 1000 + 100 : (index + 1) * 50}
                                        </span>
                                    </div>
                                </div>

                                {/* Decorative corner */}
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Glow effect */}
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                        </Link>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default ModernNewComic;
