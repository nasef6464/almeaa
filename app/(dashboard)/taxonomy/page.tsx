import Sidebar from "@/components/layout/Sidebar";
import { TreeNode, type TaxonomyNode } from "@/components/taxonomy/TreeNode";

const sampleTree: TaxonomyNode[] = [
  {
    id: "subj-1",
    name: "اللغة العربية",
    type: "subject",
    children: [
      {
        id: "branch-1",
        name: "النحو",
        type: "branch",
        children: [
          {
            id: "section-1",
            name: "القواعد الأساسية",
            type: "section",
            children: [
              { id: "skill-1", name: "المبتدأ والخبر", type: "skill" },
              { id: "skill-2", name: "كان وأخواتها", type: "skill" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "subj-2",
    name: "الرياضيات",
    type: "subject",
    children: [
      {
        id: "branch-2",
        name: "الجبر",
        type: "branch",
        children: [
          {
            id: "section-2",
            name: "المعادلات",
            type: "section",
            children: [
              { id: "skill-3", name: "حل المعادلات الخطية", type: "skill" },
              { id: "skill-4", name: "المتباينات", type: "skill" },
            ],
          },
        ],
      },
    ],
  },
];

export default function TaxonomyPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex" dir="rtl">
      <Sidebar />
      <main className="flex-1 p-8 space-y-6">
        <header className="flex flex-col gap-2">
          <p className="text-sm text-slate-500">إدارة التصنيف</p>
          <h1 className="text-2xl font-bold text-slate-900">شجرة المهارات</h1>
          <p className="text-sm text-slate-600">استعرض المواد، الفروع، الأقسام والمهارات المرتبطة بها.</p>
        </header>

        <section className="space-y-3">
          {sampleTree.map((node) => (
            <TreeNode key={node.id} node={node} />
          ))}
        </section>
      </main>
    </div>
  );
}
