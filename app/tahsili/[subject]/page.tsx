'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, Users, Clock, BookOpen, ChevronDown, ChevronUp, Lock, Play } from 'lucide-react';
import { courses, skills, banks, tests, packages } from '@/app/lib/catalogData';

type TahsiliSubject = 'math' | 'physics' | 'chemistry' | 'biology' | 'offers';

export default function TahsiliPage({ params }: { params: { subject: string } }) {
  const subject = params.subject as TahsiliSubject;
  const [activeTab, setActiveTab] = useState<'courses' | 'skills' | 'banks' | 'tests'>('courses');
  const [expandedSkillId, setExpandedSkillId] = useState<string | null>(null);

  const subjectCourses = courses[subject === 'offers' ? 'math' : subject] || [];
  const subjectSkills = skills[subject === 'offers' ? 'math' : subject] || [];
  const subjectBanks = banks[subject === 'offers' ? 'math' : subject] || [];
  const subjectTests = tests[subject === 'offers' ? 'math' : subject] || [];

  const titles: Record<TahsiliSubject, string> = {
    math: 'التحصيلي - الرياضيات',
    physics: 'التحصيلي - الفيزياء',
    chemistry: 'التحصيلي - الكيمياء',
    biology: 'التحصيلي - الأحياء',
    offers: 'عروض التحصيلي'
  };

  if (subject === 'offers') {
    return (
      <div className="bg-gray-50 min-h-screen pb-20" dir="rtl">
        <header className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl font-bold mb-2">عروض وباقات التحصيلي</h1>
            <p className="text-lg text-emerald-100">اختر الباقة المناسبة لك واحصل على أفضل الأسعار</p>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-6">
            {packages.tahsili.map((pkg) => (
              <div key={pkg.id} className={`${pkg.colorClass} text-white rounded-2xl p-6 shadow-xl relative overflow-hidden`}>
                {pkg.isPopular && (
                  <div className="absolute top-4 left-4 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                    الأكثر شعبية
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{pkg.title}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-black">{pkg.price}</span>
                  <span className="text-xl mr-2">ريال</span>
                  {pkg.originalPrice && (
                    <span className="block text-sm line-through opacity-75 mt-1">
                      {pkg.originalPrice} ريال
                    </span>
                  )}
                </div>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-white/90">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-white text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-100 transition-all">
                  اشترك الآن
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20" dir="rtl">
      <header className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-2">{titles[subject]}</h1>
          <p className="text-lg text-emerald-100">دورات، مهارات، بنوك أسئلة، واختبارات محاكية</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {['courses', 'skills', 'banks', 'tests'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-4 font-bold text-sm whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'courses' && '📚 الدورات'}
                {tab === 'skills' && '🎯 المهارات'}
                {tab === 'banks' && '📝 بنوك الأسئلة'}
                {tab === 'tests' && '✅ الاختبارات المحاكية'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjectCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all">
                <div className="h-40 bg-gradient-to-br from-emerald-500 to-teal-600 relative">
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
                      {course.rating}
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
                      <span className="text-2xl font-black text-emerald-600">{course.price}</span>
                      <span className="text-sm text-gray-600 mr-1">ريال</span>
                      {course.originalPrice && (
                        <span className="block text-xs text-gray-400 line-through">
                          {course.originalPrice} ريال
                        </span>
                      )}
                    </div>
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-lg text-sm">
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
            {subjectSkills.map((skill) => (
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
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full"
                          style={{ width: `${skill.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-emerald-600">{skill.progress}%</span>
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
                            video.isLocked ? 'bg-gray-100' : 'bg-white hover:bg-emerald-50 cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {video.isLocked ? (
                              <Lock size={18} className="text-gray-400" />
                            ) : (
                              <Play size={18} className="text-emerald-600" />
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
            {subjectBanks.map((bank) => (
              <div key={bank.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{bank.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{bank.questionsCount} سؤال</span>
                  <span>آخر تحديث: {bank.updatedAt}</span>
                </div>
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg">
                  ابدأ التدريب
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tests Tab */}
        {activeTab === 'tests' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjectTests.map((test) => (
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
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg">
                  ابدأ الاختبار
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
