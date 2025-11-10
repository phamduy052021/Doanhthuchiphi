import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import type { Employee, EmployeeAllocation } from "./EmployeesPage";

interface EmployeeAllocationDrawerProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (employeeId: string, allocations: EmployeeAllocation[]) => void;
}

export function EmployeeAllocationDrawer({
  employee,
  isOpen,
  onClose,
  onSave,
}: EmployeeAllocationDrawerProps) {
  const [allocations, setAllocations] = useState<EmployeeAllocation[]>([]);
  const [activeMethod, setActiveMethod] = useState<
    "percentage" | "days" | "fixed"
  >("percentage");

  useEffect(() => {
    if (employee) {
      setAllocations(employee.allocations);
      if (employee.allocations.length > 0) {
        setActiveMethod(employee.allocations[0].method);
      }
    }
  }, [employee]);

  if (!employee) return null;

  const businessUnits = [
    { id: "bu-001", name: "Đơn vị Bán lẻ Miền Bắc" },
    { id: "bu-002", name: "Đơn vị Bán lẻ Miền Nam" },
    { id: "bu-003", name: "Đơn vị Bán sỉ" },
    { id: "bu-004", name: "Đơn vị Xuất khẩu" },
    { id: "bu-005", name: "Đơn vị Thương mại Điện tử" },
  ];

  const percentageAllocations = allocations.filter(
    (a) => a.method === "percentage"
  );
  const daysAllocations = allocations.filter((a) => a.method === "days");
  const fixedAllocations = allocations.filter((a) => a.method === "fixed");

  const handleAddAllocation = (method: "percentage" | "days" | "fixed") => {
    const newAllocation: EmployeeAllocation = {
      buId: businessUnits[0].id,
      buName: businessUnits[0].name,
      method,
      value: method === "percentage" ? 0 : method === "days" ? 0 : 0,
    };
    setAllocations([...allocations, newAllocation]);
  };

  const handleUpdateAllocation = (
    index: number,
    field: keyof EmployeeAllocation,
    value: any
  ) => {
    const updated = [...allocations];
    const allocationIndex = allocations.findIndex((_, i) => i === index);

    if (field === "buId") {
      const bu = businessUnits.find((b) => b.id === value);
      if (bu) {
        updated[allocationIndex] = {
          ...updated[allocationIndex],
          buId: value,
          buName: bu.name,
        };
      }
    } else {
      updated[allocationIndex] = {
        ...updated[allocationIndex],
        [field]: value,
      };
    }

    setAllocations(updated);
  };

  const handleDeleteAllocation = (index: number) => {
    setAllocations(allocations.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(employee.id, allocations);
  };

  const getTotalPercentage = () => {
    return percentageAllocations.reduce((sum, a) => sum + a.value, 0);
  };

  const getTotalDays = () => {
    return daysAllocations.reduce((sum, a) => sum + a.value, 0);
  };

  const getTotalFixed = () => {
    return fixedAllocations.reduce((sum, a) => sum + a.value, 0);
  };

  const renderPercentageTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-700">
            Tổng phân bổ:{" "}
            <span
              className={
                getTotalPercentage() === 100
                  ? "text-green-600"
                  : "text-orange-600"
              }
            >
              {getTotalPercentage()}%
            </span>
          </p>
        </div>
        <Button
          onClick={() => handleAddAllocation("percentage")}
          variant="outline"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm phân bổ
        </Button>
      </div>

      <div className="space-y-3">
        {percentageAllocations.map((allocation, idx) => {
          const actualIndex = allocations.findIndex(
            (a) => a === allocation
          );
          return (
            <Card key={actualIndex} className="rounded-xl border-gray-200">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Đơn vị Kinh doanh</Label>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteAllocation(actualIndex)}
                      className="hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Select
                    value={allocation.buId}
                    onValueChange={(value) =>
                      handleUpdateAllocation(actualIndex, "buId", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {businessUnits.map((bu) => (
                        <SelectItem key={bu.id} value={bu.id}>
                          {bu.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Phần trăm</Label>
                      <span className="text-blue-600">
                        {allocation.value}%
                      </span>
                    </div>
                    <Slider
                      value={[allocation.value]}
                      onValueChange={(value) =>
                        handleUpdateAllocation(actualIndex, "value", value[0])
                      }
                      max={100}
                      step={5}
                    />
                    <div className="text-gray-600">
                      ₫
                      {(
                        (employee.baseSalary * allocation.value) /
                        100 /
                        1000000
                      ).toFixed(2)}
                      M
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderDaysTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-700">
            Tổng số ngày:{" "}
            <span className="text-blue-600">{getTotalDays()} ngày</span>
          </p>
        </div>
        <Button
          onClick={() => handleAddAllocation("days")}
          variant="outline"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm phân bổ
        </Button>
      </div>

      <div className="space-y-3">
        {daysAllocations.map((allocation, idx) => {
          const actualIndex = allocations.findIndex(
            (a) => a === allocation
          );
          return (
            <Card key={actualIndex} className="rounded-xl border-gray-200">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Đơn vị Kinh doanh</Label>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteAllocation(actualIndex)}
                      className="hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Select
                    value={allocation.buId}
                    onValueChange={(value) =>
                      handleUpdateAllocation(actualIndex, "buId", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {businessUnits.map((bu) => (
                        <SelectItem key={bu.id} value={bu.id}>
                          {bu.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="space-y-2">
                    <Label>Số ngày làm việc</Label>
                    <Input
                      type="number"
                      value={allocation.value}
                      onChange={(e) =>
                        handleUpdateAllocation(
                          actualIndex,
                          "value",
                          parseInt(e.target.value) || 0
                        )
                      }
                      min={0}
                      max={22}
                    />
                    <div className="text-gray-600">
                      ₫
                      {(
                        (employee.baseSalary / 22) * allocation.value /
                        1000000
                      ).toFixed(2)}
                      M
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderFixedTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-700">
            Tổng số tiền:{" "}
            <span className="text-blue-600">
              ₫{(getTotalFixed() / 1000000).toFixed(2)}M
            </span>
          </p>
        </div>
        <Button
          onClick={() => handleAddAllocation("fixed")}
          variant="outline"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm phân bổ
        </Button>
      </div>

      <div className="space-y-3">
        {fixedAllocations.map((allocation, idx) => {
          const actualIndex = allocations.findIndex(
            (a) => a === allocation
          );
          return (
            <Card key={actualIndex} className="rounded-xl border-gray-200">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Đơn vị Kinh doanh</Label>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteAllocation(actualIndex)}
                      className="hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Select
                    value={allocation.buId}
                    onValueChange={(value) =>
                      handleUpdateAllocation(actualIndex, "buId", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {businessUnits.map((bu) => (
                        <SelectItem key={bu.id} value={bu.id}>
                          {bu.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="space-y-2">
                    <Label>Số tiền cố định (₫)</Label>
                    <Input
                      type="number"
                      value={allocation.value}
                      onChange={(e) =>
                        handleUpdateAllocation(
                          actualIndex,
                          "value",
                          parseInt(e.target.value) || 0
                        )
                      }
                      min={0}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetTitle className="sr-only">Phân bổ Chi phí Nhân viên</SheetTitle>
        <SheetDescription className="sr-only">
          Quản lý phân bổ chi phí nhân viên cho các đơn vị kinh doanh
        </SheetDescription>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-gray-900 mb-1">Phân bổ Chi phí</h2>
              <p className="text-gray-600">
                {employee.name} - {employee.role}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Employee Info */}
            <Card className="rounded-xl border-gray-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 mb-1">Lương Cơ bản</p>
                    <p className="text-gray-900">
                      ₫{(employee.baseSalary / 1000000).toFixed(1)}M / tháng
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Số Đơn vị</p>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      {employee.allocations.length} ĐV
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Allocation Tabs */}
            <Tabs
              value={activeMethod}
              onValueChange={(v: any) => setActiveMethod(v)}
            >
              <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-xl">
                <TabsTrigger value="percentage" className="rounded-lg">
                  Theo %
                </TabsTrigger>
                <TabsTrigger value="days" className="rounded-lg">
                  Theo Ngày
                </TabsTrigger>
                <TabsTrigger value="fixed" className="rounded-lg">
                  Cố định
                </TabsTrigger>
              </TabsList>

              <TabsContent value="percentage" className="mt-6">
                {renderPercentageTab()}
              </TabsContent>

              <TabsContent value="days" className="mt-6">
                {renderDaysTab()}
              </TabsContent>

              <TabsContent value="fixed" className="mt-6">
                {renderFixedTab()}
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Hủy
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Lưu phân bổ
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}