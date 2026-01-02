-- Seed Data for Financial Management System
-- This file contains sample data for testing and development

-- =====================================================
-- 1. SEED COMPANY
-- =====================================================
INSERT INTO companies (id, code, name, tax_code, address, phone, email, legal_representative, status)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'ACME', 'ACME Corporation', '0123456789', '123 Business Street, Hanoi', '+84 24 1234 5678', 'info@acme.com', 'John Doe', 'active');

-- =====================================================
-- 2. SEED BUSINESS UNITS
-- =====================================================
INSERT INTO business_units (id, company_id, code, name, description, status)
VALUES 
    ('22222222-2222-2222-2222-222222222221', '11111111-1111-1111-1111-111111111111', 'BU-NORTH', 'North Region', 'Northern Vietnam operations', 'active'),
    ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'BU-SOUTH', 'South Region', 'Southern Vietnam operations', 'active'),
    ('22222222-2222-2222-2222-222222222223', '11111111-1111-1111-1111-111111111111', 'BU-CENTRAL', 'Central Region', 'Central Vietnam operations', 'active');

-- =====================================================
-- 3. SEED DEPARTMENTS
-- =====================================================
INSERT INTO departments (id, company_id, business_unit_id, code, name, description, status)
VALUES 
    ('33333333-3333-3333-3333-333333333331', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222221', 'DEPT-SALES-N', 'Sales Department - North', 'Sales operations in North', 'active'),
    ('33333333-3333-3333-3333-333333333332', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222221', 'DEPT-OPS-N', 'Operations Department - North', 'Operations in North', 'active'),
    ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'DEPT-SALES-S', 'Sales Department - South', 'Sales operations in South', 'active'),
    ('33333333-3333-3333-3333-333333333334', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'DEPT-OPS-S', 'Operations Department - South', 'Operations in South', 'active'),
    ('33333333-3333-3333-3333-333333333335', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222223', 'DEPT-ADMIN', 'Administration', 'Central administration', 'active');

-- =====================================================
-- 4. SEED REVENUE TYPES
-- =====================================================
INSERT INTO revenue_types (id, company_id, code, name, description, status)
VALUES 
    ('44444444-4444-4444-4444-444444444441', '11111111-1111-1111-1111-111111111111', 'REV-PRODUCT', 'Product Sales', 'Revenue from product sales', 'active'),
    ('44444444-4444-4444-4444-444444444442', '11111111-1111-1111-1111-111111111111', 'REV-SERVICE', 'Service Revenue', 'Revenue from services', 'active'),
    ('44444444-4444-4444-4444-444444444443', '11111111-1111-1111-1111-111111111111', 'REV-OTHER', 'Other Revenue', 'Other revenue sources', 'active');

-- =====================================================
-- 5. SEED REVENUE
-- =====================================================
INSERT INTO revenue (company_id, business_unit_id, department_id, revenue_type_id, period_month, period_year, amount, status)
VALUES 
    ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222221', '33333333-3333-3333-3333-333333333331', '44444444-4444-4444-4444-444444444441', 1, 2024, 500000000, 'confirmed'),
    ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222221', '33333333-3333-3333-3333-333333333331', '44444444-4444-4444-4444-444444444442', 1, 2024, 200000000, 'confirmed'),
    ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444441', 1, 2024, 300000000, 'confirmed');

-- =====================================================
-- 6. SEED EXPENSE TYPES
-- =====================================================
INSERT INTO expense_types (id, company_id, code, name, description, is_fixed, is_allocatable, status)
VALUES 
    ('55555555-5555-5555-5555-555555555551', '11111111-1111-1111-1111-111111111111', 'EXP-SALARY', 'Salary & Wages', 'Employee compensation', false, true, 'active'),
    ('55555555-5555-5555-5555-555555555552', '11111111-1111-1111-1111-111111111111', 'EXP-RENT', 'Office Rent', 'Rental expenses', true, true, 'active'),
    ('55555555-5555-5555-5555-555555555553', '11111111-1111-1111-1111-111111111111', 'EXP-MARKETING', 'Marketing', 'Marketing and advertising', false, false, 'active'),
    ('55555555-5555-5555-5555-555555555554', '11111111-1111-1111-1111-111111111111', 'EXP-UTILITIES', 'Utilities', 'Electricity, water, internet', true, true, 'active');

-- =====================================================
-- 7. SEED EXPENSES
-- =====================================================
INSERT INTO expenses (company_id, business_unit_id, department_id, expense_type_id, period_month, period_year, amount, status)
VALUES 
    ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222221', '33333333-3333-3333-3333-333333333331', '55555555-5555-5555-5555-555555555551', 1, 2024, 100000000, 'confirmed'),
    ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222221', '33333333-3333-3333-3333-333333333332', '55555555-5555-5555-5555-555555555552', 1, 2024, 20000000, 'confirmed'),
    ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', '55555555-5555-5555-5555-555555555553', 1, 2024, 30000000, 'confirmed');

-- =====================================================
-- 8. SEED EMPLOYEES
-- =====================================================
INSERT INTO employees (id, company_id, business_unit_id, department_id, employee_code, full_name, email, phone, position, level, hire_date, status)
VALUES 
    ('66666666-6666-6666-6666-666666666661', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222221', '33333333-3333-3333-3333-333333333331', 'EMP-001', 'Nguyen Van A', 'nguyenvana@acme.com', '+84 901 234 567', 'Sales Manager', 'Manager', '2023-01-15', 'active'),
    ('66666666-6666-6666-6666-666666666662', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222221', '33333333-3333-3333-3333-333333333331', 'EMP-002', 'Tran Thi B', 'tranthib@acme.com', '+84 902 345 678', 'Sales Executive', 'Staff', '2023-03-20', 'active'),
    ('66666666-6666-6666-6666-666666666663', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'EMP-003', 'Le Van C', 'levanc@acme.com', '+84 903 456 789', 'Sales Manager', 'Manager', '2023-02-10', 'active'),
    ('66666666-6666-6666-6666-666666666664', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222223', '33333333-3333-3333-3333-333333333335', 'EMP-004', 'Pham Thi D', 'phamthid@acme.com', '+84 904 567 890', 'HR Manager', 'Manager', '2022-11-01', 'active'),
    ('66666666-6666-6666-6666-666666666665', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222221', '33333333-3333-3333-3333-333333333332', 'EMP-005', 'Hoang Van E', 'hoangvane@acme.com', '+84 905 678 901', 'Operations Staff', 'Staff', '2023-06-15', 'active');

-- =====================================================
-- 9. SEED SALARY STRUCTURES
-- =====================================================
INSERT INTO salary_structures (id, company_id, code, name, description, effective_from, status)
VALUES 
    ('77777777-7777-7777-7777-777777777771', '11111111-1111-1111-1111-111111111111', 'SAL-MANAGER', 'Manager Salary Structure', 'Standard salary structure for managers', '2023-01-01', 'active'),
    ('77777777-7777-7777-7777-777777777772', '11111111-1111-1111-1111-111111111111', 'SAL-STAFF', 'Staff Salary Structure', 'Standard salary structure for staff', '2023-01-01', 'active');

-- =====================================================
-- 10. SEED EMPLOYEE SALARY CONFIG
-- =====================================================
INSERT INTO employee_salary_config (employee_id, salary_structure_id, base_salary, effective_from, status)
VALUES 
    ('66666666-6666-6666-6666-666666666661', '77777777-7777-7777-7777-777777777771', 25000000, '2023-01-15', 'active'),
    ('66666666-6666-6666-6666-666666666662', '77777777-7777-7777-7777-777777777772', 15000000, '2023-03-20', 'active'),
    ('66666666-6666-6666-6666-666666666663', '77777777-7777-7777-7777-777777777771', 25000000, '2023-02-10', 'active'),
    ('66666666-6666-6666-6666-666666666664', '77777777-7777-7777-7777-777777777771', 30000000, '2022-11-01', 'active'),
    ('66666666-6666-6666-6666-666666666665', '77777777-7777-7777-7777-777777777772', 12000000, '2023-06-15', 'active');

-- =====================================================
-- 11. SEED ROLES
-- =====================================================
INSERT INTO roles (id, company_id, code, name, description, is_system_role, level, status)
VALUES 
    ('88888888-8888-8888-8888-888888888881', '11111111-1111-1111-1111-111111111111', 'ADMIN', 'Administrator', 'Full system access', true, 100, 'active'),
    ('88888888-8888-8888-8888-888888888882', '11111111-1111-1111-1111-111111111111', 'ACCOUNTANT', 'Accountant', 'Financial data management', true, 80, 'active'),
    ('88888888-8888-8888-8888-888888888883', '11111111-1111-1111-1111-111111111111', 'MANAGER', 'Manager', 'Business unit management', true, 60, 'active'),
    ('88888888-8888-8888-8888-888888888884', '11111111-1111-1111-1111-111111111111', 'DIRECTOR', 'Director', 'Executive level access', true, 90, 'active'),
    ('88888888-8888-8888-8888-888888888885', '11111111-1111-1111-1111-111111111111', 'EMPLOYEE', 'Employee', 'Basic employee access', true, 10, 'active');

-- =====================================================
-- 12. SEED PERMISSIONS
-- =====================================================
INSERT INTO permissions (id, code, name, resource, action, description, is_system_permission)
VALUES 
    ('99999999-9999-9999-9999-999999999901', 'REVENUE_CREATE', 'Create Revenue', 'revenue', 'create', 'Create new revenue records', true),
    ('99999999-9999-9999-9999-999999999902', 'REVENUE_READ', 'Read Revenue', 'revenue', 'read', 'View revenue records', true),
    ('99999999-9999-9999-9999-999999999903', 'REVENUE_UPDATE', 'Update Revenue', 'revenue', 'update', 'Update revenue records', true),
    ('99999999-9999-9999-9999-999999999904', 'REVENUE_DELETE', 'Delete Revenue', 'revenue', 'delete', 'Delete revenue records', true),
    ('99999999-9999-9999-9999-999999999905', 'EXPENSE_CREATE', 'Create Expense', 'expenses', 'create', 'Create new expense records', true),
    ('99999999-9999-9999-9999-999999999906', 'EXPENSE_READ', 'Read Expense', 'expenses', 'read', 'View expense records', true),
    ('99999999-9999-9999-9999-999999999907', 'EXPENSE_UPDATE', 'Update Expense', 'expenses', 'update', 'Update expense records', true),
    ('99999999-9999-9999-9999-999999999908', 'EXPENSE_DELETE', 'Delete Expense', 'expenses', 'delete', 'Delete expense records', true),
    ('99999999-9999-9999-9999-999999999909', 'EMPLOYEE_READ', 'Read Employee', 'employees', 'read', 'View employee records', true),
    ('99999999-9999-9999-9999-999999999910', 'SALARY_READ', 'Read Salary', 'salary', 'read', 'View salary information', true),
    ('99999999-9999-9999-9999-999999999911', 'SALARY_APPROVE', 'Approve Salary', 'salary', 'approve', 'Approve salary calculations', true),
    ('99999999-9999-9999-9999-999999999912', 'REPORT_EXPORT', 'Export Reports', 'reports', 'export', 'Export reports to Excel', true);

-- =====================================================
-- 13. SEED AUTH USERS (Password: 'password123' - hashed with bcrypt)
-- =====================================================
-- Note: In production, use proper password hashing
INSERT INTO auth_users (id, company_id, employee_id, username, email, password_hash, full_name, status)
VALUES 
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', '66666666-6666-6666-6666-666666666664', 'admin', 'admin@acme.com', '$2b$10$rKvHJZqF5j7jGx3w5YL7Zu8VXGqZJvXJZQXZQXZQXZQXZQXZQXZ', 'System Admin', 'active'),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa01', '11111111-1111-1111-1111-111111111111', '66666666-6666-6666-6666-666666666661', 'nguyenvana', 'nguyenvana@acme.com', '$2b$10$rKvHJZqF5j7jGx3w5YL7Zu8VXGqZJvXJZQXZQXZQXZQXZQXZQXZ', 'Nguyen Van A', 'active');

-- =====================================================
-- 14. SEED USER ROLES
-- =====================================================
INSERT INTO user_roles (user_id, role_id, status)
VALUES 
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '88888888-8888-8888-8888-888888888881', 'active'),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa01', '88888888-8888-8888-8888-888888888883', 'active');

-- =====================================================
-- 15. SEED ROLE PERMISSIONS (Admin has all permissions)
-- =====================================================
INSERT INTO role_permissions (role_id, permission_id)
SELECT '88888888-8888-8888-8888-888888888881', id FROM permissions;

-- Accountant permissions
INSERT INTO role_permissions (role_id, permission_id)
VALUES 
    ('88888888-8888-8888-8888-888888888882', '99999999-9999-9999-9999-999999999901'),
    ('88888888-8888-8888-8888-888888888882', '99999999-9999-9999-9999-999999999902'),
    ('88888888-8888-8888-8888-888888888882', '99999999-9999-9999-9999-999999999903'),
    ('88888888-8888-8888-8888-888888888882', '99999999-9999-9999-9999-999999999905'),
    ('88888888-8888-8888-8888-888888888882', '99999999-9999-9999-9999-999999999906'),
    ('88888888-8888-8888-8888-888888888882', '99999999-9999-9999-9999-999999999907'),
    ('88888888-8888-8888-8888-888888888882', '99999999-9999-9999-9999-999999999912');

-- Manager permissions
INSERT INTO role_permissions (role_id, permission_id)
VALUES 
    ('88888888-8888-8888-8888-888888888883', '99999999-9999-9999-9999-999999999902'),
    ('88888888-8888-8888-8888-888888888883', '99999999-9999-9999-9999-999999999906'),
    ('88888888-8888-8888-8888-888888888883', '99999999-9999-9999-9999-999999999909'),
    ('88888888-8888-8888-8888-888888888883', '99999999-9999-9999-9999-999999999910'),
    ('88888888-8888-8888-8888-888888888883', '99999999-9999-9999-9999-999999999912');
