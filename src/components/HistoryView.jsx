import React from 'react';
import {
  History,
  Trash2,
  Calendar,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function HistoryView({
  history,
  onClearHistory,
  onReviewPastExam
}) {
  const totalExams = history.length;
  const avgScore = totalExams > 0
    ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / totalExams)
    : 0;

  const formatDate = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return isoString;
    }
  };

  const formatSeconds = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200/90 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center shadow-xs">
              <History className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Riwayat Simulasi Ujian & Statistik
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Catatan progres dan rekam jejak nilai latihan mandiri Anda.
          </p>
        </div>

        {totalExams > 0 && (
          <button
            type="button"
            onClick={onClearHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 transition-colors cursor-pointer self-start sm:self-auto active:scale-[0.97]"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus Semua Riwayat</span>
          </button>
        )}
      </div>

      {/* Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            Total Sesi Simulasi CBT
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 font-mono tabular-nums">
              {totalExams}
            </span>
            <span className="text-xs text-zinc-500">kali ujian</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            Rata-Rata Nilai Keseluruhan
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-3xl font-extrabold font-mono tabular-nums ${
              avgScore >= 75 ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-900 dark:text-zinc-100'
            }`}>
              {avgScore}
            </span>
            <span className="text-xs text-zinc-500">/ 100</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            Status Kesiapan ASAS
          </span>
          <div className="mt-2">
            <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold ${
              avgScore >= 80
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                : avgScore >= 65
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
            }`}>
              {avgScore >= 80 ? 'Sangat Siap' : avgScore >= 65 ? 'Cukup Siap (Tingkatkan Latihan)' : 'Perlu Drilling Intensif'}
            </span>
          </div>
        </div>
      </div>

      {/* History List */}
      {totalExams === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/90 dark:border-zinc-800 space-y-3">
          <History className="w-10 h-10 text-zinc-300 dark:text-zinc-700 mx-auto" />
          <h3 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm sm:text-base">
            Belum Ada Riwayat Ujian
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
            Mulai simulasi ujian CBT pada salah satu mata pelajaran di beranda untuk merekam perkembangan nilai Anda.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
                    {item.subjectName}
                  </h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 tabular-nums">
                    {item.totalQuestions} Soal
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 tabular-nums">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 opacity-70" />
                    {formatDate(item.date)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 opacity-70" />
                    {formatSeconds(item.timeSpentSeconds || 0)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-100 dark:border-zinc-800">
                <div className="text-left sm:text-right">
                  <div className="text-2xl font-black font-mono text-zinc-900 dark:text-zinc-100 tabular-nums">
                    {item.score}
                    <span className="text-xs text-zinc-400 font-normal">/100</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-500 tabular-nums">
                    <span className="text-emerald-600 dark:text-emerald-400">{item.correctCount} Benar</span>
                    <span>•</span>
                    <span className="text-rose-600 dark:text-rose-400">{item.wrongCount} Salah</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onReviewPastExam(item)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-black dark:hover:bg-white transition-colors flex items-center gap-1 cursor-pointer active:scale-[0.97]"
                >
                  <span>Review</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
