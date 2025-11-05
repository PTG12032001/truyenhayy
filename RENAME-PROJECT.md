# 🎉 Đổi Tên Dự Án: ztruyen → truyenhayy

## 📋 Tổng quan

Đã thay đổi toàn bộ tên dự án từ **"ztruyen"** (tên cũ) thành **"truyenhayy"** (tên chính thức).

---

## ✅ Các thay đổi đã thực hiện

### 1. **package.json**
```json
{
-   "name": "ztruyen",
-   "version": "0.1.0",
+   "name": "truyenhayy",
+   "version": "2.0.0",
    "private": true,
}
```

**Kết quả**: 
```bash
> truyenhayy@2.0.0 dev
> next dev --turbopack
```

---

### 2. **localStorage Keys**

#### a) `src/utils/localStorage/historyService.ts`
```typescript
- const KEY = "ZTC-history";
+ const KEY = "truyenhayy-history";
```

#### b) `src/modules/doc-truyen/ImageChapter.tsx`
```typescript
- localStorage.getItem('ZTC-hasSeenGuide')
+ localStorage.getItem('truyenhayy-hasSeenGuide')

- localStorage.setItem('ZTC-hasSeenGuide', 'true')
+ localStorage.setItem('truyenhayy-hasSeenGuide', 'true')
```

**Lưu ý**: LocalStorage keys cũ sẽ vẫn tồn tại trong browser của users. Nếu muốn migrate data, có thể thêm migration script.

---

### 3. **package-lock.json**
Đã tự động update khi chạy `npm install`:
```json
- "name": "ztruyen",
+ "name": "truyenhayy",
```

---

## 🔍 Files đã kiểm tra

✅ **package.json** - Updated  
✅ **package-lock.json** - Auto-updated  
✅ **src/utils/localStorage/historyService.ts** - Updated  
✅ **src/modules/doc-truyen/ImageChapter.tsx** - Updated  
✅ **README.md** - Đã đúng từ trước (Truyenhayy)  
✅ **src/app/layout.tsx** - Đã đúng (metadata title: Truyenhayy.online)  
✅ **tsconfig.json** - Không cần thay đổi  
✅ **vercel.json** - Không có tên dự án  
✅ **next.config.ts** - Không có tên dự án  

---

## 🚀 Kết quả

### **Dev Server**
```bash
> truyenhayy@2.0.0 dev
> next dev --turbopack

   ▲ Next.js 15.1.2 (Turbopack)
   - Local:        http://localhost:3000
```

### **Build**
```bash
> truyenhayy@2.0.0 build
> next build

 ✓ Compiled successfully
```

---

## ⚠️ Migration Notes

### **LocalStorage Data Migration** (Optional)

Nếu muốn migrate dữ liệu localStorage từ keys cũ sang mới, thêm code này vào `src/app/layout.tsx` hoặc component khác:

```typescript
useEffect(() => {
    // Chỉ chạy ở client-side
    if (typeof window !== 'undefined') {
        // Migrate history
        const oldHistory = localStorage.getItem('ZTC-history');
        if (oldHistory && !localStorage.getItem('truyenhayy-history')) {
            localStorage.setItem('truyenhayy-history', oldHistory);
            localStorage.removeItem('ZTC-history');
        }

        // Migrate guide flag
        const oldGuide = localStorage.getItem('ZTC-hasSeenGuide');
        if (oldGuide && !localStorage.getItem('truyenhayy-hasSeenGuide')) {
            localStorage.setItem('truyenhayy-hasSeenGuide', oldGuide);
            localStorage.removeItem('ZTC-hasSeenGuide');
        }
    }
}, []);
```

**Lưu ý**: Có thể bỏ qua migration này nếu chấp nhận users sẽ mất history và phải xem guide lại.

---

## 📊 Summary

| Item | Old Value | New Value | Status |
|------|-----------|-----------|--------|
| Package Name | `ztruyen` | `truyenhayy` | ✅ Updated |
| Version | `0.1.0` | `2.0.0` | ✅ Updated |
| History Key | `ZTC-history` | `truyenhayy-history` | ✅ Updated |
| Guide Key | `ZTC-hasSeenGuide` | `truyenhayy-hasSeenGuide` | ✅ Updated |
| Build Status | - | Success | ✅ Passed |
| Dev Server | - | Running | ✅ Working |

---

## 🎯 Next Steps

1. ✅ Test website locally: http://localhost:3000
2. ✅ Commit changes:
   ```bash
   git add .
   git commit -m "chore: rename project from ztruyen to truyenhayy v2.0.0"
   git push origin main
   ```
3. ✅ Deploy to production
4. 🔧 (Optional) Add localStorage migration script nếu cần

---

**Hoàn tất!** 🎉 Dự án giờ đây chính thức mang tên **truyenhayy v2.0.0**
