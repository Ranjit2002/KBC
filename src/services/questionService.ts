import { MASTER_QUESTIONS } from '../data/questions';
import type { Question } from '../types/kbc';

const STORAGE_KEY = 'kbc_played_question_ids_v2';

export class QuestionService {
  private static getPlayedIds(): Set<string> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return new Set<string>();
      return new Set<string>(JSON.parse(stored));
    } catch {
      return new Set<string>();
    }
  }

  private static savePlayedIds(ids: Set<string>): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)));
    } catch (e) {
      console.error('Failed to save played questions to localStorage', e);
    }
  }

  public static markAsPlayed(id: string): void {
    const played = this.getPlayedIds();
    played.add(id);
    this.savePlayedIds(played);
  }

  public static resetHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to reset history', e);
    }
  }

  public static getPlayedCount(): number {
    return this.getPlayedIds().size;
  }

  /**
   * Shuffles options and adjusts the correctAnswerIndex so answers are never always in the same letter
   */
  public static randomizeOptions(q: Question): Question {
    const originalOptions = [...q.options];
    const correctText = originalOptions[q.correctAnswerIndex];

    // Fisher-Yates shuffle
    const shuffledOptions = [...originalOptions];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }

    const newCorrectIndex = shuffledOptions.indexOf(correctText);

    return {
      ...q,
      options: shuffledOptions as [string, string, string, string],
      correctAnswerIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
    };
  }

  /**
   * Fetches a unique question for a given level that hasn't been played in previous sessions.
   * If all questions at this level have been played, it recycles them cleanly.
   */
  public static getQuestionForLevel(level: number, excludeId?: string): Question {
    const played = this.getPlayedIds();
    const candidatePool = MASTER_QUESTIONS.filter((q) => q.level === level && q.id !== excludeId);

    if (candidatePool.length === 0) {
      // Fallback if level mismatch
      return this.randomizeOptions(MASTER_QUESTIONS[0]);
    }

    // Unplayed questions
    let unplayed = candidatePool.filter((q) => !played.has(q.id));

    // If all questions at this level have been played across sessions,
    // clear the played state for this level so game never breaks!
    if (unplayed.length === 0) {
      for (const q of candidatePool) {
        played.delete(q.id);
      }
      this.savePlayedIds(played);
      unplayed = candidatePool;
    }

    // Pick a random question from unplayed pool
    const selected = unplayed[Math.floor(Math.random() * unplayed.length)];
    this.markAsPlayed(selected.id);

    return this.randomizeOptions(selected);
  }

  /**
   * Used for "Flip the Question" lifeline:
   * Returns a fresh question for the same level that is different from current question.
   */
  public static getFlipReplacement(level: number, currentId: string): Question {
    return this.getQuestionForLevel(level, currentId);
  }
}
