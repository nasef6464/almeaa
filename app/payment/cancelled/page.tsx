import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function PaymentCancelledPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        {/* Cancel Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-16 h-16 text-gray-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            تم إلغاء العملية
          </h1>
          <p className="text-gray-600">
            لم يتم إتمام عملية الدفع
          </p>
        </div>

        {/* Message */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
          <p className="text-gray-700">
            لا تقلق، لم يتم خصم أي مبلغ من حسابك.
            يمكنك المحاولة مرة أخرى في أي وقت.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/pricing"
            className="block w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            العودة للباقات
          </Link>

          <Link
            href="/dashboard"
            className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            العودة للوحة التحكم
          </Link>
        </div>

        {/* Support */}
        <p className="text-sm text-gray-500 mt-6">
          واجهت مشكلة؟{' '}
          <a href="mailto:support@almeaa.com" className="text-blue-600 hover:underline">
            تواصل مع الدعم الفني
          </a>
        </p>
      </div>
    </div>
  );
}
