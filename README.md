# Financial Management System

A comprehensive financial management system built with React, TypeScript, Hono, and Supabase for managing company finances, employees, salaries, and organizational structures with multi-tenant support.

## 🚀 Features

### Core Functionality

- **Company Management** - Multi-tenant support for multiple companies
- **Organizational Structure** - Business units, departments, and hierarchies
- **Revenue Management** - Track revenue by type, business unit, and period
- **Expense Management** - Manage expenses with allocation across business units
- **Employee Management** - Comprehensive employee database with HR information
- **Salary Management** - Flexible salary structures and automated calculations
- **Role-Based Access Control (RBAC)** - 5 predefined roles with customizable permissions
- **Financial Reporting** - Profit & Loss, headcount, salary costs
- **Audit Trail** - Complete audit log of all system changes

### Technical Features

- **TypeScript** - Full type safety across frontend and backend
- **Responsive Design** - Built with Tailwind CSS and Shadcn/UI
- **RESTful API** - Clean API design with Hono framework
- **Multi-tenancy** - Shared database with row-level security
- **Real-time Updates** - Powered by Supabase
- **Excel Export** - Export reports to Excel (coming soon)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Git

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd financial-management-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
VITE_API_BASE_URL=http://localhost:3000/api
```

### 4. Set Up Database

#### Option A: Using Supabase Dashboard

1. Go to your Supabase project
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase/schema.sql`
4. Click "Run" to create all tables, indexes, and views

#### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Push database schema
supabase db push
```

### 5. Seed Sample Data (Optional)

```bash
# In Supabase SQL Editor, run:
# Copy and paste contents of supabase/seed.sql
```

This creates:
- 1 sample company (ACME Corporation)
- 3 business units (North, South, Central regions)
- 5 departments
- 5 employees
- Sample revenue and expense data
- 5 system roles (Admin, Director, Accountant, Manager, Employee)
- Sample permissions

### 6. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📚 Documentation

- **[DATABASE.md](./DATABASE.md)** - Complete database schema documentation
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture and design patterns

## 🏗️ Project Structure

```
src/
├── frontend/          # React frontend application
│   ├── components/    # Reusable UI components
│   ├── pages/        # Page components
│   ├── services/     # API services
│   ├── hooks/        # Custom React hooks
│   └── lib/          # Utility libraries
├── backend/          # Hono backend application
│   ├── routes/       # API route handlers
│   ├── db/          # Database client and helpers
│   └── middleware/   # Custom middleware
└── shared/           # Shared types and utilities
    └── types.ts      # TypeScript type definitions

supabase/
├── migrations/       # Database migrations
├── schema.sql       # Complete database schema
└── seed.sql         # Sample data
```

## 🔐 Default Credentials (from seed data)

**Admin Account:**
- Username: `admin`
- Password: `password123` (Change in production!)
- Email: `admin@acme.com`

**Manager Account:**
- Username: `nguyenvana`
- Password: `password123`
- Email: `nguyenvana@acme.com`

## 🎯 API Endpoints

### Companies
- `GET /api/companies` - List companies
- `GET /api/companies/:id` - Get company details
- `POST /api/companies` - Create company
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company

### Business Units
- `GET /api/business-units` - List business units
- `GET /api/business-units/:id` - Get business unit details
- `POST /api/business-units` - Create business unit
- `PUT /api/business-units/:id` - Update business unit
- `DELETE /api/business-units/:id` - Delete business unit

### Departments
- `GET /api/departments` - List departments
- `GET /api/departments/:id` - Get department details
- `POST /api/departments` - Create department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department

### Revenue
- `GET /api/revenue` - List revenue records
- `GET /api/revenue/:id` - Get revenue details
- `POST /api/revenue` - Create revenue record
- `PUT /api/revenue/:id` - Update revenue record
- `DELETE /api/revenue/:id` - Delete revenue record
- `GET /api/revenue/types` - List revenue types
- `POST /api/revenue/types` - Create revenue type

### Expenses
- `GET /api/expenses` - List expense records
- `GET /api/expenses/:id` - Get expense details
- `POST /api/expenses` - Create expense record
- `PUT /api/expenses/:id` - Update expense record
- `DELETE /api/expenses/:id` - Delete expense record
- `GET /api/expenses/types` - List expense types
- `POST /api/expenses/types` - Create expense type
- `GET /api/expenses/:id/allocations` - Get expense allocations
- `POST /api/expenses/:id/allocations` - Create allocation

### Employees
- `GET /api/employees` - List employees
- `GET /api/employees/:id` - Get employee details
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Salary
- `GET /api/salary/structures` - List salary structures
- `POST /api/salary/structures` - Create salary structure
- `GET /api/salary/config` - Get employee salary configs
- `POST /api/salary/config` - Create salary config
- `GET /api/salary/calculations` - List salary calculations
- `GET /api/salary/calculations/:id` - Get calculation details
- `POST /api/salary/calculations` - Create calculation
- `PUT /api/salary/calculations/:id` - Update calculation

### Reports
- `GET /api/reports/profit-loss` - Profit & Loss report
- `GET /api/reports/headcount` - Employee headcount report
- `GET /api/reports/salary-cost` - Salary cost report
- `POST /api/reports/export` - Export report to Excel

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/auth/roles` - List roles
- `GET /api/auth/permissions` - Get user permissions

## 🧪 Testing

```bash
# Run type checking
npm run typecheck

# Run linting
npm run lint

# Build for production
npm run build
```

## 🚢 Deployment

### Frontend Deployment

The frontend can be deployed to:
- **Vercel** (Recommended)
- Netlify
- AWS S3 + CloudFront
- Azure Static Web Apps

```bash
npm run build
# Deploy the dist/ folder
```

### Backend Deployment

The backend can be deployed to:
- **Supabase Edge Functions** (Recommended)
- Vercel Serverless Functions
- AWS Lambda
- Docker containers

### Environment Variables for Production

Set these in your hosting platform:

```env
SUPABASE_URL=your-production-supabase-url
SUPABASE_ANON_KEY=your-production-anon-key
VITE_API_BASE_URL=your-production-api-url
NODE_ENV=production
```

## 🗃️ Database Schema

The system uses 19 tables organized into 5 categories:

### Company Structure (3 tables)
- companies
- business_units
- departments

### Financial Transactions (6 tables)
- revenue_types
- revenue
- expense_types
- expenses
- expense_allocation

### Human Resources (6 tables)
- employees
- salary_structures
- employee_salary_config
- salary_calculations
- salary_details

### Security & RBAC (5 tables)
- auth_users
- roles
- user_roles
- permissions
- role_permissions

### Auditing (1 table)
- audit_logs

For detailed schema documentation, see [DATABASE.md](./DATABASE.md).

## 👥 User Roles

### System Roles (5 predefined)

1. **Admin (Level 100)** - Full system access
2. **Director (Level 90)** - Executive-level access to all data
3. **Accountant (Level 80)** - Financial data management
4. **Manager (Level 60)** - Business unit and team management
5. **Employee (Level 10)** - Basic employee access

### Permission System

Permissions are defined by:
- **Resource** - Entity type (revenue, expenses, employees, etc.)
- **Action** - Operation (create, read, update, delete, approve, export)

Examples:
- `REVENUE_CREATE` - Create revenue records
- `EXPENSE_READ` - View expense records
- `SALARY_APPROVE` - Approve salary calculations
- `REPORT_EXPORT` - Export reports

## 🔧 Configuration

### Tailwind Configuration

The project uses Tailwind CSS with Shadcn/UI components. Customize in `tailwind.config.js`.

### Vite Configuration

Build and dev server settings in `vite.config.ts`.

### TypeScript Configuration

Type checking settings in `tsconfig.json`.

## 📊 Reports

### Available Reports

1. **Profit & Loss by Business Unit** - Revenue, expenses, and profit/loss
2. **Employee Headcount** - Headcount by business unit and department
3. **Salary Cost Analysis** - Total salary costs by business unit
4. **Custom Reports** - Build custom queries using views

## 🔐 Security Features

- **Multi-tenant Isolation** - Row-Level Security (RLS) at database level
- **RBAC** - Role-based access control with granular permissions
- **Audit Trail** - Complete log of all data changes
- **Password Security** - Bcrypt hashing with salt
- **JWT Authentication** - Stateless authentication
- **Input Validation** - Both frontend and backend validation
- **SQL Injection Prevention** - Parameterized queries

## 🛣️ Roadmap

### Phase 1: Foundation ✅ (Current)
- Database schema and setup
- Basic CRUD operations
- Authentication and RBAC
- Core financial management
- Sample reports

### Phase 2: Enhanced Features (Next)
- Excel export functionality
- Advanced filtering and search
- Email notifications
- File attachments
- Budget planning module
- Advanced reporting with charts
- Mobile responsive improvements

### Phase 3: Enterprise Features
- Multi-language support (i18n)
- Workflow automation
- Integration with external systems
- Advanced analytics and forecasting
- Mobile apps (React Native)
- Real-time collaboration

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Support

For support, please:
- Open an issue on GitHub
- Email: support@example.com
- Documentation: See DATABASE.md and ARCHITECTURE.md

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Supabase](https://supabase.com/)
- UI components from [Shadcn/UI](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Backend framework [Hono](https://hono.dev/)

## 📝 Changelog

### Version 1.0.0 (Initial Release)
- Complete database schema with 19 tables
- Multi-tenant support
- RBAC with 5 roles
- Revenue and expense management
- Employee and salary management
- Basic reporting
- RESTful API
- TypeScript support
- Responsive UI

---

**Made with ❤️ for Financial Management**
