import Link from 'next/link';
import { BookOpen, Target, FileText, CheckSquare, Package, BarChart } from 'lucide-react';

export default function AdminCatalogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const menuItems = [
    { href: '/dashboard/admin/catalog/courses', icon: BookOpen, label: 'الدورات' },
    { href: '/dashboard/admin/catalog/skills', icon: Target, label: 'المهارات' },
    { href: '/dashboard/admin/catalog/banks', icon: FileText, label: 'بنوك الأسئلة' },
    { href: '/dashboard/admin/catalog/tests', icon: CheckSquare, label: 'الاختبارات المحاكية' },
    { href: '/dashboard/admin/catalog/packages', icon: Package, label: 'الباقات' },
    { href: '/dashboard/admin/catalog/stats', icon: BarChart, label: 'الإحصائيات' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-l border-gray-200 flex-shrink-0">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">إدارة الكتالوج</h2>
          <p className="text-sm text-gray-500 mt-1">إدارة جميع محتويات المنصة</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors group"
                >
                  <item.icon size={20} className="text-gray-400 group-hover:text-blue-600" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 mt-auto">
          <Link
            href="/dashboard/admin"
            className="block w-full px-4 py-2 text-center text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            العودة للوحة التحكم
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
