import React, { useState } from 'react';
import { 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  CheckCircle, 
  Layers, 
  Award,
  Sparkles
} from 'lucide-react';
import { Question } from '../types';

interface FlashcardsViewProps {
  questions: Question[];
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ questions }) => {
  const [deck, setDeck] = useState<Question[]>([...questions]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Record<number, boolean>>({});

  const currentQ = deck[currentIndex];
  const letters = ['A', 'B', 'C', 'D'];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
  };

  const toggleMastered = (id: number) => {
    setMasteredIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isMastered = !!masteredIds[currentQ.id];

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-emerald-900 text-white p-6 rounded-2xl shadow-sm border border-emerald-800">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Active Recall Drill</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            HCIA-openGauss Flashcards
          </h1>
          <p className="text-xs text-emerald-200/80 mt-1">
            Flip through essential concepts and master key exam items through spaced repetition.
          </p>
        </div>

        <button
          onClick={handleShuffle}
          className="flex items-center space-x-1.5 px-3 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl border border-emerald-700 transition"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Shuffle Deck</span>
        </button>
      </div>

      {/* Progress Counter */}
      <div className="flex items-center justify-between text-xs text-slate-600 px-2">
        <span className="font-mono font-bold">
          Card {currentIndex + 1} of {deck.length}
        </span>
        <span className="font-medium">
          Mastered: <strong className="text-emerald-600">{Object.keys(masteredIds).length}</strong> / {deck.length}
        </span>
      </div>

      {/* The Flashcard itself */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="min-h-[380px] bg-white rounded-2xl border-2 border-slate-200 p-8 shadow-md flex flex-col justify-between cursor-pointer hover:border-emerald-500/50 transition-all select-none relative group"
      >
        {/* Top Card Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 text-white font-mono text-xs font-bold">
              Q{currentQ.id}
            </span>
            <span className="text-xs font-medium text-slate-500">
              {currentQ.category}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMastered(currentQ.id);
              }}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold transition ${
                isMastered
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              <CheckCircle className={`w-3.5 h-3.5 ${isMastered ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{isMastered ? 'Mastered' : 'Mark as Learned'}</span>
            </button>
          </div>
        </div>

        {/* Card Content (Front vs Back) */}
        <div className="py-8 text-center">
          {!isFlipped ? (
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Question Prompt
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed max-w-xl mx-auto">
                {currentQ.question}
              </h2>
              <div className="mt-4 text-xs text-slate-500 max-w-md mx-auto grid grid-cols-2 gap-2 text-left pt-4 border-t border-slate-100">
                {currentQ.options.map((opt, i) => (
                  <div key={i} className="p-2 rounded bg-slate-50 border border-slate-200 text-slate-700">
                    <span className="font-bold text-slate-900 mr-1.5">{letters[i]}.</span>
                    <span>{opt}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-150">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                Official Answer & Key Rationale
              </span>
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-800">
                ({letters[currentQ.correctAnswer]}) {currentQ.options[currentQ.correctAnswer]}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed max-w-lg mx-auto bg-slate-50 p-4 rounded-xl border border-slate-200">
                {currentQ.explanation}
              </p>
              <div className="text-xs font-semibold text-blue-900 bg-blue-50 py-2 px-4 rounded-lg inline-block border border-blue-200">
                Takeaway: {currentQ.keyConcept}
              </div>
            </div>
          )}
        </div>

        {/* Card Footer Hint */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-1.5">
            <RotateCw className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-300" />
            <span>Click anywhere to flip card</span>
          </div>
          <span className="text-[11px] font-mono">Difficulty: {currentQ.difficulty}</span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
              : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 shadow-xs'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Card</span>
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === deck.length - 1}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-bold transition ${
            currentIndex === deck.length - 1
              ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
          }`}
        >
          <span>Next Card</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
