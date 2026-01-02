import { useState } from "react";
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
import { Textarea } from "./ui/textarea";

interface AddBUModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (bu: Omit<BusinessUnit, "id">) => void;
}

export function AddBUModal({ isOpen, onClose, onAdd }: AddBUModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    leader: "",
    goal: "",
    description: "",
    status: "planning" as "active" | "inactive" | "planning",
  });

  const leaders = [
    "Trần Văn A",
    "Nguyễn Thị B",
    "Lê Văn C",
    "Phạm Thị D",
    "Hoàng Văn E",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.startDate &&
      formData.leader &&
      formData.goal
    ) {
      onAdd(formData);
      setFormData({
        name: "",
        startDate: "",
        leader: "",
        goal: "",
        description: "",
        status: "planning",
      });
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      startDate: "",
      leader: "",
      goal: "",
      description: "",
      status: "planning",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-gray-900">
            Thêm Đơn vị Kinh doanh mới
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Nhập thông tin để tạo đơn vị kinh doanh mới
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="add-name">
              Tên Đơn vị <span className="text-red-500">*</span>
            </Label>
            <Input
              id="add-name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Nhập tên đơn vị kinh doanh"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-startDate">
              Ngày Bắt đầu <span className="text-red-500">*</span>
            </Label>
            <Input
              id="add-startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-leader">
              Trưởng phòng <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.leader}
              onValueChange={(value) =>
                setFormData({ ...formData, leader: value })
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trưởng phòng" />
              </SelectTrigger>
              <SelectContent>
                {leaders.map((leader) => (
                  <SelectItem key={leader} value={leader}>
                    {leader}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-goal">
              Mục tiêu <span className="text-red-500">*</span>
            </Label>
            <Input
              id="add-goal"
              value={formData.goal}
              onChange={(e) =>
                setFormData({ ...formData, goal: e.target.value })
              }
              placeholder="Nhập mục tiêu của đơn vị"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-description">Mô tả</Label>
            <Textarea
              id="add-description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Nhập mô tả chi tiết"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-status">Trạng thái</Label>
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
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Thêm Đơn vị
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}