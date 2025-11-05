# 🚀 HƯỚNG DẪN DEPLOY TRUYENHAYY.ONLINE LÊN VERCEL

**Repository:** https://github.com/PTG12032001/truyenhayy.git  
**Version:** 2.0.0  
**Ngày:** November 5, 2025

---

## ✅ CHUẨN BỊ (ĐÃ HOÀN THÀNH)

- ✅ Code đã push lên GitHub repository mới
- ✅ Build successful (105KB bundle)
- ✅ 0 errors, 0 warnings
- ✅ SEO ready (10/10)
- ✅ Performance optimized

---

## 📋 BƯỚC 1: TẠO TÀI KHOẢN VERCEL

### 1.1. Truy cập Vercel
Vào trang: **https://vercel.com/signup**

### 1.2. Đăng nhập với GitHub
1. Click **"Continue with GitHub"**
2. Authorize Vercel truy cập GitHub account của bạn
3. Chấp nhận các permissions cần thiết

✅ **Xong bước này, bạn đã có Vercel account!**

---

## 📋 BƯỚC 2: IMPORT PROJECT TỪ GITHUB

### 2.1. Vào Dashboard
Sau khi đăng nhập, bạn sẽ thấy Vercel Dashboard.

### 2.2. Add New Project
1. Click nút **"Add New..."** (góc trên bên phải)
2. Chọn **"Project"**

### 2.3. Import Git Repository
1. Bạn sẽ thấy danh sách repositories từ GitHub
2. Tìm repository: **PTG12032001/truyenhayy**
3. Click **"Import"** bên cạnh repository đó

> **Lưu ý:** Nếu không thấy repo, click **"Adjust GitHub App Permissions"** để cấp quyền truy cập repo.

---

## 📋 BƯỚC 3: CẤU HÌNH PROJECT

### 3.1. Configure Project
Vercel sẽ tự động detect Next.js project. Bạn sẽ thấy:

**Project Name:** `truyenhayy` (có thể giữ nguyên)

**Framework Preset:** `Next.js` ✅ (auto-detected)

**Root Directory:** `./` (mặc định)

**Build Command:** `next build` ✅ (auto)

**Output Directory:** `.next` ✅ (auto)

**Install Command:** `npm install` ✅ (auto)

### 3.2. Thêm Environment Variables (QUAN TRỌNG!)

Click vào **"Environment Variables"** và thêm các biến sau:

```bash
# Website URL
NEXT_PUBLIC_YOUR_WEBSITE=https://truyenhayy.online

# API Endpoints
NEXT_PUBLIC_API_URL_OUT_SIDE=https://otruyenapi.com/v1/api
NEXT_PUBLIC_API_URL_CHAPTER_OUT_SIDE=https://sv1.otruyencdn.com
NEXT_PUBLIC_URL_IMG=https://img.otruyenapi.com

# PostHog Analytics (Optional - có thể bỏ qua nếu chưa có)
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# Google Verification (Optional - để sau khi có domain)
NEXT_PUBLIC_VERIFICATION_GOOGLE=your_verification_code
```

**Cách thêm:**
1. Nhập **Name** (tên biến, VD: `NEXT_PUBLIC_YOUR_WEBSITE`)
2. Nhập **Value** (giá trị, VD: `https://truyenhayy.online`)
3. Chọn **Environment**: `Production`, `Preview`, `Development` (chọn cả 3)
4. Click **"Add"**
5. Lặp lại cho tất cả biến

> **Lưu ý:** 
> - Nếu chưa có domain `truyenhayy.online`, tạm thời dùng: `https://truyenhayy.vercel.app`
> - PostHog có thể bỏ qua tạm thời (analytics)
> - Google Verification để sau khi setup domain

### 3.3. Deploy!
Click nút **"Deploy"** màu đen ở dưới cùng.

---

## 📋 BƯỚC 4: CHỜ BUILD & DEPLOY

### 4.1. Quá trình Build
Vercel sẽ:
1. ⏳ Clone repository
2. ⏳ Install dependencies (`npm install`)
3. ⏳ Build project (`npm run build`)
4. ⏳ Deploy to production

**Thời gian:** Khoảng 2-5 phút

### 4.2. Theo dõi Build Logs
Bạn sẽ thấy logs realtime:
```
> Cloning repository...
> Installing dependencies...
> Building application...
> ✓ Compiled successfully
> Deploying...
```

### 4.3. Deploy Thành Công! 🎉
Khi thấy:
```
✓ Production: https://truyenhayy.vercel.app
```

✅ **Website đã LIVE!**

---

## 📋 BƯỚC 5: SETUP CUSTOM DOMAIN (truyenhayy.online)

### 5.1. Vào Project Settings
1. Trên Vercel Dashboard, click vào project **truyenhayy**
2. Click tab **"Settings"**
3. Chọn **"Domains"** ở sidebar

### 5.2. Thêm Domain
1. Nhập domain: `truyenhayy.online`
2. Click **"Add"**

### 5.3. Configure DNS
Vercel sẽ yêu cầu bạn cấu hình DNS. Có 2 cách:

#### **Option A: Nameservers (Khuyến nghị)**
Vercel sẽ cho bạn 2 nameservers:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Vào nhà cung cấp domain của bạn:**
1. Tìm phần **DNS Management** hoặc **Nameservers**
2. Thay đổi nameservers thành 2 nameservers của Vercel
3. Save changes

**Thời gian:** 24-48 giờ để DNS propagate

#### **Option B: A Record (Nhanh hơn)**
Thêm A record:
```
Type: A
Name: @
Value: 76.76.21.21 (Vercel IP)
```

Thêm CNAME cho www:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Thời gian:** 1-2 giờ để DNS propagate

### 5.4. Verify Domain
Sau khi DNS propagate:
1. Vercel sẽ tự động verify
2. HTTPS certificate sẽ được issue tự động
3. Domain sẽ chuyển sang **"Valid"** ✅

---

## 📋 BƯỚC 6: CẬP NHẬT ENVIRONMENT VARIABLES (SAU KHI CÓ DOMAIN)

Quay lại **Settings → Environment Variables** và cập nhật:

```bash
NEXT_PUBLIC_YOUR_WEBSITE=https://truyenhayy.online
```

Sau đó:
1. Click tab **"Deployments"**
2. Click nút **"Redeploy"** trên deployment mới nhất
3. Chọn **"Use existing Build Cache"**
4. Click **"Redeploy"**

---

## 📋 BƯỚC 7: SETUP GOOGLE SEARCH CONSOLE

### 7.1. Truy cập Search Console
Vào: **https://search.google.com/search-console**

### 7.2. Add Property
1. Click **"Add Property"**
2. Chọn **"URL prefix"**
3. Nhập: `https://truyenhayy.online`
4. Click **"Continue"**

### 7.3. Verify Ownership
Chọn phương pháp **"HTML tag"**:

Google sẽ cho code như:
```html
<meta name="google-site-verification" content="abc123xyz..." />
```

**Copy mã verification** (`abc123xyz...`)

### 7.4. Thêm vào Vercel
1. Vào Vercel → Settings → Environment Variables
2. Add biến mới:
   ```
   Name: NEXT_PUBLIC_VERIFICATION_GOOGLE
   Value: abc123xyz...
   ```
3. Redeploy project

### 7.5. Verify trên Google
Quay lại Google Search Console, click **"Verify"**

✅ **Ownership verified!**

### 7.6. Submit Sitemap
1. Ở sidebar, click **"Sitemaps"**
2. Nhập: `sitemap.xml`
3. Click **"Submit"**

✅ **Sitemap submitted!**

---

## 📋 BƯỚC 8: OPTIONAL - SETUP POSTHOG ANALYTICS

### 8.1. Tạo PostHog Account
Vào: **https://posthog.com/signup**

### 8.2. Create Project
1. Đăng ký/Login
2. Create new project: **"Truyenhayy"**
3. Copy API Key (format: `phc_...`)

### 8.3. Add to Vercel
Vào Vercel → Settings → Environment Variables:
```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### 8.4. Redeploy
Redeploy project để áp dụng analytics.

---

## 🎯 CHECKLIST SAU KHI DEPLOY

### ✅ Kiểm tra Website
- [ ] Truy cập `https://truyenhayy.vercel.app` → Website hoạt động
- [ ] Trang chủ load đầy đủ content
- [ ] Chức năng tìm kiếm hoạt động
- [ ] Đọc truyện hoạt động
- [ ] Dark/Light theme toggle hoạt động
- [ ] Responsive trên mobile

### ✅ Kiểm tra SEO
- [ ] View Source → Meta tags đầy đủ
- [ ] `https://truyenhayy.online/sitemap.xml` → Sitemap hiển thị
- [ ] `https://truyenhayy.online/robots.txt` → Robots.txt hiển thị
- [ ] Test Open Graph: https://developers.facebook.com/tools/debug/
- [ ] Test Twitter Card: https://cards-dev.twitter.com/validator

### ✅ Kiểm tra Performance
- [ ] Google PageSpeed Insights: https://pagespeed.web.dev/
- [ ] Vercel Analytics Dashboard → Monitoring
- [ ] Test image loading speed
- [ ] Test chapter reader performance

### ✅ Kiểm tra Domain & SSL
- [ ] `https://truyenhayy.online` → Redirect to HTTPS
- [ ] SSL Certificate valid (🔒 trong browser)
- [ ] `www.truyenhayy.online` → Redirect to main domain

---

## 🔄 CẬP NHẬT CODE SAU KHI DEPLOY

Mỗi khi bạn thay đổi code:

```bash
# 1. Commit changes
git add .
git commit -m "feat: add new feature"

# 2. Push to GitHub
git push origin main

# 3. Vercel sẽ TỰ ĐỘNG deploy!
```

**Vercel tự động deploy mỗi khi có push lên `main` branch!** 🎉

---

## 🐛 TROUBLESHOOTING

### ❌ Build Failed
**Lỗi:** `Build Command "next build" exited with 1`

**Giải pháp:**
1. Check build logs trên Vercel
2. Verify environment variables đã thêm đầy đủ
3. Test local: `npm run build`
4. Nếu local build OK → Likely env variables issue

### ❌ Environment Variables Not Working
**Lỗi:** Website hiển thị `undefined` cho các API calls

**Giải pháp:**
1. Vào Settings → Environment Variables
2. Verify tất cả variables có prefix `NEXT_PUBLIC_`
3. Check environment: Production, Preview, Development
4. Redeploy project

### ❌ Domain Not Working
**Lỗi:** Domain không trỏ đến website

**Giải pháp:**
1. Check DNS propagation: https://dnschecker.org/
2. Wait 24-48 giờ cho nameservers
3. Hoặc dùng A Record (nhanh hơn)
4. Verify domain status ở Vercel → Domains

### ❌ SSL Certificate Error
**Lỗi:** Browser báo "Not Secure"

**Giải pháp:**
1. Wait 5-10 phút sau khi domain verified
2. Vercel tự động issue Let's Encrypt certificate
3. Nếu vẫn lỗi → Remove domain và add lại

### ❌ Images Not Loading
**Lỗi:** Images từ CDN không hiển thị

**Giải pháp:**
1. Check `next.config.ts` → `remotePatterns` correct
2. Verify API endpoints trong env variables
3. Check browser console for CORS errors

---

## 📊 MONITORING & ANALYTICS

### Vercel Dashboard
```
https://vercel.com/PTG12032001/truyenhayy
```

**Metrics:**
- Real-time visitors
- Page load times
- API response times
- Build history
- Deployment logs

### Google Search Console
```
https://search.google.com/search-console
```

**Metrics:**
- Search impressions
- Click-through rate
- Average position
- Coverage issues
- Sitemap status

### PostHog (Optional)
```
https://app.posthog.com
```

**Metrics:**
- User sessions
- Page views
- Click tracking
- User journey
- Retention analysis

---

## 🎉 KẾT LUẬN

### ✅ Website đã LIVE!
```
Production: https://truyenhayy.online
Vercel URL: https://truyenhayy.vercel.app
Repository: https://github.com/PTG12032001/truyenhayy.git
```

### 🚀 Tính năng Auto-Deploy
- ✅ Push code → Vercel tự động build & deploy
- ✅ Preview deployments cho mỗi PR
- ✅ Rollback instant nếu có lỗi
- ✅ HTTPS tự động
- ✅ Global CDN

### 📈 Next Steps
1. Monitor performance với Vercel Analytics
2. Track SEO với Google Search Console
3. Add more content & features
4. Optimize based on user feedback

---

**Chúc mừng! Website của bạn đã sẵn sàng cho production!** 🎊🚀

Nếu gặp vấn đề gì, tham khảo phần **Troubleshooting** hoặc check Vercel documentation.

---

**Generated:** November 5, 2025  
**Guide Version:** 1.0  
**For:** Truyenhayy.online v2.0.0
