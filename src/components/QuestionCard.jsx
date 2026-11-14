import React, { useState } from 'react';
import {
  Bookmark,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Info,
  Check,
  AlertTriangle,
  EyeOff
} from 'lucide-react';

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E'];

export default function QuestionCard({
  question,
  number,
  total,
  selectedAnswer,
  onSelectAnswer,
  mode = 'practice', // 'practice' | 'exam' | 'review'
  isDoubtful = false,
  onToggleDoubtful,
  isBookmarked = false,
  onToggleBookmark,
  showExplanationDirectly = false,
  fontSize = 'normal', // 'normal' | 'medium' | 'large'
  eliminatedOptions = [],
  onToggleEliminateOption
}) {
  const [explanationExpanded, setExplanationExpanded] = useState(mode === 'practice' || mode === 'review' || showExplanationDirectly);

  const isAnswered = selectedAnswer !== undefined && selectedAnswer !== null;
  const isCorrect = isAnswered && selectedAnswer === question.correctAnswer;
  const showFeedback = (mode === 'practice' && isAnswered) || mode === 'review' || showExplanationDirectly;

  const fontClasses = {
    normal: {
      question: 'text-sm sm:text-base',
      option: 'text-sm sm:text-base'
    },
    medium: {
      question: 'text-base sm:text-lg',
      option: 'text-base sm:text-lg'
    },
    large: {
      question: 'text-lg sm:text-xl',
      option: 'text-lg sm:text-xl'
    }
  }[fontSize] || { question: 'text-sm sm:text-base', option: 'text-sm sm:text-base' };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden transition-all">
      {/* Question Header */}
      <div className="px-5 py-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
            {number}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            dari {total} Soal
          </span>
          <div className="h-4 w-px bg-slate-300 dark:bg-slate-600 mx-1 hidden sm:block" />
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            {question.topic}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {question.level && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
              {question.level}
            </span>
          )}

          {/* Doubtful toggle in exam mode */}
          {mode === 'exam' && onToggleDoubtful && (
            <button
              onClick={onToggleDoubtful}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${isDoubtful
                  ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700'
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600'
                }`}
            >
              <AlertTriangle className={`w-3.5 h-3.5 ${isDoubtful ? 'text-amber-600 dark:text-amber-400 fill-amber-500/20' : 'text-slate-400'}`} />
              <span>{isDoubtful ? 'Ragu-Ragu' : 'Tandai Ragu'}</span>
            </button>
          )}

          {/* Bookmark Button */}
          {onToggleBookmark && (
            <button
              onClick={() => onToggleBookmark(question)}
              title={isBookmarked ? 'Hapus dari Soal Tersimpan' : 'Simpan Soal Ini'}
              className={`p-2 rounded-lg transition-colors cursor-pointer border ${isBookmarked
                  ? 'bg-amber-50 text-amber-500 border-amber-200 dark:bg-amber-950/50 dark:border-amber-800'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Indicator info subtitle */}
      {question.indicator && (
        <div className="px-5 py-2 bg-slate-100/60 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
          <span className="line-clamp-1 italic">
            Indikator Kisi-Kisi: {question.indicator}
          </span>
        </div>
      )}

      {/* Question Body / Stimulus */}
      <div className="p-5 sm:p-6">
        <div className={`text-slate-900 dark:text-slate-100 ${fontClasses.question} leading-relaxed whitespace-pre-line font-medium`}>
          {question.question}
        </div>

        {/* Options List */}
        <div className="mt-6 space-y-2.5">
          {question.options.map((option, idx) => {
            const isThisSelected = selectedAnswer === idx;
            const isThisCorrect = question.correctAnswer === idx;
            const isEliminated = eliminatedOptions.includes(idx);

            let optionClasses = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 text-slate-800 dark:text-slate-200';
            let badgeClasses = 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';

            if (mode === 'exam') {
              if (isThisSelected) {
                optionClasses = 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 shadow-xs ring-1 ring-indigo-600';
                badgeClasses = 'bg-indigo-600 text-white';
              }
            } else if (showFeedback) {
              if (isThisCorrect) {
                optionClasses = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500';
                badgeClasses = 'bg-emerald-600 text-white';
              } else if (isThisSelected && !isThisCorrect) {
                optionClasses = 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/50 text-rose-950 dark:text-rose-100 ring-1 ring-rose-500';
                badgeClasses = 'bg-rose-600 text-white';
              } else {
                optionClasses = 'opacity-60 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400';
              }
            }

            if (isEliminated && !isThisSelected && !showFeedback) {
              optionClasses += ' line-through opacity-40 bg-slate-50 dark:bg-slate-900/60 text-slate-400 dark:text-slate-500';
            }

            return (
              <div
                key={idx}
                className={`w-full flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border ${fontClasses.option} font-normal transition-all select-none ${optionClasses}`}
              >
                <label
                  onClick={() => {
                    if (mode !== 'review') {
                      onSelectAnswer(idx);
                    }
                  }}
                  className="flex items-start gap-3 flex-1 cursor-pointer"
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${badgeClasses}`}>
                    {showFeedback && isThisCorrect ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : showFeedback && isThisSelected && !isThisCorrect ? (
                      <XCircle className="w-4 h-4" />
                    ) : (
                      OPTION_LABELS[idx]
                    )}
                  </div>

                  <div className="flex-1 pt-0.5 leading-snug">
                    {option}
                  </div>
                </label>

                {/* Strikethrough / Eliminate toggle button */}
                {mode !== 'review' && onToggleEliminateOption && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleEliminateOption(idx);
                    }}
                    title={isEliminated ? 'Batalkan Coret Pilihan' : 'Coret Pilihan Ini (Eliminasi)'}
                    className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer shrink-0 ${isEliminated
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : 'text-slate-300 hover:text-slate-600 dark:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Practice Mode Feedback Banner */}
        {mode === 'practice' && isAnswered && (
          <div className={`mt-5 p-4 rounded-xl flex items-center justify-between gap-3 text-sm font-semibold transition-all ${isCorrect
              ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800'
              : 'bg-rose-100 text-rose-900 dark:bg-rose-950/80 dark:text-rose-200 border border-rose-300 dark:border-rose-800'
            }`}>
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Hebat! Jawabanmu Tepat Sekali ({OPTION_LABELS[question.correctAnswer]})</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                  <span>Jawaban Kurang Tepat. Kunci yang Benar adalah ({OPTION_LABELS[question.correctAnswer]})</span>
                </>
              )}
            </div>
            <button
              onClick={() => setExplanationExpanded(!explanationExpanded)}
              className="flex items-center gap-1 text-xs font-bold underline hover:opacity-80 cursor-pointer"
            >
              <span>{explanationExpanded ? 'Tutup Penjelasan' : 'Buka Pembahasan'}</span>
              {explanationExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}

        {/* Detailed Explanation Accordion */}
        {showFeedback && explanationExpanded && question.explanation && (
          <div className="mt-5 p-5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700/80 space-y-3.5 text-xs sm:text-sm animate-in fade-in duration-200">
            <div className="flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-400 border-b border-slate-200 dark:border-slate-700 pb-2.5">
              <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Pembahasan Ilmiah & Komprehensif</span>
            </div>

            {/* Summary */}
            {question.explanation.summary && (
              <div>
                <span className="font-bold text-slate-900 dark:text-white">
                  Intisari Kunci:
                </span>
                <p className="mt-0.5 text-slate-700 dark:text-slate-300 font-medium">
                  {question.explanation.summary}
                </p>
              </div>
            )}

            {/* Concept / Formula */}
            {question.explanation.concept && (
              <div className="p-3 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
                <span className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  Konsep Pokok / Teori Syariat / Rumus:
                </span>
                <p className="mt-1 text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                  {question.explanation.concept}
                </p>
              </div>
            )}

            {/* Step by step analysis */}
            {question.explanation.analysis && (
              <div>
                <span className="font-bold text-slate-900 dark:text-white">
                  Langkah Pembahasan & Penalaran:
                </span>
                <p className="mt-1 text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                  {question.explanation.analysis}
                </p>
              </div>
            )}

            {/* Distractor Breakdown */}
            {question.explanation.whyWrong && (
              <div className="p-3 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-amber-950 dark:text-amber-200">
                <span className="font-bold flex items-center gap-1.5 text-amber-900 dark:text-amber-300">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  Mengapa Pilihan Lain Keliru? (Analisis Pengecoh):
                </span>
                <p className="mt-1 text-slate-800 dark:text-slate-200 leading-relaxed">
                  {question.explanation.whyWrong}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

