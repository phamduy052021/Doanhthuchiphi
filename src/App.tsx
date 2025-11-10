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
import { MobileHomeScreen } from "./components/MobileHomeScreen";
import { MobileDashboard } from "./components/MobileDashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedMonth, setSelectedMonth] = useState("11");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedBUId, setSelectedBUId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("mobile");
  const [mobilePage, setMobilePage] = useState<"home" | "dashboard">("home");

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

  const handleMobileNavigate = (moduleId: string) => {
    if (moduleId === 'dashboard') {
      setMobilePage('dashboard');
    }
  };

  const handleBackToMobileHome = () => {
    setMobilePage('home');
  };

  // If not logged in, show login page
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Mobile view
  if (viewMode === "mobile") {
    return (
      <div className="relative">
        {mobilePage === 'home' ? (
          <MobileHomeScreen onNavigate={handleMobileNavigate} />
        ) : (
          <div className="relative">
            <MobileDashboard />
            {/* Back button */}
            <button
              onClick={handleBackToMobileHome}
              className="fixed top-4 left-4 z-50 bg-white text-gray-700 px-3 py-1.5 rounded-lg text-sm shadow-lg hover:bg-gray-50 border border-gray-200"
            >
              ← Back
            </button>
          </div>
        )}
        {/* View mode toggle - for demo purposes */}
        <button
          onClick={() => setViewMode("desktop")}
          className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm shadow-lg hover:bg-blue-700"
        >
          Desktop View
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* View mode toggle - for demo purposes */}
      <button
        onClick={() => setViewMode("mobile")}
        className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm shadow-lg hover:bg-blue-700"
      >
        Mobile View
      </button>

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