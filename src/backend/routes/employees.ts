import { Hono } from 'hono';
import { DatabaseClient } from '../db/client';
import type { Employee, ApiResponse } from '../../shared/types';

const router = new Hono();

router.get('/', async (c) => {
  const filters: any = {};
  const companyId = c.req.query('company_id');
  const businessUnitId = c.req.query('business_unit_id');
  const departmentId = c.req.query('department_id');
  const status = c.req.query('status') || 'active';
  
  if (companyId) filters.company_id = companyId;
  if (businessUnitId) filters.business_unit_id = businessUnitId;
  if (departmentId) filters.department_id = departmentId;
  if (status) filters.status = status;
  
  const { data, error } = await DatabaseClient.query<Employee>('employees', { filters });
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<Employee[]>>({ success: true, data: data || [] });
});

router.get('/:id', async (c) => {
  const { data, error } = await DatabaseClient.getById<Employee>('employees', c.req.param('id'));
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  if (!data) return c.json<ApiResponse<null>>({ success: false, error: 'Not found' }, 404);
  return c.json<ApiResponse<Employee>>({ success: true, data });
});

router.post('/', async (c) => {
  const body = await c.req.json();
  const { data, error } = await DatabaseClient.insert<Employee>('employees', body);
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<Employee>>({ success: true, data: data! }, 201);
});

router.put('/:id', async (c) => {
  const body = await c.req.json();
  const { data, error } = await DatabaseClient.update<Employee>('employees', c.req.param('id'), body);
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<Employee>>({ success: true, data: data! });
});

router.delete('/:id', async (c) => {
  const { error } = await DatabaseClient.delete('employees', c.req.param('id'));
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<null>>({ success: true, message: 'Deleted successfully' });
});

export default router;
