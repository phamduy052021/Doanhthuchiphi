import React from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Users,
  PieChart as PieChartIcon,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button } from './ui/button';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  gradient: string;
}

function KPICard({ title, value, change, isPositive, icon, gradient }: KPICardProps) {
  return (
    <div className="flex-shrink-0 w-[280px] bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          <p className="text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg ${gradient} flex items-center justify-center text-white`}>
          {icon}
        </div>
      </div>
      <div className="flex items-center gap-1">
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-green-600" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-600" />
        )}
        <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
        <span className="text-gray-500 text-sm ml-1">vs tháng trước</span>
      </div>
    </div>
  );
}

interface BusinessUnit {
  name: string;
  leader: string;
  profit: number;
  kpi: number;
}

function BusinessUnitCard({ unit }: { unit: BusinessUnit }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-3">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-gray-900 mb-1">{unit.name}</h3>
          <p className="text-gray-600 text-sm">Quản lý: {unit.leader}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex items-center gap-6">
        <div className="flex-1">
          <p className="text-gray-600 text-sm mb-1">Lợi nhuận</p>
          <p className={`${unit.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {unit.profit.toFixed(1)}%
          </p>
        </div>
        <div className="flex-1">
          <p className="text-gray-600 text-sm mb-1">KPI</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-100 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${unit.kpi >= 80 ? 'bg-green-500' : unit.kpi >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${unit.kpi}%` }}
              />
            </div>
            <span className="text-sm text-gray-700">{unit.kpi}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileDashboard() {
  const kpiData = [
    {
      title: 'Tổng doanh thu',
      value: 'đ45.8 tỷ',
      change: '+12.5%',
      isPositive: true,
      icon: <DollarSign className="w-6 h-6" />,
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      title: 'Tổng chi phí',
      value: 'đ32.4 tỷ',
      change: '+8.2%',
      isPositive: false,
      icon: <TrendingUp className="w-6 h-6" />,
      gradient: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
      title: 'Tỷ suất lợi nhuận',
      value: '29.3%',
      change: '+3.8%',
      isPositive: true,
      icon: <PieChartIcon className="w-6 h-6" />,
      gradient: 'bg-gradient-to-br from-green-500 to-green-600',
    },
    {
      title: 'Số nhân viên',
      value: '847',
      change: '-2.1%',
      isPositive: false,
      icon: <Users className="w-6 h-6" />,
      gradient: 'bg-gradient-to-br from-orange-500 to-orange-600',
    },
  ];

  const revenueVsCostData = [
    { month: 'T7', revenue: 38.2, cost: 28.5 },
    { month: 'T8', revenue: 41.5, cost: 30.2 },
    { month: 'T9', revenue: 43.8, cost: 31.4 },
    { month: 'T10', revenue: 44.2, cost: 31.8 },
    { month: 'T11', revenue: 45.8, cost: 32.4 },
  ];

  const costBreakdownData = [
    { name: 'Chi phí cố định', value: 18.6, color: '#3B82F6' },
    { name: 'Chi phí biến đổi', value: 13.8, color: '#8B5CF6' },
  ];

  const topBusinessUnits: BusinessUnit[] = [
    {
      name: 'Đơn vị Bán lẻ Miền Bắc',
      leader: 'Nguyễn Văn A',
      profit: 32.5,
      kpi: 92,
    },
    {
      name: 'Đơn vị Logistics',
      leader: 'Trần Thị B',
      profit: 28.3,
      kpi: 88,
    },
    {
      name: 'Đơn vị Marketing',
      leader: 'Lê Văn C',
      profit: 25.7,
      kpi: 85,
    },
    {
      name: 'Đơn vị Công nghệ',
      leader: 'Phạm Thị D',
      profit: 22.1,
      kpi: 78,
    },
  ];

  const handleViewReport = () => {
    console.log('Navigate to detailed report');
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-[375px] mx-auto pb-6">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm sticky top-0 z-10">
        <h1 className="text-gray-900">Dashboard – Tháng 11/2025</h1>
      </div>

      {/* KPI Cards - Horizontal Scroll */}
      <div className="px-4 py-6">
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>
      </div>

      {/* Revenue vs Cost Chart */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="text-gray-900 mb-4">Doanh thu & Chi phí</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={revenueVsCostData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                stroke="#9CA3AF"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#9CA3AF"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
                iconType="line"
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Doanh thu (tỷ)"
                dot={{ fill: '#3B82F6', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="cost" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                name="Chi phí (tỷ)"
                dot={{ fill: '#8B5CF6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cost Breakdown Pie Chart */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="text-gray-900 mb-4">Cơ cấu chi phí</h2>
          <div className="flex items-center">
            <ResponsiveContainer width="60%" height={180}>
              <PieChart>
                <Pie
                  data={costBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {costBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => `${value} tỷ`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {costBreakdownData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.value} tỷ</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Business Units */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900">Top Business Units</h2>
          <button className="text-blue-600 text-sm flex items-center gap-1">
            Xem tất cả
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div>
          {topBusinessUnits.map((unit, index) => (
            <BusinessUnitCard key={index} unit={unit} />
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-4">
        <Button 
          onClick={handleViewReport}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl shadow-lg"
        >
          <span>Xem báo cáo chi tiết</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {/* Add scrollbar hide utility */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
