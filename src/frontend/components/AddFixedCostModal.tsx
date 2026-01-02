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

interface AddFixedCostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cost: any) => void;
  editData?: FixedCost | null;
}

export function AddFixedCostModal({
  isOpen,
  onClose,
  onSave,
  editData,
}: AddFixedCostModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    totalAmount: "",
    month: "",
    allocationType: "percentage" as "percentage" | "fixed",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        totalAmount: editData.totalAmount.toString(),
        month: editData.month,
        allocationType: editData.allocationType,
      });
    } else {
      const today = new Date();
      const currentMonth = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}`;
      setFormData({
        name: "",
        totalAmount: "",
        month: currentMonth,
        allocationType: "percentage",
      });
    }
  }, [editData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.totalAmount && formData.month) {
      const data = {
        ...formData,
        totalAmount: parseFloat(formData.totalAmount),
        allocations: editData ? editData.allocations : [],
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
            {editData ? "Chỉnh sửa Chi phí" : "Thêm Chi phí Cố định"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {editData
              ? "Cập nhật thông tin chi phí cố định"
              : "Tạo mục chi phí cố định mới"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fc-name">
              Tên Chi phí <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fc-name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Ví dụ: Tiền thuê văn phòng"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fc-amount">
              Tổng Số tiền (₫) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fc-amount"
              type="number"
              value={formData.totalAmount}
              onChange={(e) =>
                setFormData({ ...formData, totalAmount: e.target.value })
              }
              placeholder="0"
              required
            />
            {formData.totalAmount && (
              <p className="text-gray-600">
                ₫{(parseFloat(formData.totalAmount) / 1000000).toFixed(1)}M
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fc-month">
              Tháng <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fc-month"
              type="month"
              value={formData.month}
              onChange={(e) =>
                setFormData({ ...formData, month: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fc-allocation">
              Phương thức Phân bổ <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.allocationType}
              onValueChange={(value: "percentage" | "fixed") =>
                setFormData({ ...formData, allocationType: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Theo Phần trăm</SelectItem>
                <SelectItem value="fixed">Cố định</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-gray-600">
              {formData.allocationType === "percentage"
                ? "Chi phí sẽ được phân bổ theo tỷ lệ % cho mỗi đơn vị"
                : "Chi phí sẽ được phân bổ với số tiền cố định cho mỗi đơn vị"}
            </p>
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