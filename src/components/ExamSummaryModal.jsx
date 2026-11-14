import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  BookOpen,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export default function ExamSummaryModal({
  result,
  onReviewExam,
  onRetryFailed,
  onBackToDashboard
}) {
  const {
    subjectName,
    score,
    correctCount,
    wrongCount,
    unansweredCount,
    totalQuestions,
    timeSpentSeconds,
    breakdown = []
  } = result;

  // Trigger confetti on high scores
  useEffect(() => {
    if (score >= 75) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // silent fail
      }
    }
  }, [score]);

  // Analyze topic breakdown
  const topicStats = {};
  breakdown.forEach((item) => {
    const topic = item.topic || 'Umum';
    if (!topicStats[topic]) {
      topicStats[topic] = { total: 0, correct: 0 };
    }
    topicStats[topic].total++;
    if (item.isCorrect) topicStats[topic].correct++;
  });

  const weakTopics = Object.keys(topicStats)
    .filter(t => (topicStats[t].correct / topicStats[t].total) < 0.6)
    .sort((a, b) => (topicStats[a].correct / topicStats[a].total) - (topicStats[b].correct / topicStats[b].total));

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m} menit ${s} detik`;
  };

  let gradeBadge = { label: 'Perlu Pendalaman (Remidial)', color: 'text-rose-700 bg-rose-50 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800' };
  if (score >= 85) {
    gradeBadge = { label: 'Sangat Memuaskan (A)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800' };
  } else if (score >= 75) {
    gradeBadge = { label: 'Kompeten / Lulus (B)', color: 'text-zinc-800 bg-zinc-100 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700' };
  } else if (score >= 60) {
    gradeBadge = { label: 'Cukup Kompeten (C)', color: 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800' };
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 animate-in fade-in duration-200">
      {/* Top Banner Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/90 dark:border-zinc-800 p-6 sm:p-8 shadow-xs text-center space-y-4">
        {/* Trophy icon */}
        <div className="w-14 h-14 mx-auto rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center shadow-xs">
          <Trophy className="w-7 h-7" />
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Hasil Simulasi Asesmen ASAS
          </h1>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Mata Pelajaran: <strong className="text-zinc-800 dark:text-zinc-200">{subjectName}</strong>
          </p>
        </div>

        {/* Score Circle */}
        <div className="pt-2 flex flex-col items-center justify-center">
          <div className="text-5xl sm:text-6xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight font-mono tabular-nums">
            {score}
            <span className="text-xl font-normal text-zinc-400 dark:text-zinc-500">/100</span>
          </div>
          <span className={`mt-3 px-3 py-1 rounded-full text-xs font-semibold border ${gradeBadge.color}`}>
            {gradeBadge.label}
          </span>
        </div>

        {/* Key Metrics Grid */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left tabular-nums">
          <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/60">
            <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Benar</span>
            </div>
            <span className="mt-1.5 block text-2xl font-extrabold text-emerald-900 dark:text-emerald-200 font-mono">
              {correctCount}
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400">
              dari {totalQuestions} Soal
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/60">
            <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 text-xs font-bold">
              <XCircle className="w-3.5 h-3.5" />
              <span>Salah</span>
            </div>
            <span className="mt-1.5 block text-2xl font-extrabold text-rose-900 dark:text-rose-200 font-mono">
              {wrongCount}
            </span>
            <span className="text-[11px] text-rose-600 dark:text-rose-400">
              jawaban keliru
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 text-xs font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>Dilewati</span>
            </div>
            <span className="mt-1.5 block text-2xl font-extrabold text-zinc-800 dark:text-zinc-200 font-mono">
              {unansweredCount}
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
              tidak dijawab
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 text-xs font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>Waktu Tempuh</span>
            </div>
            <span className="mt-1.5 block text-sm font-extrabold text-zinc-900 dark:text-zinc-100 leading-snug">
              {formatTime(timeSpentSeconds)}
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
              durasi pengerjaan
            </span>
          </div>
        </div>
      </div>

      {/* Weakness & Diagnostic Insights */}
      {weakTopics.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/90 dark:border-zinc-800 p-5 space-y-3">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs">
            <AlertTriangle className="w-4 h-4" />
            <span>Materi yang Perlu Ditingkatkan (Prioritas Belajar Mandiri):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {weakTopics.map((topic, idx) => {
              const stat = topicStats[topic];
              const pct = Math.round((stat.correct / stat.total) * 100);
              return (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-between"
                >
                  <div>
                    <span className="block font-bold text-xs text-zinc-900 dark:text-zinc-100">
                      {topic}
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 tabular-nums">
                      Penguasaan: {stat.correct}/{stat.total} Benar ({pct}%)
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300">
                    Perlu Latihan
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
        <button
          type="button"
          onClick={onReviewExam}
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.97]"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Review Pembahasan Seluruh Soal</span>
        </button>

        {wrongCount > 0 && onRetryFailed && (
          <button
            type="button"
            onClick={onRetryFailed}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.97]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ulangi Soal yang Salah ({wrongCount})</span>
          </button>
        )}

        <button
          type="button"
          onClick={onBackToDashboard}
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-[0.97]"
        >
          <span>Kembali ke Beranda</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
