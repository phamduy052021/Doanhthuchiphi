import { useState } from "react";
import { Plus, Edit, Trash2, Shield, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { AddUserModal } from "./AddUserModal";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "viewer" | "editor";
  department: string;
  status: "active" | "inactive";
  lastLogin: string;
}

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "user-001",
      name: "Nguyễn Quản lý",
      email: "admin@company.com",
      role: "admin",
      department: "IT",
      status: "active",
      lastLogin: "2025-11-10 14:30",
    },
    {
      id: "user-002",
      name: "Trần Văn A",
      email: "trana@company.com",
      role: "manager",
      department: "Bán lẻ Miền Bắc",
      status: "active",
      lastLogin: "2025-11-10 10:15",
    },
    {
      id: "user-003",
      name: "Nguyễn Thị B",
      email: "nguyenb@company.com",
      role: "editor",
      department: "Bán lẻ Miền Nam",
      status: "active",
      lastLogin: "2025-11-09 16:45",
    },
    {
      id: "user-004",
      name: "Lê Văn C",
      email: "lec@company.com",
      role: "manager",
      department: "Bán sỉ",
      status: "active",
      lastLogin: "2025-11-10 09:20",
    },
    {
      id: "user-005",
      name: "Phạm Thị D",
      email: "phamd@company.com",
      role: "viewer",
      department: "Xuất khẩu",
      status: "inactive",
      lastLogin: "2025-11-05 11:00",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsAddModalOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleAddUser = (newUser: Omit<User, "id">) => {
    const user: User = {
      ...newUser,
      id: `user-${Date.now()}`,
    };
    setUsers([...users, user]);
    setIsAddModalOpen(false);
    setEditingUser(null);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setIsAddModalOpen(false);
    setEditingUser(null);
  };

  const getRoleColor = (role: string) => {
    const colors = {
      admin: "bg-purple-100 text-purple-700 hover:bg-purple-100",
      manager: "bg-blue-100 text-blue-700 hover:bg-blue-100",
      editor: "bg-green-100 text-green-700 hover:bg-green-100",
      viewer: "bg-gray-100 text-gray-700 hover:bg-gray-100",
    };
    return colors[role as keyof typeof colors] || colors.viewer;
  };

  const getRoleLabel = (role: string) => {
    const labels = {
      admin: "Quản trị viên",
      manager: "Quản lý",
      editor: "Biên tập viên",
      viewer: "Người xem",
    };
    return labels[role as keyof typeof labels] || role;
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-700 hover:bg-green-100"
      : "bg-red-100 text-red-700 hover:bg-red-100";
  };

  const roleStats = {
    admin: users.filter((u) => u.role === "admin").length,
    manager: users.filter((u) => u.role === "manager").length,
    editor: users.filter((u) => u.role === "editor").length,
    viewer: users.filter((u) => u.role === "viewer").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Quản lý Người dùng</h1>
          <p className="text-gray-600">
            Tổng số: {users.length} người dùng | Đang hoạt động:{" "}
            {users.filter((u) => u.status === "active").length}
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingUser(null);
            setIsAddModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm Người dùng
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-all duration-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-600">Quản trị viên</CardTitle>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900">{roleStats.admin}</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-all duration-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-600">Quản lý</CardTitle>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900">{roleStats.manager}</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-all duration-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-600">Biên tập viên</CardTitle>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Edit className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900">{roleStats.editor}</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-all duration-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-600">Người xem</CardTitle>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900">{roleStats.viewer}</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Phòng ban</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Đăng nhập cuối</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow
                  key={user.id}
                  className={index % 2 === 1 ? "bg-gray-50" : ""}
                >
                  <TableCell>
                    <span className="text-gray-900">{user.name}</span>
                  </TableCell>
                  <TableCell className="text-gray-700">{user.email}</TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>
                      {getRoleLabel(user.role)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {user.department}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status === "active" ? "Hoạt động" : "Tạm dừng"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {user.lastLogin}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditUser(user)}
                        className="hover:bg-orange-50 hover:text-orange-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteUser(user.id)}
                        className="hover:bg-red-50 hover:text-red-600"
                        disabled={user.role === "admin"}
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

      {/* Add/Edit User Modal */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingUser(null);
        }}
        onSave={editingUser ? handleUpdateUser : handleAddUser}
        editData={editingUser}
      />
    </div>
  );
}
