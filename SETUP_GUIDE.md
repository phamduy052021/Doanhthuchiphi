# Financial Management System - Setup Guide

This guide will walk you through setting up the Financial Management System from scratch.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Supabase Setup](#supabase-setup)
3. [Local Development Setup](#local-development-setup)
4. [Database Setup](#database-setup)
5. [Testing the Setup](#testing-the-setup)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- A **Supabase account** ([Sign up](https://supabase.com/))
- **Git** for version control
- A code editor (VS Code recommended)

## Supabase Setup

### Step 1: Create a New Supabase Project

1. Go to [supabase.com](https://supabase.com/) and sign in
2. Click "New Project"
3. Fill in the project details:
   - **Name:** financial-management-system (or your preferred name)
   - **Database Password:** Create a strong password (save this!)
   - **Region:** Choose the closest region to you
4. Click "Create new project"
5. Wait for the project to be provisioned (2-3 minutes)

### Step 2: Get Your Supabase Credentials

Once your project is ready:

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - **Keep this secret!**

### Step 3: Configure Database

1. Go to **SQL Editor** in the left sidebar
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql` from this repository
4. Paste it into the SQL Editor
5. Click "Run" or press Ctrl+Enter
6. Wait for execution to complete (should see "Success" message)
7. Verify tables were created:
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   ORDER BY table_name;
   ```
   You should see 19 tables.

### Step 4: Seed Sample Data (Optional but Recommended)

1. In SQL Editor, create a new query
2. Copy the entire contents of `supabase/seed.sql`
3. Paste and run
4. Verify data was inserted:
   ```sql
   SELECT * FROM companies;
   SELECT * FROM business_units;
   SELECT * FROM employees;
   ```

## Local Development Setup

### Step 1: Clone/Download the Repository

```bash
git clone <repository-url>
cd financial-management-system
```

Or if you downloaded a ZIP:
```bash
unzip financial-management-system.zip
cd financial-management-system
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React and React DOM
- TypeScript
- Vite
- Hono
- Supabase client
- Shadcn/UI components
- Recharts
- And all other dependencies

### Step 3: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` in your editor and fill in your Supabase credentials:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

3. Replace `your-project` and `your-anon-key-here` with your actual values from Step 2

### Step 4: Start the Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173` and automatically open in your browser.

## Database Setup

### Understanding the Schema

The system uses 19 tables organized in 5 categories:

#### 1. Company Structure (3 tables)
- `companies` - Company information
- `business_units` - Divisions, branches, regions
- `departments` - Departments within business units

#### 2. Financial Transactions (6 tables)
- `revenue_types` - Classification of revenue
- `revenue` - Revenue transactions
- `expense_types` - Classification of expenses
- `expenses` - Expense transactions
- `expense_allocation` - Expense allocation across BUs

#### 3. Human Resources (6 tables)
- `employees` - Employee master data
- `salary_structures` - Salary calculation formulas
- `employee_salary_config` - Employee-specific salary config
- `salary_calculations` - Monthly salary calculations
- `salary_details` - Detailed salary components

#### 4. Security & RBAC (5 tables)
- `auth_users` - User accounts
- `roles` - System roles
- `user_roles` - User-role assignments
- `permissions` - System permissions
- `role_permissions` - Role-permission assignments

#### 5. Auditing (1 table)
- `audit_logs` - Complete audit trail

### Key Features

- **Row-Level Security (RLS)** - Ensures data isolation between companies
- **Automatic Timestamps** - `created_at` and `updated_at` maintained by triggers
- **Computed Columns** - `amount_vnd`, `gross_salary`, `net_salary` calculated automatically
- **Foreign Key Constraints** - Maintains referential integrity
- **Indexes** - Optimized for query performance

## Testing the Setup

### 1. Verify Database Connection

Open the browser console (F12) and check for any connection errors.

### 2. Test API Endpoints

You can test the API using the browser or tools like Postman:

```bash
# Health check
curl http://localhost:3000/health

# List companies
curl http://localhost:3000/api/companies

# List business units
curl http://localhost:3000/api/business-units
```

### 3. Login with Sample Credentials

If you seeded the database, you can log in with:

**Admin Account:**
- Username: `admin`
- Password: `password123`

**Manager Account:**
- Username: `nguyenvana`
- Password: `password123`

### 4. Explore Sample Data

After logging in, you should see:
- 1 company (ACME Corporation)
- 3 business units (North, South, Central)
- 5 departments
- 5 employees
- Sample revenue and expense data

## Troubleshooting

### Common Issues

#### 1. "Cannot connect to Supabase"

**Problem:** Frontend can't connect to Supabase
**Solution:**
- Verify your `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `.env`
- Make sure the `.env` file is in the root directory
- Restart the dev server after changing `.env`
- Check Supabase project status in the dashboard

#### 2. "Module not found" errors

**Problem:** Missing dependencies
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 3. Database schema errors

**Problem:** Tables not created or missing columns
**Solution:**
- Drop all tables and re-run `schema.sql`:
  ```sql
  DROP SCHEMA public CASCADE;
  CREATE SCHEMA public;
  -- Then run schema.sql again
  ```

#### 4. RLS Policy Errors

**Problem:** "new row violates row-level security policy"
**Solution:**
- Temporarily disable RLS for testing:
  ```sql
  ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;
  ```
- Or properly configure the `app.current_company_id` setting

#### 5. Port already in use

**Problem:** Port 5173 is already in use
**Solution:**
```bash
# Kill the process using the port
lsof -ti:5173 | xargs kill -9
# Or change the port in vite.config.ts
```

#### 6. TypeScript errors

**Problem:** Type errors in the code
**Solution:**
```bash
npm run typecheck
# Fix any type errors reported
```

### Getting Help

If you encounter issues not covered here:

1. Check the **[DATABASE.md](./DATABASE.md)** for database schema details
2. Check the **[ARCHITECTURE.md](./ARCHITECTURE.md)** for system architecture
3. Review Supabase logs in the dashboard
4. Check browser console for errors (F12)
5. Open an issue on GitHub with:
   - Error message
   - Steps to reproduce
   - Your environment (OS, Node version, etc.)

## Next Steps

After successful setup:

1. **Explore the UI** - Navigate through different sections
2. **Test CRUD Operations** - Create, read, update, delete records
3. **Try Different Roles** - Login with different user accounts
4. **Generate Reports** - View profit/loss and other reports
5. **Customize** - Modify the code to fit your needs

### Recommended Customizations

- Change default passwords in seed data
- Add your company information
- Customize the theme colors in `tailwind.config.js`
- Add your logo
- Modify role permissions to match your needs
- Create additional salary structures
- Add more revenue and expense types

## Production Deployment

For production deployment:

1. Use strong passwords for all accounts
2. Enable RLS policies properly
3. Set up proper authentication
4. Use environment-specific configuration
5. Enable HTTPS
6. Set up monitoring and logging
7. Configure backups
8. Review security settings

See **[README.md](./README.md)** for deployment instructions.

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run dev:backend      # Start backend only
npm run typecheck        # Check TypeScript types
npm run build            # Build for production
npm run preview          # Preview production build

# Database
# (Run in Supabase SQL Editor)
SELECT * FROM companies;
SELECT * FROM business_units;
SELECT * FROM employees;
SELECT * FROM revenue;
SELECT * FROM expenses;

# Verify all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Supabase Documentation](https://supabase.com/docs)
- [Hono Documentation](https://hono.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/UI Documentation](https://ui.shadcn.com/)

---

**Congratulations!** You've successfully set up the Financial Management System. Start building your financial management solution! 🎉
