import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, className }) => {
  const percentage = (current / total) * 100;

  return (
    <div className={cn("w-full bg-muted rounded-full h-3 overflow-hidden", className)}>
      <div
        className="h-full bg-gradient-primary transition-all duration-300 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};