import { Hono } from 'hono';
import { DatabaseClient } from '../db/client';
import type { Company, ApiResponse } from '../../shared/types';

const router = new Hono();

// GET /api/companies - List all companies
router.get('/', async (c) => {
  try {
    const { data, error } = await DatabaseClient.query<Company>('companies', {
      filters: { status: 'active' },
      order: { column: 'created_at', ascending: false },
    });

    if (error) {
      return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
    }

    return c.json<ApiResponse<Company[]>>({ success: true, data: data || [] });
  } catch (error: any) {
    return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  }
});

// GET /api/companies/:id - Get company by ID
router.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const { data, error } = await DatabaseClient.getById<Company>('companies', id);

    if (error) {
      return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
    }

    if (!data) {
      return c.json<ApiResponse<null>>({ success: false, error: 'Company not found' }, 404);
    }

    return c.json<ApiResponse<Company>>({ success: true, data });
  } catch (error: any) {
    return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  }
});

// POST /api/companies - Create new company
router.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const { data, error } = await DatabaseClient.insert<Company>('companies', body);

    if (error) {
      return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
    }

    return c.json<ApiResponse<Company>>({ success: true, data: data!, message: 'Company created successfully' }, 201);
  } catch (error: any) {
    return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  }
});

// PUT /api/companies/:id - Update company
router.put('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { data, error } = await DatabaseClient.update<Company>('companies', id, body);

    if (error) {
      return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
    }

    return c.json<ApiResponse<Company>>({ success: true, data: data!, message: 'Company updated successfully' });
  } catch (error: any) {
    return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  }
});

// DELETE /api/companies/:id - Delete company
router.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const { error } = await DatabaseClient.delete('companies', id);

    if (error) {
      return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
    }

    return c.json<ApiResponse<null>>({ success: true, message: 'Company deleted successfully' });
  } catch (error: any) {
    return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  }
});

export default router;
