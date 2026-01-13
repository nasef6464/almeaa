'use client';

import { useState } from 'react';
import { Star, Users, Clock, BookOpen, ChevronDown, ChevronUp, Lock, Play } from 'lucide-react';

type VideoLesson = {
  id: string;
  title: string;
  duration: string;
  isLocked: boolean;
  order: number;
};

type Skill = {
  id: string;
  title: string;
  progress: number;
  lessonsCount: number;
  videoLessons: VideoLesson[];
};

type Course = {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  studentsCount: number;
  lessonsCount: number;
  duration: string;
  price: number;
  originalPrice: number | null;
  badge: string | null;
};

type Bank = {
  id: string;
  title: string;
  questionsCount: number;
  order: number;
};

type Test = {
  id: string;
  title: string;
  questionsCount: number;
  duration: string;
  order: number;
};

type Props = {
  courses: Course[];
  skills: Skill[];
  banks: Bank[];
  tests: Test[];
};

export function QudratContent({ courses, skills, banks, tests }: Props) {
  const [activeTab, setActiveTab] = useState<'courses' | 'skills' | 'banks' | 'tests'>('courses');
  const [expandedSkillId, setExpandedSkillId] = useState<string | null>(null);

  return (
    <>
      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { key: 'courses', label: '📚 الدورات', count: courses.length },
              { key: 'skills', label: '🎯 المهارات', count: skills.length },
              { key: 'banks', label: '📝 بنوك الأسئلة', count: banks.length },
              { key: 'tests', label: '✅ الاختبارات المحاكية', count: tests.length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-6 py-4 font-bold text-sm whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.key
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
                <span className="mr-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all">
                <div className="h-40 bg-gradient-to-br from-blue-500 to-indigo-600 relative">
                  {course.badge && (
                    <div className="absolute top-3 right-3 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                      {course.badge}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Star size={14} className="text-amber-500" fill="currentColor" />
                      {course.rating.toFixed(1)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {course.studentsCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={14} />
                      {course.lessonsCount} درس
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <span className="text-2xl font-black text-blue-600">{course.price}</span>
                      <span className="text-sm text-gray-600 mr-1">ريال</span>
                      {course.originalPrice && (
                        <span className="block text-xs text-gray-400 line-through">
                          {course.originalPrice} ريال
                        </span>
                      )}
                    </div>
                    <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2 rounded-lg text-sm">
                      اشترك الآن
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => setExpandedSkillId(expandedSkillId === skill.id ? null : skill.id)}
                  className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 text-right">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{skill.title}</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                          style={{ width: `${skill.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-blue-600">{skill.progress}%</span>
                      <span className="text-sm text-gray-500">{skill.lessonsCount} درس</span>
                    </div>
                  </div>
                  {expandedSkillId === skill.id ? (
                    <ChevronUp className="text-gray-400" />
                  ) : (
                    <ChevronDown className="text-gray-400" />
                  )}
                </button>

                {expandedSkillId === skill.id && skill.videoLessons.length > 0 && (
                  <div className="border-t border-gray-100 p-5 bg-gray-50">
                    <h4 className="font-bold text-gray-900 mb-3">دروس الفيديو:</h4>
                    <div className="space-y-2">
                      {skill.videoLessons.map((video) => (
                        <div
                          key={video.id}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            video.isLocked ? 'bg-gray-100' : 'bg-white hover:bg-blue-50 cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {video.isLocked ? (
                              <Lock size={18} className="text-gray-400" />
                            ) : (
                              <Play size={18} className="text-blue-600" />
                            )}
                            <span className={`font-medium ${video.isLocked ? 'text-gray-400' : 'text-gray-700'}`}>
                              {video.title}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock size={14} />
                            {video.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Banks Tab */}
        {activeTab === 'banks' && (
          <div className="grid md:grid-cols-2 gap-6">
            {banks.map((bank) => (
              <div key={bank.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{bank.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-2">
                    <BookOpen size={18} className="text-blue-600" />
                    {bank.questionsCount} سؤال
                  </span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg">
                  ابدأ التدريب
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tests Tab */}
        {activeTab === 'tests' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test) => (
              <div key={test.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{test.title}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center justify-between">
                    <span>عدد الأسئلة:</span>
                    <span className="font-bold text-gray-900">{test.questionsCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>المدة:</span>
                    <span className="font-bold text-gray-900">{test.duration}</span>
                  </div>
                </div>
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg">
                  ابدأ الاختبار
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
