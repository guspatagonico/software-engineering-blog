(() => {
  let mermaidRetryTimeout;
  let isMermaidInitialized = false;

  const MERMAID_QUERY = '.mermaid';

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

  const initializeMermaid = () => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'base',
      themeVariables: getThemeVariables(),
    });
    isMermaidInitialized = true;
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
      node.innerHTML = '';
      node.textContent = source;
    });
  };

  const renderMermaid = async (isRerender, attempt = 0) => {
    if (typeof mermaid === 'undefined') {
      if (attempt < 5) {
        clearTimeout(mermaidRetryTimeout);
        mermaidRetryTimeout = setTimeout(
          () => renderMermaid(isRerender, attempt + 1),
          200 + attempt * 100
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

    try {
      await mermaid.run({ querySelector: MERMAID_QUERY });
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => scheduleMermaidRender(false));
  } else {
    scheduleMermaidRender(false);
  }

  document.addEventListener('astro:page-load', () => scheduleMermaidRender(false));

  const observer = new MutationObserver((mutations) => {
    const hasThemeChange = mutations.some((mutation) => mutation.attributeName === 'data-theme');
    if (hasThemeChange) {
      isMermaidInitialized = false;
      scheduleMermaidRender(true);
    }
  });

  observer.observe(document.documentElement, { attributes: true });
})();
