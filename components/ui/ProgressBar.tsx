import React from 'react';

export function ProgressBar({ value }: { value: number }) {
  const pct = Math.min(Math.max(value, 0), 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className="h-2 rounded-full bg-indigo-500 transition-all duration-300" style={{ width: `${pct}%` }} />
    </div>
  );
}
