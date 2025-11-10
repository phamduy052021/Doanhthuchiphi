import { useState } from "react";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
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
import { BUDetailsDrawer } from "./BUDetailsDrawer";
import { AddBUModal } from "./AddBUModal";

export interface BusinessUnit {
  id: string;
  name: string;
  startDate: string;
  leader: string;
  goal: string;
  description: string;
  status: "active" | "inactive" | "planning";
}

interface BusinessUnitsPageProps {
  onNavigateToBU?: (buId: string) => void;
}

export function BusinessUnitsPage({ onNavigateToBU }: BusinessUnitsPageProps = {}) {
  const [businessUnits, setBusinessUnits] = useState<BusinessUnit[]>([
    {
      id: "bu-001",
      name: "Đơn vị Bán lẻ Miền Bắc",
      startDate: "2023-01-15",
      leader: "Trần Văn A",
      goal: "Tăng trưởng doanh thu 15% so với năm trước",
      description:
        "Quản lý các hoạt động bán lẻ tại khu vực miền Bắc, bao gồm Hà Nội và các tỉnh lân cận.",
      status: "active",
    },
    {
      id: "bu-002",
      name: "Đơn vị Bán lẻ Miền Nam",
      startDate: "2023-02-01",
      leader: "Nguyễn Thị B",
      goal: "Mở rộng 10 cửa hàng mới trong năm",
      description:
        "Phát triển mạng lưới bán lẻ tại khu vực miền Nam, tập trung vào TP.HCM và các tỉnh phía Nam.",
      status: "active",
    },
    {
      id: "bu-003",
      name: "Đơn vị Bán sỉ",
      startDate: "2022-06-10",
      leader: "Lê Văn C",
      goal: "Tăng số lượng đối tác phân phối lên 25%",
      description:
        "Quản lý hoạt động bán sỉ cho các đối tác phân phối trên toàn quốc.",
      status: "active",
    },
    {
      id: "bu-004",
      name: "Đơn vị Xuất khẩu",
      startDate: "2024-01-01",
      leader: "Phạm Thị D",
      goal: "Đạt doanh thu xuất khẩu 5 triệu USD",
      description:
        "Phát triển thị trường xuất khẩu sang các nước Đông Nam Á và châu Âu.",
      status: "planning",
    },
    {
      id: "bu-005",
      name: "Đơn vị Thương mại Điện tử",
      startDate: "2023-08-15",
      leader: "Hoàng Văn E",
      goal: "Tăng traffic website 50%",
      description:
        "Vận hành các kênh bán hàng trực tuyến và phát triển nền tảng e-commerce.",
      status: "active",
    },
  ]);

  const [selectedBU, setSelectedBU] = useState<BusinessUnit | null>(null);
  const [drawerMode, setDrawerMode] = useState<"view" | "edit">("view");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleView = (bu: BusinessUnit) => {
    setSelectedBU(bu);
    setDrawerMode("view");
    setIsDrawerOpen(true);
  };

  const handleEdit = (bu: BusinessUnit) => {
    setSelectedBU(bu);
    setDrawerMode("edit");
    setIsDrawerOpen(true);
  };

  const handleDelete = (buId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa đơn vị kinh doanh này?")) {
      setBusinessUnits(businessUnits.filter((bu) => bu.id !== buId));
    }
  };

  const handleSave = (updatedBU: BusinessUnit) => {
    setBusinessUnits(
      businessUnits.map((bu) => (bu.id === updatedBU.id ? updatedBU : bu))
    );
    setIsDrawerOpen(false);
  };

  const handleAddBU = (newBU: Omit<BusinessUnit, "id">) => {
    const bu: BusinessUnit = {
      ...newBU,
      id: `bu-${Date.now()}`,
    };
    setBusinessUnits([...businessUnits, bu]);
    setIsAddModalOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Hoạt động
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
            Tạm ngưng
          </Badge>
        );
      case "planning":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Lên kế hoạch
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Đơn vị Kinh doanh</h1>
          <p className="text-gray-600">
            Quản lý thông tin các đơn vị kinh doanh
          </p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm ĐV
        </Button>
      </div>

      {/* Table */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên Đơn vị</TableHead>
                <TableHead>Ngày Bắt đầu</TableHead>
                <TableHead>Trưởng phòng</TableHead>
                <TableHead>Mục tiêu</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {businessUnits.map((bu, index) => (
                <TableRow
                  key={bu.id}
                  className={index % 2 === 1 ? "bg-gray-50" : ""}
                >
                  <TableCell>
                    <span className="text-gray-900">{bu.name}</span>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(bu.startDate).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell className="text-gray-700">{bu.leader}</TableCell>
                  <TableCell className="text-gray-600 max-w-xs truncate">
                    {bu.goal}
                  </TableCell>
                  <TableCell className="text-gray-600 max-w-xs truncate">
                    {bu.description}
                  </TableCell>
                  <TableCell>{getStatusBadge(bu.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (onNavigateToBU) {
                            onNavigateToBU(bu.id);
                          } else {
                            handleView(bu);
                          }
                        }}
                        className="hover:bg-blue-50 hover:text-blue-600"
                        title={onNavigateToBU ? "Xem chi tiết hiệu suất" : "Xem thông tin"}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(bu)}
                        className="hover:bg-orange-50 hover:text-orange-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(bu.id)}
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

      {/* Details Drawer */}
      <BUDetailsDrawer
        bu={selectedBU}
        mode={drawerMode}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleSave}
      />

      {/* Add BU Modal */}
      <AddBUModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddBU}
      />
    </div>
  );
}