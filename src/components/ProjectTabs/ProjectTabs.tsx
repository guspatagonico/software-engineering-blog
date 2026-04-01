import { useState } from 'react';

interface TabData {
  id: string;
  label: string;
  headers: string[];
  rows: string[][];
}

interface ProjectTabsProps {
  tabs: TabData[];
}

export default function ProjectTabs({ tabs }: ProjectTabsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? '');

  const activeTab = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <div>
      <div style={styles.tabBar}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveId(tab.id)}
            style={{
              ...styles.tab,
              ...(activeId === tab.id ? styles.tabActive : {}),
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab && (
        <table>
          <thead>
            <tr>
              {activeTab.headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activeTab.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={j === 0 ? { fontSize: 11, fontWeight: 600, color: 'var(--teal)' } : undefined}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  tabBar: {
    display: 'flex',
    gap: 4,
    marginBottom: 16,
    borderBottom: '1px solid var(--border)',
  },
  tab: {
    padding: '7px 16px',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    color: 'var(--text-dim)',
    borderBottom: '2px solid transparent',
    marginBottom: -1,
    transition: 'all 0.15s',
    fontFamily: 'var(--font)',
  },
  tabActive: {
    color: 'var(--amber)',
    borderBottomColor: 'var(--amber)',
  },
};
