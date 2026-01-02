import { Hono } from 'hono';
import { DatabaseClient } from '../db/client';
import type { AuthUser, Role, ApiResponse } from '../../shared/types';

const router = new Hono();

// Login endpoint (simplified - implement proper authentication)
router.post('/login', async (c) => {
  try {
    const { username, password } = await c.req.json();
    
    // TODO: Implement proper authentication with password hashing
    const { data: users, error } = await DatabaseClient.query<AuthUser>('auth_users', {
      filters: { username, status: 'active' },
      limit: 1,
    });

    if (error || !users || users.length === 0) {
      return c.json<ApiResponse<null>>({ success: false, error: 'Invalid credentials' }, 401);
    }

    const user = users[0];
    // TODO: Verify password hash

    return c.json<ApiResponse<{ user: Partial<AuthUser>; token: string }>>({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          full_name: user.full_name,
          company_id: user.company_id,
        },
        token: 'jwt-token-here', // TODO: Generate JWT token
      },
    });
  } catch (error: any) {
    return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  }
});

// Get current user
router.get('/me', async (c) => {
  // TODO: Implement JWT verification
  const userId = c.req.header('X-User-Id'); // Temporary
  if (!userId) {
    return c.json<ApiResponse<null>>({ success: false, error: 'Unauthorized' }, 401);
  }

  const { data, error } = await DatabaseClient.getById<AuthUser>('auth_users', userId);
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  if (!data) return c.json<ApiResponse<null>>({ success: false, error: 'User not found' }, 404);

  return c.json<ApiResponse<Partial<AuthUser>>>({
    success: true,
    data: {
      id: data.id,
      username: data.username,
      email: data.email,
      full_name: data.full_name,
      company_id: data.company_id,
      status: data.status,
    },
  });
});

// Roles
router.get('/roles', async (c) => {
  const companyId = c.req.query('company_id');
  const { data, error } = await DatabaseClient.query<Role>('roles', {
    filters: companyId ? { company_id: companyId, status: 'active' } : { status: 'active' },
  });
  if (error) return c.json<ApiResponse<null>>({ success: false, error: error.message }, 500);
  return c.json<ApiResponse<Role[]>>({ success: true, data: data || [] });
});

// User permissions (simplified)
router.get('/permissions', async (c) => {
  const userId = c.req.query('user_id');
  if (!userId) {
    return c.json<ApiResponse<null>>({ success: false, error: 'user_id required' }, 400);
  }

  // TODO: Implement proper permission resolution through roles
  return c.json<ApiResponse<string[]>>({
    success: true,
    data: [], // Return permission codes
  });
});

export default router;
