import React, { useState } from 'react';
import {
  FileText,
  Search,
  Sparkles,
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-200/90 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center shadow-xs">
              <FileText className="w-4 h-4" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Pusat Kisi-Kisi Resmi ASAS Kelas XII
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Cetak biru (blueprint) kurikulum resmi SMK N 3 Jepara / Fase F Gasal.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onStartPracticeWithSubject(activeSubject)}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 shadow-xs active:scale-[0.97] transition-all cursor-pointer self-start md:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Latihan Soal Mapel Ini</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Subject Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {SUBJECTS.map((s) => {
          const isActive = s.id === activeSubject;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setActiveSubject(s.id);
                setSearchQuery('');
              }}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border active:scale-[0.97] ${
                isActive
                  ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100 shadow-xs'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {s.shortName}
            </button>
          );
        })}
      </div>

      {/* Overview Info Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/90 dark:border-zinc-800 p-5 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div>
            <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              {currentDetails.school}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
              {currentDetails.title}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {currentDetails.grade} • {currentDetails.examInfo}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold border border-zinc-200/60 dark:border-zinc-700/60 tabular-nums">
              {currentDetails.indicators.length} Butir Indikator
            </span>
          </div>
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[70ch]">
          {currentDetails.overview}
        </p>
      </div>

      {/* Search Input for Indicators */}
      <div className="relative">
        <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Cari indikator, materi pokok, nomor butir, atau level kognitif..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-lg text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 shadow-xs"
        />
      </div>

      {/* Table of Indicators */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/90 dark:border-zinc-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950/60 border-b border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold">
                <th className="py-2.5 px-3.5 w-14 text-center">No</th>
                <th className="py-2.5 px-3.5 w-48 sm:w-56">Materi Pokok</th>
                <th className="py-2.5 px-3.5">Indikator Ketercapaian Soal</th>
                <th className="py-2.5 px-3.5 w-28 text-center">Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filteredIndicators.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-colors"
                >
                  <td className="py-2.5 px-3.5 font-bold text-center text-zinc-400 dark:text-zinc-500 font-mono tabular-nums">
                    {item.no}
                  </td>
                  <td className="py-2.5 px-3.5 font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.materi}
                  </td>
                  <td className="py-2.5 px-3.5 text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-[65ch]">
                    {item.indikator}
                  </td>
                  <td className="py-2.5 px-3.5 text-center">
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60">
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
