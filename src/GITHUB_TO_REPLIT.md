# 🔗 GitHub → Replit Setup Guide

Hướng dẫn chi tiết đưa project lên GitHub và import vào Replit để AI build tiếp.

---

## 📋 Tổng quan Flow

```
Figma Make → GitHub → Replit → AI Build
```

---

## 🚀 PHẦN 1: Đưa Code lên GitHub

### Bước 1.1: Tạo GitHub Repository

1. **Vào GitHub.com** → Đăng nhập
2. **Click nút "+"** ở góc trên phải → **"New repository"**
3. **Điền thông tin:**
   ```
   Repository name: bu-management-system
   Description: Business Unit Management System - Dashboard & Analytics
   Visibility: Public (hoặc Private nếu muốn)
   ☐ KHÔNG tick "Initialize with README" (đã có rồi)
   ☐ KHÔNG tick "Add .gitignore" (đã có rồi)
   ☐ KHÔNG tick "Choose a license"
   ```
4. **Click "Create repository"**
5. **Copy URL:**
   ```
   https://github.com/YOUR-USERNAME/bu-management-system.git
   ```

---

### Bước 1.2: Download Code từ Figma Make

**Option A: Download ZIP**
```
1. Figma Make → Menu → Export/Download
2. Save as: bu-management-system.zip
3. Extract vào folder local
```

**Option B: Copy Files Manual**
```
1. Tạo folder mới: bu-management-system
2. Copy tất cả files từ Figma Make
3. Theo structure trong FILES_TO_EXPORT.txt
```

---

### Bước 1.3: Init Git và Push

Mở Terminal trong folder project:

```bash
# 1. Init Git repository
git init

# 2. Add remote (thay YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/bu-management-system.git

# 3. Check files sẽ được commit
git status

# 4. Add all files
git add .

# 5. Commit
git commit -m "Initial commit: BU Management System

- Frontend: React 18 + TypeScript + Tailwind
- Backend: Deno + Hono with 40+ API endpoints
- Database: Supabase with 10 entity types
- Demo data: 69 records ready
- Full documentation: 10+ MD files
- Production ready"

# 6. Push to GitHub
git push -u origin main

# Nếu bị lỗi về branch name:
git branch -M main
git push -u origin main
```

**Nếu chưa setup Git credentials:**
```bash
# Config Git (lần đầu tiên)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# GitHub authentication
# Sẽ prompt nhập username/password hoặc Personal Access Token
# Hoặc dùng GitHub CLI: gh auth login
```

---

### Bước 1.4: Verify trên GitHub

1. Reload GitHub repository page
2. Nên thấy tất cả files:
   ```
   ✅ App.tsx
   ✅ package.json
   ✅ components/
   ✅ supabase/functions/server/
   ✅ README.md
   ✅ Database docs
   ✅ ... và tất cả files khác
   ```
3. Check README.md hiển thị đẹp
4. ✅ Done! Code đã lên GitHub

---

## 🔄 PHẦN 2: Import vào Replit

### Bước 2.1: Tạo Replit từ GitHub

1. **Vào Replit.com** → Đăng nhập

2. **Click "+ Create Repl"**

3. **Chọn "Import from GitHub"**
   ```
   - Click tab "Import from GitHub"
   - Nếu chưa connect GitHub: Click "Connect GitHub account"
   - Authorize Replit access
   ```

4. **Select Repository**
   ```
   - Tìm repo: bu-management-system
   - Click để select
   - Hoặc paste URL: https://github.com/YOUR-USERNAME/bu-management-system
   ```

5. **Configure Import**
   ```
   Title: BU Management System
   Language: Auto-detect (sẽ detect Vite/React)
   ```

6. **Click "Import from GitHub"**

7. **Đợi Import** (~30 giây - 1 phút)
   - Replit sẽ clone repository
   - Auto-detect project type
   - Setup environment

---

### Bước 2.2: Install Dependencies

Khi Replit mở xong:

**Shell/Console trong Replit:**
```bash
# Install npm dependencies
npm install

# Chờ install xong (~1-2 phút)
```

**Output:**
```
added 500+ packages in 45s
```

---

### Bước 2.3: Configure Secrets

**Replit → Tools → Secrets**

Add 4 secrets:

```bash
# 1. Supabase URL
Name: SUPABASE_URL
Value: https://onkqodvrlkhvribbsvhp.supabase.co

# 2. Supabase Anon Key
Name: SUPABASE_ANON_KEY
Value: eyJhbGc... (copy từ Supabase Dashboard)

# 3. Supabase Service Role Key
Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGc... (copy từ Supabase Dashboard)

# 4. Database URL
Name: SUPABASE_DB_URL
Value: postgresql://... (copy từ Supabase Dashboard)
```

**Nếu chưa có Supabase Project:**
```
1. Vào supabase.com → Create new project
2. Project Settings → API
3. Copy 3 keys ở trên
4. Project Settings → Database → Connection string
5. Copy Database URL
```

---

### Bước 2.4: Update Config File

**Edit file: `/utils/supabase/info.tsx`**

Trong Replit:
```typescript
// Replace với values từ Supabase của bạn
export const projectId = "onkqodvrlkhvribbsvhp"  // Từ SUPABASE_URL
export const publicAnonKey = "eyJhbGc..."         // SUPABASE_ANON_KEY
```

**Save file** (Ctrl+S hoặc Cmd+S)

---

### Bước 2.5: Run Application

**Replit có 2 options:**

#### Option A: Click nút "Run" ▶️
```
- Replit tự động chạy npm run dev
- Frontend sẽ mở trong Webview
- URL: https://your-repl-name.YOUR-USERNAME.repl.co
```

#### Option B: Manual (2 Terminals)

**Shell 1 - Frontend:**
```bash
npm run dev
```

**Shell 2 - Backend:**
```bash
bash start-server.sh
```

---

### Bước 2.6: Initialize Database

**Trong Replit Webview:**
```
1. Vào trang "Database" (sidebar)
2. Click "Import dữ liệu demo"
3. Đợi ~5 giây
4. ✅ Thấy: "Import thành công với 69 records"
```

**Verify:**
- Dashboard → Thấy KPI cards với data
- Business Units → Thấy 5 BUs
- KPI Management → Thấy 12 KPIs
- ✅ System hoạt động!

---

## 🤖 PHẦN 3: Setup cho Replit AI

### Bước 3.1: Enable Replit AI

**Trong Replit:**
```
1. Click "AI" button (sidebar trái hoặc bottom)
2. Hoặc press: Ctrl+I (Windows) / Cmd+I (Mac)
3. AI chat panel sẽ mở
```

---

### Bước 3.2: Provide Context cho AI

**Gửi message đầu tiên:**

```
Xin chào! Đây là BU Management System - hệ thống quản lý Business Units.

Project structure:
- Frontend: React 18 + TypeScript + Tailwind CSS
- Backend: Deno + Hono framework (supabase/functions/server/)
- Database: Supabase KV Store với 10 entity types
- 40+ API endpoints đã implement
- Full documentation trong các .md files

Tôi cần bạn giúp:
1. Đọc DATABASE_DOCUMENTATION.md để hiểu schema
2. Đọc README.md để hiểu features
3. Sẵn sàng enhance và thêm features mới

Bạn có hiểu structure của project không?
```

---

### Bước 3.3: AI Understanding Verification

**AI nên response:**
```
✅ Hiểu structure
✅ Thấy 10 entity types
✅ Thấy 40+ endpoints
✅ Có thể giúp enhance
```

**Test AI với câu hỏi:**
```
"Show me the database schema structure"
"Explain how the KPI entity works"
"What API endpoints are available for Business Units?"
```

---

### Bước 3.4: AI Development Tasks

**Ví dụ tasks cho AI:**

#### Task 1: Add new feature
```
"Thêm feature export Business Units ra Excel file. 
Cần:
1. Button trong BusinessUnitsPage
2. Function export data
3. Dùng library xlsx
"
```

#### Task 2: Enhance existing
```
"Improve Dashboard KPI cards với:
1. Animation khi hover
2. Click để drill down
3. Show trend arrow (up/down)
"
```

#### Task 3: Fix bugs
```
"Fix pagination trong Business Units table.
Hiện tại chưa có pagination, add:
1. Items per page: 10, 20, 50
2. Page navigation
3. Total count display
"
```

#### Task 4: Add validation
```
"Add form validation cho Create Business Unit modal:
1. Name: required, min 3 chars
2. Manager: required
3. Employee count: must be >= 0
4. Show error messages
"
```

---

### Bước 3.5: AI Best Practices

**Để AI hiểu rõ hơn:**

1. **Reference files cụ thể:**
   ```
   "Edit file /components/Dashboard.tsx, 
   add new KPI card for total revenue"
   ```

2. **Provide context:**
   ```
   "Theo database schema trong DATABASE_DOCUMENTATION.md,
   revenue sources có field 'amount'. 
   Tính tổng revenue từ tất cả sources"
   ```

3. **Be specific:**
   ```
   ❌ "Make it better"
   ✅ "Add loading spinner khi fetch data, 
       dùng Lucide Loader2 icon"
   ```

4. **Reference existing patterns:**
   ```
   "Similar to BusinessUnitsPage, tạo EmployeesPage
   với same layout structure và CRUD operations"
   ```

---

## 📚 PHẦN 4: Documentation cho AI

### Files AI nên đọc trước:

```
📖 Bắt buộc:
1. README.md - Overview
2. DATABASE_DOCUMENTATION.md - Schema & API
3. HOW_TO_RUN.md - Setup guide

📖 Tham khảo khi cần:
4. REPLIT_SETUP.md - Replit specifics
5. FILES_TO_EXPORT.txt - File structure
6. FIXES_APPLIED.md - Recent changes
```

### Tell AI to read:

```
"Trước khi bắt đầu, đọc các files sau:
1. /README.md - understand project
2. /DATABASE_DOCUMENTATION.md - understand schema
3. /HOW_TO_RUN.md - know how to run

Sau khi đọc xong, confirm bạn đã hiểu:
- Frontend structure
- Backend API endpoints
- Database entities
- Development workflow
"
```

---

## 🎯 PHẦN 5: Example AI Conversation

### Session 1: Initial Setup

**You:**
```
Tôi vừa import project BU Management từ GitHub.
Đọc README.md và DATABASE_DOCUMENTATION.md để hiểu project.
Confirm khi done.
```

**AI:**
```
✅ Đã đọc documentation. 
Hiểu được:
- 10 entity types trong database
- 40+ REST API endpoints
- Frontend có 9 pages
- Sẵn sàng develop!
```

---

### Session 2: Development Task

**You:**
```
Task: Add export to Excel feature cho Business Units

Requirements:
1. Button "Export Excel" trong BusinessUnitsPage
2. Export all BUs với columns: name, manager, region, status, employeeCount
3. Use library: xlsx
4. Filename: business-units-[date].xlsx

Implement step by step.
```

**AI:**
```
Tôi sẽ implement:

Step 1: Install xlsx
Step 2: Create export function
Step 3: Add button to UI
Step 4: Test functionality

Bắt đầu với Step 1...
```

---

### Session 3: Bug Fix

**You:**
```
Bug: Khi create new Business Unit, form không reset sau submit.

File: /components/BusinessUnitsPage.tsx
Function: handleCreate()

Fix issue này.
```

**AI:**
```
Analyzing bug...
Found issue: missing form.reset() after successful create.
Applying fix...
✅ Fixed!
```

---

## 🔐 PHẦN 6: Security Notes

### ⚠️ QUAN TRỌNG:

**KHÔNG commit sensitive data:**
```bash
# .gitignore đã setup sẵn:
✅ .env
✅ node_modules/
✅ Secrets không bị push

# Double check trước khi push:
git status
# Đảm bảo KHÔNG thấy:
# - .env files
# - API keys
# - Passwords
```

**Use Replit Secrets:**
```
✅ Store: SUPABASE_URL
✅ Store: SUPABASE_ANON_KEY
✅ Store: SUPABASE_SERVICE_ROLE_KEY

❌ KHÔNG hardcode trong code
❌ KHÔNG commit lên GitHub
```

---

## 📋 PHẦN 7: Checklist

### GitHub Setup ✓
- [ ] Repository created
- [ ] .gitignore added
- [ ] Code pushed
- [ ] README visible
- [ ] All files uploaded

### Replit Setup ✓
- [ ] Imported from GitHub
- [ ] Dependencies installed
- [ ] Secrets configured
- [ ] Config file updated
- [ ] Frontend runs
- [ ] Backend runs
- [ ] Database initialized

### AI Ready ✓
- [ ] AI enabled
- [ ] Context provided
- [ ] Docs referenced
- [ ] Test questions asked
- [ ] Ready to develop

---

## 🚀 Next Steps

**Sau khi setup xong:**

1. **Develop với AI:**
   ```
   - Ask AI to add features
   - Fix bugs together
   - Enhance UI/UX
   - Optimize performance
   ```

2. **Sync với GitHub:**
   ```bash
   # Trong Replit Shell
   git add .
   git commit -m "AI enhancements: [describe changes]"
   git push
   ```

3. **Deploy to Production:**
   ```
   - Frontend: Vercel/Netlify
   - Backend: Supabase Edge Functions
   ```

---

## 💡 Tips

### Git Workflow trong Replit:

```bash
# Check changes
git status

# Commit AI changes
git add .
git commit -m "Feature: AI added export to Excel"

# Push to GitHub
git push

# Pull latest (nếu collaborate)
git pull
```

### AI Collaboration:

```
✅ Clear instructions
✅ Reference specific files
✅ Provide context
✅ Test after each change
✅ Commit often
```

### Troubleshooting:

```
Issue: Replit không thấy changes
Fix: Reload browser

Issue: Git push fails
Fix: git pull first, resolve conflicts

Issue: AI không hiểu
Fix: Show example code, reference docs
```

---

## 📞 Support

### Stuck?

1. **Check docs:**
   - README.md
   - DATABASE_DOCUMENTATION.md
   - HOW_TO_RUN.md

2. **Ask AI:**
   - "Explain the error: [paste error]"
   - "How to fix [issue]?"

3. **Replit Community:**
   - Discord
   - Forums
   - Ask AI tool

---

## ✅ Summary

```
1. ✅ Code lên GitHub
2. ✅ Import vào Replit
3. ✅ Install dependencies
4. ✅ Configure secrets
5. ✅ Run application
6. ✅ Initialize database
7. ✅ Enable AI
8. ✅ Start developing!
```

**Total Time:** ~15-20 phút

**Result:** Full dev environment với AI assistance sẵn sàng! 🎉

---

**Happy Coding with AI! 🤖**

---

**Version:** 1.0  
**Created:** November 10, 2024  
**Last Updated:** November 10, 2024
