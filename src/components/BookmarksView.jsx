import React from 'react';
import { Bookmark, Sparkles } from 'lucide-react';
import QuestionCard from './QuestionCard';

export default function BookmarksView({
  bookmarks,
  onToggleBookmark,
  onStartPracticeWithSubject
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200/90 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center shadow-xs">
              <Bookmark className="w-4 h-4 fill-current" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Soal Tersimpan (Bank Bookmark)
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Daftar butir soal menantang yang Anda simpan untuk penajaman konsep sebelum hari ujian.
          </p>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/60 dark:border-zinc-700/60 tabular-nums self-start sm:self-auto">
          {bookmarks.length} Soal Disimpan
        </span>
      </div>

      {bookmarks.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/90 dark:border-zinc-800 space-y-3">
          <Bookmark className="w-10 h-10 text-zinc-300 dark:text-zinc-700 mx-auto" />
          <h3 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm sm:text-base">
            Belum Ada Soal yang Disimpan
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
            Klik ikon penanda (bookmark) pada nomor soal saat simulasi atau latihan bebas untuk mengumpulkannya di sini.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {bookmarks.map((q, idx) => (
            <div key={q.id} className="relative">
              <QuestionCard
                question={q}
                number={idx + 1}
                total={bookmarks.length}
                selectedAnswer={q.correctAnswer}
                onSelectAnswer={() => { }}
                mode="practice"
                isBookmarked={true}
                onToggleBookmark={onToggleBookmark}
                showExplanationDirectly={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
