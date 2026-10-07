import React from 'react';
import { X, ShieldCheck, Clock, HelpCircle, AlertTriangle, Trophy } from 'lucide-react';

interface RulesModalProps {
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 border-2 border-yellow-400/80 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-yellow-500/20 text-white max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-800/50 pb-3 mb-4 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-400/30">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-yellow-300 uppercase tracking-wider font-mono">
                Official KBC Rules & Regulations
              </h3>
              <p className="text-xs text-blue-300/80">
                कौन बनेगा करोड़पति • खेल के आधिकारिक नियम
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Rules Content */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs sm:text-sm text-blue-100 scrollbar-thin scrollbar-thumb-blue-800">
          {/* Rule 1: Money Ladder & Milestones */}
          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-blue-900/60 space-y-1.5">
            <div className="flex items-center gap-2 text-yellow-400 font-bold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>1. पड़ाव (Milestones) & Guaranteed Dhanrashi</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              There are 16 levels ranging from ₹1,000 to the grand ₹7 Crore jackpot.
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
              <li>
                <strong className="text-yellow-300">पहला पड़ाव (Level 5):</strong> ₹10,000 guaranteed
                safety net.
              </li>
              <li>
                <strong className="text-yellow-300">दूसरा पड़ाव (Level 10):</strong> ₹3,20,000
                guaranteed safety net.
              </li>
              <li>
                If you answer incorrectly, you will drop down to your last secured milestone. If you
                fail before Q5, you leave with ₹0.
              </li>
            </ul>
          </div>

          {/* Rule 2: Ghadighadi Babu Timer */}
          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-blue-900/60 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Clock className="w-4 h-4 shrink-0" />
              <span>2. घड़ी बाबू (The Countdown Clock)</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
              <li>
                <strong className="text-cyan-300">Questions 1 to 5:</strong> 45 seconds per question.
              </li>
              <li>
                <strong className="text-cyan-300">Questions 6 to 10:</strong> 60 seconds per question.
              </li>
              <li>
                <strong className="text-cyan-300">Questions 11 to 16:</strong> No timer! Unlimited time
                to deliberate and strategize.
              </li>
              <li>Running out of time results in Game Over with your guaranteed amount.</li>
            </ul>
          </div>

          {/* Rule 3: Lifelines */}
          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-blue-900/60 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Trophy className="w-4 h-4 shrink-0" />
              <span>3. लाइफलाइन्स (The 4 Lifelines)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              You are armed with 4 classic lifelines, each usable once per entire game:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
              <li>
                <strong className="text-emerald-300">50:50:</strong> Computer Ji eliminates 2 incorrect
                options, leaving 1 right and 1 wrong option.
              </li>
              <li>
                <strong className="text-emerald-300">Audience Poll (जनता जनार्दन):</strong> Studio
                audience votes using their keypads.
              </li>
              <li>
                <strong className="text-emerald-300">Ask the Expert:</strong> Live video consultation
                with Amitabh Bachchan AI and subject scholars.
              </li>
              <li>
                <strong className="text-emerald-300">Flip the Question (सवाल बदलिए):</strong> Discards
                current question and presents a brand new question of the same level!
              </li>
            </ul>
          </div>

          {/* Rule 4: Quitting */}
          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-blue-900/60 space-y-1.5">
            <div className="flex items-center gap-2 text-red-400 font-bold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>4. छोड़ना (Voluntary Quit)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              At any point before locking an answer, you can choose to{' '}
              <strong className="text-red-300 font-semibold">Quit</strong> and safely take home 100% of
              the cash prize earned on the previous question.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-blue-800/40 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 font-bold text-xs sm:text-sm hover:from-yellow-400 hover:to-amber-500 shadow-md shadow-yellow-500/30 active:scale-95 transition-all"
          >
            I Understand • समझ गया
          </button>
        </div>
      </div>
    </div>
  );
};
