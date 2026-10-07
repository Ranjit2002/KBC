import React from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
  totalTime: number;
  isUnlimited: boolean;
  isPaused: boolean;
}

export const Timer: React.FC<TimerProps> = ({
  timeLeft,
  totalTime,
  isUnlimited,
}) => {
  if (isUnlimited) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/40 bg-blue-950/60 shadow-md shadow-blue-900/30">
        <Clock className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-mono font-semibold text-cyan-300">
          समय सीमा समाप्त (Unlimited Time)
        </span>
      </div>
    );
  }

  const isUrgent = timeLeft <= 10;
  const progressPercent = Math.max(0, (timeLeft / totalTime) * 100);

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
          isUrgent
            ? 'border-red-500 bg-red-950/80 shadow-lg shadow-red-500/50 animate-pulse'
            : 'border-yellow-400/80 bg-blue-950/90 shadow-md shadow-yellow-500/20'
        }`}
      >
        {/* Circular SVG Progress */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-slate-800"
            strokeWidth="3"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={`transition-all duration-1000 ease-linear ${
              isUrgent ? 'text-red-500' : 'text-yellow-400'
            }`}
            strokeDasharray={`${progressPercent}, 100`}
            strokeWidth="3.2"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>

        {/* Time Text */}
        <span
          className={`font-mono font-extrabold text-base sm:text-lg z-10 ${
            isUrgent ? 'text-red-300' : 'text-yellow-300'
          }`}
        >
          {timeLeft}
        </span>
      </div>
      <span className="text-[10px] text-blue-300/80 uppercase tracking-widest mt-0.5 font-medium">
        घड़ी बाबू
      </span>
    </div>
  );
};
