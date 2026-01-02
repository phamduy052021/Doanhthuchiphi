import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface SummaryTabProps {
  buName: string;
  month: string;
  year: string;
}

export function SummaryTab({ buName, month, year }: SummaryTabProps) {
  // Sample data - in real app, this would aggregate from other tabs
  const revenue = 5200000000;
  const variableCosts = 1930000000;
  const fixedCosts = 248000000;
  const totalCosts = variableCosts + fixedCosts;
  const profit = revenue - totalCosts;
  const profitMargin = (profit / revenue) * 100;
  const kpiCompletionRate = 99.4;

  // Cost breakdown data for pie chart
  const costBreakdown = [
    { name: "Nguyên vật liệu", value: 1200000000, color: "#3b82f6" },
    { name: "Hoa hồng", value: 300000000, color: "#8b5cf6" },
    { name: "Vận chuyển", value: 150000000, color: "#10b981" },
    { name: "Marketing", value: 200000000, color: "#f59e0b" },
    { name: "Chi phí cố định", value: 248000000, color: "#ef4444" },
    { name: "Khác", value: 80000000, color: "#6b7280" },
  ];

  return (
    <div className="space-y-6">
      {/* Main Financial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-all duration-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-600">Doanh thu</CardTitle>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900 mb-1">
              {new Intl.NumberFormat("vi-VN").format(revenue)} ₫
            </p>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-all duration-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-600">Tổng Chi phí</CardTitle>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900 mb-1">
              {new Intl.NumberFormat("vi-VN").format(totalCosts)} ₫
            </p>
            <div className="flex items-center gap-1 text-red-600">
              <TrendingUp className="w-4 h-4" />
              <span>+8.3%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-all duration-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-600">Lợi nhuận</CardTitle>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900 mb-1">
              {new Intl.NumberFormat("vi-VN").format(profit)} ₫
            </p>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+18.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-all duration-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-600">Tỷ lệ LN</CardTitle>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900 mb-1">{profitMargin.toFixed(1)}%</p>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+2.1%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cost Breakdown Chart */}
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Cơ cấu Chi phí</CardTitle>
            <p className="text-gray-600">Phân bổ chi phí theo loại</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) =>
                    new Intl.NumberFormat("vi-VN").format(value) + " ₫"
                  }
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* KPI and Performance Metrics */}
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Hiệu suất & KPI</CardTitle>
            <p className="text-gray-600">Tổng quan các chỉ số đánh giá</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Tỷ lệ hoàn thành KPI</span>
                <span className="text-gray-900">{kpiCompletionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${kpiCompletionRate}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-gray-600 mb-1">Chi phí Biến đổi</p>
                <p className="text-gray-900">
                  {new Intl.NumberFormat("vi-VN", {
                    notation: "compact",
                    compactDisplay: "short",
                  }).format(variableCosts)}{" "}
                  ₫
                </p>
                <p className="text-gray-600">
                  {((variableCosts / totalCosts) * 100).toFixed(1)}% tổng CP
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-xl">
                <p className="text-gray-600 mb-1">Chi phí Cố định</p>
                <p className="text-gray-900">
                  {new Intl.NumberFormat("vi-VN", {
                    notation: "compact",
                    compactDisplay: "short",
                  }).format(fixedCosts)}{" "}
                  ₫
                </p>
                <p className="text-gray-600">
                  {((fixedCosts / totalCosts) * 100).toFixed(1)}% tổng CP
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">ROI (Return on Investment)</span>
                <span className="text-green-600">
                  {((profit / totalCosts) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Số KPI đạt mục tiêu</span>
                <span className="text-gray-900">3/5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Chi phí Biến đổi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Nguyên vật liệu</span>
              <span className="text-gray-900">
                {new Intl.NumberFormat("vi-VN", {
                  notation: "compact",
                }).format(1200000000)}{" "}
                ₫
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Hoa hồng</span>
              <span className="text-gray-900">
                {new Intl.NumberFormat("vi-VN", {
                  notation: "compact",
                }).format(300000000)}{" "}
                ₫
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Vận chuyển</span>
              <span className="text-gray-900">
                {new Intl.NumberFormat("vi-VN", {
                  notation: "compact",
                }).format(150000000)}{" "}
                ₫
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Marketing</span>
              <span className="text-gray-900">
                {new Intl.NumberFormat("vi-VN", {
                  notation: "compact",
                }).format(200000000)}{" "}
                ₫
              </span>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Tổng</span>
                <span className="text-gray-900">
                  {new Intl.NumberFormat("vi-VN", {
                    notation: "compact",
                  }).format(variableCosts)}{" "}
                  ₫
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Chi phí Cố định</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Lương hành chính</span>
              <span className="text-gray-900">
                {new Intl.NumberFormat("vi-VN", {
                  notation: "compact",
                }).format(150000000)}{" "}
                ₫
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Thuê văn phòng</span>
              <span className="text-gray-900">
                {new Intl.NumberFormat("vi-VN", {
                  notation: "compact",
                }).format(50000000)}{" "}
                ₫
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Khấu hao</span>
              <span className="text-gray-900">
                {new Intl.NumberFormat("vi-VN", {
                  notation: "compact",
                }).format(25000000)}{" "}
                ₫
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Khác</span>
              <span className="text-gray-900">
                {new Intl.NumberFormat("vi-VN", {
                  notation: "compact",
                }).format(23000000)}{" "}
                ₫
              </span>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Tổng</span>
                <span className="text-gray-900">
                  {new Intl.NumberFormat("vi-VN", {
                    notation: "compact",
                  }).format(fixedCosts)}{" "}
                  ₫
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-gray-900">Tóm tắt Tài chính</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Doanh thu</span>
              <span className="text-blue-600">
                {new Intl.NumberFormat("vi-VN", {
                  notation: "compact",
                }).format(revenue)}{" "}
                ₫
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Chi phí</span>
              <span className="text-red-600">
                -{" "}
                {new Intl.NumberFormat("vi-VN", {
                  notation: "compact",
                }).format(totalCosts)}{" "}
                ₫
              </span>
            </div>
            <div className="pt-3 border-t-2 border-gray-300">
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Lợi nhuận</span>
                <span className="text-green-600">
                  {new Intl.NumberFormat("vi-VN", {
                    notation: "compact",
                  }).format(profit)}{" "}
                  ₫
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Biên LN</span>
              <span className="text-green-600">{profitMargin.toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">ROI</span>
              <span className="text-green-600">
                {((profit / totalCosts) * 100).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
