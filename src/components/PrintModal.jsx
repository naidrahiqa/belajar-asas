import React, { useState } from 'react';
import { Printer, X, Check, FileText } from 'lucide-react';
import { SUBJECTS } from '../data/subjects';
import { ALL_QUESTIONS } from '../data/questions';

export default function PrintModal({ isOpen, onClose }) {
  const [selectedSubject, setSelectedSubject] = useState('kik');
  const [includeAnswers, setIncludeAnswers] = useState(true);

  if (!isOpen) return null;

  const subject = SUBJECTS.find(s => s.id === selectedSubject) || SUBJECTS[0];
  const questions = ALL_QUESTIONS[selectedSubject] || [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Cetak Lembar Soal (Mode Print Offline)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Cetak naskah soal lengkap untuk belajar mandiri tanpa layar
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subject selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            Pilih Mata Pelajaran:
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
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
          <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeAnswers}
              onChange={(e) => setIncludeAnswers(e.target.checked)}
              className="rounded-sm text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            <span>Sertakan Lembar Kunci Jawaban & Pembahasan Lengkap di Halaman Terakhir</span>
          </label>
        </div>

        {/* Print instructions */}
        <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/60 text-xs text-indigo-900 dark:text-indigo-200">
          <p>
            <strong>Tips Cetak:</strong> Setelah menekan tombol "Buka Dialog Cetak", jendela browser print akan terbuka. Anda dapat memilih "Save as PDF" untuk mengunduh naskah soal ke ponsel/laptop atau langsung mencetak ke printer.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={() => {
              onClose();
              setTimeout(() => {
                window.print();
              }, 300);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Buka Dialog Cetak / PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}

