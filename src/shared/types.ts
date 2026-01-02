// Shared TypeScript types for Financial Management System

export type Status = 'active' | 'inactive';
export type TransactionStatus = 'draft' | 'confirmed' | 'cancelled';
export type SalaryStatus = 'draft' | 'confirmed' | 'paid' | 'cancelled';
export type UserStatus = 'active' | 'inactive' | 'locked' | 'terminated';
export type Action = 'create' | 'read' | 'update' | 'delete' | 'execute' | 'approve' | 'export';
export type AuditAction = 'create' | 'update' | 'delete' | 'approve' | 'reject' | 'export' | 'login' | 'logout';
export type AllocationMethod = 'manual' | 'revenue_based' | 'headcount_based' | 'equal' | 'custom';
export type ComponentType = 'base' | 'allowance' | 'deduction' | 'overtime' | 'bonus';

// =====================================================
// COMPANY & STRUCTURE
// =====================================================

export interface Company {
  id: string;
  code: string;
  name: string;
  tax_code?: string;
  address?: string;
  phone?: string;
  email?: string;
  legal_representative?: string;
  status: Status;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

export interface BusinessUnit {
  id: string;
  company_id: string;
  code: string;
  name: string;
  manager_id?: string;
  parent_id?: string;
  description?: string;
  status: Status;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

export interface Department {
  id: string;
  company_id: string;
  business_unit_id?: string;
  code: string;
  name: string;
  manager_id?: string;
  parent_id?: string;
  description?: string;
  status: Status;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

// =====================================================
// REVENUE
// =====================================================

export interface RevenueType {
  id: string;
  company_id: string;
  code: string;
  name: string;
  description?: string;
  parent_id?: string;
  status: Status;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

export interface Revenue {
  id: string;
  company_id: string;
  business_unit_id: string;
  department_id?: string;
  revenue_type_id: string;
  period_month: number;
  period_year: number;
  amount: number;
  currency: string;
  exchange_rate: number;
  amount_vnd: number;
  description?: string;
  invoice_number?: string;
  invoice_date?: string;
  status: TransactionStatus;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

// =====================================================
// EXPENSES
// =====================================================

export interface ExpenseType {
  id: string;
  company_id: string;
  code: string;
  name: string;
  description?: string;
  is_fixed: boolean;
  is_allocatable: boolean;
  parent_id?: string;
  status: Status;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

export interface Expense {
  id: string;
  company_id: string;
  business_unit_id?: string;
  department_id?: string;
  expense_type_id: string;
  period_month: number;
  period_year: number;
  amount: number;
  currency: string;
  exchange_rate: number;
  amount_vnd: number;
  description?: string;
  invoice_number?: string;
  invoice_date?: string;
  vendor?: string;
  status: TransactionStatus;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

export interface ExpenseAllocation {
  id: string;
  expense_id: string;
  from_business_unit_id?: string;
  to_business_unit_id: string;
  to_department_id?: string;
  allocation_amount: number;
  allocation_percentage?: number;
  allocation_method: AllocationMethod;
  notes?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

// =====================================================
// EMPLOYEES & SALARY
// =====================================================

export interface Employee {
  id: string;
  company_id: string;
  business_unit_id?: string;
  department_id?: string;
  employee_code: string;
  full_name: string;
  email?: string;
  phone?: string;
  position?: string;
  level?: string;
  hire_date: string;
  termination_date?: string;
  date_of_birth?: string;
  id_number?: string;
  tax_code?: string;
  bank_account?: string;
  bank_name?: string;
  address?: string;
  status: UserStatus;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

export interface SalaryComponent {
  code: string;
  name: string;
  amount: number;
  formula?: string;
}

export interface SalaryStructure {
  id: string;
  company_id: string;
  code: string;
  name: string;
  description?: string;
  base_salary_component: string;
  allowances: SalaryComponent[];
  deductions: SalaryComponent[];
  formula?: string;
  effective_from: string;
  effective_to?: string;
  status: Status;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

export interface EmployeeSalaryConfig {
  id: string;
  employee_id: string;
  salary_structure_id: string;
  base_salary: number;
  allowances: SalaryComponent[];
  deductions: SalaryComponent[];
  effective_from: string;
  effective_to?: string;
  notes?: string;
  status: Status;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

export interface SalaryCalculation {
  id: string;
  company_id: string;
  employee_id: string;
  period_month: number;
  period_year: number;
  salary_structure_id?: string;
  base_salary: number;
  total_allowances: number;
  total_deductions: number;
  gross_salary: number;
  net_salary: number;
  working_days: number;
  actual_working_days: number;
  overtime_hours: number;
  overtime_amount: number;
  bonus: number;
  notes?: string;
  status: SalaryStatus;
  calculated_at?: string;
  confirmed_at?: string;
  paid_at?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

export interface SalaryDetail {
  id: string;
  salary_calculation_id: string;
  component_type: ComponentType;
  component_code: string;
  component_name: string;
  amount: number;
  calculation_method?: string;
  notes?: string;
  created_at: string;
}

// =====================================================
// AUTHENTICATION & AUTHORIZATION
// =====================================================

export interface AuthUser {
  id: string;
  company_id?: string;
  employee_id?: string;
  username: string;
  email: string;
  password_hash: string;
  full_name: string;
  phone?: string;
  last_login_at?: string;
  last_login_ip?: string;
  failed_login_attempts: number;
  locked_until?: string;
  must_change_password: boolean;
  status: UserStatus;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

export interface Role {
  id: string;
  company_id?: string;
  code: string;
  name: string;
  description?: string;
  is_system_role: boolean;
  level: number;
  status: Status;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role_id: string;
  business_unit_id?: string;
  department_id?: string;
  granted_at: string;
  granted_by?: string;
  expires_at?: string;
  status: Status;
}

export interface Permission {
  id: string;
  code: string;
  name: string;
  resource: string;
  action: Action;
  description?: string;
  is_system_permission: boolean;
  created_at: string;
  updated_at: string;
}

export interface RolePermission {
  id: string;
  role_id: string;
  permission_id: string;
  granted_at: string;
  granted_by?: string;
}

// =====================================================
// AUDIT
// =====================================================

export interface AuditLog {
  id: string;
  company_id?: string;
  user_id?: string;
  table_name: string;
  record_id: string;
  action: AuditAction;
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

// =====================================================
// API REQUESTS & RESPONSES
// =====================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface FilterParams {
  company_id?: string;
  business_unit_id?: string;
  department_id?: string;
  period_month?: number;
  period_year?: number;
  status?: string;
  search?: string;
}

// =====================================================
// VIEWS & REPORTS
// =====================================================

export interface ProfitLossByBU {
  company_id: string;
  business_unit_id: string;
  business_unit_name: string;
  period_year: number;
  period_month: number;
  total_revenue: number;
  total_expenses: number;
  profit_loss: number;
}

export interface EmployeeHeadcount {
  company_id: string;
  business_unit_id: string;
  business_unit_name: string;
  department_id?: string;
  department_name?: string;
  headcount: number;
}

export interface SalaryCostByBU {
  company_id: string;
  business_unit_id: string;
  business_unit_name: string;
  period_year: number;
  period_month: number;
  employee_count: number;
  total_base_salary: number;
  total_allowances: number;
  total_deductions: number;
  total_gross_salary: number;
  total_net_salary: number;
}
