import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';

// Import routes
import companiesRouter from './routes/companies';
import businessUnitsRouter from './routes/business-units';
import departmentsRouter from './routes/departments';
import revenueRouter from './routes/revenue';
import expensesRouter from './routes/expenses';
import employeesRouter from './routes/employees';
import salaryRouter from './routes/salary';
import authRouter from './routes/auth';
import reportsRouter from './routes/reports';

// Initialize Hono app
const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger());
app.use('*', prettyJSON());

// Health check
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Financial Management System API',
  });
});

// API routes
app.route('/api/companies', companiesRouter);
app.route('/api/business-units', businessUnitsRouter);
app.route('/api/departments', departmentsRouter);
app.route('/api/revenue', revenueRouter);
app.route('/api/expenses', expensesRouter);
app.route('/api/employees', employeesRouter);
app.route('/api/salary', salaryRouter);
app.route('/api/auth', authRouter);
app.route('/api/reports', reportsRouter);

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Error:', err);
  return c.json({ error: err.message }, 500);
});

export default app;
