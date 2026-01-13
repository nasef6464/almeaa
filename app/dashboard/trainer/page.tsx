import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/app/db';

export default async function TrainerDashboard() {
  const session = await auth();

  if (!session?.user || session.user.role !== 'TRAINER') {
    redirect('/dashboard');
  }

  // Fetch trainer's courses and students
  const trainer = await prisma.trainer.findFirst({
    where: { userId: session.user.id },
    include: {
      courses: {
        include: {
          _count: {
            select: { enrollments: true },
          },
        },
      },
    },
  });

  const totalStudents = await prisma.enrollment.count({
    where: {
      course: {
        trainerId: trainer?.id,
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">👨‍🏫 Trainer Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">
                {session.user.name} <span className="text-gray-500">(Trainer)</span>
              </span>
              <form action="/api/auth/signout" method="POST">
                <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome back, {session.user.name}! 👋
          </h2>
          <p className="text-gray-600">
            Manage your courses and track student progress
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="text-3xl font-bold mb-2">{trainer?.courses.length || 0}</h3>
            <p className="text-blue-100">Active Courses</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="text-4xl mb-3">👥</div>
            <h3 className="text-3xl font-bold mb-2">{totalStudents}</h3>
            <p className="text-green-100">Enrolled Students</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="text-3xl font-bold mb-2">$0</h3>
            <p className="text-purple-100">Total Earnings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">📚 Your Courses</h3>
            
            {trainer?.courses && trainer.courses.length > 0 ? (
              <div className="space-y-4">
                {trainer.courses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4 hover:border-blue-500 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{course.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                        {course._count.enrollments} students
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                      <span>💵 ${course.price}</span>
                      <span>⏱️ {course.durationWeeks} weeks</span>
                      <span className="ml-auto">
                        <Link
                          href={`/trainer/courses/${course.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Manage →
                        </Link>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-gray-600 mb-4">No courses yet</p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Create Your First Course
                </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">🎯 Quick Actions</h3>
            
            <div className="space-y-3">
              <Link
                href="/trainer/content/create"
                className="block p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
              >
                <div className="text-3xl mb-2">➕</div>
                <div className="font-semibold text-gray-900">Create Content</div>
                <div className="text-sm text-gray-600">Add questions, videos, tests</div>
              </Link>

              <Link
                href="/trainer/students"
                className="block p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center"
              >
                <div className="text-3xl mb-2">👥</div>
                <div className="font-semibold text-gray-900">View Students</div>
                <div className="text-sm text-gray-600">Track student progress</div>
              </Link>

              <Link
                href="/trainer/analytics"
                className="block p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center"
              >
                <div className="text-3xl mb-2">📊</div>
                <div className="font-semibold text-gray-900">Analytics</div>
                <div className="text-sm text-gray-600">View detailed reports</div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Trainer Tips</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">1.</span>
              <span>Create <strong>skills-based content</strong> - each skill should have questions, videos, and tests</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">2.</span>
              <span>Use <strong>difficulty levels</strong> (EASY, MEDIUM, HARD) for adaptive testing</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">3.</span>
              <span>Monitor <strong>student mastery scores</strong> and create recovery plans for weak skills</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">4.</span>
              <span>Earn <strong>revenue share</strong> based on course enrollments and subscriptions</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
