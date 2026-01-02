/**
 * API Service Layer
 * =================
 * This file provides all API calls to interact with the backend
 */

import { projectId, publicAnonKey } from "../utils/supabase/info";

// Auto-detect environment
const isDevelopment = window.location.hostname === "localhost" || 
                       window.location.hostname.includes("replit");

// Use local server in development, Supabase Edge Functions in production
const BASE_URL = isDevelopment 
  ? "http://localhost:8000/make-server-80868a71" // Local Deno server
  : `https://${projectId}.supabase.co/functions/v1/make-server-80868a71`; // Production

console.log(`🔧 API Mode: ${isDevelopment ? 'DEVELOPMENT (Local)' : 'PRODUCTION (Supabase)'}`);
console.log(`🌐 API Base URL: ${BASE_URL}`);

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${publicAnonKey}`,
};

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const url = `${BASE_URL}${endpoint}`;
    console.log(`API Call: ${options?.method || 'GET'} ${url}`);
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options?.headers,
      },
    });

    console.log(`API Response Status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error Response:`, errorText);
      try {
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      } catch {
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
    }

    const data = await response.json();
    console.log(`API Response Data:`, data);
    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return { success: false, error: 'Không thể kết nối đến server. Vui lòng kiểm tra lại kết nối mạng hoặc server có thể chưa được khởi động.' };
    }
    return { success: false, error: String(error) };
  }
}

// ============================================
// BUSINESS UNITS API
// ============================================

export const businessUnitsApi = {
  getAll: () => apiCall("/business-units"),
  getById: (id: string) => apiCall(`/business-units/${id}`),
  create: (data: any) =>
    apiCall("/business-units", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiCall(`/business-units/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiCall(`/business-units/${id}`, {
      method: "DELETE",
    }),
};

// ============================================
// KPI MASTER API
// ============================================

export const kpisApi = {
  getAll: () => apiCall("/kpis"),
  getByBusinessUnit: (buId: string) => apiCall(`/kpis/business-unit/${buId}`),
  create: (data: any) =>
    apiCall("/kpis", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiCall(`/kpis/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiCall(`/kpis/${id}`, {
      method: "DELETE",
    }),
};

// ============================================
// REVENUE SOURCES API
// ============================================

export const revenueApi = {
  getByBusinessUnit: (buId: string) => apiCall(`/revenue-sources/${buId}`),
  create: (data: any) =>
    apiCall("/revenue-sources", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (buId: string, id: string, data: any) =>
    apiCall(`/revenue-sources/${buId}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (buId: string, id: string) =>
    apiCall(`/revenue-sources/${buId}/${id}`, {
      method: "DELETE",
    }),
};

// ============================================
// VARIABLE COSTS API
// ============================================

export const variableCostsApi = {
  getByBusinessUnit: (buId: string) => apiCall(`/variable-costs/${buId}`),
  create: (data: any) =>
    apiCall("/variable-costs", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (buId: string, id: string, data: any) =>
    apiCall(`/variable-costs/${buId}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (buId: string, id: string) =>
    apiCall(`/variable-costs/${buId}/${id}`, {
      method: "DELETE",
    }),
};

// ============================================
// FIXED COSTS API
// ============================================

export const fixedCostsApi = {
  getAll: () => apiCall("/fixed-costs"),
  create: (data: any) =>
    apiCall("/fixed-costs", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiCall(`/fixed-costs/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiCall(`/fixed-costs/${id}`, {
      method: "DELETE",
    }),
  getAllocations: (fixedCostId: string) =>
    apiCall(`/fixed-cost-allocations/${fixedCostId}`),
  createAllocation: (data: any) =>
    apiCall("/fixed-cost-allocations", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// ============================================
// EMPLOYEES API
// ============================================

export const employeesApi = {
  getAll: () => apiCall("/employees"),
  create: (data: any) =>
    apiCall("/employees", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiCall(`/employees/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiCall(`/employees/${id}`, {
      method: "DELETE",
    }),
  getAllocations: (employeeId: string) =>
    apiCall(`/employee-allocations/${employeeId}`),
  createAllocation: (data: any) =>
    apiCall("/employee-allocations", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// ============================================
// USERS & PERMISSIONS API
// ============================================

export const usersApi = {
  getAll: () => apiCall("/users"),
  create: (data: any) =>
    apiCall("/users", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiCall(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiCall(`/users/${id}`, {
      method: "DELETE",
    }),
  getPermissions: (userId: string) => apiCall(`/permissions/${userId}`),
  updatePermission: (data: any) =>
    apiCall("/permissions", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// ============================================
// DATABASE MANAGEMENT API
// ============================================

export const databaseApi = {
  initDemoData: () =>
    apiCall("/init-demo-data", {
      method: "POST",
    }),
  clearAllData: () =>
    apiCall("/clear-all-data", {
      method: "DELETE",
    }),
  healthCheck: () => apiCall("/health"),
};

// Export all APIs
export const api = {
  businessUnits: businessUnitsApi,
  kpis: kpisApi,
  revenue: revenueApi,
  variableCosts: variableCostsApi,
  fixedCosts: fixedCostsApi,
  employees: employeesApi,
  users: usersApi,
  database: databaseApi,
};

export default api;