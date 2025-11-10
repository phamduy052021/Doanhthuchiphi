import { Hono } from "npm:hono@4";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_helper.tsx";
import { QueryBuilder, validate } from "./query-helpers.tsx";
import { ValidationRules, DefaultValues } from "./database-schema.tsx";
import * as DemoData from "./demo-data.tsx";

const app = new Hono();

// Middleware
app.use("*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}));
app.use("*", logger(console.log));

// ============================================
// HEALTH CHECK
// ============================================

app.get("/make-server-80868a71/health", (c) => {
  return c.json({ 
    success: true,
    status: "ok", 
    timestamp: new Date().toISOString(),
    message: "BU Management System API v1.0"
  });
});

// ============================================
// DATABASE MANAGEMENT
// ============================================

app.post("/make-server-80868a71/init-demo-data", async (c) => {
  try {
    console.log("🚀 Starting demo data initialization...");
    
    // Check if data already exists
    const existingBUs = await kv.getByPrefixFixed("bu:");
    if (existingBUs.length > 0) {
      console.log("⚠️ Data already exists. Clearing first...");
      
      // Auto-clear existing data
      const prefixes = [
        "bu:",
        "kpi:",
        "kpi_category:",
        "revenue:",
        "variable_cost:",
        "fixed_cost:",
        "employee:",
        "user:",
        "role:",
        "permission:",
      ];

      let cleared = 0;
      for (const prefix of prefixes) {
        const items = await kv.getByPrefixFixed(prefix);
        for (const item of items) {
          await kv.del(item.key);
          cleared++;
        }
      }
      console.log(`✅ Cleared ${cleared} existing records`);
    }

    let totalCreated = 0;

    // 1. Seed Permissions
    console.log("📝 Creating permissions...");
    for (const perm of DemoData.permissions) {
      await kv.set(`permission:${perm.id}`, perm);
      totalCreated++;
    }

    // 2. Seed Roles
    console.log("👥 Creating roles...");
    for (const role of DemoData.roles) {
      await kv.set(`role:${role.id}`, role);
      totalCreated++;
    }

    // 3. Seed Business Units
    console.log("🏢 Creating business units...");
    for (const bu of DemoData.businessUnits) {
      await kv.set(`bu:${bu.id}`, bu);
      totalCreated++;
    }

    // 4. Seed KPI Categories
    console.log("📊 Creating KPI categories...");
    for (const cat of DemoData.kpiCategories) {
      await kv.set(`kpi_category:${cat.id}`, cat);
      totalCreated++;
    }

    // 5. Seed KPIs
    console.log("🎯 Creating KPIs...");
    for (const kpi of DemoData.kpis) {
      await kv.set(`kpi:${kpi.id}`, kpi);
      totalCreated++;
    }

    // 6. Seed Revenue Sources
    console.log("💰 Creating revenue sources...");
    for (const rev of DemoData.revenueSources) {
      await kv.set(`revenue:${rev.businessUnitId}:${rev.id}`, rev);
      totalCreated++;
    }

    // 7. Seed Variable Costs
    console.log("💸 Creating variable costs...");
    for (const cost of DemoData.variableCosts) {
      await kv.set(`variable_cost:${cost.businessUnitId}:${cost.id}`, cost);
      totalCreated++;
    }

    // 8. Seed Fixed Costs
    console.log("📌 Creating fixed costs...");
    for (const cost of DemoData.fixedCosts) {
      const key = cost.businessUnitId 
        ? `fixed_cost:${cost.businessUnitId}:${cost.id}`
        : `fixed_cost:${cost.id}`;
      await kv.set(key, cost);
      totalCreated++;
    }

    // 9. Seed Employees
    console.log("👨‍💼 Creating employees...");
    for (const emp of DemoData.employees) {
      await kv.set(`employee:${emp.id}`, emp);
      totalCreated++;
    }

    // 10. Seed Users
    console.log("🔐 Creating users...");
    for (const user of DemoData.users) {
      await kv.set(`user:${user.id}`, user);
      totalCreated++;
    }

    console.log(`✅ Demo data initialized successfully! Created ${totalCreated} records`);

    return c.json({
      success: true,
      message: `Demo data initialized successfully with ${totalCreated} records`,
      stats: {
        permissions: DemoData.permissions.length,
        roles: DemoData.roles.length,
        businessUnits: DemoData.businessUnits.length,
        kpiCategories: DemoData.kpiCategories.length,
        kpis: DemoData.kpis.length,
        revenueSources: DemoData.revenueSources.length,
        variableCosts: DemoData.variableCosts.length,
        fixedCosts: DemoData.fixedCosts.length,
        employees: DemoData.employees.length,
        users: DemoData.users.length,
        total: totalCreated,
      },
    });
  } catch (error) {
    console.error("❌ Error initializing demo data:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete("/make-server-80868a71/clear-all-data", async (c) => {
  try {
    console.log("🗑️ Clearing all data...");
    const prefixes = [
      "bu:",
      "kpi:",
      "kpi_category:",
      "revenue:",
      "variable_cost:",
      "fixed_cost:",
      "employee:",
      "user:",
      "role:",
      "permission:",
    ];

    let totalDeleted = 0;
    for (const prefix of prefixes) {
      const items = await kv.getByPrefixFixed(prefix);
      for (const item of items) {
        await kv.del(item.key);
        totalDeleted++;
      }
    }

    console.log(`✅ Deleted ${totalDeleted} items`);
    return c.json({
      success: true,
      message: `All data cleared successfully (${totalDeleted} items)`,
    });
  } catch (error) {
    console.error("❌ Error clearing data:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.get("/make-server-80868a71/database-stats", async (c) => {
  try {
    const stats = {
      businessUnits: (await kv.getByPrefixFixed("bu:")).length,
      kpis: (await kv.getByPrefixFixed("kpi:")).filter(i => !i.key.includes("category")).length,
      kpiCategories: (await kv.getByPrefixFixed("kpi_category:")).length,
      revenueSources: (await kv.getByPrefixFixed("revenue:")).length,
      variableCosts: (await kv.getByPrefixFixed("variable_cost:")).length,
      fixedCosts: (await kv.getByPrefixFixed("fixed_cost:")).length,
      employees: (await kv.getByPrefixFixed("employee:")).length,
      users: (await kv.getByPrefixFixed("user:")).length,
      roles: (await kv.getByPrefixFixed("role:")).length,
      permissions: (await kv.getByPrefixFixed("permission:")).length,
    };
    
    const total = Object.values(stats).reduce((a, b) => a + b, 0);
    
    return c.json({
      success: true,
      data: { ...stats, total },
    });
  } catch (error) {
    console.error("Error fetching database stats:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============================================
// BUSINESS UNITS
// ============================================

app.get("/make-server-80868a71/business-units", async (c) => {
  try {
    const result = await kv.getByPrefixFixed("bu:");
    const businessUnits = result.map((item) => item.value);
    return c.json({ success: true, data: businessUnits });
  } catch (error) {
    console.error("Error fetching business units:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.get("/make-server-80868a71/business-units/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const result = await kv.get(`bu:${id}`);
    if (!result) {
      return c.json({ success: false, error: "Business unit not found" }, 404);
    }
    return c.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching business unit:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-80868a71/business-units", async (c) => {
  try {
    const body = await c.req.json();
    
    // Validate
    const validation = validate(body, ValidationRules.businessUnit);
    if (!validation.valid) {
      return c.json({ 
        success: false, 
        error: "Validation failed", 
        errors: validation.errors 
      }, 400);
    }

    const id = `bu-${Date.now()}`;
    const businessUnit = {
      id,
      ...body,
      ...DefaultValues.timestamps(),
    };
    
    await kv.set(`bu:${id}`, businessUnit);
    return c.json({ success: true, data: businessUnit });
  } catch (error) {
    console.error("Error creating business unit:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put("/make-server-80868a71/business-units/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const existing = await kv.get(`bu:${id}`);
    
    if (!existing) {
      return c.json({ success: false, error: "Business unit not found" }, 404);
    }
    
    const updated = { 
      ...existing, 
      ...body, 
      updatedAt: new Date().toISOString() 
    };
    await kv.set(`bu:${id}`, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating business unit:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete("/make-server-80868a71/business-units/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`bu:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting business unit:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============================================
// KPI CATEGORIES
// ============================================

app.get("/make-server-80868a71/kpi-categories", async (c) => {
  try {
    const result = await kv.getByPrefixFixed("kpi_category:");
    const categories = result.map((item) => item.value);
    return c.json({ success: true, data: categories });
  } catch (error) {
    console.error("Error fetching KPI categories:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============================================
// KPIs
// ============================================

app.get("/make-server-80868a71/kpis", async (c) => {
  try {
    const buId = c.req.query("businessUnitId");
    const period = c.req.query("period");
    const categoryId = c.req.query("categoryId");
    
    const result = await kv.getByPrefixFixed("kpi:");
    let kpis = result.map((item) => item.value);
    
    // Apply filters
    if (buId) {
      kpis = kpis.filter((kpi: any) => kpi.businessUnitId === buId);
    }
    if (period) {
      kpis = kpis.filter((kpi: any) => kpi.period === period);
    }
    if (categoryId) {
      kpis = kpis.filter((kpi: any) => kpi.categoryId === categoryId);
    }
    
    return c.json({ success: true, data: kpis });
  } catch (error) {
    console.error("Error fetching KPIs:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.get("/make-server-80868a71/kpis/business-unit/:buId", async (c) => {
  try {
    const buId = c.req.param("buId");
    const result = await kv.getByPrefixFixed("kpi:");
    const kpis = result
      .map((item) => item.value)
      .filter((kpi: any) => kpi.businessUnitId === buId);
    return c.json({ success: true, data: kpis });
  } catch (error) {
    console.error("Error fetching KPIs by business unit:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-80868a71/kpis", async (c) => {
  try {
    const body = await c.req.json();
    
    // Validate
    const validation = validate(body, ValidationRules.kpi);
    if (!validation.valid) {
      return c.json({ 
        success: false, 
        error: "Validation failed", 
        errors: validation.errors 
      }, 400);
    }

    const id = `kpi-${Date.now()}`;
    const achievementRate = (body.actualValue / body.targetValue) * 100;
    const status =
      achievementRate >= 100
        ? "achieved"
        : achievementRate >= 95
        ? "on-track"
        : "at-risk";
        
    const kpi = {
      id,
      ...body,
      achievementRate: Math.round(achievementRate * 10) / 10,
      status,
      ...DefaultValues.timestamps(),
    };
    
    await kv.set(`kpi:${id}`, kpi);
    return c.json({ success: true, data: kpi });
  } catch (error) {
    console.error("Error creating KPI:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put("/make-server-80868a71/kpis/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const existing = await kv.get(`kpi:${id}`);
    
    if (!existing) {
      return c.json({ success: false, error: "KPI not found" }, 404);
    }
    
    const achievementRate = (body.actualValue / body.targetValue) * 100;
    const status =
      achievementRate >= 100
        ? "achieved"
        : achievementRate >= 95
        ? "on-track"
        : "at-risk";
        
    const updated = {
      ...existing,
      ...body,
      achievementRate: Math.round(achievementRate * 10) / 10,
      status,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`kpi:${id}`, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating KPI:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete("/make-server-80868a71/kpis/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`kpi:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting KPI:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============================================
// REVENUE SOURCES
// ============================================

app.get("/make-server-80868a71/revenue-sources/:buId", async (c) => {
  try {
    const buId = c.req.param("buId");
    const result = await kv.getByPrefixFixed(`revenue:${buId}:`);
    const sources = result.map((item) => item.value);
    return c.json({ success: true, data: sources });
  } catch (error) {
    console.error("Error fetching revenue sources:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-80868a71/revenue-sources", async (c) => {
  try {
    const body = await c.req.json();
    const id = `rev-${Date.now()}`;
    const revenue = {
      id,
      ...body,
      ...DefaultValues.timestamps(),
    };
    
    await kv.set(`revenue:${body.businessUnitId}:${id}`, revenue);
    return c.json({ success: true, data: revenue });
  } catch (error) {
    console.error("Error creating revenue source:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============================================
// VARIABLE COSTS
// ============================================

app.get("/make-server-80868a71/variable-costs/:buId", async (c) => {
  try {
    const buId = c.req.param("buId");
    const result = await kv.getByPrefixFixed(`variable_cost:${buId}:`);
    const costs = result.map((item) => item.value);
    return c.json({ success: true, data: costs });
  } catch (error) {
    console.error("Error fetching variable costs:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-80868a71/variable-costs", async (c) => {
  try {
    const body = await c.req.json();
    const id = `vcost-${Date.now()}`;
    const cost = {
      id,
      ...body,
      ...DefaultValues.timestamps(),
    };
    
    await kv.set(`variable_cost:${body.businessUnitId}:${id}`, cost);
    return c.json({ success: true, data: cost });
  } catch (error) {
    console.error("Error creating variable cost:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============================================
// FIXED COSTS
// ============================================

app.get("/make-server-80868a71/fixed-costs", async (c) => {
  try {
    const buId = c.req.query("businessUnitId");
    const result = await kv.getByPrefixFixed("fixed_cost:");
    let costs = result.map((item) => item.value);
    
    if (buId === "null" || buId === "corporate") {
      // Get only corporate level costs
      costs = costs.filter((cost: any) => !cost.businessUnitId);
    } else if (buId) {
      // Get costs for specific BU
      costs = costs.filter((cost: any) => cost.businessUnitId === buId);
    }
    
    return c.json({ success: true, data: costs });
  } catch (error) {
    console.error("Error fetching fixed costs:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-80868a71/fixed-costs", async (c) => {
  try {
    const body = await c.req.json();
    const id = `fcost-${Date.now()}`;
    const cost = {
      id,
      ...body,
      ...DefaultValues.timestamps(),
    };
    
    const key = body.businessUnitId 
      ? `fixed_cost:${body.businessUnitId}:${id}`
      : `fixed_cost:${id}`;
    
    await kv.set(key, cost);
    return c.json({ success: true, data: cost });
  } catch (error) {
    console.error("Error creating fixed cost:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put("/make-server-80868a71/fixed-costs/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    // Find the cost first
    const allCosts = await kv.getByPrefixFixed("fixed_cost:");
    const existing = allCosts.find((item: any) => item.value.id === id);
    
    if (!existing) {
      return c.json({ success: false, error: "Fixed cost not found" }, 404);
    }
    
    const updated = {
      ...existing.value,
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(existing.key, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating fixed cost:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete("/make-server-80868a71/fixed-costs/:id", async (c) => {
  try {
    const id = c.req.param("id");
    
    // Find the cost first
    const allCosts = await kv.getByPrefixFixed("fixed_cost:");
    const existing = allCosts.find((item: any) => item.value.id === id);
    
    if (!existing) {
      return c.json({ success: false, error: "Fixed cost not found" }, 404);
    }
    
    await kv.del(existing.key);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting fixed cost:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============================================
// EMPLOYEES
// ============================================

app.get("/make-server-80868a71/employees", async (c) => {
  try {
    const buId = c.req.query("businessUnitId");
    const result = await kv.getByPrefixFixed("employee:");
    let employees = result.map((item) => item.value);
    
    if (buId === "null" || buId === "corporate") {
      employees = employees.filter((emp: any) => !emp.businessUnitId);
    } else if (buId) {
      employees = employees.filter((emp: any) => emp.businessUnitId === buId);
    }
    
    return c.json({ success: true, data: employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-80868a71/employees", async (c) => {
  try {
    const body = await c.req.json();
    
    // Validate
    const validation = validate(body, ValidationRules.employee);
    if (!validation.valid) {
      return c.json({ 
        success: false, 
        error: "Validation failed", 
        errors: validation.errors 
      }, 400);
    }

    const id = `emp-${Date.now()}`;
    const employee = {
      id,
      ...body,
      status: body.status || "active",
      ...DefaultValues.timestamps(),
    };
    
    await kv.set(`employee:${id}`, employee);
    return c.json({ success: true, data: employee });
  } catch (error) {
    console.error("Error creating employee:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put("/make-server-80868a71/employees/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const existing = await kv.get(`employee:${id}`);
    
    if (!existing) {
      return c.json({ success: false, error: "Employee not found" }, 404);
    }
    
    const updated = {
      ...existing,
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`employee:${id}`, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating employee:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete("/make-server-80868a71/employees/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`employee:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============================================
// USERS
// ============================================

app.get("/make-server-80868a71/users", async (c) => {
  try {
    const result = await kv.getByPrefixFixed("user:");
    const users = result.map((item) => item.value);
    return c.json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-80868a71/users", async (c) => {
  try {
    const body = await c.req.json();
    
    // Validate
    const validation = validate(body, ValidationRules.user);
    if (!validation.valid) {
      return c.json({ 
        success: false, 
        error: "Validation failed", 
        errors: validation.errors 
      }, 400);
    }

    const id = `user-${Date.now()}`;
    const user = {
      id,
      ...body,
      ...DefaultValues.timestamps(),
    };
    
    await kv.set(`user:${id}`, user);
    return c.json({ success: true, data: user });
  } catch (error) {
    console.error("Error creating user:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put("/make-server-80868a71/users/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const existing = await kv.get(`user:${id}`);
    
    if (!existing) {
      return c.json({ success: false, error: "User not found" }, 404);
    }
    
    const updated = {
      ...existing,
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`user:${id}`, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating user:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete("/make-server-80868a71/users/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`user:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============================================
// ROLES
// ============================================

app.get("/make-server-80868a71/roles", async (c) => {
  try {
    const result = await kv.getByPrefixFixed("role:");
    const roles = result.map((item) => item.value);
    return c.json({ success: true, data: roles });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============================================
// PERMISSIONS
// ============================================

app.get("/make-server-80868a71/permissions", async (c) => {
  try {
    const result = await kv.getByPrefixFixed("permission:");
    const permissions = result.map((item) => item.value);
    return c.json({ success: true, data: permissions });
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============================================
// START SERVER
// ============================================

console.log("🚀 BU Management System API Server starting...");
console.log("📊 Endpoints: /health, /business-units, /kpis, /employees, /users, etc.");
Deno.serve(app.fetch);