import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  BookOpen, 
  Flag, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  BarChart3, 
  Sparkles,
  Printer
} from 'lucide-react';
import { Question } from '../types';
import { CertificateModal } from './CertificateModal';

interface ExamResultsProps {
  questions: Question[];
  answers: Record<number, number>;
  flagged: Record<number, boolean>;
  score: number;
  percentage: number;
  passed: boolean;
  timeSpentSeconds: number;
  candidateName: string;
  onRetakeExam: () => void;
  onRetakeIncorrect: (incorrectIds: number[]) => void;
}

export const ExamResults: React.FC<ExamResultsProps> = ({
  questions,
  answers,
  flagged,
  score,
  percentage,
  passed,
  timeSpentSeconds,
  candidateName,
  onRetakeExam,
  onRetakeIncorrect
}) => {
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect' | 'flagged'>('all');
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    if (passed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [passed]);

  const letters = ['A', 'B', 'C', 'D'];

  // Calculate question metrics
  const totalQuestions = questions.length;
  let correctCount = 0;
  const incorrectIds: number[] = [];

  questions.forEach((q) => {
    const userAns = answers[q.id];
    if (userAns === q.correctAnswer) {
      correctCount++;
    } else {
      incorrectIds.push(q.id);
    }
  });

  // Calculate category stats
  const categoryStats: Record<string, { total: number; correct: number }> = {};
  questions.forEach((q) => {
    if (!categoryStats[q.category]) {
      categoryStats[q.category] = { total: 0, correct: 0 };
    }
    categoryStats[q.category].total++;
    if (answers[q.id] === q.correctAnswer) {
      categoryStats[q.category].correct++;
    }
  });

  // Filtered review questions
  const filteredQuestions = questions.filter((q) => {
    const userAns = answers[q.id];
    const isCorrect = userAns === q.correctAnswer;
    const isItemFlagged = !!flagged[q.id];

    if (reviewFilter === 'correct') return isCorrect;
    if (reviewFilter === 'incorrect') return !isCorrect;
    if (reviewFilter === 'flagged') return isItemFlagged;
    return true;
  });

  const minutes = Math.floor(timeSpentSeconds / 60);
  const seconds = timeSpentSeconds % 60;
  const timeFormatted = `${minutes}m ${seconds}s`;
  const todayStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Pass/Fail Banner */}
      <div className={`rounded-2xl p-6 sm:p-8 text-white shadow-lg border relative overflow-hidden ${
        passed
          ? 'bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 border-emerald-600'
          : 'bg-gradient-to-r from-slate-900 via-rose-900 to-slate-900 border-rose-800'
      }`}>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold backdrop-blur-xs">
              <Award className="w-4 h-4 text-amber-300" />
              <span>Official HCIA-openGauss Certification Evaluation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {passed ? 'Congratulations! You Passed!' : 'Exam Completed — Needs Improvement'}
            </h1>
            <p className="text-sm text-white/80 max-w-xl">
              Candidate <strong className="text-white underline">{candidateName}</strong>, {passed
                ? 'you have satisfied the examination requirements for HCIA-openGauss with a score surpassing the 600-point threshold.'
                : 'your score is currently below the 600-point threshold (60%). Review your missed questions below and re-test.'}
            </p>
          </div>

          {/* Big Score Dial Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center shrink-0 w-full md:w-auto min-w-[200px]">
            <div className="text-xs font-medium text-white/70 uppercase tracking-wider">
              Total Score
            </div>
            <div className="text-4xl sm:text-5xl font-mono font-extrabold text-white my-1">
              {score}
              <span className="text-lg font-normal text-white/60">/1000</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-xs font-semibold text-white/90">
              <span>{percentage}%</span>
              <span>•</span>
              <span className={passed ? 'text-emerald-300' : 'text-rose-300'}>
                {passed ? 'PASS (≥600)' : 'FAIL (<600)'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick actions right inside banner */}
        <div className="relative z-10 mt-6 pt-6 border-t border-white/15 flex flex-wrap items-center gap-3">
          {passed && (
            <button
              onClick={() => setShowCertificate(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs rounded-xl shadow transition"
            >
              <Award className="w-4 h-4" />
              <span>View Official Certificate</span>
            </button>
          )}

          <button
            onClick={onRetakeExam}
            className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold text-xs rounded-xl transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Full Exam (50 Questions)</span>
          </button>

          {incorrectIds.length > 0 && (
            <button
              onClick={() => onRetakeIncorrect(incorrectIds)}
              className="flex items-center space-x-2 px-4 py-2 bg-rose-500/80 hover:bg-rose-500 text-white font-semibold text-xs rounded-xl transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Drill Missed Questions Only ({incorrectIds.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Metrics Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Correct Answers</div>
            <div className="text-lg font-bold font-mono text-slate-800">
              {correctCount} <span className="text-xs text-slate-400 font-normal">/ {totalQuestions}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="p-2.5 bg-rose-100 text-rose-700 rounded-lg">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Incorrect / Blank</div>
            <div className="text-lg font-bold font-mono text-slate-800">
              {incorrectIds.length} <span className="text-xs text-slate-400 font-normal">/ {totalQuestions}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="p-2.5 bg-amber-100 text-amber-700 rounded-lg">
            <Flag className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Flagged Items</div>
            <div className="text-lg font-bold font-mono text-slate-800">
              {Object.keys(flagged).length}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="p-2.5 bg-blue-100 text-blue-700 rounded-lg">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Time Taken</div>
            <div className="text-lg font-bold font-mono text-slate-800">
              {timeFormatted}
            </div>
          </div>
        </div>
      </div>

      {/* Domain Category Competency Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-slate-200">
          <BarChart3 className="w-5 h-5 text-red-600" />
          <h2 className="text-base font-bold text-slate-900">
            Competency Domain Performance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(categoryStats).map(([cat, stats]) => {
            const catPercent = Math.round((stats.correct / stats.total) * 100);
            return (
              <div key={cat} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-800">{cat}</span>
                  <span className="font-mono text-slate-600">
                    {stats.correct} / {stats.total} ({catPercent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      catPercent >= 80
                        ? 'bg-emerald-600'
                        : catPercent >= 60
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${catPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Question Review Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Review Filter Bar */}
        <div className="p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-slate-700" />
            <h3 className="text-base font-bold text-slate-900">
              Question-by-Question Review
            </h3>
          </div>

          <div className="flex items-center space-x-1.5 bg-slate-200/70 p-1 rounded-lg text-xs">
            <button
              onClick={() => setReviewFilter('all')}
              className={`px-3 py-1 rounded-md font-medium transition ${
                reviewFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({questions.length})
            </button>
            <button
              onClick={() => setReviewFilter('incorrect')}
              className={`px-3 py-1 rounded-md font-medium transition ${
                reviewFilter === 'incorrect'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Incorrect ({incorrectIds.length})
            </button>
            <button
              onClick={() => setReviewFilter('correct')}
              className={`px-3 py-1 rounded-md font-medium transition ${
                reviewFilter === 'correct'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Correct ({correctCount})
            </button>
            <button
              onClick={() => setReviewFilter('flagged')}
              className={`px-3 py-1 rounded-md font-medium transition ${
                reviewFilter === 'flagged'
                  ? 'bg-white text-amber-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Flagged ({Object.keys(flagged).length})
            </button>
          </div>
        </div>

        {/* List of Questions with Detailed Explanations */}
        <div className="divide-y divide-slate-200">
          {filteredQuestions.map((q) => {
            const userAns = answers[q.id];
            const isCorrect = userAns === q.correctAnswer;
            const isItemFlagged = !!flagged[q.id];
            const isExpanded = expandedQuestionId === q.id;

            return (
              <div key={q.id} className="p-5 hover:bg-slate-50/50 transition">
                {/* Header Row */}
                <div 
                  onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                  className="flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start space-x-3">
                    <span className="shrink-0 mt-0.5">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      )}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-xs text-slate-900">
                          Q{q.id}.
                        </span>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {q.category}
                        </span>
                        {isItemFlagged && (
                          <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded flex items-center space-x-1">
                            <Flag className="w-2.5 h-2.5" />
                            <span>Flagged</span>
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-slate-800 leading-snug">
                        {q.question}
                      </p>
                    </div>
                  </div>

                  <button className="text-slate-400 hover:text-slate-600 p-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Answer Summary Badge */}
                <div className="mt-3 ml-8 flex flex-wrap items-center gap-3 text-xs">
                  <span className={`px-2 py-1 rounded font-medium ${
                    userAns !== undefined
                      ? isCorrect
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    Your Answer: {userAns !== undefined ? `(${letters[userAns]}) ${q.options[userAns]}` : 'Unanswered'}
                  </span>

                  {!isCorrect && (
                    <span className="px-2 py-1 rounded font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Correct: ({letters[q.correctAnswer]}) {q.options[q.correctAnswer]}
                    </span>
                  )}
                </div>

                {/* Expanded Details & Official Notes */}
                {isExpanded && (
                  <div className="mt-4 ml-8 p-4 bg-slate-100/80 rounded-xl border border-slate-200 text-xs space-y-3">
                    {/* All options display */}
                    <div className="space-y-1.5">
                      <div className="font-semibold text-slate-700">Options:</div>
                      {q.options.map((opt, oIdx) => {
                        const isSelected = userAns === oIdx;
                        const isCorrectOpt = q.correctAnswer === oIdx;
                        return (
                          <div 
                            key={oIdx}
                            className={`p-2 rounded border flex items-center space-x-2 ${
                              isCorrectOpt
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                                : isSelected
                                ? 'bg-rose-50 border-rose-300 text-rose-900'
                                : 'bg-white border-slate-200 text-slate-600'
                            }`}
                          >
                            <span className="w-5 text-center font-bold">({letters[oIdx]})</span>
                            <span>{opt}</span>
                            {isCorrectOpt && <span className="ml-auto text-emerald-700 text-[10px] uppercase font-bold">Correct</span>}
                            {isSelected && !isCorrectOpt && <span className="ml-auto text-rose-700 text-[10px] uppercase font-bold">Your Choice</span>}
                          </div>
                        );
                      })}
                    </div>

                    <div className="border-t border-slate-200 pt-3">
                      <div className="font-semibold text-slate-800 mb-1">
                        Technical Explanation:
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>

                    <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 font-medium">
                      <strong>Key Concept:</strong> {q.keyConcept}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        candidateName={candidateName}
        score={score}
        percentage={percentage}
        passed={passed}
        dateStr={todayStr}
      />
    </div>
  );
};
