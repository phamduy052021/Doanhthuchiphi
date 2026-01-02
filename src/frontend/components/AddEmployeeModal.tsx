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

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: any) => void;
  editData?: Employee | null;
}

export function AddEmployeeModal({
  isOpen,
  onClose,
  onSave,
  editData,
}: AddEmployeeModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    baseSalary: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        role: editData.role,
        baseSalary: editData.baseSalary.toString(),
      });
    } else {
      setFormData({
        name: "",
        role: "",
        baseSalary: "",
      });
    }
  }, [editData, isOpen]);

  const roles = [
    "Giám đốc",
    "Trưởng phòng Bán lẻ",
    "Trưởng phòng Bán sỉ",
    "Trưởng phòng Xuất khẩu",
    "Chuyên viên Kinh doanh",
    "Chuyên viên Marketing",
    "Chuyên viên Kế toán",
    "Nhân viên Hành chính",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.role && formData.baseSalary) {
      const data = {
        ...formData,
        baseSalary: parseFloat(formData.baseSalary),
        totalAllocated: parseFloat(formData.baseSalary),
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
            {editData ? "Chỉnh sửa Nhân viên" : "Thêm Nhân viên mới"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {editData
              ? "Cập nhật thông tin nhân viên"
              : "Tạo hồ sơ nhân viên mới"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="emp-name">
              Tên Nhân viên <span className="text-red-500">*</span>
            </Label>
            <Input
              id="emp-name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Nhập họ và tên"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emp-role">
              Chức vụ <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value) =>
                setFormData({ ...formData, role: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn chức vụ" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emp-salary">
              Lương Cơ bản (₫/tháng) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="emp-salary"
              type="number"
              value={formData.baseSalary}
              onChange={(e) =>
                setFormData({ ...formData, baseSalary: e.target.value })
              }
              placeholder="0"
              required
            />
            {formData.baseSalary && (
              <p className="text-gray-600">
                ₫{(parseFloat(formData.baseSalary) / 1000000).toFixed(1)}M /
                tháng
              </p>
            )}
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
              {editData ? "Cập nhật" : "Thêm nhân viên"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}