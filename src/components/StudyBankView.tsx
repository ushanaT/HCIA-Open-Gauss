import React, { useState } from 'react';
import { Search, Filter, BookOpen, CheckCircle, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { Question } from '../types';
import { CATEGORIES } from '../data/questions';

interface StudyBankViewProps {
  questions: Question[];
}

export const StudyBankView: React.FC<StudyBankViewProps> = ({ questions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const letters = ['A', 'B', 'C', 'D'];

  const filtered = questions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.explanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.options.some((o) => o.toLowerCase().includes(searchTerm.toLowerCase())) ||
      q.id.toString() === searchTerm.trim();

    const matchesCat = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;

    return matchesSearch && matchesCat && matchesDiff;
  });

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const map: Record<number, boolean> = {};
    filtered.forEach((q) => (map[q.id] = true));
    setExpandedIds(map);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  const copyQuestion = (q: Question) => {
    const text = `Q${q.id}: ${q.question}\nOptions:\n${q.options
      .map((o, idx) => `${letters[idx]}. ${o}`)
      .join('\n')}\nCorrect: ${letters[q.correctAnswer]}. ${q.options[q.correctAnswer]}\nExplanation: ${q.explanation}`;
    navigator.clipboard.writeText(text);
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-900/60 text-red-300 border border-red-700/50 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Full Curriculum Repository</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              HCIA-openGauss Complete Question Bank
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Browse, search, and study all 50 official certification questions with answers, technical rationales, and exam notes.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions by keyword, SQL statement, concept, or question number..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 focus:bg-white transition"
          />
        </div>

        {/* Categories Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1 text-xs">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              selectedCategory === 'All'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Categories ({questions.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Question Counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong>{filtered.length}</strong> of {questions.length} questions</span>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filtered.map((q) => {
          const isExpanded = !!expandedIds[q.id];
          return (
            <div
              key={q.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition"
            >
              <div
                onClick={() => toggleExpand(q.id)}
                className="p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                      Q{q.id}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200/60">
                      {q.category}
                    </span>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {q.difficulty}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                    {q.question}
                  </h3>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyQuestion(q);
                    }}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
                    title="Copy question text"
                  >
                    {copiedId === q.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button className="text-slate-400 hover:text-slate-600 p-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4 text-xs sm:text-sm">
                  {/* Options */}
                  <div className="space-y-2">
                    <div className="font-semibold text-slate-700 text-xs">Options:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, idx) => {
                        const isCorrect = idx === q.correctAnswer;
                        return (
                          <div
                            key={idx}
                            className={`p-3 rounded-lg border flex items-center space-x-2.5 ${
                              isCorrect
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                                : 'bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                          >
                            <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                              isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                            }`}>
                              {letters[idx]}
                            </span>
                            <span className="flex-1">{opt}</span>
                            {isCorrect && (
                              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Technical Explanation */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-800 text-xs">
                      Official Technical Explanation:
                    </div>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      {q.explanation}
                    </p>
                    <div className="pt-2 text-xs text-blue-900 bg-blue-50/80 p-2.5 rounded-lg border border-blue-200">
                      <strong>Core Exam Concept:</strong> {q.keyConcept}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-400 text-sm">
            No questions found matching your filter criteria.
          </div>
        )}
      </div>
    </div>
  );
};
