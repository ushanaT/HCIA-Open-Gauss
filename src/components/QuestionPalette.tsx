import React, { useState } from 'react';
import { Flag, Check, Circle, AlertCircle } from 'lucide-react';

interface QuestionPaletteProps {
  totalQuestions: number;
  currentIndex: number;
  answers: Record<number, number>;
  flagged: Record<number, boolean>;
  onSelectQuestion: (index: number) => void;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  totalQuestions,
  currentIndex,
  answers,
  flagged,
  onSelectQuestion
}) => {
  const [filter, setFilter] = useState<'all' | 'unanswered' | 'flagged'>('all');

  const questionIndices = Array.from({ length: totalQuestions }, (_, i) => i);

  const answeredIndices = questionIndices.filter((i) => answers[i + 1] !== undefined);
  const unansweredIndices = questionIndices.filter((i) => answers[i + 1] === undefined);
  const flaggedIndices = questionIndices.filter((i) => !!flagged[i + 1]);

  let displayedIndices = questionIndices;
  if (filter === 'unanswered') displayedIndices = unansweredIndices;
  if (filter === 'flagged') displayedIndices = flaggedIndices;

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-4 sm:p-5 flex flex-col h-full">
      {/* Title & Filter Tabs */}
      <div className="pb-3 border-b border-slate-200 mb-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
            <span>Question Palette</span>
            <span className="text-[10px] font-mono font-medium text-slate-500">
              ({totalQuestions} Items)
            </span>
          </h3>
          <span className="text-[11px] font-semibold text-slate-600">
            {answeredIndices.length} / {totalQuestions} Done
          </span>
        </div>

        {/* Filter buttons */}
        <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg text-[11px]">
          <button
            onClick={() => setFilter('all')}
            className={`py-1 rounded font-medium transition ${
              filter === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({totalQuestions})
          </button>
          <button
            onClick={() => setFilter('unanswered')}
            className={`py-1 rounded font-medium transition ${
              filter === 'unanswered'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pending ({unansweredIndices.length})
          </button>
          <button
            onClick={() => setFilter('flagged')}
            className={`py-1 rounded font-medium transition flex items-center justify-center space-x-1 ${
              filter === 'flagged'
                ? 'bg-white text-amber-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Flag className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
            <span>Flagged ({flaggedIndices.length})</span>
          </button>
        </div>
      </div>

      {/* Grid of 50 Buttons */}
      <div className="flex-1 overflow-y-auto max-h-[380px] sm:max-h-[460px] pr-1">
        <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 gap-2">
          {displayedIndices.map((idx) => {
            const questionNum = idx + 1;
            const isAnswered = answers[questionNum] !== undefined;
            const isItemFlagged = !!flagged[questionNum];
            const isCurrent = idx === currentIndex;

            let btnStyle = 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100';

            if (isAnswered) {
              btnStyle = 'border-emerald-600 bg-emerald-600 text-white font-semibold shadow-xs';
            }

            if (isItemFlagged) {
              if (isAnswered) {
                btnStyle = 'border-emerald-700 bg-emerald-700 text-white ring-2 ring-amber-400';
              } else {
                btnStyle = 'border-amber-400 bg-amber-50 text-amber-950 font-medium ring-1 ring-amber-400';
              }
            }

            if (isCurrent) {
              btnStyle += ' ring-2 ring-red-600 ring-offset-2 scale-105 z-10';
            }

            return (
              <button
                key={questionNum}
                onClick={() => onSelectQuestion(idx)}
                className={`relative h-10 w-full rounded-lg border text-xs font-mono transition-all flex items-center justify-center cursor-pointer ${btnStyle}`}
                title={`Question ${questionNum}${isAnswered ? ' (Answered)' : ' (Unanswered)'}${isItemFlagged ? ' - Flagged' : ''}`}
              >
                <span>{questionNum}</span>

                {/* Flag indicator badge */}
                {isItemFlagged && (
                  <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-amber-400 flex items-center justify-center text-[8px] text-amber-950 shadow">
                    ★
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {displayedIndices.length === 0 && (
          <div className="text-center py-8 text-xs text-slate-400">
            No questions matching filter
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] space-y-1.5 text-slate-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-3.5 rounded bg-emerald-600 border border-emerald-700"></span>
            <span>Answered</span>
          </div>
          <span className="font-mono font-medium">{answeredIndices.length}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-3.5 rounded bg-white border border-slate-300"></span>
            <span>Unanswered</span>
          </div>
          <span className="font-mono font-medium">{unansweredIndices.length}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-3.5 rounded bg-amber-100 border border-amber-400 flex items-center justify-center text-[8px] text-amber-800">
              ★
            </span>
            <span>Flagged for Review</span>
          </div>
          <span className="font-mono font-medium">{flaggedIndices.length}</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-3.5 rounded border border-red-600 ring-2 ring-red-600/30"></span>
            <span>Current Question</span>
          </div>
          <span className="font-mono font-medium">Q{currentIndex + 1}</span>
        </div>
      </div>
    </div>
  );
};
