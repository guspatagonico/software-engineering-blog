import { useState, useCallback } from 'react';
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
}

export default function Checklist({ sections }: ChecklistProps) {
  const allItems = sections.flatMap((s) => s.items);
  const [done, setDone] = useState<Set<number>>(new Set());

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
              <div
                key={idx}
                role="checkbox"
                aria-checked={isDone}
                tabIndex={0}
                onClick={() => toggle(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') toggle(idx);
                }}
                className="checklist__item"
              >
                <div className={`checklist__box ${isDone ? 'checklist__box--done' : ''}`}>✓</div>
                <div className={`checklist__label ${isDone ? 'checklist__label--done' : ''}`}>
                  {item.label}
                </div>
              </div>
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
