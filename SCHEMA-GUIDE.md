# 🎯 Hướng Dẫn Sử Dụng Schema Markup

## 📚 Components đã tạo

File: `src/components/seo/StructuredData.tsx`

Có 5 components schema markup:
1. **OrganizationSchema** - Thông tin tổ chức
2. **BreadcrumbSchema** - Đường dẫn breadcrumb
3. **ComicSchema** - Thông tin truyện tranh
4. **ItemListSchema** - Danh sách items
5. **FAQSchema** - Câu hỏi thường gặp

---

## 💡 Cách sử dụng

### 1. **OrganizationSchema** - Thêm vào homepage

**File**: `src/app/page.tsx`

```tsx
import { OrganizationSchema } from '@/components/seo/StructuredData';

export default function HomePage() {
    return (
        <>
            <OrganizationSchema
                name="Truyenhayy.online"
                url="https://truyenhayy.online"
                logo="https://truyenhayy.online/logothayy.png"
                description="Đọc truyện tranh online miễn phí - Manhwa, Manga, Manhua hay nhất"
                socialLinks={[
                    'https://facebook.com/truyenhayy',
                    'https://twitter.com/truyenhayy',
                    'https://tiktok.com/@truyenhayy'
                ]}
            />
            
            {/* Your content */}
        </>
    );
}
```

---

### 2. **BreadcrumbSchema** - Thêm vào các trang con

**File**: `src/app/truyen-tranh/[slug]/page.tsx`

```tsx
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

export default function ComicDetailPage({ params }) {
    const breadcrumbs = [
        { name: 'Trang chủ', url: 'https://truyenhayy.online' },
        { name: 'Truyện tranh', url: 'https://truyenhayy.online/truyen-tranh' },
        { name: comicName, url: `https://truyenhayy.online/truyen-tranh/${params.slug}` }
    ];

    return (
        <>
            <BreadcrumbSchema items={breadcrumbs} />
            
            {/* Your content */}
        </>
    );
}
```

---

### 3. **ComicSchema** - Thêm vào trang chi tiết truyện

**File**: `src/app/truyen-tranh/[slug]/page.tsx`

```tsx
import { ComicSchema } from '@/components/seo/StructuredData';

export default function ComicDetailPage({ comic }) {
    return (
        <>
            <ComicSchema
                name={comic.name}
                url={`https://truyenhayy.online/truyen-tranh/${comic.slug}`}
                image={`https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`}
                description={comic.content}
                author={comic.author}
                genre={comic.category.map(c => c.name)}
                datePublished={comic.updatedAt}
                aggregateRating={{
                    ratingValue: 4.5,
                    reviewCount: 1234
                }}
            />
            
            {/* Your content */}
        </>
    );
}
```

---

### 4. **ItemListSchema** - Thêm vào trang danh sách

**File**: `src/app/the-loai/[slug]/page.tsx`

```tsx
import { ItemListSchema } from '@/components/seo/StructuredData';

export default function GenrePage({ genre, comics }) {
    const items = comics.map(comic => ({
        name: comic.name,
        url: `https://truyenhayy.online/truyen-tranh/${comic.slug}`,
        image: `https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`
    }));

    return (
        <>
            <ItemListSchema
                name={`Truyện ${genre.name}`}
                url={`https://truyenhayy.online/the-loai/${genre.slug}`}
                items={items}
            />
            
            {/* Your content */}
        </>
    );
}
```

---

### 5. **FAQSchema** - Thêm vào trang FAQ (nếu có)

**File**: `src/app/faq/page.tsx`

```tsx
import { FAQSchema } from '@/components/seo/StructuredData';

export default function FAQPage() {
    const faqs = [
        {
            question: 'Truyenhayy.online là gì?',
            answer: 'Truyenhayy.online là website đọc truyện tranh online miễn phí với hàng nghìn bộ manhwa, manga, manhua được cập nhật liên tục 24/7.'
        },
        {
            question: 'Đọc truyện có mất phí không?',
            answer: 'Hoàn toàn miễn phí! Tất cả truyện tranh trên Truyenhayy.online đều được cung cấp miễn phí 100%.'
        },
        {
            question: 'Làm sao để theo dõi truyện đã đọc?',
            answer: 'Website tự động lưu lịch sử đọc của bạn. Bạn có thể xem lại tại trang Lịch sử đọc.'
        }
    ];

    return (
        <>
            <FAQSchema questions={faqs} />
            
            {/* Your FAQ content */}
        </>
    );
}
```

---

## 🎯 Ưu tiên implementation

### **Giai đoạn 1 (Quan trọng nhất):**
1. ✅ OrganizationSchema → Homepage
2. ✅ ComicSchema → Comic detail pages
3. ✅ BreadcrumbSchema → All pages

### **Giai đoạn 2:**
4. ItemListSchema → Genre/List pages
5. FAQSchema → FAQ page (nếu có)

---

## 🔍 Test Schema Markup

### **Google Rich Results Test:**
```
https://search.google.com/test/rich-results
```

**Các bước:**
1. Deploy website
2. Vào Rich Results Test
3. Nhập URL: https://truyenhayy.online
4. Click "Test URL"
5. Kiểm tra kết quả

### **Schema Markup Validator:**
```
https://validator.schema.org/
```

---

## 📊 Lợi ích

### **1. OrganizationSchema:**
- ✅ Brand visibility trong search
- ✅ Knowledge Panel có thể xuất hiện
- ✅ Logo hiển thị trong SERP

### **2. BreadcrumbSchema:**
- ✅ Breadcrumbs trong search results
- ✅ Better navigation UX
- ✅ Improved CTR

### **3. ComicSchema:**
- ✅ Rich snippets với rating
- ✅ Image trong search results
- ✅ Better click-through rate

### **4. ItemListSchema:**
- ✅ Carousel trong search results
- ✅ Featured snippets opportunity
- ✅ Better category visibility

### **5. FAQSchema:**
- ✅ FAQ rich snippets
- ✅ People Also Ask sections
- ✅ Featured snippet opportunity

---

## 🚀 Expected Results

Sau khi implement:

**Tuần 1-2:**
- Google crawl và index schema

**Tuần 3-4:**
- Rich snippets bắt đầu xuất hiện

**Tháng 2-3:**
- Full rich results trong SERP
- Improved CTR (10-30%)
- Better rankings

---

## ⚠️ Lưu ý

1. **Không duplicate schema** - Mỗi page chỉ nên có 1 schema của mỗi loại
2. **Data phải accurate** - Thông tin trong schema phải match với content
3. **Test thường xuyên** - Dùng Rich Results Test sau mỗi update
4. **Monitor Search Console** - Check errors trong Enhancements section

---

## 📚 Tài liệu tham khảo

- [Schema.org Documentation](https://schema.org/)
- [Google Search Central - Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [JSON-LD Best Practices](https://json-ld.org/spec/latest/json-ld/#best-practices)

---

**Last Updated**: November 5, 2025  
**Status**: Ready to implement 🚀
