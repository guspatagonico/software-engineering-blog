import { useState } from 'react';

interface Section {
  id: string;
  icon: string;
  label: string;
}

interface SectionNavProps {
  sections: Section[];
}

export default function SectionNav({ sections }: SectionNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');

  const handleClick = (id: string) => {
    setActiveId(id);

    // Hide all panels, show target
    document.querySelectorAll('.panel').forEach((p) => p.classList.remove('active'));
    const target = document.getElementById(`panel-${id}`);
    if (target) target.classList.add('active');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.label}>Secciones</div>
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => handleClick(section.id)}
          style={{
            ...styles.button,
            ...(activeId === section.id ? styles.active : {}),
          }}
        >
          <span style={styles.icon}>{section.icon}</span>
          {section.label}
        </button>
      ))}
    </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    width: 204,
    flexShrink: 0,
    borderRight: '1px solid var(--border)',
    padding: '20px 0',
    background: 'var(--surface)',
  },
  label: {
    fontSize: 9,
    fontWeight: 600,
    letterSpacing: '2.5px',
    color: 'var(--text-dim)',
    padding: '0 20px 10px',
    textTransform: 'uppercase' as const,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    padding: '10px 20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font)',
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--text-dim)',
    textAlign: 'left' as const,
    transition: 'all 0.15s',
    borderLeft: '2px solid transparent',
  },
  active: {
    color: 'var(--teal)',
    borderLeftColor: 'var(--teal)',
    background: 'rgba(0,212,170,0.06)',
  },
  icon: {
    width: 18,
    textAlign: 'center' as const,
    fontSize: 12,
    flexShrink: 0,
  },
};
