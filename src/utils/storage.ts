export const STORAGE_KEY = 'gsalvini-se-blog';

export interface PersistedState {
  theme?: 'light' | 'dark';
  matrixBackgroundVisible?: boolean;
  convergentEnvelopeMode?: 'static' | 'animated';
  checklists?: Record<string, number[]>;
  scrollPositions?: Record<string, Record<string, number>>;
}

export const readStorage = (): PersistedState => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

export const writeStorage = (next: PersistedState) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

export const updateStorage = (updater: (prev: PersistedState) => PersistedState) => {
  const prev = readStorage();
  const next = updater(prev);
  writeStorage(next);
};
