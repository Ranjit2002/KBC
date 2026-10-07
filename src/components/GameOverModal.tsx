import React from 'react';
import type { GameStatus, Question } from '../types/kbc';
import { RotateCcw, Award, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

interface GameOverModalProps {
  status: GameStatus;
  wonAmount: number;
  wonAmountLabel: string;
  clearedQuestions: number;
  totalQuestions: number;
  lastQuestion?: Question;
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  status,
  wonAmount: _wonAmount,
  wonAmountLabel,
  clearedQuestions,
  totalQuestions,
  lastQuestion,
  onRestart,
}) => {
  const isWon = status === 'won';
  const isQuitted = status === 'quitted';
  const isTimeUp = status === 'time_up';
  const isLost = status === 'lost';

  let title = 'खेल समाप्त (GAME OVER)';
  let subtitle = 'Better luck next time!';
  let icon = <XCircle className="w-10 h-10 text-red-400" />;

  if (isWon) {
    title = 'बधाई हो! CROREPATI WINNER!';
    subtitle = 'You have created history on the Hotseat!';
    icon = <Award className="w-10 h-10 text-yellow-400" />;
  } else if (isQuitted) {
    title = 'शानदार निर्णय! (GAME COMPLETED)';
    subtitle = 'You made a wise decision to quit and secure your winnings!';
    icon = <CheckCircle className="w-10 h-10 text-emerald-400" />;
  } else if (isTimeUp) {
    title = 'समय समाप्त (TIME UP)';
    subtitle = 'Ghadi Babu ran out of time!';
    icon = <Clock className="w-10 h-10 text-amber-400" />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-xl bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 border-2 border-yellow-400/80 rounded-2xl p-5 sm:p-7 shadow-2xl shadow-yellow-500/20 text-white relative text-center space-y-5">
        {/* Top Status Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-slate-900/90 border-2 border-yellow-500/50 flex items-center justify-center shadow-lg">
          {icon}
        </div>

        {/* Title */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-500 uppercase tracking-wider font-mono">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-blue-200/80 mt-1">{subtitle}</p>
        </div>

        {/* Official KBC Cheque Presentation */}
        <div className="relative bg-gradient-to-br from-amber-100 via-amber-50 to-amber-200 text-slate-900 p-4 sm:p-5 rounded-xl border-2 border-amber-400 shadow-xl overflow-hidden text-left">
          {/* Watermark */}
          <div className="absolute right-4 bottom-2 text-5xl font-black text-amber-900/10 pointer-events-none select-none">
            KBC
          </div>

          <div className="flex items-center justify-between border-b border-amber-300/80 pb-2 mb-3">
            <span className="font-mono font-bold text-xs uppercase tracking-wider text-amber-900">
              STATE BANK OF KBC
            </span>
            <span className="font-mono text-[10px] text-amber-800">
              DATE: {new Date().toLocaleDateString('en-IN')}
            </span>
          </div>

          <div className="space-y-1.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-amber-800 text-[11px]">PAY TO THE ORDER OF:</span>
              <span className="font-bold font-serif text-slate-900">Hotseat Champion</span>
            </div>

            <div className="flex items-center justify-between border-t border-b border-amber-300/60 py-2 my-1">
              <span className="text-amber-800 text-[11px]">RUPEES / धनराशी:</span>
              <span className="font-mono font-black text-lg sm:text-2xl text-emerald-800">
                {wonAmountLabel}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-amber-700 italic">
                Guaranteed by Amitabh Bachchan & KBC
              </span>
              <span className="font-serif italic font-bold text-xs text-amber-950 border-t border-amber-900 px-2">
                Amitabh Bachchan
              </span>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/70 p-3 rounded-xl border border-blue-900/60">
          <div>
            <span className="text-blue-400/80 block">Questions Cleared</span>
            <span className="font-mono font-bold text-sm text-yellow-300">
              {clearedQuestions} / {totalQuestions}
            </span>
          </div>
          <div>
            <span className="text-blue-400/80 block">Final Take Home</span>
            <span className="font-mono font-bold text-sm text-emerald-400">
              {wonAmountLabel}
            </span>
          </div>
        </div>

        {/* If lost, show explanation */}
        {isLost && lastQuestion && (
          <div className="bg-red-950/40 p-3 rounded-xl border border-red-800/40 text-left text-xs space-y-1">
            <div className="flex items-center gap-1 text-red-300 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Correct Answer Explanation:</span>
            </div>
            <p className="text-slate-200">
              Correct answer was:{' '}
              <strong className="text-emerald-300">
                {lastQuestion.options[lastQuestion.correctAnswerIndex]}
              </strong>
            </p>
            {lastQuestion.explanation && (
              <p className="text-slate-400 text-[11px]">{lastQuestion.explanation}</p>
            )}
          </div>
        )}

        {/* Restart Button */}
        <div className="pt-2">
          <button
            onClick={onRestart}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-slate-950 font-black text-sm sm:text-base tracking-wider hover:from-yellow-400 hover:to-amber-400 shadow-xl shadow-yellow-500/30 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>PLAY AGAIN (NEW QUESTIONS) • पुनः खेलें</span>
          </button>
        </div>
      </div>
    </div>
  );
};
