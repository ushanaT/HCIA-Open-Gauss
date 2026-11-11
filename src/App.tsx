import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { HCIA_OPENGAUSS_QUESTIONS } from './data/questions';
import { Question, ExamMode, StoredExamRecord } from './types';
import { CbtExamHeader } from './components/CbtExamHeader';
import { QuestionCard } from './components/QuestionCard';
import { QuestionPalette } from './components/QuestionPalette';
import { ExamModalSubmit } from './components/ExamModalSubmit';
import { ExamResults } from './components/ExamResults';
import { StudyBankView } from './components/StudyBankView';
import { FlashcardsView } from './components/FlashcardsView';

const EXAM_DURATION_SECONDS = 90 * 60; // 90 minutes
const STORAGE_KEY_NAME = 'hcia_opengauss_candidate_name';
const STORAGE_KEY_HISTORY = 'hcia_opengauss_exam_history';

export default function App() {
  const [questions, setQuestions] = useState<Question[]>(HCIA_OPENGAUSS_QUESTIONS);
  const [mode, setMode] = useState<ExamMode>('timed');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SECONDS);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showPracticeExplanation, setShowPracticeExplanation] = useState(false);

  // Result state
  const [lastExamScore, setLastExamScore] = useState(0);
  const [lastExamPercentage, setLastExamPercentage] = useState(0);
  const [lastExamPassed, setLastExamPassed] = useState(false);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);

  // Candidate name state
  const [candidateName, setCandidateName] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_NAME) || 'Candidate';
  });

  // Save candidate name to localStorage
  const handleUpdateCandidateName = (name: string) => {
    setCandidateName(name);
    localStorage.setItem(STORAGE_KEY_NAME, name);
  };

  // Timer countdown
  useEffect(() => {
    if (mode !== 'timed' || !isTimerRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, isTimerRunning]);

  // Answer selection
  const handleSelectOption = (optionIndex: number) => {
    const currentQ = questions[currentIndex];
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  // Toggle flag for review
  const handleToggleFlag = () => {
    const currentQ = questions[currentIndex];
    setFlagged((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  // Clear current response
  const handleClearOption = () => {
    const currentQ = questions[currentIndex];
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  // Navigation
  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowPracticeExplanation(false);
    }
  }, [currentIndex, questions.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setShowPracticeExplanation(false);
    }
  }, [currentIndex]);

  const handleSelectQuestion = (index: number) => {
    setCurrentIndex(index);
    setShowPracticeExplanation(false);
  };

  // Submit and grade exam
  const handleSubmitExam = useCallback(() => {
    setIsTimerRunning(false);
    setShowSubmitModal(false);

    // Huawei HCIA grading: 1000 max points, 20 pts per question (50 questions), pass mark 600 pts
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / questions.length) * 1000);
    const calculatedPercentage = Math.round((correctCount / questions.length) * 100);
    const passed = calculatedScore >= 600;
    const spent = EXAM_DURATION_SECONDS - timeLeft;

    setLastExamScore(calculatedScore);
    setLastExamPercentage(calculatedPercentage);
    setLastExamPassed(passed);
    setTimeSpentSeconds(spent > 0 ? spent : 1);

    // Save history
    try {
      const historyStr = localStorage.getItem(STORAGE_KEY_HISTORY);
      const history: StoredExamRecord[] = historyStr ? JSON.parse(historyStr) : [];
      const newRecord: StoredExamRecord = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        mode: 'timed',
        score: calculatedScore,
        percentage: calculatedPercentage,
        totalQuestions: questions.length,
        correctCount,
        passed,
        timeSpentSeconds: spent,
        candidateName
      };
      history.unshift(newRecord);
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history.slice(0, 10)));
    } catch {
      // ignore storage errors
    }

    setMode('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [questions, answers, timeLeft, candidateName]);

  // Restart exam with all 50 questions
  const handleRestartExam = () => {
    setQuestions(HCIA_OPENGAUSS_QUESTIONS);
    setAnswers({});
    setFlagged({});
    setTimeLeft(EXAM_DURATION_SECONDS);
    setCurrentIndex(0);
    setIsTimerRunning(true);
    setShowPracticeExplanation(false);
    setMode('timed');
  };

  // Retake only incorrect questions
  const handleRetakeIncorrect = (incorrectIds: number[]) => {
    const subset = HCIA_OPENGAUSS_QUESTIONS.filter((q) => incorrectIds.includes(q.id));
    if (subset.length === 0) return;
    setQuestions(subset);
    setAnswers({});
    setFlagged({});
    setTimeLeft(Math.max(subset.length * 90, 600)); // 1.5 min per question or min 10 mins
    setCurrentIndex(0);
    setIsTimerRunning(true);
    setShowPracticeExplanation(false);
    setMode('timed');
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (mode === 'timed' || mode === 'practice') {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleNext();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePrev();
        } else if (['1', '2', '3', '4'].includes(e.key)) {
          e.preventDefault();
          handleSelectOption(parseInt(e.key) - 1);
        } else if (['a', 'A'].includes(e.key)) {
          e.preventDefault();
          handleSelectOption(0);
        } else if (['b', 'B'].includes(e.key)) {
          e.preventDefault();
          handleSelectOption(1);
        } else if (['c', 'C'].includes(e.key)) {
          // Check if Ctrl+C or Cmd+C
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            handleSelectOption(2);
          }
        } else if (['d', 'D'].includes(e.key)) {
          e.preventDefault();
          handleSelectOption(3);
        } else if (['m', 'M'].includes(e.key)) {
          e.preventDefault();
          handleToggleFlag();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, handleNext, handlePrev]);

  // Answered & Flagged metrics
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;
  const currentQuestion = questions[currentIndex] || questions[0];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* CBT Header */}
      <CbtExamHeader
        mode={mode}
        onSelectMode={(newMode) => {
          if (newMode === 'timed' && mode !== 'timed') {
            handleRestartExam();
          } else {
            setMode(newMode);
          }
        }}
        timeLeft={timeLeft}
        totalQuestions={questions.length}
        answeredCount={answeredCount}
        flaggedCount={flaggedCount}
        candidateName={candidateName}
        onUpdateCandidateName={handleUpdateCandidateName}
        onSubmitExam={() => setShowSubmitModal(true)}
        onRestartExam={handleRestartExam}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {mode === 'timed' || mode === 'practice' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* Left/Center Column: Question Card */}
            <div className="lg:col-span-3">
              <QuestionCard
                question={currentQuestion}
                currentIndex={currentIndex}
                totalQuestions={questions.length}
                selectedOptionIndex={answers[currentQuestion.id]}
                isFlagged={!!flagged[currentQuestion.id]}
                mode={mode}
                onSelectOption={handleSelectOption}
                onToggleFlag={handleToggleFlag}
                onClearOption={handleClearOption}
                onPrev={handlePrev}
                onNext={handleNext}
                showPracticeExplanation={showPracticeExplanation}
                onTogglePracticeExplanation={() => setShowPracticeExplanation(!showPracticeExplanation)}
              />
            </div>

            {/* Right Column: Question Palette */}
            <div className="lg:col-span-1">
              <QuestionPalette
                totalQuestions={questions.length}
                currentIndex={currentIndex}
                answers={answers}
                flagged={flagged}
                onSelectQuestion={handleSelectQuestion}
              />
            </div>
          </div>
        ) : mode === 'review' ? (
          <ExamResults
            questions={questions}
            answers={answers}
            flagged={flagged}
            score={lastExamScore}
            percentage={lastExamPercentage}
            passed={lastExamPassed}
            timeSpentSeconds={timeSpentSeconds}
            candidateName={candidateName}
            onRetakeExam={handleRestartExam}
            onRetakeIncorrect={handleRetakeIncorrect}
          />
        ) : mode === 'bank' ? (
          <StudyBankView questions={HCIA_OPENGAUSS_QUESTIONS} />
        ) : (
          <FlashcardsView questions={HCIA_OPENGAUSS_QUESTIONS} />
        )}
      </main>

      {/* Footer info banner */}
      <footer className="no-print bg-white border-t border-slate-200 py-4 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span>Huawei HCIA-openGauss (H13-911) Computer-Based Testing System</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-400">
            <span>50 Comprehensive Questions</span>
            <span>•</span>
            <span>Real Exam Passing Standard (600/1000)</span>
            <span>•</span>
            <span className="font-mono">v2.4.0</span>
          </div>
        </div>
      </footer>

      {/* Final Submit Confirmation Modal */}
      <ExamModalSubmit
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onConfirm={handleSubmitExam}
        totalQuestions={questions.length}
        answeredCount={answeredCount}
        flaggedCount={flaggedCount}
        timeLeft={timeLeft}
      />
    </div>
  );
}
