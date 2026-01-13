import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/signin');
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">🎓 Adaptive Learning Platform</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">
                {user.name} <span className="text-gray-500">({user.role})</span>
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
            Welcome, {user.name}! 👋
          </h2>
          <p className="text-gray-600">
            Role: <span className="font-semibold text-blue-600">{user.role}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold mb-2">Skills Mastery</h3>
            <p className="text-blue-100 text-sm">Track your progress across subjects</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-lg font-semibold mb-2">Analytics</h3>
            <p className="text-green-100 text-sm">View detailed performance insights</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="text-4xl mb-3">🎥</div>
            <h3 className="text-lg font-semibold mb-2">Video Library</h3>
            <p className="text-purple-100 text-sm">Access personalized content</p>
          </div>
        </div>

        {user.role === 'STUDENT' && (
          <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📚 Your Learning Path</h3>
            <p className="text-gray-600 mb-4">Start mastering skills today</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                  🔢
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Mathematics</h4>
                  <p className="text-sm text-gray-600">Algebra • Linear Equations</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-blue-600">3 Skills</div>
                  <div className="text-xs text-gray-500">6 Questions</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
