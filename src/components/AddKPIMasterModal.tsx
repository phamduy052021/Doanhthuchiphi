import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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

interface AddKPIMasterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (kpi: Omit<KPIMaster, "id" | "achievementRate"> | KPIMaster) => void;
  editData?: KPIMaster | null;
}

export function AddKPIMasterModal({
  isOpen,
  onClose,
  onSave,
  editData,
}: AddKPIMasterModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "revenue" as KPIMaster["category"],
    businessUnit: "",
    businessUnitId: "",
    targetValue: 0,
    actualValue: 0,
    unit: "VND",
    responsiblePerson: "",
    responsiblePersonId: "",
    month: "11",
    year: "2025",
    status: "on-track" as KPIMaster["status"],
    linkedRevenue: 0,
    linkedCost: 0,
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        category: editData.category,
        businessUnit: editData.businessUnit,
        businessUnitId: editData.businessUnitId,
        targetValue: editData.targetValue,
        actualValue: editData.actualValue,
        unit: editData.unit,
        responsiblePerson: editData.responsiblePerson,
        responsiblePersonId: editData.responsiblePersonId,
        month: editData.month,
        year: editData.year,
        status: editData.status,
        linkedRevenue: editData.linkedRevenue || 0,
        linkedCost: editData.linkedCost || 0,
      });
    } else {
      setFormData({
        name: "",
        category: "revenue",
        businessUnit: "",
        businessUnitId: "",
        targetValue: 0,
        actualValue: 0,
        unit: "VND",
        responsiblePerson: "",
        responsiblePersonId: "",
        month: "11",
        year: "2025",
        status: "on-track",
        linkedRevenue: 0,
        linkedCost: 0,
      });
    }
  }, [editData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editData) {
      onSave({ ...formData, id: editData.id, achievementRate: 0 });
    } else {
      onSave(formData);
    }
  };

  const handleBUChange = (value: string) => {
    const buMap: { [key: string]: { id: string; name: string } } = {
      "bu-001": { id: "bu-001", name: "Đơn vị Bán lẻ Miền Bắc" },
      "bu-002": { id: "bu-002", name: "Đơn vị Bán lẻ Miền Nam" },
      "bu-003": { id: "bu-003", name: "Đơn vị Sản xuất" },
      "bu-004": { id: "bu-004", name: "Đơn vị Logistics" },
    };
    setFormData({
      ...formData,
      businessUnitId: value,
      businessUnit: buMap[value]?.name || "",
    });
  };

  const handleEmployeeChange = (value: string) => {
    const empMap: { [key: string]: { id: string; name: string } } = {
      "emp-001": { id: "emp-001", name: "Trần Văn A" },
      "emp-002": { id: "emp-002", name: "Nguyễn Thị B" },
      "emp-003": { id: "emp-003", name: "Lê Văn C" },
      "emp-004": { id: "emp-004", name: "Phạm Thị D" },
      "emp-005": { id: "emp-005", name: "Hoàng Văn E" },
    };
    setFormData({
      ...formData,
      responsiblePersonId: value,
      responsiblePerson: empMap[value]?.name || "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editData ? "Chỉnh sửa KPI" : "Thêm KPI mới"}
          </DialogTitle>
          <DialogDescription>
            {editData
              ? "Cập nhật thông tin KPI"
              : "Nhập thông tin KPI mới cho hệ thống"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên KPI *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Ví dụ: Doanh thu tháng"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Loại KPI *</Label>
              <Select
                value={formData.category}
                onValueChange={(value: KPIMaster["category"]) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Doanh thu</SelectItem>
                  <SelectItem value="cost">Chi phí</SelectItem>
                  <SelectItem value="efficiency">Hiệu suất</SelectItem>
                  <SelectItem value="quality">Chất lượng</SelectItem>
                  <SelectItem value="customer">Khách hàng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessUnit">Đơn vị Kinh doanh *</Label>
              <Select
                value={formData.businessUnitId}
                onValueChange={handleBUChange}
              >
                <SelectTrigger id="businessUnit">
                  <SelectValue placeholder="Chọn đơn vị" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bu-001">Bán lẻ Miền Bắc</SelectItem>
                  <SelectItem value="bu-002">Bán lẻ Miền Nam</SelectItem>
                  <SelectItem value="bu-003">Sản xuất</SelectItem>
                  <SelectItem value="bu-004">Logistics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsiblePerson">Người phụ trách *</Label>
              <Select
                value={formData.responsiblePersonId}
                onValueChange={handleEmployeeChange}
              >
                <SelectTrigger id="responsiblePerson">
                  <SelectValue placeholder="Chọn nhân viên" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emp-001">Trần Văn A</SelectItem>
                  <SelectItem value="emp-002">Nguyễn Thị B</SelectItem>
                  <SelectItem value="emp-003">Lê Văn C</SelectItem>
                  <SelectItem value="emp-004">Phạm Thị D</SelectItem>
                  <SelectItem value="emp-005">Hoàng Văn E</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetValue">Mục tiêu *</Label>
              <Input
                id="targetValue"
                type="number"
                value={formData.targetValue}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    targetValue: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actualValue">Giá trị thực tế *</Label>
              <Input
                id="actualValue"
                type="number"
                value={formData.actualValue}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    actualValue: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Đơn vị *</Label>
              <Select
                value={formData.unit}
                onValueChange={(value) =>
                  setFormData({ ...formData, unit: value })
                }
              >
                <SelectTrigger id="unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VND">VND</SelectItem>
                  <SelectItem value="%">%</SelectItem>
                  <SelectItem value="Khách">Khách</SelectItem>
                  <SelectItem value="Đơn hàng">Đơn hàng</SelectItem>
                  <SelectItem value="Điểm">Điểm</SelectItem>
                  <SelectItem value="Giờ">Giờ</SelectItem>
                  <SelectItem value="Chiếc">Chiếc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="month">Tháng</Label>
              <Select
                value={formData.month}
                onValueChange={(value) =>
                  setFormData({ ...formData, month: value })
                }
              >
                <SelectTrigger id="month">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <SelectItem key={m} value={m.toString()}>
                      Tháng {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Năm</Label>
              <Select
                value={formData.year}
                onValueChange={(value) =>
                  setFormData({ ...formData, year: value })
                }
              >
                <SelectTrigger id="year">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(formData.category === "revenue" || formData.category === "cost") && (
            <div className="grid grid-cols-2 gap-4">
              {formData.category === "revenue" && (
                <div className="space-y-2">
                  <Label htmlFor="linkedRevenue">Doanh thu liên kết (VND)</Label>
                  <Input
                    id="linkedRevenue"
                    type="number"
                    value={formData.linkedRevenue}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        linkedRevenue: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="0"
                  />
                  <p className="text-gray-600">
                    Liên kết với nguồn doanh thu
                  </p>
                </div>
              )}
              {formData.category === "cost" && (
                <div className="space-y-2">
                  <Label htmlFor="linkedCost">Chi phí liên kết (VND)</Label>
                  <Input
                    id="linkedCost"
                    type="number"
                    value={formData.linkedCost}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        linkedCost: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="0"
                  />
                  <p className="text-gray-600">
                    Liên kết với chi phí cố định/biến đổi
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {editData ? "Cập nhật" : "Thêm KPI"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
