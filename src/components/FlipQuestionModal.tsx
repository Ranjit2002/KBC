import React from 'react';
import { RefreshCw, Sparkles, X } from 'lucide-react';

interface FlipQuestionModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const FlipQuestionModal: React.FC<FlipQuestionModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 border-2 border-yellow-400/80 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-yellow-500/20 text-white relative text-center space-y-4">
        {/* Close */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-14 h-14 mx-auto rounded-full bg-yellow-500/20 border-2 border-yellow-400/50 flex items-center justify-center text-yellow-300">
          <RefreshCw className="w-7 h-7 animate-spin [animation-duration:8s]" />
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-yellow-300 uppercase tracking-wider font-mono">
            Flip The Question • सवाल बदलिए
          </h3>
          <p className="text-xs sm:text-sm text-blue-200/80 mt-1">
            Are you sure you want to discard this question and get a completely fresh, unplayed question of the same level?
          </p>
        </div>

        <div className="bg-slate-950/70 p-3 rounded-xl border border-blue-900/60 text-xs text-amber-200/90 text-left space-y-1">
          <p className="font-semibold flex items-center gap-1 text-yellow-400">
            <Sparkles className="w-3.5 h-3.5" /> Note:
          </p>
          <p className="text-slate-300">
            • You cannot return to this current question once flipped.
          </p>
          <p className="text-slate-300">
            • Any used 50:50 on this question will reset for the new question.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-700"
          >
            Cancel • रद्द करें
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 text-xs sm:text-sm font-bold hover:from-yellow-400 hover:to-amber-500 shadow-md shadow-yellow-500/30 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Flip Now • नया सवाल लाएं</span>
          </button>
        </div>
      </div>
    </div>
  );
};
