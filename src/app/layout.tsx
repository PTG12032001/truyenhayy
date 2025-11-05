// ** React
import { Suspense } from 'react';

// ** Next
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

// ** Styles
import './globals.css';

// ** Components
import { ThemeProvider } from '@/theme/ThemeProvider';
import NprogressWrapper from '@/components/common/nprogress.wrapper';
import ToasterCustom from '@/components/common/ToasterCustom';
import ScrollToTop from '@/components/common/ScrollToTop';

// ** Vercel
import { SpeedInsights } from '@vercel/speed-insights/next';

// ** PostHog
import { PostHogProvider } from '@/app/providers';

// ** Google Analytics
import GoogleAnalytics from '@/components/common/GoogleAnalytics';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
    preload: true,
    adjustFontFallback: true,
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_YOUR_WEBSITE || ''),
    title: {
        default: 'Truyenhayy.online - Đọc Truyện Tranh Online Miễn Phí | Manhwa, Manga, Manhua Hay Nhất',
        template: '%s | Truyenhayy.online'
    },
    description:
        'Đọc truyện tranh online miễn phí tại Truyenhayy.online. Kho truyện tranh khổng lồ với hàng nghìn bộ manhwa, manga, manhua hot nhất: ngôn tình, tu tiên, kiếm hiệp, hành động, trinh thám. Cập nhật liên tục 24/7!',
    generator: 'Next.js',
    applicationName: 'Truyenhayy.online',
    referrer: 'origin-when-cross-origin',
    keywords: [
        'doc truyen tranh',
        'truyen tranh online',
        'truyenhayy',
        'truyen hay',
        'doc truyen mien phi',
        'manga',
        'manhwa',
        'manhua',
        'truyen ngon tinh',
        'truyen tu tien',
        'truyen kiem hiep',
        'doc manga',
        'doc manhwa',
        'truyen full',
        'truyen hot',
        'truyen hay nhat'
    ],
    authors: [
        { name: 'Truyenhayy Team' },
        { name: 'Truyenhayy.online', url: 'https://truyenhayy.online' },
    ],
    creator: 'Truyenhayy.online',
    publisher: 'Truyenhayy.online',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: 'Truyenhayy.online - Đọc Truyện Tranh Online Miễn Phí',
        description:
            'Kho truyện tranh khổng lồ với hàng nghìn bộ manhwa, manga, manhua hot nhất. Cập nhật liên tục 24/7, đọc miễn phí không quảng cáo!',
        url: 'https://truyenhayy.online',
        images: [
            {
                url: '/logothayy.png',
                width: 1200,
                height: 630,
                alt: 'Truyenhayy.online - Đọc Truyện Tranh Online Miễn Phí',
                type: 'image/png',
            },
        ],
        siteName: 'Truyenhayy.online',
        type: 'website',
        locale: 'vi_VN',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Truyenhayy.online - Đọc Truyện Tranh Online Miễn Phí',
        description:
            'Kho truyện tranh khổng lồ với hàng nghìn bộ manhwa, manga, manhua hot nhất. Cập nhật 24/7!',
        images: ['/logothayy.png'],
        site: '@truyenhayy',
        creator: '@truyenhayy',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/logothayy.png',
        shortcut: '/logothayy.png',
        apple: '/logothayy.png',
    },
    verification: {
        google: process.env.NEXT_PUBLIC_VERIFICATION_GOOGLE,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi" suppressHydrationWarning>
            <head>
                {/* Preconnect to external domains for performance */}
                <link rel="preconnect" href="https://otruyenapi.com" />
                <link rel="preconnect" href="https://img.otruyenapi.com" />
                <link rel="preconnect" href="https://sv1.otruyencdn.com" />
                <link rel="dns-prefetch" href="https://otruyenapi.com" />
                
                {/* Structured Data - Organization */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            name: 'Truyenhayy.online',
                            url: 'https://truyenhayy.online',
                            description: 'Đọc truyện tranh online miễn phí - Manhwa, Manga, Manhua hay nhất',
                            potentialAction: {
                                '@type': 'SearchAction',
                                target: 'https://truyenhayy.online/tim-kiem?keyword={search_term_string}',
                                'query-input': 'required name=search_term_string'
                            }
                        })
                    }}
                />
            </head>
            <body
                className={`${montserrat.className} antialiased select-none overflow-x-hidden`}
            >
                <GoogleAnalytics />
                <PostHogProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem={false}
                        disableTransitionOnChange
                        storageKey="truyenhayy-theme"
                    >
                        <NprogressWrapper>
                            <Suspense fallback={null}>
                                <ScrollToTop />
                            </Suspense>
                            <main className="mt-[56px]">{children}</main>
                            <ToasterCustom />
                        </NprogressWrapper>
                    </ThemeProvider>
                </PostHogProvider>
                <SpeedInsights />
            </body>
        </html>
    );
}
