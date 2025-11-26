import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    
    // Disable Vercel Image Optimization to stay within free tier
    // Images are served directly from external CDN (otruyenapi.com)
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.otruyenapi.com',
                port: '',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'sv1.otruyencdn.com',
                port: '',
                pathname: '/uploads/**',
            },
        ],
    },

    // rewrites
    async rewrites() {
        return [
            {
                source: '/lich-su.html',
                destination: '/lich-su',
            },
        ];
    },
};

export default nextConfig;
