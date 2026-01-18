"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, LogOut, Menu, Pin, ChevronDown } from 'lucide-react';

import type { ReactNode } from 'react';

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type DashboardShellProps = {
  userName: string;
  userRole: string;
  navItems: NavItem[];
  children: ReactNode;
};

export default function DashboardShell({ userName, userRole, navItems, children }: DashboardShellProps) {
  const [isPinned, setIsPinned] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const storedPin = localStorage.getItem('dashboardPinned');
    return storedPin ? storedPin === 'true' : true;
  });

  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const storedOpen = localStorage.getItem('dashboardOpen');
    return storedOpen ? storedOpen === 'true' : true;
  });

  const pathname = usePathname();

  useEffect(() => {
    try {
      localStorage.setItem('dashboardPinned', String(isPinned));
      localStorage.setItem('dashboardOpen', String(isOpen));
    } catch (error) {
      console.error('Failed to persist sidebar state', error);
    }
  }, [isPinned, isOpen]);

  const activeHref = useMemo(() => {
    if (!pathname) return '';
    const match = navItems.find((item) => pathname.startsWith(item.href));
    return match?.href || '';
  }, [pathname, navItems]);

  const sidebarVisible = isOpen;
  const mainShiftClass = isPinned && sidebarVisible ? 'lg:pr-64' : 'lg:pr-0';

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900" dir="rtl">
      <div className="flex min-h-screen relative">
        <Sidebar
          userName={userName}
          userRole={userRole}
          navItems={navItems}
          activeHref={activeHref}
          visible={sidebarVisible}
          pinned={isPinned}
          onClose={() => setIsOpen(false)}
        />

        {sidebarVisible && !isPinned && (
          <button
            aria-label="إخفاء القائمة الجانبية"
            className="fixed inset-0 bg-black/25 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        <div className={`flex-1 flex flex-col transition-[padding] duration-300 ${mainShiftClass}`}>
          <Header
            userName={userName}
            onToggleMenu={() => setIsOpen((prev) => !prev)}
            onTogglePin={() => {
              setIsPinned((prev) => !prev);
              setIsOpen(true);
            }}
            pinned={isPinned}
          />
          <main className="p-6 pt-4 lg:pt-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

type SidebarProps = {
  userName: string;
  userRole: string;
  navItems: NavItem[];
  activeHref: string;
  visible: boolean;
  pinned: boolean;
  onClose: () => void;
};

function Sidebar({ userName, navItems, activeHref, visible, pinned, onClose }: SidebarProps) {
  return (
    <aside
      className={`bg-slate-900 text-white w-64 fixed inset-y-0 right-0 z-30 shadow-xl transition-transform duration-300 ${
        visible ? 'translate-x-0' : 'translate-x-full'
      } ${pinned ? 'lg:translate-x-0' : ''}`}
    >
      <div className="p-6 flex items-center justify-between border-b border-slate-800">
        <div>
          <p className="text-sm text-slate-300">مرحبا</p>
          <h2 className="text-lg font-bold text-amber-400">{userName}</h2>
        </div>
        <div className="bg-amber-500 text-slate-900 rounded-full w-10 h-10 flex items-center justify-center font-bold">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
      <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100%-88px)]">
        {navItems.map((item) => {
          const active = activeHref === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => !pinned && onClose()}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                active
                  ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                  : 'text-slate-200 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
        <div className="border-t border-slate-800 pt-4 mt-4 space-y-2">
          <Link href="/dashboard/settings" onClick={() => !pinned && onClose()} className="flex items-center gap-3 px-4 py-3 text-slate-200 hover:bg-slate-800 rounded-lg">
            <span className="text-sm">الإعدادات</span>
          </Link>
          <form action="/api/auth/signout" method="POST">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-slate-800 rounded-lg text-sm">
              <LogOut size={20} />
              <span>تسجيل خروج</span>
            </button>
          </form>
        </div>
        <div className="mt-6 rounded-xl bg-slate-800 border border-slate-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-200">وضع التثبيت</p>
            <Pin size={16} className="text-amber-400" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">يمكنك التبديل بين وضع التثبيت والعائم من الأعلى.</p>
        </div>
      </nav>
    </aside>
  );
}

type HeaderProps = {
  userName: string;
  onToggleMenu: () => void;
  onTogglePin: () => void;
  pinned: boolean;
};

function Header({ userName, onToggleMenu, onTogglePin, pinned }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur shadow-sm h-16 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20 border-b border-slate-200">
      <div className="flex items-center gap-3 text-slate-700">
        <button
          type="button"
          onClick={onToggleMenu}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 border border-slate-200 lg:hidden"
          aria-label="القائمة الجانبية"
        >
          <Menu size={20} />
        </button>
        <div>
          <p className="text-xs text-slate-500">لوحة التحكم</p>
          <h1 className="text-base font-semibold">مرحبا، {userName}</h1>
        </div>
      </div>
      <div className="flex items-center gap-2 lg:gap-3">
        {/* Quick Links Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-sm transition-colors"
          >
            <span>روابط سريعة</span>
            <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {dropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-20">
                <Link 
                  href="/dashboard" 
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  📊 لوحة التحكم
                </Link>
                <Link 
                  href="/dashboard/tests" 
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  📝 الاختبارات
                </Link>
                <Link 
                  href="/dashboard/my-courses" 
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  📚 دوراتي
                </Link>
                <Link 
                  href="/dashboard/saher" 
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  🛡️ اختبارات ساهر
                </Link>
                <div className="border-t border-slate-200 my-2"></div>
                <Link 
                  href="/dashboard/settings" 
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  ⚙️ الإعدادات
                </Link>
                <Link 
                  href="/pricing" 
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  💳 الاشتراكات
                </Link>
              </div>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={onTogglePin}
          className={`hidden lg:inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
            pinned
              ? 'border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100'
              : 'border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
          aria-pressed={pinned}
        >
          <Pin size={16} />
          {pinned ? 'مثبتة' : 'وضع التثبيت'}
        </button>
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full" aria-label="الإشعارات">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="bg-amber-500 text-slate-900 rounded-full w-9 h-9 flex items-center justify-center font-bold">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
