export type StudentProgress = {
  completedLessons: string[];
  scores: Record<string, number>;
};

const STORAGE_KEY = 'mysql-na-pratica-progress-v1';
const EMPTY_PROGRESS: StudentProgress = { completedLessons: [], scores: {} };

export function loadProgress(): StudentProgress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_PROGRESS;
    const data = JSON.parse(raw) as StudentProgress;
    if (!Array.isArray(data.completedLessons) || typeof data.scores !== 'object' || data.scores === null) {
      return EMPTY_PROGRESS;
    }
    return { completedLessons: data.completedLessons, scores: data.scores };
  } catch {
    return EMPTY_PROGRESS;
  }
}

export function saveProgress(progress: StudentProgress): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // The course remains usable if browser storage is unavailable.
  }
}

export function normalizeAnswer(value: string): string {
  return value.trim().toLocaleLowerCase('pt-BR').replace(/\s+/g, ' ').replace(/;$/, '');
}

export function checkExerciseAnswer(answer: string, expected: string, isCommand: boolean): boolean {
  const normalized = normalizeAnswer(answer);
  const target = normalizeAnswer(expected);
  if (!normalized) return false;
  if (isCommand) return normalized.includes(target);
  return normalized === target;
}
