import React, { useState, useEffect } from 'react';
import { PhoneCall, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';
import type { Question } from '../types/kbc';
import { soundService } from '../services/soundService';

interface AskExpertModalProps {
  question: Question;
  onClose: () => void;
}

export const AskExpertModal: React.FC<AskExpertModalProps> = ({
  question,
  onClose,
}) => {
  const [isCalling, setIsCalling] = useState(true);

  useEffect(() => {
    soundService.playLifeline();

    const timer = setTimeout(() => {
      setIsCalling(false);
      soundService.playTick();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const letters = ['A', 'B', 'C', 'D'];
  const correctLetter = letters[question.correctAnswerIndex];
  const correctOptionText = question.options[question.correctAnswerIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 border-2 border-yellow-400/80 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-yellow-500/20 text-white relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-800/50 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-400/30">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-yellow-300 uppercase tracking-wider font-mono">
                Ask The Expert • एक्सपर्ट सलाह
              </h3>
              <p className="text-xs text-blue-300/80">
                Live Video Connection with Amitabh Bachchan AI & Master Scholars
              </p>
            </div>
          </div>
        </div>

        {/* Connecting state or Advice */}
        {isCalling ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin" />
              <PhoneCall className="w-6 h-6 text-yellow-400 absolute inset-0 m-auto animate-pulse" />
            </div>
            <p className="text-sm font-semibold text-yellow-200 animate-pulse tracking-wide font-mono">
              Connecting video call to the studio expert... कॉल कनेक्ट हो रही है...
            </p>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            {/* Expert Profile Box */}
            <div className="flex items-center gap-3 bg-blue-950/80 p-3 rounded-xl border border-blue-800/50">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-700 flex items-center justify-center font-bold text-lg text-slate-950 shadow-md">
                <UserCheck className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-yellow-300">
                  Dr. Raghav Sharma (Senior Academician)
                </h4>
                <p className="text-xs text-blue-300/70">
                  Expertise: General Knowledge, Science & Indian Heritage
                </p>
              </div>
            </div>

            {/* Simulated Dialogue */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-blue-900/60 space-y-3">
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed italic">
                &ldquo;नमस्कार! I have analyzed this question carefully. Without any doubt, the
                correct answer is{' '}
                <strong className="text-emerald-300 font-bold not-italic">
                  Option {correctLetter}: {correctOptionText}
                </strong>
                .
              </p>

              {question.explanation && (
                <p className="text-xs text-slate-300 border-t border-slate-800 pt-2">
                  <span className="text-yellow-400 font-semibold">Reason:</span>{' '}
                  {question.explanation}
                </p>
              )}

              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-semibold pt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Confidence Level: 95%</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-5 pt-3 border-t border-blue-800/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 font-bold text-xs sm:text-sm hover:from-yellow-400 hover:to-amber-500 shadow-md shadow-yellow-500/30 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Thank You Expert • लॉक करें</span>
          </button>
        </div>
      </div>
    </div>
  );
};
