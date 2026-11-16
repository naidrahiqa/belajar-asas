import React, { useState } from 'react';
import {
  BookOpen,
  Bookmark,
  History,
  FileText,
  Sun,
  Moon,
  Menu,
  X,
  GraduationCap,
  Sparkles,
  Printer
} from 'lucide-react';

export default function Navbar({
  currentView,
  setCurrentView,
  bookmarkCount,
  isDark,
  toggleTheme,
  onOpenPrint
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Daftar Mapel', icon: BookOpen },
    { id: 'practice', label: 'Latihan Mandiri', icon: Sparkles },
    { id: 'kisi-kisi', label: 'Kisi-Kisi', icon: FileText },
    { id: 'bookmarks', label: 'Tersimpan', icon: Bookmark, badge: bookmarkCount },
    { id: 'history', label: 'Riwayat', icon: History },
  ];

  const handleNav = (id) => {
    setCurrentView(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-zinc-950/90 border-b border-zinc-200/90 dark:border-zinc-800 transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo / Brand mark */}
          <button
            type="button"
            onClick={() => handleNav('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center font-bold text-xs tracking-tight shadow-xs">
              SMK
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 tracking-tight">
                  ASAS Hub
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60">
                  SMK Gasal
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/70'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 opacity-80" />
                  <span>{item.label}</span>
                  {item.badge > 0 && (
                    <span
                      className={`inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold rounded-full tabular-nums ml-0.5 ${
                        isActive
                          ? 'bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white'
                          : 'bg-amber-500 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            {/* Print button */}
            {onOpenPrint && (
              <button
                type="button"
                onClick={onOpenPrint}
                title="Cetak Soal / Lembar Belajar"
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5 text-xs font-medium border border-zinc-200/80 dark:border-zinc-800 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cetak</span>
              </button>
            )}

            {/* Dark mode toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Ganti Mode Tampilan"
              className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-zinc-200/80 dark:border-zinc-800 cursor-pointer"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-zinc-700" />}
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 pt-2 pb-4 space-y-1 shadow-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                    : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-amber-500 text-white tabular-nums">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          {onOpenPrint && (
            <button
              type="button"
              onClick={() => {
                onOpenPrint();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Lembar Soal</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}
