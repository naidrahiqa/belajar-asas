import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200/90 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToSummary}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer active:scale-[0.97]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Review Pembahasan: {result.subjectName}
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 tabular-nums">
              Skor Akhir: {result.score}/100 • {result.correctCount} Benar, {result.wrongCount} Salah
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => { setFilterMode('ALL'); setCurrentIndex(0); }}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border active:scale-[0.97] ${
              filterMode === 'ALL'
                ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100 shadow-xs'
                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100'
            }`}
          >
            Semua ({questions.length})
          </button>
          <button
            type="button"
            onClick={() => { setFilterMode('WRONG'); setCurrentIndex(0); }}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border active:scale-[0.97] ${
              filterMode === 'WRONG'
                ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                : 'bg-white dark:bg-zinc-900 text-rose-600 dark:text-rose-400 border-zinc-200 dark:border-zinc-800 hover:bg-rose-50 dark:hover:bg-rose-950/40'
            }`}
          >
            Salah ({result.wrongCount})
          </button>
          <button
            type="button"
            onClick={() => { setFilterMode('CORRECT'); setCurrentIndex(0); }}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border active:scale-[0.97] ${
              filterMode === 'CORRECT'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 border-zinc-200 dark:border-zinc-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
            }`}
          >
            Benar ({result.correctCount})
          </button>
        </div>
      </div>

      {/* Main Review Card */}
      {filteredQuestions.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/90 dark:border-zinc-800 space-y-2">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-1" />
          <h3 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm sm:text-base">
            Tidak ada soal dalam kategori ini
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Hebat, tidak ada kesalahan dalam filter yang Anda pilih.
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
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 transition-colors cursor-pointer active:scale-[0.97]"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
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
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-7 h-7 shrink-0 rounded-md text-xs font-semibold flex items-center justify-center transition-all cursor-pointer tabular-nums active:scale-[0.97] ${
                      isCorrect 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    } ${isCurrent ? 'ring-2 ring-zinc-500 scale-105' : ''}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              disabled={currentIndex === filteredQuestions.length - 1}
              onClick={() => setCurrentIndex(prev => Math.min(filteredQuestions.length - 1, prev + 1))}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-black dark:hover:bg-white disabled:opacity-40 transition-all cursor-pointer active:scale-[0.97]"
            >
              <span>Selanjutnya</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
