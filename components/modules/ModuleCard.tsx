'use client';

import { useState } from 'react';
import { FileDown, BookOpen, CreditCard, FileText, X } from 'lucide-react';
import type { ModuleType } from '@prisma/client';

interface ModuleItem {
  id: string;
  title: string;
  description?: string | null;
  fileUrl?: string | null;
  fileName?: string | null;
  fileSize?: string | null;
  videoUrl?: string | null;
  duration?: string | null;
  frontText?: string | null;
  backText?: string | null;
  order: number;
}

interface ModuleCardProps {
  title: string;
  description?: string | null;
  type: ModuleType;
  icon?: string | null;
  color?: string | null;
  items: ModuleItem[];
}

export default function ModuleCard({ title, description, type, color, items }: ModuleCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const colorClasses = {
    purple: 'border-purple-500 bg-purple-50',
    blue: 'border-blue-500 bg-blue-50',
    green: 'border-green-500 bg-green-50',
    amber: 'border-amber-500 bg-amber-50'
  };

  const borderColor = color && color in colorClasses 
    ? colorClasses[color as keyof typeof colorClasses]
    : 'border-gray-500 bg-gray-50';

  const getIcon = () => {
    switch (type) {
      case 'FLASHCARDS':
        return <CreditCard className="w-6 h-6" />;
      case 'PAST_PAPERS':
        return <FileText className="w-6 h-6" />;
      case 'DOWNLOADS':
        return <FileDown className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  const toggleFlip = (itemId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={`p-6 rounded-xl border-2 ${borderColor} cursor-pointer hover:shadow-lg transition-all`}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-white">
            {getIcon()}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-xl mb-2">{title}</h3>
            {description && (
              <p className="text-gray-600 text-sm">{description}</p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              {items.length} عنصر
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                {description && (
                  <p className="text-gray-600 mt-1">{description}</p>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {type === 'FLASHCARDS' && (
                <div className="grid gap-4 md:grid-cols-2">
                  {items.map((item) => {
                    const isFlipped = flippedCards.has(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleFlip(item.id)}
                        className="relative h-48 cursor-pointer"
                        style={{ perspective: '1000px' }}
                      >
                        <div
                          className={`relative w-full h-full transition-transform duration-500`}
                          style={{
                            transformStyle: 'preserve-3d',
                            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                          }}
                        >
                          {/* Front */}
                          <div
                            className="absolute w-full h-full bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 flex items-center justify-center text-white text-center"
                            style={{ backfaceVisibility: 'hidden' }}
                          >
                            <div>
                              <p className="text-lg font-semibold">{item.frontText}</p>
                              <p className="text-sm mt-4 opacity-80">اضغط للإجابة</p>
                            </div>
                          </div>

                          {/* Back */}
                          <div
                            className="absolute w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 flex items-center justify-center text-white text-center overflow-y-auto"
                            style={{
                              backfaceVisibility: 'hidden',
                              transform: 'rotateY(180deg)'
                            }}
                          >
                            <pre className="text-sm whitespace-pre-wrap font-sans">
                              {item.backText}
                            </pre>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {(type === 'PAST_PAPERS' || type === 'DOWNLOADS') && (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-xl p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{item.title}</h3>
                          {item.description && (
                            <p className="text-gray-600 text-sm mt-1">
                              {item.description}
                            </p>
                          )}
                          {item.fileSize && (
                            <p className="text-xs text-gray-500 mt-2">
                              الحجم: {item.fileSize}
                            </p>
                          )}
                        </div>
                        {item.fileUrl && (
                          <a
                            href={item.fileUrl}
                            download={item.fileName}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FileDown className="w-4 h-4" />
                            <span className="text-sm">تحميل</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {type === 'SKILLS' && (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-xl p-4 hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      {item.description && (
                        <p className="text-gray-600 text-sm mt-1">
                          {item.description}
                        </p>
                      )}
                      {item.duration && (
                        <p className="text-xs text-gray-500 mt-2">
                          المدة: {item.duration}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
