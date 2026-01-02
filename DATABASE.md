# Database Documentation

## Overview

The Financial Management System uses PostgreSQL via Supabase as its database. The schema consists of 19 interconnected tables organized into five main categories:

1. **Company Structure** - Companies, Business Units, Departments
2. **Financial Transactions** - Revenue, Expenses, and Allocations
3. **Human Resources** - Employees and Salary Management
4. **Security** - Authentication, Authorization, and RBAC
5. **Auditing** - Audit logs for compliance

## Database Schema

### 1. Company Structure Tables

#### companies
Stores company information for multi-tenant support.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| code | VARCHAR(50) | Unique company code |
| name | VARCHAR(255) | Company name |
| tax_code | VARCHAR(50) | Tax identification number |
| address | TEXT | Company address |
| phone | VARCHAR(20) | Contact phone |
| email | VARCHAR(255) | Contact email |
| legal_representative | VARCHAR(255) | Legal representative name |
| status | VARCHAR(20) | active, inactive |
| created_at | TIMESTAMPTZ | Record creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

**Indexes:** code, status

#### business_units
Organizational units within a company (divisions, branches, regions).

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| company_id | UUID | Foreign key to companies |
| code | VARCHAR(50) | Unique within company |
| name | VARCHAR(255) | Business unit name |
| manager_id | UUID | Employee managing this unit |
| parent_id | UUID | Parent business unit (for hierarchy) |
| description | TEXT | Description |
| status | VARCHAR(20) | active, inactive |

**Indexes:** company_id, parent_id, manager_id, status

#### departments
Departments within business units.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| company_id | UUID | Foreign key to companies |
| business_unit_id | UUID | Foreign key to business_units |
| code | VARCHAR(50) | Unique within company |
| name | VARCHAR(255) | Department name |
| manager_id | UUID | Employee managing this department |
| parent_id | UUID | Parent department (for hierarchy) |
| description | TEXT | Description |
| status | VARCHAR(20) | active, inactive |

**Indexes:** company_id, business_unit_id, parent_id, manager_id, status

### 2. Financial Transaction Tables

#### revenue_types
Classification of revenue sources.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| company_id | UUID | Foreign key to companies |
| code | VARCHAR(50) | Unique type code |
| name | VARCHAR(255) | Type name |
| description | TEXT | Description |
| parent_id | UUID | Parent type (for hierarchy) |
| status | VARCHAR(20) | active, inactive |

**Indexes:** company_id, parent_id, status

#### revenue
Revenue transactions.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| company_id | UUID | Foreign key to companies |
| business_unit_id | UUID | Foreign key to business_units |
| department_id | UUID | Foreign key to departments |
| revenue_type_id | UUID | Foreign key to revenue_types |
| period_month | INTEGER | Month (1-12) |
| period_year | INTEGER | Year |
| amount | DECIMAL(18,2) | Original amount |
| currency | VARCHAR(10) | Currency code (default: VND) |
| exchange_rate | DECIMAL(18,6) | Exchange rate to VND |
| amount_vnd | DECIMAL(18,2) | Computed: amount * exchange_rate |
| description | TEXT | Description |
| invoice_number | VARCHAR(100) | Invoice reference |
| invoice_date | DATE | Invoice date |
| status | VARCHAR(20) | draft, confirmed, cancelled |

**Indexes:** company_id, business_unit_id, department_id, revenue_type_id, period, status, invoice_number

#### expense_types
Classification of expenses.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| company_id | UUID | Foreign key to companies |
| code | VARCHAR(50) | Unique type code |
| name | VARCHAR(255) | Type name |
| description | TEXT | Description |
| is_fixed | BOOLEAN | Is this a fixed cost? |
| is_allocatable | BOOLEAN | Can be allocated across BUs? |
| parent_id | UUID | Parent type (for hierarchy) |
| status | VARCHAR(20) | active, inactive |

**Indexes:** company_id, parent_id, is_fixed, status

#### expenses
Expense transactions.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| company_id | UUID | Foreign key to companies |
| business_unit_id | UUID | Foreign key to business_units |
| department_id | UUID | Foreign key to departments |
| expense_type_id | UUID | Foreign key to expense_types |
| period_month | INTEGER | Month (1-12) |
| period_year | INTEGER | Year |
| amount | DECIMAL(18,2) | Original amount |
| currency | VARCHAR(10) | Currency code |
| exchange_rate | DECIMAL(18,6) | Exchange rate to VND |
| amount_vnd | DECIMAL(18,2) | Computed: amount * exchange_rate |
| description | TEXT | Description |
| invoice_number | VARCHAR(100) | Invoice reference |
| invoice_date | DATE | Invoice date |
| vendor | VARCHAR(255) | Vendor name |
| status | VARCHAR(20) | draft, confirmed, cancelled |

**Indexes:** company_id, business_unit_id, department_id, expense_type_id, period, status, invoice_number

#### expense_allocation
Allocation of expenses across business units.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| expense_id | UUID | Foreign key to expenses |
| from_business_unit_id | UUID | Source business unit |
| to_business_unit_id | UUID | Target business unit |
| to_department_id | UUID | Target department |
| allocation_amount | DECIMAL(18,2) | Allocated amount |
| allocation_percentage | DECIMAL(5,2) | Percentage of total |
| allocation_method | VARCHAR(50) | manual, revenue_based, headcount_based, equal, custom |
| notes | TEXT | Allocation notes |

**Indexes:** expense_id, from_business_unit_id, to_business_unit_id, to_department_id

### 3. Human Resources Tables

#### employees
Employee master data.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| company_id | UUID | Foreign key to companies |
| business_unit_id | UUID | Foreign key to business_units |
| department_id | UUID | Foreign key to departments |
| employee_code | VARCHAR(50) | Unique employee code |
| full_name | VARCHAR(255) | Full name |
| email | VARCHAR(255) | Email address |
| phone | VARCHAR(20) | Phone number |
| position | VARCHAR(100) | Job position |
| level | VARCHAR(50) | Job level |
| hire_date | DATE | Hire date |
| termination_date | DATE | Termination date |
| date_of_birth | DATE | Date of birth |
| id_number | VARCHAR(50) | National ID |
| tax_code | VARCHAR(50) | Tax code |
| bank_account | VARCHAR(100) | Bank account number |
| bank_name | VARCHAR(255) | Bank name |
| address | TEXT | Address |
| status | VARCHAR(20) | active, inactive, terminated |

**Indexes:** company_id, business_unit_id, department_id, employee_code, status, email

#### salary_structures
Salary calculation formulas and structures.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| company_id | UUID | Foreign key to companies |
| code | VARCHAR(50) | Unique structure code |
| name | VARCHAR(255) | Structure name |
| description | TEXT | Description |
| base_salary_component | VARCHAR(100) | Base salary component name |
| allowances | JSONB | Array of allowance components |
| deductions | JSONB | Array of deduction components |
| formula | TEXT | Calculation formula |
| effective_from | DATE | Effective start date |
| effective_to | DATE | Effective end date |
| status | VARCHAR(20) | active, inactive |

**Indexes:** company_id, status, effective dates

#### employee_salary_config
Employee-specific salary configuration.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| employee_id | UUID | Foreign key to employees |
| salary_structure_id | UUID | Foreign key to salary_structures |
| base_salary | DECIMAL(18,2) | Base salary amount |
| allowances | JSONB | Employee-specific allowances |
| deductions | JSONB | Employee-specific deductions |
| effective_from | DATE | Effective start date |
| effective_to | DATE | Effective end date |
| notes | TEXT | Notes |
| status | VARCHAR(20) | active, inactive |

**Indexes:** employee_id, salary_structure_id, effective dates, status

#### salary_calculations
Monthly salary calculations.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| company_id | UUID | Foreign key to companies |
| employee_id | UUID | Foreign key to employees |
| period_month | INTEGER | Month (1-12) |
| period_year | INTEGER | Year |
| salary_structure_id | UUID | Foreign key to salary_structures |
| base_salary | DECIMAL(18,2) | Base salary |
| total_allowances | DECIMAL(18,2) | Total allowances |
| total_deductions | DECIMAL(18,2) | Total deductions |
| gross_salary | DECIMAL(18,2) | Computed: base + allowances |
| net_salary | DECIMAL(18,2) | Computed: gross - deductions |
| working_days | INTEGER | Total working days |
| actual_working_days | INTEGER | Actual working days |
| overtime_hours | DECIMAL(10,2) | Overtime hours |
| overtime_amount | DECIMAL(18,2) | Overtime payment |
| bonus | DECIMAL(18,2) | Bonus amount |
| notes | TEXT | Notes |
| status | VARCHAR(20) | draft, confirmed, paid, cancelled |
| calculated_at | TIMESTAMPTZ | Calculation timestamp |
| confirmed_at | TIMESTAMPTZ | Confirmation timestamp |
| paid_at | TIMESTAMPTZ | Payment timestamp |

**Indexes:** company_id, employee_id, period, status

#### salary_details
Detailed breakdown of salary components.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| salary_calculation_id | UUID | Foreign key to salary_calculations |
| component_type | VARCHAR(50) | base, allowance, deduction, overtime, bonus |
| component_code | VARCHAR(50) | Component code |
| component_name | VARCHAR(255) | Component name |
| amount | DECIMAL(18,2) | Component amount |
| calculation_method | VARCHAR(100) | Calculation method |
| notes | TEXT | Notes |

**Indexes:** salary_calculation_id, component_type

### 4. Security Tables

#### auth_users
User authentication accounts.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| company_id | UUID | Foreign key to companies |
| employee_id | UUID | Foreign key to employees |
| username | VARCHAR(100) | Unique username |
| email | VARCHAR(255) | Unique email |
| password_hash | VARCHAR(255) | Hashed password |
| full_name | VARCHAR(255) | Full name |
| phone | VARCHAR(20) | Phone number |
| last_login_at | TIMESTAMPTZ | Last login time |
| last_login_ip | VARCHAR(50) | Last login IP |
| failed_login_attempts | INTEGER | Failed login counter |
| locked_until | TIMESTAMPTZ | Account lock expiry |
| must_change_password | BOOLEAN | Force password change |
| status | VARCHAR(20) | active, inactive, locked |

**Indexes:** company_id, employee_id, username, email, status

#### roles
User roles for RBAC.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| company_id | UUID | Foreign key to companies |
| code | VARCHAR(50) | Unique role code |
| name | VARCHAR(255) | Role name |
| description | TEXT | Description |
| is_system_role | BOOLEAN | System-defined role |
| level | INTEGER | Role hierarchy level |
| status | VARCHAR(20) | active, inactive |

**System Roles:** Admin, Accountant, Manager, Director, Employee

**Indexes:** company_id, code, status

#### user_roles
Assignment of roles to users.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to auth_users |
| role_id | UUID | Foreign key to roles |
| business_unit_id | UUID | Scope to business unit |
| department_id | UUID | Scope to department |
| granted_at | TIMESTAMPTZ | Grant timestamp |
| granted_by | UUID | Granting user |
| expires_at | TIMESTAMPTZ | Expiration time |
| status | VARCHAR(20) | active, inactive, expired |

**Indexes:** user_id, role_id, business_unit_id, department_id, status

#### permissions
System permissions.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| code | VARCHAR(100) | Unique permission code |
| name | VARCHAR(255) | Permission name |
| resource | VARCHAR(100) | Resource type |
| action | VARCHAR(50) | create, read, update, delete, execute, approve, export |
| description | TEXT | Description |
| is_system_permission | BOOLEAN | System-defined permission |

**Indexes:** code, resource, action

#### role_permissions
Assignment of permissions to roles.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| role_id | UUID | Foreign key to roles |
| permission_id | UUID | Foreign key to permissions |
| granted_at | TIMESTAMPTZ | Grant timestamp |
| granted_by | UUID | Granting user |

**Indexes:** role_id, permission_id

### 5. Audit Table

#### audit_logs
Complete audit trail of all system changes.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| company_id | UUID | Foreign key to companies |
| user_id | UUID | Foreign key to auth_users |
| table_name | VARCHAR(100) | Affected table |
| record_id | UUID | Affected record ID |
| action | VARCHAR(20) | create, update, delete, approve, reject, export, login, logout |
| old_values | JSONB | Previous values |
| new_values | JSONB | New values |
| ip_address | VARCHAR(50) | User IP address |
| user_agent | TEXT | User agent string |
| created_at | TIMESTAMPTZ | Action timestamp |

**Indexes:** company_id, user_id, table_name, record_id, action, created_at

## Views

### vw_profit_loss_by_bu
Profit & Loss report by business unit and period.

**Columns:** company_id, business_unit_id, business_unit_name, period_year, period_month, total_revenue, total_expenses, profit_loss

### vw_employee_headcount
Employee headcount by business unit and department.

**Columns:** company_id, business_unit_id, business_unit_name, department_id, department_name, headcount

### vw_salary_cost_by_bu
Total salary costs by business unit and period.

**Columns:** company_id, business_unit_id, business_unit_name, period_year, period_month, employee_count, total_base_salary, total_allowances, total_deductions, total_gross_salary, total_net_salary

## Row Level Security (RLS)

All tables have RLS enabled for multi-tenant data isolation. The policy ensures users can only access data from their assigned company.

## Triggers

All tables with `updated_at` columns have automatic triggers to update the timestamp on every UPDATE operation.

## Setup Instructions

### 1. Create Database on Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your project URL and API keys
3. Update `.env` file with your credentials

### 2. Run Schema

Execute the schema file in Supabase SQL Editor:

```sql
-- Copy and paste contents of supabase/schema.sql
```

Or use Supabase CLI:

```bash
supabase db push
```

### 3. Seed Data

Run the seed file to populate sample data:

```sql
-- Copy and paste contents of supabase/seed.sql
```

### 4. Verify Installation

Check that all tables are created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

You should see 19 tables.

## Backup and Restore

### Backup

```bash
pg_dump -h your-host -U postgres -d your-database > backup.sql
```

### Restore

```bash
psql -h your-host -U postgres -d your-database < backup.sql
```

## Performance Considerations

1. **Indexes**: All foreign keys and frequently queried columns are indexed
2. **Computed Columns**: amount_vnd, gross_salary, and net_salary are computed to avoid inconsistencies
3. **Partitioning**: Consider partitioning revenue, expenses, and salary_calculations by year for large datasets
4. **Archiving**: Implement data archiving strategy for audit_logs older than 2 years

## Security Best Practices

1. Always use parameterized queries to prevent SQL injection
2. Implement proper password hashing (bcrypt with salt)
3. Use RLS policies to enforce multi-tenant isolation
4. Audit all sensitive operations
5. Regularly rotate JWT secrets
6. Implement rate limiting on authentication endpoints
7. Use prepared statements for all queries

## Maintenance

### Regular Tasks

1. **Weekly**: Analyze slow queries and optimize indexes
2. **Monthly**: Review and archive old audit logs
3. **Quarterly**: Update statistics and vacuum database
4. **Annually**: Review and update RLS policies

### Monitoring Queries

```sql
-- Find slow queries
SELECT * FROM pg_stat_statements ORDER BY total_time DESC LIMIT 10;

-- Check table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) 
FROM pg_tables WHERE schemaname = 'public' ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check index usage
SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch 
FROM pg_stat_user_indexes ORDER BY idx_scan DESC;
```
