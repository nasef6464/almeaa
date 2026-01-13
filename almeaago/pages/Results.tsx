import React from 'react';
import { recentQuizResult } from '../services/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ArrowRight, RefreshCw, PlusCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';

const Results: React.FC = () => {
    const data = [
        { name: 'Success', value: recentQuizResult.score },
        { name: 'Fail', value: 100 - recentQuizResult.score },
    ];
    const COLORS = ['#10b981', '#dc2626']; // Emerald, Red

    return (
        <div className="space-y-6 pb-20">
            <header className="flex items-center gap-4 mb-6">
                <Link to="/" className="text-gray-500"><ArrowRight /></Link>
                <h1 className="text-xl font-bold">مراجعة الإجابات</h1>
            </header>

            <Card className="p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{recentQuizResult.quizTitle}</h2>
                
                <div className="flex justify-center items-center gap-4 text-sm font-bold mb-8">
                     <div className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                        <span>نسبة النجاح</span>
                     </div>
                     <div className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-red-600"></span>
                        <span>لم ينجح</span>
                     </div>
                </div>

                {/* Donut Chart */}
                <div className="h-64 relative flex justify-center items-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={0}
                                dataKey="value"
                                startAngle={90}
                                endAngle={-270}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-red-600">{recentQuizResult.score}%</span>
                        <span className="text-sm text-gray-500">لم ينجح</span>
                    </div>
                </div>

                <div className="bg-red-900 text-white inline-block px-3 py-1 rounded text-sm font-bold mt-[-40px] relative z-10">
                    {recentQuizResult.score < 50 ? '95' : '0'} {/* Placeholder for remaining percentage visual */}
                </div>
            </Card>

            {/* Stats Grid (PDF 9) */}
            <div className="bg-secondary-500 text-white p-3 text-center font-bold rounded-t-xl">
                إحصائيات الاختبار
            </div>
            <div className="bg-white border border-gray-200 rounded-b-xl overflow-hidden">
                <StatRow label="عدد الأسئلة" value="60" />
                <StatRow label="الوقت المستغرق" value={recentQuizResult.timeSpent} />
                <StatRow label="عمليات حسابية" value="3%" color="text-red-500" />
                <StatRow label="جبر" value="25%" color="text-red-500" />
                <StatRow label="الإجابات الصحيحة" value={recentQuizResult.correctAnswers.toString()} color="text-emerald-500" />
                <StatRow label="الأخطاء" value={recentQuizResult.wrongAnswers.toString()} color="text-red-500" />
                <StatRow label="لم يتم حلها" value={recentQuizResult.unanswered.toString()} color="text-amber-500" />
            </div>

            <div className="flex flex-col gap-3 mt-6">
                <button className="bg-emerald-500 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg shadow-emerald-200">
                    <Eye size={20} />
                    عرض تفصيلي للنتيجة
                </button>
                
                <div className="grid grid-cols-1 gap-3">
                     <button className="bg-white border border-emerald-500 text-emerald-600 py-3 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-emerald-50">
                        <RefreshCw size={20} />
                        إعادة الاختبار
                    </button>
                    <button className="bg-white border border-amber-500 text-amber-600 py-3 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-amber-50">
                        <PlusCircle size={20} />
                        اختبار إضافي
                    </button>
                </div>
            </div>
        </div>
    );
};

const StatRow = ({ label, value, color = "text-gray-800" }: { label: string; value: string; color?: string }) => (
    <div className="flex justify-between items-center p-4 border-b border-gray-100 last:border-0">
        <span className="font-bold text-lg text-gray-900">{label}</span>
        <span className={`font-bold text-lg ${color}`}>{value}</span>
    </div>
);

export default Results;
