/**
 * QUERY HELPERS
 * SQL-like query functionality for KV store
 */

import * as kv from "./kv_helper.tsx";
import { QueryFilter, QueryOptions } from "./database-schema.tsx";

// ============================================
// FILTER OPERATIONS
// ============================================

export function applyFilters<T>(data: T[], filters?: QueryFilter[]): T[] {
  if (!filters || filters.length === 0) return data;

  return data.filter((item: any) => {
    return filters.every((filter) => {
      const value = getNestedValue(item, filter.field);
      
      switch (filter.operator) {
        case "eq":
          return value === filter.value;
        case "ne":
          return value !== filter.value;
        case "gt":
          return value > filter.value;
        case "gte":
          return value >= filter.value;
        case "lt":
          return value < filter.value;
        case "lte":
          return value <= filter.value;
        case "in":
          return Array.isArray(filter.value) && filter.value.includes(value);
        case "like":
          return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
        default:
          return true;
      }
    });
  });
}

// ============================================
// SORTING
// ============================================

export function applySorting<T>(
  data: T[],
  orderBy?: { field: string; direction: "asc" | "desc" }
): T[] {
  if (!orderBy) return data;

  return [...data].sort((a: any, b: any) => {
    const aVal = getNestedValue(a, orderBy.field);
    const bVal = getNestedValue(b, orderBy.field);

    if (aVal === bVal) return 0;
    
    const comparison = aVal > bVal ? 1 : -1;
    return orderBy.direction === "asc" ? comparison : -comparison;
  });
}

// ============================================
// PAGINATION
// ============================================

export function applyPagination<T>(
  data: T[],
  limit?: number,
  offset?: number
): T[] {
  if (!limit && !offset) return data;
  
  const start = offset || 0;
  const end = limit ? start + limit : undefined;
  
  return data.slice(start, end);
}

// ============================================
// AGGREGATE FUNCTIONS
// ============================================

export function aggregate<T>(
  data: T[],
  field: string,
  func: "sum" | "avg" | "min" | "max" | "count"
): number {
  if (func === "count") return data.length;

  const values = data
    .map((item: any) => getNestedValue(item, field))
    .filter((val) => typeof val === "number");

  if (values.length === 0) return 0;

  switch (func) {
    case "sum":
      return values.reduce((acc, val) => acc + val, 0);
    case "avg":
      return values.reduce((acc, val) => acc + val, 0) / values.length;
    case "min":
      return Math.min(...values);
    case "max":
      return Math.max(...values);
    default:
      return 0;
  }
}

// ============================================
// GROUP BY
// ============================================

export function groupBy<T>(data: T[], field: string): Record<string, T[]> {
  return data.reduce((acc: Record<string, T[]>, item: any) => {
    const key = String(getNestedValue(item, field));
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

// ============================================
// JOIN OPERATIONS (Simulate SQL JOINs)
// ============================================

export async function leftJoin<T, U>(
  leftData: T[],
  leftKey: string,
  rightPrefix: string,
  rightKey: string,
  joinField: string
): Promise<Array<T & { [key: string]: U | null }>> {
  const rightData = await kv.getByPrefixFixed(rightPrefix);
  const rightMap = new Map<any, U>();
  
  rightData.forEach((item) => {
    const key = getNestedValue(item.value, rightKey);
    rightMap.set(key, item.value);
  });

  return leftData.map((leftItem: any) => {
    const leftValue = getNestedValue(leftItem, leftKey);
    const rightItem = rightMap.get(leftValue) || null;
    return {
      ...leftItem,
      [joinField]: rightItem,
    };
  });
}

// ============================================
// QUERY BUILDER
// ============================================

export class QueryBuilder<T> {
  private prefix: string;
  private filters: QueryFilter[] = [];
  private orderByClause?: { field: string; direction: "asc" | "desc" };
  private limitValue?: number;
  private offsetValue?: number;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  where(field: string, operator: QueryFilter["operator"], value: any): this {
    this.filters.push({ field, operator, value });
    return this;
  }

  orderBy(field: string, direction: "asc" | "desc" = "asc"): this {
    this.orderByClause = { field, direction };
    return this;
  }

  limit(limit: number): this {
    this.limitValue = limit;
    return this;
  }

  offset(offset: number): this {
    this.offsetValue = offset;
    return this;
  }

  async execute(): Promise<T[]> {
    const result = await kv.getByPrefixFixed(this.prefix);
    let data = result.map((item) => item.value as T);

    // Apply filters
    data = applyFilters(data, this.filters);

    // Apply sorting
    data = applySorting(data, this.orderByClause);

    // Apply pagination
    data = applyPagination(data, this.limitValue, this.offsetValue);

    return data;
  }

  async count(): Promise<number> {
    const result = await kv.getByPrefixFixed(this.prefix);
    let data = result.map((item) => item.value as T);
    data = applyFilters(data, this.filters);
    return data.length;
  }

  async first(): Promise<T | null> {
    const results = await this.limit(1).execute();
    return results[0] || null;
  }
}

// ============================================
// VALIDATION
// ============================================

export function validate(data: any, rules: Record<string, any>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  for (const [field, rule] of Object.entries(rules)) {
    const value = data[field];

    // Required check
    if (rule.required && (value === undefined || value === null || value === "")) {
      errors.push(`Field '${field}' is required`);
      continue;
    }

    if (value === undefined || value === null) continue;

    // Type check
    if (rule.type && typeof value !== rule.type) {
      errors.push(`Field '${field}' must be of type ${rule.type}`);
    }

    // String validations
    if (typeof value === "string") {
      if (rule.minLength && value.length < rule.minLength) {
        errors.push(`Field '${field}' must be at least ${rule.minLength} characters`);
      }
      if (rule.maxLength && value.length > rule.maxLength) {
        errors.push(`Field '${field}' must be at most ${rule.maxLength} characters`);
      }
      if (rule.pattern && !rule.pattern.test(value)) {
        errors.push(`Field '${field}' format is invalid`);
      }
    }

    // Number validations
    if (typeof value === "number") {
      if (rule.min !== undefined && value < rule.min) {
        errors.push(`Field '${field}' must be at least ${rule.min}`);
      }
      if (rule.max !== undefined && value > rule.max) {
        errors.push(`Field '${field}' must be at most ${rule.max}`);
      }
    }

    // Enum check
    if (rule.enum && !rule.enum.includes(value)) {
      errors.push(`Field '${field}' must be one of: ${rule.enum.join(", ")}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((current, key) => current?.[key], obj);
}

// ============================================
// TRANSACTION SIMULATION
// ============================================

export class Transaction {
  private operations: Array<() => Promise<void>> = [];

  async set(key: string, value: any): Promise<void> {
    this.operations.push(() => kv.set(key, value));
  }

  async del(key: string): Promise<void> {
    this.operations.push(() => kv.del(key));
  }

  async commit(): Promise<void> {
    for (const op of this.operations) {
      await op();
    }
    this.operations = [];
  }

  rollback(): void {
    this.operations = [];
  }
}
