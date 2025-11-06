import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    
    // Disable image optimization for Cloudflare Pages compatibility
    // Images are already optimized from external CDN (otruyenapi.com)
    images: {
        unoptimized: true, // Required for Cloudflare Pages
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
    
    // Optimize output for Cloudflare Pages
    output: 'standalone',

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
