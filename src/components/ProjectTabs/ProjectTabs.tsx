import { useState } from 'react';
import './ProjectTabs.css';

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
      <div className="project-tabs__bar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveId(tab.id)}
            className={`project-tabs__tab ${activeId === tab.id ? 'project-tabs__tab--active' : ''}`}
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
                  <td key={j} className={j === 0 ? 'project-tabs__cell-name' : undefined}>
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
