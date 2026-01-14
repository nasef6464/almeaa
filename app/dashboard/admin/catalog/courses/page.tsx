'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface Course {
  id: string;
  category: string;
  title: string;
  instructor: string;
  rating: number;
  studentsCount: number;
  price: number;
  oldPrice?: number;
  badge?: string;
  imageUrl?: string;
  isPublished: boolean;
  order: number;
}

export default function CoursesManagementPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { value: 'QUDRAT_QUANT', label: 'القدرات الكمي' },
    { value: 'QUDRAT_VERBAL', label: 'القدرات اللفظي' },
    { value: 'TAHSILI_MATH', label: 'التحصيلي - الرياضيات' },
    { value: 'TAHSILI_PHYSICS', label: 'التحصيلي - الفيزياء' },
    { value: 'TAHSILI_CHEMISTRY', label: 'التحصيلي - الكيمياء' },
    { value: 'TAHSILI_BIOLOGY', label: 'التحصيلي - الأحياء' },
  ];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/catalog/courses');
      const data = await response.json();
      setCourses(data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingCourse) return;

    try {
      const method = editingCourse.id ? 'PUT' : 'POST';
      const response = await fetch('/api/admin/catalog/courses', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCourse),
      });

      if (response.ok) {
        await fetchCourses();
        setIsModalOpen(false);
        setEditingCourse(null);
      }
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الدورة؟')) return;

    try {
      const response = await fetch('/api/admin/catalog/courses', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        await fetchCourses();
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const openAddModal = () => {
    setEditingCourse({
      title: '',
      instructor: '',
      category: 'QUDRAT_QUANT',
      rating: 4.5,
      studentsCount: 0,
      price: 0,
      isPublished: true,
      order: 0,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (course: Course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <div className="p-8 text-center">جاري التحميل...</div>;
  }

  return (
    <div className="p-8" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">إدارة الدورات</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          إضافة دورة جديدة
        </button>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">العنوان</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">القسم</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">المدرب</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">السعر</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الطلاب</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الحالة</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{course.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {categories.find(c => c.value === course.category)?.label}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{course.instructor}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{course.price} ر.س</td>
                <td className="px-6 py-4 text-sm text-gray-600">{course.studentsCount}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                    course.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {course.isPublished ? 'منشور' : 'مسودة'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(course)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && editingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingCourse.id ? 'تعديل الدورة' : 'إضافة دورة جديدة'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الدورة</label>
                <input
                  type="text"
                  value={editingCourse.title || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">القسم</label>
                <select
                  value={editingCourse.category || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم المدرب</label>
                <input
                  type="text"
                  value={editingCourse.instructor || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, instructor: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">السعر</label>
                  <input
                    type="number"
                    value={editingCourse.price || 0}
                    onChange={(e) => setEditingCourse({ ...editingCourse, price: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">السعر القديم (اختياري)</label>
                  <input
                    type="number"
                    value={editingCourse.oldPrice || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, oldPrice: parseFloat(e.target.value) || undefined })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">التقييم</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={editingCourse.rating || 0}
                    onChange={(e) => setEditingCourse({ ...editingCourse, rating: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">عدد الطلاب</label>
                  <input
                    type="number"
                    value={editingCourse.studentsCount || 0}
                    onChange={(e) => setEditingCourse({ ...editingCourse, studentsCount: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الشارة (Badge)</label>
                <input
                  type="text"
                  value={editingCourse.badge || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, badge: e.target.value })}
                  placeholder="مثال: الأكثر مبيعاً"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingCourse.isPublished || false}
                    onChange={(e) => setEditingCourse({ ...editingCourse, isPublished: e.target.checked })}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">نشر الدورة</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                <Save size={20} />
                حفظ
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
