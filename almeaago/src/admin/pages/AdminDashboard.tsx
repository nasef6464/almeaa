import React from 'react';
import { Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">لوحة القيادة</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="إجمالي الطلاب" value="1,250" icon={<Users size={24} />} color="bg-blue-500" />
        <StatCard title="الدورات النشطة" value="45" icon={<BookOpen size={24} />} color="bg-emerald-500" />
        <StatCard title="إجمالي المبيعات" value="150,000 ر.س" icon={<DollarSign size={24} />} color="bg-amber-500" />
        <StatCard title="معدل النمو" value="+12%" icon={<TrendingUp size={24} />} color="bg-purple-500" />
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">النشاط الحديث</h3>
        <div className="text-gray-500 text-center py-10">
          جاري تحميل البيانات من الخادم...
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
    <div className={`w-12 h-12 rounded-lg ${color} text-white flex items-center justify-center shadow-lg`}>
      {icon}
    </div>
  </div>
);