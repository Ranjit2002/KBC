import React, { useState, useEffect } from 'react';
import { Users, BarChart3, Check } from 'lucide-react';
import type { Question } from '../types/kbc';
import { soundService } from '../services/soundService';

interface AudiencePollModalProps {
  question: Question;
  onClose: () => void;
}

export const AudiencePollModal: React.FC<AudiencePollModalProps> = ({
  question,
  onClose,
}) => {
  const [isComputing, setIsComputing] = useState(true);
  const [percentages, setPercentages] = useState<[number, number, number, number]>([0, 0, 0, 0]);

  useEffect(() => {
    soundService.playLifeline();

    // Generate realistic poll numbers
    const timer = setTimeout(() => {
      const correctIdx = question.correctAnswerIndex;
      // High weight to correct answer
      let correctPct = 65 + Math.floor(Math.random() * 20); // 65% to 85%
      let remaining = 100 - correctPct;

      const p: [number, number, number, number] = [0, 0, 0, 0];
      const otherIndices = [0, 1, 2, 3].filter((i) => i !== correctIdx);

      const split1 = Math.floor(Math.random() * (remaining * 0.5));
      const split2 = Math.floor(Math.random() * (remaining - split1) * 0.7);
      const split3 = remaining - split1 - split2;

      p[correctIdx] = correctPct;
      p[otherIndices[0]] = split1;
      p[otherIndices[1]] = split2;
      p[otherIndices[2]] = split3;

      setPercentages(p);
      setIsComputing(false);
      soundService.playTick();
    }, 1800);

    return () => clearTimeout(timer);
  }, [question]);

  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 border-2 border-yellow-400/80 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-yellow-500/20 text-white relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-800/50 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-400/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-yellow-300 uppercase tracking-wider font-mono">
                Audience Poll • जनता जनार्दन
              </h3>
              <p className="text-xs text-blue-300/80">
                Audience members in the studio are voting via their keypads
              </p>
            </div>
          </div>
        </div>

        {/* Voting Animation or Results */}
        {isComputing ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin" />
            <p className="text-sm font-semibold text-yellow-200 animate-pulse tracking-wide font-mono">
              Recording audience votes... कृपया प्रतीक्षा करें...
            </p>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-4 gap-2 sm:gap-4 h-56 sm:h-64 items-end bg-slate-950/70 p-3 sm:p-4 rounded-xl border border-blue-900/60">
              {percentages.map((pct, idx) => {
                const isHighest = pct === Math.max(...percentages);
                return (
                  <div key={idx} className="flex flex-col items-center h-full justify-end group">
                    {/* Percentage text */}
                    <span
                      className={`text-xs sm:text-sm font-bold font-mono mb-1 ${
                        isHighest ? 'text-emerald-400 scale-110' : 'text-blue-300'
                      }`}
                    >
                      {pct}%
                    </span>

                    {/* Bar */}
                    <div className="w-full bg-slate-900 rounded-t-lg overflow-hidden flex flex-col justify-end h-40">
                      <div
                        style={{ height: `${pct}%` }}
                        className={`w-full rounded-t-lg transition-all duration-1000 ease-out flex items-center justify-center ${
                          isHighest
                            ? 'bg-gradient-to-t from-emerald-600 via-emerald-400 to-emerald-300 shadow-lg shadow-emerald-500/50'
                            : 'bg-gradient-to-t from-blue-700 to-cyan-500'
                        }`}
                      >
                        {isHighest && <Check className="w-3.5 h-3.5 text-slate-950 font-black" />}
                      </div>
                    </div>

                    {/* Option Letter Label */}
                    <span
                      className={`mt-2 font-mono font-bold text-xs sm:text-sm px-2 py-0.5 rounded ${
                        isHighest
                          ? 'bg-emerald-500 text-slate-950 shadow'
                          : 'bg-blue-950 text-yellow-400 border border-yellow-500/40'
                      }`}
                    >
                      {letters[idx]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Explanatory text */}
            <div className="text-xs text-blue-200/90 bg-blue-950/60 p-3 rounded-lg border border-blue-800/40 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Majority of the studio audience voted for{' '}
                <strong className="text-emerald-300 font-bold font-mono">
                  Option {letters[percentages.indexOf(Math.max(...percentages))]}
                </strong>
                .
              </span>
            </div>
          </div>
        )}

        {/* Close Button */}
        <div className="mt-5 pt-3 border-t border-blue-800/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 font-bold text-xs sm:text-sm hover:from-yellow-400 hover:to-amber-500 shadow-md shadow-yellow-500/30 active:scale-95 transition-all"
          >
            Continue to Answer • आगे बढ़ें
          </button>
        </div>
      </div>
    </div>
  );
};
