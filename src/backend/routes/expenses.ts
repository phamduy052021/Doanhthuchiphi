import { Hono } from 'hono';
import { DatabaseClient } from '../db/client';
import type { Expense, ExpenseType, ExpenseAllocation, ApiResponse } from '../../shared/types';

const router = new Hono();

// Expense Types
router.get('/types', async (c) => {
  const companyId = c.req.query('company_id');
  const { data, error } = await DatabaseClient.query<ExpenseType>('expense_types', {
    filters: companyId ? { company_id: companyId, status: 'active' } : { status: 'active' },
  });
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<ExpenseType[]>>({ success: true, data: data || [] });
});

router.post('/types', async (c) => {
  const body = await c.req.json();
  const { data, error } = await DatabaseClient.insert<ExpenseType>('expense_types', body);
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<ExpenseType>>({ success: true, data: data! }, 201);
});

// Expenses
router.get('/', async (c) => {
  const filters: any = {};
  const companyId = c.req.query('company_id');
  const businessUnitId = c.req.query('business_unit_id');
  const periodMonth = c.req.query('period_month');
  const periodYear = c.req.query('period_year');
  
  if (companyId) filters.company_id = companyId;
  if (businessUnitId) filters.business_unit_id = businessUnitId;
  if (periodMonth) filters.period_month = parseInt(periodMonth);
  if (periodYear) filters.period_year = parseInt(periodYear);
  
  const { data, error } = await DatabaseClient.query<Expense>('expenses', { filters });
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<Expense[]>>({ success: true, data: data || [] });
});

router.get('/:id', async (c) => {
  const { data, error } = await DatabaseClient.getById<Expense>('expenses', c.req.param('id'));
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  if (!data) return c.json<ApiResponse<null>>({ success: false, error: 'Not found' }, 404);
  return c.json<ApiResponse<Expense>>({ success: true, data });
});

router.post('/', async (c) => {
  const body = await c.req.json();
  const { data, error } = await DatabaseClient.insert<Expense>('expenses', body);
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<Expense>>({ success: true, data: data! }, 201);
});

router.put('/:id', async (c) => {
  const body = await c.req.json();
  const { data, error } = await DatabaseClient.update<Expense>('expenses', c.req.param('id'), body);
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<Expense>>({ success: true, data: data! });
});

router.delete('/:id', async (c) => {
  const { error } = await DatabaseClient.delete('expenses', c.req.param('id'));
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<null>>({ success: true, message: 'Deleted successfully' });
});

// Expense Allocation
router.get('/:id/allocations', async (c) => {
  const expenseId = c.req.param('id');
  const { data, error } = await DatabaseClient.query<ExpenseAllocation>('expense_allocation', {
    filters: { expense_id: expenseId },
  });
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<ExpenseAllocation[]>>({ success: true, data: data || [] });
});

router.post('/:id/allocations', async (c) => {
  const body = await c.req.json();
  body.expense_id = c.req.param('id');
  const { data, error } = await DatabaseClient.insert<ExpenseAllocation>('expense_allocation', body);
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<ExpenseAllocation>>({ success: true, data: data! }, 201);
});

export default router;
