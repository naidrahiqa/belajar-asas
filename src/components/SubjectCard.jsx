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
    <div className="bg-white dark:bg-zinc-900/90 rounded-xl border border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-400/80 dark:hover:border-zinc-700 transition-colors duration-150 flex flex-col justify-between p-5 space-y-4 group">
      {/* Header Info */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-center text-zinc-800 dark:text-zinc-200 shrink-0">
            <IconComponent className="w-4 h-4 stroke-[2.2]" />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium tabular-nums">
            <Clock className="w-3.5 h-3.5 opacity-70" />
            <span>{subject.durationMinutes} Menit</span>
            <span className="opacity-30">•</span>
            <span>{subject.totalQuestions} Soal</span>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            {subject.grade}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {subject.name}
          </h3>
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2 max-w-[65ch]">
          {subject.description}
        </p>

        {/* Topic Chips */}
        <div className="pt-1 flex flex-wrap gap-1.5">
          {subject.topics.slice(0, 3).map((topic, idx) => (
            <span
              key={idx}
              className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50 max-w-full truncate"
            >
              {topic.replace(/\s*\(\d+\s*Soal\)/g, '')}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/70 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onStartExam(subject.id)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 shadow-xs active:scale-[0.97] transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Simulasi CBT</span>
          </button>

          <button
            type="button"
            onClick={() => onStartPractice(subject.id)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/80 active:scale-[0.97] transition-all cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Latihan Bebas</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => onViewKisiKisi(subject.id)}
          className="w-full flex items-center justify-center gap-1.5 py-1 text-[11px] font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer group/btn"
        >
          <FileText className="w-3 h-3 opacity-70" />
          <span>Buka Kisi-Kisi & Indikator</span>
          <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
