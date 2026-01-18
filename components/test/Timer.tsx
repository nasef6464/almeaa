'use client';

import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface TimerProps {
  seconds: number;
  onExpire: () => void;
}

export function Timer({ seconds, onExpire }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  // const [hasExpired, setHasExpired] = useState(false); // Removed unused state

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (timeLeft === 0) {
      onExpire();
    }
  }, [timeLeft, onExpire]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const isLowTime = timeLeft < 300; // أقل من 5 دقائق
  const isCritical = timeLeft < 60; // أقل من دقيقة

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-lg transition-colors ${
        isCritical
          ? 'bg-red-100 text-red-700 animate-pulse'
          : isLowTime
          ? 'bg-amber-100 text-amber-700'
          : 'bg-blue-100 text-blue-700'
      }`}
    >
      {isLowTime && <AlertCircle className="w-5 h-5" />}
      <span className="tabular-nums">
        {minutes.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
      </span>
    </div>
  );
}
