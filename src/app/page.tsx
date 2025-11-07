// ** React
import { Suspense } from 'react';

// ** Next
import type { Metadata } from 'next';

// ** Layouts
import DefaultLayout from '@/layouts/DefaultLayout';

// ** Modules
import NavbarGenre from '@/modules/home/NavbarGenre';
import HeroSectionWrapper from '@/modules/home/HeroSectionWrapper';
import ModernNewComicWrapper from '@/modules/home/ModernNewComicWrapper';
import ModernComingSoon from '@/modules/home/ModernComingSoon';
import ModernPublishing from '@/modules/home/ModernPublishing';
import ModernComplete from '@/modules/home/ModernComplete';

// ** Skeletons
import GridCarouselSkeleton from '@/skeleton/home/GridCarouselSkeleton';
import NavbarGenreSkeleton from '@/skeleton/home/NavbarGenreSkeleton';
import ListComicSkeleton from '@/skeleton/home/ListComicSkeleton';
import NewComicSkeleton from '@/skeleton/home/NewComicSkeleton';

export const metadata: Metadata = {
    title: 'Đọc Truyện Tranh Online Miễn Phí - Manhwa, Manga, Manhua Hay Nhất',
    description:
        'Truyenhayy.online - Kho truyện tranh khổng lồ với 10,000+ bộ manhwa, manga, manhua hay nhất. Cập nhật mới nhất mỗi ngày: ngôn tình, tu tiên, kiếm hiệp, hành động, trinh thám. Đọc miễn phí, không quảng cáo!',
    keywords: [
        'doc truyen tranh online',
        'truyen tranh hay',
        'truyenhayy',
        'manga hay nhat',
        'manhwa hay nhat',
        'manhua hay nhat',
        'doc manga online',
        'doc manhwa online',
        'truyen ngon tinh hay',
        'truyen tu tien',
        'truyen kiem hiep',
        'truyen full',
        'truyen hot',
        'doc truyen mien phi'
    ],
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Đọc Truyện Tranh Online Miễn Phí - Manhwa, Manga, Manhua Hay Nhất',
        description: 'Kho truyện tranh khổng lồ với 10,000+ bộ manhwa, manga, manhua. Cập nhật mới nhất mỗi ngày!',
        url: 'https://truyenhayy.online',
        type: 'website',
    },
};

const Home = () => {
    return (
        <DefaultLayout>
            <main className="relative">
                {/* Global gradient overlay to blend sections */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/3 to-transparent"></div>
                    <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-slate-950/60 via-purple-950/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[800px] bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10">
                    {/* Hero Section - Bento Grid */}
                    <Suspense fallback={<GridCarouselSkeleton />}>
                        <HeroSectionWrapper />
                    </Suspense>

                    {/* Genre Navigation */}
                    <Suspense fallback={<NavbarGenreSkeleton />}>
                        <NavbarGenre />
                    </Suspense>

                    {/* New Comics - Masonry Grid with Filters */}
                    <Suspense fallback={<NewComicSkeleton />}>
                        <ModernNewComicWrapper />
                    </Suspense>

                    {/* Coming Soon - Horizontal Scroll */}
                    <Suspense fallback={<ListComicSkeleton />}>
                        <ModernComingSoon />
                    </Suspense>

                    {/* Publishing - Horizontal Scroll */}
                    <Suspense fallback={<ListComicSkeleton />}>
                        <ModernPublishing />
                    </Suspense>

                    {/* Complete - Horizontal Scroll */}
                    <Suspense fallback={<ListComicSkeleton />}>
                        <ModernComplete />
                    </Suspense>
                </div>
            </main>
        </DefaultLayout>
    );
};

export default Home;
