import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import type { User } from "./UsersPage";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: any) => void;
  editData?: User | null;
}

export function AddUserModal({
  isOpen,
  onClose,
  onSave,
  editData,
}: AddUserModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "viewer" as "admin" | "manager" | "viewer" | "editor",
    department: "",
    status: "active" as "active" | "inactive",
    lastLogin: new Date().toLocaleString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).replace("T", " "),
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        email: editData.email,
        role: editData.role,
        department: editData.department,
        status: editData.status,
        lastLogin: editData.lastLogin,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        role: "viewer",
        department: "",
        status: "active",
        lastLogin: new Date().toLocaleString("sv-SE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).replace("T", " "),
      });
    }
  }, [editData, isOpen]);

  const departments = [
    "IT",
    "Bán lẻ Miền Bắc",
    "Bán lẻ Miền Nam",
    "Bán sỉ",
    "Xuất khẩu",
    "Thương mại Điện tử",
    "Kế toán",
    "Nhân sự",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.department) {
      if (editData) {
        onSave({ ...editData, ...formData });
      } else {
        onSave(formData);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-gray-900">
            {editData ? "Chỉnh sửa Người dùng" : "Thêm Người dùng mới"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {editData
              ? "Cập nhật thông tin người dùng"
              : "Tạo tài khoản người dùng mới"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="user-name">
                Họ và tên <span className="text-red-500">*</span>
              </Label>
              <Input
                id="user-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Nguyễn Văn A"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="user-email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="user@company.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="user-role">
                Vai trò <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value: any) =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Quản trị viên</SelectItem>
                  <SelectItem value="manager">Quản lý</SelectItem>
                  <SelectItem value="editor">Biên tập viên</SelectItem>
                  <SelectItem value="viewer">Người xem</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-status">
                Trạng thái <span className="text-red-500">*</span>
              </Label>
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
                  <SelectItem value="inactive">Tạm dừng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-department">
              Phòng ban <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.department}
              onValueChange={(value) =>
                setFormData({ ...formData, department: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn phòng ban" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
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
              {editData ? "Cập nhật" : "Thêm người dùng"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
