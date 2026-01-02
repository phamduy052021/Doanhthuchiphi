import { ArrowRight, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { KPISystemIntegrationGuide } from "./KPISystemIntegrationGuide";

export function NavigationFlowGuide() {
  return (
    <div className="space-y-8">
      {/* KPI System Integration Guide */}
      <KPISystemIntegrationGuide />

      {/* Original Navigation Flow */}
      <div>
        <h2 className="text-gray-900 mb-4">Navigation Flow - Chi tiết</h2>
        <p className="text-gray-600">
          Hướng dẫn luồng điều hướng trong hệ thống
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {flows.map((flow) => (
          <Card
            key={flow.id}
            className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-all duration-200"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900">{flow.title}</CardTitle>
                <Badge className={colorStyles[flow.color]}>
                  Flow #{flow.id}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {flow.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {idx === flow.steps.length - 1 ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Interactive Elements Guide */}
      <Card className="rounded-xl shadow-sm border-gray-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-gray-900">
            Interactive Elements Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-gray-900 mb-3">Clickable Elements</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Sidebar menu items</li>
                <li>✓ KPI Cards (hover effects)</li>
                <li>✓ Table rows (hover background)</li>
                <li>✓ Action buttons (Eye, Edit, Delete)</li>
                <li>✓ Chart bars/points (navigate to BU)</li>
                <li>✓ Tab switches</li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 mb-3">Navigation Buttons</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Back buttons on all detail pages</li>
                <li>✓ "Xem Chi tiết" buttons</li>
                <li>✓ "Thêm" buttons (open modals)</li>
                <li>✓ Export PDF/Excel buttons</li>
                <li>✓ Filter dropdowns</li>
                <li>✓ Save/Cancel in modals</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const flows = [
  {
    id: 1,
    title: "Login → Dashboard",
    steps: [
      "Mở ứng dụng",
      "Nhập email và mật khẩu (bất kỳ)",
      "Click 'Đăng nhập'",
      "Chuyển đến Dashboard",
    ],
    color: "blue",
  },
  {
    id: 2,
    title: "Dashboard → BU Management → BU Detail",
    steps: [
      "Từ Dashboard, click vào 'Đơn vị KD' trên sidebar",
      "Xem danh sách Business Units",
      "Click vào một BU hoặc nút 'Xem Chi tiết'",
      "Mở trang BU Performance với tabs KPI/Revenue/Costs",
    ],
    color: "green",
  },
  {
    id: 3,
    title: "BU Detail → Navigate Tabs",
    steps: [
      "Trong BU Performance page",
      "Click tab 'KPI' để quản lý KPIs",
      "Click tab 'Doanh thu' để quản lý revenue",
      "Click tab 'Chi phí Biến đổi' và 'Chi phí Cố định'",
      "Mỗi tab có nút 'Thêm' để mở modal",
    ],
    color: "purple",
  },
  {
    id: 4,
    title: "Employee Management Flow",
    steps: [
      "Click 'Nhân viên' trên sidebar",
      "Xem danh sách nhân viên",
      "Click icon 'Eye' để xem phân bổ chi phí",
      "Drawer mở với 3 tabs: By %, By Days, By Fixed Amount",
      "Thêm/sửa phân bổ cho từng BU",
    ],
    color: "orange",
  },
  {
    id: 5,
    title: "Fixed Costs Management",
    steps: [
      "Click 'Chi phí Cố định' trên sidebar",
      "Xem summary cards và table",
      "Click 'Thêm Chi phí' để tạo mới",
      "Click icon 'Eye' để xem/chỉnh sửa phân bổ",
      "Phân bổ theo % hoặc số tiền cố định cho các BU",
    ],
    color: "red",
  },
  {
    id: 6,
    title: "Reports & Analytics",
    steps: [
      "Click 'Báo cáo' trên sidebar",
      "Chọn filters: Month, Year, BUs (multi-select)",
      "Xem charts: Line (Revenue vs Cost), Bar (Profit Margin), Radar (KPI)",
      "Click vào BU trong chart để chuyển đến BU detail",
      "Click 'Back' để quay về Dashboard",
      "Click 'Xuất PDF' hoặc 'Xuất Excel'",
    ],
    color: "indigo",
  },
];

const colorStyles: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  purple: "bg-purple-100 text-purple-700",
  orange: "bg-orange-100 text-orange-700",
  red: "bg-red-100 text-red-700",
  indigo: "bg-indigo-100 text-indigo-700",
};