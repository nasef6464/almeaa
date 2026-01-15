'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TestLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@almeaa.com');
  const [password, setPassword] = useState('AdminPass@2024');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testDirectAPI = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      setResult({
        status: response.status,
        success: data.success,
        data: data,
        timestamp: new Date().toLocaleString('ar-EG')
      });

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('✅ تم تسجيل الدخول بنجاح!');
      }
    } catch (error: any) {
      setResult({
        error: error.message,
        timestamp: new Date().toLocaleString('ar-EG')
      });
    } finally {
      setLoading(false);
    }
  };

  const testNextAuth = async () => {
    setLoading(true);
    setResult(null);

    try {
      const { signIn } = await import('next-auth/react');
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      setResult({
        method: 'NextAuth',
        result: result,
        timestamp: new Date().toLocaleString('ar-EG')
      });

      if (result?.ok) {
        alert('✅ NextAuth: تم تسجيل الدخول بنجاح!');
        router.push('/dashboard');
      } else {
        alert('❌ NextAuth: فشل تسجيل الدخول\n' + result?.error);
      }
    } catch (error: any) {
      setResult({
        method: 'NextAuth',
        error: error.message,
        timestamp: new Date().toLocaleString('ar-EG')
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">🧪 اختبار تسجيل الدخول</h1>

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={testDirectAPI}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              اختبار API المباشر
            </button>

            <button
              onClick={testNextAuth}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            >
              اختبار NextAuth
            </button>
          </div>

          {loading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">جاري الاختبار...</p>
            </div>
          )}

          {result && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">📊 النتيجة:</h2>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-sm direction-ltr">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold mb-2">📝 الحسابات المتاحة:</h3>
            <ul className="text-sm space-y-1">
              <li>• admin@almeaa.com / AdminPass@2024</li>
              <li>• manager@almeaa.com / ManagerPass@2024</li>
              <li>• student@example.com / student123</li>
            </ul>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => router.push('/auth/signin')}
              className="text-blue-600 hover:underline"
            >
              → الذهاب إلى صفحة تسجيل الدخول العادية
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
