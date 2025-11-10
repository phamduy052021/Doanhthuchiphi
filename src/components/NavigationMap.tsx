import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  LayoutDashboard,
  Building2,
  Users,
  DollarSign,
  BarChart3,
  ArrowRight,
  MousePointerClick,
} from "lucide-react";

export function NavigationMap() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-gray-900 mb-2">BU Management System</h1>
        <p className="text-gray-600 mb-4">
          Interactive Prototype Navigation Map
        </p>
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
          Click any page to navigate
        </Badge>
      </div>

      {/* Navigation Flow Diagram */}
      <div className="relative">
        {/* Login Page */}
        <div className="flex justify-center mb-8">
          <Card className="rounded-xl shadow-md border-2 border-blue-500 w-64 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <MousePointerClick className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-1">Login Page</h3>
              <p className="text-gray-600">Entry point</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mb-8">
          <ArrowRight className="w-6 h-6 text-gray-400 rotate-90" />
        </div>

        {/* Main Dashboard */}
        <div className="flex justify-center mb-12">
          <Card className="rounded-xl shadow-md border-2 border-green-500 w-80 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-1">Main Dashboard</h3>
              <p className="text-gray-600">KPI Cards + Charts + BU Table</p>
              <div className="mt-3 flex flex-wrap gap-2 justify-center">
                <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                  Clickable KPIs
                </Badge>
                <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                  Clickable BU Rows
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Five Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {/* Business Units */}
          <Card className="rounded-xl shadow-md border-2 border-purple-500 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-1">Business Units</h3>
              <p className="text-gray-600 mb-3">List + Detail View</p>
              <div className="space-y-2">
                <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-50 text-xs">
                  → BU Detail
                </Badge>
                <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-50 text-xs">
                  5 Tabs
                </Badge>
                <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-50 text-xs">
                  Add/Edit Modals
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Employees */}
          <Card className="rounded-xl shadow-md border-2 border-orange-500 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-gray-900 mb-1">Employees</h3>
              <p className="text-gray-600 mb-3">Cost Allocation</p>
              <div className="space-y-2">
                <Badge className="bg-orange-50 text-orange-700 hover:bg-orange-50 text-xs">
                  → Drawer
                </Badge>
                <Badge className="bg-orange-50 text-orange-700 hover:bg-orange-50 text-xs">
                  3 Methods
                </Badge>
                <Badge className="bg-orange-50 text-orange-700 hover:bg-orange-50 text-xs">
                  %, Days, Fixed
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Fixed Costs */}
          <Card className="rounded-xl shadow-md border-2 border-red-500 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-gray-900 mb-1">Fixed Costs</h3>
              <p className="text-gray-600 mb-3">BU Allocation</p>
              <div className="space-y-2">
                <Badge className="bg-red-50 text-red-700 hover:bg-red-50 text-xs">
                  → Drawer
                </Badge>
                <Badge className="bg-red-50 text-red-700 hover:bg-red-50 text-xs">
                  Summary Cards
                </Badge>
                <Badge className="bg-red-50 text-red-700 hover:bg-red-50 text-xs">
                  % or Fixed
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Reports */}
          <Card className="rounded-xl shadow-md border-2 border-indigo-500 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-gray-900 mb-1">Reports</h3>
              <p className="text-gray-600 mb-3">Analytics</p>
              <div className="space-y-2">
                <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50 text-xs">
                  3 Charts
                </Badge>
                <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50 text-xs">
                  Filters
                </Badge>
                <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50 text-xs">
                  Export PDF/Excel
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Guide */}
          <Card className="rounded-xl shadow-md border-2 border-teal-500 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <MousePointerClick className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-gray-900 mb-1">KPI / Guide</h3>
              <p className="text-gray-600 mb-3">Navigation Help</p>
              <div className="space-y-2">
                <Badge className="bg-teal-50 text-teal-700 hover:bg-teal-50 text-xs">
                  Flow Diagrams
                </Badge>
                <Badge className="bg-teal-50 text-teal-700 hover:bg-teal-50 text-xs">
                  Instructions
                </Badge>
                <Badge className="bg-teal-50 text-teal-700 hover:bg-teal-50 text-xs">
                  You are here!
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Elements Guide */}
        <Card className="rounded-xl shadow-md border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-6">
            <h3 className="text-gray-900 mb-4 text-center">
              Interactive Elements in Prototype
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-gray-900 mb-3">Hover Effects</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    KPI Cards (lift + shadow)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    Table rows (background)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    Buttons (color change)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    Chart elements (cursor)
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-gray-900 mb-3">Modals & Drawers</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Add/Edit KPI
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Add/Edit Revenue
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Employee Allocation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Cost Allocation
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-gray-900 mb-3">Navigation</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    Sidebar links
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    Back buttons
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    Tab switches
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    Chart click → Detail
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
