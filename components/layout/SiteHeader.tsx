import Link from 'next/link';
import React from 'react';

const navLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/dashboard', label: 'لوحة الطالب' },
  { href: '/dashboard/tests', label: 'الاختبارات' },
  { href: '/dashboard/my-courses', label: 'الدورات' },
  { href: '/dashboard/reports', label: 'التقارير' },
  { href: '/dashboard/plan', label: 'خطتي' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2 text-lg font-black text-amber-500">
          <span className="text-blue-900">منصة</span>
          <span>المئة</span>
          <span className="text-xs font-normal text-gray-400">قدرات & تحصيلي</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg hover:text-amber-600 hover:bg-amber-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/auth/signin"
          className="hidden sm:inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm"
        >
          تسجيل الدخول
        </Link>
      </div>
    </header>
  );
}
