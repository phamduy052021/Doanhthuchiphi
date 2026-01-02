import { useState, useEffect } from "react";
import { X, TrendingUp, DollarSign, Target } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import type { BusinessUnit } from "./BusinessUnitsPage";

interface BUDetailsDrawerProps {
  bu: BusinessUnit | null;
  mode: "view" | "edit";
  isOpen: boolean;
  onClose: () => void;
  onSave: (bu: BusinessUnit) => void;
}

export function BUDetailsDrawer({
  bu,
  mode,
  isOpen,
  onClose,
  onSave,
}: BUDetailsDrawerProps) {
  const [formData, setFormData] = useState<BusinessUnit | null>(null);

  useEffect(() => {
    if (bu) {
      setFormData(bu);
    }
  }, [bu]);

  if (!bu || !formData) return null;

  const isEditMode = mode === "edit";

  const leaders = [
    "Trần Văn A",
    "Nguyễn Thị B",
    "Lê Văn C",
    "Phạm Thị D",
    "Hoàng Văn E",
  ];

  const monthlyData = [
    {
      month: "Tháng 9/2025",
      kpi: 92,
      revenue: "₫3.8 tỷ",
      cost: "₫2.7 tỷ",
      profit: "₫1.1 tỷ",
    },
    {
      month: "Tháng 10/2025",
      kpi: 88,
      revenue: "₫3.7 tỷ",
      cost: "₫2.8 tỷ",
      profit: "₫0.9 tỷ",
    },
    {
      month: "Tháng 11/2025",
      kpi: 95,
      revenue: "₫4.2 tỷ",
      cost: "₫2.9 tỷ",
      profit: "₫1.3 tỷ",
    },
  ];

  const handleSubmit = () => {
    if (formData) {
      onSave(formData);
    }
  };

  const handleViewDetails = () => {
    console.log("Navigate to KPI/Revenue Management page for BU:", bu.id);
    // This would navigate to a detailed KPI/Revenue management page
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetTitle className="sr-only">
          {isEditMode ? "Chỉnh sửa Đơn vị" : "Chi tiết Đơn vị"}
        </SheetTitle>
        <SheetDescription className="sr-only">
          {isEditMode
            ? "Cập nhật thông tin đơn vị kinh doanh"
            : "Xem thông tin chi tiết đơn vị kinh doanh"}
        </SheetDescription>
        <div className="space-y-6 py-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-900 mb-1">
                {isEditMode ? "Chỉnh sửa Đơn vị" : "Chi tiết Đơn vị"}
              </h2>
              <p className="text-gray-600">
                {isEditMode
                  ? "Cập nhật thông tin đơn vị kinh doanh"
                  : "Xem thông tin chi tiết đơn vị kinh doanh"}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Tên Đơn vị</Label>
              {isEditMode ? (
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              ) : (
                <p className="text-gray-900">{formData.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Ngày Bắt đầu</Label>
              {isEditMode ? (
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              ) : (
                <p className="text-gray-900">
                  {new Date(formData.startDate).toLocaleDateString("vi-VN")}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="leader">Trưởng phòng</Label>
              {isEditMode ? (
                <Select
                  value={formData.leader}
                  onValueChange={(value) =>
                    setFormData({ ...formData, leader: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {leaders.map((leader) => (
                      <SelectItem key={leader} value={leader}>
                        {leader}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-gray-900">{formData.leader}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">Mục tiêu</Label>
              {isEditMode ? (
                <Input
                  id="goal"
                  value={formData.goal}
                  onChange={(e) =>
                    setFormData({ ...formData, goal: e.target.value })
                  }
                />
              ) : (
                <p className="text-gray-900">{formData.goal}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              {isEditMode ? (
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                />
              ) : (
                <p className="text-gray-700">{formData.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              {isEditMode ? (
                <Select
                  value={formData.status}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Tạm ngưng</SelectItem>
                    <SelectItem value="planning">Lên kế hoạch</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div>
                  {formData.status === "active" && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Hoạt động
                    </Badge>
                  )}
                  {formData.status === "inactive" && (
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                      Tạm ngưng
                    </Badge>
                  )}
                  {formData.status === "planning" && (
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                      Lên kế hoạch
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Monthly Breakdown */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-900 mb-1">Hiệu suất theo Tháng</h3>
                <p className="text-gray-600">Tổng quan KPI, Doanh thu, Chi phí</p>
              </div>
              <Button
                variant="outline"
                onClick={handleViewDetails}
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Xem Chi tiết
              </Button>
            </div>

            <div className="space-y-3">
              {monthlyData.map((data, index) => (
                <Card key={index} className="rounded-xl border-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-gray-900">
                        {data.month}
                      </CardTitle>
                      <Badge
                        className={
                          data.kpi >= 90
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-orange-100 text-orange-700 hover:bg-orange-100"
                        }
                      >
                        KPI: {data.kpi}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-start gap-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <DollarSign className="w-4 h-4 text-blue-700" />
                        </div>
                        <div>
                          <p className="text-gray-600">Doanh thu</p>
                          <p className="text-gray-900">{data.revenue}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Target className="w-4 h-4 text-orange-700" />
                        </div>
                        <div>
                          <p className="text-gray-600">Chi phí</p>
                          <p className="text-gray-900">{data.cost}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <TrendingUp className="w-4 h-4 text-green-700" />
                        </div>
                        <div>
                          <p className="text-gray-600">Lợi nhuận</p>
                          <p className="text-gray-900">{data.profit}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <Button variant="outline" onClick={onClose} className="flex-1">
              {isEditMode ? "Hủy" : "Đóng"}
            </Button>
            {isEditMode && (
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Lưu thay đổi
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}