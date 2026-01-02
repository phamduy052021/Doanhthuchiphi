import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  Filter,
  Search,
  Eye,
  BarChart3,
} from "lucide-react";
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
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { AddKPIMasterModal } from "./AddKPIMasterModal";

interface KPIMaster {
  id: string;
  name: string;
  category: "revenue" | "cost" | "efficiency" | "quality" | "customer";
  businessUnit: string;
  businessUnitId: string;
  targetValue: number;
  actualValue: number;
  unit: string;
  responsiblePerson: string;
  responsiblePersonId: string;
  achievementRate: number;
  month: string;
  year: string;
  status: "on-track" | "at-risk" | "achieved" | "missed";
  linkedRevenue?: number;
  linkedCost?: number;
}

interface KPIManagementPageProps {
  onNavigateToBU?: (buId: string) => void;
  onNavigateToEmployee?: (employeeId: string) => void;
}

export function KPIManagementPage({
  onNavigateToBU,
  onNavigateToEmployee,
}: KPIManagementPageProps) {
  const [kpis, setKpis] = useState<KPIMaster[]>([
    {
      id: "kpi-m-001",
      name: "Doanh thu tháng",
      category: "revenue",
      businessUnit: "Đơn vị Bán lẻ Miền Bắc",
      businessUnitId: "bu-001",
      targetValue: 5000000000,
      actualValue: 5200000000,
      unit: "VND",
      responsiblePerson: "Trần Văn A",
      responsiblePersonId: "emp-001",
      achievementRate: 104,
      month: "11",
      year: "2025",
      status: "achieved",
      linkedRevenue: 5200000000,
    },
    {
      id: "kpi-m-002",
      name: "Doanh thu tháng",
      category: "revenue",
      businessUnit: "Đơn vị Bán lẻ Miền Nam",
      businessUnitId: "bu-002",
      targetValue: 4500000000,
      actualValue: 4300000000,
      unit: "VND",
      responsiblePerson: "Nguyễn Thị B",
      responsiblePersonId: "emp-002",
      achievementRate: 95.6,
      month: "11",
      year: "2025",
      status: "at-risk",
      linkedRevenue: 4300000000,
    },
    {
      id: "kpi-m-003",
      name: "Kiểm soát chi phí",
      category: "cost",
      businessUnit: "Đơn vị Bán lẻ Miền Bắc",
      businessUnitId: "bu-001",
      targetValue: 2000000000,
      actualValue: 2178000000,
      unit: "VND",
      responsiblePerson: "Lê Văn C",
      responsiblePersonId: "emp-003",
      achievementRate: 91.8,
      month: "11",
      year: "2025",
      status: "at-risk",
      linkedCost: 2178000000,
    },
    {
      id: "kpi-m-004",
      name: "Số khách hàng mới",
      category: "customer",
      businessUnit: "Đơn vị Bán lẻ Miền Bắc",
      businessUnitId: "bu-001",
      targetValue: 500,
      actualValue: 480,
      unit: "Khách",
      responsiblePerson: "Nguyễn Thị B",
      responsiblePersonId: "emp-002",
      achievementRate: 96,
      month: "11",
      year: "2025",
      status: "on-track",
    },
    {
      id: "kpi-m-005",
      name: "Hiệu suất nhân viên",
      category: "efficiency",
      businessUnit: "Đơn vị Bán lẻ Miền Nam",
      businessUnitId: "bu-002",
      targetValue: 75,
      actualValue: 82,
      unit: "%",
      responsiblePerson: "Hoàng Văn E",
      responsiblePersonId: "emp-005",
      achievementRate: 109.3,
      month: "11",
      year: "2025",
      status: "achieved",
    },
    {
      id: "kpi-m-006",
      name: "Chỉ số hài lòng KH",
      category: "quality",
      businessUnit: "Đơn vị Sản xuất",
      businessUnitId: "bu-003",
      targetValue: 90,
      actualValue: 92,
      unit: "Điểm",
      responsiblePerson: "Phạm Thị D",
      responsiblePersonId: "emp-004",
      achievementRate: 102.2,
      month: "11",
      year: "2025",
      status: "achieved",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingKPI, setEditingKPI] = useState<KPIMaster | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBU, setFilterBU] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Filter KPIs
  const filteredKPIs = kpis.filter((kpi) => {
    const matchesSearch =
      kpi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kpi.businessUnit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kpi.responsiblePerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBU = filterBU === "all" || kpi.businessUnitId === filterBU;
    const matchesCategory =
      filterCategory === "all" || kpi.category === filterCategory;
    const matchesStatus = filterStatus === "all" || kpi.status === filterStatus;

    return matchesSearch && matchesBU && matchesCategory && matchesStatus;
  });

  // Calculate statistics
  const totalKPIs = kpis.length;
  const achievedKPIs = kpis.filter((kpi) => kpi.achievementRate >= 100).length;
  const averageAchievement =
    kpis.reduce((sum, kpi) => sum + kpi.achievementRate, 0) / kpis.length;
  const onTrackKPIs = kpis.filter((kpi) => kpi.status === "on-track").length;

  // Chart data - Achievement by BU
  const buPerformanceData = [
    { name: "Bán lẻ MB", achievement: 100, target: 100 },
    { name: "Bán lẻ MN", achievement: 95.6, target: 100 },
    { name: "Sản xuất", achievement: 102.2, target: 100 },
    { name: "Logistics", achievement: 98, target: 100 },
  ];

  // Trend data
  const trendData = [
    { month: "T7", achievement: 92 },
    { month: "T8", achievement: 95 },
    { month: "T9", achievement: 97 },
    { month: "T10", achievement: 96 },
    { month: "T11", achievement: 99.4 },
  ];

  const handleAddKPI = (newKPI: Omit<KPIMaster, "id" | "achievementRate">) => {
    const achievementRate = (newKPI.actualValue / newKPI.targetValue) * 100;
    const status =
      achievementRate >= 100
        ? "achieved"
        : achievementRate >= 95
        ? "on-track"
        : "at-risk";

    const kpi: KPIMaster = {
      ...newKPI,
      id: `kpi-m-${Date.now()}`,
      achievementRate: Math.round(achievementRate * 10) / 10,
      status,
    };
    setKpis([...kpis, kpi]);
    setIsAddModalOpen(false);
    setEditingKPI(null);
  };

  const handleUpdateKPI = (updatedKPI: KPIMaster) => {
    const achievementRate =
      (updatedKPI.actualValue / updatedKPI.targetValue) * 100;
    const status =
      achievementRate >= 100
        ? "achieved"
        : achievementRate >= 95
        ? "on-track"
        : "at-risk";

    const kpiWithRate = {
      ...updatedKPI,
      achievementRate: Math.round(achievementRate * 10) / 10,
      status,
    };
    setKpis(kpis.map((kpi) => (kpi.id === kpiWithRate.id ? kpiWithRate : kpi)));
    setIsAddModalOpen(false);
    setEditingKPI(null);
  };

  const handleEditKPI = (kpi: KPIMaster) => {
    setEditingKPI(kpi);
    setIsAddModalOpen(true);
  };

  const handleDeleteKPI = (kpiId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa KPI này?")) {
      setKpis(kpis.filter((kpi) => kpi.id !== kpiId));
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === "VND") {
      return new Intl.NumberFormat("vi-VN").format(value) + " ₫";
    }
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "revenue":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Doanh thu
          </Badge>
        );
      case "cost":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Chi phí
          </Badge>
        );
      case "efficiency":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Hiệu suất
          </Badge>
        );
      case "quality":
        return (
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
            Chất lượng
          </Badge>
        );
      case "customer":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
            Khách hàng
          </Badge>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "achieved":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Đạt
          </Badge>
        );
      case "on-track":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Đang đạt
          </Badge>
        );
      case "at-risk":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            Rủi ro
          </Badge>
        );
      case "missed":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Chưa đạt
          </Badge>
        );
      default:
        return null;
    }
  };

  const getAchievementColor = (rate: number) => {
    if (rate >= 100) return "text-green-600";
    if (rate >= 95) return "text-blue-600";
    if (rate >= 90) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Quản lý KPI Tổng thể</h1>
        <p className="text-gray-600">
          Quản lý và theo dõi tất cả KPI của toàn công ty
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-all duration-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-600">Tổng số KPI</CardTitle>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900 mb-1">{totalKPIs}</p>
            <p className="text-gray-600">Đang theo dõi</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-all duration-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-600">KPI đạt mục tiêu</CardTitle>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900 mb-1">
              {achievedKPIs}/{totalKPIs}
            </p>
            <p className="text-green-600">
              {((achievedKPIs / totalKPIs) * 100).toFixed(1)}% hoàn thành
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-all duration-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-600">Tỷ lệ đạt TB</CardTitle>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className={`mb-1 ${getAchievementColor(averageAchievement)}`}>
              {averageAchievement.toFixed(1)}%
            </p>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+3.2% vs tháng trước</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-all duration-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-600">KPI On-track</CardTitle>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900 mb-1">{onTrackKPIs}</p>
            <p className="text-gray-600">Đang theo đúng kế hoạch</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">
              Tỷ lệ Đạt KPI theo Đơn vị
            </CardTitle>
            <p className="text-gray-600">So sánh hiệu suất các đơn vị</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={buPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="achievement"
                  fill="#3b82f6"
                  name="Tỷ lệ đạt (%)"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="target"
                  fill="#e5e7eb"
                  name="Mục tiêu (%)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Xu hướng KPI</CardTitle>
            <p className="text-gray-600">Tỷ lệ đạt KPI theo thời gian</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
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
                  dataKey="achievement"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Tỷ lệ đạt (%)"
                  dot={{ fill: "#10b981", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardContent className="p-0">
          {/* Filters */}
          <div className="p-6 border-b border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-900">Danh sách KPI</h2>
              <Button
                onClick={() => {
                  setEditingKPI(null);
                  setIsAddModalOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm KPI
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm KPI..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterBU} onValueChange={setFilterBU}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả đơn vị" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả đơn vị</SelectItem>
                  <SelectItem value="bu-001">Bán lẻ Miền Bắc</SelectItem>
                  <SelectItem value="bu-002">Bán lẻ Miền Nam</SelectItem>
                  <SelectItem value="bu-003">Sản xuất</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả loại</SelectItem>
                  <SelectItem value="revenue">Doanh thu</SelectItem>
                  <SelectItem value="cost">Chi phí</SelectItem>
                  <SelectItem value="efficiency">Hiệu suất</SelectItem>
                  <SelectItem value="quality">Chất lượng</SelectItem>
                  <SelectItem value="customer">Khách hàng</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="achieved">Đạt</SelectItem>
                  <SelectItem value="on-track">Đang đạt</SelectItem>
                  <SelectItem value="at-risk">Rủi ro</SelectItem>
                  <SelectItem value="missed">Chưa đạt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên KPI</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Đơn vị KD</TableHead>
                <TableHead className="text-right">Mục tiêu</TableHead>
                <TableHead className="text-right">Thực tế</TableHead>
                <TableHead className="text-center">Tỷ lệ</TableHead>
                <TableHead>Người PT</TableHead>
                <TableHead className="text-center">Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKPIs.map((kpi, index) => (
                <TableRow
                  key={kpi.id}
                  className={index % 2 === 1 ? "bg-gray-50" : ""}
                >
                  <TableCell>
                    <span className="text-gray-900">{kpi.name}</span>
                  </TableCell>
                  <TableCell>{getCategoryBadge(kpi.category)}</TableCell>
                  <TableCell>
                    <button
                      onClick={() =>
                        onNavigateToBU && onNavigateToBU(kpi.businessUnitId)
                      }
                      className="text-blue-600 hover:underline"
                    >
                      {kpi.businessUnit}
                    </button>
                  </TableCell>
                  <TableCell className="text-right text-gray-700">
                    {formatValue(kpi.targetValue, kpi.unit)}
                    {kpi.unit !== "VND" && ` ${kpi.unit}`}
                  </TableCell>
                  <TableCell className="text-right text-gray-700">
                    {formatValue(kpi.actualValue, kpi.unit)}
                    {kpi.unit !== "VND" && ` ${kpi.unit}`}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={getAchievementColor(kpi.achievementRate)}>
                      {kpi.achievementRate}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() =>
                        onNavigateToEmployee &&
                        onNavigateToEmployee(kpi.responsiblePersonId)
                      }
                      className="text-blue-600 hover:underline"
                    >
                      {kpi.responsiblePerson}
                    </button>
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(kpi.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          onNavigateToBU && onNavigateToBU(kpi.businessUnitId)
                        }
                        className="hover:bg-blue-50 hover:text-blue-600"
                        title="Xem chi tiết BU"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditKPI(kpi)}
                        className="hover:bg-orange-50 hover:text-orange-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteKPI(kpi.id)}
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

          {filteredKPIs.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Không tìm thấy KPI nào phù hợp với bộ lọc
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit KPI Modal */}
      <AddKPIMasterModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingKPI(null);
        }}
        onSave={editingKPI ? handleUpdateKPI : handleAddKPI}
        editData={editingKPI}
      />
    </div>
  );
}
