import { useState } from "react";
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

interface FixedCostAllocation {
  id: string;
  costName: string;
  allocationType: "percent" | "fixed";
  value: number;
  allocatedAmount: number;
  month: string;
}

interface FixedCostsTabBUProps {
  buName: string;
  month: string;
  year: string;
}

export function FixedCostsTabBU({
  buName,
  month,
  year,
}: FixedCostsTabBUProps) {
  const [allocations] = useState<FixedCostAllocation[]>([
    {
      id: "alloc-001",
      costName: "Thuê văn phòng",
      allocationType: "percent",
      value: 25,
      allocatedAmount: 50000000,
      month: "11",
    },
    {
      id: "alloc-002",
      costName: "Lương nhân viên hành chính",
      allocationType: "fixed",
      value: 150000000,
      allocatedAmount: 150000000,
      month: "11",
    },
    {
      id: "alloc-003",
      costName: "Điện nước",
      allocationType: "percent",
      value: 20,
      allocatedAmount: 8000000,
      month: "11",
    },
    {
      id: "alloc-004",
      costName: "Bảo hiểm",
      allocationType: "percent",
      value: 30,
      allocatedAmount: 15000000,
      month: "11",
    },
    {
      id: "alloc-005",
      costName: "Khấu hao thiết bị",
      allocationType: "fixed",
      value: 25000000,
      allocatedAmount: 25000000,
      month: "11",
    },
  ]);

  const totalAllocated = allocations.reduce(
    (sum, alloc) => sum + alloc.allocatedAmount,
    0
  );

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="p-6">
            <p className="text-gray-600 mb-2">Tổng Chi phí Cố định</p>
            <p className="text-gray-900">
              {new Intl.NumberFormat("vi-VN").format(totalAllocated)} ₫
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="p-6">
            <p className="text-gray-600 mb-2">Số mục phân bổ</p>
            <p className="text-gray-900">{allocations.length}</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="p-6">
            <p className="text-gray-600 mb-2">Phân bổ TB/mục</p>
            <p className="text-gray-900">
              {new Intl.NumberFormat("vi-VN").format(
                allocations.length > 0 ? totalAllocated / allocations.length : 0
              )}{" "}
              ₫
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Costs Table */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardContent className="p-0">
          <div className="p-6 border-b border-gray-200">
            <div>
              <h2 className="text-gray-900 mb-1">
                Chi phí Cố định được Phân bổ
              </h2>
              <p className="text-gray-600">
                Các chi phí cố định được phân bổ cho đơn vị này
              </p>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên chi phí</TableHead>
                <TableHead>Loại phân bổ</TableHead>
                <TableHead className="text-right">Giá trị</TableHead>
                <TableHead className="text-right">Số tiền phân bổ</TableHead>
                <TableHead>Tháng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allocations.map((alloc, index) => (
                <TableRow
                  key={alloc.id}
                  className={index % 2 === 1 ? "bg-gray-50" : ""}
                >
                  <TableCell>
                    <span className="text-gray-900">{alloc.costName}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        alloc.allocationType === "percent"
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                          : "bg-green-100 text-green-700 hover:bg-green-100"
                      }
                    >
                      {alloc.allocationType === "percent"
                        ? "Theo tỷ lệ"
                        : "Cố định"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-gray-700">
                    {alloc.allocationType === "percent"
                      ? `${alloc.value}%`
                      : `${new Intl.NumberFormat("vi-VN").format(alloc.value)} ₫`}
                  </TableCell>
                  <TableCell className="text-right text-gray-900">
                    {new Intl.NumberFormat("vi-VN").format(
                      alloc.allocatedAmount
                    )}{" "}
                    ₫
                  </TableCell>
                  <TableCell className="text-gray-700">
                    Tháng {alloc.month}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Info Box */}
      <Card className="rounded-xl shadow-sm border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="text-blue-900 mb-2">Thông tin</h3>
          <p className="text-blue-700">
            Chi phí cố định được quản lý tập trung và tự động phân bổ cho các
            đơn vị. Để chỉnh sửa, vui lòng truy cập trang{" "}
            <span className="font-semibold">Quản lý Chi phí Cố định</span> trong
            menu chính.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
