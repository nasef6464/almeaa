import { Construction } from 'lucide-react';
import Link from 'next/link';

interface ComingSoonProps {
  title?: string;
  description?: string;
}

export function ComingSoon({ 
  title = 'قريباً',
  description = 'هذه الصفحة قيد التطوير حالياً'
}: ComingSoonProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center max-w-lg mx-auto px-4">
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-blue-100 rounded-full animate-pulse"></div>
          </div>
          <Construction className="w-24 h-24 text-blue-600 mx-auto relative z-10" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          {description}
        </p>
        
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <p className="text-gray-700 mb-2">🚀 نعمل بجد على تطوير هذه الميزة</p>
          <p className="text-sm text-gray-500">ستكون متاحة قريباً إن شاء الله</p>
        </div>
        
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          ← العودة للوحة التحكم
        </Link>
      </div>
    </div>
  );
}
