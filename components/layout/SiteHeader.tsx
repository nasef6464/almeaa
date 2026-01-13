"use client";

import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { ChevronDown, LayoutGrid, Menu, Search, ShoppingCart, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { navItems } from '@/app/lib/catalogData';

const userStub = {
  name: 'ناصف أحمد',
  avatar: 'https://i.pravatar.cc/80?u=almeaa',
};

export function SiteHeader() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const groupedNav = useMemo(() => navItems, []);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Link href="/" className="flex items-baseline gap-2 text-lg font-black text-amber-500">
              <span className="text-blue-900">منصة</span>
              <span>المئة</span>
              <span className="text-[10px] font-normal text-gray-400 -mb-1">قدرات & تحصيلي</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1 text-sm font-bold text-gray-700">
            {groupedNav.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.children ? item.id : null)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-amber-600 transition-colors ${
                    isActive(item.href) ? 'text-amber-600 bg-amber-50' : 'text-gray-700'
                  }`}
                >
                  {item.icon ? <item.icon size={16} className="text-gray-400" /> : null}
                  {item.label}
                  {item.children && <ChevronDown size={14} className="text-gray-400" />}
                </Link>
                {item.children && openDropdown === item.id && (
                  <div className="absolute top-full right-0 w-56 bg-white shadow-xl rounded-b-xl border-t-2 border-amber-500 py-2 animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex text-gray-500 hover:text-amber-500 transition-colors" aria-label="بحث">
              <Search size={20} />
            </button>
            <button className="hidden sm:inline-flex text-gray-500 hover:text-amber-500 transition-colors" aria-label="السلة">
              <div className="relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
              </div>
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-2 hover:bg-gray-50 p-1 pr-3 rounded-full border border-transparent hover:border-gray-100 transition-all"
              >
                <div className="hidden lg:block text-left">
                  <span className="block text-[11px] text-gray-500">حسابي</span>
                  <span className="block text-sm font-bold text-gray-800 leading-none">{userStub.name}</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={userStub.avatar} alt="User" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" />
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {profileOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl rounded-xl border border-gray-100 py-2 animate-fade-in z-50">
                  <div className="px-4 py-3 border-b border-gray-100 mb-2">
                    <p className="font-bold text-gray-800">{userStub.name}</p>
                    <p className="text-xs text-gray-500">طالب متميز</p>
                  </div>
                  <ProfileLink href="/dashboard" label="لوحة التحكم" />
                  <ProfileLink href="/dashboard/my-courses" label="دوراتي" />
                  <ProfileLink href="/dashboard/tests" label="اختباراتي" />
                  <ProfileLink href="/dashboard/reports" label="الشهادات والإنجازات" />
                  <ProfileLink href="/dashboard/profile" label="الملف الشخصي" />
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors">
                      تسجيل الخروج
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-inner animate-fade-in">
          <div className="p-4 space-y-4">
            {groupedNav.map((item) => (
              <div key={item.id}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 font-bold text-lg text-gray-800 mb-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.icon ? <item.icon size={18} className="text-amber-500" /> : null}
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pr-6 space-y-2 border-r-2 border-gray-100 mr-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href}
                        className="block text-gray-600 py-1"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-2 border-t border-gray-100">
              <Link href="/auth/signin" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function ProfileLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium">
      <LayoutGrid size={16} className="text-gray-400" />
      {label}
    </Link>
  );
}
