import { useState } from "react";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { EmployeeAllocationDrawer } from "./EmployeeAllocationDrawer";
import { AddEmployeeModal } from "./AddEmployeeModal";

export interface Employee {
  id: string;
  name: string;
  role: string;
  baseSalary: number;
  totalAllocated: number;
  allocations: EmployeeAllocation[];
}

export interface EmployeeAllocation {
  buId: string;
  buName: string;
  method: "percentage" | "days" | "fixed";
  value: number;
}

export function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "emp-001",
      name: "Trần Văn A",
      role: "Trưởng phòng Bán lẻ",
      baseSalary: 25000000,
      totalAllocated: 25000000,
      allocations: [
        {
          buId: "bu-001",
          buName: "Đơn vị Bán lẻ Miền Bắc",
          method: "percentage",
          value: 60,
        },
        {
          buId: "bu-002",
          buName: "Đơn vị Bán lẻ Miền Nam",
          method: "percentage",
          value: 40,
        },
      ],
    },
    {
      id: "emp-002",
      name: "Nguyễn Thị B",
      role: "Chuyên viên Kinh doanh",
      baseSalary: 18000000,
      totalAllocated: 18000000,
      allocations: [
        {
          buId: "bu-002",
          buName: "Đơn vị Bán lẻ Miền Nam",
          method: "days",
          value: 22,
        },
      ],
    },
    {
      id: "emp-003",
      name: "Lê Văn C",
      role: "Giám đốc Bán sỉ",
      baseSalary: 30000000,
      totalAllocated: 30000000,
      allocations: [
        {
          buId: "bu-003",
          buName: "Đơn vị Bán sỉ",
          method: "fixed",
          value: 30000000,
        },
      ],
    },
    {
      id: "emp-004",
      name: "Phạm Thị D",
      role: "Trưởng phòng Xuất khẩu",
      baseSalary: 22000000,
      totalAllocated: 22000000,
      allocations: [
        {
          buId: "bu-004",
          buName: "Đơn vị Xuất khẩu",
          method: "percentage",
          value: 100,
        },
      ],
    },
    {
      id: "emp-005",
      name: "Hoàng Văn E",
      role: "Chuyên viên Marketing",
      baseSalary: 15000000,
      totalAllocated: 15000000,
      allocations: [
        {
          buId: "bu-001",
          buName: "Đơn vị Bán lẻ Miền Bắc",
          method: "days",
          value: 10,
        },
        {
          buId: "bu-002",
          buName: "Đơn vị Bán lẻ Miền Nam",
          method: "days",
          value: 8,
        },
        {
          buId: "bu-005",
          buName: "Đơn vị Thương mại Điện tử",
          method: "days",
          value: 4,
        },
      ],
    },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const handleViewAllocation = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDrawerOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsAddModalOpen(true);
  };

  const handleDeleteEmployee = (empId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
      setEmployees(employees.filter((emp) => emp.id !== empId));
    }
  };

  const handleAddEmployee = (newEmployee: Omit<Employee, "id">) => {
    const employee: Employee = {
      ...newEmployee,
      id: `emp-${Date.now()}`,
    };
    setEmployees([...employees, employee]);
    setIsAddModalOpen(false);
    setEditingEmployee(null);
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    setIsAddModalOpen(false);
    setEditingEmployee(null);
  };

  const handleSaveAllocations = (
    employeeId: string,
    allocations: EmployeeAllocation[]
  ) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === employeeId
          ? {
              ...emp,
              allocations,
              totalAllocated: emp.baseSalary, // Recalculate if needed
            }
          : emp
      )
    );
    setIsDrawerOpen(false);
  };

  const getRoleColor = (role: string) => {
    if (role.includes("Trưởng") || role.includes("Giám đốc")) {
      return "bg-purple-100 text-purple-700 hover:bg-purple-100";
    } else if (role.includes("Chuyên viên")) {
      return "bg-blue-100 text-blue-700 hover:bg-blue-100";
    }
    return "bg-gray-100 text-gray-700 hover:bg-gray-100";
  };

  const totalEmployeeCost = employees.reduce(
    (sum, emp) => sum + emp.totalAllocated,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Quản lý Nhân viên</h1>
          <p className="text-gray-600">
            Tổng chi phí nhân sự: ₫{(totalEmployeeCost / 1000000).toFixed(1)}M
            / tháng
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingEmployee(null);
            setIsAddModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm Nhân viên
        </Button>
      </div>

      {/* Table */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên Nhân viên</TableHead>
                <TableHead>Chức vụ</TableHead>
                <TableHead className="text-right">Lương Cơ bản</TableHead>
                <TableHead className="text-right">Tổng Phân bổ</TableHead>
                <TableHead className="text-center">Số ĐV</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee, index) => (
                <TableRow
                  key={employee.id}
                  className={index % 2 === 1 ? "bg-gray-50" : ""}
                >
                  <TableCell>
                    <span className="text-gray-900">{employee.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(employee.role)}>
                      {employee.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-gray-900">
                    ₫{(employee.baseSalary / 1000000).toFixed(1)}M
                  </TableCell>
                  <TableCell className="text-right text-gray-900">
                    ₫{(employee.totalAllocated / 1000000).toFixed(1)}M
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      {employee.allocations.length} ĐV
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewAllocation(employee)}
                        className="hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditEmployee(employee)}
                        className="hover:bg-orange-50 hover:text-orange-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Allocation Drawer */}
      <EmployeeAllocationDrawer
        employee={selectedEmployee}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleSaveAllocations}
      />

      {/* Add/Edit Employee Modal */}
      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingEmployee(null);
        }}
        onSave={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
        editData={editingEmployee}
      />
    </div>
  );
}
