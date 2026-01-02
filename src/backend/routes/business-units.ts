import { Hono } from 'hono';
import { DatabaseClient } from '../db/client';
import type { BusinessUnit, ApiResponse } from '../../shared/types';

const router = new Hono();

router.get('/', async (c) => {
  const companyId = c.req.query('company_id');
  const { data, error } = await DatabaseClient.query<BusinessUnit>('business_units', {
    filters: companyId ? { company_id: companyId, status: 'active' } : { status: 'active' },
  });
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<BusinessUnit[]>>({ success: true, data: data || [] });
});

router.get('/:id', async (c) => {
  const { data, error } = await DatabaseClient.getById<BusinessUnit>('business_units', c.req.param('id'));
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  if (!data) return c.json<ApiResponse<null>>({ success: false, error: 'Not found' }, 404);
  return c.json<ApiResponse<BusinessUnit>>({ success: true, data });
});

router.post('/', async (c) => {
  const body = await c.req.json();
  const { data, error } = await DatabaseClient.insert<BusinessUnit>('business_units', body);
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<BusinessUnit>>({ success: true, data: data! }, 201);
});

router.put('/:id', async (c) => {
  const body = await c.req.json();
  const { data, error } = await DatabaseClient.update<BusinessUnit>('business_units', c.req.param('id'), body);
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<BusinessUnit>>({ success: true, data: data! });
});

router.delete('/:id', async (c) => {
  const { error } = await DatabaseClient.delete('business_units', c.req.param('id'));
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<null>>({ success: true, message: 'Deleted successfully' });
});

export default router;
