import { useState, useEffect, useCallback, useRef } from 'react';
import { readStorage, updateStorage } from '@/utils/storage';
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
  const [activeId, setActiveId] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [showNextHint, setShowNextHint] = useState(false);
  const hasInitialized = useRef(false);
  const scrollRaf = useRef<number | null>(null);
  const didInitialRestore = useRef(false);
  const scrollTimeout = useRef<number | null>(null);
  const skipNextRestore = useRef(false);

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

  const getPostKey = useCallback(() => window.location.pathname, []);

  const getScrollTarget = useCallback(() => {
    const content = document.querySelector<HTMLElement>('.content');
    if (content && content.scrollHeight > content.clientHeight) return content;
    const layout = document.querySelector<HTMLElement>('.post-layout');
    if (layout && layout.scrollHeight > layout.clientHeight) return layout;
    return window;
  }, []);

  const restoreScrollPosition = useCallback(
    (sectionId: string) => {
      const postKey = getPostKey();
      const saved = readStorage().scrollPositions?.[postKey]?.[sectionId];
      const target = getScrollTarget();
      const next = typeof saved === 'number' && saved >= 0 ? saved : 0;

      const applyScroll = () => {
        if (target === window) {
          window.scrollTo({ top: next, behavior: 'auto' });
        } else {
          target.scrollTo({ top: next, behavior: 'auto' });
        }
      };

      requestAnimationFrame(() => {
        applyScroll();
        requestAnimationFrame(applyScroll);
      });
    },
    [getPostKey, getScrollTarget]
  );

  const saveScrollPosition = useCallback(
    (sectionId: string) => {
      const target = getScrollTarget();
      const pos = target === window ? window.scrollY : (target as HTMLElement).scrollTop;
      if (pos < 0) return;
      const postKey = getPostKey();
      const rounded = Math.round(pos);

      updateStorage((prev) => {
        const nextPositions = { ...(prev.scrollPositions ?? {}) };
        const postPositions = { ...(nextPositions[postKey] ?? {}) };
        postPositions[sectionId] = rounded;
        nextPositions[postKey] = postPositions;
        return {
          ...prev,
          scrollPositions: nextPositions,
        };
      });
    },
    [getPostKey, getScrollTarget]
  );

  // Activate a section by ID (update URL hash, show panel, update state)
  const activateSection = useCallback(
    (id: string, updateHash: boolean = true, restoreScroll: boolean = true) => {
      if (!sections.find((s) => s.id === id)) return;

      // Mark if we should skip the next automatic restore
      if (!restoreScroll) {
        skipNextRestore.current = true;
      }

      setActiveId(id);

      // Hide all panels, show target
      document.querySelectorAll('.panel').forEach((p) => {
        p.classList.remove('active');
      });
      const target = document.getElementById(`panel-${id}`);
      if (target) {
        updatePanelHeader(id);
        target.classList.add('active');
        if (restoreScroll) {
          restoreScrollPosition(id);
        } else {
          // Scroll to top
          const scrollTarget = getScrollTarget();
          if (scrollTarget === window) {
            window.scrollTo({ top: 0, behavior: 'auto' });
          } else {
            scrollTarget.scrollTo({ top: 0, behavior: 'auto' });
          }
        }
      }

      // Update URL hash
      if (updateHash) {
        window.history.replaceState(null, '', `#${id}`);
      }

      window.dispatchEvent(
        new CustomEvent('section-activated', {
          detail: { sectionId: id },
        })
      );
    },
    [sections, updatePanelHeader, restoreScrollPosition, getScrollTarget]
  );

  useEffect(() => {
    if (!hasInitialized.current) return;
    document.documentElement.dataset.sectionsCollapsed = isCollapsed ? 'true' : 'false';
  }, [isCollapsed]);

  useEffect(() => {
    setIsHydrated(true);

    const collapsedAttr = document.documentElement.dataset.sectionsCollapsed;
    if (collapsedAttr === 'true' || collapsedAttr === 'false') {
      setIsCollapsed(collapsedAttr === 'true');
    }

    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const handleMobileChange = (event: MediaQueryListEvent | MediaQueryList) => {
      if (!hasInitialized.current) {
        const collapsedAttr = document.documentElement.dataset.sectionsCollapsed;
        if (collapsedAttr === 'true' || collapsedAttr === 'false') {
          setIsCollapsed(collapsedAttr === 'true');
        } else {
          setIsCollapsed(event.matches);
        }
      }
      hasInitialized.current = true;
    };

    handleMobileChange(mobileQuery);

    if (typeof mobileQuery.addEventListener === 'function') {
      mobileQuery.addEventListener('change', handleMobileChange);
    } else {
      mobileQuery.addListener(handleMobileChange);
    }

    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) {
        setIsCollapsed(false);
      }
    };

    handleChange(mediaQuery);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mobileQuery.removeEventListener === 'function') {
        mobileQuery.removeEventListener('change', handleMobileChange);
      } else {
        mobileQuery.removeListener(handleMobileChange);
      }

      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    const target = document.documentElement.dataset.currentPanel;
    if (target && sections.find((s) => s.id === target)) {
      setActiveId(target);
    } else if (sections[0]?.id) {
      setActiveId(sections[0].id);
    }
  }, [sections]);

  // Detect if user is near the end of the current panel (for "next" hint)
  const checkScrollPosition = useCallback(() => {
    // Only check on mobile
    if (!window.matchMedia('(max-width: 767px)').matches) {
      setShowNextHint(false);
      return;
    }

    // Only if collapsed (active section is showing)
    if (!isCollapsed) {
      setShowNextHint(false);
      return;
    }

    // Check if there's a next section
    const currentIndex = sections.findIndex((s) => s.id === activeId);
    if (currentIndex === -1 || currentIndex === sections.length - 1) {
      setShowNextHint(false);
      return;
    }

    const panel = document.getElementById(`panel-${activeId}`);
    if (!panel) {
      setShowNextHint(false);
      return;
    }

    const target = getScrollTarget();
    const scrollPos = target === window ? window.scrollY : (target as HTMLElement).scrollTop;
    const scrollHeight =
      target === window
        ? document.documentElement.scrollHeight
        : (target as HTMLElement).scrollHeight;
    const clientHeight =
      target === window ? window.innerHeight : (target as HTMLElement).clientHeight;

    // Check if content is not scrollable (brief section)
    const hasNoScroll = scrollHeight <= clientHeight;

    // If no scroll, always show hint. Otherwise, check if near bottom
    if (hasNoScroll) {
      setShowNextHint(true);
    } else {
      // Hysteresis: 150px from bottom
      const threshold = 150;
      const isNearBottom = scrollPos + clientHeight >= scrollHeight - threshold;
      setShowNextHint(isNearBottom);
    }
  }, [activeId, sections, isCollapsed, getScrollTarget]);

  // Handle initial hash and hash changes
  useEffect(() => {
    if (!activeId) return;
    const target = getScrollTarget();
    const handleScroll = () => {
      if (scrollRaf.current) return;
      scrollRaf.current = window.requestAnimationFrame(() => {
        scrollRaf.current = null;
        saveScrollPosition(activeId);
        checkScrollPosition();
      });
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = window.setTimeout(() => {
        saveScrollPosition(activeId);
        checkScrollPosition();
      }, 140);
    };

    if (target === window) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      target.addEventListener('scroll', handleScroll, { passive: true });
    }

    const handlePageHide = () => saveScrollPosition(activeId);
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') saveScrollPosition(activeId);
    };

    window.addEventListener('pagehide', handlePageHide);
    document.addEventListener('visibilitychange', handleVisibility);

    // Initial check
    checkScrollPosition();

    return () => {
      if (target === window) {
        window.removeEventListener('scroll', handleScroll);
      } else {
        target.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }

      window.removeEventListener('pagehide', handlePageHide);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [activeId, getScrollTarget, saveScrollPosition, checkScrollPosition]);

  useEffect(() => {
    if (!isHydrated || !activeId || didInitialRestore.current) return;

    // Skip restore if we explicitly requested not to
    if (skipNextRestore.current) {
      skipNextRestore.current = false;
      didInitialRestore.current = true;
      return;
    }

    const hash = window.location.hash.slice(1);
    if (hash && hash === activeId) {
      didInitialRestore.current = true;
      restoreScrollPosition(activeId);
    }
  }, [activeId, isHydrated, restoreScrollPosition]);

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
        restoreScrollPosition(sectionId);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('section-activated', handleSectionActivated as EventListener);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('section-activated', handleSectionActivated as EventListener);
    };
  }, [sections, activateSection, updatePanelHeader, restoreScrollPosition]);

  const handleClick = (id: string) => {
    activateSection(id);
    if (window.matchMedia('(max-width: 767px)').matches) {
      setIsCollapsed(true);
    }
  };

  const toggleCollapse = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    window.dispatchEvent(
      new CustomEvent('section-nav-toggle', {
        detail: { isCollapsed: next },
      })
    );
  };

  const goToNextSection = () => {
    const currentIndex = sections.findIndex((s) => s.id === activeId);
    if (currentIndex !== -1 && currentIndex < sections.length - 1) {
      activateSection(sections[currentIndex + 1].id, true, false);
      setIsCollapsed(true);
    }
  };

  const activeSection = sections.find((section) => section.id === activeId) ?? null;
  const effectiveCollapsed = isHydrated ? isCollapsed : false;
  const hasNextSection = sections.findIndex((s) => s.id === activeId) < sections.length - 1;

  return (
    <div className="section-nav-shell">
      <button
        type="button"
        className="section-nav-toggle"
        onClick={toggleCollapse}
        aria-label={effectiveCollapsed ? 'Expand sections' : 'Collapse sections'}
        aria-expanded={!effectiveCollapsed}
      >
        <span className="section-nav-toggle__label">
          <span className="section-nav-toggle__label-text">Secciones</span>
          <span className="section-nav-toggle__active">
            {activeSection ? (
              <>
                <span className="panel-mobile-header__icon">{activeSection.icon}</span>
                <span className="panel-mobile-header__label">{activeSection.label}</span>
                {showNextHint && hasNextSection && (
                  <button
                    type="button"
                    className="section-nav-next-hint"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNextSection();
                    }}
                    aria-label="Go to next section"
                  >
                    <span className="section-nav-next-hint__arrow section-nav-next-hint__arrow--1">
                      ▸
                    </span>
                    <span className="section-nav-next-hint__arrow section-nav-next-hint__arrow--2">
                      ▸
                    </span>
                    <span className="section-nav-next-hint__arrow section-nav-next-hint__arrow--3">
                      ▸
                    </span>
                  </button>
                )}
              </>
            ) : (
              <span className="section-nav-toggle__placeholder" aria-hidden="true" />
            )}
          </span>
        </span>
        <span className="section-nav-toggle__icon">▶</span>
      </button>
      <nav className={`section-nav ${effectiveCollapsed ? 'section-nav--collapsed' : ''}`}>
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
    </div>
  );
}
