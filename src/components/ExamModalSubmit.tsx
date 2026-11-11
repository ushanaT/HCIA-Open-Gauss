import React from 'react';
import { AlertTriangle, CheckCircle, Flag, Clock, ArrowLeft, Send } from 'lucide-react';

interface ExamModalSubmitProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalQuestions: number;
  answeredCount: number;
  flaggedCount: number;
  timeLeft: number;
}

export const ExamModalSubmit: React.FC<ExamModalSubmitProps> = ({
  isOpen,
  onClose,
  onConfirm,
  totalQuestions,
  answeredCount,
  flaggedCount,
  timeLeft
}) => {
  if (!isOpen) return null;

  const unansweredCount = totalQuestions - answeredCount;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}m ${seconds}s`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-slate-900 border border-slate-200">
        {/* Title */}
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
          <div className="p-2.5 rounded-xl bg-red-100 text-red-600">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Submit HCIA-openGauss Exam?
            </h3>
            <p className="text-xs text-slate-500">
              Review your attempt summary before final scoring.
            </p>
          </div>
        </div>

        {/* Warning if unanswered */}
        {unansweredCount > 0 && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-start space-x-2.5 text-xs text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Attention: </span>
              You have <span className="font-extrabold text-amber-950 underline">{unansweredCount} unanswered questions</span>. Unanswered questions will receive 0 points.
            </div>
          </div>
        )}

        {/* Audit Stats Grid */}
        <div className="my-5 grid grid-cols-2 gap-2.5 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-500 text-[11px]">Answered</div>
              <div className="text-base font-bold font-mono text-emerald-700">
                {answeredCount} / {totalQuestions}
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center space-x-3">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
              <Flag className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-500 text-[11px]">Flagged</div>
              <div className="text-base font-bold font-mono text-amber-700">
                {flaggedCount}
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center space-x-3">
            <div className="p-2 bg-rose-100 text-rose-700 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-500 text-[11px]">Pending</div>
              <div className="text-base font-bold font-mono text-rose-700">
                {unansweredCount}
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center space-x-3">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-500 text-[11px]">Time Left</div>
              <div className="text-base font-bold font-mono text-blue-700">
                {formattedTime}
              </div>
            </div>
          </div>
        </div>

        {/* Dialog Actions */}
        <div className="pt-2 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="flex items-center space-x-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl border border-slate-300 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Exam</span>
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center space-x-1.5 px-5 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Yes, Submit & Score</span>
          </button>
        </div>
      </div>
    </div>
  );
};
