"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, School, BookOpenText, Layers3 } from "lucide-react";
import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/taxonomy", label: "تصنيف المهارات", icon: <Layers3 className="h-5 w-5" /> },
  { href: "/schools", label: "المدارس", icon: <School className="h-5 w-5" /> },
  { href: "/banks", label: "بنك الأسئلة", icon: <BookOpenText className="h-5 w-5" /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-l border-slate-200 shadow-sm h-screen sticky top-0 px-4 py-6 flex flex-col gap-6" dir="rtl">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="h-6 w-6 text-amber-500" />
        <div>
          <p className="text-sm text-slate-500">لوحة التحكم</p>
          <p className="text-lg font-bold text-slate-900">المنصة</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1 text-sm">
        {NAV_ITEMS.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2 transition-colors",
                active
                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                  : "text-slate-700 hover:bg-slate-50"
              )}
            >
              <span className="flex items-center gap-3">
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </span>
              <span className={cn("h-2 w-2 rounded-full", active ? "bg-amber-500" : "bg-transparent")} />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
