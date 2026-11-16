import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SubjectCard from './components/SubjectCard';
import ExamSimulator from './components/ExamSimulator';
import ExamSummaryModal from './components/ExamSummaryModal';
import ExamReview from './components/ExamReview';
import PracticeMode from './components/PracticeMode';
import KisiKisiViewer from './components/KisiKisiViewer';
import BookmarksView from './components/BookmarksView';
import HistoryView from './components/HistoryView';
import PrintModal from './components/PrintModal';

import { SUBJECTS } from './data/subjects';
import { ALL_QUESTIONS, getTotalQuestionCount } from './data/questions';
import {
  getBookmarks,
  toggleBookmark,
  getExamHistory,
  saveExamResult,
  clearExamHistory,
  getTheme,
  setTheme
} from './utils/storage';

import {
  GraduationCap,
  CheckCircle2,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  HelpCircle,
  FileText,
  Search,
  X
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeSubjectId, setActiveSubjectId] = useState('kik');
  const [activeExamResult, setActiveExamResult] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [examHistory, setExamHistory] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [dashboardSearch, setDashboardSearch] = useState('');

  // Initialize theme and storage
  useEffect(() => {
    const savedTheme = getTheme();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(initialDark);
    if (initialDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setBookmarks(getBookmarks());
    setExamHistory(getExamHistory());
  }, []);

  const handleToggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    setTheme(nextDark ? 'dark' : 'light');
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleToggleBookmark = (question) => {
    const updated = toggleBookmark(question);
    setBookmarks(updated);
  };

  const handleStartExam = (subjectId) => {
    setActiveSubjectId(subjectId);
    setCurrentView('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartPractice = (subjectId) => {
    setActiveSubjectId(subjectId);
    setCurrentView('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewKisiKisi = (subjectId) => {
    setActiveSubjectId(subjectId);
    setCurrentView('kisi-kisi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishExam = (resultData) => {
    const saved = saveExamResult(resultData);
    setActiveExamResult(resultData);
    setExamHistory(getExamHistory());
    setCurrentView('summary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus seluruh riwayat latihan dan nilai ujian?')) {
      clearExamHistory();
      setExamHistory([]);
    }
  };

  const currentQuestions = ALL_QUESTIONS[activeSubjectId] || [];
  const currentSubjectMeta = SUBJECTS.find(s => s.id === activeSubjectId) || SUBJECTS[0];

  const filteredSubjects = SUBJECTS.filter((s) => {
    if (!dashboardSearch.trim()) return true;
    const q = dashboardSearch.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.shortName.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.topics.some(t => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200">
      {/* Navbar (Hidden in CBT exam mode to maximize focus, visible elsewhere) */}
      {currentView !== 'exam' && (
        <Navbar
          currentView={currentView}
          setCurrentView={setCurrentView}
          bookmarkCount={bookmarks.length}
          isDark={isDark}
          toggleTheme={handleToggleTheme}
          onOpenPrint={() => setPrintModalOpen(true)}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {/* VIEW: DASHBOARD */}
        {currentView === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Editorial Hero Header */}
            <div className="space-y-4 pb-6 border-b border-zinc-200/90 dark:border-zinc-800">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                <span className="px-2 py-0.5 rounded bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-[11px]">
                  Kurikulum Merdeka • Kelas X & XII SMK
                </span>
                <span className="opacity-40">•</span>
                <span>Asesmen Sumatif Akhir Semester (ASAS) Gasal</span>
                <span className="opacity-40">•</span>
                <span>Kisi-Kisi Resmi SMKN 3 Jepara</span>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div className="max-w-3xl space-y-2">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
                    Simulasi & Bank Soal Terstandar
                  </h1>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                    Sistem latihan Computer-Based Test (CBT) dan evaluasi mandiri. {getTotalQuestionCount()} butir soal terverifikasi mencakup format Pilihan Ganda (A–E), PG Kompleks, dan Pernyataan Benar/Salah dengan pembahasan komprehensif.
                  </p>
                </div>

                {/* Institutional Metrics Strip */}
                <div className="flex items-center gap-4 text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 px-4 py-2.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 shrink-0 tabular-nums shadow-xs">
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{getTotalQuestionCount()}</span> Soal
                  </div>
                  <span className="opacity-30">|</span>
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{SUBJECTS.length}</span> Mapel
                  </div>
                  <span className="opacity-30">|</span>
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">90</span> Menit/Sesi
                  </div>
                  <span className="opacity-30">|</span>
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">A–E</span> CBT
                  </div>
                </div>
              </div>
            </div>

            {/* Filter & Subject Selection */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                  <input
                    type="text"
                    value={dashboardSearch}
                    onChange={(e) => setDashboardSearch(e.target.value)}
                    placeholder="Cari mata pelajaran atau topik (contoh: BEP, Permutasi, Aksara)..."
                    className="w-full pl-9 pr-8 py-2 rounded-lg text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none transition-colors"
                  />
                  {dashboardSearch && (
                    <button
                      type="button"
                      onClick={() => setDashboardSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentView('kisi-kisi')}
                  className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors self-start sm:self-auto cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 opacity-70" />
                  <span>Lihat Seluruh Kisi-Kisi Resmi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Cards Grid */}
              {filteredSubjects.length === 0 ? (
                <div className="p-12 text-center bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    Tidak ditemukan mata pelajaran dengan kata kunci "{dashboardSearch}"
                  </p>
                  <button
                    type="button"
                    onClick={() => setDashboardSearch('')}
                    className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                  >
                    Reset pencarian
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredSubjects.map((subject) => (
                    <SubjectCard
                      key={subject.id}
                      subject={subject}
                      onStartExam={handleStartExam}
                      onStartPractice={handleStartPractice}
                      onViewKisiKisi={handleViewKisiKisi}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW: CBT EXAM SIMULATION */}
        {currentView === 'exam' && (
          <ExamSimulator
            subject={currentSubjectMeta}
            questions={currentQuestions}
            onFinishExam={handleFinishExam}
            onExitExam={() => {
              if (window.confirm('Apakah Anda yakin ingin keluar dari simulasi ujian? Jawaban Anda saat ini tidak akan disimpan.')) {
                setCurrentView('dashboard');
              }
            }}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {/* VIEW: EXAM SUMMARY */}
        {currentView === 'summary' && activeExamResult && (
          <ExamSummaryModal
            result={activeExamResult}
            onReviewExam={() => setCurrentView('review')}
            onRetryFailed={() => {
              setCurrentView('practice');
            }}
            onBackToDashboard={() => setCurrentView('dashboard')}
          />
        )}

        {/* VIEW: EXAM REVIEW */}
        {currentView === 'review' && activeExamResult && (
          <ExamReview
            result={activeExamResult}
            questions={currentQuestions}
            onBackToSummary={() => setCurrentView('summary')}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {/* VIEW: PRACTICE DRILLING MODE */}
        {currentView === 'practice' && (
          <PracticeMode
            selectedSubjectId={activeSubjectId}
            onSelectSubject={setActiveSubjectId}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {/* VIEW: KISI-KISI BLUEPRINT VIEWER */}
        {currentView === 'kisi-kisi' && (
          <KisiKisiViewer
            defaultSubjectId={activeSubjectId}
            onStartPracticeWithSubject={handleStartPractice}
          />
        )}

        {/* VIEW: BOOKMARKS */}
        {currentView === 'bookmarks' && (
          <BookmarksView
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onStartPracticeWithSubject={handleStartPractice}
          />
        )}

        {/* VIEW: HISTORY & ANALYTICS */}
        {currentView === 'history' && (
          <HistoryView
            history={examHistory}
            onClearHistory={handleClearHistory}
            onReviewPastExam={(pastResult) => {
              setActiveSubjectId(pastResult.subjectId);
              setActiveExamResult(pastResult);
              setCurrentView('review');
            }}
          />
        )}
      </main>

      {/* Footer */}
      {currentView !== 'exam' && (
        <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>
                ASAS Hub SMK • Berbasis Kisi-Kisi Asesmen Sumatif Akhir Semester Gasal
              </span>
            </div>
            <div>
              Dirancang untuk Siswa SMK Menghadapi Ujian ASAS dengan Kualitas Terbaik
            </div>
          </div>
        </footer>
      )}

      {/* Print Modal */}
      <PrintModal
        isOpen={printModalOpen}
        onClose={() => setPrintModalOpen(false)}
      />
    </div>
  );
}

