import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimerProps {
  seconds: number;
  onTimeUp: () => void;
  isActive: boolean;
  className?: string;
}

export const Timer: React.FC<TimerProps> = ({ seconds, onTimeUp, isActive, className }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, onTimeUp]);

  const getTimerColor = () => {
    if (timeLeft <= 5) return 'text-destructive';
    if (timeLeft <= 10) return 'text-warning';
    return 'text-success';
  };

  const getProgressColor = () => {
    if (timeLeft <= 5) return 'bg-destructive';
    if (timeLeft <= 10) return 'bg-warning';
    return 'bg-success';
  };

  const progressPercentage = (timeLeft / seconds) * 100;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Clock className={cn("h-5 w-5", getTimerColor())} />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className={cn("text-sm font-medium", getTimerColor())}>
            {timeLeft}s
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className={cn("h-full transition-all duration-300", getProgressColor())}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};