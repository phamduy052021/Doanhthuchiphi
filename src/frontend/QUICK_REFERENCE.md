# ⚡ Quick Reference Card

## 🔗 GitHub → Replit Flow

```
┌─────────────┐    ┌─────────┐    ┌─────────┐    ┌────────┐
│ Figma Make  │ →  │ GitHub  │ →  │ Replit  │ →  │ AI Dev │
└─────────────┘    └─────────┘    └─────────┘    └────────┘
```

---

## 📋 Checklist Nhanh

### 1️⃣ Push lên GitHub (5 phút)
```bash
git init
git remote add origin https://github.com/YOUR-USERNAME/bu-management-system.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

### 2️⃣ Import vào Replit (2 phút)
```
1. Replit.com → + Create Repl
2. Import from GitHub
3. Select: bu-management-system
4. Import!
```

### 3️⃣ Setup Replit (5 phút)
```bash
# Install
npm install

# Add Secrets (4 values)
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_DB_URL

# Update config
/utils/supabase/info.tsx
```

### 4️⃣ Run (2 phút)
```bash
# Terminal 1
npm run dev

# Terminal 2
bash start-server.sh

# Browser → Database → Import demo data
```

### 5️⃣ AI Ready! ✅
```
Ctrl+I → Open AI
"Read README.md and DATABASE_DOCUMENTATION.md"
Start developing!
```

---

## 🔑 Secrets Cần Add

```bash
SUPABASE_URL=https://onkqodvrlkhvribbsvhp.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
SUPABASE_DB_URL=postgresql://...
```

**Lấy từ đâu?** Supabase Dashboard → Project Settings → API

---

## 💻 Commands Hay Dùng

### Git
```bash
git status              # Check changes
git add .               # Stage all
git commit -m "msg"     # Commit
git push                # Push to GitHub
git pull                # Pull latest
```

### npm
```bash
npm install             # Install dependencies
npm run dev             # Start frontend
npm run build           # Build production
```

### Server
```bash
bash start-server.sh                           # Easy start
cd supabase/functions/server && deno run ...   # Manual
```

### Testing
```bash
curl http://localhost:8000/make-server-80868a71/health       # Health
curl http://localhost:8000/make-server-80868a71/business-units  # Get BUs
```

---

## 📁 Files Quan Trọng

| File | Mục đích |
|------|----------|
| README.md | Project overview |
| DATABASE_DOCUMENTATION.md | Schema & API docs |
| GITHUB_TO_REPLIT.md | **Hướng dẫn chi tiết** |
| HOW_TO_RUN.md | Running guide |
| QUICK_START.md | 5-min setup |

---

## 🤖 AI Commands Hữu Ích

### Setup AI
```
"Read README.md and DATABASE_DOCUMENTATION.md to understand the project"
```

### Development
```
"Add [feature] to [component]"
"Fix bug in [file] where [issue]"
"Explain how [code] works"
"Show me example of [pattern]"
```

### Specific Tasks
```
"Add export to Excel for Business Units"
"Improve Dashboard with animations"
"Add pagination to tables"
"Create new page for [feature]"
```

---

## 🔧 Troubleshooting Quick Fix

| Issue | Fix |
|-------|-----|
| Module not found | `npm install` |
| Port in use | `pkill -f vite` / `pkill -f deno` |
| Failed to fetch | Start backend: `bash start-server.sh` |
| Git push fails | `git pull` first |
| Secrets not working | Check Replit Secrets tab |
| Replit not updating | Reload browser |

---

## 🎯 URLs

| Service | URL |
|---------|-----|
| Frontend Local | http://localhost:5173 |
| Backend Local | http://localhost:8000 |
| Health Check | http://localhost:8000/make-server-80868a71/health |
| Replit App | https://[repl-name].[username].repl.co |

---

## 📊 System Info

```
Frontend:  React 18 + TypeScript + Tailwind
Backend:   Deno + Hono
Database:  Supabase KV Store
Entities:  10 types
Records:   69 demo records
Endpoints: 40+ REST APIs
Pages:     9 main pages
```

---

## ⏱️ Time Estimates

```
GitHub setup:      5 phút
Replit import:     2 phút
Dependencies:      2 phút
Configuration:     3 phút
Run & test:        3 phút
─────────────────────────
Total:            15 phút
```

---

## ✅ Success Indicators

- [ ] Code visible trên GitHub
- [ ] Replit imported successfully
- [ ] `npm install` no errors
- [ ] Secrets added (4/4)
- [ ] Frontend runs (port 5173)
- [ ] Backend runs (port 8000)
- [ ] Database has 69 records
- [ ] AI chat responding
- [ ] Ready to develop! 🚀

---

**Quick Reference v1.0 | Nov 10, 2024**

Need details? See: **GITHUB_TO_REPLIT.md**
