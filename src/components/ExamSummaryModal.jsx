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
  Share2,
  ArrowRight,
  Sparkles
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
          particleCount: 80,
          spread: 70,
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

  let gradeBadge = { label: 'Perlu Pendalaman (Remidial)', color: 'text-rose-600 bg-rose-50 border-rose-200 dark:bg-rose-950 dark:border-rose-800' };
  if (score >= 85) {
    gradeBadge = { label: 'Sangat Memuaskan (A)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800' };
  } else if (score >= 75) {
    gradeBadge = { label: 'Kompeten / Lulus (B)', color: 'text-indigo-700 bg-indigo-50 border-indigo-200 dark:bg-indigo-950 dark:border-indigo-800' };
  } else if (score >= 60) {
    gradeBadge = { label: 'Cukup Kompeten (C)', color: 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800' };
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-10 shadow-lg text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        {/* Trophy icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-xl shadow-amber-500/20 mb-4">
          <Trophy className="w-10 h-10" />
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Hasil Simulasi Asesmen ASAS
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Mata Pelajaran: <strong className="text-slate-700 dark:text-slate-200">{subjectName}</strong>
        </p>

        {/* Score Circle */}
        <div className="mt-6 flex flex-col items-center justify-center">
          <div className="text-6xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tight font-mono">
            {score}
            <span className="text-2xl font-bold text-slate-400 dark:text-slate-500">/100</span>
          </div>
          <span className={`mt-3 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border ${gradeBadge.color}`}>
            {gradeBadge.label}
          </span>
        </div>

        {/* Key Metrics Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Benar</span>
            </div>
            <span className="mt-2 block text-2xl font-extrabold text-emerald-900 dark:text-emerald-200 font-mono">
              {correctCount}
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400">
              dari {totalQuestions} Soal
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 text-xs font-bold">
              <XCircle className="w-4 h-4" />
              <span>Salah</span>
            </div>
            <span className="mt-2 block text-2xl font-extrabold text-rose-900 dark:text-rose-200 font-mono">
              {wrongCount}
            </span>
            <span className="text-[11px] text-rose-600 dark:text-rose-400">
              jawaban keliru
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs font-bold">
              <Clock className="w-4 h-4" />
              <span>Dilewati</span>
            </div>
            <span className="mt-2 block text-2xl font-extrabold text-slate-800 dark:text-slate-200 font-mono">
              {unansweredCount}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              tidak dijawab
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 text-xs font-bold">
              <Clock className="w-4 h-4" />
              <span>Waktu Tempuh</span>
            </div>
            <span className="mt-2 block text-base font-extrabold text-indigo-950 dark:text-indigo-200 leading-snug">
              {formatTime(timeSpentSeconds)}
            </span>
            <span className="text-[11px] text-indigo-600 dark:text-indigo-400">
              durasi pengerjaan
            </span>
          </div>
        </div>
      </div>

      {/* Weakness & Diagnostic Insights */}
      {weakTopics.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Materi yang Perlu Ditingkatkan (Prioritas Belajar Mandiri):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {weakTopics.map((topic, idx) => {
              const stat = topicStats[topic];
              const pct = Math.round((stat.correct / stat.total) * 100);
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 flex items-center justify-between"
                >
                  <div>
                    <span className="block font-bold text-xs text-slate-900 dark:text-slate-100">
                      {topic}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Penguasaan: {stat.correct}/{stat.total} Benar ({pct}%)
                    </span>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-md bg-amber-200/60 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200">
                    Perlu Latihan
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onReviewExam}
          className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>Review Pembahasan Seluruh Soal</span>
        </button>

        {wrongCount > 0 && onRetryFailed && (
          <button
            onClick={onRetryFailed}
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Soal yang Salah ({wrongCount})</span>
          </button>
        )}

        <button
          onClick={onBackToDashboard}
          className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Kembali ke Beranda</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

