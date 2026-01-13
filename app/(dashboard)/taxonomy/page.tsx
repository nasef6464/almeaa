import Sidebar from "@/components/layout/Sidebar";
import { TreeNode, type TaxonomyNode } from "@/components/taxonomy/TreeNode";
import { prisma } from "@/app/db";
import { PlusCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

// تحويل بيانات Prisma إلى شجرة
function buildTaxonomyTree(subjects: any[]): TaxonomyNode[] {
  return subjects.map(subject => ({
    id: subject.id,
    name: subject.name,
    type: "subject" as const,
    children: subject.categories?.map((category: any) => ({
      id: category.id,
      name: category.name,
      type: "branch" as const,
      children: category.sections?.map((section: any) => ({
        id: section.id,
        name: section.name,
        type: "section" as const,
        children: section.skills?.map((skill: any) => ({
          id: skill.id,
          name: skill.name,
          type: "skill" as const,
        })) || []
      })) || []
    })) || []
  }));
}

export const dynamic = 'force-dynamic';

export default async function TaxonomyPage() {
  // جلب البيانات الحقيقية من قاعدة البيانات
  const subjects = await prisma.subject.findMany({
    where: { status: "PUBLISHED" },
    include: {
      categories: {
        where: { status: "PUBLISHED" },
        include: {
          sections: {
            where: { status: "PUBLISHED" },
            include: {
              skills: {
                where: { status: "PUBLISHED" },
                orderBy: { order: "asc" }
              }
            },
            orderBy: { order: "asc" }
          }
        },
        orderBy: { order: "asc" }
      }
    },
    orderBy: { order: "asc" }
  });

  const taxonomyTree = buildTaxonomyTree(subjects);

  return (
    <div className="min-h-screen bg-slate-50 flex" dir="rtl">
      <Sidebar />
      <main className="flex-1 p-8 space-y-6">
        <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm text-slate-500">إدارة التصنيف</p>
            <h1 className="text-2xl font-bold text-slate-900">شجرة المهارات</h1>
            <p className="text-sm text-slate-600">استعرض المواد، الفروع، الأقسام والمهارات المرتبطة بها.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/taxonomy/add-subject" className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 text-sm font-semibold">
              <PlusCircle size={16} />
              إضافة مادة
            </Link>
            <button className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 text-sm font-semibold">
              <RefreshCw size={16} />
              تحديث
            </button>
          </div>
        </header>

        <section className="space-y-3">
          {taxonomyTree.length > 0 ? (
            taxonomyTree.map((node) => (
              <TreeNode key={node.id} node={node} />
            ))
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">لا توجد مواد دراسية بعد</h3>
              <p className="text-slate-600 mb-4">ابدأ بإضافة المواد الدراسية وتنظيم المهارات</p>
              <Link href="/taxonomy/add-subject" className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600">
                <PlusCircle size={16} />
                إضافة أول مادة
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
