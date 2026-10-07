import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { GameStatus, LifelineState, LifelineType, Question } from './types/kbc';
import { MONEY_LADDER } from './data/questions';
import { QuestionService } from './services/questionService';
import { soundService } from './services/soundService';
import { Header } from './components/Header';
import { MoneyLadder } from './components/MoneyLadder';
import { Lifelines } from './components/Lifelines';
import { Timer } from './components/Timer';
import { QuestionCard } from './components/QuestionCard';
import { OptionCard } from './components/OptionCard';
import { AudiencePollModal } from './components/AudiencePollModal';
import { AskExpertModal } from './components/AskExpertModal';
import { FlipQuestionModal } from './components/FlipQuestionModal';
import { RulesModal } from './components/RulesModal';
import { GameOverModal } from './components/GameOverModal';
import { CelebrationScreen } from './components/CelebrationScreen';
import { Play, Sparkles, Volume2 } from 'lucide-react';

export const App: React.FC = () => {
  // Game progression state
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [wonAmount, setWonAmount] = useState<number>(0);
  const [wonAmountLabel, setWonAmountLabel] = useState<string>('₹0');

  // Lifelines state
  const [lifelines, setLifelines] = useState<LifelineState>({
    fiftyFifty: true,
    audiencePoll: true,
    askExpert: true,
    flipQuestion: true,
  });
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);

  // Modals state
  const [activeModal, setActiveModal] = useState<
    'none' | 'audiencePoll' | 'askExpert' | 'flipQuestion' | 'rules' | 'celebration'
  >('none');
  const [isLadderMobileOpen, setIsLadderMobileOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Timer state
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const timerRef = useRef<number | null>(null);

  // Calculate total allowed time based on level rules
  const getTotalTimeForLevel = (level: number): number => {
    if (level <= 5) return 45; // Q1 to Q5: 45 seconds
    if (level <= 10) return 60; // Q6 to Q10: 60 seconds
    return 0; // Q11+: Unlimited time (0 represents unlimited)
  };

  const isUnlimitedTime = currentLevel > 10;

  // Initialize a new question for a level
  const loadQuestionForLevel = useCallback((level: number) => {
    const q = QuestionService.getQuestionForLevel(level);
    setCurrentQuestion(q);
    setSelectedOption(null);
    setEliminatedOptions([]);
    const t = getTotalTimeForLevel(level);
    setTimeLeft(t);
  }, []);

  // Start new game
  const startNewGame = useCallback(() => {
    setCurrentLevel(1);
    setWonAmount(0);
    setWonAmountLabel('₹0');
    setLifelines({
      fiftyFifty: true,
      audiencePoll: true,
      askExpert: true,
      flipQuestion: true,
    });
    setEliminatedOptions([]);
    setSelectedOption(null);
    setActiveModal('none');
    loadQuestionForLevel(1);
    setGameStatus('playing');
    soundService.startSuspense();
  }, [loadQuestionForLevel]);

  // Initial load: automatically prepares level 1 question on start or reload
  useEffect(() => {
    loadQuestionForLevel(1);
  }, [loadQuestionForLevel]);

  // Calculate guaranteed amount based on milestones
  const getGuaranteedAmount = (levelReached: number): { amount: number; label: string } => {
    if (levelReached > 10) {
      return { amount: 320000, label: '₹3,20,000' };
    }
    if (levelReached > 5) {
      return { amount: 10000, label: '₹10,000' };
    }
    return { amount: 0, label: '₹0' };
  };

  // Timer countdown hook
  useEffect(() => {
    if (
      gameStatus !== 'playing' ||
      isUnlimitedTime ||
      activeModal !== 'none'
    ) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeUp();
          return 0;
        }

        // Tick sound
        const isUrgent = prev <= 10;
        soundService.playTick(isUrgent);

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStatus, isUnlimitedTime, activeModal, currentLevel]);

  // Handle Time Up
  const handleTimeUp = () => {
    soundService.playWrong();
    const guaranteed = getGuaranteedAmount(currentLevel);
    setWonAmount(guaranteed.amount);
    setWonAmountLabel(guaranteed.label);
    setGameStatus('time_up');
  };

  // Handle User selecting an option (Lock kar diya jaye?)
  const handleSelectOption = (index: number) => {
    if (gameStatus !== 'playing' || !currentQuestion) return;

    setSelectedOption(index);
    setGameStatus('locked');
    soundService.playOptionLock();

    // Amitabh Bachchan suspense delay (2.4 seconds)
    setTimeout(() => {
      revealAnswer(index);
    }, 2400);
  };

  // Reveal Answer
  const revealAnswer = (chosenIndex: number) => {
    if (!currentQuestion) return;

    setGameStatus('revealed');
    const isCorrect = chosenIndex === currentQuestion.correctAnswerIndex;

    if (isCorrect) {
      soundService.playCorrect();

      // Current level prize
      const currentLadderItem = MONEY_LADDER.find((item) => item.level === currentLevel);
      const earnedAmount = currentLadderItem ? currentLadderItem.amount : 0;
      const earnedLabel = currentLadderItem ? currentLadderItem.label : '₹0';

      setWonAmount(earnedAmount);
      setWonAmountLabel(earnedLabel);

      if (currentLevel === 16) {
        // ₹7 CRORE JACKPOT WINNER!
        setTimeout(() => {
          soundService.playJackpot();
          setGameStatus('won');
          setActiveModal('celebration');
        }, 1500);
      } else {
        // Advance to next level after celebration delay
        setTimeout(() => {
          const nextLevel = currentLevel + 1;
          setCurrentLevel(nextLevel);
          loadQuestionForLevel(nextLevel);
          setGameStatus('playing');
          soundService.startSuspense();
        }, 2200);
      }
    } else {
      // Wrong Answer
      soundService.playWrong();
      const guaranteed = getGuaranteedAmount(currentLevel);
      setWonAmount(guaranteed.amount);
      setWonAmountLabel(guaranteed.label);

      setTimeout(() => {
        setGameStatus('lost');
      }, 2600);
    }
  };

  // Voluntary Quit
  const handleQuitGame = () => {
    if (gameStatus !== 'playing') return;

    soundService.stopSuspense();
    // In KBC, quitting gives you the prize of the previous cleared level
    if (currentLevel > 1) {
      const prevLadderItem = MONEY_LADDER.find((item) => item.level === currentLevel - 1);
      const prize = prevLadderItem ? prevLadderItem.amount : 0;
      const label = prevLadderItem ? prevLadderItem.label : '₹0';
      setWonAmount(prize);
      setWonAmountLabel(label);
    } else {
      setWonAmount(0);
      setWonAmountLabel('₹0');
    }
    setGameStatus('quitted');
  };

  // Lifeline Handlers
  const handleUseLifeline = (type: LifelineType) => {
    if (gameStatus !== 'playing' || !lifelines[type] || !currentQuestion) return;

    if (type === 'fiftyFifty') {
      soundService.playLifeline();
      const correctIdx = currentQuestion.correctAnswerIndex;
      const wrongIndices = [0, 1, 2, 3].filter((i) => i !== correctIdx);

      // Randomly pick 2 wrong indices to eliminate
      const shuffledWrongs = [...wrongIndices].sort(() => 0.5 - Math.random());
      const toEliminate = shuffledWrongs.slice(0, 2);

      setEliminatedOptions(toEliminate);
      setLifelines((prev) => ({ ...prev, fiftyFifty: false }));
    } else if (type === 'audiencePoll') {
      setActiveModal('audiencePoll');
      setLifelines((prev) => ({ ...prev, audiencePoll: false }));
    } else if (type === 'askExpert') {
      setActiveModal('askExpert');
      setLifelines((prev) => ({ ...prev, askExpert: false }));
    } else if (type === 'flipQuestion') {
      setActiveModal('flipQuestion');
    }
  };

  // Confirm Flip Question
  const handleConfirmFlip = () => {
    if (!currentQuestion) return;
    soundService.playLifeline();
    const newQ = QuestionService.getFlipReplacement(currentLevel, currentQuestion.id);
    setCurrentQuestion(newQ);
    setSelectedOption(null);
    setEliminatedOptions([]);
    setTimeLeft(getTotalTimeForLevel(currentLevel));
    setLifelines((prev) => ({ ...prev, flipQuestion: false }));
    setActiveModal('none');
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const muted = soundService.toggleMute();
    setIsMuted(muted);
  };

  // Current prize at stake
  const currentStakeItem = MONEY_LADDER.find((m) => m.level === currentLevel);
  const currentPrizeLabel = currentStakeItem ? currentStakeItem.label : '₹1,000';

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between relative selection:bg-yellow-500 selection:text-black overflow-x-hidden font-sans">
      {/* Dynamic KBC Stage Background with Laser Rings */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Radial Stage Lights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] md:w-[950px] md:h-[950px] rounded-full bg-gradient-to-tr from-blue-900/30 via-indigo-800/15 to-transparent blur-3xl pointer-events-none" />
        {/* Concentric rotating radar rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-blue-500/10 animate-radar pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] md:w-[600px] md:h-[600px] rounded-full border border-yellow-500/10 pointer-events-none" />
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      </div>

      {/* Header */}
      <Header
        currentPrize={currentPrizeLabel}
        questionNumber={currentLevel}
        totalQuestions={MONEY_LADDER.length}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenRules={() => setActiveModal('rules')}
        onQuitGame={handleQuitGame}
        canQuit={gameStatus === 'playing'}
        onToggleLadderMobile={() => setIsLadderMobileOpen(!isLadderMobileOpen)}
        isLadderMobileOpen={isLadderMobileOpen}
      />

      {/* Main Hotseat Stage Area */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto p-2 sm:p-4 gap-4 items-stretch justify-between">
        {/* Left Side: Game Stage (Lifelines, Timer, Question, Options) */}
        <div className="flex-1 flex flex-col justify-between items-center py-2 min-h-0">
          {/* Lifelines Bar */}
          <Lifelines
            lifelines={lifelines}
            onUseLifeline={handleUseLifeline}
            disabled={gameStatus !== 'playing'}
          />

          {/* Clock Timer */}
          <div className="my-2">
            <Timer
              timeLeft={timeLeft}
              totalTime={getTotalTimeForLevel(currentLevel)}
              isUnlimited={isUnlimitedTime}
              isPaused={gameStatus !== 'playing' || activeModal !== 'none'}
            />
          </div>

          {/* If Game is Idle (Initial Screen before pressing Play) */}
          {gameStatus === 'idle' ? (
            <div className="w-full max-w-2xl mx-auto my-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 border-2 border-yellow-400/70 text-center shadow-2xl space-y-6 animate-in fade-in">
              <div className="relative inline-block">
                <img
                  src="/favicon.svg"
                  alt="KBC Official Emblem"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-2xl shadow-yellow-500/40 mx-auto hover:scale-105 transition-transform drop-shadow-[0_10px_25px_rgba(234,179,8,0.4)]"
                />
                <div className="absolute -inset-2 rounded-full border border-dashed border-yellow-400/30 animate-spin [animation-duration:35s] pointer-events-none" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-500 uppercase tracking-wide">
                  Welcome to the Hotseat
                </h2>
                <p className="text-xs sm:text-base text-blue-200/90 max-w-md mx-auto">
                  16 Questions. 4 Lifelines. One Grand ₹7 Crore Jackpot. Every game brings brand new
                  unplayed questions!
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={startNewGame}
                  className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-slate-950 font-black text-base sm:text-lg uppercase tracking-wider hover:from-yellow-300 hover:to-amber-400 shadow-xl shadow-yellow-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto"
                >
                  <Play className="w-5 h-5 fill-slate-950" />
                  <span>Start Game • खेल शुरू करें</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-xs text-blue-400/80 pt-2 border-t border-blue-900/40">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> New questions every session
                </span>
                <span className="flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> Authentic Web Audio SFX
                </span>
              </div>
            </div>
          ) : (
            currentQuestion && (
              <div className="w-full flex flex-col items-center">
                {/* Question Frame */}
                <QuestionCard question={currentQuestion} questionNumber={currentLevel} />

                {/* 4 Options Grid */}
                <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4 px-2 sm:px-4 my-2 sm:my-4">
                  {currentQuestion.options.map((optionText, idx) => (
                    <OptionCard
                      key={idx}
                      index={idx}
                      text={optionText}
                      isSelected={selectedOption === idx}
                      isRevealed={gameStatus === 'revealed' || gameStatus === 'lost' || gameStatus === 'won'}
                      isCorrect={idx === currentQuestion.correctAnswerIndex}
                      isEliminated={eliminatedOptions.includes(idx)}
                      disabled={gameStatus !== 'playing'}
                      onSelect={() => handleSelectOption(idx)}
                    />
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {/* Right Side: Money Ladder */}
        <MoneyLadder
          currentLevel={currentLevel}
          isOpenMobile={isLadderMobileOpen}
          onCloseMobile={() => setIsLadderMobileOpen(false)}
        />
      </main>

      {/* Footer Info Bar */}
      <footer className="w-full py-2 px-4 bg-slate-950/80 border-t border-blue-950 text-center text-[11px] text-blue-400/60 z-10">
        <span>
          Kaun Banega Crorepati Experience • Built with React 19, Vite & Tailwind CSS v4 • Powered by
          Synthesized Audio Engine
        </span>
      </footer>

      {/* Lifeline Modals */}
      {activeModal === 'audiencePoll' && currentQuestion && (
        <AudiencePollModal
          question={currentQuestion}
          onClose={() => setActiveModal('none')}
        />
      )}

      {activeModal === 'askExpert' && currentQuestion && (
        <AskExpertModal
          question={currentQuestion}
          onClose={() => setActiveModal('none')}
        />
      )}

      {activeModal === 'flipQuestion' && (
        <FlipQuestionModal
          onConfirm={handleConfirmFlip}
          onCancel={() => setActiveModal('none')}
        />
      )}

      {activeModal === 'rules' && <RulesModal onClose={() => setActiveModal('none')} />}

      {activeModal === 'celebration' && (
        <CelebrationScreen
          amountLabel={wonAmountLabel}
          onDismiss={() => {
            setActiveModal('none');
            setGameStatus('won');
          }}
        />
      )}

      {/* Game Over / Results Modal */}
      {(gameStatus === 'lost' ||
        gameStatus === 'quitted' ||
        gameStatus === 'won' ||
        gameStatus === 'time_up') &&
        activeModal !== 'celebration' && (
          <GameOverModal
            status={gameStatus}
            wonAmount={wonAmount}
            wonAmountLabel={wonAmountLabel}
            clearedQuestions={
              gameStatus === 'won' ? 16 : Math.max(0, currentLevel - 1)
            }
            totalQuestions={16}
            lastQuestion={currentQuestion || undefined}
            onRestart={startNewGame}
          />
        )}
    </div>
  );
};
export default App;
