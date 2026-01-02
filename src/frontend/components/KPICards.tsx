import { TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function KPICards() {
  const kpiData = [
    {
      title: "Tổng Doanh thu",
      value: "₫45.8 tỷ",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "blue",
    },
    {
      title: "Tổng Chi phí",
      value: "₫32.4 tỷ",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "orange",
    },
    {
      title: "Biên Lợi nhuận",
      value: "29.3%",
      change: "+3.8%",
      trend: "up",
      icon: TrendingUp,
      color: "green",
    },
    {
      title: "Nhân viên",
      value: "847",
      change: "-2.1%",
      trend: "down",
      icon: Users,
      color: "purple",
    },
  ];

  const colorStyles = {
    blue: "bg-blue-100 text-blue-700",
    orange: "bg-orange-100 text-orange-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown;

        return (
          <Card
            key={index}
            className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border-gray-200 hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${
                    colorStyles[kpi.color as keyof typeof colorStyles]
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div
                  className={`flex items-center gap-1 ${
                    kpi.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <TrendIcon className="w-4 h-4" />
                  <span className="text-sm">{kpi.change}</span>
                </div>
              </div>
              <div>
                <p className="text-gray-600 mb-1">{kpi.title}</p>
                <p className="text-gray-900">{kpi.value}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
