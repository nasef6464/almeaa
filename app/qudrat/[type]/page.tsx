"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle, ChevronDown, ChevronUp, FileText, MonitorPlay, PlayCircle } from 'lucide-react';
import {
  qudratCourses,
  skillsByCategory,
  questionBanks,
  simTests,
  qudratPackages,
  videoLessons,
  qudratTabs,
} from '@/app/lib/catalogData';
import { ProgressBar } from '@/components/ui/ProgressBar';

type TabKey = (typeof qudratTabs)[number]['key'];

export default function QudratSectionPage({ params }: { params: { type: string } }) {
  const sectionType = (params.type || 'quant') as 'quant' | 'verbal' | 'packages';
  const [activeTab, setActiveTab] = useState<TabKey>('courses');
  const [expandedSkillId, setExpandedSkillId] = useState<string | null>(null);

  const courses = useMemo(() => qudratCourses.filter((c) => (sectionType === 'verbal' ? c.category === 'verbal' : c.category === 'quant')), [sectionType]);
  const skills = skillsByCategory[sectionType === 'packages' ? 'quant' : sectionType] || [];
  const banks = questionBanks[sectionType === 'packages' ? 'quant' : sectionType] || [];
  const tests = simTests[sectionType === 'packages' ? 'quant' : sectionType] || [];

  if (sectionType === 'packages') {
    return (
      <div className="bg-gray-50 min-h-screen pb-20" dir="rtl">
        <header className="bg-emerald-900 text-white py-12 relative overflow-hidden text-center">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <h1 className="text-4xl font-bold mb-2">عروض وباقات القدرات</h1>
            <p className="text-emerald-200">اختر الباقة المناسبة لاحتياجاتك وابدأ رحلة التفوق</p>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {qudratPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all relative flex flex-col">
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl z-10">الأكثر طلباً</div>
                )}
                <div className={`${pkg.color} p-6 text-white text-center`}>
                  <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                  <div className="flex justify-center items-baseline gap-1">
                    <span className="text-4xl font-black">{pkg.price}</span>
                    <span className="text-sm opacity-80">ر.س</span>
                  </div>
                  <span className="text-sm line-through opacity-60">{pkg.originalPrice} ر.س</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <ul className="space-y-4 mb-8 flex-1">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-600 text-sm">
                        <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-xl font-bold text-white transition-colors ${pkg.color.replace('bg-', 'hover:bg-').replace('600', '700').replace('500', '600')} ${pkg.color}`}>
                    اشترك الآن
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20" dir="rtl">
      <header className="bg-indigo-900 text-white py-12 relative overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold mb-2">{sectionType === 'quant' ? 'القدرات (كمي)' : 'القدرات (لفظي)'}</h1>
          <p className="text-indigo-200">تأسيس شامل، تدريب مكثف، واختبارات محاكية</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {qudratTabs.map((tab) => (
            <TabButton key={tab.key} active={activeTab === tab.key} onClick={() => setActiveTab(tab.key)} label={tab.label} icon={<tab.icon size={18} />} />
          ))}
        </div>

        <div className="animate-fade-in">
          {activeTab === 'courses' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.length ? (
                courses.map((course) => (
                  <div key={course.id} className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden bg-white rounded-2xl">
                    <div className="relative h-48 bg-gray-100 group overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur shadow-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-700 flex items-center gap-1">
                        ⭐ {course.rating}
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{course.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">👤</div>
                        <span>{course.instructor}</span>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                        <span className="text-xl font-black text-emerald-600">{course.price} <span className="text-xs font-normal text-gray-500">ر.س</span></span>
                        <Link href="/dashboard/my-courses" className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors">
                          تفاصيل
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
                  <MonitorPlay size={48} className="mx-auto mb-4 opacity-20" />
                  لا توجد دورات متاحة حالياً في هذا القسم.
                </div>
              )}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill) => {
                const isExpanded = expandedSkillId === skill.id.toString();
                const videos = videoLessons[skill.id.toString()] || [];
                const pct = (skill.completed / skill.totalLessons) * 100;
                return (
                  <div key={skill.id} className={`bg-white rounded-2xl border border-gray-100 transition-all ${isExpanded ? 'ring-2 ring-indigo-100' : 'hover:shadow-md'}`}>
                    <div className="p-5 cursor-pointer" onClick={() => setExpandedSkillId((prev) => (prev === skill.id.toString() ? null : skill.id.toString()))}>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <PlayCircle size={24} />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">{skill.title}</h3>
                            <span className="text-xs text-gray-500">{skill.totalLessons} درس فيديو</span>
                          </div>
                        </div>
                        {isExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>التقدم</span>
                          <span>{Math.round(pct)}%</span>
                        </div>
                        <ProgressBar value={pct} />
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="bg-gray-50 p-4 border-t border-gray-100 animate-fade-in">
                        <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">قائمة الدروس</h4>
                        <div className="space-y-2">
                          {videos.length ? (
                            videos.map((video) => (
                              <div key={video.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                                <div className="flex items-center gap-3">
                                  <button className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                                    <PlayCircle size={16} />
                                  </button>
                                  <span className="text-sm font-medium text-gray-700">{video.title}</span>
                                </div>
                                <span className="text-xs text-gray-400">{video.duration}</span>
                              </div>
                            ))
                          ) : (
                            <p className="text-center text-xs text-gray-400 py-2">لا توجد دروس متاحة حالياً.</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'banks' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {banks.map((bank) => (
                <div key={bank.id} className="bg-white p-6 text-center border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all rounded-2xl">
                  <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
                    <BookOpen size={32} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{bank.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{bank.questions} سؤال • تحديث {bank.updated}</p>
                  <Link href="/dashboard/tests" className="block w-full bg-indigo-600 text-white py-2 rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors">
                    تصفح الأسئلة
                  </Link>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tests' && (
            <div className="space-y-4 max-w-4xl mx-auto">
              {tests.map((test) => (
                <div key={test.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between hover:border-indigo-300 transition-all">
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{test.title}</h3>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">⏱ {test.duration}</span>
                        <span className="flex items-center gap-1">✏️ {test.questions} سؤال</span>
                      </div>
                    </div>
                  </div>
                  <Link href="/dashboard/tests" className="bg-white text-emerald-600 border-2 border-emerald-600 px-6 py-2 rounded-lg font-bold hover:bg-emerald-600 hover:text-white transition-colors">
                    بدء الاختبار
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
        active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-200'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
