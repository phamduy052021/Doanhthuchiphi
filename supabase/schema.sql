-- Financial Management System Database Schema
-- PostgreSQL/Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret-here';

-- =====================================================
-- 1. COMPANIES TABLE - Công ty
-- =====================================================
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    tax_code VARCHAR(50) UNIQUE,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    legal_representative VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

CREATE INDEX idx_companies_code ON companies(code);
CREATE INDEX idx_companies_status ON companies(status);

-- =====================================================
-- 2. BUSINESS UNITS TABLE - Đơn vị kinh doanh
-- =====================================================
CREATE TABLE business_units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    manager_id UUID,
    parent_id UUID REFERENCES business_units(id) ON DELETE SET NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    UNIQUE(company_id, code)
);

CREATE INDEX idx_business_units_company ON business_units(company_id);
CREATE INDEX idx_business_units_parent ON business_units(parent_id);
CREATE INDEX idx_business_units_manager ON business_units(manager_id);
CREATE INDEX idx_business_units_status ON business_units(status);

-- =====================================================
-- 3. DEPARTMENTS TABLE - Phòng ban
-- =====================================================
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    business_unit_id UUID REFERENCES business_units(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    manager_id UUID,
    parent_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    UNIQUE(company_id, code)
);

CREATE INDEX idx_departments_company ON departments(company_id);
CREATE INDEX idx_departments_business_unit ON departments(business_unit_id);
CREATE INDEX idx_departments_parent ON departments(parent_id);
CREATE INDEX idx_departments_manager ON departments(manager_id);
CREATE INDEX idx_departments_status ON departments(status);

-- =====================================================
-- 4. REVENUE TYPES TABLE - Loại doanh thu
-- =====================================================
CREATE TABLE revenue_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES revenue_types(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    UNIQUE(company_id, code)
);

CREATE INDEX idx_revenue_types_company ON revenue_types(company_id);
CREATE INDEX idx_revenue_types_parent ON revenue_types(parent_id);
CREATE INDEX idx_revenue_types_status ON revenue_types(status);

-- =====================================================
-- 5. REVENUE TABLE - Doanh thu
-- =====================================================
CREATE TABLE revenue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    business_unit_id UUID NOT NULL REFERENCES business_units(id) ON DELETE CASCADE,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    revenue_type_id UUID NOT NULL REFERENCES revenue_types(id) ON DELETE RESTRICT,
    period_month INTEGER NOT NULL CHECK (period_month BETWEEN 1 AND 12),
    period_year INTEGER NOT NULL CHECK (period_year BETWEEN 2000 AND 2100),
    amount DECIMAL(18, 2) NOT NULL DEFAULT 0 CHECK (amount >= 0),
    currency VARCHAR(10) DEFAULT 'VND',
    exchange_rate DECIMAL(18, 6) DEFAULT 1,
    amount_vnd DECIMAL(18, 2) GENERATED ALWAYS AS (amount * exchange_rate) STORED,
    description TEXT,
    invoice_number VARCHAR(100),
    invoice_date DATE,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'confirmed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    UNIQUE(company_id, business_unit_id, revenue_type_id, period_month, period_year, invoice_number)
);

CREATE INDEX idx_revenue_company ON revenue(company_id);
CREATE INDEX idx_revenue_business_unit ON revenue(business_unit_id);
CREATE INDEX idx_revenue_department ON revenue(department_id);
CREATE INDEX idx_revenue_type ON revenue(revenue_type_id);
CREATE INDEX idx_revenue_period ON revenue(period_year, period_month);
CREATE INDEX idx_revenue_status ON revenue(status);
CREATE INDEX idx_revenue_invoice ON revenue(invoice_number);

-- =====================================================
-- 6. EXPENSE TYPES TABLE - Loại chi phí
-- =====================================================
CREATE TABLE expense_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_fixed BOOLEAN DEFAULT FALSE,
    is_allocatable BOOLEAN DEFAULT TRUE,
    parent_id UUID REFERENCES expense_types(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    UNIQUE(company_id, code)
);

CREATE INDEX idx_expense_types_company ON expense_types(company_id);
CREATE INDEX idx_expense_types_parent ON expense_types(parent_id);
CREATE INDEX idx_expense_types_is_fixed ON expense_types(is_fixed);
CREATE INDEX idx_expense_types_status ON expense_types(status);

-- =====================================================
-- 7. EXPENSES TABLE - Chi phí
-- =====================================================
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    business_unit_id UUID REFERENCES business_units(id) ON DELETE CASCADE,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    expense_type_id UUID NOT NULL REFERENCES expense_types(id) ON DELETE RESTRICT,
    period_month INTEGER NOT NULL CHECK (period_month BETWEEN 1 AND 12),
    period_year INTEGER NOT NULL CHECK (period_year BETWEEN 2000 AND 2100),
    amount DECIMAL(18, 2) NOT NULL DEFAULT 0 CHECK (amount >= 0),
    currency VARCHAR(10) DEFAULT 'VND',
    exchange_rate DECIMAL(18, 6) DEFAULT 1,
    amount_vnd DECIMAL(18, 2) GENERATED ALWAYS AS (amount * exchange_rate) STORED,
    description TEXT,
    invoice_number VARCHAR(100),
    invoice_date DATE,
    vendor VARCHAR(255),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'confirmed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

CREATE INDEX idx_expenses_company ON expenses(company_id);
CREATE INDEX idx_expenses_business_unit ON expenses(business_unit_id);
CREATE INDEX idx_expenses_department ON expenses(department_id);
CREATE INDEX idx_expenses_type ON expenses(expense_type_id);
CREATE INDEX idx_expenses_period ON expenses(period_year, period_month);
CREATE INDEX idx_expenses_status ON expenses(status);
CREATE INDEX idx_expenses_invoice ON expenses(invoice_number);

-- =====================================================
-- 8. EXPENSE ALLOCATION TABLE - Phân bổ chi phí
-- =====================================================
CREATE TABLE expense_allocation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    expense_id UUID NOT NULL REFERENCES expenses(id) ON DELETE CASCADE,
    from_business_unit_id UUID REFERENCES business_units(id) ON DELETE CASCADE,
    to_business_unit_id UUID NOT NULL REFERENCES business_units(id) ON DELETE CASCADE,
    to_department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    allocation_amount DECIMAL(18, 2) NOT NULL CHECK (allocation_amount >= 0),
    allocation_percentage DECIMAL(5, 2) CHECK (allocation_percentage >= 0 AND allocation_percentage <= 100),
    allocation_method VARCHAR(50) DEFAULT 'manual' CHECK (allocation_method IN ('manual', 'revenue_based', 'headcount_based', 'equal', 'custom')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

CREATE INDEX idx_expense_allocation_expense ON expense_allocation(expense_id);
CREATE INDEX idx_expense_allocation_from_bu ON expense_allocation(from_business_unit_id);
CREATE INDEX idx_expense_allocation_to_bu ON expense_allocation(to_business_unit_id);
CREATE INDEX idx_expense_allocation_to_dept ON expense_allocation(to_department_id);

-- =====================================================
-- 9. EMPLOYEES TABLE - Nhân viên
-- =====================================================
CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    business_unit_id UUID REFERENCES business_units(id) ON DELETE SET NULL,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    employee_code VARCHAR(50) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    position VARCHAR(100),
    level VARCHAR(50),
    hire_date DATE NOT NULL,
    termination_date DATE,
    date_of_birth DATE,
    id_number VARCHAR(50),
    tax_code VARCHAR(50),
    bank_account VARCHAR(100),
    bank_name VARCHAR(255),
    address TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'terminated')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    UNIQUE(company_id, employee_code)
);

CREATE INDEX idx_employees_company ON employees(company_id);
CREATE INDEX idx_employees_business_unit ON employees(business_unit_id);
CREATE INDEX idx_employees_department ON employees(department_id);
CREATE INDEX idx_employees_code ON employees(employee_code);
CREATE INDEX idx_employees_status ON employees(status);
CREATE INDEX idx_employees_email ON employees(email);

-- =====================================================
-- 10. SALARY STRUCTURES TABLE - Công thức tính lương
-- =====================================================
CREATE TABLE salary_structures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    base_salary_component VARCHAR(100) DEFAULT 'base_salary',
    allowances JSONB DEFAULT '[]'::jsonb,
    deductions JSONB DEFAULT '[]'::jsonb,
    formula TEXT,
    effective_from DATE NOT NULL,
    effective_to DATE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    UNIQUE(company_id, code)
);

CREATE INDEX idx_salary_structures_company ON salary_structures(company_id);
CREATE INDEX idx_salary_structures_status ON salary_structures(status);
CREATE INDEX idx_salary_structures_effective ON salary_structures(effective_from, effective_to);

-- =====================================================
-- 11. EMPLOYEE SALARY CONFIG TABLE - Cấu hình lương
-- =====================================================
CREATE TABLE employee_salary_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    salary_structure_id UUID NOT NULL REFERENCES salary_structures(id) ON DELETE RESTRICT,
    base_salary DECIMAL(18, 2) NOT NULL DEFAULT 0,
    allowances JSONB DEFAULT '[]'::jsonb,
    deductions JSONB DEFAULT '[]'::jsonb,
    effective_from DATE NOT NULL,
    effective_to DATE,
    notes TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

CREATE INDEX idx_employee_salary_config_employee ON employee_salary_config(employee_id);
CREATE INDEX idx_employee_salary_config_structure ON employee_salary_config(salary_structure_id);
CREATE INDEX idx_employee_salary_config_effective ON employee_salary_config(effective_from, effective_to);
CREATE INDEX idx_employee_salary_config_status ON employee_salary_config(status);

-- =====================================================
-- 12. SALARY CALCULATIONS TABLE - Tính lương tháng
-- =====================================================
CREATE TABLE salary_calculations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    period_month INTEGER NOT NULL CHECK (period_month BETWEEN 1 AND 12),
    period_year INTEGER NOT NULL CHECK (period_year BETWEEN 2000 AND 2100),
    salary_structure_id UUID REFERENCES salary_structures(id) ON DELETE SET NULL,
    base_salary DECIMAL(18, 2) NOT NULL DEFAULT 0,
    total_allowances DECIMAL(18, 2) DEFAULT 0,
    total_deductions DECIMAL(18, 2) DEFAULT 0,
    gross_salary DECIMAL(18, 2) GENERATED ALWAYS AS (base_salary + total_allowances) STORED,
    net_salary DECIMAL(18, 2) GENERATED ALWAYS AS (base_salary + total_allowances - total_deductions) STORED,
    working_days INTEGER DEFAULT 0,
    actual_working_days INTEGER DEFAULT 0,
    overtime_hours DECIMAL(10, 2) DEFAULT 0,
    overtime_amount DECIMAL(18, 2) DEFAULT 0,
    bonus DECIMAL(18, 2) DEFAULT 0,
    notes TEXT,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'confirmed', 'paid', 'cancelled')),
    calculated_at TIMESTAMPTZ,
    confirmed_at TIMESTAMPTZ,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    UNIQUE(company_id, employee_id, period_month, period_year)
);

CREATE INDEX idx_salary_calculations_company ON salary_calculations(company_id);
CREATE INDEX idx_salary_calculations_employee ON salary_calculations(employee_id);
CREATE INDEX idx_salary_calculations_period ON salary_calculations(period_year, period_month);
CREATE INDEX idx_salary_calculations_status ON salary_calculations(status);

-- =====================================================
-- 13. SALARY DETAILS TABLE - Chi tiết lương
-- =====================================================
CREATE TABLE salary_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    salary_calculation_id UUID NOT NULL REFERENCES salary_calculations(id) ON DELETE CASCADE,
    component_type VARCHAR(50) NOT NULL CHECK (component_type IN ('base', 'allowance', 'deduction', 'overtime', 'bonus')),
    component_code VARCHAR(50) NOT NULL,
    component_name VARCHAR(255) NOT NULL,
    amount DECIMAL(18, 2) NOT NULL DEFAULT 0,
    calculation_method VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_salary_details_calculation ON salary_details(salary_calculation_id);
CREATE INDEX idx_salary_details_type ON salary_details(component_type);

-- =====================================================
-- 14. AUTH USERS TABLE - Tài khoản
-- =====================================================
CREATE TABLE auth_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    employee_id UUID REFERENCES employees(id) ON DELETE SET NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    last_login_at TIMESTAMPTZ,
    last_login_ip VARCHAR(50),
    failed_login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMPTZ,
    must_change_password BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'locked')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

CREATE INDEX idx_auth_users_company ON auth_users(company_id);
CREATE INDEX idx_auth_users_employee ON auth_users(employee_id);
CREATE INDEX idx_auth_users_username ON auth_users(username);
CREATE INDEX idx_auth_users_email ON auth_users(email);
CREATE INDEX idx_auth_users_status ON auth_users(status);

-- =====================================================
-- 15. ROLES TABLE - Vai trò
-- =====================================================
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_system_role BOOLEAN DEFAULT FALSE,
    level INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    UNIQUE(company_id, code)
);

CREATE INDEX idx_roles_company ON roles(company_id);
CREATE INDEX idx_roles_code ON roles(code);
CREATE INDEX idx_roles_status ON roles(status);

-- =====================================================
-- 16. USER ROLES TABLE - Gán vai trò
-- =====================================================
CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    business_unit_id UUID REFERENCES business_units(id) ON DELETE CASCADE,
    department_id UUID REFERENCES departments(id) ON DELETE CASCADE,
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    granted_by UUID REFERENCES auth_users(id),
    expires_at TIMESTAMPTZ,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
    UNIQUE(user_id, role_id, business_unit_id, department_id)
);

CREATE INDEX idx_user_roles_user ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role_id);
CREATE INDEX idx_user_roles_business_unit ON user_roles(business_unit_id);
CREATE INDEX idx_user_roles_department ON user_roles(department_id);
CREATE INDEX idx_user_roles_status ON user_roles(status);

-- =====================================================
-- 17. PERMISSIONS TABLE - Quyền hạn
-- =====================================================
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    resource VARCHAR(100) NOT NULL,
    action VARCHAR(50) NOT NULL CHECK (action IN ('create', 'read', 'update', 'delete', 'execute', 'approve', 'export')),
    description TEXT,
    is_system_permission BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_permissions_code ON permissions(code);
CREATE INDEX idx_permissions_resource ON permissions(resource);
CREATE INDEX idx_permissions_action ON permissions(action);

-- =====================================================
-- 18. ROLE PERMISSIONS TABLE - Gán quyền
-- =====================================================
CREATE TABLE role_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    granted_by UUID REFERENCES auth_users(id),
    UNIQUE(role_id, permission_id)
);

CREATE INDEX idx_role_permissions_role ON role_permissions(role_id);
CREATE INDEX idx_role_permissions_permission ON role_permissions(permission_id);

-- =====================================================
-- 19. AUDIT LOGS TABLE - Lịch sử
-- =====================================================
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth_users(id) ON DELETE SET NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id UUID NOT NULL,
    action VARCHAR(20) NOT NULL CHECK (action IN ('create', 'update', 'delete', 'approve', 'reject', 'export', 'login', 'logout')),
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_company ON audit_logs(company_id);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_table ON audit_logs(table_name);
CREATE INDEX idx_audit_logs_record ON audit_logs(record_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to all tables with updated_at
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_business_units_updated_at BEFORE UPDATE ON business_units FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON departments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_revenue_types_updated_at BEFORE UPDATE ON revenue_types FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_revenue_updated_at BEFORE UPDATE ON revenue FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_expense_types_updated_at BEFORE UPDATE ON expense_types FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_expenses_updated_at BEFORE UPDATE ON expenses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_expense_allocation_updated_at BEFORE UPDATE ON expense_allocation FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON employees FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_salary_structures_updated_at BEFORE UPDATE ON salary_structures FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_employee_salary_config_updated_at BEFORE UPDATE ON employee_salary_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_salary_calculations_updated_at BEFORE UPDATE ON salary_calculations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_auth_users_updated_at BEFORE UPDATE ON auth_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_permissions_updated_at BEFORE UPDATE ON permissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_allocation ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE salary_structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_salary_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE salary_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE salary_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Multi-tenant policies (example for companies table)
-- Users can only see data from their own company
CREATE POLICY company_isolation_policy ON companies
    FOR ALL
    USING (id = (current_setting('app.current_company_id', true))::uuid);

-- Similar policies should be applied to other tables
-- This is a template - adjust based on your authentication strategy

-- =====================================================
-- VIEWS FOR REPORTING
-- =====================================================

-- Profit & Loss by Business Unit
CREATE OR REPLACE VIEW vw_profit_loss_by_bu AS
SELECT 
    bu.company_id,
    bu.id AS business_unit_id,
    bu.name AS business_unit_name,
    r.period_year,
    r.period_month,
    COALESCE(SUM(r.amount_vnd), 0) AS total_revenue,
    COALESCE(SUM(e.amount_vnd), 0) AS total_expenses,
    COALESCE(SUM(r.amount_vnd), 0) - COALESCE(SUM(e.amount_vnd), 0) AS profit_loss
FROM business_units bu
LEFT JOIN revenue r ON bu.id = r.business_unit_id AND r.status = 'confirmed'
LEFT JOIN expenses e ON bu.id = e.business_unit_id AND e.status = 'confirmed'
GROUP BY bu.company_id, bu.id, bu.name, r.period_year, r.period_month;

-- Employee headcount by Business Unit
CREATE OR REPLACE VIEW vw_employee_headcount AS
SELECT 
    bu.company_id,
    bu.id AS business_unit_id,
    bu.name AS business_unit_name,
    d.id AS department_id,
    d.name AS department_name,
    COUNT(e.id) AS headcount
FROM business_units bu
LEFT JOIN departments d ON bu.id = d.business_unit_id
LEFT JOIN employees e ON d.id = e.department_id AND e.status = 'active'
GROUP BY bu.company_id, bu.id, bu.name, d.id, d.name;

-- Total salary cost by Business Unit
CREATE OR REPLACE VIEW vw_salary_cost_by_bu AS
SELECT 
    c.company_id,
    bu.id AS business_unit_id,
    bu.name AS business_unit_name,
    c.period_year,
    c.period_month,
    COUNT(c.id) AS employee_count,
    SUM(c.base_salary) AS total_base_salary,
    SUM(c.total_allowances) AS total_allowances,
    SUM(c.total_deductions) AS total_deductions,
    SUM(c.gross_salary) AS total_gross_salary,
    SUM(c.net_salary) AS total_net_salary
FROM salary_calculations c
JOIN employees e ON c.employee_id = e.id
JOIN business_units bu ON e.business_unit_id = bu.id
WHERE c.status IN ('confirmed', 'paid')
GROUP BY c.company_id, bu.id, bu.name, c.period_year, c.period_month;

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================
COMMENT ON TABLE companies IS 'Stores company information for multi-tenant support';
COMMENT ON TABLE business_units IS 'Business units within a company (e.g., divisions, branches)';
COMMENT ON TABLE departments IS 'Departments within business units';
COMMENT ON TABLE revenue_types IS 'Classification of revenue sources';
COMMENT ON TABLE revenue IS 'Revenue transactions';
COMMENT ON TABLE expense_types IS 'Classification of expenses';
COMMENT ON TABLE expenses IS 'Expense transactions';
COMMENT ON TABLE expense_allocation IS 'Allocation of expenses across business units';
COMMENT ON TABLE employees IS 'Employee master data';
COMMENT ON TABLE salary_structures IS 'Salary calculation formulas';
COMMENT ON TABLE employee_salary_config IS 'Employee-specific salary configuration';
COMMENT ON TABLE salary_calculations IS 'Monthly salary calculations';
COMMENT ON TABLE salary_details IS 'Detailed breakdown of salary components';
COMMENT ON TABLE auth_users IS 'User authentication and accounts';
COMMENT ON TABLE roles IS 'User roles for RBAC';
COMMENT ON TABLE user_roles IS 'Assignment of roles to users';
COMMENT ON TABLE permissions IS 'System permissions';
COMMENT ON TABLE role_permissions IS 'Assignment of permissions to roles';
COMMENT ON TABLE audit_logs IS 'Audit trail for all system changes';
