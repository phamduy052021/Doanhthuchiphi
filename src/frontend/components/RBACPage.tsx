import { useState } from "react";
import { Shield, Check, X } from "lucide-react";
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
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

interface Permission {
  module: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  export: boolean;
}

interface RolePermissions {
  role: string;
  label: string;
  color: string;
  permissions: Record<string, Permission>;
}

export function RBACPage() {
  const [roles, setRoles] = useState<RolePermissions[]>([
    {
      role: "admin",
      label: "Quản trị viên",
      color: "purple",
      permissions: {
        dashboard: {
          module: "Dashboard",
          view: true,
          create: true,
          edit: true,
          delete: true,
          export: true,
        },
        businessUnits: {
          module: "Đơn vị Kinh doanh",
          view: true,
          create: true,
          edit: true,
          delete: true,
          export: true,
        },
        employees: {
          module: "Nhân viên",
          view: true,
          create: true,
          edit: true,
          delete: true,
          export: true,
        },
        fixedCosts: {
          module: "Chi phí Cố định",
          view: true,
          create: true,
          edit: true,
          delete: true,
          export: true,
        },
        reports: {
          module: "Báo cáo",
          view: true,
          create: true,
          edit: true,
          delete: true,
          export: true,
        },
        users: {
          module: "Người dùng",
          view: true,
          create: true,
          edit: true,
          delete: true,
          export: true,
        },
      },
    },
    {
      role: "manager",
      label: "Quản lý",
      color: "blue",
      permissions: {
        dashboard: {
          module: "Dashboard",
          view: true,
          create: false,
          edit: false,
          delete: false,
          export: true,
        },
        businessUnits: {
          module: "Đơn vị Kinh doanh",
          view: true,
          create: true,
          edit: true,
          delete: false,
          export: true,
        },
        employees: {
          module: "Nhân viên",
          view: true,
          create: true,
          edit: true,
          delete: false,
          export: true,
        },
        fixedCosts: {
          module: "Chi phí Cố định",
          view: true,
          create: true,
          edit: true,
          delete: false,
          export: true,
        },
        reports: {
          module: "Báo cáo",
          view: true,
          create: false,
          edit: false,
          delete: false,
          export: true,
        },
        users: {
          module: "Người dùng",
          view: true,
          create: false,
          edit: false,
          delete: false,
          export: false,
        },
      },
    },
    {
      role: "editor",
      label: "Biên tập viên",
      color: "green",
      permissions: {
        dashboard: {
          module: "Dashboard",
          view: true,
          create: false,
          edit: false,
          delete: false,
          export: false,
        },
        businessUnits: {
          module: "Đơn vị Kinh doanh",
          view: true,
          create: false,
          edit: true,
          delete: false,
          export: false,
        },
        employees: {
          module: "Nhân viên",
          view: true,
          create: false,
          edit: true,
          delete: false,
          export: false,
        },
        fixedCosts: {
          module: "Chi phí Cố định",
          view: true,
          create: false,
          edit: true,
          delete: false,
          export: false,
        },
        reports: {
          module: "Báo cáo",
          view: true,
          create: false,
          edit: false,
          delete: false,
          export: false,
        },
        users: {
          module: "Người dùng",
          view: false,
          create: false,
          edit: false,
          delete: false,
          export: false,
        },
      },
    },
    {
      role: "viewer",
      label: "Người xem",
      color: "gray",
      permissions: {
        dashboard: {
          module: "Dashboard",
          view: true,
          create: false,
          edit: false,
          delete: false,
          export: false,
        },
        businessUnits: {
          module: "Đơn vị Kinh doanh",
          view: true,
          create: false,
          edit: false,
          delete: false,
          export: false,
        },
        employees: {
          module: "Nhân viên",
          view: true,
          create: false,
          edit: false,
          delete: false,
          export: false,
        },
        fixedCosts: {
          module: "Chi phí Cố định",
          view: true,
          create: false,
          edit: false,
          delete: false,
          export: false,
        },
        reports: {
          module: "Báo cáo",
          view: true,
          create: false,
          edit: false,
          delete: false,
          export: false,
        },
        users: {
          module: "Người dùng",
          view: false,
          create: false,
          edit: false,
          delete: false,
          export: false,
        },
      },
    },
  ]);

  const handlePermissionChange = (
    roleIndex: number,
    moduleKey: string,
    permissionType: keyof Permission
  ) => {
    const updatedRoles = [...roles];
    if (permissionType !== "module") {
      updatedRoles[roleIndex].permissions[moduleKey][permissionType] =
        !updatedRoles[roleIndex].permissions[moduleKey][permissionType];
      setRoles(updatedRoles);
    }
  };

  const modules = Object.keys(roles[0].permissions);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-gray-900">Phân quyền RBAC</h1>
        </div>
        <p className="text-gray-600">
          Role-Based Access Control Matrix - Quản lý quyền hạn theo vai trò
        </p>
      </div>

      {/* Role Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {roles.map((roleData) => {
          const totalPermissions = modules.length * 5;
          const grantedPermissions = modules.reduce((count, module) => {
            const perms = roleData.permissions[module];
            return (
              count +
              (perms.view ? 1 : 0) +
              (perms.create ? 1 : 0) +
              (perms.edit ? 1 : 0) +
              (perms.delete ? 1 : 0) +
              (perms.export ? 1 : 0)
            );
          }, 0);
          const percentage = Math.round(
            (grantedPermissions / totalPermissions) * 100
          );

          const colors = {
            purple: "bg-purple-100 text-purple-700",
            blue: "bg-blue-100 text-blue-700",
            green: "bg-green-100 text-green-700",
            gray: "bg-gray-100 text-gray-700",
          };

          return (
            <Card
              key={roleData.role}
              className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <CardHeader>
                <CardTitle className="text-gray-900">
                  {roleData.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Quyền truy cập</span>
                    <Badge
                      className={
                        colors[roleData.color as keyof typeof colors]
                      }
                    >
                      {percentage}%
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        roleData.color === "purple"
                          ? "bg-purple-600"
                          : roleData.color === "blue"
                          ? "bg-blue-600"
                          : roleData.color === "green"
                          ? "bg-green-600"
                          : "bg-gray-600"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-gray-600">
                    {grantedPermissions}/{totalPermissions} quyền
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* RBAC Matrix */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">
            Ma trận Phân quyền Chi tiết
          </CardTitle>
          <p className="text-gray-600">
            Click vào checkbox để bật/tắt quyền cho từng vai trò
          </p>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Module</TableHead>
                {roles.map((roleData) => (
                  <TableHead key={roleData.role} className="text-center">
                    <Badge
                      className={
                        roleData.color === "purple"
                          ? "bg-purple-100 text-purple-700 hover:bg-purple-100"
                          : roleData.color === "blue"
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                          : roleData.color === "green"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                      }
                    >
                      {roleData.label}
                    </Badge>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {modules.map((moduleKey, moduleIndex) => {
                const moduleName = roles[0].permissions[moduleKey].module;
                const permissions: Array<keyof Omit<Permission, "module">> = [
                  "view",
                  "create",
                  "edit",
                  "delete",
                  "export",
                ];

                return permissions.map((permType, permIndex) => {
                  const permLabels = {
                    view: "Xem",
                    create: "Tạo",
                    edit: "Sửa",
                    delete: "Xóa",
                    export: "Xuất",
                  };

                  return (
                    <TableRow
                      key={`${moduleKey}-${permType}`}
                      className={
                        moduleIndex % 2 === 1 ? "bg-gray-50" : ""
                      }
                    >
                      <TableCell>
                        {permIndex === 0 ? (
                          <div>
                            <p className="text-gray-900">{moduleName}</p>
                            <p className="text-gray-600">
                              {permLabels[permType]}
                            </p>
                          </div>
                        ) : (
                          <p className="text-gray-600 pl-4">
                            {permLabels[permType]}
                          </p>
                        )}
                      </TableCell>
                      {roles.map((roleData, roleIndex) => {
                        const hasPermission =
                          roleData.permissions[moduleKey][permType];
                        return (
                          <TableCell
                            key={`${roleData.role}-${moduleKey}-${permType}`}
                            className="text-center"
                          >
                            <div className="flex items-center justify-center">
                              <Checkbox
                                checked={hasPermission}
                                onCheckedChange={() =>
                                  handlePermissionChange(
                                    roleIndex,
                                    moduleKey,
                                    permType
                                  )
                                }
                                className={
                                  hasPermission
                                    ? "border-green-500 data-[state=checked]:bg-green-500"
                                    : ""
                                }
                              />
                            </div>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                });
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700">
          Lưu Cấu hình Phân quyền
        </Button>
      </div>
    </div>
  );
}
