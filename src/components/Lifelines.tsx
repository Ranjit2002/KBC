import React from 'react';
import type { LifelineState, LifelineType } from '../types/kbc';
import { Users, PhoneCall, RefreshCw, Slash } from 'lucide-react';

interface LifelinesProps {
  lifelines: LifelineState;
  onUseLifeline: (type: LifelineType) => void;
  disabled: boolean;
}

export const Lifelines: React.FC<LifelinesProps> = ({
  lifelines,
  onUseLifeline,
  disabled,
}) => {
  const items: {
    type: LifelineType;
    label: string;
    sublabel: string;
    icon: React.ReactNode;
    available: boolean;
  }[] = [
    {
      type: 'fiftyFifty',
      label: '50 : 50',
      sublabel: 'Fifty-Fifty',
      icon: (
        <span className="font-black text-xs sm:text-sm tracking-tighter font-mono">
          50:50
        </span>
      ),
      available: lifelines.fiftyFifty,
    },
    {
      type: 'audiencePoll',
      label: 'Audience Poll',
      sublabel: 'जनता जनार्दन',
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
      available: lifelines.audiencePoll,
    },
    {
      type: 'askExpert',
      label: 'Ask Expert',
      sublabel: 'एक्सपर्ट सलाह',
      icon: <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5" />,
      available: lifelines.askExpert,
    },
    {
      type: 'flipQuestion',
      label: 'Flip Question',
      sublabel: 'सवाल बदलिए',
      icon: <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />,
      available: lifelines.flipQuestion,
    },
  ];

  return (
    <div className="w-full flex items-center justify-center gap-2 sm:gap-4 my-2 sm:my-3">
      {items.map((item) => {
        const isClickable = item.available && !disabled;

        return (
          <button
            key={item.type}
            disabled={!isClickable}
            onClick={() => onUseLifeline(item.type)}
            className={`group relative flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl border transition-all duration-300 min-w-[68px] sm:min-w-[84px] ${
              item.available
                ? disabled
                  ? 'border-blue-900/60 bg-blue-950/40 text-blue-400/50 cursor-not-allowed opacity-60'
                  : 'border-yellow-400/70 bg-gradient-to-b from-blue-900/80 to-slate-950 text-yellow-300 hover:border-yellow-300 hover:shadow-lg hover:shadow-yellow-500/30 hover:scale-105 active:scale-95 cursor-pointer'
                : 'border-slate-800 bg-slate-950/60 text-slate-600 cursor-not-allowed opacity-40'
            }`}
            title={item.available ? `${item.label} (${item.sublabel})` : `${item.label} (Already Used)`}
          >
            {/* Circle Badge */}
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all ${
                item.available
                  ? 'border-yellow-400/60 bg-blue-950 shadow-inner shadow-yellow-400/20 group-hover:border-yellow-300'
                  : 'border-slate-800 bg-slate-900/80'
              }`}
            >
              {item.icon}
            </div>

            {/* Crossed out red slash if used */}
            {!item.available && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Slash className="w-8 h-8 sm:w-10 sm:h-10 text-red-500/80 rotate-45" />
              </div>
            )}

            {/* Label */}
            <span className="text-[10px] sm:text-xs font-semibold mt-1 tracking-tight text-center leading-none">
              {item.label}
            </span>
            <span className="text-[8px] sm:text-[9px] text-blue-300/70 hidden sm:block mt-0.5">
              {item.sublabel}
            </span>
          </button>
        );
      })}
    </div>
  );
};
