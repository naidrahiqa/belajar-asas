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
  EyeOff,
  CheckSquare,
  Square
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

  const isComplex = question.type === 'complex';
  const isTrueFalse = question.type === 'true_false';

  const isAnswered = isComplex
    ? Array.isArray(selectedAnswer) && selectedAnswer.length > 0
    : selectedAnswer !== undefined && selectedAnswer !== null;

  const isCorrect = isAnswered && (
    isComplex
      ? Array.isArray(selectedAnswer) &&
        Array.isArray(question.correctAnswer) &&
        selectedAnswer.length === question.correctAnswer.length &&
        selectedAnswer.every(val => question.correctAnswer.includes(val))
      : selectedAnswer === question.correctAnswer
  );

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

  const handleOptionClick = (idx) => {
    if (mode === 'review') return;
    if (isComplex) {
      const current = Array.isArray(selectedAnswer) ? selectedAnswer : [];
      const updated = current.includes(idx)
        ? current.filter(i => i !== idx)
        : [...current, idx].sort((a, b) => a - b);
      onSelectAnswer(updated);
    } else {
      onSelectAnswer(idx);
    }
  };

  const formatCorrectKeys = () => {
    if (isComplex && Array.isArray(question.correctAnswer)) {
      return question.correctAnswer.map(i => OPTION_LABELS[i]).join(', ');
    }
    if (isTrueFalse) {
      return question.correctAnswer === 0 ? 'BENAR' : 'SALAH';
    }
    return OPTION_LABELS[question.correctAnswer];
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/90 dark:border-zinc-800 shadow-xs overflow-hidden transition-all">
      {/* Question Header */}
      <div className="px-5 py-3.5 bg-zinc-50/80 dark:bg-zinc-900/90 border-b border-zinc-200/80 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="w-7 h-7 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold text-xs flex items-center justify-center shadow-xs tabular-nums">
            {number}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium tabular-nums">
            dari {total} Soal
          </span>
          <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700 mx-1 hidden sm:block" />
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border border-zinc-200/60 dark:border-zinc-700/60">
            {question.topic}
          </span>

          {/* Question Type Badge */}
          {isComplex && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800">
              PG Kompleks (Jawaban &gt; 1)
            </span>
          )}
          {isTrueFalse && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800">
              Pernyataan Benar / Salah
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {question.level && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              {question.level}
            </span>
          )}

          {/* Doubtful toggle in exam mode */}
          {mode === 'exam' && onToggleDoubtful && (
            <button
              type="button"
              onClick={onToggleDoubtful}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${isDoubtful
                  ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700'
                  : 'bg-white text-zinc-600 border-zinc-300 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700'
                }`}
            >
              <AlertTriangle className={`w-3.5 h-3.5 ${isDoubtful ? 'text-amber-600 dark:text-amber-400 fill-amber-500/20' : 'text-zinc-400'}`} />
              <span>{isDoubtful ? 'Ragu-Ragu' : 'Tandai Ragu'}</span>
            </button>
          )}

          {/* Bookmark Button */}
          {onToggleBookmark && (
            <button
              type="button"
              onClick={() => onToggleBookmark(question)}
              title={isBookmarked ? 'Hapus dari Soal Tersimpan' : 'Simpan Soal Ini'}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer border ${isBookmarked
                  ? 'bg-amber-50 text-amber-500 border-amber-200 dark:bg-amber-950/50 dark:border-amber-800'
                  : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 border-zinc-200 dark:border-zinc-700'
                }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Indicator info subtitle */}
      {question.indicator && (
        <div className="px-5 py-2 bg-zinc-100/50 dark:bg-zinc-950/40 border-b border-zinc-200/60 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          <span className="line-clamp-1 italic">
            Indikator: {question.indicator}
          </span>
        </div>
      )}

      {/* Question Body / Stimulus */}
      <div className="p-5 sm:p-6">
        <div className={`text-zinc-900 dark:text-zinc-100 ${fontClasses.question} leading-relaxed whitespace-pre-line font-medium max-w-[70ch]`}>
          {question.question}
        </div>

        {/* Hint for Multi-Select Complex Questions */}
        {isComplex && (
          <div className="mt-4 px-3.5 py-2.5 rounded-lg bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/70 dark:border-indigo-900/60 flex items-center justify-between gap-3 text-xs text-indigo-900 dark:text-indigo-200">
            <span className="flex items-center gap-2 font-medium">
              <CheckSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              Pilihan Ganda Kompleks: Anda dapat memilih lebih dari satu jawaban yang benar.
            </span>
            {Array.isArray(selectedAnswer) && selectedAnswer.length > 0 && (
              <span className="font-semibold tabular-nums text-[11px] bg-indigo-100 dark:bg-indigo-900/80 px-2 py-0.5 rounded-md shrink-0">
                {selectedAnswer.length} Dipilih
              </span>
            )}
          </div>
        )}

        {/* Options List */}
        <div className="mt-6 space-y-2.5">
          {question.options.map((option, idx) => {
            const isThisSelected = isComplex
              ? Array.isArray(selectedAnswer) && selectedAnswer.includes(idx)
              : selectedAnswer === idx;

            const isThisCorrect = isComplex
              ? Array.isArray(question.correctAnswer) && question.correctAnswer.includes(idx)
              : question.correctAnswer === idx;

            const isEliminated = eliminatedOptions.includes(idx);

            let optionClasses = 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-800 dark:text-zinc-200';
            let badgeClasses = 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300';

            if (mode === 'exam') {
              if (isThisSelected) {
                optionClasses = 'border-zinc-900 dark:border-zinc-100 bg-zinc-900/5 dark:bg-zinc-100/10 text-zinc-900 dark:text-zinc-100 shadow-xs ring-1 ring-zinc-900 dark:ring-zinc-100';
                badgeClasses = 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900';
              }
            } else if (showFeedback) {
              if (isThisCorrect) {
                optionClasses = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500';
                badgeClasses = 'bg-emerald-600 text-white';
              } else if (isThisSelected && !isThisCorrect) {
                optionClasses = 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/50 text-rose-950 dark:text-rose-100 ring-1 ring-rose-500';
                badgeClasses = 'bg-rose-600 text-white';
              } else {
                optionClasses = 'opacity-50 border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-600 dark:text-zinc-400';
              }
            }

            if (isEliminated && !isThisSelected && !showFeedback) {
              optionClasses += ' line-through opacity-40 bg-zinc-50 dark:bg-zinc-950/60 text-zinc-400 dark:text-zinc-500';
            }

            return (
              <div
                key={idx}
                className={`w-full flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border ${fontClasses.option} font-normal transition-all select-none ${optionClasses}`}
              >
                <label
                  onClick={() => handleOptionClick(idx)}
                  className="flex items-start gap-3 flex-1 cursor-pointer"
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${badgeClasses}`}>
                    {showFeedback && isThisCorrect ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : showFeedback && isThisSelected && !isThisCorrect ? (
                      <XCircle className="w-4 h-4" />
                    ) : isComplex ? (
                      isThisSelected ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        OPTION_LABELS[idx]
                      )
                    ) : isTrueFalse ? (
                      idx === 0 ? 'B' : 'S'
                    ) : (
                      OPTION_LABELS[idx]
                    )}
                  </div>

                  <div className="flex-1 pt-0.5 leading-snug">
                    {option}
                  </div>
                </label>

                {/* Strikethrough / Eliminate toggle button (only for single/review) */}
                {mode !== 'review' && onToggleEliminateOption && !isComplex && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleEliminateOption(idx);
                    }}
                    title={isEliminated ? 'Batalkan Coret Pilihan' : 'Coret Pilihan Ini (Eliminasi)'}
                    className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer shrink-0 ${isEliminated
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : 'text-zinc-300 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700'
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
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Hebat! Jawabanmu Tepat Sekali ({formatCorrectKeys()})</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>Jawaban Kurang Tepat. Kunci yang Benar adalah: <strong>{formatCorrectKeys()}</strong></span>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={() => setExplanationExpanded(!explanationExpanded)}
              className="flex items-center gap-1 text-xs font-bold underline hover:opacity-80 cursor-pointer shrink-0"
            >
              <span>{explanationExpanded ? 'Tutup Penjelasan' : 'Buka Pembahasan'}</span>
              {explanationExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}

        {/* Detailed Explanation Accordion */}
        {showFeedback && explanationExpanded && question.explanation && (
          <div className="mt-5 p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 space-y-3.5 text-xs sm:text-sm animate-in fade-in duration-150">
            <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2.5">
              <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Pembahasan Ilmiah & Penalaran Soal</span>
            </div>

            {/* Summary */}
            {question.explanation.summary && (
              <div>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">
                  Intisari Kunci:
                </span>
                <p className="mt-0.5 text-zinc-700 dark:text-zinc-300 font-medium">
                  {question.explanation.summary}
                </p>
              </div>
            )}

            {/* Concept / Formula */}
            {question.explanation.concept && (
              <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <span className="font-bold text-zinc-900 dark:text-zinc-200 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                  Konsep Pokok / Teori Syariat / Rumus:
                </span>
                <p className="mt-1 text-zinc-800 dark:text-zinc-200 whitespace-pre-line leading-relaxed">
                  {question.explanation.concept}
                </p>
              </div>
            )}

            {/* Step by step analysis */}
            {question.explanation.analysis && (
              <div>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">
                  Langkah Pembahasan & Penalaran:
                </span>
                <p className="mt-1 text-zinc-700 dark:text-zinc-300 whitespace-pre-line leading-relaxed">
                  {question.explanation.analysis}
                </p>
              </div>
            )}

            {/* Distractor Breakdown */}
            {question.explanation.whyWrong && (
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-zinc-800 dark:text-zinc-200">
                <span className="font-bold flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Analisis Pengecoh (Mengapa Opsi Lain Keliru?):
                </span>
                <p className="mt-1 text-zinc-700 dark:text-zinc-300 leading-relaxed">
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
