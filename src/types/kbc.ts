export interface Question {
  id: string;
  level: number; // 1 to 16
  prize: string;
  prizeAmount: number;
  question: string;
  questionHindi?: string;
  options: [string, string, string, string]; // [A, B, C, D]
  correctAnswerIndex: number; // 0, 1, 2, or 3
  explanation?: string;
  category: string;
}

export interface MoneyLevel {
  level: number;
  amount: number;
  label: string;
  isMilestone: boolean; // Padav
  milestoneTitle?: string;
}

export type LifelineType = 'fiftyFifty' | 'audiencePoll' | 'askExpert' | 'flipQuestion';

export interface LifelineState {
  fiftyFifty: boolean; // true if available
  audiencePoll: boolean;
  askExpert: boolean;
  flipQuestion: boolean;
}

export type GameStatus = 
  | 'idle' 
  | 'playing' 
  | 'locked' 
  | 'revealed' 
  | 'quitted' 
  | 'lost' 
  | 'won' 
  | 'time_up';

export interface AudiencePollResult {
  percentages: [number, number, number, number];
}

export interface ExpertAdvice {
  name: string;
  confidence: number;
  suggestedIndex: number;
  message: string;
}
