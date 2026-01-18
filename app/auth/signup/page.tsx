'use client';

import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function SignUpForm() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT',
    phone: '',
    // Student specific
    grade: '',
    schoolName: '',
    dateOfBirth: '',
    // Trainer specific
    bio: '',
    specialization: '',
    // Parent specific
    relationToStudent: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          phone: formData.phone,
          // Role-specific data
          ...(formData.role === 'STUDENT' && {
            grade: formData.grade,
            schoolName: formData.schoolName,
            dateOfBirth: formData.dateOfBirth,
          }),
          ...(formData.role === 'TRAINER' && {
            bio: formData.bio,
            specialization: formData.specialization,
          }),
          ...(formData.role === 'PARENT' && {
            relationToStudent: formData.relationToStudent,
          }),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Success - redirect to sign in
      router.push('/auth/signin?registered=true');
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🎓 Create Account</h1>
          <p className="text-gray-600">Start your learning journey today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="Ahmed Mohamed"
            />
          </div>

          <div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              رقم الجوال
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="05xxxxxxxx"
            />
          </div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="student@example.com"
            />
          </  <option value="SUPERVISOR">Supervisor - مشرف</option>
            </select>
          </div>

          {/* Student-specific fields */}
          {formData.role === 'STUDENT' && (
            <>
              <div>
                <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                  المرحلة الدراسية
                </label>
                <select
                  id="grade"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                >
                  <option value="">اختر المرحلة</option>
                  <option value="Grade 1">الصف الأول</option>
                  <option value="Grade 2">الصف الثاني</option>
                  <option value="Grade 3">الصف الثالث</option>
                  <option value="Grade 4">الصف الرابع</option>
                  <option value="Grade 5">الصف الخامس</option>
                  <option value="Grade 6">الصف السادس</option>
                  <option value="Grade 7">الصف السابع</option>
                  <option value="Grade 8">الصف الثامن</option>
                  <option value="Grade 9">الصف التاسع</option>
                  <option value="Grade 10">الصف العاشر</option>
                  <option value="Grade 11">الصف الحادي عشر</option>
                  <option value="Grade 12">الصف الثاني عشر</option>
                </select>
              </div>

              <div>
                <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-2">
                  اسم المدرسة (اختياري)
                </label>
                <input
                  id="schoolName"
                  type="text"
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="مدرسة الأمل الثانوية"
                />
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                  تاريخ الميلاد
                </label>
                <input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
            </>
          )}

          {/* Trainer-specific fields */}
          {formData.role === 'TRAINER' && (
            <>
              <div>
                <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
                  التخصص
                </label>
                <input
                  id="specialization"
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="مثال: رياضيات، فيزياء، لغة عربية"
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  نبذة تعريفية
                </label>
                <textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  disabled={loading}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="نبذة مختصرة عن خبراتك ومؤهلاتك"
                />
              </div>
            </>
          )}

          {/* Parent-specific fields */}
          {formData.role === 'PARENT' && (
            <div>
              <label htmlFor="relationToStudent" className="block text-sm font-medium text-gray-700 mb-2">
                صلة القرابة
              </label>
              <select
                id="relationToStudent"
                value={formData.relationToStudent}
                onChange={(e) => setFormData({ ...formData, relationToStudent: e.target.value })}
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="">اختر صلة القرابة</option>
                <option value="father">والد</option>
                <option value="mother">والدة</option>
                <option value="guardian">ولي أمر</option>
              </select>
            </div>
          )}

          {/* Supervisor-specific note */}
          {formData.role === 'SUPERVISOR' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                📋 حساب المشرف يتطلب موافقة الإدارة. سيتم مراجعة طلبك خلال 24-48 ساعة.
              </p>
            </div>
          )}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Account Type
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            >
              <option value="STUDENT">Student - متعلم</option>
              <option value="TRAINER">Trainer - مدرب</option>
              <option value="PARENT">Parent - ولي أمر</option>
            </select>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign In
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignUpForm />
    </Suspense>
  );
}
