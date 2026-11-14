import React, { useState } from 'react';
import {
  FileText,
  Search,
  BookOpen,
  Sparkles,
  GraduationCap,
  Info,
  Clock,
  Layers,
  ArrowRight
} from 'lucide-react';
import { KISI_KISI_DETAILS } from '../data/kisiKisiData';
import { SUBJECTS } from '../data/subjects';

export default function KisiKisiViewer({
  defaultSubjectId = 'kik',
  onStartPracticeWithSubject
}) {
  const [activeSubject, setActiveSubject] = useState(defaultSubjectId);
  const [searchQuery, setSearchQuery] = useState('');

  const currentDetails = KISI_KISI_DETAILS[activeSubject] || KISI_KISI_DETAILS['kik'];
  const subjectMeta = SUBJECTS.find(s => s.id === activeSubject) || SUBJECTS[0];

  const filteredIndicators = currentDetails.indicators.filter(item => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.materi.toLowerCase().includes(q) ||
      item.indikator.toLowerCase().includes(q) ||
      item.no.toLowerCase().includes(q) ||
      (item.level && item.level.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <FileText className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Pusat Kisi-Kisi Resmi ASAS Kelas XII
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Cetak biru (blueprint) kurikulum resmi SMK N 3 Jepara / Fase F Gasal 2026/2027.
          </p>
        </div>

        <button
          onClick={() => onStartPracticeWithSubject(activeSubject)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Latihan Soal Sesuai Kisi-Kisi Ini</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Subject Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {SUBJECTS.map((s) => {
          const isActive = s.id === activeSubject;
          return (
            <button
              key={s.id}
              onClick={() => {
                setActiveSubject(s.id);
                setSearchQuery('');
              }}
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

      {/* Overview Info Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              {currentDetails.school}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              {currentDetails.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {currentDetails.grade} • {currentDetails.examInfo}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800">
              {currentDetails.indicators.length} Butir Indikator
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {currentDetails.overview}
        </p>
      </div>

      {/* Search Input for Indicators */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Cari indikator, submateri, nomor butir, atau level kognitif..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 shadow-xs"
        />
      </div>

      {/* Table of Indicators */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold">
                <th className="py-3.5 px-4 w-16 text-center">No</th>
                <th className="py-3.5 px-4 w-48 sm:w-60">Materi Pokok</th>
                <th className="py-3.5 px-4">Indikator Ketercapaian Soal</th>
                <th className="py-3.5 px-4 w-32 text-center">Level / Bentuk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {filteredIndicators.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-750/50 transition-colors"
                >
                  <td className="py-3 px-4 font-bold text-center text-slate-500 dark:text-slate-400 font-mono">
                    {item.no}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100">
                    {item.materi}
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                    {item.indikator}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {item.level || 'Pilihan Ganda'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

