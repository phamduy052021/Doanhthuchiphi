import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AddRevenueModal } from "./AddRevenueModal";

interface RevenueSource {
  id: string;
  name: string;
  unit: string;
  unitPrice: number;
  quantity: number;
  growthRate: number;
  churnRate: number;
  cumulative?: number;
  month: string;
}

interface RevenueTabProps {
  buName: string;
  month: string;
  year: string;
}

export function RevenueTab({ buName, month, year }: RevenueTabProps) {
  const [revenues, setRevenues] = useState<RevenueSource[]>([
    {
      id: "rev-001",
      name: "Sản phẩm A",
      unit: "Chiếc",
      unitPrice: 500000,
      quantity: 2000,
      growthRate: 15,
      churnRate: 2,
      cumulative: 1000000000,
      month: "11",
    },
    {
      id: "rev-002",
      name: "Sản phẩm B",
      unit: "Bộ",
      unitPrice: 1200000,
      quantity: 1500,
      growthRate: 20,
      churnRate: 3,
      cumulative: 1800000000,
      month: "11",
    },
    {
      id: "rev-003",
      name: "Dịch vụ C",
      unit: "Gói",
      unitPrice: 2000000,
      quantity: 800,
      growthRate: 10,
      churnRate: 5,
      cumulative: 1600000000,
      month: "11",
    },
    {
      id: "rev-004",
      name: "Sản phẩm D",
      unit: "Chiếc",
      unitPrice: 800000,
      quantity: 1000,
      growthRate: 8,
      churnRate: 4,
      cumulative: 800000000,
      month: "11",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRevenue, setEditingRevenue] = useState<RevenueSource | null>(
    null
  );

  // Chart data: comparing target vs actual revenue over months
  const chartData = [
    { month: "T7", target: 4500, actual: 4200 },
    { month: "T8", target: 4700, actual: 4600 },
    { month: "T9", target: 4800, actual: 4900 },
    { month: "T10", target: 5000, actual: 5100 },
    { month: "T11", target: 5200, actual: 5200 },
  ];

  const handleAddRevenue = (newRevenue: Omit<RevenueSource, "id">) => {
    const revenue: RevenueSource = {
      ...newRevenue,
      id: `rev-${Date.now()}`,
    };
    setRevenues([...revenues, revenue]);
    setIsAddModalOpen(false);
    setEditingRevenue(null);
  };

  const handleUpdateRevenue = (updatedRevenue: RevenueSource) => {
    setRevenues(
      revenues.map((rev) =>
        rev.id === updatedRevenue.id ? updatedRevenue : rev
      )
    );
    setIsAddModalOpen(false);
    setEditingRevenue(null);
  };

  const handleEditRevenue = (revenue: RevenueSource) => {
    setEditingRevenue(revenue);
    setIsAddModalOpen(true);
  };

  const handleDeleteRevenue = (revenueId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa nguồn doanh thu này?")) {
      setRevenues(revenues.filter((rev) => rev.id !== revenueId));
    }
  };

  const totalRevenue = revenues.reduce(
    (sum, rev) => sum + rev.unitPrice * rev.quantity,
    0
  );
  const averageGrowth =
    revenues.reduce((sum, rev) => sum + rev.growthRate, 0) / revenues.length;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="p-6">
            <p className="text-gray-600 mb-2">Tổng Doanh thu</p>
            <p className="text-gray-900">
              {new Intl.NumberFormat("vi-VN").format(totalRevenue)} ₫
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="p-6">
            <p className="text-gray-600 mb-2">Tăng trưởng TB</p>
            <p className="text-green-600">+{averageGrowth.toFixed(1)}%</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="p-6">
            <p className="text-gray-600 mb-2">Số nguồn DT</p>
            <p className="text-gray-900">{revenues.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">
            Biểu đồ So sánh: Mục tiêu vs Thực tế
          </CardTitle>
          <p className="text-gray-600">Doanh thu theo tháng (triệu VND)</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Mục tiêu"
                dot={{ fill: "#3b82f6", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#10b981"
                strokeWidth={2}
                name="Thực tế"
                dot={{ fill: "#10b981", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Sources Table */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardContent className="p-0">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-900 mb-1">Nguồn Doanh thu</h2>
                <p className="text-gray-600">
                  Chi tiết các nguồn doanh thu của đơn vị
                </p>
              </div>
              <Button
                onClick={() => {
                  setEditingRevenue(null);
                  setIsAddModalOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm Nguồn DT
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Đơn vị</TableHead>
                <TableHead className="text-right">Đơn giá</TableHead>
                <TableHead className="text-right">Số lượng</TableHead>
                <TableHead className="text-right">Tăng trưởng</TableHead>
                <TableHead className="text-right">Churn</TableHead>
                <TableHead className="text-right">Tổng</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenues.map((revenue, index) => (
                <TableRow
                  key={revenue.id}
                  className={index % 2 === 1 ? "bg-gray-50" : ""}
                >
                  <TableCell>
                    <span className="text-gray-900">{revenue.name}</span>
                  </TableCell>
                  <TableCell className="text-gray-700">{revenue.unit}</TableCell>
                  <TableCell className="text-right text-gray-700">
                    {new Intl.NumberFormat("vi-VN").format(revenue.unitPrice)} ₫
                  </TableCell>
                  <TableCell className="text-right text-gray-700">
                    {new Intl.NumberFormat("vi-VN").format(revenue.quantity)}
                  </TableCell>
                  <TableCell className="text-right text-green-600">
                    +{revenue.growthRate}%
                  </TableCell>
                  <TableCell className="text-right text-red-600">
                    -{revenue.churnRate}%
                  </TableCell>
                  <TableCell className="text-right text-gray-900">
                    {new Intl.NumberFormat("vi-VN").format(
                      revenue.unitPrice * revenue.quantity
                    )}{" "}
                    ₫
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditRevenue(revenue)}
                        className="hover:bg-orange-50 hover:text-orange-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteRevenue(revenue.id)}
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

      {/* Add/Edit Revenue Modal */}
      <AddRevenueModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingRevenue(null);
        }}
        onSave={editingRevenue ? handleUpdateRevenue : handleAddRevenue}
        editData={editingRevenue}
      />
    </div>
  );
}
