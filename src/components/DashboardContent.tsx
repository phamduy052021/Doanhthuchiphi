import { KPICards } from "./KPICards";
import { RevenueVsCostChart } from "./RevenueVsCostChart";
import { CostBreakdownChart } from "./CostBreakdownChart";
import { BusinessUnitsTable } from "./BusinessUnitsTable";

interface DashboardContentProps {
  selectedMonth: string;
  selectedYear: string;
  onNavigateToBU: (buId: string) => void;
}

export function DashboardContent({
  selectedMonth,
  selectedYear,
  onNavigateToBU,
}: DashboardContentProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-gray-900 mb-2">Dashboard Tổng quan</h1>
        <p className="text-gray-600">
          Tháng {selectedMonth}/{selectedYear}
        </p>
      </div>

      {/* KPI Summary Cards */}
      <KPICards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RevenueVsCostChart />
        <CostBreakdownChart />
      </div>

      {/* Business Units Table */}
      <BusinessUnitsTable onNavigateToBU={onNavigateToBU} />
    </div>
  );
}
