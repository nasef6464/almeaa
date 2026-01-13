'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, Menu, X, Search, ShoppingCart, User } from 'lucide-react';
import { navItems } from '@/app/lib/catalogData';

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <Link href="/" className="flex items-baseline gap-2">
              <div className="text-2xl font-black text-amber-500 flex items-baseline">
                <span className="text-blue-900">منصة</span>
                <span className="mx-1">المئة</span>
                <span className="text-xs font-normal text-gray-400 block -mt-2">قدرات & تحصيلي</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link 
              href="/" 
              className="px-3 py-2 text-gray-700 font-bold hover:text-amber-500 transition-colors text-sm"
            >
              الرئيسية
            </Link>
            
            {/* القدرات Dropdown */}
            <div 
              className="relative group px-3 py-2"
              onMouseEnter={() => setActiveDropdown('qudrat')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-2 text-gray-700 font-bold hover:text-amber-500 transition-colors text-sm">
                {navItems.qudrat.label}
                <ChevronDown size={14} />
              </button>
              
              {activeDropdown === 'qudrat' && (
                <div className="absolute top-full right-0 w-56 bg-white shadow-xl rounded-b-xl border-t-2 border-amber-500 py-2 animate-fade-in">
                  {navItems.qudrat.children.map((child) => (
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

            {/* التحصيلي Dropdown */}
            <div 
              className="relative group px-3 py-2"
              onMouseEnter={() => setActiveDropdown('tahsili')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-2 text-gray-700 font-bold hover:text-amber-500 transition-colors text-sm">
                {navItems.tahsili.label}
                <ChevronDown size={14} />
              </button>
              
              {activeDropdown === 'tahsili' && (
                <div className="absolute top-full right-0 w-56 bg-white shadow-xl rounded-b-xl border-t-2 border-amber-500 py-2 animate-fade-in">
                  {navItems.tahsili.children.map((child) => (
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

            <Link 
              href="/dashboard" 
              className="px-3 py-2 text-gray-700 font-bold hover:text-amber-500 transition-colors text-sm"
            >
              لوحة الطالب
            </Link>

            <Link 
              href="/dashboard/tests" 
              className="px-3 py-2 text-gray-700 font-bold hover:text-amber-500 transition-colors text-sm"
            >
              الاختبارات
            </Link>

            <Link 
              href="/dashboard/reports" 
              className="px-3 py-2 text-gray-700 font-bold hover:text-amber-500 transition-colors text-sm"
            >
              التقارير
            </Link>
          </nav>

          {/* Actions: Search, Cart, User */}
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-amber-500 transition-colors hidden md:block">
              <Search size={22} />
            </button>
            
            <Link href="/cart" className="relative text-gray-500 hover:text-amber-500 transition-colors hidden md:block">
              <ShoppingCart size={22} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link>

            <Link
              href="/auth/signin"
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm"
            >
              <User size={18} />
              <span className="hidden sm:inline">تسجيل الدخول</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white overflow-y-auto pb-20 animate-fade-in">
          <div className="p-4">
            <div className="mb-4">
              <Link 
                href="/" 
                className="flex items-center gap-3 font-bold text-lg text-gray-800 mb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                الرئيسية
              </Link>
            </div>

            <div className="mb-4">
              <div className="font-bold text-lg text-gray-800 mb-2">
                {navItems.qudrat.label}
              </div>
              <div className="pr-4 space-y-2 border-r-2 border-gray-100">
                {navItems.qudrat.children.map((child) => (
                  <Link 
                    key={child.id} 
                    href={child.href}
                    className="block text-gray-600 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <div className="font-bold text-lg text-gray-800 mb-2">
                {navItems.tahsili.label}
              </div>
              <div className="pr-4 space-y-2 border-r-2 border-gray-100">
                {navItems.tahsili.children.map((child) => (
                  <Link 
                    key={child.id} 
                    href={child.href}
                    className="block text-gray-600 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link 
              href="/dashboard" 
              className="flex items-center gap-3 font-bold text-lg text-gray-800 mb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              لوحة الطالب
            </Link>

            <Link 
              href="/dashboard/tests" 
              className="flex items-center gap-3 font-bold text-lg text-gray-800 mb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              الاختبارات
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
