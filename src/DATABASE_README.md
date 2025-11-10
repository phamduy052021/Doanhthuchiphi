# 🗄️ Database System Documentation

## Tổng quan

Hệ thống dashboard đã được tích hợp với **Supabase Backend** để lưu trữ và quản lý dữ liệu thực tế. Tất cả dữ liệu được lưu persistent và có thể được truy cập từ bất kỳ đâu.

## 🏗️ Kiến trúc

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   Frontend   │ ─────▶  │ Hono Server  │ ─────▶  │  Supabase    │
│   (React)    │         │   (Edge Fn)  │         │   KV Store   │
└──────────────┘         └──────────────┘         └──────────────┘
      ▲                                                    │
      │                                                    │
      └────────────────── Real-time Data ─────────────────┘
```

### Components:

1. **Frontend (React)**: UI components
2. **API Service Layer** (`/services/api.ts`): Client-side API calls
3. **Hono Server** (`/supabase/functions/server/index.tsx`): RESTful API
4. **Supabase KV Store**: PostgreSQL-based key-value storage

## 📊 Database Schema

### Key Patterns:

| Pattern | Description | Example |
|---------|-------------|---------|
| `bu:{id}` | Business Units | `bu:bu-001` |
| `kpi:{id}` | KPI Master | `kpi:kpi-001` |
| `revenue:{buId}:{id}` | Revenue Sources | `revenue:bu-001:rev-001` |
| `variable_cost:{buId}:{id}` | Variable Costs | `variable_cost:bu-001:vc-001` |
| `fixed_cost:{id}` | Fixed Costs | `fixed_cost:fc-001` |
| `fixed_cost_allocation:{fcId}:{buId}` | FC Allocations | `fixed_cost_allocation:fc-001:bu-001` |
| `employee:{id}` | Employees | `employee:emp-001` |
| `employee_allocation:{empId}:{buId}` | Emp Allocations | `employee_allocation:emp-001:bu-001` |
| `user:{id}` | System Users | `user:user-001` |
| `permission:{userId}:{resource}` | Permissions | `permission:user-001:dashboard` |

### Data Models:

#### Business Unit
```typescript
{
  id: string;
  name: string;
  manager: string;
  region: string;
  status: "active" | "inactive";
  createdAt: string;
}
```

#### KPI Master
```typescript
{
  id: string;
  name: string;
  category: "revenue" | "cost" | "efficiency" | "quality" | "customer";
  businessUnitId: string;
  businessUnit: string;
  targetValue: number;
  actualValue: number;
  unit: string;
  responsiblePersonId: string;
  responsiblePerson: string;
  achievementRate: number;
  month: string;
  year: string;
  status: "achieved" | "on-track" | "at-risk" | "missed";
  linkedRevenue?: number;
  linkedCost?: number;
}
```

#### Revenue Source
```typescript
{
  id: string;
  businessUnitId: string;
  name: string;
  unit: string;
  unitPrice: number;
  quantity: number;
  growthRate: number;
  churnRate: number;
  cumulative: boolean;
  month: string;
  year: string;
}
```

## 🔌 API Endpoints

### Business Units
- `GET /business-units` - Get all business units
- `GET /business-units/:id` - Get single business unit
- `POST /business-units` - Create business unit
- `PUT /business-units/:id` - Update business unit
- `DELETE /business-units/:id` - Delete business unit

### KPIs
- `GET /kpis` - Get all KPIs
- `GET /kpis/business-unit/:buId` - Get KPIs by BU
- `POST /kpis` - Create KPI
- `PUT /kpis/:id` - Update KPI
- `DELETE /kpis/:id` - Delete KPI

### Revenue Sources
- `GET /revenue-sources/:buId` - Get revenue by BU
- `POST /revenue-sources` - Create revenue source
- `PUT /revenue-sources/:buId/:id` - Update revenue source
- `DELETE /revenue-sources/:buId/:id` - Delete revenue source

### Variable Costs
- `GET /variable-costs/:buId` - Get costs by BU
- `POST /variable-costs` - Create cost
- `PUT /variable-costs/:buId/:id` - Update cost
- `DELETE /variable-costs/:buId/:id` - Delete cost

### Fixed Costs
- `GET /fixed-costs` - Get all fixed costs
- `POST /fixed-costs` - Create fixed cost
- `PUT /fixed-costs/:id` - Update fixed cost
- `DELETE /fixed-costs/:id` - Delete fixed cost
- `GET /fixed-cost-allocations/:fixedCostId` - Get allocations
- `POST /fixed-cost-allocations` - Create/Update allocation

### Employees
- `GET /employees` - Get all employees
- `POST /employees` - Create employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee
- `GET /employee-allocations/:employeeId` - Get allocations
- `POST /employee-allocations` - Create/Update allocation

### Users & Permissions
- `GET /users` - Get all users
- `POST /users` - Create user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `GET /permissions/:userId` - Get user permissions
- `POST /permissions` - Create/Update permission

### Database Management
- `POST /init-demo-data` - Initialize demo data
- `DELETE /clear-all-data` - Clear all data
- `GET /health` - Health check

## 🚀 Getting Started

### 1. Khởi tạo Database

1. Vào trang **"Database"** trong sidebar (mục HỆ THỐNG)
2. Click **"Kiểm tra trạng thái"** để check connection
3. Click **"Import dữ liệu demo"** để khởi tạo database với dữ liệu mẫu

### 2. Demo Data Included

Khi import demo data, bạn sẽ có:

- ✅ 4 Business Units (Bán lẻ MB, Bán lẻ MN, Sản xuất, Logistics)
- ✅ 8 Employees với phân bổ chi phí
- ✅ 6 KPI Master records
- ✅ 5 Revenue Sources
- ✅ 6 Variable Costs
- ✅ 5 Fixed Costs với allocations
- ✅ 4 System Users với RBAC permissions

### 3. Sử dụng API trong Code

```typescript
import api from './services/api';

// Get all business units
const result = await api.businessUnits.getAll();
if (result.success) {
  console.log(result.data);
}

// Create new KPI
const newKPI = await api.kpis.create({
  name: "Doanh thu Q4",
  category: "revenue",
  businessUnitId: "bu-001",
  targetValue: 10000000000,
  actualValue: 9500000000,
  // ... other fields
});

// Update business unit
await api.businessUnits.update("bu-001", {
  name: "Đơn vị Bán lẻ Miền Bắc - Updated"
});
```

## 🔄 Data Flow

```
User Action (Add/Edit/Delete)
      │
      ▼
Frontend Component calls API Service
      │
      ▼
API Service sends HTTP request to Server
      │
      ▼
Hono Server validates & processes
      │
      ▼
KV Store saves/retrieves data
      │
      ▼
Response back to Frontend
      │
      ▼
UI updates with new data
```

## 🔐 Security Notes

- API calls use Supabase anonymous key for public access
- Production systems should implement proper authentication
- Row Level Security (RLS) can be added for advanced security
- Current setup is designed for demo/prototype purposes

## 📝 Best Practices

### 1. Error Handling

```typescript
const result = await api.businessUnits.create(data);
if (!result.success) {
  console.error('Error creating business unit:', result.error);
  alert('Không thể tạo đơn vị: ' + result.error);
  return;
}
// Success - proceed with data
```

### 2. Loading States

```typescript
const [loading, setLoading] = useState(false);

const handleSave = async () => {
  setLoading(true);
  try {
    await api.kpis.create(formData);
    // Success handling
  } finally {
    setLoading(false);
  }
};
```

### 3. Data Refresh

```typescript
useEffect(() => {
  async function loadData() {
    const result = await api.businessUnits.getAll();
    if (result.success) {
      setBusinessUnits(result.data);
    }
  }
  loadData();
}, []);
```

## 🛠️ Development

### Adding New Endpoints

1. **Define route in** `/supabase/functions/server/index.tsx`:
```typescript
app.get("/make-server-80868a71/my-endpoint", async (c) => {
  // Implementation
});
```

2. **Add API method in** `/services/api.ts`:
```typescript
export const myApi = {
  getData: () => apiCall("/my-endpoint"),
};
```

3. **Use in component**:
```typescript
const data = await api.myApi.getData();
```

## 🧪 Testing

### Test Database Connection
```typescript
const health = await api.database.healthCheck();
console.log('Server status:', health);
```

### Clear and Re-seed
```typescript
// Clear all data
await api.database.clearAllData();

// Import fresh demo data
await api.database.initDemoData();
```

## 📊 Monitoring

- Check server logs in Supabase Dashboard
- Use `/health` endpoint for uptime monitoring
- Monitor API response times
- Track error rates

## 🔮 Future Enhancements

- [ ] Add authentication & authorization
- [ ] Implement data validation schemas
- [ ] Add data backup/restore functionality
- [ ] Create migration system
- [ ] Add real-time subscriptions
- [ ] Implement caching layer
- [ ] Add audit logging
- [ ] Create data export functionality

## 💡 Tips

1. **Always check connection first** - Use "Kiểm tra trạng thái" before operations
2. **Import demo data once** - Don't re-import unless you clear first
3. **Use proper error handling** - Always handle API errors gracefully
4. **Reload to verify** - After changes, reload page to see persisted data
5. **Check console for errors** - Server logs errors to browser console

## 🆘 Troubleshooting

### Issue: "Demo data already exists"
**Solution**: Clear all data first, then re-import

### Issue: Connection timeout
**Solution**: Check Supabase project is active, verify projectId and publicAnonKey

### Issue: Data not persisting
**Solution**: Verify API calls are successful, check browser console for errors

### Issue: 404 errors
**Solution**: Ensure all endpoints have `/make-server-80868a71` prefix

## 📞 Support

For issues or questions:
1. Check browser console for error messages
2. Verify Supabase connection status
3. Review API endpoint documentation
4. Check network tab in DevTools

---

**Last Updated**: November 10, 2025
**Version**: 1.0.0
