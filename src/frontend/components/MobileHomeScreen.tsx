import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Target, 
  Users, 
  DollarSign, 
  FileText, 
  Settings,
  Search,
  Home,
  Bell,
  User
} from 'lucide-react';
import { Input } from './ui/input';

interface ModuleCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  hasNotification?: boolean;
  notificationCount?: number;
}

interface MobileHomeScreenProps {
  onNavigate?: (moduleId: string) => void;
}

export function MobileHomeScreen({ onNavigate }: MobileHomeScreenProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const modules: ModuleCard[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <LayoutDashboard className="w-8 h-8" />,
    },
    {
      id: 'business-units',
      title: 'Business Units',
      icon: <Building2 className="w-8 h-8" />,
      hasNotification: true,
      notificationCount: 3,
    },
    {
      id: 'kpi',
      title: 'KPI',
      icon: <Target className="w-8 h-8" />,
    },
    {
      id: 'employees',
      title: 'Employees',
      icon: <Users className="w-8 h-8" />,
    },
    {
      id: 'fixed-costs',
      title: 'Fixed Costs',
      icon: <DollarSign className="w-8 h-8" />,
      hasNotification: true,
      notificationCount: 1,
    },
    {
      id: 'reports',
      title: 'Reports',
      icon: <FileText className="w-8 h-8" />,
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Settings className="w-8 h-8" />,
    },
  ];

  const handleModuleClick = (moduleId: string) => {
    console.log(`Navigating to ${moduleId}`);
    onNavigate?.(moduleId);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-[375px] mx-auto">
      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 shadow-sm">
        <h1 className="text-gray-900 mb-4">Business Manager</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200 rounded-xl"
          />
        </div>
      </div>

      {/* Main Content - Module Grid */}
      <div className="flex-1 overflow-auto px-4 py-6 pb-24">
        <div className="grid grid-cols-2 gap-4">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => handleModuleClick(module.id)}
              className="relative bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 active:scale-95 flex flex-col items-center justify-center gap-3"
            >
              {/* Notification Indicator */}
              {module.hasNotification && (
                <div className="absolute top-3 right-3 flex items-center justify-center">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    {module.notificationCount && (
                      <span className="text-white text-xs">
                        {module.notificationCount}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className="text-blue-600">
                {module.icon}
              </div>

              {/* Label */}
              <span className="text-gray-700 text-center leading-tight">
                {module.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[375px] mx-auto bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-around">
          {/* Home */}
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'home'
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Home className={`w-6 h-6 ${activeTab === 'home' ? 'fill-blue-600' : ''}`} />
            <span className="text-xs">Home</span>
          </button>

          {/* Reports */}
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'reports'
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText className={`w-6 h-6 ${activeTab === 'reports' ? 'fill-blue-600' : ''}`} />
            <span className="text-xs">Reports</span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => setActiveTab('notifications')}
            className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'notifications'
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Bell className={`w-6 h-6 ${activeTab === 'notifications' ? 'fill-blue-600' : ''}`} />
            <span className="text-xs">Notifications</span>
            {/* Notification Badge */}
            <div className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
          </button>

          {/* Profile */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'profile'
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <User className={`w-6 h-6 ${activeTab === 'profile' ? 'fill-blue-600' : ''}`} />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}