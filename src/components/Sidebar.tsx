import {
  LayoutDashboard,
  Building2,
  Target,
  Users,
  DollarSign,
  FileText,
  UserCog,
  Shield,
  BarChart3,
  Database,
} from "lucide-react";
import { cn } from "../lib/utils";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "business-units",
      label: "Đơn vị KD",
      icon: Building2,
    },
    {
      id: "kpi-management",
      label: "Quản lý KPI",
      icon: BarChart3,
    },
    {
      id: "kpi",
      label: "Hướng dẫn",
      icon: Target,
    },
    {
      id: "employees",
      label: "Nhân viên",
      icon: Users,
    },
    {
      id: "fixed-costs",
      label: "Chi phí Cố định",
      icon: DollarSign,
    },
    {
      id: "reports",
      label: "Báo cáo",
      icon: FileText,
    },
  ];

  const systemItems = [
    {
      id: "users",
      label: "Người dùng",
      icon: UserCog,
    },
    {
      id: "rbac",
      label: "Phân quyền",
      icon: Shield,
    },
    {
      id: "database-management",
      label: "Database",
      icon: Database,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      <div className="p-6">
        <h2 className="text-gray-400 tracking-wide mb-4">ĐIỀU HƯỚNG</h2>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="px-6 pb-6 mt-auto">
        <h2 className="text-gray-400 tracking-wide mb-4">HỆ THỐNG</h2>
        <nav className="space-y-1">
          {systemItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}