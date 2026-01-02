# Architecture Documentation

## System Overview

The Financial Management System is a full-stack web application built with modern technologies to manage financial operations, employee salaries, and organizational structures for multi-tenant companies.

## Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Component library built on Radix UI
- **Recharts** - Data visualization
- **React Hook Form** - Form management
- **Lucide React** - Icon library

### Backend
- **Hono** - Lightweight web framework
- **TypeScript** - Type-safe backend code
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Storage
  - Edge Functions

### Database
- **PostgreSQL** - Primary relational database
- **Supabase** - Managed PostgreSQL with additional features

### Build Tools
- **Vite** - Fast build tool with HMR
- **SWC** - Fast TypeScript/JavaScript compiler
- **PostCSS** - CSS processing
- **Autoprefixer** - Automatic vendor prefixes

## Project Structure

```
financial-management-system/
├── src/
│   ├── frontend/              # React frontend application
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/           # Base UI components (Shadcn)
│   │   │   ├── forms/        # Form components
│   │   │   ├── tables/       # Table components
│   │   │   └── charts/       # Chart components
│   │   ├── pages/            # Page components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Revenue.tsx
│   │   │   ├── Expenses.tsx
│   │   │   ├── Employees.tsx
│   │   │   ├── Salary.tsx
│   │   │   └── Reports.tsx
│   │   ├── services/         # API services
│   │   │   ├── api.ts       # API client configuration
│   │   │   ├── auth.ts      # Authentication service
│   │   │   ├── revenue.ts   # Revenue API calls
│   │   │   ├── expenses.ts  # Expenses API calls
│   │   │   └── employees.ts # Employees API calls
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility libraries
│   │   ├── utils/           # Helper functions
│   │   ├── styles/          # Global styles
│   │   ├── App.tsx          # Main application component
│   │   └── main.tsx         # Application entry point
│   │
│   ├── backend/              # Hono backend application
│   │   ├── routes/          # API route handlers
│   │   │   ├── companies.ts
│   │   │   ├── business-units.ts
│   │   │   ├── departments.ts
│   │   │   ├── revenue.ts
│   │   │   ├── expenses.ts
│   │   │   ├── employees.ts
│   │   │   ├── salary.ts
│   │   │   ├── auth.ts
│   │   │   └── reports.ts
│   │   ├── db/              # Database layer
│   │   │   └── client.ts   # Supabase client & helpers
│   │   ├── middleware/      # Custom middleware
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Backend utilities
│   │   └── index.ts         # Backend entry point
│   │
│   └── shared/               # Shared code between frontend/backend
│       ├── types.ts         # TypeScript type definitions
│       ├── constants.ts     # Shared constants
│       └── validators.ts    # Data validators
│
├── supabase/                 # Supabase configuration
│   ├── migrations/          # Database migrations
│   ├── schema.sql           # Database schema
│   └── seed.sql             # Seed data
│
├── public/                   # Static assets
├── .env.example             # Environment variables template
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── README.md                # Project documentation
```

## Architecture Layers

### 1. Presentation Layer (Frontend)

**Responsibility:** User interface and user experience

**Components:**
- React components for UI rendering
- Client-side routing
- Form validation and submission
- Data visualization with charts
- State management (React hooks)
- API integration

**Key Patterns:**
- Component composition
- Container/Presentational component pattern
- Custom hooks for reusable logic
- Context API for global state

### 2. API Layer (Backend)

**Responsibility:** Business logic and data access

**Components:**
- RESTful API endpoints
- Request validation
- Authentication and authorization
- Business logic processing
- Database queries

**Key Patterns:**
- RESTful API design
- Middleware pattern
- Repository pattern
- Service layer pattern

### 3. Data Layer (Database)

**Responsibility:** Data persistence and integrity

**Components:**
- PostgreSQL database
- Table schemas
- Indexes and constraints
- Triggers and views
- Row-level security

**Key Patterns:**
- Normalized database design
- Foreign key constraints
- Computed columns
- Audit trail

## Data Flow

### Read Operations

```
User → Frontend Component → API Service → Backend Route → Database Client → Supabase → PostgreSQL
                                                                                            ↓
User ← Frontend Component ← API Service ← Backend Route ← Database Client ← Supabase ← PostgreSQL
```

### Write Operations

```
User Input → Form Component → Validation → API Service → Backend Route → Validation → Database Client → Supabase → PostgreSQL
                                                                                                                        ↓
                                                                                                                   Audit Log
                                                                                                                        ↓
User Feedback ← Frontend Component ← API Service ← Backend Route ← Database Client ← Supabase ← PostgreSQL
```

## Authentication & Authorization

### Authentication Flow

1. User submits credentials
2. Backend validates credentials
3. Backend generates JWT token
4. Token stored in browser (localStorage/cookie)
5. Token included in subsequent requests
6. Backend validates token on each request

### Authorization (RBAC)

```
User → User Roles → Roles → Role Permissions → Permissions → Resource Access
```

**Role Hierarchy:**
1. **Admin (Level 100)** - Full system access
2. **Director (Level 90)** - Executive-level access
3. **Accountant (Level 80)** - Financial data management
4. **Manager (Level 60)** - Business unit management
5. **Employee (Level 10)** - Basic access

### Permission Model

Permissions are defined by:
- **Resource** - What entity (revenue, expenses, employees)
- **Action** - What operation (create, read, update, delete, approve, export)

Example permissions:
- `REVENUE_CREATE` - Create revenue records
- `EXPENSE_READ` - View expense records
- `SALARY_APPROVE` - Approve salary calculations
- `REPORT_EXPORT` - Export reports to Excel

## Multi-Tenancy

The system implements **shared database, shared schema** multi-tenancy:

1. All companies share the same database and tables
2. `company_id` column in all tables ensures data isolation
3. Row-Level Security (RLS) policies enforce isolation at database level
4. Application layer validates company context
5. Users can only access data from their company

## API Design

### RESTful Endpoints

```
GET    /api/{resource}           - List all records
GET    /api/{resource}/:id       - Get single record
POST   /api/{resource}           - Create new record
PUT    /api/{resource}/:id       - Update record
DELETE /api/{resource}/:id       - Delete record
```

### Response Format

```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional success message"
}
```

### Error Format

```json
{
  "success": false,
  "error": "Error message"
}
```

### Query Parameters

- `company_id` - Filter by company
- `business_unit_id` - Filter by business unit
- `department_id` - Filter by department
- `period_month` - Filter by month
- `period_year` - Filter by year
- `status` - Filter by status
- `page` - Pagination page
- `limit` - Items per page

## State Management

### Frontend State

- **Local State** - Component-specific state (useState)
- **Form State** - Form data and validation (React Hook Form)
- **Server State** - Data from API (React Query - future enhancement)
- **Global State** - Authentication, theme (Context API)

### Backend State

- **Stateless** - No server-side session state
- **JWT Tokens** - Stateless authentication
- **Database** - Persistent state

## Security

### Frontend Security

1. Input validation before API calls
2. XSS prevention (React default)
3. CSRF tokens for state-changing operations
4. Secure token storage
5. HTTPS only in production

### Backend Security

1. Input validation and sanitization
2. SQL injection prevention (parameterized queries)
3. Rate limiting on authentication endpoints
4. Password hashing (bcrypt)
5. JWT token validation
6. Row-Level Security (RLS)
7. Audit logging

### Database Security

1. Row-Level Security (RLS) policies
2. Encrypted connections (SSL)
3. Strong password policies
4. Regular backups
5. Access control lists

## Performance Optimization

### Frontend

1. Code splitting
2. Lazy loading of routes
3. Memoization of expensive computations
4. Virtual scrolling for large lists
5. Optimistic updates
6. Caching API responses

### Backend

1. Database indexing
2. Query optimization
3. Connection pooling
4. Response caching
5. Pagination
6. Batch operations

### Database

1. Proper indexing
2. Computed columns for frequent calculations
3. Materialized views for complex reports
4. Query optimization
5. Vacuum and analyze

## Scalability

### Horizontal Scaling

- Multiple backend instances behind load balancer
- Stateless backend design
- Database connection pooling

### Vertical Scaling

- Increase database resources
- Optimize queries
- Add read replicas

### Data Partitioning

- Partition large tables by year (revenue, expenses, salary_calculations)
- Archive old data
- Implement data retention policies

## Deployment

### Frontend Deployment

```bash
npm run build
# Deploy dist/ folder to:
# - Vercel
# - Netlify
# - AWS S3 + CloudFront
# - Azure Static Web Apps
```

### Backend Deployment

```bash
# Deploy to:
# - Supabase Edge Functions
# - Vercel Serverless Functions
# - AWS Lambda
# - Docker containers on Cloud Run/ECS
```

### Database

- Managed on Supabase
- Automatic backups
- Point-in-time recovery
- High availability

## Monitoring & Logging

### Application Monitoring

- Error tracking (Sentry)
- Performance monitoring
- User analytics
- API usage metrics

### Database Monitoring

- Query performance
- Connection pool status
- Slow query log
- Table sizes

### Audit Logging

- All data modifications logged to `audit_logs` table
- User actions tracked
- Compliance reporting

## Testing Strategy

### Unit Tests

- Business logic functions
- Utility functions
- Data validators

### Integration Tests

- API endpoints
- Database operations
- Authentication flow

### End-to-End Tests

- Critical user flows
- Form submissions
- Report generation

## Future Enhancements

### Phase 2 - Advanced Features

1. Real-time notifications (Supabase Realtime)
2. File upload and management
3. Email notifications
4. Advanced reporting with filters
5. Excel export functionality
6. Budget planning module
7. Forecasting and analytics
8. Mobile responsive design
9. Offline support (PWA)

### Phase 3 - Enterprise Features

1. Multi-language support (i18n)
2. Advanced RBAC with custom roles
3. Workflow automation
4. Integration with accounting systems
5. API for third-party integrations
6. Advanced analytics and BI dashboards
7. Machine learning for predictions
8. Mobile apps (React Native)

## Development Workflow

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# 3. Run database migrations
# Execute schema.sql in Supabase SQL Editor

# 4. Seed sample data
# Execute seed.sql in Supabase SQL Editor

# 5. Start development server
npm run dev
```

### Git Workflow

1. Create feature branch from `main`
2. Implement feature with commits
3. Push branch and create PR
4. Code review
5. Merge to `main`
6. Deploy to production

### Version Control

- **main** - Production-ready code
- **develop** - Integration branch
- **feature/** - Feature branches
- **hotfix/** - Urgent fixes

## Best Practices

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages
- Document complex logic

### Component Design

- Keep components small and focused
- Use composition over inheritance
- Implement proper error boundaries
- Handle loading and error states
- Make components reusable

### API Design

- Use RESTful conventions
- Version your API
- Provide clear error messages
- Document all endpoints
- Handle edge cases

### Database

- Use migrations for schema changes
- Never modify production data directly
- Always backup before major changes
- Monitor query performance
- Use transactions for related operations

## Support & Maintenance

### Regular Maintenance

- Update dependencies monthly
- Review and address security vulnerabilities
- Monitor error logs weekly
- Optimize slow queries
- Archive old data quarterly

### Documentation

- Keep API documentation updated
- Document breaking changes
- Maintain changelog
- Update README with new features

## Contact & Resources

### Documentation

- Database: `DATABASE.md`
- API: Coming soon
- User Guide: Coming soon

### Support

- GitHub Issues: For bug reports and feature requests
- Email: support@example.com
- Slack: #financial-management-system
