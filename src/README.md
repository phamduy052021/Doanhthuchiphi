# 🏢 BU Management System

**Hệ thống Dashboard Quản lý Đơn vị Kinh doanh chuyên nghiệp**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://react.dev/)
[![Deno](https://img.shields.io/badge/Deno-1.40-green)](https://deno.land/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)

> 🚀 **Quick Start:** [5-Minute Setup Guide](./QUICK_START.md)  
> 🔗 **GitHub → Replit:** [Import Guide](./GITHUB_TO_REPLIT.md)  
> 📚 **Full Docs:** [Database Documentation](./DATABASE_DOCUMENTATION.md)

---

## 🎯 Giới thiệu

Hệ thống quản lý toàn diện cho các đơn vị kinh doanh (Business Units) với:
- 📊 **Dashboard KPI** real-time với biểu đồ analytics
- 🏢 **Business Units Management** - CRUD operations đầy đủ
- 🎯 **KPI Tracking** - Theo dõi chi tiết với 5 tabs phân tích
- 💰 **Financial Management** - Revenue, Variable Costs, Fixed Costs
- 👥 **Employee Management** - Quản lý nhân viên theo BU
- 📈 **Reporting & Analytics** - Biểu đồ và báo cáo
- 🔐 **RBAC** - Role-Based Access Control
- 🗄️ **Real Database** - Supabase với data persistence

---

## ✨ Tính năng

### 1. **Dashboard Chính**
- KPI Cards với số liệu real-time
- Biểu đồ doanh thu, chi phí
- Business Units overview
- Quick actions

### 2. **Business Units Management**
- CRUD operations đầy đủ
- Filter theo region, status
- Search functionality
- Chi tiết từng BU

### 3. **BU Performance Page (5 Tabs)**
- **KPI Tab**: Theo dõi chỉ số KPI
- **Revenue Tab**: Nguồn doanh thu
- **Variable Costs Tab**: Chi phí biến đổi
- **Fixed Costs Tab**: Chi phí cố định
- **Summary Tab**: Tổng quan tài chính

### 4. **Employee Management**
- Quản lý nhân viên theo BU
- Import/Export data
- Salary management

### 5. **Fixed Cost Management**
- Corporate level costs
- BU-specific costs
- Allocation management

### 6. **Reporting & Analytics**
- Advanced charts (Recharts)
- Period comparison
- Export to Excel/PDF

### 7. **User & Permissions (RBAC)**
- User management
- Role assignment
- Permission matrix

### 8. **KPI Management**
- Overview dashboard
- Advanced filters
- CRUD modal
- Analytics charts

### 9. **Database Management**
- Health check
- Import demo data (69 records)
- Clear all data
- Connection testing

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI library
- **TypeScript 5.5** - Type safety
- **Tailwind CSS 4.0** - Styling
- **Vite 5.3** - Build tool
- **Shadcn UI** - Component library
- **Lucide Icons** - Icon set
- **Recharts** - Chart library

### Backend
- **Deno** - Runtime
- **Hono** - Web framework
- **TypeScript** - Type safety

### Database
- **Supabase** - Backend as a Service
- **PostgreSQL** - Relational database
- **KV Store** - Key-value storage

---

## 📊 Database Schema

### 10 Entity Types:
1. **Business Units** (5 records)
2. **KPI Categories** (4 records)
3. **KPIs** (12 records)
4. **Revenue Sources** (7 records)
5. **Variable Costs** (7 records)
6. **Fixed Costs** (9 records)
7. **Employees** (10 records)
8. **Users** (5 records)
9. **Roles** (3 records)
10. **Permissions** (7 records)

**Total Demo Data:** 69 records với relationships đầy đủ

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js >= 18.0.0
npm >= 9.0.0
Deno >= 1.40.0
Supabase account
```

### Installation

**1. Clone repository**
```bash
git clone https://github.com/your-username/bu-management-system.git
cd bu-management-system
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure Supabase**
```bash
# Create .env file
cp .env.example .env

# Add your Supabase credentials
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_DB_URL=postgresql://...
```

**4. Update Supabase config**
```typescript
// Edit /utils/supabase/info.tsx
export const projectId = "xxxxx";
export const publicAnonKey = "your-anon-key";
```

**5. Start development servers**

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
npm run server
```

**6. Initialize database**
```bash
# Via UI: http://localhost:5173 → Database → Import dữ liệu demo

# Via API:
curl -X POST http://localhost:8000/make-server-80868a71/init-demo-data
```

**7. Access application**
```
Frontend: http://localhost:5173
Backend: http://localhost:8000
```

---

## 📁 Project Structure

```
bu-management-system/
├── components/              # React components
│   ├── ui/                 # Shadcn UI components (30+ files)
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
│   └── api.ts              # API client (40+ endpoints)
├── utils/
│   └── supabase/
│       └── info.tsx        # Supabase config
├── styles/
│   └── globals.css         # Global styles
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx           # Main server
│           ├── kv_helper.tsx       # KV utilities
│           ├── database-schema.tsx # Schema definitions
│           ├── demo-data.tsx       # Demo data
│           └── query-helpers.tsx   # Query utilities
├── App.tsx                 # Main app component
├── package.json
├── tsconfig.json
├── vite.config.ts
├── DATABASE_DOCUMENTATION.md
├── REPLIT_SETUP.md
├── EXPORT_GUIDE.md
└── README.md
```

---

## 🔌 API Endpoints

### Health & Database
```
GET    /make-server-80868a71/health
POST   /make-server-80868a71/init-demo-data
DELETE /make-server-80868a71/clear-all-data
GET    /make-server-80868a71/database-stats
```

### Business Units (5 endpoints)
```
GET    /make-server-80868a71/business-units
GET    /make-server-80868a71/business-units/:id
POST   /make-server-80868a71/business-units
PUT    /make-server-80868a71/business-units/:id
DELETE /make-server-80868a71/business-units/:id
```

### KPIs (6 endpoints)
```
GET    /make-server-80868a71/kpis
GET    /make-server-80868a71/kpis/business-unit/:buId
GET    /make-server-80868a71/kpi-categories
POST   /make-server-80868a71/kpis
PUT    /make-server-80868a71/kpis/:id
DELETE /make-server-80868a71/kpis/:id
```

### Finance (8 endpoints)
### Employees (4 endpoints)
### Users & Permissions (6 endpoints)

**Total:** 40+ endpoints

---

## 🎨 Design System

### Colors
- Primary: Blue (#3b82f6)
- Success: Green (#10b981)
- Warning: Orange (#f59e0b)
- Danger: Red (#ef4444)

### Spacing
- Grid: 8px base
- Border radius: 12px
- Shadows: Subtle elevation

### Typography
- Font: System fonts
- Scales: Tailwind default

---

## 🧪 Testing

### Health Check
```bash
curl http://localhost:8000/make-server-80868a71/health
```

### Get Business Units
```bash
curl http://localhost:8000/make-server-80868a71/business-units
```

### Create Business Unit
```bash
curl -X POST http://localhost:8000/make-server-80868a71/business-units \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Unit",
    "manager": "Manager Name",
    "region": "Miền Bắc",
    "status": "active",
    "employeeCount": 10,
    "establishedDate": "2024-01-01"
  }'
```

---

## 📚 Documentation

- **[Database Documentation](./DATABASE_DOCUMENTATION.md)** - Full database schema & API docs
- **[Replit Setup Guide](./REPLIT_SETUP.md)** - Setup trên Replit
- **[Export Guide](./EXPORT_GUIDE.md)** - Hướng dẫn export project

---

## 🚢 Deployment

### Frontend (Vercel)
```bash
npm run build
vercel deploy
```

### Backend (Supabase Edge Functions)
```bash
supabase login
supabase link --project-ref xxxxx
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

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

MIT License - see LICENSE file for details

---

## 👥 Authors

- **BU Management Team** - Initial work

---

## 🙏 Acknowledgments

- Shadcn UI for beautiful components
- Recharts for charts
- Supabase for backend
- Deno for runtime
- Hono for web framework

---

## 📞 Support

- Documentation: See `/DATABASE_DOCUMENTATION.md`
- Issues: GitHub Issues
- Email: support@example.com

---

## 🗺️ Roadmap

- [ ] Export to Excel/PDF
- [ ] Real-time updates via WebSocket
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Mobile responsive improvements
- [ ] Advanced analytics
- [ ] Proper SQL database migration
- [ ] Unit & E2E tests

---

**Made with ❤️ using React, TypeScript, and Supabase**

---

**Version:** 1.0.0  
**Last Updated:** November 10, 2024  
**Status:** Production Ready ✅