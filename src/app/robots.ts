import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/_next/',
                    '/admin/',
                    // Block spam search patterns
                    '/tim-kiem?keyword=*.com',
                    '/tim-kiem?keyword=*.cc',
                    '/tim-kiem?keyword=*.vip',
                    '/tim-kiem?keyword=*.net',
                    '/tim-kiem?keyword=*.wink',
                    '/tim-kiem?keyword=*.live',
                    '/tim-kiem?keyword=*casino*',
                    '/tim-kiem?keyword=*slot*',
                    '/tim-kiem?keyword=*bet*',
                    '/tim-kiem?keyword=*telegram*',
                    '/tim-kiem?keyword=*đánh*lô*',
                    // Block spam keywords
                    '/*casino*',
                    '/*slot*',
                    '/*bet*',
                    '/*telegram*',
                    '/*Telegram*',
                    '/*binance*',
                    '/*airdrop*',
                    '/*WeChat*',
                    '/*đánh*lô*',
                    '/*daftar*',
                    '/*Sex*',
                    '/*xxxx*',
                ],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
        ],
        sitemap: 'https://truyenhayy.online/sitemap.xml',
    };
}
