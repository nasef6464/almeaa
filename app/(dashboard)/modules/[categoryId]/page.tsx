import { notFound } from 'next/navigation';
import prisma from '@/app/db';
import ModuleCard from '@/components/modules/ModuleCard';

interface PageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

export default async function CategoryModulesPage({ params }: PageProps) {
  const { categoryId } = await params;

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      modules: {
        where: { isVisible: true },
        include: {
          items: {
            orderBy: { order: 'asc' }
          }
        },
        orderBy: { order: 'asc' }
      }
    }
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        {category.description && (
          <p className="text-gray-600">{category.description}</p>
        )}
      </div>

      {category.modules.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">لا توجد وحدات متاحة حالياً</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {category.modules.map((module) => (
            <ModuleCard
              key={module.id}
              title={module.title}
              description={module.description}
              type={module.type}
              icon={module.icon}
              color={module.color}
              items={module.items}
            />
          ))}
        </div>
      )}
    </div>
  );
}
