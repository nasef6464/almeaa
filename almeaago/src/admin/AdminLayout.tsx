import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BookOpen, FileText, 
  Settings, LogOut, Menu, X, Bell 
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex" dir="rtl">
      {/* Sidebar */}
      <aside className={`bg-gray-900 text-white w-64 transition-all duration-300 fixed h-full z-20 ${isSidebarOpen ? 'right-0' : '-right-64'}`}>
        <div className="p-6 flex justify-between items-center border-b border-gray-800">
          <h2 className="text-xl font-bold text-amber-500">لوحة المدير</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          <NavItem to="/admin" icon={<LayoutDashboard size={20} />} label="نظرة عامة" />
          <NavItem to="/admin/users" icon={<Users size={20} />} label="المستخدمين" />
          <NavItem to="/admin/courses" icon={<BookOpen size={20} />} label="الدورات" />
          <NavItem to="/admin/quizzes" icon={<FileText size={20} />} label="الاختبارات" />
          <div className="border-t border-gray-800 my-4 pt-4">
            <NavItem to="/admin/settings" icon={<Settings size={20} />} label="الإعدادات" />
            <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 rounded-lg transition-colors">
              <LogOut size={20} />
              <span>تسجيل خروج</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'mr-64' : 'mr-0'}`}>
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 hover:text-gray-900"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="text-left hidden sm:block">
                <p className="text-sm font-bold text-gray-800">المدير العام</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
  <Link 
    to={to} 
    className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
  >
    {icon}
    <span>{label}</span>
  </Link>
);