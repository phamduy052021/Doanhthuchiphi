# 🚀 How to Run - BU Management System

## ⚡ Quick Start (2 Terminals)

### Terminal 1: Frontend (Vite)
```bash
npm run dev
```
→ Frontend chạy tại: **http://localhost:5173**

### Terminal 2: Backend (Deno Server)
```bash
bash start-server.sh
```
→ Backend chạy tại: **http://localhost:8000**

---

## 📋 Step by Step

### 1️⃣ Install Dependencies (Lần đầu tiên)
```bash
npm install
```

### 2️⃣ Start Frontend
```bash
# Terminal 1
npm run dev
```

**Output:**
```
VITE v5.3.4  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 3️⃣ Start Backend
```bash
# Terminal 2
bash start-server.sh
```

**Hoặc manual:**
```bash
cd supabase/functions/server
deno run --allow-net --allow-env --allow-read index.tsx
```

**Output:**
```
🚀 BU Management System API Server starting...
📊 Endpoints: /health, /business-units, /kpis, /employees, /users, etc.
```

### 4️⃣ Test Connection
Mở browser: http://localhost:5173

1. Vào trang **Database** (trong sidebar)
2. Click **"Kiểm tra trạng thái"**
3. Nếu thấy ✅ **"Server đang hoạt động tốt!"** → OK!

### 5️⃣ Import Demo Data
1. Click **"Import dữ liệu demo"**
2. Đợi ~5 giây
3. Thấy message: ✅ **"Import dữ liệu demo thành công!"**
4. **69 records** đã được tạo!

### 6️⃣ Enjoy!
- Vào **Dashboard** → Thấy KPI cards
- Vào **Business Units** → Thấy 5 BUs
- Vào **KPI Management** → Thấy 12 KPIs
- Vào **Employees** → Thấy 10 employees
- Tất cả CRUD operations hoạt động!

---

## 🔧 Troubleshooting

### Frontend không chạy
```bash
# Error: Module not found
npm install

# Error: Port 5173 in use
pkill -f vite
npm run dev
```

### Backend không chạy
```bash
# Error: Deno not found
curl -fsSL https://deno.land/install.sh | sh
export PATH="$HOME/.deno/bin:$PATH"

# Error: Permission denied
chmod +x start-server.sh
bash start-server.sh

# Error: Port 8000 in use
lsof -ti:8000 | xargs kill
bash start-server.sh
```

### "Failed to fetch" error
**Nguyên nhân:** Backend server chưa chạy

**Fix:**
1. Check backend có chạy không:
   ```bash
   curl http://localhost:8000/make-server-80868a71/health
   ```
2. Nếu không response → Start backend:
   ```bash
   bash start-server.sh
   ```
3. Thử lại trong browser

### Database không có data
```bash
# Via UI: Database → Import dữ liệu demo

# Via API:
curl -X POST http://localhost:8000/make-server-80868a71/init-demo-data
```

---

## 📝 Useful Commands

### Check if servers are running
```bash
# Check frontend (port 5173)
lsof -i :5173

# Check backend (port 8000)
lsof -i :8000

# Test backend health
curl http://localhost:8000/make-server-80868a71/health
```

### Stop servers
```bash
# Frontend
Ctrl+C in Terminal 1

# Backend
Ctrl+C in Terminal 2

# Force kill
pkill -f vite
pkill -f deno
```

### Restart servers
```bash
# Frontend
npm run dev

# Backend
bash start-server.sh
```

---

## 🔍 Verify Everything Works

### ✅ Checklist:
- [ ] Frontend runs (http://localhost:5173)
- [ ] Backend runs (http://localhost:8000)
- [ ] Health check passes
- [ ] Demo data imported (69 records)
- [ ] Dashboard shows data
- [ ] Business Units page loads
- [ ] CRUD operations work
- [ ] Data persists after reload

### Test Commands:
```bash
# 1. Health
curl http://localhost:8000/make-server-80868a71/health

# 2. Get BUs
curl http://localhost:8000/make-server-80868a71/business-units

# 3. Get KPIs
curl http://localhost:8000/make-server-80868a71/kpis

# 4. Database stats
curl http://localhost:8000/make-server-80868a71/database-stats
```

---

## 🌐 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | React UI |
| Backend API | http://localhost:8000/make-server-80868a71 | REST API |
| Health Check | http://localhost:8000/make-server-80868a71/health | Server status |
| Database Stats | http://localhost:8000/make-server-80868a71/database-stats | Data count |

---

## 💡 Development Tips

### Hot Reload
- ✅ Frontend: Auto-reload khi edit files
- ❌ Backend: Cần restart khi edit server code

### Logs
```bash
# Frontend logs: Terminal 1 hoặc Browser Console
# Backend logs: Terminal 2
```

### API Testing
```bash
# Use curl
curl http://localhost:8000/make-server-80868a71/business-units

# Or use Postman / Insomnia
# Import collection từ DATABASE_DOCUMENTATION.md
```

---

## 🚀 Production Mode

### Build Frontend
```bash
npm run build
```
→ Output: `dist/` folder

### Deploy Backend
```bash
# Deploy to Supabase Edge Functions
supabase functions deploy make-server-80868a71
```

---

**Happy Coding! 🎉**

Nếu có issue, check:
1. Both terminals running?
2. Backend logs có errors?
3. Browser console có errors?
4. Port 5173 và 8000 available?
