import { useState, useEffect, useCallback } from 'react';
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Activate a section by ID (update URL hash, show panel, update state)
  const activateSection = useCallback(
    (id: string, updateHash: boolean = true) => {
      if (!sections.find((s) => s.id === id)) return;

      setActiveId(id);

      // Hide all panels, show target
      document.querySelectorAll('.panel').forEach((p) => {
        p.classList.remove('active');
      });
      const target = document.getElementById(`panel-${id}`);
      if (target) {
        target.classList.add('active');
        // Scroll to the panel on mobile/tablet with offset
        const isMobile = window.innerWidth < 1024;
        if (isMobile) {
          const scrollContainer = document.querySelector('.post-layout') || window;
          const panelRect = target.getBoundingClientRect();
          const offset = 20; // pixels of breathing room above the panel
          const scrollTop =
            panelRect.top +
            (scrollContainer instanceof Element ? scrollContainer.scrollTop : window.pageYOffset) -
            offset;

          scrollContainer.scrollTo({
            top: scrollTop,
            behavior: 'smooth',
          });
        }
      }

      // Update URL hash
      if (updateHash) {
        window.history.replaceState(null, '', `#${id}`);
      }
    },
    [sections]
  );

  // Handle initial hash and hash changes
  useEffect(() => {
    // Check for initial hash
    const hash = window.location.hash.slice(1); // Remove #
    if (hash && sections.find((s) => s.id === hash)) {
      activateSection(hash, false);
    }

    // Listen for hash changes (back/forward buttons, manual URL edits)
    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1);
      if (newHash && sections.find((s) => s.id === newHash)) {
        activateSection(newHash, false);
      }
    };

    // Listen for custom event from BlogPost inline script
    const handleSectionActivated = (e: CustomEvent<{ sectionId: string }>) => {
      const { sectionId } = e.detail;
      if (sectionId && sections.find((s) => s.id === sectionId)) {
        setActiveId(sectionId);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('section-activated', handleSectionActivated as EventListener);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('section-activated', handleSectionActivated as EventListener);
    };
  }, [sections, activateSection]);

  const handleClick = (id: string) => {
    activateSection(id);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <button
        type="button"
        className="section-nav-toggle"
        onClick={toggleCollapse}
        aria-label={isCollapsed ? 'Expand sections' : 'Collapse sections'}
        aria-expanded={!isCollapsed}
      >
        <span className="section-nav-toggle__label">Secciones</span>
        <span className="section-nav-toggle__icon">▶</span>
      </button>
      <nav className={`section-nav ${isCollapsed ? 'section-nav--collapsed' : ''}`}>
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
    </>
  );
}
