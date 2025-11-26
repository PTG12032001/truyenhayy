# 🛡️ SPAM PROTECTION GUIDE - TRUYENHAYY.ONLINE

**Ngày:** November 7, 2025  
**Version:** 1.0

---

## ⚠️ TẠI SAO CẦN BẢO VỆ CHỐNG SPAM?

### **Vấn đề:**
- Spammers thường dùng search pages để inject spam links
- Pattern: `/tim-kiem?keyword=casino.com`, `/tim-kiem?keyword=http://spam.com`
- Google có thể index những URLs này → ảnh hưởng SEO và reputation

### **Giải pháp:**
**KHÔNG nên dùng robots.txt** để block spam search queries vì:
1. ❌ Google không hỗ trợ wildcards phức tạp
2. ❌ Có thể block cả search queries hợp lệ
3. ❌ Làm file robots.txt quá dài

**NÊN dùng:**
✅ Meta tags `noindex` cho spam URLs
✅ HTTP Headers `X-Robots-Tag: noindex`
✅ Canonical tags
✅ Server-side validation và blocking

---

## 🔧 PHƯƠNG PHÁP BẢO VỆ ĐÚNG

### **1. robots.txt - CHỈ block cơ bản** ✅

**File hiện tại đã được tối ưu:**
```typescript
// src/app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // Internal API
          '/_next/',         // Next.js internal
          '/admin/',         // Admin panel
          '/*?utm_',         // Tracking parameters
          '/*?fbclid=',      // Facebook tracking
          '/*?gclid=',       // Google tracking
          '/*?ref=',         // Referral tracking
        ],
      },
    ],
    sitemap: 'https://truyenhayy.online/sitemap.xml',
  }
}
```

**Đúng chuẩn Google:**
- ✅ Wildcards hợp lệ (chỉ ở cuối)
- ✅ Block internal paths
- ✅ Block tracking parameters
- ✅ Không quá phức tạp

---

### **2. Next.js Middleware - Block spam requests** ✅

**Tạo file:** `src/middleware.ts`

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Spam keywords to block
const SPAM_KEYWORDS = [
  'casino', 'slot', 'bet', 'telegram', 'sex', 'porn', 'xxx',
  'danhlo', 'danh-lo', 'daftar', 'binance', 'airdrop', 'scam'
]

// Spam TLDs to block
const SPAM_TLDS = ['.cc', '.vip', '.wink', '.live', '.xyz', '.top', '.club']

// SQL injection patterns
const SQL_PATTERNS = ['SELECT', 'UNION', 'DROP', 'DELETE', '<', '>', '{', '}', '[', ']']

export function middleware(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl

  // Only check search pages
  if (pathname === '/tim-kiem') {
    const keyword = searchParams.get('keyword')?.toLowerCase() || ''

    // Check for spam keywords
    const hasSpam = SPAM_KEYWORDS.some(spam => keyword.includes(spam))
    
    // Check for spam TLDs
    const hasTLD = SPAM_TLDS.some(tld => keyword.includes(tld))
    
    // Check for URLs
    const hasURL = keyword.includes('http') || keyword.includes('www.') || keyword.includes('//')
    
    // Check for SQL injection
    const hasSQL = SQL_PATTERNS.some(pattern => keyword.includes(pattern.toLowerCase()))

    // Block spam requests
    if (hasSpam || hasTLD || hasURL || hasSQL) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Add noindex header for search pages (prevent Google indexing)
    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/tim-kiem',
    '/the-loai/:path*',
    '/danh-sach/:path*',
  ],
}
```

**Lợi ích:**
- ✅ Block spam **TRƯỚC KHI** render page
- ✅ Redirect spammers về homepage
- ✅ Add `noindex` header cho search pages
- ✅ Không ảnh hưởng performance

---

### **3. Meta Tags - Prevent indexing search pages** ✅

**Trong search page:** `src/app/tim-kiem/page.tsx`

```typescript
import type { Metadata } from 'next'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { keyword?: string }
}): Promise<Metadata> {
  const keyword = searchParams.keyword || ''

  return {
    title: `Tìm kiếm: ${keyword} | Truyenhayy.online`,
    description: `Kết quả tìm kiếm cho "${keyword}"`,
    
    // IMPORTANT: Prevent search pages from being indexed
    robots: {
      index: false,        // Don't index
      follow: true,        // But follow links
      noarchive: true,     // Don't cache
      nosnippet: true,     // Don't show snippets
    },
  }
}
```

**Kết quả HTML:**
```html
<meta name="robots" content="noindex, follow, noarchive, nosnippet">
```

---

### **4. Canonical URLs - Consolidate duplicate content** ✅

**Trong detail pages:** `src/app/truyen-tranh/[slug]/page.tsx`

```typescript
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const comic = await getComicDetail(params.slug)

  return {
    title: comic.name,
    description: comic.description,
    
    // Canonical URL (chính thức)
    alternates: {
      canonical: `https://truyenhayy.online/truyen-tranh/${params.slug}`,
    },
  }
}
```

---

### **5. Sitemap - Only include important pages** ✅

**File:** `src/app/sitemap.ts`

```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://truyenhayy.online'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // KHÔNG include search pages
    // KHÔNG include chapter pages (quá nhiều)
    // CHỈ include: homepage, genres, comic details
  ]
}
```

---

## 📊 SO SÁNH PHƯƠNG PHÁP

| Phương pháp | Hiệu quả | Performance | SEO Impact | Khuyến nghị |
|-------------|----------|-------------|------------|-------------|
| **robots.txt wildcard spam** | ❌ Không hoạt động | ✅ Tốt | ⚠️ Có thể block nhầm | ❌ Không nên |
| **robots.txt simplified** | ✅ Tốt (cơ bản) | ✅ Tốt | ✅ An toàn | ✅ **Nên dùng** |
| **Middleware blocking** | ✅ Rất tốt | ✅ Tốt | ✅ An toàn | ✅ **Nên dùng** |
| **Meta robots noindex** | ✅ Rất tốt | ✅ Tốt | ✅ Tốt nhất | ✅ **Nên dùng** |
| **Canonical URLs** | ✅ Tốt | ✅ Tốt | ✅ Tốt | ✅ Nên dùng |
| **Sitemap filtering** | ✅ Tốt | ✅ Tốt | ✅ Tốt | ✅ Nên dùng |

---

## 🎯 KHUYẾN NGHỊ TRIỂN KHAI

### **ƯU TIÊN CAO (Bắt buộc):**
1. ✅ **robots.txt simplified** - ĐÃ HOÀN THÀNH
2. ⚠️ **Meta robots noindex** cho search pages - CẦN THÊM
3. ⚠️ **Middleware spam blocking** - CẦN THÊM

### **ƯU TIÊN TRUNG BÌNH:**
4. ✅ Canonical URLs - Đã có
5. ✅ Sitemap filtering - Đã có

### **ƯU TIÊN THẤP (Optional):**
6. Rate limiting cho search
7. CAPTCHA cho search
8. User report spam

---

## 📝 HÀNH ĐỘNG TIẾP THEO

### **Bước 1: Tạo Middleware (5 phút)**
```bash
# Tạo file
touch src/middleware.ts

# Copy code từ section 2 ở trên
# Customize spam keywords nếu cần
```

### **Bước 2: Update Search Page Metadata (2 phút)**
```typescript
// src/app/tim-kiem/page.tsx
export async function generateMetadata() {
  return {
    robots: {
      index: false,  // ADD THIS
      follow: true,
    },
  }
}
```

### **Bước 3: Test**
```bash
# Test search với spam keyword
curl http://localhost:3000/tim-kiem?keyword=casino

# Should redirect to homepage
# Or show blocked message
```

### **Bước 4: Monitor Google Search Console**
```
1. Vào Search Console
2. Check "Coverage" issues
3. Verify spam URLs không được index
4. Submit removal requests nếu cần
```

---

## 🔍 GOOGLE ROBOTS.TXT CHUẨN

### **✅ ĐÚNG:**
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /*?utm_
Disallow: /*?fbclid=

Sitemap: https://truyenhayy.online/sitemap.xml
```

### **❌ SAI:**
```
User-agent: *
Disallow: /tim-kiem?keyword=*.com     # ❌ Wildcard ở giữa
Disallow: /*casino*                   # ❌ Wildcard 2 bên
Disallow: /tim-kiem?keyword=*[*       # ❌ Pattern phức tạp
```

**Tài liệu tham khảo:**
- https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt
- https://developers.google.com/search/docs/crawling-indexing/robots-txt-specifications

---

## 🎉 KẾT LUẬN

### **robots.txt hiện tại:**
✅ **ĐÃ ĐÚNG CHUẨN GOOGLE!**

**Điểm mạnh:**
- ✅ Syntax đúng
- ✅ Wildcards hợp lệ
- ✅ Không quá phức tạp
- ✅ Block được tracking parameters
- ✅ Block được SEO scrapers

**Để bảo vệ tốt hơn chống spam:**
- ⚠️ CẦN thêm Middleware blocking
- ⚠️ CẦN thêm Meta robots noindex cho search pages

**Priority:**
1. Deploy với robots.txt hiện tại (đã OK)
2. Sau đó thêm Middleware (tuần sau cũng được)

---

**Generated:** November 7, 2025  
**Status:** ✅ robots.txt COMPLIANT with Google standards

