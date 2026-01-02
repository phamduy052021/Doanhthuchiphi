import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Users,
  DollarSign,
  FileText,
  LayoutDashboard,
  Target,
} from "lucide-react";

export function KPISystemIntegrationGuide() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">
          Hệ thống Liên kết KPI - Tổng quan
        </h1>
        <p className="text-gray-600">
          Sơ đồ luồng dữ liệu và liên kết giữa các module trong hệ thống
        </p>
      </div>

      {/* Main Integration Flow */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">
            Luồng Dữ liệu KPI Chính
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-6">
            {/* Row 1: KPI Management */}
            <div className="flex items-center justify-center">
              <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-6 w-80">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">Quản lý KPI</h3>
                    <p className="text-gray-600">Master KPI Database</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Tạo và quản lý tất cả KPI</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Liên kết với BU & Nhân viên</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Theo dõi Target vs Actual</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-gray-400 rotate-90" />
            </div>

            {/* Row 2: Connected Systems */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Business Units */}
              <div className="bg-green-50 border border-green-300 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">Đơn vị KD</h3>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>KPI theo đơn vị</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Revenue data</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Variable Costs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Performance Tab</span>
                  </li>
                </ul>
              </div>

              {/* Employees */}
              <div className="bg-purple-50 border border-purple-300 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">Nhân viên</h3>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Người phụ trách KPI</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Cost allocation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Salary data</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Performance link</span>
                  </li>
                </ul>
              </div>

              {/* Fixed Costs */}
              <div className="bg-orange-50 border border-orange-300 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">Chi phí CĐ</h3>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Cost KPI tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Phân bổ cho BU</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Budget control</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-gray-400 rotate-90" />
            </div>

            {/* Row 3: Output Systems */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dashboard */}
              <div className="bg-indigo-50 border-2 border-indigo-500 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <LayoutDashboard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">Dashboard</h3>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span>KPI Summary Cards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span>Revenue vs Cost Chart</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span>Cost Breakdown Pie</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span>Real-time aggregation</span>
                  </li>
                </ul>
              </div>

              {/* Reports */}
              <div className="bg-teal-50 border-2 border-teal-500 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">Báo cáo</h3>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span>KPI Achievement Report</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span>BU Performance Report</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span>Financial Analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span>Trend Analysis</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Links Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              KPI Categories & Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="text-green-900 mb-2">Revenue KPIs</h4>
              <p className="text-green-700">
                Liên kết với: Revenue Tab trong BU Performance, tự động cập nhật
                từ Revenue Sources
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="text-red-900 mb-2">Cost KPIs</h4>
              <p className="text-red-700">
                Liên kết với: Variable Costs + Fixed Costs allocation, tính toán
                tự động
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="text-blue-900 mb-2">Efficiency KPIs</h4>
              <p className="text-blue-700">
                Liên kết với: Employee data, productivity metrics
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="text-purple-900 mb-2">Quality & Customer KPIs</h4>
              <p className="text-purple-700">
                Liên kết với: Customer data, quality metrics
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Cách Sử dụng Hệ thống
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-gray-900">Tạo KPI Master</h4>
                  <p className="text-gray-600">
                    Vào trang "Quản lý KPI" → Thêm KPI mới với category, BU,
                    người phụ trách
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-gray-900">Nhập dữ liệu BU</h4>
                  <p className="text-gray-600">
                    Vào BU Performance → Nhập Revenue, Variable Costs trong tabs
                    tương ứng
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-gray-900">Phân bổ Fixed Costs</h4>
                  <p className="text-gray-600">
                    Trang Chi phí Cố định → Phân bổ cho các BU theo % hoặc giá
                    trị cố định
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="text-gray-900">Xem tổng hợp</h4>
                  <p className="text-gray-600">
                    Dashboard & Reports tự động aggregate và hiển thị tất cả dữ
                    liệu
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Map */}
      <Card className="rounded-xl shadow-sm border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-gray-900">Quick Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-left">
              <BarChart3 className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-gray-900">Quản lý KPI</p>
              <p className="text-gray-600">Master database</p>
            </button>

            <button className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-left">
              <Building2 className="w-6 h-6 text-green-600 mb-2" />
              <p className="text-gray-900">Đơn vị KD</p>
              <p className="text-gray-600">BU Performance</p>
            </button>

            <button className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-left">
              <LayoutDashboard className="w-6 h-6 text-indigo-600 mb-2" />
              <p className="text-gray-900">Dashboard</p>
              <p className="text-gray-600">KPI Summary</p>
            </button>

            <button className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-left">
              <FileText className="w-6 h-6 text-teal-600 mb-2" />
              <p className="text-gray-900">Báo cáo</p>
              <p className="text-gray-600">Analytics</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
