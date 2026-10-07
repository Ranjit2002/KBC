import React from 'react';
import { Volume2, VolumeX, HelpCircle, LogOut, Award, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPrize: string;
  questionNumber: number;
  totalQuestions: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenRules: () => void;
  onQuitGame: () => void;
  canQuit: boolean;
  onToggleLadderMobile: () => void;
  isLadderMobileOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPrize,
  questionNumber,
  totalQuestions,
  isMuted,
  onToggleMute,
  onOpenRules,
  onQuitGame,
  canQuit,
  onToggleLadderMobile,
  isLadderMobileOpen,
}) => {
  return (
    <header className="w-full bg-slate-950/80 backdrop-blur-md border-b border-yellow-500/30 px-3 sm:px-6 py-2.5 sm:py-3 z-30 sticky top-0 shadow-lg shadow-blue-950/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* KBC Logo & Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative group cursor-pointer">
            <img
              src="/favicon.svg"
              alt="KBC Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg shadow-yellow-500/40 group-hover:scale-105 transition-transform drop-shadow"
            />
            {/* Outer spinning ring effect */}
            <div className="absolute -inset-1 rounded-full border border-dashed border-yellow-400/40 animate-spin [animation-duration:25s] pointer-events-none" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm sm:text-lg font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-500 uppercase drop-shadow">
                Kaun Banega Crorepati
              </h1>
              <span className="hidden md:inline-block px-1.5 py-0.5 rounded text-[10px] bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 font-mono">
                LIVE
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-blue-300/80 font-medium tracking-wide hidden sm:block">
              ज्ञान ही शक्ति है • Question {questionNumber} of {totalQuestions}
            </p>
          </div>
        </div>

        {/* Current Prize Indicator */}
        <div className="flex items-center bg-gradient-to-r from-blue-950/80 via-slate-900 to-blue-950/80 border border-yellow-500/50 rounded-full px-3 sm:px-5 py-1 sm:py-1.5 shadow-inner shadow-yellow-500/10">
          <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 mr-1.5 shrink-0" />
          <div className="text-center">
            <span className="text-[9px] uppercase tracking-wider text-yellow-400/80 block leading-tight font-semibold">
              Current Prize
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-yellow-300 tracking-wide font-mono">
              {currentPrize}
            </span>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-1.5 sm:p-2 rounded-lg border border-blue-500/40 bg-blue-950/60 text-blue-200 hover:text-yellow-300 hover:border-yellow-400 transition-all hover:scale-105 active:scale-95 shadow"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-green-400" />}
          </button>

          {/* Rules Modal Button */}
          <button
            onClick={onOpenRules}
            title="KBC Rules & Guidelines"
            className="p-1.5 sm:p-2 rounded-lg border border-blue-500/40 bg-blue-950/60 text-blue-200 hover:text-yellow-300 hover:border-yellow-400 transition-all hover:scale-105 active:scale-95 shadow flex items-center gap-1 text-xs"
          >
            <HelpCircle className="w-4 h-4 text-amber-300" />
            <span className="hidden lg:inline text-xs font-medium">Rules</span>
          </button>

          {/* Quit Game Button */}
          {canQuit && (
            <button
              onClick={onQuitGame}
              title="Quit game and take home guaranteed amount"
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-red-500/60 bg-red-950/40 text-red-200 hover:bg-red-900/60 hover:text-white transition-all text-xs font-semibold flex items-center gap-1 shadow-md hover:shadow-red-500/20 active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Quit</span>
            </button>
          )}

          {/* Mobile Money Ladder Toggle */}
          <button
            onClick={onToggleLadderMobile}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg border border-yellow-500/50 bg-blue-950/60 text-yellow-300 hover:bg-yellow-500/20 transition-all"
            title="Toggle Money Ladder"
          >
            {isLadderMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
