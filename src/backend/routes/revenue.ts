import { Hono } from 'hono';
import { DatabaseClient } from '../db/client';
import type { Revenue, RevenueType, ApiResponse } from '../../shared/types';

const router = new Hono();

// Revenue Types endpoints
router.get('/types', async (c) => {
  const companyId = c.req.query('company_id');
  const { data, error } = await DatabaseClient.query<RevenueType>('revenue_types', {
    filters: companyId ? { company_id: companyId, status: 'active' } : { status: 'active' },
  });
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<RevenueType[]>>({ success: true, data: data || [] });
});

router.post('/types', async (c) => {
  const body = await c.req.json();
  const { data, error } = await DatabaseClient.insert<RevenueType>('revenue_types', body);
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<RevenueType>>({ success: true, data: data! }, 201);
});

// Revenue endpoints
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
  
  const { data, error } = await DatabaseClient.query<Revenue>('revenue', { filters });
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<Revenue[]>>({ success: true, data: data || [] });
});

router.get('/:id', async (c) => {
  const { data, error } = await DatabaseClient.getById<Revenue>('revenue', c.req.param('id'));
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  if (!data) return c.json<ApiResponse<null>>({ success: false, error: 'Not found' }, 404);
  return c.json<ApiResponse<Revenue>>({ success: true, data });
});

router.post('/', async (c) => {
  const body = await c.req.json();
  const { data, error } = await DatabaseClient.insert<Revenue>('revenue', body);
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<Revenue>>({ success: true, data: data! }, 201);
});

router.put('/:id', async (c) => {
  const body = await c.req.json();
  const { data, error } = await DatabaseClient.update<Revenue>('revenue', c.req.param('id'), body);
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<Revenue>>({ success: true, data: data! });
});

router.delete('/:id', async (c) => {
  const { error } = await DatabaseClient.delete('revenue', c.req.param('id'));
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<null>>({ success: true, message: 'Deleted successfully' });
});

export default router;
