# ⚡ Quick Start Guide - 5 phút Setup

## 🎯 Goal
Chạy được BU Management System trên Replit trong **5 phút**.

---

## ✅ Step 1: Tạo Supabase Project (2 phút)

1. **Vào:** https://supabase.com/dashboard
2. **Click:** "New project"
3. **Fill:**
   - Name: `bu-management`
   - Database Password: `[tạo password mạnh]`
   - Region: `Southeast Asia (Singapore)`
4. **Click:** "Create new project"
5. **Đợi:** ~2 phút để provision

---

## ✅ Step 2: Copy Credentials (1 phút)

1. **Vào:** Project Settings → API
2. **Copy 3 values:**

```
Project URL: https://xxxxx.supabase.co
anon/public key: eyJhbGc...
service_role key: eyJhbGc...
```

3. **Copy Database URL:**
   - Project Settings → Database → Connection string → URI
   - Format: `postgresql://postgres:[password]@db.xxx.supabase.co:5432/postgres`

---

## ✅ Step 3: Setup Replit (1 phút)

### Option A: Import từ GitHub
```
1. Push code lên GitHub
2. Replit → Import from GitHub → Select repo
3. Done!
```

### Option B: Manual
```
1. Replit → Create Repl → Vite + React + TypeScript
2. Upload/paste tất cả files từ Figma Make
3. Done!
```

---

## ✅ Step 4: Configure Secrets (30 giây)

**Trong Replit:**
```
Tools → Secrets → Add new secret

1. SUPABASE_URL = https://xxxxx.supabase.co
2. SUPABASE_ANON_KEY = eyJhbGc...
3. SUPABASE_SERVICE_ROLE_KEY = eyJhbGc...
4. SUPABASE_DB_URL = postgresql://...
```

**Update file `/utils/supabase/info.tsx`:**
```typescript
export const projectId = "xxxxx"; // từ URL
export const publicAnonKey = "eyJhbGc..."; // anon key
```

---

## ✅ Step 5: Install & Run (30 giây)

**Replit Shell:**
```bash
# Install
npm install

# Run (sẽ tự động start)
npm run dev
```

**Hoặc click nút "Run" ▶️ trong Replit**

---

## ✅ Step 6: Initialize Database (10 giây)

**Option A: Via UI**
```
1. Mở app (Replit sẽ mở tự động)
2. Click "Database" trong sidebar
3. Click "Import dữ liệu demo"
4. ✅ Done! 69 records created
```

**Option B: Via API**
```bash
curl -X POST https://your-repl.replit.app/make-server-80868a71/init-demo-data
```

---

## 🎉 Xong! App đã chạy

**Access:**
- Frontend: `https://your-repl.replit.app`
- Backend API: `https://your-repl.replit.app/make-server-80868a71`

**Test:**
1. Vào Dashboard → Thấy KPI cards
2. Vào Business Units → Thấy 5 BUs
3. Vào KPI Management → Thấy 12 KPIs
4. CRUD operations hoạt động
5. Reload → Data persistent ✅

---

## 🐛 Troubleshooting (nếu có lỗi)

### Frontend không load
```bash
# Check console
# Xem có error gì không
# Thường là: thiếu dependencies hoặc sai path imports

# Fix:
npm install
```

### Backend không chạy
```bash
# Check Deno installed
deno --version

# Nếu chưa có:
curl -fsSL https://deno.land/install.sh | sh

# Run manual:
cd supabase/functions/server
deno run --allow-net --allow-env --allow-read index.tsx
```

### Database connection error
```bash
# Check Secrets đã add chưa
# Check /utils/supabase/info.tsx đã update chưa
# Test connection:
curl https://xxxxx.supabase.co/rest/v1/
```

### Demo data không import
```bash
# Clear first
curl -X DELETE https://your-repl.replit.app/make-server-80868a71/clear-all-data

# Then import
curl -X POST https://your-repl.replit.app/make-server-80868a71/init-demo-data
```

---

## 📋 Verification Checklist

- [ ] Supabase project created
- [ ] Credentials copied
- [ ] Replit secrets configured
- [ ] info.tsx updated
- [ ] npm install successful
- [ ] Frontend runs (port 5173)
- [ ] Backend runs (port 8000)
- [ ] Demo data imported (69 records)
- [ ] Dashboard shows data
- [ ] CRUD operations work
- [ ] Reload preserves data

---

## 🚀 Next Steps

Sau khi setup xong:

1. **Explore Features:**
   - Dashboard → KPI overview
   - Business Units → CRUD
   - BU Performance → 5 tabs analysis
   - Employees → Management
   - Database → Stats

2. **Customize:**
   - Add your own BUs
   - Create KPIs
   - Add employees
   - Modify costs

3. **Develop:**
   - Enhance backend
   - Add features
   - Improve UI
   - Deploy to production

---

## 📚 Full Documentation

- **Database:** `DATABASE_DOCUMENTATION.md`
- **Setup:** `REPLIT_SETUP.md`
- **Export:** `EXPORT_GUIDE.md`
- **General:** `README.md`

---

**Total Time:** ~5 phút  
**Difficulty:** ⭐⭐ (Easy)  
**Result:** ✅ Fully working app with 69 records

Happy coding! 🎉
