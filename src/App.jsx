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
  FileText
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeSubjectId, setActiveSubjectId] = useState('kik');
  const [activeExamResult, setActiveExamResult] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [examHistory, setExamHistory] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const [printModalOpen, setPrintModalOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            {/* Hero Banner */}
            <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xl border border-indigo-700/30">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-1/3 -mb-20 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-300" />
                  <span>Kurikulum Merdeka • Fase F • SMK Kelas XII Gasal</span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Bank Soal & Simulasi Ujian ASAS Kelas 12 SMK
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  Disusun presisi berbasis kisi-kisi resmi semester gasal. Bebas format murahan (anti <em>AI slop</em>), dilengkapi stimulus kasus industri nyata, hitungan matematis akurat, serta pembahasan ilmiah komprehensif.
                </p>

                {/* Badges / Stats */}
                <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>7 Mata Pelajaran Lengkap</span>
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>{getTotalQuestionCount()} Butir Soal Terkalibrasi</span>
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Mode CBT & Pembahasan Instan</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Subjects Grid Header */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Pilih Mata Pelajaran
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Mulai simulasi berwaktu standar 90 menit atau latihan mandiri dengan pembahasan langsung
                  </p>
                </div>

                <button
                  onClick={() => setCurrentView('kisi-kisi')}
                  className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline self-start sm:self-auto cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Lihat Seluruh Kisi-Kisi Resmi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Cards Grid */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SUBJECTS.map((subject) => (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    onStartExam={handleStartExam}
                    onStartPractice={handleStartPractice}
                    onViewKisiKisi={handleViewKisiKisi}
                  />
                ))}
              </div>
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
                ASAS Hub XII SMK • Berbasis Kisi-Kisi Asesmen Sumatif Akhir Semester Gasal 2026/2027
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

