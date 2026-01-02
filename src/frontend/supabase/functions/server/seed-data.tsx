/**
 * Demo Data Seeder
 * =================
 * This file contains all demo data for the Business Unit Management Dashboard
 */

export async function seedDatabase(kv: any) {
  console.log("Starting database seeding...");

  // ============================================
  // BUSINESS UNITS
  // ============================================
  const businessUnits = [
    {
      id: "bu-001",
      name: "Đơn vị Bán lẻ Miền Bắc",
      manager: "Trần Văn A",
      region: "Miền Bắc",
      status: "active",
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "bu-002",
      name: "Đơn vị Bán lẻ Miền Nam",
      manager: "Nguyễn Thị B",
      region: "Miền Nam",
      status: "active",
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "bu-003",
      name: "Đơn vị Sản xuất",
      manager: "Lê Văn C",
      region: "Miền Trung",
      status: "active",
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "bu-004",
      name: "Đơn vị Logistics",
      manager: "Phạm Thị D",
      region: "Toàn quốc",
      status: "active",
      createdAt: "2024-01-01T00:00:00Z",
    },
  ];

  for (const bu of businessUnits) {
    await kv.set(`bu:${bu.id}`, bu);
  }
  console.log(`✓ Created ${businessUnits.length} business units`);

  // ============================================
  // EMPLOYEES
  // ============================================
  const employees = [
    {
      id: "emp-001",
      name: "Trần Văn A",
      position: "Giám đốc Bán lẻ",
      department: "Bán lẻ",
      businessUnitId: "bu-001",
      salary: 50000000,
      startDate: "2020-01-01",
      status: "active",
    },
    {
      id: "emp-002",
      name: "Nguyễn Thị B",
      position: "Giám đốc Bán lẻ Miền Nam",
      department: "Bán lẻ",
      businessUnitId: "bu-002",
      salary: 48000000,
      startDate: "2020-03-01",
      status: "active",
    },
    {
      id: "emp-003",
      name: "Lê Văn C",
      position: "Giám đốc Sản xuất",
      department: "Sản xuất",
      businessUnitId: "bu-003",
      salary: 55000000,
      startDate: "2019-06-01",
      status: "active",
    },
    {
      id: "emp-004",
      name: "Phạm Thị D",
      position: "Giám đốc Logistics",
      department: "Logistics",
      businessUnitId: "bu-004",
      salary: 45000000,
      startDate: "2021-01-01",
      status: "active",
    },
    {
      id: "emp-005",
      name: "Hoàng Văn E",
      position: "Trưởng phòng Marketing",
      department: "Marketing",
      businessUnitId: "bu-001",
      salary: 35000000,
      startDate: "2021-06-01",
      status: "active",
    },
    {
      id: "emp-006",
      name: "Võ Thị F",
      position: "Trưởng phòng Kế toán",
      department: "Tài chính",
      businessUnitId: "bu-001",
      salary: 32000000,
      startDate: "2020-09-01",
      status: "active",
    },
    {
      id: "emp-007",
      name: "Đặng Văn G",
      position: "Nhân viên Bán hàng",
      department: "Bán lẻ",
      businessUnitId: "bu-001",
      salary: 15000000,
      startDate: "2022-01-01",
      status: "active",
    },
    {
      id: "emp-008",
      name: "Bùi Thị H",
      position: "Nhân viên Bán hàng",
      department: "Bán lẻ",
      businessUnitId: "bu-002",
      salary: 14000000,
      startDate: "2022-03-01",
      status: "active",
    },
  ];

  for (const emp of employees) {
    await kv.set(`employee:${emp.id}`, emp);
  }
  console.log(`✓ Created ${employees.length} employees`);

  // ============================================
  // KPI MASTER
  // ============================================
  const kpis = [
    {
      id: "kpi-001",
      name: "Doanh thu tháng",
      category: "revenue",
      businessUnitId: "bu-001",
      businessUnit: "Đơn vị Bán lẻ Miền Bắc",
      targetValue: 5000000000,
      actualValue: 5200000000,
      unit: "VND",
      responsiblePersonId: "emp-001",
      responsiblePerson: "Trần Văn A",
      achievementRate: 104,
      month: "11",
      year: "2025",
      status: "achieved",
      linkedRevenue: 5200000000,
    },
    {
      id: "kpi-002",
      name: "Doanh thu tháng",
      category: "revenue",
      businessUnitId: "bu-002",
      businessUnit: "Đơn vị Bán lẻ Miền Nam",
      targetValue: 4500000000,
      actualValue: 4300000000,
      unit: "VND",
      responsiblePersonId: "emp-002",
      responsiblePerson: "Nguyễn Thị B",
      achievementRate: 95.6,
      month: "11",
      year: "2025",
      status: "at-risk",
      linkedRevenue: 4300000000,
    },
    {
      id: "kpi-003",
      name: "Kiểm soát chi phí",
      category: "cost",
      businessUnitId: "bu-001",
      businessUnit: "Đơn vị Bán lẻ Miền Bắc",
      targetValue: 2000000000,
      actualValue: 2178000000,
      unit: "VND",
      responsiblePersonId: "emp-003",
      responsiblePerson: "Lê Văn C",
      achievementRate: 91.8,
      month: "11",
      year: "2025",
      status: "at-risk",
      linkedCost: 2178000000,
    },
    {
      id: "kpi-004",
      name: "Số khách hàng mới",
      category: "customer",
      businessUnitId: "bu-001",
      businessUnit: "Đơn vị Bán lẻ Miền Bắc",
      targetValue: 500,
      actualValue: 480,
      unit: "Khách",
      responsiblePersonId: "emp-002",
      responsiblePerson: "Nguyễn Thị B",
      achievementRate: 96,
      month: "11",
      year: "2025",
      status: "on-track",
    },
    {
      id: "kpi-005",
      name: "Hiệu suất nhân viên",
      category: "efficiency",
      businessUnitId: "bu-002",
      businessUnit: "Đơn vị Bán lẻ Miền Nam",
      targetValue: 75,
      actualValue: 82,
      unit: "%",
      responsiblePersonId: "emp-005",
      responsiblePerson: "Hoàng Văn E",
      achievementRate: 109.3,
      month: "11",
      year: "2025",
      status: "achieved",
    },
    {
      id: "kpi-006",
      name: "Chỉ số hài lòng KH",
      category: "quality",
      businessUnitId: "bu-003",
      businessUnit: "Đơn vị Sản xuất",
      targetValue: 90,
      actualValue: 92,
      unit: "Điểm",
      responsiblePersonId: "emp-004",
      responsiblePerson: "Phạm Thị D",
      achievementRate: 102.2,
      month: "11",
      year: "2025",
      status: "achieved",
    },
  ];

  for (const kpi of kpis) {
    await kv.set(`kpi:${kpi.id}`, kpi);
  }
  console.log(`✓ Created ${kpis.length} KPIs`);

  // ============================================
  // REVENUE SOURCES
  // ============================================
  const revenueSources = [
    {
      id: "rev-001",
      businessUnitId: "bu-001",
      name: "Bán hàng trực tiếp",
      unit: "Đơn hàng",
      unitPrice: 2500000,
      quantity: 1500,
      growthRate: 12,
      churnRate: 3,
      cumulative: true,
      month: "11",
      year: "2025",
    },
    {
      id: "rev-002",
      businessUnitId: "bu-001",
      name: "Bán hàng online",
      unit: "Đơn hàng",
      unitPrice: 1800000,
      quantity: 1000,
      growthRate: 25,
      churnRate: 5,
      cumulative: true,
      month: "11",
      year: "2025",
    },
    {
      id: "rev-003",
      businessUnitId: "bu-002",
      name: "Bán hàng trực tiếp",
      unit: "Đơn hàng",
      unitPrice: 2200000,
      quantity: 1400,
      growthRate: 8,
      churnRate: 4,
      cumulative: true,
      month: "11",
      year: "2025",
    },
    {
      id: "rev-004",
      businessUnitId: "bu-002",
      name: "Dịch vụ tư vấn",
      unit: "Hợp đồng",
      unitPrice: 5000000,
      quantity: 200,
      growthRate: 15,
      churnRate: 2,
      cumulative: false,
      month: "11",
      year: "2025",
    },
    {
      id: "rev-005",
      businessUnitId: "bu-003",
      name: "Sản xuất theo đơn",
      unit: "Đơn hàng",
      unitPrice: 10000000,
      quantity: 150,
      growthRate: 10,
      churnRate: 1,
      cumulative: true,
      month: "11",
      year: "2025",
    },
  ];

  for (const source of revenueSources) {
    await kv.set(`revenue:${source.businessUnitId}:${source.id}`, source);
  }
  console.log(`✓ Created ${revenueSources.length} revenue sources`);

  // ============================================
  // VARIABLE COSTS
  // ============================================
  const variableCosts = [
    {
      id: "vc-001",
      businessUnitId: "bu-001",
      type: "Chi phí nguyên vật liệu",
      description: "Nguyên vật liệu đầu vào cho sản xuất",
      amount: 800000000,
      month: "11",
      year: "2025",
    },
    {
      id: "vc-002",
      businessUnitId: "bu-001",
      type: "Chi phí vận chuyển",
      description: "Vận chuyển hàng hóa đến khách hàng",
      amount: 150000000,
      month: "11",
      year: "2025",
    },
    {
      id: "vc-003",
      businessUnitId: "bu-001",
      type: "Chi phí marketing",
      description: "Quảng cáo và khuyến mãi",
      amount: 200000000,
      month: "11",
      year: "2025",
    },
    {
      id: "vc-004",
      businessUnitId: "bu-002",
      type: "Chi phí nguyên vật liệu",
      description: "Nguyên vật liệu cho đơn vị miền nam",
      amount: 650000000,
      month: "11",
      year: "2025",
    },
    {
      id: "vc-005",
      businessUnitId: "bu-002",
      type: "Chi phí hoa hồng",
      description: "Hoa hồng bán hàng",
      amount: 120000000,
      month: "11",
      year: "2025",
    },
    {
      id: "vc-006",
      businessUnitId: "bu-003",
      type: "Chi phí nguyên liệu sản xuất",
      description: "Nguyên liệu chính cho sản xuất",
      amount: 900000000,
      month: "11",
      year: "2025",
    },
  ];

  for (const cost of variableCosts) {
    await kv.set(`variable_cost:${cost.businessUnitId}:${cost.id}`, cost);
  }
  console.log(`✓ Created ${variableCosts.length} variable costs`);

  // ============================================
  // FIXED COSTS
  // ============================================
  const fixedCosts = [
    {
      id: "fc-001",
      name: "Tiền thuê văn phòng",
      category: "Cơ sở vật chất",
      amount: 150000000,
      month: "11",
      year: "2025",
    },
    {
      id: "fc-002",
      name: "Tiền điện nước",
      category: "Tiện ích",
      amount: 50000000,
      month: "11",
      year: "2025",
    },
    {
      id: "fc-003",
      name: "Bảo hiểm",
      category: "Bảo hiểm",
      amount: 80000000,
      month: "11",
      year: "2025",
    },
    {
      id: "fc-004",
      name: "Khấu hao thiết bị",
      category: "Khấu hao",
      amount: 120000000,
      month: "11",
      year: "2025",
    },
    {
      id: "fc-005",
      name: "Chi phí IT",
      category: "Công nghệ",
      amount: 60000000,
      month: "11",
      year: "2025",
    },
  ];

  for (const cost of fixedCosts) {
    await kv.set(`fixed_cost:${cost.id}`, cost);
  }
  console.log(`✓ Created ${fixedCosts.length} fixed costs`);

  // ============================================
  // FIXED COST ALLOCATIONS
  // ============================================
  const fixedCostAllocations = [
    // Tiền thuê văn phòng - phân bổ theo %
    {
      fixedCostId: "fc-001",
      businessUnitId: "bu-001",
      allocationType: "percentage",
      value: 40,
      month: "11",
      year: "2025",
    },
    {
      fixedCostId: "fc-001",
      businessUnitId: "bu-002",
      allocationType: "percentage",
      value: 35,
      month: "11",
      year: "2025",
    },
    {
      fixedCostId: "fc-001",
      businessUnitId: "bu-003",
      allocationType: "percentage",
      value: 25,
      month: "11",
      year: "2025",
    },
    // Tiền điện nước - phân bổ theo %
    {
      fixedCostId: "fc-002",
      businessUnitId: "bu-001",
      allocationType: "percentage",
      value: 30,
      month: "11",
      year: "2025",
    },
    {
      fixedCostId: "fc-002",
      businessUnitId: "bu-002",
      allocationType: "percentage",
      value: 30,
      month: "11",
      year: "2025",
    },
    {
      fixedCostId: "fc-002",
      businessUnitId: "bu-003",
      allocationType: "percentage",
      value: 40,
      month: "11",
      year: "2025",
    },
    // Bảo hiểm - phân bổ cố định
    {
      fixedCostId: "fc-003",
      businessUnitId: "bu-001",
      allocationType: "fixed",
      value: 30000000,
      month: "11",
      year: "2025",
    },
    {
      fixedCostId: "fc-003",
      businessUnitId: "bu-002",
      allocationType: "fixed",
      value: 25000000,
      month: "11",
      year: "2025",
    },
    {
      fixedCostId: "fc-003",
      businessUnitId: "bu-003",
      allocationType: "fixed",
      value: 25000000,
      month: "11",
      year: "2025",
    },
  ];

  for (const alloc of fixedCostAllocations) {
    const key = `fixed_cost_allocation:${alloc.fixedCostId}:${alloc.businessUnitId}`;
    await kv.set(key, alloc);
  }
  console.log(`✓ Created ${fixedCostAllocations.length} fixed cost allocations`);

  // ============================================
  // EMPLOYEE ALLOCATIONS
  // ============================================
  const employeeAllocations = [
    {
      employeeId: "emp-005",
      businessUnitId: "bu-001",
      percentage: 60,
      month: "11",
      year: "2025",
    },
    {
      employeeId: "emp-005",
      businessUnitId: "bu-002",
      percentage: 40,
      month: "11",
      year: "2025",
    },
  ];

  for (const alloc of employeeAllocations) {
    const key = `employee_allocation:${alloc.employeeId}:${alloc.businessUnitId}`;
    await kv.set(key, alloc);
  }
  console.log(`✓ Created ${employeeAllocations.length} employee allocations`);

  // ============================================
  // USERS
  // ============================================
  const users = [
    {
      id: "user-001",
      email: "admin@company.com",
      name: "Admin User",
      role: "admin",
      status: "active",
      createdAt: "2024-01-01T00:00:00Z",
      lastLogin: "2025-11-10T08:00:00Z",
    },
    {
      id: "user-002",
      email: "manager1@company.com",
      name: "Trần Văn A",
      role: "manager",
      status: "active",
      createdAt: "2024-01-01T00:00:00Z",
      lastLogin: "2025-11-09T15:30:00Z",
    },
    {
      id: "user-003",
      email: "manager2@company.com",
      name: "Nguyễn Thị B",
      role: "manager",
      status: "active",
      createdAt: "2024-01-01T00:00:00Z",
      lastLogin: "2025-11-09T14:20:00Z",
    },
    {
      id: "user-004",
      email: "viewer@company.com",
      name: "Viewer User",
      role: "viewer",
      status: "active",
      createdAt: "2024-02-01T00:00:00Z",
      lastLogin: "2025-11-08T10:00:00Z",
    },
  ];

  for (const user of users) {
    await kv.set(`user:${user.id}`, user);
  }
  console.log(`✓ Created ${users.length} users`);

  // ============================================
  // PERMISSIONS
  // ============================================
  const permissions = [
    // Admin - full access
    { userId: "user-001", resource: "dashboard", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { userId: "user-001", resource: "business-units", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { userId: "user-001", resource: "kpis", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { userId: "user-001", resource: "employees", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { userId: "user-001", resource: "costs", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { userId: "user-001", resource: "reports", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { userId: "user-001", resource: "users", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { userId: "user-001", resource: "permissions", canView: true, canCreate: true, canEdit: true, canDelete: true },

    // Manager 1 - can view and edit most things
    { userId: "user-002", resource: "dashboard", canView: true, canCreate: false, canEdit: false, canDelete: false },
    { userId: "user-002", resource: "business-units", canView: true, canCreate: true, canEdit: true, canDelete: false },
    { userId: "user-002", resource: "kpis", canView: true, canCreate: true, canEdit: true, canDelete: false },
    { userId: "user-002", resource: "employees", canView: true, canCreate: true, canEdit: true, canDelete: false },
    { userId: "user-002", resource: "costs", canView: true, canCreate: true, canEdit: true, canDelete: false },
    { userId: "user-002", resource: "reports", canView: true, canCreate: true, canEdit: false, canDelete: false },
    { userId: "user-002", resource: "users", canView: true, canCreate: false, canEdit: false, canDelete: false },
    { userId: "user-002", resource: "permissions", canView: false, canCreate: false, canEdit: false, canDelete: false },

    // Viewer - read only
    { userId: "user-004", resource: "dashboard", canView: true, canCreate: false, canEdit: false, canDelete: false },
    { userId: "user-004", resource: "business-units", canView: true, canCreate: false, canEdit: false, canDelete: false },
    { userId: "user-004", resource: "kpis", canView: true, canCreate: false, canEdit: false, canDelete: false },
    { userId: "user-004", resource: "employees", canView: true, canCreate: false, canEdit: false, canDelete: false },
    { userId: "user-004", resource: "costs", canView: true, canCreate: false, canEdit: false, canDelete: false },
    { userId: "user-004", resource: "reports", canView: true, canCreate: false, canEdit: false, canDelete: false },
    { userId: "user-004", resource: "users", canView: false, canCreate: false, canEdit: false, canDelete: false },
    { userId: "user-004", resource: "permissions", canView: false, canCreate: false, canEdit: false, canDelete: false },
  ];

  for (const perm of permissions) {
    const key = `permission:${perm.userId}:${perm.resource}`;
    await kv.set(key, perm);
  }
  console.log(`✓ Created ${permissions.length} permissions`);

  console.log("✅ Database seeding completed successfully!");
}
