import React from 'react';
import {
  Briefcase,
  Calculator,
  BookOpen,
  Languages,
  ShieldCheck,
  Sparkles,
  Scroll,
  Clock,
  HelpCircle,
  ArrowRight,
  FileText,
  Play
} from 'lucide-react';

const ICONS = {
  Briefcase,
  Calculator,
  BookOpen,
  Languages,
  ShieldCheck,
  Sparkles,
  Scroll
};

export default function SubjectCard({
  subject,
  onStartExam,
  onStartPractice,
  onViewKisiKisi
}) {
  const IconComponent = ICONS[subject.icon] || BookOpen;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      {/* Top Banner */}
      <div>
        <div className={`p-5 bg-gradient-to-br ${subject.bgGradient} text-white relative overflow-hidden`}>
          <div className="flex items-start justify-between relative z-10">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-xs">
              <IconComponent className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-black/20 backdrop-blur-md text-white border border-white/20">
              {subject.grade}
            </span>
          </div>

          <h3 className="mt-3.5 font-bold text-lg leading-snug tracking-tight text-white drop-shadow-xs">
            {subject.name}
          </h3>

          <div className="mt-2.5 flex items-center gap-3.5 text-xs text-white/95 font-medium tabular-nums">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 opacity-80" />
              <span>{subject.durationMinutes} Menit</span>
            </div>
            <span className="opacity-40">•</span>
            <div className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 opacity-80" />
              <span>{subject.totalQuestions} Butir Soal</span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {subject.description}
          </p>

          {/* Topics Tag List */}
          <div className="mt-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Cakupan Kisi-Kisi Utama:
            </span>
            <ul className="mt-2 space-y-1.5">
              {subject.topics.slice(0, 3).map((topic, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 mt-1.5 shrink-0" />
                  <span className="line-clamp-1">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-2 space-y-2">
        <div className="grid grid-cols-2 gap-2 pt-3">
          <button
            onClick={() => onStartExam(subject.id)}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Simulasi CBT</span>
          </button>

          <button
            onClick={() => onStartPractice(subject.id)}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 active:scale-[0.98] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Latihan Bebas</span>
          </button>
        </div>

        <button
          onClick={() => onViewKisiKisi(subject.id)}
          className="w-full flex items-center justify-center gap-1 py-1.5 text-[11px] font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors cursor-pointer group/btn"
        >
          <FileText className="w-3 h-3" />
          <span>Lihat Indikator & Panduan Kisi-Kisi</span>
          <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}

