import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface RevenueSource {
  id: string;
  name: string;
  unit: string;
  unitPrice: number;
  growthPercent: number;
  churnPercent: number;
  cumulative: number;
}

interface AddRevenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (revenue: any) => void;
  editData?: RevenueSource | null;
}

export function AddRevenueModal({
  isOpen,
  onClose,
  onSave,
  editData,
}: AddRevenueModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    unit: "",
    unitPrice: "",
    growthPercent: "",
    churnPercent: "",
    cumulative: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        unit: editData.unit,
        unitPrice: editData.unitPrice.toString(),
        growthPercent: editData.growthPercent.toString(),
        churnPercent: editData.churnPercent.toString(),
        cumulative: editData.cumulative.toString(),
      });
    } else {
      setFormData({
        name: "",
        unit: "",
        unitPrice: "",
        growthPercent: "",
        churnPercent: "",
        cumulative: "",
      });
    }
  }, [editData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.unit &&
      formData.unitPrice &&
      formData.growthPercent &&
      formData.churnPercent &&
      formData.cumulative
    ) {
      const data = {
        ...formData,
        unitPrice: parseFloat(formData.unitPrice),
        growthPercent: parseFloat(formData.growthPercent),
        churnPercent: parseFloat(formData.churnPercent),
        cumulative: parseInt(formData.cumulative),
      };

      if (editData) {
        onSave({ ...editData, ...data });
      } else {
        onSave(data);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-gray-900">
            {editData ? "Chỉnh sửa Doanh thu" : "Thêm Doanh thu mới"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {editData
              ? "Cập nhật thông tin doanh thu"
              : "Tạo bản ghi doanh thu mới"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="rev-name">
              Tên nguồn <span className="text-red-500">*</span>
            </Label>
            <Input
              id="rev-name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Ví dụ: Bán lẻ tại cửa hàng"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rev-unit">
                Đơn vị <span className="text-red-500">*</span>
              </Label>
              <Input
                id="rev-unit"
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
                placeholder="Ví dụ: Đơn hàng"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rev-price">
                Đơn giá (₫) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="rev-price"
                type="number"
                value={formData.unitPrice}
                onChange={(e) =>
                  setFormData({ ...formData, unitPrice: e.target.value })
                }
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rev-growth">
                Tăng trưởng % <span className="text-red-500">*</span>
              </Label>
              <Input
                id="rev-growth"
                type="number"
                step="0.1"
                value={formData.growthPercent}
                onChange={(e) =>
                  setFormData({ ...formData, growthPercent: e.target.value })
                }
                placeholder="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rev-churn">
                Rời bỏ % <span className="text-red-500">*</span>
              </Label>
              <Input
                id="rev-churn"
                type="number"
                step="0.1"
                value={formData.churnPercent}
                onChange={(e) =>
                  setFormData({ ...formData, churnPercent: e.target.value })
                }
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rev-cumulative">
              Tích lũy <span className="text-red-500">*</span>
            </Label>
            <Input
              id="rev-cumulative"
              type="number"
              value={formData.cumulative}
              onChange={(e) =>
                setFormData({ ...formData, cumulative: e.target.value })
              }
              placeholder="0"
              required
            />
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
              {editData ? "Cập nhật" : "Thêm nguồn"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}