import { useCallback, useEffect, useRef, useState } from 'react';
import { readStorage, updateStorage } from '@/utils/storage';
import './Checklist.css';

interface ChecklistItem {
  label: string;
}

interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

interface ChecklistProps {
  sections: ChecklistSection[];
  storageKey?: string;
}

export default function Checklist({ sections, storageKey }: ChecklistProps) {
  const allItems = sections.flatMap((s) => s.items);
  const [done, setDone] = useState<Set<number>>(new Set());
  const hasHydrated = useRef(false);

  useEffect(() => {
    if (!storageKey) {
      hasHydrated.current = true;
      return;
    }
    const stored = readStorage().checklists?.[storageKey];
    if (Array.isArray(stored)) {
      const sanitized = stored
        .filter((value) => Number.isInteger(value))
        .filter((value) => value >= 0 && value < allItems.length);
      setDone(new Set(sanitized));
    }
    hasHydrated.current = true;
  }, [storageKey, allItems.length]);

  useEffect(() => {
    if (!storageKey || !hasHydrated.current) return;
    updateStorage((prev) => {
      const nextChecklists = { ...(prev.checklists ?? {}) };
      nextChecklists[storageKey] = Array.from(done).sort((a, b) => a - b);
      return {
        ...prev,
        checklists: nextChecklists,
      };
    });
  }, [done, storageKey]);

  const toggle = useCallback((index: number) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => setDone(new Set()), []);

  const pct = Math.round((done.size / allItems.length) * 100);

  let globalIndex = 0;

  return (
    <div>
      <div className="checklist__progress-text">
        {done.size} / {allItems.length} completados
      </div>
      <div className="checklist__progress-bar">
        <div className="checklist__progress-fill" style={{ width: `${pct}%` }} />
      </div>

      {sections.map((section) => (
        <div key={section.title} className="checklist__section">
          <h3 className="checklist__section-title">{section.title}</h3>
          {section.items.map((item) => {
            const idx = globalIndex++;
            const isDone = done.has(idx);
            return (
              <label key={idx} className="checklist__item">
                <input
                  className="checklist__input"
                  type="checkbox"
                  checked={isDone}
                  onChange={() => toggle(idx)}
                />
                <span className={`checklist__box ${isDone ? 'checklist__box--done' : ''}`}>✓</span>
                <span className={`checklist__label ${isDone ? 'checklist__label--done' : ''}`}>
                  {item.label}
                </span>
              </label>
            );
          })}
        </div>
      ))}

      <button type="button" onClick={reset} className="checklist__reset">
        Resetear checklist
      </button>
    </div>
  );
}
