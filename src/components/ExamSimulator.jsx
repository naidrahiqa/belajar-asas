import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Grid,
  Send,
  X,
  Play,
  Pause,
  ArrowLeft,
  Keyboard,
  Info
} from 'lucide-react';
import QuestionCard from './QuestionCard';

export default function ExamSimulator({
  subject,
  questions,
  onFinishExam,
  onExitExam,
  bookmarks,
  onToggleBookmark
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [doubtfulQuestions, setDoubtfulQuestions] = useState({});
  const [eliminatedOptions, setEliminatedOptions] = useState({});
  const [timeLeft, setTimeLeft] = useState(subject.durationMinutes * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  const [fontSize, setFontSize] = useState('normal'); // 'normal' | 'medium' | 'large'

  const timerRef = useRef(null);

  // Timer effect
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isPaused]);

  const handleAutoSubmit = () => {
    finishAndCalculate(true);
  };

  const finishAndCalculate = (isAuto = false) => {
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    const breakdown = questions.map((q) => {
      const chosen = userAnswers[q.id];
      const answered = chosen !== undefined && chosen !== null;
      const correct = answered && chosen === q.correctAnswer;

      if (!answered) unansweredCount++;
      else if (correct) correctCount++;
      else wrongCount++;

      return {
        questionId: q.id,
        chosenAnswer: chosen,
        correctAnswer: q.correctAnswer,
        isCorrect: correct,
        isAnswered: answered,
        topic: q.topic
      };
    });

    const score = Math.round((correctCount / questions.length) * 100);
    const timeSpent = subject.durationMinutes * 60 - timeLeft;

    onFinishExam({
      subjectId: subject.id,
      subjectName: subject.name,
      totalQuestions: questions.length,
      correctCount,
      wrongCount,
      unansweredCount,
      score,
      timeSpentSeconds: timeSpent,
      isAutoSubmitted: isAuto,
      breakdown,
      userAnswers,
      doubtfulQuestions
    });
  };

  const handleSelectAnswer = (optionIdx) => {
    const currentQ = questions[currentIndex];
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIdx
    }));
  };

  const handleToggleDoubtful = () => {
    const currentQ = questions[currentIndex];
    setDoubtfulQuestions((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const handleToggleEliminateOption = (optionIdx) => {
    const currentQ = questions[currentIndex];
    setEliminatedOptions((prev) => {
      const existing = prev[currentQ.id] || [];
      const updated = existing.includes(optionIdx)
        ? existing.filter(idx => idx !== optionIdx)
        : [...existing, optionIdx];
      return {
        ...prev,
        [currentQ.id]: updated
      };
    });
  };

  // Authentic CBT Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showConfirmModal || showShortcutsModal || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key.toUpperCase();
      if (['A', '1'].includes(key)) {
        e.preventDefault();
        handleSelectAnswer(0);
      } else if (['B', '2'].includes(key)) {
        e.preventDefault();
        handleSelectAnswer(1);
      } else if (['C', '3'].includes(key)) {
        e.preventDefault();
        handleSelectAnswer(2);
      } else if (['D', '4'].includes(key)) {
        e.preventDefault();
        handleSelectAnswer(3);
      } else if (['E', '5'].includes(key)) {
        e.preventDefault();
        handleSelectAnswer(4);
      } else if (e.key === 'ArrowRight' || key === 'N') {
        e.preventDefault();
        setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || key === 'P') {
        e.preventDefault();
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else if (key === 'R' || e.key === ' ') {
        e.preventDefault();
        handleToggleDoubtful();
      } else if (key === '?' || key === 'H') {
        e.preventDefault();
        setShowShortcutsModal(prev => !prev);
      } else if (e.key === 'Escape') {
        setShowDrawer(false);
        setShowShortcutsModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, showConfirmModal, showShortcutsModal, questions.length]);

  // Format MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).filter(k => userAnswers[k] !== undefined && userAnswers[k] !== null).length;
  const doubtfulCount = Object.keys(doubtfulQuestions).filter(k => doubtfulQuestions[k]).length;
  const unansweredCount = questions.length - answeredCount;

  const currentQ = questions[currentIndex];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-20">
      {/* Top Fixed CBT Header */}
      <div className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Back / Exit & Subject */}
          <div className="flex items-center gap-3">
            <button
              onClick={onExitExam}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Keluar dari Ujian"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-1">
                  {subject.shortName}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  CBT ASAS
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Terjawab: {answeredCount}/{questions.length} Soal
              </p>
            </div>
          </div>

          {/* Center / Right: Countdown Timer */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Font Size Scaler */}
            <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded-lg font-bold transition-colors cursor-pointer ${fontSize === 'normal' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'}`}
                title="Ukuran Font Normal"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('medium')}
                className={`px-2 py-1 rounded-lg font-bold transition-colors cursor-pointer ${fontSize === 'medium' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'}`}
                title="Ukuran Font Sedang"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded-lg font-bold transition-colors cursor-pointer ${fontSize === 'large' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'}`}
                title="Ukuran Font Besar"
              >
                A++
              </button>
            </div>

            {/* Keyboard Shortcuts button */}
            <button
              onClick={() => setShowShortcutsModal(true)}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer text-slate-700 dark:text-slate-300"
              title="Petunjuk Tombol Keyboard"
            >
              <Keyboard className="w-3.5 h-3.5" />
              <span>Shortcut</span>
            </button>

            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-sm sm:text-base ${timeLeft < 300
                ? 'bg-rose-50 text-rose-600 border-rose-300 dark:bg-rose-950 dark:border-rose-800 animate-pulse'
                : 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
              }`}>
              <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            {/* Grid Navigation toggle button */}
            <button
              onClick={() => setShowDrawer(!showDrawer)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer text-slate-700 dark:text-slate-200"
            >
              <Grid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden sm:inline">Daftar Soal</span>
            </button>

            {/* Selesai Button */}
            <button
              onClick={() => setShowConfirmModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Selesai</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Question View (Left 3 Columns) */}
          <div className="lg:col-span-3 space-y-4">
            {currentQ && (
              <QuestionCard
                question={currentQ}
                number={currentIndex + 1}
                total={questions.length}
                selectedAnswer={userAnswers[currentQ.id]}
                onSelectAnswer={handleSelectAnswer}
                mode="exam"
                isDoubtful={doubtfulQuestions[currentQ.id]}
                onToggleDoubtful={handleToggleDoubtful}
                isBookmarked={bookmarks.some(b => b.id === currentQ.id)}
                onToggleBookmark={onToggleBookmark}
                fontSize={fontSize}
                eliminatedOptions={eliminatedOptions[currentQ.id] || []}
                onToggleEliminateOption={handleToggleEliminateOption}
              />
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              <button
                onClick={handleToggleDoubtful}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold border transition-colors cursor-pointer ${doubtfulQuestions[currentQ.id]
                    ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-700'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
              >
                <AlertTriangle className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                <span>{doubtfulQuestions[currentQ.id] ? 'Ragu-Ragu Aktif' : 'Ragu-Ragu'}</span>
              </button>

              {currentIndex === questions.length - 1 ? (
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Kumpulkan</span>
                </button>
              ) : (
                <button
                  onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Right Grid Navigation (1 Column) */}
          <div className="hidden lg:block lg:col-span-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs sticky top-24">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
              <span className="flex items-center gap-2">
                <Grid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Nomor Soal
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {answeredCount}/{questions.length}
              </span>
            </h4>

            {/* Grid buttons */}
            <div className="mt-4 grid grid-cols-5 gap-2 max-h-[360px] overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = userAnswers[q.id] !== undefined && userAnswers[q.id] !== null;
                const isDoubtful = doubtfulQuestions[q.id];

                let btnClass = 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600';
                if (isDoubtful) {
                  btnClass = 'bg-amber-400 dark:bg-amber-500 text-amber-950 font-bold border-amber-500';
                } else if (isAnswered) {
                  btnClass = 'bg-indigo-600 text-white font-bold border-indigo-700';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer border ${btnClass} ${isCurrent ? 'ring-2 ring-offset-2 ring-indigo-500 scale-105' : 'hover:opacity-80'
                      }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/80 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <span className="w-3.5 h-3.5 rounded-sm bg-indigo-600" />
                <span>Terjawab ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <span className="w-3.5 h-3.5 rounded-sm bg-amber-400" />
                <span>Ragu-Ragu ({doubtfulCount})</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <span className="w-3.5 h-3.5 rounded-sm bg-slate-200 dark:bg-slate-700" />
                <span>Belum Dijawab ({unansweredCount})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Modal */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md max-h-[85vh] p-5 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Grid className="w-5 h-5 text-indigo-600" />
                Navigasi Nomor Soal
              </span>
              <button
                onClick={() => setShowDrawer(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-4 grid grid-cols-5 sm:grid-cols-6 gap-2.5 overflow-y-auto max-h-[50vh] p-1">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = userAnswers[q.id] !== undefined && userAnswers[q.id] !== null;
                const isDoubtful = doubtfulQuestions[q.id];

                let btnClass = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
                if (isDoubtful) {
                  btnClass = 'bg-amber-400 text-amber-950 font-bold';
                } else if (isAnswered) {
                  btnClass = 'bg-indigo-600 text-white font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowDrawer(false);
                    }}
                    className={`h-10 rounded-xl text-sm font-semibold flex items-center justify-center transition-all ${btnClass} ${isCurrent ? 'ring-2 ring-offset-2 ring-indigo-500 scale-105' : ''
                      }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>Terjawab: {answeredCount}</span>
              <span>Ragu: {doubtfulCount}</span>
              <span>Belum: {unansweredCount}</span>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Finish Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Konfirmasi Selesai Ujian</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Periksa kembali rekapitulasi lembar jawaban Anda
                </p>
              </div>
            </div>

            {/* Status breakdown cards */}
            <div className="grid grid-cols-3 gap-2.5 py-2">
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 text-center">
                <span className="block text-xl font-bold text-indigo-700 dark:text-indigo-300">
                  {answeredCount}
                </span>
                <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                  Terjawab
                </span>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-100 dark:border-amber-900 text-center">
                <span className="block text-xl font-bold text-amber-700 dark:text-amber-300">
                  {doubtfulCount}
                </span>
                <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                  Ragu-Ragu
                </span>
              </div>
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-100 dark:border-rose-900 text-center">
                <span className="block text-xl font-bold text-rose-700 dark:text-rose-300">
                  {unansweredCount}
                </span>
                <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                  Belum Dijawab
                </span>
              </div>
            </div>

            {/* Warning if unanswered */}
            {(unansweredCount > 0 || doubtfulCount > 0) && (
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Masih terdapat <strong>{unansweredCount} soal belum dijawab</strong> dan <strong>{doubtfulCount} soal ditandai ragu-ragu</strong>. Apakah Anda yakin ingin menyelesaikan ujian sekarang?
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                Kembali ke Soal
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  finishAndCalculate(false);
                }}
                className="py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                Ya, Kumpulkan Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help Modal */}
      {showShortcutsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-sm p-5 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                <Keyboard className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Pintasan Tombol Keyboard (CBT)</span>
              </div>
              <button
                onClick={() => setShowShortcutsModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                <span>Memilih Jawaban</span>
                <div className="flex items-center gap-1 font-mono font-bold text-[11px]">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600">A</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600">B</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600">C</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600">D</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600">E</kbd>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                <span>Soal Selanjutnya</span>
                <div className="flex items-center gap-1 font-mono font-bold text-[11px]">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600">→</kbd>
                  <span>atau</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600">N</kbd>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                <span>Soal Sebelumnya</span>
                <div className="flex items-center gap-1 font-mono font-bold text-[11px]">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600">←</kbd>
                  <span>atau</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600">P</kbd>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                <span>Tandai Ragu-Ragu</span>
                <div className="flex items-center gap-1 font-mono font-bold text-[11px]">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600">R</kbd>
                  <span>atau</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600">Spasi</kbd>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                <span>Tutup Dialog / Modal</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-mono font-bold text-[11px]">Esc</kbd>
              </div>
            </div>

            <button
              onClick={() => setShowShortcutsModal(false)}
              className="w-full mt-2 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer"
            >
              Mengerti, Lanjutkan Ujian
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

