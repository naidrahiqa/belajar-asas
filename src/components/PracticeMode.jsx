import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  BookOpen,
  Eye,
  RotateCcw
} from 'lucide-react';
import QuestionCard from './QuestionCard';
import { SUBJECTS } from '../data/subjects';
import { ALL_QUESTIONS } from '../data/questions';

export default function PracticeMode({
  selectedSubjectId = 'kik',
  onSelectSubject,
  bookmarks,
  onToggleBookmark
}) {
  const [activeSubject, setActiveSubject] = useState(selectedSubjectId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('ALL');
  const [alwaysShowExplanation, setAlwaysShowExplanation] = useState(false);

  const subjectMeta = SUBJECTS.find(s => s.id === activeSubject) || SUBJECTS[0];
  const allSubjectQuestions = ALL_QUESTIONS[activeSubject] || [];

  // Extract unique topics
  const topics = ['ALL', ...new Set(allSubjectQuestions.map(q => q.topic).filter(Boolean))];

  // Filter questions
  const filteredQuestions = allSubjectQuestions.filter(q => {
    const matchesTopic = selectedTopic === 'ALL' || q.topic === selectedTopic;
    const matchesSearch = !searchQuery ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.indicator && q.indicator.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTopic && matchesSearch;
  });

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  const handleSubjectChange = (id) => {
    setActiveSubject(id);
    setCurrentIndex(0);
    setUserAnswers({});
    setSelectedTopic('ALL');
    setSearchQuery('');
    if (onSelectSubject) onSelectSubject(id);
  };

  const handleAnswer = (optionIdx) => {
    if (!currentQ) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIdx
    }));
  };

  const resetProgress = () => {
    setUserAnswers({});
    setCurrentIndex(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 fill-white" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Mode Latihan Bebas & Pembahasan Instan
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Pilih mata pelajaran, kerjakan soal dengan umpan balik langsung, dan telaah pembahasan komprehensif tanpa batasan waktu.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAlwaysShowExplanation(!alwaysShowExplanation)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${alwaysShowExplanation
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950 dark:border-indigo-800 dark:text-indigo-300'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
          >
            <Eye className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{alwaysShowExplanation ? 'Kunci & Bahasan Terbuka' : 'Mode Intip Kunci'}</span>
          </button>

          <button
            onClick={resetProgress}
            title="Reset Jawaban Latihan"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subject Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {SUBJECTS.map((s) => {
          const isActive = s.id === activeSubject;
          return (
            <button
              key={s.id}
              onClick={() => handleSubjectChange(s.id)}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${isActive
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
                }`}
            >
              {s.shortName}
            </button>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari kata kunci soal, materi, atau indikator..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Topic filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedTopic}
            onChange={(e) => {
              setSelectedTopic(e.target.value);
              setCurrentIndex(0);
            }}
            className="px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">Semua Topik ({allSubjectQuestions.length} Soal)</option>
            {topics.filter(t => t !== 'ALL').map((t, idx) => (
              <option key={idx} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Question Display */}
      {filteredQuestions.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">
            Tidak Ada Soal yang Cocok
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian atau pilih topik "Semua Topik" untuk melihat bank soal lengkap.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <QuestionCard
            question={currentQ}
            number={currentIndex + 1}
            total={filteredQuestions.length}
            selectedAnswer={userAnswers[currentQ.id]}
            onSelectAnswer={handleAnswer}
            mode="practice"
            isBookmarked={bookmarks.some(b => b.id === currentQ.id)}
            onToggleBookmark={onToggleBookmark}
            showExplanationDirectly={alwaysShowExplanation}
          />

          {/* Navigation and Quick Numbers */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              <button
                disabled={currentIndex === filteredQuestions.length - 1}
                onClick={() => setCurrentIndex(prev => Math.min(filteredQuestions.length - 1, prev + 1))}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <span>Selanjutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Question Number Scroller */}
            <div className="flex items-center gap-1 overflow-x-auto max-w-full sm:max-w-md pb-1 scrollbar-none">
              {filteredQuestions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = userAnswers[q.id] !== undefined;
                const isCorrect = isAnswered && userAnswers[q.id] === q.correctAnswer;

                let btnClass = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400';
                if (isAnswered) {
                  btnClass = isCorrect
                    ? 'bg-emerald-500 text-white font-bold'
                    : 'bg-rose-500 text-white font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-7 h-7 shrink-0 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${btnClass} ${isCurrent ? 'ring-2 ring-indigo-500 ring-offset-1 scale-110' : 'hover:opacity-80'
                      }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

