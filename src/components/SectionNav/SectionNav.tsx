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

  const updatePanelHeader = useCallback(
    (id: string) => {
      const section = sections.find((s) => s.id === id);
      if (!section) return;

      const panel = document.getElementById(`panel-${id}`);
      if (!panel) return;

      let header = panel.querySelector('.panel-mobile-header');
      if (!header) {
        header = document.createElement('div');
        header.className = 'panel-mobile-header';
        panel.prepend(header);
      }

      header.innerHTML = `
        <span class="panel-mobile-header__icon">${section.icon}</span>
        <span class="panel-mobile-header__label">${section.label}</span>
      `;
    },
    [sections]
  );

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
        updatePanelHeader(id);
        target.classList.add('active');
        const content = document.querySelector('.content');
        const scrollContainer = document.querySelector('.post-layout');
        if (content && content.scrollHeight > content.clientHeight) {
          content.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (scrollContainer) {
          scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }

      // Update URL hash
      if (updateHash) {
        window.history.replaceState(null, '', `#${id}`);
      }
    },
    [sections, updatePanelHeader]
  );

  useEffect(() => {
    document.documentElement.dataset.sectionsCollapsed = isCollapsed ? 'true' : 'false';
  }, [isCollapsed]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) {
        setIsCollapsed(false);
      }
    };

    handleChange(mediaQuery);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

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
        updatePanelHeader(sectionId);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('section-activated', handleSectionActivated as EventListener);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('section-activated', handleSectionActivated as EventListener);
    };
  }, [sections, activateSection, updatePanelHeader]);

  const handleClick = (id: string) => {
    activateSection(id);
    if (window.matchMedia('(max-width: 767px)').matches) {
      setIsCollapsed(true);
    }
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
