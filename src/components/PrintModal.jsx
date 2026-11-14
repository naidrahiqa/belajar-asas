import React, { useState } from 'react';
import { Printer, X } from 'lucide-react';
import { SUBJECTS } from '../data/subjects';
import { ALL_QUESTIONS } from '../data/questions';

export default function PrintModal({ isOpen, onClose }) {
  const [selectedSubject, setSelectedSubject] = useState('kik');
  const [includeAnswers, setIncludeAnswers] = useState(true);

  if (!isOpen) return null;

  const subject = SUBJECTS.find(s => s.id === selectedSubject) || SUBJECTS[0];
  const questions = ALL_QUESTIONS[selectedSubject] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-zinc-900 rounded-xl max-w-lg w-full p-5 sm:p-6 border border-zinc-200/90 dark:border-zinc-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
                Cetak Lembar Soal (Mode Offline / PDF)
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Naskah soal lengkap untuk simulasi kertas atau ekspor ke PDF
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Subject selection */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
            Pilih Mata Pelajaran:
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-500"
          >
            {SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.totalQuestions} Soal)
              </option>
            ))}
          </select>
        </div>

        {/* Options */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeAnswers}
              onChange={(e) => setIncludeAnswers(e.target.checked)}
              className="rounded-sm text-zinc-900 focus:ring-zinc-500 w-3.5 h-3.5"
            />
            <span>Sertakan Lembar Kunci Jawaban & Pembahasan di Akhir Dokumen</span>
          </label>
        </div>

        {/* Print instructions */}
        <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <p>
            <strong>Tips:</strong> Pada dialog print browser, pilih tujuan <strong>"Save as PDF"</strong> untuk mengunduh naskah soal langsung ke perangkat Anda.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer active:scale-[0.97]"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              setTimeout(() => {
                window.print();
              }, 250);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 shadow-xs transition-all cursor-pointer active:scale-[0.97]"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Buka Dialog Cetak / PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
