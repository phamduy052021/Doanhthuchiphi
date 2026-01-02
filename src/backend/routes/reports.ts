import { Hono } from 'hono';
import { supabase } from '../db/client';
import type { ProfitLossByBU, EmployeeHeadcount, SalaryCostByBU, ApiResponse } from '../../shared/types';

const router = new Hono();

// Profit & Loss by Business Unit
router.get('/profit-loss', async (c) => {
  try {
    const companyId = c.req.query('company_id');
    const periodYear = c.req.query('period_year');
    const periodMonth = c.req.query('period_month');

    let query = supabase.from('vw_profit_loss_by_bu').select('*');
    
    if (companyId) query = query.eq('company_id', companyId);
    if (periodYear) query = query.eq('period_year', parseInt(periodYear));
    if (periodMonth) query = query.eq('period_month', parseInt(periodMonth));

    const { data, error } = await query;
    if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
    
    return c.json<ApiResponse<ProfitLossByBU[]>>({ success: true, data: data || [] });
  } catch (error: any) {
    return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  }
});

// Employee Headcount
router.get('/headcount', async (c) => {
  try {
    const companyId = c.req.query('company_id');
    const businessUnitId = c.req.query('business_unit_id');

    let query = supabase.from('vw_employee_headcount').select('*');
    
    if (companyId) query = query.eq('company_id', companyId);
    if (businessUnitId) query = query.eq('business_unit_id', businessUnitId);

    const { data, error } = await query;
    if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
    
    return c.json<ApiResponse<EmployeeHeadcount[]>>({ success: true, data: data || [] });
  } catch (error: any) {
    return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  }
});

// Salary Cost by Business Unit
router.get('/salary-cost', async (c) => {
  try {
    const companyId = c.req.query('company_id');
    const periodYear = c.req.query('period_year');
    const periodMonth = c.req.query('period_month');

    let query = supabase.from('vw_salary_cost_by_bu').select('*');
    
    if (companyId) query = query.eq('company_id', companyId);
    if (periodYear) query = query.eq('period_year', parseInt(periodYear));
    if (periodMonth) query = query.eq('period_month', parseInt(periodMonth));

    const { data, error } = await query;
    if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
    
    return c.json<ApiResponse<SalaryCostByBU[]>>({ success: true, data: data || [] });
  } catch (error: any) {
    return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  }
});

// Export to Excel (stub)
router.post('/export', async (c) => {
  try {
    const { report_type, filters } = await c.req.json();
    
    // TODO: Implement Excel export using xlsx library
    return c.json<ApiResponse<{ download_url: string }>>({
      success: true,
      data: { download_url: '/exports/report.xlsx' },
      message: 'Export functionality to be implemented',
    });
  } catch (error: any) {
    return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  }
});

export default router;
