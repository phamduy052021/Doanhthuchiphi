import { Hono } from 'hono';
import { DatabaseClient } from '../db/client';
import type { SalaryCalculation, SalaryStructure, EmployeeSalaryConfig, ApiResponse } from '../../shared/types';

const router = new Hono();

// Salary Structures
router.get('/structures', async (c) => {
  const companyId = c.req.query('company_id');
  const { data, error } = await DatabaseClient.query<SalaryStructure>('salary_structures', {
    filters: companyId ? { company_id: companyId, status: 'active' } : { status: 'active' },
  });
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<SalaryStructure[]>>({ success: true, data: data || [] });
});

router.post('/structures', async (c) => {
  const body = await c.req.json();
  const { data, error } = await DatabaseClient.insert<SalaryStructure>('salary_structures', body);
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<SalaryStructure>>({ success: true, data: data! }, 201);
});

// Employee Salary Config
router.get('/config', async (c) => {
  const employeeId = c.req.query('employee_id');
  const filters: any = { status: 'active' };
  if (employeeId) filters.employee_id = employeeId;
  
  const { data, error } = await DatabaseClient.query<EmployeeSalaryConfig>('employee_salary_config', { filters });
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<EmployeeSalaryConfig[]>>({ success: true, data: data || [] });
});

router.post('/config', async (c) => {
  const body = await c.req.json();
  const { data, error } = await DatabaseClient.insert<EmployeeSalaryConfig>('employee_salary_config', body);
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<EmployeeSalaryConfig>>({ success: true, data: data! }, 201);
});

// Salary Calculations
router.get('/calculations', async (c) => {
  const filters: any = {};
  const companyId = c.req.query('company_id');
  const employeeId = c.req.query('employee_id');
  const periodMonth = c.req.query('period_month');
  const periodYear = c.req.query('period_year');
  
  if (companyId) filters.company_id = companyId;
  if (employeeId) filters.employee_id = employeeId;
  if (periodMonth) filters.period_month = parseInt(periodMonth);
  if (periodYear) filters.period_year = parseInt(periodYear);
  
  const { data, error } = await DatabaseClient.query<SalaryCalculation>('salary_calculations', { filters });
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<SalaryCalculation[]>>({ success: true, data: data || [] });
});

router.get('/calculations/:id', async (c) => {
  const { data, error } = await DatabaseClient.getById<SalaryCalculation>('salary_calculations', c.req.param('id'));
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  if (!data) return c.json<ApiResponse<null>>({ success: false, error: 'Not found' }, 404);
  return c.json<ApiResponse<SalaryCalculation>>({ success: true, data });
});

router.post('/calculations', async (c) => {
  const body = await c.req.json();
  const { data, error } = await DatabaseClient.insert<SalaryCalculation>('salary_calculations', body);
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<SalaryCalculation>>({ success: true, data: data! }, 201);
});

router.put('/calculations/:id', async (c) => {
  const body = await c.req.json();
  const { data, error } = await DatabaseClient.update<SalaryCalculation>('salary_calculations', c.req.param('id'), body);
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<SalaryCalculation>>({ success: true, data: data! });
});

export default router;
