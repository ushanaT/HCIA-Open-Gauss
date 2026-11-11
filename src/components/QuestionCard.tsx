import React from 'react';
import { 
  Flag, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  Sparkles,
  Table as TableIcon
} from 'lucide-react';
import { Question, ExamMode } from '../types';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOptionIndex?: number;
  isFlagged: boolean;
  mode: ExamMode;
  onSelectOption: (optionIndex: number) => void;
  onToggleFlag: () => void;
  onClearOption: () => void;
  onPrev: () => void;
  onNext: () => void;
  showPracticeExplanation?: boolean;
  onTogglePracticeExplanation?: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionIndex,
  isFlagged,
  mode,
  onSelectOption,
  onToggleFlag,
  onClearOption,
  onPrev,
  onNext,
  showPracticeExplanation = false,
  onTogglePracticeExplanation
}) => {
  const letters = ['A', 'B', 'C', 'D'];
  const isPractice = mode === 'practice';
  const hasAnswered = selectedOptionIndex !== undefined;
  const isCorrect = hasAnswered && selectedOptionIndex === question.correctAnswer;

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 overflow-hidden transition-all">
      {/* Question Header Meta */}
      <div className="bg-slate-50/80 px-6 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <span className="inline-flex items-center justify-center px-3 py-1 rounded-md bg-slate-900 text-white font-mono text-xs font-bold tracking-wider">
            QUESTION {question.id}
          </span>
          <span className="text-xs font-medium text-slate-500">
            of {totalQuestions}
          </span>
          <span className="text-slate-300">•</span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-red-50 text-red-700 border border-red-200/60">
            {question.category}
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
            question.difficulty === 'Foundation'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : question.difficulty === 'Core'
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : 'bg-purple-50 text-purple-700 border border-purple-200'
          }`}>
            {question.difficulty}
          </span>
        </div>

        {/* Action Flags */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleFlag}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition ${
              isFlagged
                ? 'bg-amber-100 text-amber-800 border border-amber-300 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 border border-slate-300'
            }`}
            title="Mark this question to review later (Shortcut: M)"
          >
            <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-600' : 'text-slate-400'}`} />
            <span>{isFlagged ? 'Flagged for Review' : 'Mark for Review'}</span>
          </button>

          {hasAnswered && (
            <button
              onClick={onClearOption}
              className="flex items-center space-x-1 px-2.5 py-1 text-xs text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md border border-slate-200 transition"
              title="Clear current selection (Shortcut: C)"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Question Body */}
      <div className="p-6 sm:p-8">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed tracking-tight mb-6">
          {question.question}
        </h2>

        {/* Visual Table if present (e.g., Q40 Columnar Storage representation) */}
        {question.tableVisual && (
          <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            {question.tableVisual.title && (
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 mb-2.5">
                <TableIcon className="w-4 h-4 text-slate-500" />
                <span>{question.tableVisual.title}</span>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs text-center border-collapse border border-slate-300 bg-white">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    {question.tableVisual.headers.map((h, i) => (
                      <th key={i} className="border border-slate-300 px-3 py-2 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {question.tableVisual.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50 font-mono">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="border border-slate-300 px-3 py-2 text-slate-800">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[11px] text-slate-500 italic">
              Note: Observe the column-wise grouping vs row-wise grouping across physical disk blocks.
            </p>
          </div>
        )}

        {/* Code Snippet if present */}
        {question.codeSnippet && (
          <div className="mb-6 bg-slate-900 text-slate-100 rounded-lg p-3.5 font-mono text-xs overflow-x-auto border border-slate-800">
            <pre>{question.codeSnippet}</pre>
          </div>
        )}

        {/* Options List */}
        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedOptionIndex === idx;
            const isCorrectOption = idx === question.correctAnswer;
            
            // Practice styling
            let optionStyles = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
            let badgeStyles = 'bg-slate-100 text-slate-600 border-slate-300';

            if (isPractice && hasAnswered) {
              if (isCorrectOption) {
                optionStyles = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 ring-1 ring-emerald-500';
                badgeStyles = 'bg-emerald-600 text-white border-emerald-600';
              } else if (isSelected && !isCorrect) {
                optionStyles = 'border-rose-400 bg-rose-50/80 text-rose-950 ring-1 ring-rose-400';
                badgeStyles = 'bg-rose-600 text-white border-rose-600';
              }
            } else if (isSelected) {
              optionStyles = 'border-red-600 bg-red-50/70 text-slate-900 ring-2 ring-red-500/20';
              badgeStyles = 'bg-red-600 text-white border-red-600 font-bold';
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectOption(idx)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start space-x-3.5 group cursor-pointer ${optionStyles}`}
              >
                {/* Option Letter Badge */}
                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg border text-xs font-semibold shrink-0 transition-colors ${badgeStyles}`}>
                  {letters[idx]}
                </span>

                {/* Option Text */}
                <div className="flex-1 pt-0.5 text-sm sm:text-base leading-relaxed break-words">
                  {option}
                </div>

                {/* Practice Mode Instant Icon */}
                {isPractice && hasAnswered && (
                  <div className="shrink-0 pt-0.5">
                    {isCorrectOption && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    )}
                    {isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Practice Mode Immediate Explanation Drawer */}
        {isPractice && (
          <div className="mt-6 pt-5 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <button
                onClick={onTogglePracticeExplanation}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
              >
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span>{showPracticeExplanation ? 'Hide Explanation & Key Notes' : 'Reveal Official Answer & Explanation'}</span>
              </button>

              {hasAnswered && (
                <span className={`text-xs font-semibold flex items-center space-x-1 ${
                  isCorrect ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Correct! (+20 pts)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Incorrect — Answer is ({letters[question.correctAnswer]})</span>
                    </>
                  )}
                </span>
              )}
            </div>

            {showPracticeExplanation && (
              <div className="mt-4 p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm text-slate-800 space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-blue-200/60">
                  <span className="font-semibold text-blue-900">
                    Correct Option: ({letters[question.correctAnswer]}) {question.options[question.correctAnswer]}
                  </span>
                  <span className="text-[11px] font-mono text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded">
                    HCIA Domain: {question.category}
                  </span>
                </div>
                <p className="leading-relaxed text-slate-700">
                  {question.explanation}
                </p>
                <div className="bg-white/80 p-2.5 rounded-lg border border-blue-200 text-xs text-blue-950 font-medium">
                  <strong>Key Takeaway: </strong> {question.keyConcept}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-100'
              : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 shadow-xs active:scale-98'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="text-center text-xs text-slate-500 hidden sm:block">
          Use keys <kbd className="px-1.5 py-0.5 bg-white border rounded font-mono text-[10px]">A</kbd>-<kbd className="px-1.5 py-0.5 bg-white border rounded font-mono text-[10px]">D</kbd> or <kbd className="px-1.5 py-0.5 bg-white border rounded font-mono text-[10px]">1</kbd>-<kbd className="px-1.5 py-0.5 bg-white border rounded font-mono text-[10px]">4</kbd> to answer
        </div>

        <button
          onClick={onNext}
          disabled={currentIndex === totalQuestions - 1}
          className={`flex items-center space-x-1.5 px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
            currentIndex === totalQuestions - 1
              ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-100'
              : 'text-white bg-slate-900 hover:bg-slate-800 shadow-xs active:scale-98'
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
