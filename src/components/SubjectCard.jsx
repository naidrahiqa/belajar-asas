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
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      {/* Top Banner */}
      <div>
        <div className={`p-5 bg-gradient-to-r ${subject.bgGradient} text-white relative overflow-hidden`}>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10 blur-sm pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
              <IconComponent className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/20">
              {subject.grade}
            </span>
          </div>

          <h3 className="mt-4 font-bold text-lg leading-snug tracking-tight">
            {subject.name}
          </h3>

          <div className="mt-2 flex items-center gap-4 text-xs text-white/90 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{subject.durationMinutes} Menit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{subject.totalQuestions} Butir Soal</span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {subject.description}
          </p>

          {/* Topics Tag List */}
          <div className="mt-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
              Cakupan Kisi-Kisi Utama:
            </span>
            <ul className="mt-2 space-y-1.5">
              {subject.topics.slice(0, 3).map((topic, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <span className="line-clamp-1">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-700/60 mt-2 space-y-2">
        <div className="grid grid-cols-2 gap-2 pt-3">
          <button
            onClick={() => onStartExam(subject.id)}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Simulasi CBT</span>
          </button>

          <button
            onClick={() => onStartPractice(subject.id)}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-700/70 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-[0.98] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Latihan Bebas</span>
          </button>
        </div>

        <button
          onClick={() => onViewKisiKisi(subject.id)}
          className="w-full flex items-center justify-center gap-1 py-1 text-[11px] font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors cursor-pointer"
        >
          <FileText className="w-3 h-3" />
          <span>Lihat Indikator & Panduan Kisi-Kisi Resmi</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

