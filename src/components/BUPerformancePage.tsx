import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { KPITab } from "./KPITab";
import { RevenueTab } from "./RevenueTab";
import { VariableCostsTab } from "./VariableCostsTab";
import { FixedCostsTabBU } from "./FixedCostsTabBU";
import { SummaryTab } from "./SummaryTab";

interface BUPerformancePageProps {
  buName: string;
  month: string;
  year: string;
  onBack: () => void;
}

export function BUPerformancePage({
  buName = "Đơn vị Bán lẻ Miền Bắc",
  month = "11",
  year = "2025",
  onBack,
}: BUPerformancePageProps) {
  const [activeTab, setActiveTab] = useState("kpi");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-3 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại Danh sách ĐV
          </Button>
          <h1 className="text-gray-900 mb-2">
            {buName} – Hiệu suất Tháng
          </h1>
          <p className="text-gray-600">
            Tháng {month}/{year}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 rounded-xl h-auto">
          <TabsTrigger
            value="kpi"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-3"
          >
            KPI
          </TabsTrigger>
          <TabsTrigger
            value="revenue"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-3"
          >
            Doanh thu
          </TabsTrigger>
          <TabsTrigger
            value="variable-costs"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-3"
          >
            Chi phí Biến đổi
          </TabsTrigger>
          <TabsTrigger
            value="fixed-costs"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-3"
          >
            Chi phí Cố định
          </TabsTrigger>
          <TabsTrigger
            value="summary"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-3"
          >
            Tổng quan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="kpi" className="mt-6">
          <KPITab buName={buName} month={month} year={year} />
        </TabsContent>

        <TabsContent value="revenue" className="mt-6">
          <RevenueTab buName={buName} month={month} year={year} />
        </TabsContent>

        <TabsContent value="variable-costs" className="mt-6">
          <VariableCostsTab buName={buName} month={month} year={year} />
        </TabsContent>

        <TabsContent value="fixed-costs" className="mt-6">
          <FixedCostsTabBU buName={buName} month={month} year={year} />
        </TabsContent>

        <TabsContent value="summary" className="mt-6">
          <SummaryTab buName={buName} month={month} year={year} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
