import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface PaymentSuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');

  const params = await searchParams;
  const sessionId = params.session_id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            تمت العملية بنجاح!
          </h1>
          <p className="text-gray-600">
            شكراً لاشتراكك في منصة المئة
          </p>
        </div>

        {/* Details */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
          <p className="text-green-900 mb-2">
            ✅ تم تأكيد الدفع بنجاح
          </p>
          <p className="text-green-900 mb-2">
            ✅ تم تفعيل حسابك
          </p>
          <p className="text-green-900">
            ✅ يمكنك الآن الوصول لجميع المحتويات
          </p>
        </div>

        {/* Session ID */}
        {sessionId && (
          <p className="text-xs text-gray-500 mb-6">
            رقم العملية: {sessionId.slice(-10)}
          </p>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-bold hover:from-green-700 hover:to-emerald-700 transition"
          >
            ابدأ التعلم الآن
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/dashboard/my-courses"
            className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            عرض دوراتي
          </Link>
        </div>

        {/* Support */}
        <p className="text-sm text-gray-500 mt-6">
          هل لديك أي استفسار؟{' '}
          <a href="mailto:support@almeaa.com" className="text-blue-600 hover:underline">
            تواصل معنا
          </a>
        </p>
      </div>
    </div>
  );
}
