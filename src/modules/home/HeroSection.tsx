'use client';

// ** Next
import Link from 'next/link';

// ** Components
import ComicImage from '@/components/common/ComicImage';
import { Button } from '@/components/ui/button';

// ** Configs
import { CONFIG_API_OUT_SIDE } from '@/configs/api';

// ** Icons
import { TrendingUp, Star, Eye, Clock } from 'lucide-react';

const HeroSection = ({ data }: { data: IComic[] }) => {
    // Featured comic (main highlight)
    const featured = data[0];
    
    // Secondary highlights
    const highlights = data.slice(1, 5);
    
    // Trending list
    const trending = data.slice(5, 9);

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 py-8 sm:py-12 md:py-16">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            <div className="wrapper relative z-10">
                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
                    
                    {/* Main Featured Comic - Large Card */}
                    <div className="lg:col-span-8 lg:row-span-2">
                        <Link href={`/truyen-tranh/${featured.slug}`}>
                            <div 
                                className="group relative h-[400px] md:h-[500px] lg:h-full rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-500"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <ComicImage
                                        src={`${CONFIG_API_OUT_SIDE.IMAGE.INDEX}/${featured.thumb_url}`}
                                        alt={featured.name}
                                        size="full"
                                        imgSize="3xl"
                                        className="object-cover w-full h-full"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                                    {/* Top badges */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex gap-2">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-yellow-500/90 to-orange-500/90 backdrop-blur-md rounded-full text-xs font-bold text-white shadow-lg">
                                                <Star className="w-3.5 h-3.5 fill-white" />
                                                FEATURED
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/90 backdrop-blur-md rounded-full text-xs font-bold text-white shadow-lg">
                                                <TrendingUp className="w-3.5 h-3.5" />
                                                HOT
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bottom content */}
                                    <div className="space-y-4 transform transition-all duration-500 group-hover:translate-y-0 translate-y-2">
                                        <div className="flex flex-wrap gap-2">
                                            {featured.category?.slice(0, 3).map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 backdrop-blur-md bg-white/10 hover:bg-white/20 rounded-full text-xs font-medium text-white/90 transition-colors"
                                                >
                                                    {tag?.name}
                                                </span>
                                            ))}
                                        </div>

                                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                                            {featured.name}
                                        </h2>

                                        <p className="text-white/80 text-sm md:text-base line-clamp-2 max-w-2xl">
                                            Khám phá câu chuyện hấp dẫn với những tình tiết ly kỳ, nhân vật sống động và thế giới tưởng tượng đầy màu sắc.
                                        </p>

                                        <div className="flex items-center gap-4 text-white/70 text-sm">
                                            <span className="flex items-center gap-1.5">
                                                <Eye className="w-4 h-4" />
                                                {(featured._id ? parseInt(featured._id.slice(-6), 16) % 50000 + 10000 : 25000).toLocaleString('en-US')}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4" />
                                                Mới cập nhật
                                            </span>
                                        </div>

                                        <Button 
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-6 text-lg shadow-2xl shadow-purple-500/50 group-hover:shadow-purple-500/70 transition-all duration-300 group-hover:scale-105"
                                        >
                                            Đọc Ngay
                                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </Button>
                                    </div>
                                </div>

                                {/* Hover effect overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:via-pink-600/10 group-hover:to-blue-600/10 transition-all duration-500"></div>
                            </div>
                        </Link>
                    </div>

                    {/* Top Right - Secondary Highlights */}
                    <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
                        {highlights.slice(0, 2).map((comic, index) => (
                            <Link 
                                key={index} 
                                href={`/truyen-tranh/${comic.slug}`}
                                className="group relative h-[180px] md:h-[240px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02]"
                            >
                                <div className="absolute inset-0">
                                    <ComicImage
                                        src={`${CONFIG_API_OUT_SIDE.IMAGE.INDEX}/${comic.thumb_url}`}
                                        alt={comic.name}
                                        size="full"
                                        imgSize="lg"
                                        className="object-cover w-full h-full"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                                </div>

                                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/80 backdrop-blur-sm rounded-full text-xs font-bold text-white w-fit mb-2">
                                        #{index + 2}
                                    </span>
                                    <h3 className="text-white font-bold text-base md:text-lg line-clamp-2 group-hover:text-blue-300 transition-colors">
                                        {comic.name}
                                    </h3>
                                    <div className="flex gap-1 mt-2">
                                        {comic.category?.slice(0, 2).map((tag, i) => (
                                            <span key={i} className="text-xs px-2 py-0.5 bg-white/10 backdrop-blur-sm rounded-full text-white/80">
                                                {tag?.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Bottom Left - Grid of 2 */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                        {highlights.slice(2, 4).map((comic, index) => (
                            <Link 
                                key={index} 
                                href={`/truyen-tranh/${comic.slug}`}
                                className="group relative h-[200px] md:h-[240px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-white/10 hover:border-pink-500/50 transition-all duration-300"
                            >
                                <div className="absolute inset-0">
                                    <ComicImage
                                        src={`${CONFIG_API_OUT_SIDE.IMAGE.INDEX}/${comic.thumb_url}`}
                                        alt={comic.name}
                                        size="full"
                                        imgSize="lg"
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                </div>

                                <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-end">
                                    <h3 className="text-white font-bold text-sm md:text-base line-clamp-2 group-hover:text-pink-300 transition-colors">
                                        {comic.name}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Bottom Right - Trending List */}
                    <div className="lg:col-span-3 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-white/10 p-4 md:p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-white font-bold text-lg">Trending</h3>
                        </div>
                        
                        <div className="space-y-3">
                            {trending.map((comic, index) => (
                                <Link 
                                    key={index}
                                    href={`/truyen-tranh/${comic.slug}`}
                                    className="group flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all duration-200"
                                >
                                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                        index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                                        index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800' :
                                        index === 2 ? 'bg-gradient-to-r from-orange-300 to-orange-500 text-white' :
                                        'bg-white/10 text-white/60'
                                    }`}>
                                        {index + 1}
                                    </span>
                                    
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white text-sm font-medium line-clamp-1 group-hover:text-purple-300 transition-colors">
                                            {comic.name}
                                        </p>
                                        <p className="text-white/50 text-xs">
                                            {(comic._id ? parseInt(comic._id.slice(-5), 16) % 10000 + 1000 : (index + 1) * 1500).toLocaleString('en-US')} views
                                        </p>
                                    </div>

                                    <TrendingUp className="w-4 h-4 text-green-400 flex-shrink-0" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </section>
    );
};

export default HeroSection;
