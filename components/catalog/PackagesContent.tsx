'use client';

import { Star, Users, Clock, BookOpen } from 'lucide-react';

type Package = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  originalPrice: number | null;
  features: string[];
  isPopular: boolean;
  colorClass: string;
};

type Props = {
  packages: Package[];
  type: 'qudrat' | 'tahsili';
};

export function PackagesContent({ packages, type }: Props) {
  const gradients = [
    'bg-gradient-to-br from-blue-500 to-indigo-600',
    'bg-gradient-to-br from-purple-500 to-pink-600',
    'bg-gradient-to-br from-emerald-500 to-teal-600',
    'bg-gradient-to-br from-orange-500 to-red-600',
    'bg-gradient-to-br from-cyan-500 to-blue-600',
    'bg-gradient-to-br from-green-500 to-emerald-600'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <div 
            key={pkg.id} 
            className={`${gradients[index % gradients.length]} text-white rounded-2xl p-6 shadow-xl relative overflow-hidden`}
          >
            {pkg.isPopular && (
              <div className="absolute top-4 left-4 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                الأكثر شعبية
              </div>
            )}
            <h3 className="text-2xl font-bold mb-4">{pkg.title}</h3>
            {pkg.description && (
              <p className="text-sm opacity-90 mb-4">{pkg.description}</p>
            )}
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
  );
}
