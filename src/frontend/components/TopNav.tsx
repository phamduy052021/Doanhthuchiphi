import { Bell, Settings, ChevronDown, HelpCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface TopNavProps {
  selectedMonth: string;
  selectedYear: string;
  onMonthChange: (month: string) => void;
  onYearChange: (year: string) => void;
  onNavigateToGuide?: () => void;
}

export function TopNav({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
  onNavigateToGuide,
}: TopNavProps) {
  const months = [
    { value: "1", label: "Tháng 1" },
    { value: "2", label: "Tháng 2" },
    { value: "3", label: "Tháng 3" },
    { value: "4", label: "Tháng 4" },
    { value: "5", label: "Tháng 5" },
    { value: "6", label: "Tháng 6" },
    { value: "7", label: "Tháng 7" },
    { value: "8", label: "Tháng 8" },
    { value: "9", label: "Tháng 9" },
    { value: "10", label: "Tháng 10" },
    { value: "11", label: "Tháng 11" },
    { value: "12", label: "Tháng 12" },
  ];

  const years = [
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 shadow-sm">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white">BU</span>
          </div>
          <span className="text-gray-900">Business Unit Management</span>
        </div>

        {/* Month and Year Filters */}
        <div className="flex items-center gap-3 ml-8">
          <Select value={selectedMonth} onValueChange={onMonthChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={onYearChange}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year.value} value={year.value}>
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Right side - User profile and actions */}
      <div className="flex items-center gap-4">
        {onNavigateToGuide && (
          <Button
            variant="outline"
            size="sm"
            onClick={onNavigateToGuide}
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Navigation Guide
          </Button>
        )}

        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          PROTOTYPE
        </Badge>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5 text-gray-600" />
        </Button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <Avatar className="w-8 h-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-blue-100 text-blue-700">
              NQ
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-gray-900">Nguyễn Quản lý</span>
            <span className="text-gray-500">Quản trị viên</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </header>
  );
}