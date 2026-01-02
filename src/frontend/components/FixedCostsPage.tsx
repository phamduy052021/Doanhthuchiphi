import { useState } from "react";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { FixedCostAllocationDrawer } from "./FixedCostAllocationDrawer";
import { AddFixedCostModal } from "./AddFixedCostModal";

export interface FixedCost {
  id: string;
  name: string;
  totalAmount: number;
  month: string;
  allocationType: "percentage" | "fixed";
  allocations: CostAllocation[];
}

export interface CostAllocation {
  buId: string;
  buName: string;
  value: number;
}

export function FixedCostsPage() {
  const [fixedCosts, setFixedCosts] = useState<FixedCost[]>([
    {
      id: "fc-001",
      name: "Tiền thuê văn phòng",
      totalAmount: 150000000,
      month: "2025-11",
      allocationType: "percentage",
      allocations: [
        { buId: "bu-001", buName: "Đơn vị Bán lẻ Miền Bắc", value: 30 },
        { buId: "bu-002", buName: "Đơn vị Bán lẻ Miền Nam", value: 40 },
        { buId: "bu-003", buName: "Đơn vị Bán sỉ", value: 20 },
        { buId: "bu-005", buName: "Đơn vị Thương mại Điện tử", value: 10 },
      ],
    },
    {
      id: "fc-002",
      name: "Lương ban quản lý",
      totalAmount: 280000000,
      month: "2025-11",
      allocationType: "percentage",
      allocations: [
        { buId: "bu-001", buName: "Đơn vị Bán lẻ Miền Bắc", value: 25 },
        { buId: "bu-002", buName: "Đơn vị Bán lẻ Miền Nam", value: 25 },
        { buId: "bu-003", buName: "Đơn vị Bán sỉ", value: 25 },
        { buId: "bu-004", buName: "Đơn vị Xuất khẩu", value: 25 },
      ],
    },
    {
      id: "fc-003",
      name: "Chi phí điện nước",
      totalAmount: 80000000,
      month: "2025-11",
      allocationType: "fixed",
      allocations: [
        { buId: "bu-001", buName: "Đơn vị Bán lẻ Miền Bắc", value: 25000000 },
        { buId: "bu-002", buName: "Đơn vị Bán lẻ Miền Nam", value: 30000000 },
        { buId: "bu-003", buName: "Đơn vị Bán sỉ", value: 15000000 },
        { buId: "bu-005", buName: "Đơn vị Thương mại Điện tử", value: 10000000 },
      ],
    },
    {
      id: "fc-004",
      name: "Bảo hiểm & Bảo trì",
      totalAmount: 120000000,
      month: "2025-11",
      allocationType: "percentage",
      allocations: [
        { buId: "bu-001", buName: "Đơn vị Bán lẻ Miền Bắc", value: 35 },
        { buId: "bu-002", buName: "Đơn vị Bán lẻ Miền Nam", value: 35 },
        { buId: "bu-003", buName: "Đơn vị Bán sỉ", value: 30 },
      ],
    },
    {
      id: "fc-005",
      name: "Chi phí IT & Hệ thống",
      totalAmount: 95000000,
      month: "2025-11",
      allocationType: "percentage",
      allocations: [
        { buId: "bu-001", buName: "Đơn vị Bán lẻ Miền Bắc", value: 20 },
        { buId: "bu-002", buName: "Đơn vị Bán lẻ Miền Nam", value: 20 },
        { buId: "bu-003", buName: "Đơn vị Bán sỉ", value: 15 },
        { buId: "bu-004", buName: "Đơn vị Xuất khẩu", value: 15 },
        { buId: "bu-005", buName: "Đơn vị Thương mại Điện tử", value: 30 },
      ],
    },
  ]);

  const [selectedCost, setSelectedCost] = useState<FixedCost | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCost, setEditingCost] = useState<FixedCost | null>(null);

  // Mock variable costs for summary
  const totalVariableCosts = 1900000000;

  const handleViewAllocation = (cost: FixedCost) => {
    setSelectedCost(cost);
    setIsDrawerOpen(true);
  };

  const handleEditCost = (cost: FixedCost) => {
    setEditingCost(cost);
    setIsAddModalOpen(true);
  };

  const handleDeleteCost = (costId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa chi phí cố định này?")) {
      setFixedCosts(fixedCosts.filter((cost) => cost.id !== costId));
    }
  };

  const handleAddCost = (newCost: Omit<FixedCost, "id">) => {
    const cost: FixedCost = {
      ...newCost,
      id: `fc-${Date.now()}`,
    };
    setFixedCosts([...fixedCosts, cost]);
    setIsAddModalOpen(false);
    setEditingCost(null);
  };

  const handleUpdateCost = (updatedCost: FixedCost) => {
    setFixedCosts(
      fixedCosts.map((cost) =>
        cost.id === updatedCost.id ? updatedCost : cost
      )
    );
    setIsAddModalOpen(false);
    setEditingCost(null);
  };

  const handleSaveAllocations = (
    costId: string,
    allocations: CostAllocation[]
  ) => {
    setFixedCosts(
      fixedCosts.map((cost) =>
        cost.id === costId ? { ...cost, allocations } : cost
      )
    );
    setIsDrawerOpen(false);
  };

  const totalFixedCosts = fixedCosts.reduce(
    (sum, cost) => sum + cost.totalAmount,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Quản lý Chi phí Cố định</h1>
          <p className="text-gray-600">
            Phân bổ chi phí cố định cho các đơn vị kinh doanh
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingCost(null);
            setIsAddModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm Chi phí
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-gray-600">
              Tổng Chi phí Cố định
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900">
              ₫{(totalFixedCosts / 1000000000).toFixed(2)} tỷ
            </p>
            <p className="text-gray-600">Tháng 11/2025</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-gray-600">
              Tổng Chi phí Biến đổi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900">
              ₫{(totalVariableCosts / 1000000000).toFixed(2)} tỷ
            </p>
            <p className="text-gray-600">Tháng 11/2025</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-all duration-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-gray-900">Tổng Chi phí</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900">
              ₫
              {((totalFixedCosts + totalVariableCosts) / 1000000000).toFixed(
                2
              )}{" "}
              tỷ
            </p>
            <p className="text-gray-600">
              Cố định:{" "}
              {((totalFixedCosts / (totalFixedCosts + totalVariableCosts)) * 100).toFixed(1)}
              % | Biến đổi:{" "}
              {((totalVariableCosts / (totalFixedCosts + totalVariableCosts)) * 100).toFixed(1)}
              %
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên Chi phí</TableHead>
                <TableHead className="text-right">Tổng Số tiền</TableHead>
                <TableHead>Tháng</TableHead>
                <TableHead>Phương thức Phân bổ</TableHead>
                <TableHead className="text-center">Số ĐV</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fixedCosts.map((cost, index) => (
                <TableRow
                  key={cost.id}
                  className={index % 2 === 1 ? "bg-gray-50" : ""}
                >
                  <TableCell>
                    <span className="text-gray-900">{cost.name}</span>
                  </TableCell>
                  <TableCell className="text-right text-gray-900">
                    ₫{(cost.totalAmount / 1000000).toFixed(1)}M
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {new Date(cost.month + "-01").toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                    })}
                  </TableCell>
                  <TableCell>
                    {cost.allocationType === "percentage" ? (
                      <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                        Theo Phần trăm
                      </Badge>
                    ) : (
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                        Cố định
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      {cost.allocations.length} ĐV
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewAllocation(cost)}
                        className="hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditCost(cost)}
                        className="hover:bg-orange-50 hover:text-orange-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCost(cost.id)}
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
      <FixedCostAllocationDrawer
        cost={selectedCost}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleSaveAllocations}
      />

      {/* Add/Edit Modal */}
      <AddFixedCostModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingCost(null);
        }}
        onSave={editingCost ? handleUpdateCost : handleAddCost}
        editData={editingCost}
      />
    </div>
  );
}
