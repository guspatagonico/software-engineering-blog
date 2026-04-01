import { useState, useCallback } from 'react';

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
      <div style={styles.progressText}>
        {done.size} / {allItems.length} completados
      </div>
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${pct}%` }} />
      </div>

      {sections.map((section) => (
        <div key={section.title} style={styles.section}>
          <h3 style={styles.sectionTitle}>{section.title}</h3>
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
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle(idx); }}
                style={{
                  ...styles.item,
                  ...(isDone ? styles.itemDone : {}),
                }}
              >
                <div
                  style={{
                    ...styles.box,
                    ...(isDone ? styles.boxDone : {}),
                  }}
                >
                  ✓
                </div>
                <div
                  style={{
                    ...styles.label,
                    ...(isDone ? styles.labelDone : {}),
                  }}
                >
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <button type="button" onClick={reset} style={styles.resetButton}>
        Resetear checklist
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  progressText: {
    fontSize: 11,
    fontWeight: 500,
    color: 'var(--text-dim)',
    marginBottom: 6,
  },
  progressBar: {
    height: 2,
    background: 'var(--border)',
    borderRadius: 2,
    marginBottom: 24,
  },
  progressFill: {
    height: '100%',
    background: 'var(--teal)',
    borderRadius: 2,
    transition: 'width 0.3s',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: 'var(--teal)',
    margin: '24px 0 12px',
    letterSpacing: '2.5px',
    textTransform: 'uppercase' as const,
  },
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: '9px 0',
    borderBottom: '1px solid rgba(30,45,69,0.5)',
    cursor: 'pointer',
  },
  itemDone: {},
  box: {
    width: 17,
    height: 17,
    border: '1.5px solid var(--border)',
    borderRadius: 2,
    flexShrink: 0,
    marginTop: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s',
    fontSize: 11,
  },
  boxDone: {
    borderColor: 'var(--teal)',
    background: 'rgba(0,212,170,0.15)',
    color: 'var(--teal)',
  },
  label: {
    fontSize: 13,
  },
  labelDone: {
    textDecoration: 'line-through',
    color: 'var(--text-dim)',
  },
  resetButton: {
    marginTop: 8,
    padding: '8px 18px',
    background: 'transparent',
    border: '1px solid var(--border)',
    color: 'var(--text-dim)',
    fontFamily: 'var(--font)',
    fontSize: 11,
    fontWeight: 600,
    cursor: 'pointer',
    borderRadius: 3,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
};
