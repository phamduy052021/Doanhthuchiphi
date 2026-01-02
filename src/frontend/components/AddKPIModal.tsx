import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface KPI {
  id: string;
  name: string;
  targetValue: number;
  actualValue: number;
  achievementPercent: number;
  responsiblePerson: string;
  unit: string;
}

interface AddKPIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (kpi: any) => void;
  editData?: KPI | null;
}

export function AddKPIModal({
  isOpen,
  onClose,
  onSave,
  editData,
}: AddKPIModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    targetValue: "",
    actualValue: "",
    responsiblePerson: "",
    unit: "triệu ₫",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        targetValue: editData.targetValue.toString(),
        actualValue: editData.actualValue.toString(),
        responsiblePerson: editData.responsiblePerson,
        unit: editData.unit,
      });
    } else {
      setFormData({
        name: "",
        targetValue: "",
        actualValue: "",
        responsiblePerson: "",
        unit: "triệu ₫",
      });
    }
  }, [editData, isOpen]);

  const people = [
    "Trần Văn A",
    "Nguyễn Thị B",
    "Lê Văn C",
    "Phạm Thị D",
    "Hoàng Văn E",
  ];

  const units = ["triệu ₫", "%", "khách hàng", "đơn hàng", "sản phẩm"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.targetValue &&
      formData.actualValue &&
      formData.responsiblePerson
    ) {
      const targetValue = parseFloat(formData.targetValue);
      const actualValue = parseFloat(formData.actualValue);
      const achievementPercent = (actualValue / targetValue) * 100;

      if (editData) {
        onSave({
          ...editData,
          ...formData,
          targetValue,
          actualValue,
          achievementPercent,
        });
      } else {
        onSave({
          ...formData,
          targetValue,
          actualValue,
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-gray-900">
            {editData ? "Chỉnh sửa KPI" : "Thêm KPI mới"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {editData
              ? "Cập nhật thông tin KPI hiện có"
              : "Tạo chỉ tiêu KPI mới cho đơn vị"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="kpi-name">
              Tên KPI <span className="text-red-500">*</span>
            </Label>
            <Input
              id="kpi-name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Ví dụ: Doanh số bán hàng"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="kpi-target">
                Mục tiêu <span className="text-red-500">*</span>
              </Label>
              <Input
                id="kpi-target"
                type="number"
                value={formData.targetValue}
                onChange={(e) =>
                  setFormData({ ...formData, targetValue: e.target.value })
                }
                placeholder="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kpi-actual">
                Thực tế <span className="text-red-500">*</span>
              </Label>
              <Input
                id="kpi-actual"
                type="number"
                value={formData.actualValue}
                onChange={(e) =>
                  setFormData({ ...formData, actualValue: e.target.value })
                }
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="kpi-unit">
              Đơn vị <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.unit}
              onValueChange={(value) =>
                setFormData({ ...formData, unit: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="kpi-person">
              Người phụ trách <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.responsiblePerson}
              onValueChange={(value) =>
                setFormData({ ...formData, responsiblePerson: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn người phụ trách" />
              </SelectTrigger>
              <SelectContent>
                {people.map((person) => (
                  <SelectItem key={person} value={person}>
                    {person}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {editData ? "Cập nhật" : "Thêm KPI"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}