export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed index in options array
  category: 
    | 'Architecture & Engines'
    | 'Deployment & High Availability'
    | 'SQL & Schema Operations'
    | 'Database Tools & O&M'
    | 'Security & Access Control'
    | 'Storage & Data Types';
  difficulty: 'Foundation' | 'Core' | 'Advanced';
  explanation: string;
  keyConcept: string;
  codeSnippet?: string;
  tableVisual?: {
    title?: string;
    headers: string[];
    rows: (string | number)[][];
  };
}

export type ExamMode = 'timed' | 'practice' | 'review' | 'flashcards' | 'bank';

export interface UserExamSession {
  mode: ExamMode;
  startTime: number;
  endTime?: number;
  timeLimitSeconds: number;
  answers: Record<number, number>; // questionId -> selectedOptionIndex
  flagged: Record<number, boolean>; // questionId -> isFlagged
  currentQuestionIndex: number;
  isSubmitted: boolean;
  score?: number; // total points out of 1000
  percentage?: number;
  passed?: boolean;
}

export interface CategorySummary {
  category: string;
  total: number;
  correct: number;
  accuracy: number;
}

export interface StoredExamRecord {
  id: string;
  date: string;
  mode: ExamMode;
  score: number;
  percentage: number;
  totalQuestions: number;
  correctCount: number;
  passed: boolean;
  timeSpentSeconds: number;
  candidateName: string;
}
