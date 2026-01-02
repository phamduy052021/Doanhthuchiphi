import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

// Database query helpers
export class DatabaseClient {
  static async query<T>(
    table: string,
    options?: {
      select?: string;
      filters?: Record<string, any>;
      order?: { column: string; ascending?: boolean };
      limit?: number;
      offset?: number;
    }
  ): Promise<{ data: T[] | null; error: any }> {
    let query = supabase.from(table).select(options?.select || '*');

    if (options?.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });
    }

    if (options?.order) {
      query = query.order(options.order.column, {
        ascending: options.order.ascending ?? true,
      });
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query;
    return { data: data as T[], error };
  }

  static async insert<T>(table: string, data: any): Promise<{ data: T | null; error: any }> {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();
    return { data: result as T, error };
  }

  static async update<T>(
    table: string,
    id: string,
    data: any
  ): Promise<{ data: T | null; error: any }> {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();
    return { data: result as T, error };
  }

  static async delete(table: string, id: string): Promise<{ error: any }> {
    const { error } = await supabase.from(table).delete().eq('id', id);
    return { error };
  }

  static async getById<T>(table: string, id: string): Promise<{ data: T | null; error: any }> {
    const { data, error } = await supabase.from(table).select('*').eq('id', id).single();
    return { data: data as T, error };
  }
}
