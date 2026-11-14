import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Filter, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import QuestionCard from './QuestionCard';

export default function ExamReview({
  result,
  questions,
  onBackToSummary,
  bookmarks,
  onToggleBookmark
}) {
  const [filterMode, setFilterMode] = useState('ALL'); // 'ALL' | 'WRONG' | 'CORRECT' | 'DOUBTFUL'
  const [currentIndex, setCurrentIndex] = useState(0);

  const { breakdown = [], userAnswers = {}, doubtfulQuestions = {} } = result;

  const filteredQuestions = questions.filter(q => {
    const item = breakdown.find(b => b.questionId === q.id);
    if (!item) return true;
    if (filterMode === 'WRONG') return !item.isCorrect;
    if (filterMode === 'CORRECT') return item.isCorrect;
    if (filterMode === 'DOUBTFUL') return !!doubtfulQuestions[q.id];
    return true;
  });

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSummary}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Review Pembahasan: {result.subjectName}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Skor Akhir: {result.score}/100 • {result.correctCount} Benar, {result.wrongCount} Salah
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => { setFilterMode('ALL'); setCurrentIndex(0); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterMode === 'ALL'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            Semua ({questions.length})
          </button>
          <button
            onClick={() => { setFilterMode('WRONG'); setCurrentIndex(0); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterMode === 'WRONG'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 hover:bg-slate-200'
            }`}
          >
            Salah ({result.wrongCount})
          </button>
          <button
            onClick={() => { setFilterMode('CORRECT'); setCurrentIndex(0); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterMode === 'CORRECT'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 hover:bg-slate-200'
            }`}
          >
            Benar ({result.correctCount})
          </button>
        </div>
      </div>

      {/* Main Review Card */}
      {filteredQuestions.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
          <h3 className="font-bold text-slate-800 dark:text-slate-100">
            Tidak ada soal dalam kategori ini
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Hebat, tidak ada kesalahan dalam filter ini!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <QuestionCard
            question={currentQ}
            number={currentIndex + 1}
            total={filteredQuestions.length}
            selectedAnswer={userAnswers[currentQ.id]}
            onSelectAnswer={() => {}}
            mode="review"
            isBookmarked={bookmarks.some(b => b.id === currentQ.id)}
            onToggleBookmark={onToggleBookmark}
            showExplanationDirectly={true}
          />

          {/* Review Navigator */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            {/* Quick buttons */}
            <div className="flex items-center gap-1 overflow-x-auto max-w-xs sm:max-w-md pb-1 scrollbar-none">
              {filteredQuestions.map((q, idx) => {
                const item = breakdown.find(b => b.questionId === q.id);
                const isCurrent = idx === currentIndex;
                const isCorrect = item && item.isCorrect;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-7 h-7 shrink-0 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                      isCorrect 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    } ${isCurrent ? 'ring-2 ring-indigo-500 scale-110' : ''}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <button
              disabled={currentIndex === filteredQuestions.length - 1}
              onClick={() => setCurrentIndex(prev => Math.min(filteredQuestions.length - 1, prev + 1))}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 disabled:opacity-40 transition-all cursor-pointer"
            >
              <span>Selanjutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

