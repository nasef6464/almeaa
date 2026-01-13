
import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { Loader2 } from 'lucide-react';

// Lazy Load Pages
const Landing = React.lazy(() => import('./pages/Landing').then(module => ({ default: module.Landing })));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Quiz = React.lazy(() => import('./pages/Quiz'));
const Results = React.lazy(() => import('./pages/Results'));
const Quizzes = React.lazy(() => import('./pages/Quizzes'));
const Reports = React.lazy(() => import('./pages/Reports'));
const Favorites = React.lazy(() => import('./pages/Favorites'));
const Plan = React.lazy(() => import('./pages/Plan'));
const QA = React.lazy(() => import('./pages/QA'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Courses = React.lazy(() => import('./pages/Courses'));
const CourseDetails = React.lazy(() => import('./pages/CourseDetails').then(module => ({ default: module.CourseDetails })));
const QuizGenerator = React.lazy(() => import('./components/QuizGenerator').then(module => ({ default: module.QuizGenerator })));
const Achievements = React.lazy(() => import('./pages/Achievements').then(module => ({ default: module.Achievements })));
const Qudrat = React.lazy(() => import('./pages/Qudrat').then(module => ({ default: module.Qudrat })));
const QudratSection = React.lazy(() => import('./pages/QudratSection').then(module => ({ default: module.QudratSection })));
const Tahsili = React.lazy(() => import('./pages/Tahsili').then(module => ({ default: module.Tahsili })));
const TahsiliSubject = React.lazy(() => import('./pages/TahsiliSubject').then(module => ({ default: module.TahsiliSubject })));
const QuestionBankDetails = React.lazy(() => import('./pages/QuestionBankDetails').then(module => ({ default: module.QuestionBankDetails })));
const Blog = React.lazy(() => import('./pages/Blog').then(module => ({ default: module.Blog })));
const Tests = React.lazy(() => import('./pages/Tests').then(module => ({ default: module.Tests })));
const SaherTest = React.lazy(() => import('./pages/SaherTest').then(module => ({ default: module.SaherTest })));
const SimulationTests = React.lazy(() => import('./pages/SimulationTests').then(module => ({ default: module.SimulationTests }))) as React.ComponentType<any>;

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 text-amber-500">
    <Loader2 className="w-10 h-10 animate-spin" />
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Routes without Main Layout (Full Screen) */}
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />

          {/* Routes with Main Layout */}
          <Route path="*" element={
            <Layout>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/course/:courseId" element={<CourseDetails />} />
                  
                  <Route path="/quizzes" element={<Quizzes />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/plan" element={<Plan />} />
                  <Route path="/qa" element={<QA />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin/quiz-gen" element={<QuizGenerator />} />
                  <Route path="/achievements" element={<Achievements />} />
                  <Route path="/blog" element={<Blog />} />
                  
                  {/* Tests Section */}
                  <Route path="/tests" element={<Tests />} />
                  <Route path="/tests/saher" element={<SaherTest />} />
                  <Route path="/tests/qudrat-sim" element={<SimulationTests type="qudrat" />} />
                  <Route path="/tests/tahsili-sim" element={<SimulationTests type="tahsili" />} />
                  
                  {/* Qudrat Routes */}
                  <Route path="/category/qudrat" element={<Qudrat />} />
                  <Route path="/category/qudrat/:type" element={<QudratSection />} />

                  {/* Tahsili Routes */}
                  <Route path="/category/tahsili" element={<Tahsili />} />
                  <Route path="/category/tahsili/:subject" element={<TahsiliSubject />} />
                  
                  {/* Question Banks */}
                  <Route path="/bank/:bankId" element={<QuestionBankDetails />} />
                  
                  {/* Placeholder for other routes */}
                  <Route path="/category/:catId" element={<div className="p-20 text-center font-bold text-gray-500 text-xl">صفحة القسم (قيد التطوير)</div>} />
                </Routes>
              </Suspense>
            </Layout>
          } />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
