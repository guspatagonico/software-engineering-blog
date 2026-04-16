(() => {
  let mermaidRetryTimeout;
  let isMermaidInitialized = false;
  let mermaidLoadBound = false;
  let mermaidObserver;
  let triggerMermaidRender = () => {};

  const MERMAID_QUERY = '.mermaid';
  const MERMAID_RENDER_QUERY = '.mermaid.mermaid--render';
  const MAX_MERMAID_ATTEMPTS = 20;
  const MERMAID_INVIEW_MARGIN = '240px 0px';
  const MERMAID_INVIEW_THRESHOLD = 0.15;
  const observedMermaid = new WeakSet();

  const getThemeVariables = () => {
    const styles = getComputedStyle(document.documentElement);
    return {
      background: styles.getPropertyValue('--surface').trim(),
      primaryColor: styles.getPropertyValue('--surface2').trim(),
      primaryTextColor: styles.getPropertyValue('--text-bright').trim(),
      primaryBorderColor: styles.getPropertyValue('--border').trim(),
      lineColor: styles.getPropertyValue('--text-dim').trim(),
      secondaryColor: styles.getPropertyValue('--surface').trim(),
      tertiaryColor: styles.getPropertyValue('--bg').trim(),
      textColor: styles.getPropertyValue('--text').trim(),
      fontFamily: styles.getPropertyValue('--font').trim(),
      fontSize: '14px',
      edgeLabelBackground: styles.getPropertyValue('--surface').trim(),
      clusterBkg: styles.getPropertyValue('--surface').trim(),
      clusterBorder: styles.getPropertyValue('--border').trim(),
    };
  };

  const bindMermaidLoad = () => {
    if (mermaidLoadBound) return;
    const script = document.querySelector('script[src*="mermaid.min.js"]');
    if (!script) return;
    mermaidLoadBound = true;
    script.addEventListener(
      'load',
      () => {
        scheduleMermaidRender(true);
      },
      { once: true }
    );
  };

  const initializeMermaid = () => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'base',
      themeVariables: getThemeVariables(),
    });
    isMermaidInitialized = true;
  };

  const isMermaidInViewport = (node) => {
    const rect = node.getBoundingClientRect();
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.bottom > -240 && rect.top < viewHeight + 240;
  };

  const getMermaidObserver = () => {
    if (mermaidObserver) return mermaidObserver;
    if (!('IntersectionObserver' in window)) return null;
    mermaidObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const node = entry.target;
          if (!(node instanceof HTMLElement)) return;
          const panel = node.closest('.panel');
          const isPanelActive = panel ? panel.classList.contains('active') : true;
          const inView = entry.isIntersecting && isPanelActive;
          node.dataset.mermaidInView = inView ? 'true' : 'false';
          node.classList.toggle('mermaid--render', inView);
          if (inView) triggerMermaidRender();
        });
      },
      {
        rootMargin: MERMAID_INVIEW_MARGIN,
        threshold: MERMAID_INVIEW_THRESHOLD,
      }
    );
    return mermaidObserver;
  };

  const observeMermaidTargets = () => {
    const observer = getMermaidObserver();
    document.querySelectorAll(MERMAID_QUERY).forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      if (observedMermaid.has(node)) return;
      observedMermaid.add(node);
      node.classList.add('mermaid--lazy');
      if (observer) {
        observer.observe(node);
      } else {
        const panel = node.closest('.panel');
        const isPanelActive = panel ? panel.classList.contains('active') : true;
        const inView = isPanelActive;
        node.dataset.mermaidInView = inView ? 'true' : 'false';
        node.classList.toggle('mermaid--render', inView);
      }
    });
  };

  const markMermaidTargets = () => {
    document.querySelectorAll(MERMAID_QUERY).forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      const panel = node.closest('.panel');
      const isPanelActive = panel ? panel.classList.contains('active') : true;
      const inView = isPanelActive && isMermaidInViewport(node);
      node.dataset.mermaidInView = inView ? 'true' : 'false';
      node.classList.toggle('mermaid--render', inView);
    });
  };

  const ensureMermaidContainers = () => {
    document.querySelectorAll('pre > code.language-mermaid').forEach((code) => {
      const pre = code.parentElement;
      if (!pre || pre.dataset.mermaidRendered === 'true') return;
      const container = document.createElement('div');
      container.className = 'mermaid';
      container.dataset.mermaidSource = code.textContent || '';
      container.textContent = code.textContent || '';
      pre.dataset.mermaidRendered = 'true';
      pre.replaceWith(container);
    });
  };

  const resetMermaidContainers = () => {
    document.querySelectorAll(MERMAID_QUERY).forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      const source = node.dataset.mermaidSource;
      if (!source) return;
      node.removeAttribute('data-processed');
      delete node.dataset.mermaidRendered;
      node.innerHTML = '';
      node.textContent = source;
    });
  };

  const renderMermaid = async (isRerender, attempt = 0) => {
    if (typeof mermaid === 'undefined') {
      bindMermaidLoad();
      if (attempt < MAX_MERMAID_ATTEMPTS) {
        clearTimeout(mermaidRetryTimeout);
        mermaidRetryTimeout = setTimeout(
          () => renderMermaid(isRerender, attempt + 1),
          200 + attempt * 120
        );
      }
      return;
    }

    if (!isMermaidInitialized || isRerender) initializeMermaid();

    if (!isRerender) {
      ensureMermaidContainers();
    } else {
      resetMermaidContainers();
    }

    observeMermaidTargets();
    markMermaidTargets();
    const visibleTargets = document.querySelectorAll(MERMAID_RENDER_QUERY);
    if (!visibleTargets.length) {
      if (attempt < 2 && document.querySelector(MERMAID_QUERY)) {
        clearTimeout(mermaidRetryTimeout);
        mermaidRetryTimeout = setTimeout(() => renderMermaid(isRerender, attempt + 1), 120);
      }
      return;
    }

    try {
      await mermaid.run({ querySelector: MERMAID_RENDER_QUERY });
      document.querySelectorAll(MERMAID_RENDER_QUERY).forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.getAttribute('data-processed') === 'true') {
          node.dataset.mermaidRendered = 'true';
        }
      });
    } catch (error) {
      if (attempt < 5) {
        clearTimeout(mermaidRetryTimeout);
        const delay = 200 + Math.random() * 300;
        mermaidRetryTimeout = setTimeout(() => renderMermaid(true, attempt + 1), delay);
      } else {
        console.error('Mermaid render failed', error);
      }
    }
  };

  const scheduleMermaidRender = (isRerender) => {
    requestAnimationFrame(() => {
      void renderMermaid(isRerender);
    });
  };

  triggerMermaidRender = () => scheduleMermaidRender(false);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => scheduleMermaidRender(false));
  } else {
    scheduleMermaidRender(false);
  }

  document.addEventListener('astro:page-load', () => {
    scheduleMermaidRender(false);
    setTimeout(() => scheduleMermaidRender(true), 300);
  });
  document.addEventListener('section-activated', () => {
    setTimeout(() => scheduleMermaidRender(true), 50);
  });

  document.addEventListener('section-activated', () => {
    const activePanel = document.querySelector('.panel.active');
    if (!activePanel) return;
    activePanel.querySelectorAll(MERMAID_QUERY).forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      const source = node.dataset.mermaidSource;
      if (!source) return;
      node.removeAttribute('data-processed');
      delete node.dataset.mermaidRendered;
      node.innerHTML = '';
      node.textContent = source;
    });
  });

  const observer = new MutationObserver((mutations) => {
    const hasThemeChange = mutations.some((mutation) => mutation.attributeName === 'data-theme');
    if (hasThemeChange) {
      isMermaidInitialized = false;
      scheduleMermaidRender(true);
    }
  });

  observer.observe(document.documentElement, { attributes: true });
})();
