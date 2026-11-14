import { KIK_QUESTIONS } from './kikQuestions.js';
import { MATEMATIKA_QUESTIONS } from './matematikaQuestions.js';
import { INDONESIA_QUESTIONS } from './indonesiaQuestions.js';
import { INGGRIS_QUESTIONS } from './inggrisQuestions.js';
import { PANCASILA_QUESTIONS } from './pancasilaQuestions.js';
import { PAI_QUESTIONS } from './paiQuestions.js';
import { JAWA_QUESTIONS } from './jawaQuestions.js';

export const ALL_QUESTIONS = {
  kik: KIK_QUESTIONS,
  matematika: MATEMATIKA_QUESTIONS,
  indonesia: INDONESIA_QUESTIONS,
  inggris: INGGRIS_QUESTIONS,
  pancasila: PANCASILA_QUESTIONS,
  pai: PAI_QUESTIONS,
  jawa: JAWA_QUESTIONS
};

export function getQuestionsBySubject(subjectId) {
  return ALL_QUESTIONS[subjectId] || [];
}

export function getTotalQuestionCount() {
  return Object.values(ALL_QUESTIONS).reduce((acc, qList) => acc + qList.length, 0);
}
