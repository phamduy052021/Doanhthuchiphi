# 📊 Database Documentation - BU Management System

## Overview

Hệ thống database được thiết kế với **KV Store architecture** sử dụng Supabase `kv_store_80868a71` table. Mặc dù sử dụng single table, data được tổ chức có cấu trúc với key prefixes để simulate relational database.

## Architecture

```
┌─────────────────────────────────────────────┐
│     Frontend (React Components)             │
└──────────────┬──────────────────────────────┘
               │
               │ API Calls via /services/api.ts
               ▼
┌─────────────────────────────────────────────┐
│   Server (Hono @ /supabase/functions/)     │
│   - Validation Layer                        │
│   - Query Helpers                           │
│   - CRUD Operations                         │
└──────────────┬──────────────────────────────┘
               │
               │ KV Store Operations
               ▼
┌─────────────────────────────────────────────┐
│   Supabase KV Store (kv_store_80868a71)    │
│   - Key: String (with prefixes)             │
│   - Value: JSONB (structured data)          │
└─────────────────────────────────────────────┘
```

---

## 📋 Data Entities

### 1. **Business Units** (`bu:`)

Đơn vị kinh doanh - core entity của hệ thống.

**Key Pattern:** `bu:{id}`

**Schema:**
```typescript
{
  id: string;                    // "bu-001", "bu-002"
  name: string;                  // "Đơn vị Bán lẻ Miền Bắc"
  manager: string;               // "Trần Văn A"
  region: "Miền Bắc" | "Miền Trung" | "Miền Nam" | "Toàn quốc";
  status: "active" | "inactive" | "suspended";
  description?: string;
  establishedDate: string;       // ISO date
  employeeCount: number;
  createdAt: string;             // ISO timestamp
  updatedAt: string;
}
```

**Relationships:**
- Has many: KPIs, Revenue Sources, Variable Costs, Fixed Costs, Employees
- Belongs to: None (top-level entity)

**Endpoints:**
- `GET /business-units` - Get all BUs
- `GET /business-units/:id` - Get single BU
- `POST /business-units` - Create new BU
- `PUT /business-units/:id` - Update BU
- `DELETE /business-units/:id` - Delete BU

---

### 2. **KPIs** (`kpi:`)

Key Performance Indicators - chỉ số đánh giá hiệu suất.

**Key Pattern:** `kpi:{id}`

**Schema:**
```typescript
{
  id: string;
  businessUnitId: string;        // FK -> business_units
  categoryId: string;            // FK -> kpi_categories
  name: string;
  description?: string;
  unit: string;                  // "tỷ VND", "%", "khách hàng"
  period: string;                // "2024-Q1", "2024-Q2", "2024-01"
  targetValue: number;
  actualValue: number;
  achievementRate: number;       // Auto-calculated: (actual/target)*100
  status: "achieved" | "on-track" | "at-risk" | "failed";
  weight: number;                // 1-10, importance
  createdAt: string;
  updatedAt: string;
}
```

**Business Rules:**
- `achievementRate` tự động tính: `(actualValue / targetValue) * 100`
- `status` tự động set:
  - ≥100%: "achieved"
  - ≥95%: "on-track"
  - <95%: "at-risk"

**Relationships:**
- Belongs to: Business Unit, KPI Category

**Endpoints:**
- `GET /kpis?businessUnitId=&period=&categoryId=` - Get KPIs with filters
- `GET /kpis/business-unit/:buId` - Get all KPIs for a BU
- `POST /kpis` - Create new KPI
- `PUT /kpis/:id` - Update KPI
- `DELETE /kpis/:id` - Delete KPI

---

### 3. **KPI Categories** (`kpi_category:`)

Danh mục phân loại KPIs.

**Key Pattern:** `kpi_category:{id}`

**Schema:**
```typescript
{
  id: string;
  name: string;                  // "Doanh thu", "Lợi nhuận"
  description?: string;
  color: string;                 // Hex color "#10b981"
  icon: string;                  // Lucide icon name
  order: number;                 // Display order
  createdAt: string;
}
```

**Demo Data:**
- Doanh thu (green, TrendingUp)
- Lợi nhuận (blue, DollarSign)
- Khách hàng (purple, Users)
- Vận hành (orange, Activity)

**Endpoints:**
- `GET /kpi-categories` - Get all categories

---

### 4. **Revenue Sources** (`revenue:`)

Nguồn doanh thu theo đơn vị và thời kỳ.

**Key Pattern:** `revenue:{businessUnitId}:{id}`

**Schema:**
```typescript
{
  id: string;
  businessUnitId: string;        // FK -> business_units
  name: string;
  category: "Bán hàng" | "Dịch vụ" | "Hợp đồng" | "Khác";
  amount: number;                // VND
  period: string;                // "2024-Q1", "2024-01"
  status: "confirmed" | "pending" | "projected";
  description?: string;
  createdAt: string;
  updatedAt: string;
}
```

**Relationships:**
- Belongs to: Business Unit

**Endpoints:**
- `GET /revenue-sources/:buId` - Get all revenue for a BU
- `POST /revenue-sources` - Create new revenue

---

### 5. **Variable Costs** (`variable_cost:`)

Chi phí biến đổi theo hoạt động kinh doanh.

**Key Pattern:** `variable_cost:{businessUnitId}:{id}`

**Schema:**
```typescript
{
  id: string;
  businessUnitId: string;
  name: string;
  category: "Nguyên vật liệu" | "Nhân công trực tiếp" | 
            "Vận chuyển" | "Hoa hồng" | "Khác";
  amount: number;
  period: string;
  unit: string;                  // "VND", "%"
  description?: string;
  createdAt: string;
  updatedAt: string;
}
```

**Relationships:**
- Belongs to: Business Unit

**Endpoints:**
- `GET /variable-costs/:buId` - Get variable costs for a BU
- `POST /variable-costs` - Create new variable cost

---

### 6. **Fixed Costs** (`fixed_cost:`)

Chi phí cố định (corporate hoặc BU level).

**Key Pattern:** 
- Corporate: `fixed_cost:{id}`
- BU level: `fixed_cost:{businessUnitId}:{id}`

**Schema:**
```typescript
{
  id: string;
  businessUnitId?: string;       // Optional - null means corporate level
  name: string;
  category: "Nhân sự" | "Văn phòng" | "Marketing" | 
            "IT" | "Khấu hao" | "Khác";
  amount: number;
  period: string;
  frequency: "monthly" | "quarterly" | "yearly";
  description?: string;
  createdAt: string;
  updatedAt: string;
}
```

**Business Rules:**
- Nếu `businessUnitId` null/undefined → Corporate level cost
- Nếu có `businessUnitId` → BU-specific cost

**Endpoints:**
- `GET /fixed-costs?businessUnitId=` - Get fixed costs (corporate or BU)
- `POST /fixed-costs` - Create new fixed cost
- `PUT /fixed-costs/:id` - Update fixed cost
- `DELETE /fixed-costs/:id` - Delete fixed cost

---

### 7. **Employees** (`employee:`)

Nhân viên thuộc đơn vị hoặc corporate.

**Key Pattern:** `employee:{id}`

**Schema:**
```typescript
{
  id: string;
  businessUnitId?: string;       // Optional - corporate employees have no BU
  employeeCode: string;          // "EMP0001"
  name: string;
  email: string;
  phone?: string;
  position: string;
  department: string;
  salary: number;
  startDate: string;             // ISO date
  status: "active" | "on-leave" | "terminated";
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}
```

**Validation:**
- `email`: Valid email format
- `employeeCode`: Pattern `EMP\d{4}`
- `salary`: >= 0

**Relationships:**
- Belongs to: Business Unit (optional)

**Endpoints:**
- `GET /employees?businessUnitId=` - Get employees (all, BU, or corporate)
- `POST /employees` - Create new employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

---

### 8. **Users** (`user:`)

Người dùng hệ thống với quyền truy cập.

**Key Pattern:** `user:{id}`

**Schema:**
```typescript
{
  id: string;
  email: string;
  name: string;
  roleId: string;                // FK -> roles
  businessUnitIds: string[];     // Array of BU IDs user can access
  status: "active" | "inactive" | "locked";
  avatar?: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}
```

**Relationships:**
- Belongs to: Role
- Belongs to many: Business Units (via businessUnitIds array)

**Endpoints:**
- `GET /users` - Get all users
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

---

### 9. **Roles** (`role:`)

Vai trò và quyền hạn trong hệ thống.

**Key Pattern:** `role:{id}`

**Schema:**
```typescript
{
  id: string;
  name: string;                  // "Admin", "BU Manager", "Viewer"
  description?: string;
  permissionIds: string[];       // Array of permission IDs
  level: number;                 // 1=Admin, 2=Manager, 3=User
  createdAt: string;
}
```

**Default Roles:**
1. **Admin** (level 1) - Full access
2. **BU Manager** (level 2) - Manage assigned BU
3. **Viewer** (level 3) - Read-only access

**Endpoints:**
- `GET /roles` - Get all roles

---

### 10. **Permissions** (`permission:`)

Chi tiết quyền truy cập cho từng resource.

**Key Pattern:** `permission:{id}`

**Schema:**
```typescript
{
  id: string;
  name: string;
  resource: string;              // "business_units", "kpis", "employees", etc.
  actions: ("create" | "read" | "update" | "delete")[];
  description?: string;
  createdAt: string;
}
```

**Resources:**
- `business_units`
- `kpis`
- `employees`
- `finance` (revenue, costs)
- `users`

**Endpoints:**
- `GET /permissions` - Get all permissions

---

## 🔍 Query Patterns

### Filtering

```typescript
// Get KPIs by business unit
GET /kpis?businessUnitId=bu-001

// Get KPIs by period
GET /kpis?period=2024-Q1

// Get KPIs by category
GET /kpis?categoryId=cat-001

// Combined filters
GET /kpis?businessUnitId=bu-001&period=2024-Q1
```

### Special Queries

```typescript
// Get corporate-level employees (no BU)
GET /employees?businessUnitId=corporate

// Get corporate-level fixed costs
GET /fixed-costs?businessUnitId=corporate

// Get all employees (BU + corporate)
GET /employees
```

---

## 📊 Demo Data Statistics

Khi import demo data, hệ thống sẽ tạo:

| Entity | Count | Description |
|--------|-------|-------------|
| Business Units | 5 | 3 vùng miền + E-commerce + Customer Service |
| KPI Categories | 4 | Doanh thu, Lợi nhuận, Khách hàng, Vận hành |
| KPIs | 12 | Mix của các BUs, periods và categories |
| Revenue Sources | 7 | Đa dạng nguồn thu cho mỗi BU |
| Variable Costs | 7 | Chi phí biến đổi theo BU |
| Fixed Costs | 9 | 3 corporate + 6 BU-level |
| Employees | 10 | 7 BU employees + 3 C-level |
| Users | 5 | 1 Admin + 3 BU Managers + 1 Viewer |
| Roles | 3 | Admin, BU Manager, Viewer |
| Permissions | 7 | CRUD permissions for resources |
| **TOTAL** | **69 records** | |

---

## 🚀 Getting Started

### 1. Initialize Demo Data

```bash
# Via UI: Vào trang Database → Click "Import dữ liệu demo"

# Via API:
POST /init-demo-data
```

Response:
```json
{
  "success": true,
  "message": "Demo data initialized successfully with 69 records",
  "stats": {
    "businessUnits": 5,
    "kpis": 12,
    "employees": 10,
    ...
  }
}
```

### 2. Check Database Status

```bash
GET /database-stats
```

Response:
```json
{
  "success": true,
  "data": {
    "businessUnits": 5,
    "kpis": 12,
    "total": 69
  }
}
```

### 3. Clear All Data

```bash
# Via UI: Database → Click "Xóa tất cả dữ liệu"

# Via API:
DELETE /clear-all-data
```

---

## 🔐 Data Integrity

### Validation Rules

Server implements validation cho các fields quan trọng:

**Business Unit:**
- `name`: required, 3-100 chars
- `region`: must be one of enum values
- `employeeCount`: >= 0

**KPI:**
- `targetValue`, `actualValue`: >= 0
- `period`: format `YYYY-Q[1-4]` or `YYYY-MM`
- `weight`: 1-10

**Employee:**
- `email`: valid email format
- `employeeCode`: pattern `EMP\d{4}`
- `salary`: >= 0

### Auto-calculated Fields

Một số fields được tự động tính:

- **KPI.achievementRate** = (actualValue / targetValue) * 100
- **KPI.status** = based on achievementRate
- **timestamps** = createdAt, updatedAt

---

## 🛠️ Advanced Features

### Transaction Support

```typescript
import { Transaction } from "./query-helpers.tsx";

const tx = new Transaction();
await tx.set("bu:001", buData);
await tx.set("kpi:001", kpiData);
await tx.commit(); // or tx.rollback()
```

### Query Builder

```typescript
import { QueryBuilder } from "./query-helpers.tsx";

const kpis = await new QueryBuilder("kpi:")
  .where("businessUnitId", "eq", "bu-001")
  .where("achievementRate", "gte", 95)
  .orderBy("achievementRate", "desc")
  .limit(10)
  .execute();
```

### Aggregations

```typescript
import { aggregate } from "./query-helpers.tsx";

const totalRevenue = aggregate(revenues, "amount", "sum");
const avgAchievement = aggregate(kpis, "achievementRate", "avg");
```

---

## 📝 Migration Guide

Nếu sau này cần migrate sang proper relational database:

1. **Export data** từ KV store
2. **Create tables** với schema đã define
3. **Import data** vào tables mới
4. **Update queries** từ KV operations sang SQL

Schema definitions trong `/supabase/functions/server/database-schema.tsx` đã được thiết kế để dễ dàng convert sang SQL DDL.

---

## 🐛 Troubleshooting

### Database not responding

```bash
# Check health
GET /health

# Check stats
GET /database-stats
```

### Demo data import fails

- Ensure database is empty first
- Check server logs trong browser console
- Try clearing data and re-importing

### Data not showing in UI

- Verify API calls in Network tab
- Check console for errors
- Ensure server is running (health check)

---

## 📚 Additional Resources

- **Server Code**: `/supabase/functions/server/index.tsx`
- **Schema Definitions**: `/supabase/functions/server/database-schema.tsx`
- **Demo Data**: `/supabase/functions/server/demo-data.tsx`
- **Query Helpers**: `/supabase/functions/server/query-helpers.tsx`
- **API Service**: `/services/api.ts`

---

**Version:** 1.0  
**Last Updated:** November 10, 2024  
**Maintained by:** BU Management System Team
