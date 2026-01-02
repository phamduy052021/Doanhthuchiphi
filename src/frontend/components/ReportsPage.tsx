import { useState } from "react";
import { ArrowLeft, Download, FileDown, TrendingUp } from "lucide-react";
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
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ReportsPageProps {
  onNavigateToBU: (buId: string) => void;
  onBack: () => void;
}

export function ReportsPage({ onNavigateToBU, onBack }: ReportsPageProps) {
  const [selectedMonth, setSelectedMonth] = useState("11");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedBUs, setSelectedBUs] = useState<string[]>([
    "bu-001",
    "bu-002",
    "bu-003",
    "bu-004",
    "bu-005",
  ]);

  const businessUnits = [
    { id: "bu-001", name: "Đơn vị Bán lẻ Miền Bắc", color: "#3B82F6" },
    { id: "bu-002", name: "Đơn vị Bán lẻ Miền Nam", color: "#10B981" },
    { id: "bu-003", name: "Đơn vị Bán sỉ", color: "#F59E0B" },
    { id: "bu-004", name: "Đơn vị Xuất khẩu", color: "#8B5CF6" },
    { id: "bu-005", name: "Đơn vị Thương mại Điện tử", color: "#EF4444" },
  ];

  // Mock data for line chart - Revenue vs Cost over time
  const timeSeriesData = [
    {
      month: "T7",
      revenue: 4.2,
      cost: 2.8,
    },
    {
      month: "T8",
      revenue: 4.5,
      cost: 3.0,
    },
    {
      month: "T9",
      revenue: 4.8,
      cost: 3.1,
    },
    {
      month: "T10",
      revenue: 5.0,
      cost: 3.3,
    },
    {
      month: "T11",
      revenue: 5.4,
      cost: 3.5,
    },
  ];

  // Mock data for bar chart - BU profit margins
  const profitMarginData = businessUnits
    .filter((bu) => selectedBUs.includes(bu.id))
    .map((bu) => {
      const margins: Record<string, number> = {
        "bu-001": 35.2,
        "bu-002": 42.1,
        "bu-003": 28.5,
        "bu-004": 38.7,
        "bu-005": 45.3,
      };
      return {
        name: bu.name.replace("Đơn vị ", ""),
        margin: margins[bu.id],
        fill: bu.color,
      };
    });

  // Mock data for radar chart - KPI achievement
  const kpiData = [
    {
      subject: "Doanh thu",
      "BL Miền Bắc": 95,
      "BL Miền Nam": 105,
      "Bán sỉ": 88,
      "Xuất khẩu": 92,
      "TMĐT": 110,
    },
    {
      subject: "Lợi nhuận",
      "BL Miền Bắc": 92,
      "BL Miền Nam": 98,
      "Bán sỉ": 85,
      "Xuất khẩu": 95,
      "TMĐT": 108,
    },
    {
      subject: "Chi phí",
      "BL Miền Bắc": 88,
      "BL Miền Nam": 90,
      "Bán sỉ": 82,
      "Xuất khẩu": 87,
      "TMĐT": 95,
    },
    {
      subject: "Hiệu suất",
      "BL Miền Bắc": 90,
      "BL Miền Nam": 102,
      "Bán sỉ": 86,
      "Xuất khẩu": 93,
      "TMĐT": 105,
    },
    {
      subject: "Tăng trưởng",
      "BL Miền Bắc": 93,
      "BL Miền Nam": 100,
      "Bán sỉ": 90,
      "Xuất khẩu": 96,
      "TMĐT": 112,
    },
  ];

  // Mock data for table
  const performanceData = businessUnits
    .filter((bu) => selectedBUs.includes(bu.id))
    .map((bu) => {
      const data: Record<string, any> = {
        "bu-001": {
          kpi: 95.2,
          revenue: 1200,
          cost: 780,
          profit: 420,
          variance: 5.2,
        },
        "bu-002": {
          kpi: 102.5,
          revenue: 980,
          cost: 570,
          profit: 410,
          variance: 12.5,
        },
        "bu-003": {
          kpi: 88.3,
          revenue: 1500,
          cost: 1080,
          profit: 420,
          variance: -11.7,
        },
        "bu-004": {
          kpi: 93.8,
          revenue: 850,
          cost: 520,
          profit: 330,
          variance: -6.2,
        },
        "bu-005": {
          kpi: 108.5,
          revenue: 680,
          cost: 370,
          profit: 310,
          variance: 18.5,
        },
      };
      return {
        id: bu.id,
        name: bu.name,
        color: bu.color,
        ...data[bu.id],
      };
    });

  const handleBUToggle = (buId: string) => {
    if (selectedBUs.includes(buId)) {
      setSelectedBUs(selectedBUs.filter((id) => id !== buId));
    } else {
      setSelectedBUs([...selectedBUs, buId]);
    }
  };

  const handleExportPDF = () => {
    alert("Xuất báo cáo PDF - Tính năng đang phát triển");
  };

  const handleExportExcel = () => {
    alert("Xuất báo cáo Excel - Tính năng đang phát triển");
  };

  const handleBUClick = (buId: string) => {
    onNavigateToBU(buId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={onBack}
            className="rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-gray-900 mb-2">Báo cáo & Phân tích</h1>
            <p className="text-gray-600">
              Tổng quan hiệu suất các Đơn vị Kinh doanh
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleExportExcel}
            className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
          >
            <FileDown className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
          <Button
            variant="outline"
            onClick={handleExportPDF}
            className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
          >
            <Download className="w-4 h-4 mr-2" />
            Xuất PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Time Filters */}
            <div className="space-y-2">
              <Label>Tháng</Label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      Tháng {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Năm</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* BU Multi-select */}
            <div className="space-y-2">
              <Label>Đơn vị Kinh doanh</Label>
              <div className="border border-gray-200 rounded-lg p-3 space-y-2 max-h-[200px] overflow-y-auto">
                {businessUnits.map((bu) => (
                  <div key={bu.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={bu.id}
                      checked={selectedBUs.includes(bu.id)}
                      onCheckedChange={() => handleBUToggle(bu.id)}
                    />
                    <Label
                      htmlFor={bu.id}
                      className="cursor-pointer flex items-center gap-2"
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: bu.color }}
                      />
                      <span className="text-gray-700">
                        {bu.name.replace("Đơn vị ", "")}
                      </span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Cost Line Chart */}
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">
              Doanh thu vs Chi phí theo Thời gian
            </CardTitle>
            <p className="text-gray-600">Đơn vị: Tỷ VNĐ</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Doanh thu"
                  dot={{ fill: "#3B82F6", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="cost"
                  stroke="#EF4444"
                  strokeWidth={2}
                  name="Chi phí"
                  dot={{ fill: "#EF4444", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Profit Margin Bar Chart */}
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">
              Tỷ suất Lợi nhuận theo Đơn vị
            </CardTitle>
            <p className="text-gray-600">Đơn vị: %</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={profitMarginData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="margin"
                  name="Tỷ suất LN"
                  radius={[8, 8, 0, 0]}
                  onClick={(data) => {
                    const bu = businessUnits.find(
                      (b) => b.name.replace("Đơn vị ", "") === data.name
                    );
                    if (bu) handleBUClick(bu.id);
                  }}
                  style={{ cursor: "pointer" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">
            KPI Achievement - Đạt Chỉ tiêu
          </CardTitle>
          <p className="text-gray-600">So với mục tiêu 100%</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={kpiData}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis dataKey="subject" stroke="#6B7280" />
              <PolarRadiusAxis angle={90} domain={[0, 120]} stroke="#6B7280" />
              <Radar
                name="BL Miền Bắc"
                dataKey="BL Miền Bắc"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
              />
              <Radar
                name="BL Miền Nam"
                dataKey="BL Miền Nam"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.3}
              />
              <Radar
                name="Bán sỉ"
                dataKey="Bán sỉ"
                stroke="#F59E0B"
                fill="#F59E0B"
                fillOpacity={0.3}
              />
              <Radar
                name="Xuất khẩu"
                dataKey="Xuất khẩu"
                stroke="#8B5CF6"
                fill="#8B5CF6"
                fillOpacity={0.3}
              />
              <Radar
                name="TMĐT"
                dataKey="TMĐT"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.3}
              />
              <Legend />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Table */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">
            Bảng Hiệu suất Chi tiết
          </CardTitle>
          <p className="text-gray-600">Tổng quan các chỉ số theo Đơn vị</p>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Đơn vị Kinh doanh</TableHead>
                <TableHead className="text-right">KPI %</TableHead>
                <TableHead className="text-right">Doanh thu</TableHead>
                <TableHead className="text-right">Chi phí</TableHead>
                <TableHead className="text-right">Lợi nhuận</TableHead>
                <TableHead className="text-right">Chênh lệch</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {performanceData.map((bu, index) => (
                <TableRow
                  key={bu.id}
                  className={index % 2 === 1 ? "bg-gray-50" : ""}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: bu.color }}
                      />
                      <span className="text-gray-900">{bu.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={
                        bu.kpi >= 100
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : bu.kpi >= 90
                          ? "bg-orange-100 text-orange-700 hover:bg-orange-100"
                          : "bg-red-100 text-red-700 hover:bg-red-100"
                      }
                    >
                      {bu.kpi}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-gray-900">
                    ₫{bu.revenue}M
                  </TableCell>
                  <TableCell className="text-right text-gray-900">
                    ₫{bu.cost}M
                  </TableCell>
                  <TableCell className="text-right text-gray-900">
                    ₫{bu.profit}M
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={
                        bu.variance >= 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {bu.variance > 0 ? "+" : ""}
                      {bu.variance}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleBUClick(bu.id)}
                      className="hover:bg-blue-50 hover:text-blue-600"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Xem chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
