import React from 'react';
import { Bookmark, Trash2, BookOpen, ArrowRight } from 'lucide-react';
import QuestionCard from './QuestionCard';

export default function BookmarksView({
  bookmarks,
  onToggleBookmark,
  onStartPracticeWithSubject
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Bookmark className="w-4 h-4 fill-white" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Soal Tersimpan (Bank Bookmark)
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Daftar soal-soal menantang yang Anda tandai untuk dipelajari kembali sebelum hari ujian.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 self-start sm:self-auto">
          {bookmarks.length} Soal Disimpan
        </span>
      </div>

      {bookmarks.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
          <Bookmark className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">
            Belum Ada Soal yang Disimpan
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Klik ikon penanda (bookmark) pada soal saat berlatih atau simulasi untuk menyimpannya di sini.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
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

