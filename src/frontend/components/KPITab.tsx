import { useState } from "react";
import { Plus, Edit, Trash2, TrendingUp, TrendingDown } from "lucide-react";
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
import { AddKPIModal } from "./AddKPIModal";

interface KPI {
  id: string;
  name: string;
  targetValue: number;
  actualValue: number;
  unit: string;
  responsiblePerson: string;
  achievementRate: number;
}

interface KPITabProps {
  buName: string;
  month: string;
  year: string;
}

export function KPITab({ buName, month, year }: KPITabProps) {
  const [kpis, setKpis] = useState<KPI[]>([
    {
      id: "kpi-001",
      name: "Doanh thu",
      targetValue: 5000000000,
      actualValue: 5200000000,
      unit: "VND",
      responsiblePerson: "Trần Văn A",
      achievementRate: 104,
    },
    {
      id: "kpi-002",
      name: "Số khách hàng mới",
      targetValue: 500,
      actualValue: 480,
      unit: "Khách",
      responsiblePerson: "Nguyễn Thị B",
      achievementRate: 96,
    },
    {
      id: "kpi-003",
      name: "Tỷ lệ giữ chân khách hàng",
      targetValue: 85,
      actualValue: 88,
      unit: "%",
      responsiblePerson: "Lê Văn C",
      achievementRate: 103.5,
    },
    {
      id: "kpi-004",
      name: "Chỉ số hài lòng khách hàng",
      targetValue: 90,
      actualValue: 92,
      unit: "Điểm",
      responsiblePerson: "Phạm Thị D",
      achievementRate: 102.2,
    },
    {
      id: "kpi-005",
      name: "Hiệu suất nhân viên",
      targetValue: 75,
      actualValue: 70,
      unit: "%",
      responsiblePerson: "Hoàng Văn E",
      achievementRate: 93.3,
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingKPI, setEditingKPI] = useState<KPI | null>(null);

  const handleAddKPI = (newKPI: Omit<KPI, "id" | "achievementRate">) => {
    const achievementRate = (newKPI.actualValue / newKPI.targetValue) * 100;
    const kpi: KPI = {
      ...newKPI,
      id: `kpi-${Date.now()}`,
      achievementRate: Math.round(achievementRate * 10) / 10,
    };
    setKpis([...kpis, kpi]);
    setIsAddModalOpen(false);
    setEditingKPI(null);
  };

  const handleUpdateKPI = (updatedKPI: KPI) => {
    const achievementRate =
      (updatedKPI.actualValue / updatedKPI.targetValue) * 100;
    const kpiWithRate = {
      ...updatedKPI,
      achievementRate: Math.round(achievementRate * 10) / 10,
    };
    setKpis(kpis.map((kpi) => (kpi.id === kpiWithRate.id ? kpiWithRate : kpi)));
    setIsAddModalOpen(false);
    setEditingKPI(null);
  };

  const handleEditKPI = (kpi: KPI) => {
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

  const getAchievementColor = (rate: number) => {
    if (rate >= 100) return "text-green-600";
    if (rate >= 90) return "text-yellow-600";
    return "text-red-600";
  };

  const getAchievementBadge = (rate: number) => {
    if (rate >= 100)
      return "bg-green-100 text-green-700 hover:bg-green-100";
    if (rate >= 90)
      return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
    return "bg-red-100 text-red-700 hover:bg-red-100";
  };

  const overallAchievement =
    kpis.reduce((sum, kpi) => sum + kpi.achievementRate, 0) / kpis.length;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="p-6">
            <p className="text-gray-600 mb-2">Tổng số KPI</p>
            <p className="text-gray-900">{kpis.length}</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="p-6">
            <p className="text-gray-600 mb-2">Tỷ lệ đạt KPI trung bình</p>
            <div className="flex items-center gap-2">
              <p className={`${getAchievementColor(overallAchievement)}`}>
                {overallAchievement.toFixed(1)}%
              </p>
              {overallAchievement >= 100 ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="p-6">
            <p className="text-gray-600 mb-2">KPI đạt mục tiêu</p>
            <p className="text-gray-900">
              {kpis.filter((kpi) => kpi.achievementRate >= 100).length}/
              {kpis.length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* KPI Table */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardContent className="p-0">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-900 mb-1">Danh sách KPI</h2>
                <p className="text-gray-600">
                  Theo dõi và quản lý các chỉ tiêu KPI
                </p>
              </div>
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
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên KPI</TableHead>
                <TableHead className="text-right">Mục tiêu</TableHead>
                <TableHead className="text-right">Thực tế</TableHead>
                <TableHead className="text-center">Tỷ lệ đạt</TableHead>
                <TableHead>Người phụ trách</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpis.map((kpi, index) => (
                <TableRow
                  key={kpi.id}
                  className={index % 2 === 1 ? "bg-gray-50" : ""}
                >
                  <TableCell>
                    <span className="text-gray-900">{kpi.name}</span>
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
                    <Badge className={getAchievementBadge(kpi.achievementRate)}>
                      {kpi.achievementRate}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {kpi.responsiblePerson}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
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
        </CardContent>
      </Card>

      {/* Add/Edit KPI Modal */}
      <AddKPIModal
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
