import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles } from 'lucide-react';

interface CelebrationScreenProps {
  amountLabel: string;
  onDismiss: () => void;
}

export const CelebrationScreen: React.FC<CelebrationScreenProps> = ({
  amountLabel,
  onDismiss,
}) => {
  useEffect(() => {
    // Canvas confetti fireworks burst
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#ffffff'];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-xl text-center space-y-6 relative">
        {/* Animated Trophy */}
        <div className="relative inline-block">
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-gradient-to-tr from-yellow-600 via-yellow-400 to-amber-200 p-1 shadow-2xl shadow-yellow-500/50 animate-bounce">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
              <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 drop-shadow-[0_4px_12px_rgba(234,179,8,0.8)]" />
            </div>
          </div>
          <Sparkles className="w-8 h-8 text-yellow-300 absolute -top-2 -right-2 animate-spin" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-500 tracking-wider font-mono drop-shadow-lg uppercase">
            अद्भूत! अविश्वसनीय! अकल्पनीय!
          </h2>
          <p className="text-base sm:text-xl font-bold text-emerald-400 tracking-wide">
            YOU HAVE WON {amountLabel}!
          </p>
          <p className="text-xs sm:text-sm text-blue-200/80">
            You are the ultimate champion of Kaun Banega Crorepati!
          </p>
        </div>

        {/* Continue Button */}
        <div>
          <button
            onClick={onDismiss}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-slate-950 font-black text-sm sm:text-base tracking-wider hover:from-yellow-300 hover:to-yellow-500 shadow-xl shadow-yellow-500/40 active:scale-95 transition-all"
          >
            CLAIM CHEQUE • चेक प्राप्त करें
          </button>
        </div>
      </div>
    </div>
  );
};
