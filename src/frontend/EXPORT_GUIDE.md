# 📦 Export Guide - Chuyển từ Figma Make sang Replit

## 🎯 Mục tiêu
Đóng gói toàn bộ hệ thống BU Management để chuyển sang Replit cho development tiếp.

---

## 📋 Checklist Files cần Export

### ✅ Core Files (REQUIRED)

#### 1. Root Level
- [ ] `App.tsx` - Main React application
- [ ] `index.html` - HTML entry point
- [ ] `package.json` - Dependencies và scripts
- [ ] `tsconfig.json` - TypeScript config
- [ ] `vite.config.ts` - Vite configuration
- [ ] `tailwind.config.js` - Tailwind config (nếu có)
- [ ] `postcss.config.js` - PostCSS config (nếu có)

#### 2. Components (`/components/`)
**Main Pages:**
- [ ] `Dashboard.tsx` - Dashboard chính với KPI cards
- [ ] `BusinessUnitsPage.tsx` - Quản lý Business Units
- [ ] `BUPerformancePage.tsx` - Chi tiết hiệu suất BU (5 tabs)
- [ ] `EmployeeManagement.tsx` - Quản lý nhân viên
- [ ] `FixedCostManagement.tsx` - Quản lý chi phí cố định
- [ ] `ReportingAnalytics.tsx` - Báo cáo và phân tích
- [ ] `RBACPage.tsx` - Quản lý users và permissions
- [ ] `KPIManagementPage.tsx` - Quản lý KPIs tổng thể
- [ ] `DatabaseManagement.tsx` - Quản lý database
- [ ] `ConnectionTest.tsx` - Tool test kết nối

**UI Components (`/components/ui/`)** - Copy tất cả ~30 files:
- [ ] `accordion.tsx`
- [ ] `alert-dialog.tsx`
- [ ] `alert.tsx`
- [ ] `avatar.tsx`
- [ ] `badge.tsx`
- [ ] `button.tsx`
- [ ] `card.tsx`
- [ ] `checkbox.tsx`
- [ ] `dialog.tsx`
- [ ] `dropdown-menu.tsx`
- [ ] `form.tsx`
- [ ] `input.tsx`
- [ ] `label.tsx`
- [ ] `popover.tsx`
- [ ] `select.tsx`
- [ ] `separator.tsx`
- [ ] `sheet.tsx`
- [ ] `slider.tsx`
- [ ] `switch.tsx`
- [ ] `table.tsx`
- [ ] `tabs.tsx`
- [ ] `textarea.tsx`
- [ ] `toast.tsx`
- [ ] `toaster.tsx`
- [ ] `tooltip.tsx`
- [ ] Và các files khác trong `/components/ui/`

#### 3. Services (`/services/`)
- [ ] `api.ts` - API client service với 40+ endpoints

#### 4. Utils (`/utils/`)
- [ ] `supabase/info.tsx` - Supabase configuration

#### 5. Styles (`/styles/`)
- [ ] `globals.css` - Global CSS với Tailwind

#### 6. Backend (`/supabase/functions/server/`)
- [ ] `index.tsx` - Main Hono server (40+ endpoints)
- [ ] `kv_helper.tsx` - KV Store helper functions
- [ ] `kv_store.tsx` - KV Store utilities (PROTECTED - DO NOT EDIT)
- [ ] `database-schema.tsx` - Schema definitions (10 entities)
- [ ] `demo-data.tsx` - Demo data (69 records)
- [ ] `query-helpers.tsx` - SQL-like query helpers

#### 7. Documentation
- [ ] `DATABASE_DOCUMENTATION.md` - Full database docs
- [ ] `REPLIT_SETUP.md` - Setup guide cho Replit
- [ ] `EXPORT_GUIDE.md` - File này

---

## 📁 Cấu trúc Folder cần tạo trên Replit

```
replit-project/
├── public/                    # Static files
│   └── (nếu có images, icons)
├── src/
│   ├── components/
│   │   ├── ui/               # Shadcn components
│   │   └── *.tsx             # Main components
│   ├── services/
│   │   └── api.ts
│   ├── utils/
│   │   └── supabase/
│   │       └── info.tsx
│   └── styles/
│       └── globals.css
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx
│           ├── kv_helper.tsx
│           ├── kv_store.tsx
│           ├── database-schema.tsx
│           ├── demo-data.tsx
│           └── query-helpers.tsx
├── App.tsx
├── main.tsx                   # Vite entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── DATABASE_DOCUMENTATION.md
├── REPLIT_SETUP.md
└── README.md
```

---

## 🚀 Các bước Export

### Bước 1: Download từ Figma Make

**Option A: Download toàn bộ project**
```
Figma Make → Menu → Download/Export project
→ Lưu dưới dạng ZIP
```

**Option B: Copy từng file thủ công**
1. Open Figma Make editor
2. Copy nội dung từng file
3. Paste vào Replit

### Bước 2: Tạo Project trên Replit

```bash
1. Vào replit.com
2. Click "Create Repl"
3. Template: "Vite + React + TypeScript"
4. Đặt tên: "bu-management-system"
5. Click "Create Repl"
```

### Bước 3: Upload Files

**Via Replit UI:**
```
1. Click "Files" sidebar
2. Right-click → "Upload file" hoặc "Upload folder"
3. Select files từ máy local
4. Hoặc drag & drop vào Replit
```

**Via Replit Shell:**
```bash
# Clone từ GitHub (nếu đã push)
git clone https://github.com/your-username/bu-management-system.git
cd bu-management-system
```

### Bước 4: Cài đặt Dependencies

```bash
# Install npm packages
npm install

# Test Deno (cho server)
deno --version
# Nếu chưa có: curl -fsSL https://deno.land/install.sh | sh
```

### Bước 5: Configure Environment

**Tạo Supabase Project:**
```
1. Vào supabase.com → Create project
2. Copy credentials:
   - Project URL
   - Anon Key
   - Service Role Key
   - Database URL
```

**Add to Replit Secrets:**
```
Tools → Secrets → Add new secret:

Name: SUPABASE_URL
Value: https://xxxxx.supabase.co

Name: SUPABASE_ANON_KEY
Value: eyJhbGc...

Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGc...

Name: SUPABASE_DB_URL
Value: postgresql://...
```

**Update `/utils/supabase/info.tsx`:**
```typescript
export const projectId = "xxxxx"; // Từ SUPABASE_URL
export const publicAnonKey = "eyJhbGc..."; // SUPABASE_ANON_KEY
```

### Bước 6: Test Chạy

**Terminal 1 - Frontend:**
```bash
npm run dev
```
→ Open in browser: http://localhost:5173

**Terminal 2 - Backend:**
```bash
cd supabase/functions/server
deno run --allow-net --allow-env --allow-read index.tsx
```
→ Server at: http://localhost:8000

### Bước 7: Initialize Database

```bash
# Via UI
1. Mở app http://localhost:5173
2. Vào Database page
3. Click "Import dữ liệu demo"

# Via API
curl -X POST http://localhost:8000/make-server-80868a71/init-demo-data
```

---

## ✅ Verification Checklist

### Frontend
- [ ] App loads without errors
- [ ] Tailwind styles working
- [ ] All pages accessible
- [ ] UI components render correctly
- [ ] No TypeScript errors

### Backend
- [ ] Server starts successfully
- [ ] Health endpoint responds: `/health`
- [ ] Can fetch business units: `/business-units`
- [ ] CORS enabled (no browser errors)
- [ ] Logs show requests

### Database
- [ ] Supabase connection working
- [ ] KV Store table exists
- [ ] Demo data import successful (69 records)
- [ ] Stats endpoint returns data: `/database-stats`
- [ ] CRUD operations work

### Integration
- [ ] Frontend calls backend successfully
- [ ] Data displays in UI
- [ ] Create/Update/Delete operations work
- [ ] Reload preserves data
- [ ] No console errors

---

## 🔧 Configuration Files

### `package.json`
```json
{
  "name": "bu-management-system",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "server": "cd supabase/functions/server && deno run --allow-net --allow-env --allow-read index.tsx"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.344.0",
    "recharts": "^2.12.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.5.3",
    "vite": "^5.3.4",
    "tailwindcss": "^4.0.0"
  }
}
```

### `vite.config.ts`
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true // Important for Replit
  }
});
```

### `.replit` (Replit config)
```toml
run = "npm run dev"

[nix]
channel = "stable-23_11"

[deployment]
run = ["npm", "run", "build"]
deploymentTarget = "static"
publicDir = "dist"

[[ports]]
localPort = 5173
externalPort = 80
```

---

## 🐛 Common Issues

### Issue 1: Module not found
```bash
# Solution:
npm install
# Hoặc xóa node_modules và reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 2: Deno not found
```bash
# Solution: Install Deno
curl -fsSL https://deno.land/install.sh | sh
echo 'export PATH="$HOME/.deno/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### Issue 3: Supabase connection error
```bash
# Check:
1. Verify Secrets are correct
2. Check SUPABASE_URL format
3. Test với curl:
   curl https://xxxxx.supabase.co/rest/v1/

# Update /utils/supabase/info.tsx nếu cần
```

### Issue 4: CORS error
```bash
# Server đã có CORS enabled
# Nếu vẫn lỗi, check:
1. Server có chạy không
2. URL trong api.ts đúng không
3. Browser console có error gì
```

---

## 📚 Resources

### Documentation
- Replit Docs: https://docs.replit.com
- Supabase Docs: https://supabase.com/docs
- Deno Docs: https://deno.land/manual
- Vite Docs: https://vitejs.dev

### Tools
- Replit: https://replit.com
- Supabase: https://supabase.com
- GitHub: https://github.com (optional, cho version control)

---

## 🎯 Post-Export Development

Sau khi export thành công, bạn có thể:

### 1. Enhance Backend
```typescript
// Add authentication
// Implement caching
// Add WebSocket
// Rate limiting
// Advanced queries
```

### 2. Database Migration
```sql
-- Migrate từ KV Store sang proper tables
CREATE TABLE business_units (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  ...
);
```

### 3. Testing
```bash
# Unit tests
npm install --save-dev vitest
# Integration tests
# E2E tests
```

### 4. Deployment
```bash
# Frontend: Vercel/Netlify
vercel deploy

# Backend: Supabase Edge Functions
supabase functions deploy
```

---

## 💾 Backup

Trước khi export, backup toàn bộ:

```bash
# Export data từ database
curl http://localhost:8000/make-server-80868a71/database-stats > backup.json

# Git commit (nếu dùng Git)
git add .
git commit -m "Pre-Replit export backup"
git push origin main
```

---

## ✨ Final Checklist

- [ ] Tất cả files đã copy
- [ ] Dependencies installed
- [ ] Supabase configured
- [ ] Environment variables set
- [ ] Frontend runs
- [ ] Backend runs
- [ ] Database initialized
- [ ] Demo data loaded
- [ ] All pages working
- [ ] CRUD operations work
- [ ] Documentation updated
- [ ] Backup created

---

**Ready to move to Replit! 🚀**

Good luck with your development!
