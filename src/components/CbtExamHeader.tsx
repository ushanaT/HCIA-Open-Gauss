import React, { useState } from 'react';
import { 
  Clock, 
  Flag, 
  Maximize2, 
  Minimize2, 
  User, 
  HelpCircle, 
  Send, 
  RotateCcw,
  Sparkles,
  BookOpen,
  Layers,
  GraduationCap
} from 'lucide-react';
import { ExamMode } from '../types';

interface CbtExamHeaderProps {
  mode: ExamMode;
  onSelectMode: (mode: ExamMode) => void;
  timeLeft: number; // in seconds
  totalQuestions: number;
  answeredCount: number;
  flaggedCount: number;
  candidateName: string;
  onUpdateCandidateName: (name: string) => void;
  onSubmitExam: () => void;
  onRestartExam: () => void;
}

export const CbtExamHeader: React.FC<CbtExamHeaderProps> = ({
  mode,
  onSelectMode,
  timeLeft,
  totalQuestions,
  answeredCount,
  flaggedCount,
  candidateName,
  onUpdateCandidateName,
  onSubmitExam,
  onRestartExam
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(candidateName);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = timeLeft < 600 && mode === 'timed'; // under 10 mins

  return (
    <>
      <header className="sticky top-0 z-30 bg-slate-900 text-white shadow-md border-b border-slate-800">
        {/* Top bar with system info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Exam Title */}
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-red-600 flex items-center justify-center font-bold text-white shadow-sm ring-2 ring-red-400/30">
              <span className="text-xs tracking-tighter">HCIA</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold tracking-wide text-slate-100">
                  openGauss Certification Exam
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-medium bg-red-950/80 text-red-300 border border-red-800/60 rounded">
                  H13-911
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Huawei Certified ICT Associate • Computer-Based Test (CBT)
              </p>
            </div>
          </div>

          {/* Navigation modes */}
          <div className="flex items-center bg-slate-800/80 p-1 rounded-lg border border-slate-700/60 text-xs">
            <button
              onClick={() => onSelectMode('timed')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition font-medium ${
                mode === 'timed'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Real CBT Exam</span>
            </button>
            <button
              onClick={() => onSelectMode('practice')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition font-medium ${
                mode === 'practice'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Practice Mode</span>
            </button>
            <button
              onClick={() => onSelectMode('bank')}
              className={`hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition font-medium ${
                mode === 'bank'
                  ? 'bg-slate-700 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Question Bank (50)</span>
            </button>
            <button
              onClick={() => onSelectMode('flashcards')}
              className={`hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition font-medium ${
                mode === 'flashcards'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Flashcards</span>
            </button>
          </div>

          {/* Right Utility: Candidate info & Actions */}
          <div className="flex items-center space-x-3">
            {/* Candidate pill */}
            <div 
              onClick={() => {
                setTempName(candidateName);
                setIsEditingName(true);
              }}
              className="flex items-center space-x-2 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 hover:border-slate-600 cursor-pointer text-xs transition"
              title="Click to edit candidate name"
            >
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-200 max-w-[130px] truncate">{candidateName || 'Candidate'}</span>
            </div>

            {/* Help */}
            <button
              onClick={() => setShowHelpModal(true)}
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Exam instructions & shortcuts"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Fullscreen toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen CBT Mode"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Sub-bar: Real-time Timer & CBT Status Counters */}
        {mode === 'timed' && (
          <div className="bg-slate-950 px-4 sm:px-6 lg:px-8 py-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs">
            {/* Timer countdown */}
            <div className="flex items-center space-x-2">
              <span className="text-slate-400">Time Remaining:</span>
              <div className={`flex items-center space-x-1.5 font-mono text-sm px-2.5 py-0.5 rounded font-semibold ${
                isTimeCritical
                  ? 'bg-red-500/20 text-red-400 animate-pulse border border-red-500/40'
                  : 'bg-slate-800 text-slate-100 border border-slate-700'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(timeLeft)}</span>
              </div>
              <span className="text-slate-500 hidden sm:inline">(Total: 90 Minutes)</span>
            </div>

            {/* Answer metrics */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5 text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>Answered: <strong className="text-white">{answeredCount}</strong> / {totalQuestions}</span>
              </div>
              <div className="flex items-center space-x-1.5 text-slate-300">
                <Flag className="w-3.5 h-3.5 text-amber-400" />
                <span>Flagged: <strong className="text-amber-400">{flaggedCount}</strong></span>
              </div>

              {/* Action buttons */}
              <button
                onClick={onRestartExam}
                className="flex items-center space-x-1 px-2 py-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition"
                title="Reset this attempt"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>

              <button
                onClick={onSubmitExam}
                className="flex items-center space-x-1.5 px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-medium rounded shadow transition active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Exam</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Candidate Name Modal */}
      {isEditingName && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-slate-900 border border-slate-200">
            <h3 className="text-base font-bold flex items-center space-x-2 text-slate-900 mb-2">
              <User className="w-4 h-4 text-red-600" />
              <span>Candidate Name</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter your full name as you want it to appear on your official HCIA Certificate of Achievement.
            </p>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="e.g. Jane Doe"
              maxLength={40}
              autoFocus
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditingName(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-md transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (tempName.trim()) {
                    onUpdateCandidateName(tempName.trim());
                  }
                  setIsEditingName(false);
                }}
                className="px-4 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-md transition"
              >
                Save Name
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instructions & Shortcuts Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 text-slate-900 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-red-600" />
                <h3 className="text-base font-bold text-slate-900">HCIA-openGauss CBT Instructions</h3>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-900">
                <strong className="block font-semibold mb-1 text-amber-950">Certification Test Rules:</strong>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Total Questions: 50 multiple-choice items</li>
                  <li>Total Score: 1000 points (20 points per question)</li>
                  <li>Passing Score: 600 points (60%)</li>
                  <li>Duration: 90 Minutes standard exam window</li>
                </ul>
              </div>

              <div>
                <strong className="block font-semibold text-slate-800 mb-1">Keyboard Shortcuts:</strong>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-slate-50 p-2 rounded border border-slate-200">
                    <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-xs font-mono font-bold">1</kbd> - <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-xs font-mono font-bold">4</kbd> or <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-xs font-mono font-bold">A</kbd> - <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-xs font-mono font-bold">D</kbd> : Select Option
                  </div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-200">
                    <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-xs font-mono font-bold">←</kbd> / <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-xs font-mono font-bold">→</kbd> : Prev / Next Question
                  </div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-200">
                    <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-xs font-mono font-bold">M</kbd> : Mark / Unmark for Review
                  </div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-200">
                    <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-xs font-mono font-bold">C</kbd> : Clear selected answer
                  </div>
                </div>
              </div>

              <div>
                <strong className="block font-semibold text-slate-800 mb-1">Question Status Indicators:</strong>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <span className="inline-flex items-center px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span> Answered
                  </span>
                  <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded">
                    <span className="w-2 h-2 rounded-full bg-slate-400 mr-1.5"></span> Unanswered
                  </span>
                  <span className="inline-flex items-center px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded">
                    <Flag className="w-3 h-3 text-amber-500 mr-1" /> Flagged for Review
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 text-right">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition"
              >
                Close & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
