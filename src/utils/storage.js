const BOOKMARKS_KEY = 'belajar_asas_bookmarks_v1';
const HISTORY_KEY = 'belajar_asas_history_v1';
const SAVED_SESSION_KEY = 'belajar_asas_active_session_v1';
const THEME_KEY = 'belajar_asas_theme_v1';

export function getBookmarks() {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load bookmarks', e);
    return [];
  }
}

export function saveBookmarks(bookmarks) {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  } catch (e) {
    console.error('Failed to save bookmarks', e);
  }
}

export function toggleBookmark(question) {
  const bookmarks = getBookmarks();
  const exists = bookmarks.some(b => b.id === question.id);
  let updated;
  if (exists) {
    updated = bookmarks.filter(b => b.id !== question.id);
  } else {
    updated = [...bookmarks, { ...question, bookmarkedAt: new Date().toISOString() }];
  }
  saveBookmarks(updated);
  return updated;
}

export function isBookmarked(questionId) {
  const bookmarks = getBookmarks();
  return bookmarks.some(b => b.id === questionId);
}

export function getExamHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load history', e);
    return [];
  }
}

export function saveExamResult(result) {
  try {
    const history = getExamHistory();
    const newEntry = {
      ...result,
      id: 'exam_' + Date.now(),
      date: new Date().toISOString()
    };
    const updated = [newEntry, ...history.slice(0, 49)]; // keep last 50
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return newEntry;
  } catch (e) {
    console.error('Failed to save exam result', e);
  }
}

export function clearExamHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error('Failed to clear history', e);
  }
}

export function getTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || 'light';
  } catch (e) {
    return 'light';
  }
}

export function setTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error('Failed to set theme', e);
  }
}

