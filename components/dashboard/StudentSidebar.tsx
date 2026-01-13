'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  BarChart3, 
  Calendar, 
  Star,
  MessageSquare
} from 'lucide-react';

const sidebarLinks = [
  { href: '/dashboard', label: 'الرئيسية', icon: LayoutDashboard },
  { href: '/dashboard/my-courses', label: 'دوراتي', icon: BookOpen },
  { href: '/dashboard/tests', label: 'الاختبارات', icon: FileText },
  { href: '/dashboard/reports', label: 'التقارير', icon: BarChart3 },
  { href: '/dashboard/plan', label: 'خطتي', icon: Calendar },
  { href: '/dashboard/favorites', label: 'المفضلة', icon: Star },
  { href: '/dashboard/messages', label: 'الرسائل', icon: MessageSquare },
];

export function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-l border-gray-200 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          القائمة الرئيسية
        </h2>
        <nav className="space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-amber-50 text-amber-700 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-amber-600' : 'text-gray-400'} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Quick Stats Card */}
      <div className="mx-4 mt-6 p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white">
        <h3 className="font-bold mb-2">إحصائياتي</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="opacity-90">الدورات المكتملة</span>
            <span className="font-bold">12</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-90">الاختبارات</span>
            <span className="font-bold">45</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-90">المعدل</span>
            <span className="font-bold">87%</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
