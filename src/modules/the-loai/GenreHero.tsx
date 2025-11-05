'use client';

import { useEffect, useState } from 'react';
import { Sparkles, TrendingUp, BookOpen, Users } from 'lucide-react';

interface GenreHeroProps {
    genreName: string;
    totalComics?: number;
}

const GenreHero = ({ genreName, totalComics = 0 }: GenreHeroProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Deterministic particles based on genre name
    const particles = Array.from({ length: 20 }, (_, i) => {
        const hash = genreName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return {
            id: i,
            left: `${((hash * (i + 1)) % 100)}%`,
            top: `${((hash * (i + 2)) % 100)}%`,
            delay: `${(i * 0.5) % 3}s`,
            duration: `${3 + (i % 3)}s`,
        };
    });

    const stats = [
        {
            icon: BookOpen,
            label: 'Tổng truyện',
            value: totalComics.toLocaleString('en-US'),
            gradient: 'from-purple-600 to-purple-400',
        },
        {
            icon: TrendingUp,
            label: 'Đang hot',
            value: '100+',
            gradient: 'from-pink-600 to-pink-400',
        },
        {
            icon: Users,
            label: 'Đang đọc',
            value: '10K+',
            gradient: 'from-blue-600 to-blue-400',
        },
    ];

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20 border-b border-purple-500/20">
            {/* Animated background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 animate-gradient-x" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]" />
            </div>

            {/* Floating particles */}
            {mounted && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {particles.map((particle) => (
                        <div
                            key={particle.id}
                            className="absolute w-1 h-1 bg-purple-500/30 rounded-full animate-float"
                            style={{
                                left: particle.left,
                                top: particle.top,
                                animationDelay: particle.delay,
                                animationDuration: particle.duration,
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="wrapper relative py-12 md:py-16">
                <div className="text-center mb-8">
                    {/* Icon decoration */}
                    <div className="inline-flex items-center justify-center mb-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-xl opacity-50 animate-pulse" />
                            <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-2xl shadow-xl">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
                            {genreName}
                        </span>
                    </h1>
                    
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Khám phá kho tàng truyện tranh {genreName.toLowerCase()} hay nhất, mới nhất
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="group relative"
                                style={{
                                    animation: mounted ? `fadeInUp 0.5s ease-out ${index * 0.1}s both` : 'none',
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                                <div className="relative bg-background/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-4 md:p-6 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                                    <div className={`inline-flex p-2 md:p-3 rounded-xl bg-gradient-to-br ${stat.gradient} mb-3`}>
                                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                    </div>
                                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs md:text-sm text-muted-foreground mt-1">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom wave decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
        </div>
    );
};

export default GenreHero;
