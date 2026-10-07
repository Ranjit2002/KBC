import React from 'react';
import { MONEY_LADDER } from '../data/questions';
import { CheckCircle2, Shield, Trophy } from 'lucide-react';

interface MoneyLadderProps {
  currentLevel: number; // 1 to 16
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const MoneyLadder: React.FC<MoneyLadderProps> = ({
  currentLevel,
  isOpenMobile,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Ladder Container: sticky in desktop, slide-over drawer in mobile */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 lg:w-80 bg-slate-950/95 border-l border-blue-900/60 p-3 sm:p-4 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:z-10 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header inside Ladder */}
        <div className="flex items-center justify-between pb-3 border-b border-blue-900/40">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-yellow-300 font-mono">
              Money Tree • पड़ाव
            </h2>
          </div>
          <button
            onClick={onCloseMobile}
            className="lg:hidden text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900"
          >
            Close
          </button>
        </div>

        {/* The 16 Rungs */}
        <div className="flex-1 overflow-y-auto py-2 space-y-1 sm:space-y-1.5 scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-transparent">
          {MONEY_LADDER.map((item) => {
            const isCurrent = item.level === currentLevel;
            const isCompleted = item.level < currentLevel;
            const isMilestone = item.isMilestone;

            let rowBg = 'bg-slate-900/40 hover:bg-slate-800/40 border-slate-800/60';
            let textColor = isMilestone ? 'text-amber-200 font-bold' : 'text-blue-300/80';

            if (isCurrent) {
              rowBg = 'bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 border-yellow-300 shadow-lg shadow-yellow-500/30 scale-[1.02]';
              textColor = 'text-slate-950 font-black';
            } else if (isCompleted) {
              rowBg = 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300';
              textColor = 'text-emerald-300/80';
            }

            return (
              <div
                key={item.level}
                className={`relative flex items-center justify-between px-3 py-1.5 rounded border transition-all duration-200 text-xs sm:text-sm ${rowBg}`}
              >
                {/* Left side: Level number & Indicator */}
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-xs w-5 text-right ${
                      isCurrent ? 'text-slate-950 font-bold' : isCompleted ? 'text-emerald-400' : 'text-blue-400/60'
                    }`}
                  >
                    {item.level}
                  </span>

                  {isCurrent && (
                    <span className="inline-block w-2 h-2 rounded-full bg-slate-950 animate-ping mr-0.5" />
                  )}

                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : isMilestone ? (
                    <Shield
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isCurrent ? 'text-slate-950' : 'text-yellow-400 animate-pulse'
                      }`}
                    />
                  ) : (
                    <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-slate-950' : 'bg-blue-600/60'}`} />
                  )}

                  {/* Milestone tag */}
                  {isMilestone && !isCurrent && (
                    <span className="text-[9px] font-semibold tracking-wider uppercase px-1 py-0.2 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                      PADAV
                    </span>
                  )}
                </div>

                {/* Right side: Prize Amount */}
                <div className="flex items-center gap-1 font-mono tracking-wide">
                  <span className={textColor}>{item.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestone info legend at bottom */}
        <div className="pt-2 border-t border-blue-900/40 text-[10px] sm:text-xs text-blue-300/70 space-y-1">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-yellow-400" /> Q5 Padav:
            </span>
            <span className="font-mono text-yellow-300 font-bold">₹10,000 Guaranteed</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-yellow-400" /> Q10 Padav:
            </span>
            <span className="font-mono text-yellow-300 font-bold">₹3,20,000 Guaranteed</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Trophy className="w-3 h-3 text-amber-300" /> Q16 Jackpot:
            </span>
            <span className="font-mono text-amber-300 font-bold">₹7,00,00,000</span>
          </div>
        </div>
      </aside>
    </>
  );
};
