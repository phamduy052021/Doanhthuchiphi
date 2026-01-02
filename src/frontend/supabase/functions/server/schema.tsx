/**
 * Database Schema Documentation
 * ==============================
 * 
 * This file documents the database structure for the Business Unit Management Dashboard.
 * All data is stored in the kv_store_80868a71 table with the following key patterns:
 * 
 * BUSINESS UNITS:
 * - Key: bu:{id}
 * - Value: { id, name, manager, region, status, createdAt }
 * 
 * KPI MASTER:
 * - Key: kpi:{id}
 * - Value: { id, name, category, businessUnitId, targetValue, actualValue, unit, 
 *           responsiblePersonId, month, year, linkedRevenue?, linkedCost? }
 * 
 * REVENUE SOURCES:
 * - Key: revenue:{businessUnitId}:{id}
 * - Value: { id, businessUnitId, name, unit, unitPrice, quantity, growthRate, 
 *           churnRate, cumulative, month, year }
 * 
 * VARIABLE COSTS:
 * - Key: variable_cost:{businessUnitId}:{id}
 * - Value: { id, businessUnitId, type, description, amount, month, year }
 * 
 * FIXED COSTS:
 * - Key: fixed_cost:{id}
 * - Value: { id, name, category, amount, month, year }
 * 
 * FIXED COST ALLOCATIONS:
 * - Key: fixed_cost_allocation:{fixedCostId}:{businessUnitId}
 * - Value: { fixedCostId, businessUnitId, allocationType, value, month, year }
 * 
 * EMPLOYEES:
 * - Key: employee:{id}
 * - Value: { id, name, position, department, businessUnitId, salary, startDate, status }
 * 
 * EMPLOYEE ALLOCATIONS:
 * - Key: employee_allocation:{employeeId}:{businessUnitId}
 * - Value: { employeeId, businessUnitId, percentage, month, year }
 * 
 * USERS:
 * - Key: user:{id}
 * - Value: { id, email, name, role, status, createdAt, lastLogin }
 * 
 * PERMISSIONS:
 * - Key: permission:{userId}:{resource}
 * - Value: { userId, resource, canView, canCreate, canEdit, canDelete }
 */

// Type definitions for TypeScript
export interface BusinessUnit {
  id: string;
  name: string;
  manager: string;
  region: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface KPIMaster {
  id: string;
  name: string;
  category: "revenue" | "cost" | "efficiency" | "quality" | "customer";
  businessUnitId: string;
  businessUnit: string;
  targetValue: number;
  actualValue: number;
  unit: string;
  responsiblePersonId: string;
  responsiblePerson: string;
  month: string;
  year: string;
  linkedRevenue?: number;
  linkedCost?: number;
}

export interface RevenueSource {
  id: string;
  businessUnitId: string;
  name: string;
  unit: string;
  unitPrice: number;
  quantity: number;
  growthRate: number;
  churnRate: number;
  cumulative: boolean;
  month: string;
  year: string;
}

export interface VariableCost {
  id: string;
  businessUnitId: string;
  type: string;
  description: string;
  amount: number;
  month: string;
  year: string;
}

export interface FixedCost {
  id: string;
  name: string;
  category: string;
  amount: number;
  month: string;
  year: string;
}

export interface FixedCostAllocation {
  fixedCostId: string;
  businessUnitId: string;
  allocationType: "percentage" | "fixed";
  value: number;
  month: string;
  year: string;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  businessUnitId: string;
  salary: number;
  startDate: string;
  status: "active" | "inactive";
}

export interface EmployeeAllocation {
  employeeId: string;
  businessUnitId: string;
  percentage: number;
  month: string;
  year: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager" | "viewer";
  status: "active" | "inactive";
  createdAt: string;
  lastLogin?: string;
}

export interface Permission {
  userId: string;
  resource: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}
