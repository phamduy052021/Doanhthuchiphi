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
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface BusinessUnitsTableProps {
  onNavigateToBU: (buId: string) => void;
}

export function BusinessUnitsTable({ onNavigateToBU }: BusinessUnitsTableProps) {
  const businessUnits = [
    {
      id: "bu-001",
      name: "Đơn vị Bán lẻ Miền Bắc",
      leader: "Trần Văn A",
      revenue: "₫15.2 tỷ",
      cost: "₫10.8 tỷ",
      profitPercent: 28.9,
      kpiAchievement: 95,
      status: "excellent",
    },
    {
      id: "bu-002",
      name: "Đơn vị Bán lẻ Miền Nam",
      leader: "Nguyễn Thị B",
      revenue: "₫18.5 tỷ",
      cost: "₫12.3 tỷ",
      profitPercent: 33.5,
      kpiAchievement: 102,
      status: "excellent",
    },
    {
      id: "bu-003",
      name: "Đơn vị Bán sỉ",
      leader: "Lê Văn C",
      revenue: "₫8.4 tỷ",
      cost: "₫6.2 tỷ",
      profitPercent: 26.2,
      kpiAchievement: 88,
      status: "good",
    },
    {
      id: "bu-004",
      name: "Đơn vị Xuất khẩu",
      leader: "Phạm Thị D",
      revenue: "₫3.7 tỷ",
      cost: "₫3.1 tỷ",
      profitPercent: 16.2,
      kpiAchievement: 72,
      status: "warning",
    },
  ];

  const getKPIBadge = (achievement: number, status: string) => {
    if (status === "excellent") {
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          {achievement}%
        </Badge>
      );
    } else if (status === "good") {
      return (
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
          <AlertCircle className="w-3 h-3 mr-1" />
          {achievement}%
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
          <XCircle className="w-3 h-3 mr-1" />
          {achievement}%
        </Badge>
      );
    }
  };

  return (
    <Card className="rounded-xl shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-900">
          Danh sách Đơn vị Kinh doanh
        </CardTitle>
        <p className="text-gray-600">Tổng quan hiệu suất các đơn vị</p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên Đơn vị</TableHead>
              <TableHead>Trưởng phòng</TableHead>
              <TableHead className="text-right">Tổng Doanh thu</TableHead>
              <TableHead className="text-right">Tổng Chi phí</TableHead>
              <TableHead className="text-right">Lợi nhuận %</TableHead>
              <TableHead className="text-right">Đạt KPI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {businessUnits.map((bu) => (
              <TableRow
                key={bu.id}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => onNavigateToBU(bu.id)}
              >
                <TableCell>
                  <span className="text-blue-600 hover:text-blue-800">
                    {bu.name}
                  </span>
                </TableCell>
                <TableCell className="text-gray-700">{bu.leader}</TableCell>
                <TableCell className="text-right text-gray-900">
                  {bu.revenue}
                </TableCell>
                <TableCell className="text-right text-gray-900">
                  {bu.cost}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={
                      bu.profitPercent > 30
                        ? "text-green-600"
                        : bu.profitPercent > 20
                        ? "text-blue-600"
                        : "text-orange-600"
                    }
                  >
                    {bu.profitPercent}%
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {getKPIBadge(bu.kpiAchievement, bu.status)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
