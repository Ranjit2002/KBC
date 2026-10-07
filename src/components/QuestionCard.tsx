import React from 'react';
import type { Question } from '../types/kbc';
import { Sparkles, Tag } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
}) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto my-3 sm:my-5 px-2 sm:px-4">
      {/* Background horizontal connecting laser line */}
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 pointer-events-none" />

      {/* Main Beveled Question Container */}
      <div className="relative z-10 mx-auto bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 border-2 border-yellow-500/70 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl shadow-blue-900/60 kbc-clip-lg">
        {/* Subtle metallic inner rim */}
        <div className="absolute inset-1 rounded-xl sm:rounded-2xl border border-yellow-300/20 pointer-events-none" />

        {/* Top meta tags */}
        <div className="flex items-center justify-between gap-2 mb-3 border-b border-blue-800/40 pb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-yellow-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-mono">
              Question {questionNumber} • {question.prize}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-medium text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-800/50">
            <Tag className="w-3 h-3" />
            <span>{question.category}</span>
          </div>
        </div>

        {/* Question Text */}
        <div className="space-y-2 text-center py-1">
          {/* English Text */}
          <h2 className="text-base sm:text-xl md:text-2xl font-bold text-white tracking-wide leading-relaxed drop-shadow-md">
            {question.question}
          </h2>

          {/* Hindi Text */}
          {question.questionHindi && (
            <p className="text-sm sm:text-lg md:text-xl font-medium text-amber-200/90 tracking-wide font-sans leading-relaxed">
              {question.questionHindi}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
