import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
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
import { AddFixedCostModal } from "./AddFixedCostModal";

interface FixedCost {
  id: string;
  item: string;
  allocationType: "percent" | "fixed";
  value: number;
  month: string;
}

export function FixedCostsTab() {
  const [costs, setCosts] = useState<FixedCost[]>([
    {
      id: "fc-001",
      item: "Tiền thuê văn phòng",
      allocationType: "fixed",
      value: 50000000,
      month: "2025-11",
    },
    {
      id: "fc-002",
      item: "Lương nhân viên",
      allocationType: "fixed",
      value: 380000000,
      month: "2025-11",
    },
    {
      id: "fc-003",
      item: "Chi phí điện nước",
      allocationType: "percent",
      value: 3.5,
      month: "2025-11",
    },
    {
      id: "fc-004",
      item: "Bảo trì thiết bị",
      allocationType: "fixed",
      value: 25000000,
      month: "2025-11",
    },
    {
      id: "fc-005",
      item: "Chi phí quản lý chung",
      allocationType: "percent",
      value: 5.0,
      month: "2025-11",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCost, setEditingCost] = useState<FixedCost | null>(null);

  const handleAddCost = (newCost: Omit<FixedCost, "id">) => {
    const cost: FixedCost = {
      ...newCost,
      id: `fc-${Date.now()}`,
    };
    setCosts([...costs, cost]);
    setIsAddModalOpen(false);
  };

  const handleEditCost = (updatedCost: FixedCost) => {
    setCosts(
      costs.map((cost) => (cost.id === updatedCost.id ? updatedCost : cost))
    );
    setEditingCost(null);
  };

  const handleDeleteCost = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa chi phí này?")) {
      setCosts(costs.filter((cost) => cost.id !== id));
    }
  };

  const totalFixedCost = costs
    .filter((cost) => cost.allocationType === "fixed")
    .reduce((sum, cost) => sum + cost.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">Chi phí Cố định</h2>
          <p className="text-gray-600">
            Tổng chi phí cố định: ₫{(totalFixedCost / 1000000).toFixed(1)}M
          </p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm Chi phí
        </Button>
      </div>

      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khoản mục</TableHead>
                <TableHead>Loại phân bổ</TableHead>
                <TableHead className="text-right">Giá trị</TableHead>
                <TableHead>Tháng</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costs.map((cost, index) => (
                <TableRow
                  key={cost.id}
                  className={index % 2 === 1 ? "bg-gray-50" : ""}
                >
                  <TableCell>
                    <span className="text-gray-900">{cost.item}</span>
                  </TableCell>
                  <TableCell>
                    {cost.allocationType === "fixed" ? (
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                        Cố định
                      </Badge>
                    ) : (
                      <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                        Phần trăm
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right text-gray-900">
                    {cost.allocationType === "fixed"
                      ? `₫${(cost.value / 1000000).toFixed(1)}M`
                      : `${cost.value}%`}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {new Date(cost.month + "-01").toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingCost(cost)}
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

      <AddFixedCostModal
        isOpen={isAddModalOpen || editingCost !== null}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingCost(null);
        }}
        onSave={editingCost ? handleEditCost : handleAddCost}
        editData={editingCost}
      />
    </div>
  );
}
