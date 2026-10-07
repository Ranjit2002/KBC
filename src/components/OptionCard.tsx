import React from 'react';
import { Check, X } from 'lucide-react';

interface OptionCardProps {
  index: number; // 0=A, 1=B, 2=C, 3=D
  text: string;
  isSelected: boolean;
  isRevealed: boolean;
  isCorrect: boolean;
  isEliminated: boolean;
  disabled: boolean;
  onSelect: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export const OptionCard: React.FC<OptionCardProps> = ({
  index,
  text,
  isSelected,
  isRevealed,
  isCorrect,
  isEliminated,
  disabled,
  onSelect,
}) => {
  const letter = LETTERS[index];

  // If eliminated by 50:50 lifeline
  if (isEliminated) {
    return (
      <div className="relative w-full h-14 sm:h-16 rounded-xl border border-slate-800/40 bg-slate-950/30 opacity-20 pointer-events-none kbc-clip flex items-center px-4">
        <span className="text-slate-600 font-bold font-mono text-sm mr-3">
          ◆ {letter}:
        </span>
        <span className="text-slate-600 line-through text-sm sm:text-base truncate">
          {text}
        </span>
      </div>
    );
  }

  // Determine state-based visual styling
  let containerClasses =
    'border-blue-700/60 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20';

  let badgeClasses = 'text-yellow-400';
  let statusBadge: React.ReactNode = null;

  if (isRevealed) {
    if (isCorrect) {
      // Flashing Green Correct Answer
      containerClasses = 'animate-kbc-correct border-emerald-400 text-white font-bold';
      badgeClasses = 'text-emerald-300';
      statusBadge = (
        <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-200 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-400 shrink-0">
          <Check className="w-3.5 h-3.5" /> Correct
        </span>
      );
    } else if (isSelected) {
      // Flashing Red Wrong Answer
      containerClasses = 'animate-kbc-wrong border-red-500 text-white font-bold';
      badgeClasses = 'text-red-300';
      statusBadge = (
        <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-red-200 bg-red-950/80 px-2 py-0.5 rounded border border-red-500 shrink-0">
          <X className="w-3.5 h-3.5" /> Incorrect
        </span>
      );
    }
  } else if (isSelected) {
    // Locked Suspense State (Pulsing Gold)
    containerClasses = 'animate-kbc-locked border-yellow-300 text-yellow-100 font-bold scale-[1.01]';
    badgeClasses = 'text-yellow-200';
    statusBadge = (
      <span className="text-[10px] font-black uppercase tracking-wider text-slate-950 bg-yellow-400 px-2 py-0.5 rounded animate-pulse shrink-0">
        LOCKED
      </span>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled || isEliminated}
      onClick={onSelect}
      className={`group relative w-full h-14 sm:h-16 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 px-3 sm:px-5 flex items-center justify-between text-left kbc-clip cursor-pointer active:scale-[0.99] shadow-md ${containerClasses} ${
        disabled && !isSelected ? 'cursor-not-allowed opacity-80' : ''
      }`}
    >
      {/* Horizontal connector line on sides */}
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-[2px] bg-cyan-400/50 pointer-events-none" />
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-[2px] bg-cyan-400/50 pointer-events-none" />

      {/* Content */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 pr-2">
        <span
          className={`font-mono font-extrabold text-sm sm:text-base shrink-0 tracking-wider ${badgeClasses}`}
        >
          ◆ {letter}:
        </span>
        <span className="text-xs sm:text-base font-semibold tracking-wide truncate">
          {text}
        </span>
      </div>

      {/* Status indicator (LOCKED / CORRECT / INCORRECT) */}
      {statusBadge}
    </button>
  );
};
