# Fix Hydration Mismatch Error

## 🐛 Vấn đề

**Lỗi**: Hydration failed - Server và Client render khác nhau

```
+ 4 giờ trước
- 3 giờ trước
```

**Nguyên nhân**: 
- Hàm `formatRelativeTime()` sử dụng `dayjs().fromNow()` tính toán thời gian dựa trên thời điểm hiện tại
- Server render lúc 10:00 → "3 giờ trước"
- Client hydrate lúc 11:00 → "4 giờ trước"
- React phát hiện sự khác biệt → Hydration mismatch error

## ✅ Giải pháp

Tạo `ClientTimeAgo` component để chỉ render thời gian ở client-side:

### 1. Component mới: `src/components/common/ClientTimeAgo.tsx`

```tsx
'use client';

import { useEffect, useState } from 'react';
import formatRelativeTime from '@/utils/formatRelativeTime';

export default function ClientTimeAgo({ date, className }: ClientTimeAgoProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // SSR: render placeholder
        return <span className={className}>Mới cập nhật</span>;
    }

    // Client: render actual time
    return <span className={className}>{formatRelativeTime(date)}</span>;
}
```

**Cách hoạt động**:
1. **Server-side**: Render "Mới cập nhật" (placeholder)
2. **Client-side**: Sau khi mount, render thời gian thực tế
3. **Không có hydration mismatch** vì client biết sẽ có thay đổi sau mount

### 2. Updated files

Thay thế `formatRelativeTime(date)` bằng `<ClientTimeAgo date={date} />`:

- ✅ `src/modules/home/ModernNewComic.tsx`
- ✅ `src/modules/home/ModernCarousel.tsx`
- ✅ `src/modules/home/carousel.tsx`

## 📊 Trước và Sau

### ❌ Trước (Lỗi hydration)
```tsx
<Clock className="w-3 h-3" />
{formatRelativeTime(comic.updatedAt)}
```

### ✅ Sau (Không lỗi)
```tsx
<Clock className="w-3 h-3" />
<ClientTimeAgo date={comic.updatedAt} />
```

## 🎯 Kết quả

- ✅ Build thành công không warnings
- ✅ Không còn hydration mismatch error
- ✅ Performance không bị ảnh hưởng
- ✅ UX tốt: placeholder → real time (smooth transition)

## 📚 Tài liệu tham khảo

- [React Hydration Errors](https://react.dev/link/hydration-mismatch)
- [Next.js Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
