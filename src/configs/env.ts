// Environment configuration with fallbacks for Cloudflare Pages
export const env = {
  API_URL_CHAPTER: process.env.NEXT_PUBLIC_API_URL_CHAPTER_OUT_SIDE || 'https://sv1.otruyencdn.com/v1/api/chapter',
  API_URL: process.env.NEXT_PUBLIC_API_URL_OUT_SIDE || 'https://otruyenapi.com/v1/api',
  URL_IMG: process.env.NEXT_PUBLIC_URL_IMG || 'https://img.otruyenapi.com/uploads/comics',
  WEBSITE_URL: process.env.NEXT_PUBLIC_YOUR_WEBSITE || 'https://truyenhayy.online',
  SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'Truyenhayy.online',
  GA_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-2Z51J7VGZ5',
  POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY || '',
  POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST || '',
} as const;

export default env;
