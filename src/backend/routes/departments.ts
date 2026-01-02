import { Hono } from 'hono';
import { DatabaseClient } from '../db/client';
import type { Department, ApiResponse } from '../../shared/types';

const router = new Hono();

router.get('/', async (c) => {
  const filters: any = { status: 'active' };
  const companyId = c.req.query('company_id');
  const businessUnitId = c.req.query('business_unit_id');
  if (companyId) filters.company_id = companyId;
  if (businessUnitId) filters.business_unit_id = businessUnitId;
  
  const { data, error } = await DatabaseClient.query<Department>('departments', { filters });
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<Department[]>>({ success: true, data: data || [] });
});

router.get('/:id', async (c) => {
  const { data, error } = await DatabaseClient.getById<Department>('departments', c.req.param('id'));
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  if (!data) return c.json<ApiResponse<null>>({ success: false, error: 'Not found' }, 404);
  return c.json<ApiResponse<Department>>({ success: true, data });
});

router.post('/', async (c) => {
  const body = await c.req.json();
  const { data, error } = await DatabaseClient.insert<Department>('departments', body);
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<Department>>({ success: true, data: data! }, 201);
});

router.put('/:id', async (c) => {
  const body = await c.req.json();
  const { data, error } = await DatabaseClient.update<Department>('departments', c.req.param('id'), body);
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<Department>>({ success: true, data: data! });
});

router.delete('/:id', async (c) => {
  const { error } = await DatabaseClient.delete('departments', c.req.param('id'));
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<null>>({ success: true, message: 'Deleted successfully' });
});

export default router;
