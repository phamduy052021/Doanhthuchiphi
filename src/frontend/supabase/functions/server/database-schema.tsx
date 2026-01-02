/**
 * DATABASE SCHEMA DEFINITIONS
 * Structured schema design for KV-based database
 * Simulates proper relational database structure
 */

// ============================================
// ENTITY TYPE DEFINITIONS
// ============================================

export interface BusinessUnit {
  id: string;
  name: string;
  manager: string;
  region: "Miền Bắc" | "Miền Trung" | "Miền Nam" | "Toàn quốc";
  status: "active" | "inactive" | "suspended";
  description?: string;
  establishedDate: string;
  employeeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface KPI {
  id: string;
  businessUnitId: string; // FK -> business_units
  categoryId: string; // FK -> kpi_categories
  name: string;
  description?: string;
  unit: string;
  period: string; // "2024-Q1", "2024-Q2", etc.
  targetValue: number;
  actualValue: number;
  achievementRate: number; // calculated
  status: "achieved" | "on-track" | "at-risk" | "failed";
  weight: number; // 1-10, importance weight
  createdAt: string;
  updatedAt: string;
}

export interface KPICategory {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
  order: number;
  createdAt: string;
}

export interface RevenueSource {
  id: string;
  businessUnitId: string; // FK -> business_units
  name: string;
  category: "Bán hàng" | "Dịch vụ" | "Hợp đồng" | "Khác";
  amount: number;
  period: string; // "2024-Q1", "2024-01", etc.
  status: "confirmed" | "pending" | "projected";
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VariableCost {
  id: string;
  businessUnitId: string; // FK -> business_units
  name: string;
  category: "Nguyên vật liệu" | "Nhân công trực tiếp" | "Vận chuyển" | "Hoa hồng" | "Khác";
  amount: number;
  period: string;
  unit: string; // "VND", "%", etc.
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FixedCost {
  id: string;
  businessUnitId?: string; // Optional FK -> business_units (null = corporate level)
  name: string;
  category: "Nhân sự" | "Văn phòng" | "Marketing" | "IT" | "Khấu hao" | "Khác";
  amount: number;
  period: string;
  frequency: "monthly" | "quarterly" | "yearly";
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Employee {
  id: string;
  businessUnitId?: string; // Optional FK -> business_units
  employeeCode: string;
  name: string;
  email: string;
  phone?: string;
  position: string;
  department: string;
  salary: number;
  startDate: string;
  status: "active" | "on-leave" | "terminated";
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  roleId: string; // FK -> roles
  businessUnitIds: string[]; // Access to multiple BUs
  status: "active" | "inactive" | "locked";
  avatar?: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissionIds: string[]; // FK array -> permissions
  level: number; // 1=Admin, 2=Manager, 3=User
  createdAt: string;
}

export interface Permission {
  id: string;
  name: string;
  resource: string; // "business_units", "kpis", etc.
  actions: ("create" | "read" | "update" | "delete")[]; // CRUD permissions
  description?: string;
  createdAt: string;
}

// ============================================
// KEY STRUCTURE DOCUMENTATION
// ============================================

/**
 * KV STORE KEY PATTERNS:
 * 
 * Business Units:     bu:{id}
 * KPIs:              kpi:{id}
 * KPI Categories:    kpi_category:{id}
 * Revenue Sources:   revenue:{businessUnitId}:{id}
 * Variable Costs:    variable_cost:{businessUnitId}:{id}
 * Fixed Costs:       fixed_cost:{id}
 * Employees:         employee:{id}
 * Users:            user:{id}
 * Roles:            role:{id}
 * Permissions:      permission:{id}
 * 
 * INDEXES (for fast queries):
 * bu_by_region:{region}         → [bu_ids]
 * kpi_by_bu:{buId}             → [kpi_ids]
 * kpi_by_period:{period}       → [kpi_ids]
 * revenue_by_period:{period}   → [revenue_ids]
 * employee_by_bu:{buId}        → [employee_ids]
 * user_by_role:{roleId}        → [user_ids]
 */

// ============================================
// VALIDATION SCHEMAS
// ============================================

export const ValidationRules = {
  businessUnit: {
    name: { required: true, minLength: 3, maxLength: 100 },
    manager: { required: true, minLength: 3, maxLength: 100 },
    region: { required: true, enum: ["Miền Bắc", "Miền Trung", "Miền Nam", "Toàn quốc"] },
    status: { required: true, enum: ["active", "inactive", "suspended"] },
    employeeCount: { required: true, min: 0, type: "number" },
  },
  kpi: {
    name: { required: true, minLength: 3, maxLength: 200 },
    businessUnitId: { required: true },
    categoryId: { required: true },
    unit: { required: true },
    period: { required: true, pattern: /^\d{4}-(Q[1-4]|0[1-9]|1[0-2])$/ },
    targetValue: { required: true, min: 0, type: "number" },
    actualValue: { required: true, min: 0, type: "number" },
    weight: { required: true, min: 1, max: 10, type: "number" },
  },
  employee: {
    name: { required: true, minLength: 3, maxLength: 100 },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    employeeCode: { required: true, pattern: /^EMP\d{4}$/ },
    position: { required: true },
    salary: { required: true, min: 0, type: "number" },
  },
  user: {
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    name: { required: true, minLength: 3, maxLength: 100 },
    roleId: { required: true },
    status: { required: true, enum: ["active", "inactive", "locked"] },
  },
};

// ============================================
// RELATIONSHIPS DOCUMENTATION
// ============================================

export const Relationships = {
  businessUnit: {
    hasMany: ["kpis", "revenue_sources", "variable_costs", "employees"],
    belongsTo: [],
  },
  kpi: {
    belongsTo: ["businessUnit", "kpiCategory"],
    hasMany: [],
  },
  revenueSource: {
    belongsTo: ["businessUnit"],
    hasMany: [],
  },
  variableCost: {
    belongsTo: ["businessUnit"],
    hasMany: [],
  },
  fixedCost: {
    belongsTo: ["businessUnit?"], // Optional
    hasMany: [],
  },
  employee: {
    belongsTo: ["businessUnit?"], // Optional
    hasMany: [],
  },
  user: {
    belongsTo: ["role"],
    belongsToMany: ["businessUnits"],
    hasMany: [],
  },
  role: {
    hasMany: ["users"],
    belongsToMany: ["permissions"],
  },
};

// ============================================
// QUERY HELPER TYPES
// ============================================

export type QueryFilter = {
  field: string;
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "in" | "like";
  value: any;
};

export type QueryOptions = {
  filters?: QueryFilter[];
  orderBy?: { field: string; direction: "asc" | "desc" };
  limit?: number;
  offset?: number;
};

export type AggregateFunction = "sum" | "avg" | "min" | "max" | "count";

// ============================================
// DEFAULT VALUES
// ============================================

export const DefaultValues = {
  status: {
    businessUnit: "active" as const,
    kpi: "on-track" as const,
    employee: "active" as const,
    user: "active" as const,
    revenueSource: "confirmed" as const,
  },
  timestamps: () => ({
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),
};
