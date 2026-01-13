import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/app/db';
import { CreditCard } from 'lucide-react';

export default async function ParentPaymentsPage() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');
  if (session.user.role !== 'PARENT') {
    redirect('/dashboard');
  }

  const parentId = session.user.parent?.id;
  const payments = parentId
    ? await prisma.payment.findMany({
        orderBy: { paidAt: 'desc' },
        take: 5,
      })
    : [];

  return (
    <div className="space-y-6" dir="rtl">
      <header className="space-y-1">
        <p className="text-sm text-slate-500">المدفوعات</p>
        <h1 className="text-3xl font-bold text-slate-900">مدفوعات الاشتراك والدورات</h1>
        <p className="text-sm text-slate-500">سيتم الربط مع Stripe لاحقاً.</p>
      </header>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        {payments.length ? (
          <div className="grid gap-3">
            {payments.map((p) => (
              <div key={p.id} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{p.amount} {p.currency}</p>
                  <p className="text-xs text-slate-500">الحالة: {p.status}</p>
                </div>
                <p className="text-xs text-slate-500">{formatDate(p.paidAt || p.createdAt)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">لا توجد مدفوعات مسجلة حالياً.</p>
        )}
      </section>

      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 flex items-center gap-2">
        <CreditCard size={16} className="text-amber-500" /> سيتم تفعيل الدفع عبر Stripe وخطط الاشتراك قريباً.
      </div>
    </div>
  );
}

function formatDate(date: Date | null) {
  if (!date) return 'غير متاح';
  try {
    return new Intl.DateTimeFormat('ar-SA', { month: 'short', day: 'numeric' }).format(date);
  } catch {
    return '' + date;
  }
}
