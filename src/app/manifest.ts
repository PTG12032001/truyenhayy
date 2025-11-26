import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Truyenhayy.online - Đọc Truyện Tranh Online Miễn Phí',
        short_name: 'Truyenhayy',
        description: 'Kho truyện tranh khổng lồ với hàng nghìn bộ manhwa, manga, manhua hot nhất',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#9333ea',
        icons: [
            {
                src: '/logothayy.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/logothayy.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
        ],
        categories: ['entertainment', 'books', 'comics'],
        lang: 'vi',
        dir: 'ltr',
        orientation: 'portrait',
    };
}
