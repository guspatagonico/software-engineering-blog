import { useState } from 'react';
import './SectionNav.css';

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
    <nav className="section-nav">
      <div className="section-nav__label">Secciones</div>
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => handleClick(section.id)}
          className={`section-nav__button ${activeId === section.id ? 'section-nav__button--active' : ''}`}
        >
          <span className="section-nav__icon">{section.icon}</span>
          {section.label}
        </button>
      ))}
    </nav>
  );
}
