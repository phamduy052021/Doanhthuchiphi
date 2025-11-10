import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { DashboardContent } from "./components/DashboardContent";
import { TopNav } from "./components/TopNav";
import { Sidebar } from "./components/Sidebar";
import { BusinessUnitsPage } from "./components/BusinessUnitsPage";
import { BUPerformancePage } from "./components/BUPerformancePage";
import { EmployeesPage } from "./components/EmployeesPage";
import { FixedCostsPage } from "./components/FixedCostsPage";
import { ReportsPage } from "./components/ReportsPage";
import { NavigationFlowGuide } from "./components/NavigationFlowGuide";
import { UsersPage } from "./components/UsersPage";
import { RBACPage } from "./components/RBACPage";
import { KPIManagementPage } from "./components/KPIManagementPage";
import { DatabaseManagement } from "./components/DatabaseManagement";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedMonth, setSelectedMonth] = useState("11");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedBUId, setSelectedBUId] = useState<string | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  const handleNavigateToBU = (buId: string) => {
    setSelectedBUId(buId);
    setCurrentPage("business-unit-detail");
  };

  const handleBackFromBU = () => {
    setCurrentPage("business-units");
    setSelectedBUId(null);
  };

  const handleBackFromReports = () => {
    setCurrentPage("dashboard");
  };

  // If not logged in, show login page
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNav
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
          onNavigateToGuide={() => setCurrentPage("kpi")}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {currentPage === "dashboard" && (
            <DashboardContent
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onNavigateToBU={handleNavigateToBU}
            />
          )}
          {currentPage === "business-units" && (
            <BusinessUnitsPage onNavigateToBU={handleNavigateToBU} />
          )}
          {currentPage === "kpi" && <NavigationFlowGuide />}
          {currentPage === "employees" && <EmployeesPage />}
          {currentPage === "fixed-costs" && <FixedCostsPage />}
          {currentPage === "reports" && (
            <ReportsPage
              onNavigateToBU={handleNavigateToBU}
              onBack={handleBackFromReports}
            />
          )}
          {currentPage === "users" && <UsersPage />}
          {currentPage === "rbac" && <RBACPage />}
          {currentPage === "business-unit-detail" && (
            <BUPerformancePage
              buName="Đơn vị Bán lẻ Miền Bắc"
              month={selectedMonth}
              year={selectedYear}
              onBack={handleBackFromBU}
            />
          )}
          {currentPage === "kpi-management" && <KPIManagementPage />}
          {currentPage === "database-management" && <DatabaseManagement />}
        </main>
      </div>
    </div>
  );
}