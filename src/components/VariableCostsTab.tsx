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
import { AddCostModal } from "./AddCostModal";

interface VariableCost {
  id: string;
  type: string;
  description: string;
  amount: number;
  month: string;
}

interface VariableCostsTabProps {
  buName: string;
  month: string;
  year: string;
}

export function VariableCostsTab({ buName, month, year }: VariableCostsTabProps) {
  const [costs, setCosts] = useState<VariableCost[]>([
    {
      id: "vc-001",
      type: "Nguyên vật liệu",
      description: "Nguyên liệu sản xuất sản phẩm A",
      amount: 1200000000,
      month: "11",
    },
    {
      id: "vc-002",
      type: "Hoa hồng bán hàng",
      description: "Hoa hồng đội ngũ sales tháng 11",
      amount: 300000000,
      month: "11",
    },
    {
      id: "vc-003",
      type: "Vận chuyển",
      description: "Chi phí giao hàng và logistics",
      amount: 150000000,
      month: "11",
    },
    {
      id: "vc-004",
      type: "Đóng gói",
      description: "Bao bì và đóng gói sản phẩm",
      amount: 80000000,
      month: "11",
    },
    {
      id: "vc-005",
      type: "Marketing",
      description: "Quảng cáo và khuyến mãi",
      amount: 200000000,
      month: "11",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCost, setEditingCost] = useState<VariableCost | null>(null);

  const handleAddCost = (newCost: Omit<VariableCost, "id">) => {
    const cost: VariableCost = {
      ...newCost,
      id: `vc-${Date.now()}`,
    };
    setCosts([...costs, cost]);
    setIsAddModalOpen(false);
    setEditingCost(null);
  };

  const handleUpdateCost = (updatedCost: VariableCost) => {
    setCosts(
      costs.map((cost) => (cost.id === updatedCost.id ? updatedCost : cost))
    );
    setIsAddModalOpen(false);
    setEditingCost(null);
  };

  const handleEditCost = (cost: VariableCost) => {
    setEditingCost(cost);
    setIsAddModalOpen(true);
  };

  const handleDeleteCost = (costId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa chi phí này?")) {
      setCosts(costs.filter((cost) => cost.id !== costId));
    }
  };

  const totalCost = costs.reduce((sum, cost) => sum + cost.amount, 0);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="p-6">
            <p className="text-gray-600 mb-2">Tổng Chi phí Biến đổi</p>
            <p className="text-gray-900">
              {new Intl.NumberFormat("vi-VN").format(totalCost)} ₫
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="p-6">
            <p className="text-gray-600 mb-2">Số mục chi phí</p>
            <p className="text-gray-900">{costs.length}</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="p-6">
            <p className="text-gray-600 mb-2">Chi phí TB/mục</p>
            <p className="text-gray-900">
              {new Intl.NumberFormat("vi-VN").format(
                costs.length > 0 ? totalCost / costs.length : 0
              )}{" "}
              ₫
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Variable Costs Table */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardContent className="p-0">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-900 mb-1">Chi phí Biến đổi</h2>
                <p className="text-gray-600">
                  Các chi phí thay đổi theo sản lượng/hoạt động
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
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loại chi phí</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead className="text-right">Số tiền</TableHead>
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
                    <span className="text-gray-900">{cost.type}</span>
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {cost.description}
                  </TableCell>
                  <TableCell className="text-right text-gray-900">
                    {new Intl.NumberFormat("vi-VN").format(cost.amount)} ₫
                  </TableCell>
                  <TableCell className="text-gray-700">
                    Tháng {cost.month}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
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

      {/* Add/Edit Cost Modal */}
      <AddCostModal
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
