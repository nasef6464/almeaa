import { AlertCircle, XCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  title?: string;
}

export function ErrorMessage({ message, title }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-start gap-3">
      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div>
        {title && <p className="font-semibold mb-1">{title}</p>}
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}

export function ErrorPage({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">حدث خطأ</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <a
          href="/dashboard"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          العودة للوحة التحكم
        </a>
      </div>
    </div>
  );
}
