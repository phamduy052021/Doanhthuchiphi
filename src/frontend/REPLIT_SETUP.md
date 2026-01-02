# 🚀 Hướng dẫn Setup trên Replit

## Tổng quan

Project này là **BU Management System** - hệ thống quản lý đơn vị kinh doanh với:
- ✅ Frontend: React + TypeScript + Tailwind CSS
- ✅ Backend: Deno + Hono Web Framework
- ✅ Database: Supabase (PostgreSQL + KV Store)
- ✅ 40+ API endpoints
- ✅ 10 entity types với relationships
- ✅ Demo data đầy đủ (69 records)

---

## 📁 Cấu trúc Project

```
bu-management-system/
├── App.tsx                          # Main React app
├── components/                      # React components
│   ├── ui/                         # Shadcn UI components
│   ├── Dashboard.tsx
│   ├── BusinessUnitsPage.tsx
│   ├── BUPerformancePage.tsx
│   ├── EmployeeManagement.tsx
│   ├── FixedCostManagement.tsx
│   ├── ReportingAnalytics.tsx
│   ├── RBACPage.tsx
│   ├── KPIManagementPage.tsx
│   ├── DatabaseManagement.tsx
│   └── ConnectionTest.tsx
├── services/
│   └── api.ts                      # API client service
├── utils/
│   └── supabase/
│       └── info.tsx                # Supabase config
├── styles/
│   └── globals.css                 # Tailwind styles
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx           # Main server (Hono)
│           ├── kv_helper.tsx       # KV Store utilities
│           ├── database-schema.tsx # Schema definitions
│           ├── demo-data.tsx       # Demo data (69 records)
│           └── query-helpers.tsx   # SQL-like query helpers
└── DATABASE_DOCUMENTATION.md       # Full database docs

TỔNG: ~15 files chính + 30+ UI components
```

---

## 🔧 Yêu cầu hệ thống

### 1. Môi trường Replit
- **Template**: Deno hoặc Node.js
- **Port**: 5173 (Vite dev server)
- **Environment Variables**:
  ```
  SUPABASE_URL=https://your-project.supabase.co
  SUPABASE_ANON_KEY=your-anon-key
  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
  SUPABASE_DB_URL=postgresql://...
  ```

### 2. Supabase Project
- Tạo project mới tại: https://supabase.com
- Enable KV Store (mặc định có table `kv_store_80868a71`)
- Copy credentials vào Replit Secrets

---

## 📦 Bước 1: Tạo Replit Project

### Option A: Import từ GitHub (Recommended)
1. Push code lên GitHub repository
2. Tạo Replit từ GitHub import
3. Chọn template: **Deno** hoặc **Vite + React**

### Option B: Manual Setup
1. Tạo new Replit → Template: **Vite + React + TypeScript**
2. Copy toàn bộ files từ Figma Make
3. Cài đặt dependencies

---

## 🛠️ Bước 2: Cài đặt Dependencies

### Frontend (package.json)
```json
{
  "name": "bu-management-system",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "server": "deno run --allow-net --allow-env --allow-read supabase/functions/server/index.tsx"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.344.0",
    "recharts": "^2.12.0",
    "react-hook-form": "^7.55.0",
    "sonner": "^2.0.3",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-tooltip": "^1.0.7"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.5.3",
    "vite": "^5.3.4",
    "tailwindcss": "^4.0.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38"
  }
}
```

Chạy:
```bash
npm install
```

### Backend (Deno)
Không cần install, Deno tự động download khi chạy.

---

## ⚙️ Bước 3: Cấu hình Supabase

### 1. Tạo Supabase Project
```bash
# Vào https://supabase.com/dashboard
1. Create new project
2. Chọn region gần nhất (Southeast Asia)
3. Đặt database password
4. Đợi ~2 phút để provision
```

### 2. Lấy Credentials
```bash
# Project Settings → API
SUPABASE_URL: https://xxxxx.supabase.co
SUPABASE_ANON_KEY: eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY: eyJhbGc...

# Project Settings → Database → Connection string
SUPABASE_DB_URL: postgresql://postgres:[password]@db.xxx.supabase.co:5432/postgres
```

### 3. Thêm vào Replit Secrets
```bash
# Replit → Tools → Secrets
Add secret: SUPABASE_URL = https://xxxxx.supabase.co
Add secret: SUPABASE_ANON_KEY = eyJhbGc...
Add secret: SUPABASE_SERVICE_ROLE_KEY = eyJhbGc...
Add secret: SUPABASE_DB_URL = postgresql://...
```

### 4. Update `/utils/supabase/info.tsx`
```typescript
export const projectId = "xxxxx"; // Lấy từ SUPABASE_URL
export const publicAnonKey = "eyJhbGc..."; // SUPABASE_ANON_KEY
```

---

## 🚀 Bước 4: Chạy Hệ thống

### Development Mode

**Terminal 1: Frontend**
```bash
npm run dev
# Hoặc
vite
```
→ Frontend chạy tại: http://localhost:5173

**Terminal 2: Backend Server**
```bash
deno run --allow-net --allow-env --allow-read supabase/functions/server/index.tsx
```
→ Server chạy tại: http://localhost:8000

### Production Mode (Supabase Edge Functions)

Deploy server lên Supabase:
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref xxxxx

# Deploy function
supabase functions deploy make-server-80868a71 \
  --project-ref xxxxx
```

Server sẽ chạy tại:
```
https://xxxxx.supabase.co/functions/v1/make-server-80868a71
```

---

## 🗄️ Bước 5: Khởi tạo Database

### Tự động (Recommended)
1. Mở app: http://localhost:5173
2. Vào trang **Database** (trong sidebar "HỆ THỐNG")
3. Click **"Kiểm tra trạng thái"** → Verify connection
4. Click **"Import dữ liệu demo"** → Tạo 69 records

### Thủ công (Via API)
```bash
# Health check
curl http://localhost:8000/make-server-80868a71/health

# Init demo data
curl -X POST http://localhost:8000/make-server-80868a71/init-demo-data

# Check stats
curl http://localhost:8000/make-server-80868a71/database-stats
```

---

## 📊 Database Schema

### Entities (10 types)
```
1. Business Units (5 records)
   - Miền Bắc, Miền Nam, Miền Trung
   - E-commerce, Customer Service

2. KPI Categories (4 records)
   - Doanh thu, Lợi nhuận, Khách hàng, Vận hành

3. KPIs (12 records)
   - Gắn với BUs và categories
   - Auto-calculate achievement rate

4. Revenue Sources (7 records)
   - Theo BU và period

5. Variable Costs (7 records)
   - Chi phí biến đổi theo BU

6. Fixed Costs (9 records)
   - Corporate (3) + BU-level (6)

7. Employees (10 records)
   - BU employees (7) + C-level (3)

8. Users (5 records)
   - Admin, BU Managers, Viewer

9. Roles (3 records)
   - Admin, BU Manager, Viewer

10. Permissions (7 records)
    - CRUD permissions cho resources
```

### KV Store Key Patterns
```
bu:{id}                           → Business Units
kpi:{id}                          → KPIs
kpi_category:{id}                 → Categories
revenue:{buId}:{id}               → Revenue Sources
variable_cost:{buId}:{id}         → Variable Costs
fixed_cost:{id}                   → Fixed Costs (corporate)
fixed_cost:{buId}:{id}            → Fixed Costs (BU)
employee:{id}                     → Employees
user:{id}                         → Users
role:{id}                         → Roles
permission:{id}                   → Permissions
```

---

## 🔌 API Endpoints (40+)

### Health & Database
```
GET  /make-server-80868a71/health
POST /make-server-80868a71/init-demo-data
DELETE /make-server-80868a71/clear-all-data
GET  /make-server-80868a71/database-stats
```

### Business Units
```
GET    /make-server-80868a71/business-units
GET    /make-server-80868a71/business-units/:id
POST   /make-server-80868a71/business-units
PUT    /make-server-80868a71/business-units/:id
DELETE /make-server-80868a71/business-units/:id
```

### KPIs
```
GET    /make-server-80868a71/kpis?businessUnitId=&period=&categoryId=
GET    /make-server-80868a71/kpis/business-unit/:buId
GET    /make-server-80868a71/kpi-categories
POST   /make-server-80868a71/kpis
PUT    /make-server-80868a71/kpis/:id
DELETE /make-server-80868a71/kpis/:id
```

### Finance
```
GET    /make-server-80868a71/revenue-sources/:buId
POST   /make-server-80868a71/revenue-sources
GET    /make-server-80868a71/variable-costs/:buId
POST   /make-server-80868a71/variable-costs
GET    /make-server-80868a71/fixed-costs?businessUnitId=
POST   /make-server-80868a71/fixed-costs
PUT    /make-server-80868a71/fixed-costs/:id
DELETE /make-server-80868a71/fixed-costs/:id
```

### Employees
```
GET    /make-server-80868a71/employees?businessUnitId=
POST   /make-server-80868a71/employees
PUT    /make-server-80868a71/employees/:id
DELETE /make-server-80868a71/employees/:id
```

### Users & Permissions
```
GET    /make-server-80868a71/users
POST   /make-server-80868a71/users
PUT    /make-server-80868a71/users/:id
DELETE /make-server-80868a71/users/:id
GET    /make-server-80868a71/roles
GET    /make-server-80868a71/permissions
```

---

## 🧪 Testing

### 1. Test Health
```bash
curl http://localhost:8000/make-server-80868a71/health
# Expected: {"success":true,"status":"ok",...}
```

### 2. Test Data Import
```bash
curl -X POST http://localhost:8000/make-server-80868a71/init-demo-data
# Expected: {"success":true,"message":"...69 records","stats":{...}}
```

### 3. Test CRUD
```bash
# Get all BUs
curl http://localhost:8000/make-server-80868a71/business-units

# Get specific BU
curl http://localhost:8000/make-server-80868a71/business-units/bu-001

# Create new BU
curl -X POST http://localhost:8000/make-server-80868a71/business-units \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Unit",
    "manager": "Test Manager",
    "region": "Miền Bắc",
    "status": "active",
    "employeeCount": 10,
    "establishedDate": "2024-01-01"
  }'
```

---

## 🐛 Troubleshooting

### Server không chạy
```bash
# Check Deno installed
deno --version

# Check permissions
deno run --allow-net --allow-env --allow-read supabase/functions/server/index.tsx

# Check logs
# Server sẽ log mọi request và error
```

### Frontend không kết nối được Server
```bash
# Check CORS
# Server đã enable CORS cho "*"

# Check URL trong /services/api.ts
# Phải match với Supabase project ID

# Check Secrets
# Verify SUPABASE_URL và SUPABASE_ANON_KEY đúng
```

### Database trống
```bash
# Check KV Store có table không
# Vào Supabase Dashboard → Database → Tables
# Tìm table: kv_store_80868a71

# Manual init
curl -X POST http://localhost:8000/make-server-80868a71/init-demo-data
```

### Import demo data fail
```bash
# Clear first
curl -X DELETE http://localhost:8000/make-server-80868a71/clear-all-data

# Then import
curl -X POST http://localhost:8000/make-server-80868a71/init-demo-data
```

---

## 📚 Documentation

- **Database Schema**: `/DATABASE_DOCUMENTATION.md`
- **API Endpoints**: Xem section "API Endpoints" ở trên
- **Code Comments**: Tất cả files đều có comments chi tiết

---

## 🚢 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy folder: dist/
```

### Backend (Supabase Edge Functions)
```bash
supabase functions deploy make-server-80868a71
```

### Environment Variables
```
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_DB_URL
```

---

## 🎯 Next Steps trên Replit

1. **Enhance Backend**
   - Thêm authentication layer
   - Implement caching
   - Add rate limiting
   - WebSocket cho real-time updates

2. **Optimize Database**
   - Migrate từ KV Store sang proper tables
   - Add indexes
   - Implement migrations
   - Add backup/restore

3. **Add Features**
   - Export to Excel/PDF
   - Email notifications
   - Advanced analytics
   - Multi-language support

4. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests với Playwright

---

## 💡 Tips

1. **Development**
   - Dùng Replit's built-in debugger
   - Enable hot reload cho Vite
   - Check console logs thường xuyên

2. **Performance**
   - Cache API responses
   - Lazy load components
   - Optimize bundle size

3. **Security**
   - NEVER commit Secrets
   - Use Replit Secrets management
   - Validate all inputs
   - Sanitize data

---

**Version:** 1.0  
**Last Updated:** November 10, 2024  
**Contact:** Support team

Happy coding! 🚀
