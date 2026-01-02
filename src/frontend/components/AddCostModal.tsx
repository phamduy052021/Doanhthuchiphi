import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
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

interface VariableCost {
  id: string;
  type: string;
  description: string;
  amount: number;
  month: string;
}

interface AddCostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cost: any) => void;
  editData?: VariableCost | null;
  costType: "variable";
}

export function AddCostModal({
  isOpen,
  onClose,
  onSave,
  editData,
  costType,
}: AddCostModalProps) {
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    amount: "",
    month: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        type: editData.type,
        description: editData.description,
        amount: editData.amount.toString(),
        month: editData.month,
      });
    } else {
      const today = new Date();
      const currentMonth = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}`;
      setFormData({
        type: "",
        description: "",
        amount: "",
        month: currentMonth,
      });
    }
  }, [editData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.type && formData.description && formData.amount && formData.month) {
      const data = {
        ...formData,
        amount: parseFloat(formData.amount),
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
            {editData ? "Chỉnh sửa Chi phí" : "Thêm Chi phí mới"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {editData
              ? "Cập nhật thông tin chi phí"
              : "Tạo bản ghi chi phí mới"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cost-type">
              Loại Chi phí <span className="text-red-500">*</span>
            </Label>
            <Input
              id="cost-type"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              placeholder="Ví dụ: Chi phí nguyên vật liệu"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cost-description">
              Mô tả <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="cost-description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Mô tả chi tiết về chi phí"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cost-amount">
              Số tiền (₫) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="cost-amount"
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              placeholder="0"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cost-month">
              Tháng <span className="text-red-500">*</span>
            </Label>
            <Input
              id="cost-month"
              type="month"
              value={formData.month}
              onChange={(e) =>
                setFormData({ ...formData, month: e.target.value })
              }
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
              {editData ? "Cập nhật" : "Thêm chi phí"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}