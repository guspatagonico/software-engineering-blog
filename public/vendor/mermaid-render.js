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
  const MERMAID_ZOOM_STEP = 1.15;
  const MERMAID_ZOOM_MIN = 0.7;
  const MERMAID_ZOOM_MAX = 2.8;
  const MERMAID_CONTROLS_IDLE_MS = 3000;
  const MERMAID_VIEWPORT_MIN_HEIGHT = 220;
  const MERMAID_VIEWPORT_MAX_HEIGHT_RATIO = 0.72;
  const MERMAID_VIEWPORT_MAX_HEIGHT = 820;
  const observedMermaid = new WeakSet();
  const interactiveMermaid = new WeakMap();

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const getBounds = (state) => {
    const scaledWidth = state.baseWidth * state.scale;
    const scaledHeight = state.baseHeight * state.scale;

    const centeredX = (state.viewportWidth - scaledWidth) / 2;
    const centeredY = (state.viewportHeight - scaledHeight) / 2;

    const minX = scaledWidth <= state.viewportWidth ? centeredX : state.viewportWidth - scaledWidth;
    const maxX = scaledWidth <= state.viewportWidth ? centeredX : 0;
    const minY = scaledHeight <= state.viewportHeight ? centeredY : state.viewportHeight - scaledHeight;
    const maxY = scaledHeight <= state.viewportHeight ? centeredY : 0;

    return {
      minX,
      maxX,
      minY,
      maxY,
    };
  };

  const clampPosition = (state) => {
    const bounds = getBounds(state);
    state.x = clamp(state.x, bounds.minX, bounds.maxX);
    state.y = clamp(state.y, bounds.minY, bounds.maxY);
  };

  const refreshViewportMetrics = (state) => {
    state.viewportWidth = state.viewport.clientWidth;
    state.viewportHeight = state.viewport.clientHeight;
    state.baseWidth = state.viewportWidth;
    const effectiveAspectRatio = Math.max(state.aspectRatio, state.renderedAspectRatio || 0);
    state.baseHeight = state.baseWidth * effectiveAspectRatio;
    clampPosition(state);
  };

  const setViewportHeight = (state) => {
    const idealHeight = Math.round(state.baseHeight);
    const maxHeight = Math.round(
      Math.min(window.innerHeight * MERMAID_VIEWPORT_MAX_HEIGHT_RATIO, MERMAID_VIEWPORT_MAX_HEIGHT)
    );
    const viewportHeight = clamp(idealHeight, MERMAID_VIEWPORT_MIN_HEIGHT, maxHeight);
    state.viewport.style.height = `${viewportHeight}px`;
    state.viewportHeight = viewportHeight;
  };

  const applyTransform = (state) => {
    state.canvas.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.scale})`;
  };

  const getDiagramAspectRatio = (svg, source = '') => {
    if (!(svg instanceof SVGElement)) return 0.6;

    const isMobileViewport = window.matchMedia('(max-width: 767px)').matches;

    const isControlLoopDiagram =
      typeof source === 'string' &&
      source.includes('A[Input + Contrato]') &&
      source.includes('Delta + Nuevas restricciones');

    const viewBox = svg.viewBox && svg.viewBox.baseVal ? svg.viewBox.baseVal : null;
    const viewBoxRatio =
      viewBox && viewBox.width > 0 && viewBox.height > 0 ? viewBox.height / viewBox.width : null;

    if (typeof source === 'string' && source.includes('sequenceDiagram') && viewBoxRatio) {
      return viewBoxRatio;
    }

    try {
      const rootGroup = svg.querySelector(':scope > g') || svg.querySelector('g');
      if (rootGroup instanceof SVGGElement && typeof rootGroup.getBBox === 'function') {
        const bbox = rootGroup.getBBox();
        if (bbox && bbox.width > 0 && bbox.height > 0) {
          const bboxRatio = bbox.height / bbox.width;
          if (isControlLoopDiagram) {
            if (isMobileViewport) {
              return Math.min(bboxRatio * 0.96, 1.08);
            }
            return Math.min(bboxRatio * 0.78, 0.92);
          }
          return bboxRatio * 1.08;
        }
      }
    } catch (_error) {
      // Fall through to viewBox ratio.
    }

    if (viewBoxRatio) {
      return viewBoxRatio;
    }

    return 0.6;
  };

  const zoomAtPoint = (state, nextScale, anchorX, anchorY) => {
    const clampedScale = clamp(nextScale, MERMAID_ZOOM_MIN, MERMAID_ZOOM_MAX);
    if (clampedScale === state.scale) return;

    const worldX = (anchorX - state.x) / state.scale;
    const worldY = (anchorY - state.y) / state.scale;

    state.scale = clampedScale;
    state.x = anchorX - worldX * state.scale;
    state.y = anchorY - worldY * state.scale;
    clampPosition(state);
    applyTransform(state);
  };

  const panBy = (state, deltaX, deltaY) => {
    state.x += deltaX;
    state.y += deltaY;
    clampPosition(state);
    applyTransform(state);
  };

  const resetView = (state) => {
    state.scale = state.initialScale;
    state.x = 0;
    state.y = 0;
    clampPosition(state);
    applyTransform(state);
  };

  const getPointerDistance = (firstPointer, secondPointer) => {
    const deltaX = secondPointer.x - firstPointer.x;
    const deltaY = secondPointer.y - firstPointer.y;
    return Math.hypot(deltaX, deltaY);
  };

  const getPointerMidpoint = (firstPointer, secondPointer) => ({
    x: (firstPointer.x + secondPointer.x) / 2,
    y: (firstPointer.y + secondPointer.y) / 2,
  });

  const setupMermaidInteractions = (container) => {
    if (!(container instanceof HTMLElement)) return;
    if (interactiveMermaid.has(container)) return;

    const svg = container.querySelector('svg');
    if (!(svg instanceof SVGElement)) return;

    const sourceFragment = document.createDocumentFragment();
    while (container.firstChild) {
      sourceFragment.appendChild(container.firstChild);
    }

    const viewport = document.createElement('div');
    viewport.className = 'mermaid-viewport';

    const canvas = document.createElement('div');
    canvas.className = 'mermaid-canvas';
    canvas.appendChild(sourceFragment);

    const controls = document.createElement('div');
    controls.className = 'mermaid-controls';
    controls.innerHTML = `
      <button type="button" class="mermaid-control mermaid-control--zoom-in" aria-label="Zoom in">+</button>
      <button type="button" class="mermaid-control mermaid-control--zoom-out" aria-label="Zoom out">-</button>
      <button type="button" class="mermaid-control mermaid-control--reset" aria-label="Reset view">RST</button>
    `;

    viewport.appendChild(canvas);
    viewport.appendChild(controls);
    container.appendChild(viewport);
    container.classList.add('mermaid--interactive');

    const aspectRatio = getDiagramAspectRatio(svg, container.dataset.mermaidSource || '');
    const renderedRect = svg.getBoundingClientRect();
    const renderedAspectRatio =
      renderedRect.width > 0 && renderedRect.height > 0
        ? renderedRect.height / renderedRect.width
        : aspectRatio;

    const state = {
      container,
      viewport,
      canvas,
      controls,
      aspectRatio,
      renderedAspectRatio,
      viewportWidth: viewport.clientWidth,
      viewportHeight: viewport.clientHeight,
      baseWidth: viewport.clientWidth,
      baseHeight: viewport.clientWidth * Math.max(aspectRatio, renderedAspectRatio),
      scale: 1,
      initialScale: 1,
      x: 0,
      y: 0,
      pointerId: null,
      lastPointerX: 0,
      lastPointerY: 0,
      pointers: new Map(),
      pinchStartDistance: 0,
      pinchStartScale: 1,
      resizeObserver: null,
      controlsTimeoutId: null,
    };

    const clearControlsTimeout = () => {
      if (state.controlsTimeoutId === null) return;
      window.clearTimeout(state.controlsTimeoutId);
      state.controlsTimeoutId = null;
    };

    const showControls = () => {
      state.viewport.classList.add('controls-visible');
      clearControlsTimeout();
      state.controlsTimeoutId = window.setTimeout(() => {
        state.viewport.classList.remove('controls-visible');
        state.controlsTimeoutId = null;
      }, MERMAID_CONTROLS_IDLE_MS);
    };

    setViewportHeight(state);
    state.initialScale = 1;
    state.scale = 1;

    refreshViewportMetrics(state);
    applyTransform(state);

    const zoomInButton = controls.querySelector('.mermaid-control--zoom-in');
    const zoomOutButton = controls.querySelector('.mermaid-control--zoom-out');
    const resetButton = controls.querySelector('.mermaid-control--reset');

    zoomInButton?.addEventListener('click', () => {
      showControls();
      zoomAtPoint(state, state.scale * MERMAID_ZOOM_STEP, state.viewportWidth / 2, state.viewportHeight / 2);
    });

    zoomOutButton?.addEventListener('click', () => {
      showControls();
      zoomAtPoint(
        state,
        state.scale / MERMAID_ZOOM_STEP,
        state.viewportWidth / 2,
        state.viewportHeight / 2
      );
    });

    resetButton?.addEventListener('click', () => {
      showControls();
      resetView(state);
    });

    controls.addEventListener('pointerdown', () => {
      showControls();
    });

    viewport.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'mouse') {
        showControls();
      }
    });

    viewport.addEventListener('pointerdown', (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.closest('.mermaid-controls')) return;

      showControls();

      state.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      viewport.setPointerCapture(event.pointerId);

      if (state.pointers.size === 1) {
        state.pointerId = event.pointerId;
        state.lastPointerX = event.clientX;
        state.lastPointerY = event.clientY;
        viewport.classList.add('is-panning');
      }

      if (state.pointers.size >= 2) {
        const [firstPointer, secondPointer] = Array.from(state.pointers.values());
        state.pointerId = null;
        state.pinchStartDistance = getPointerDistance(firstPointer, secondPointer);
        state.pinchStartScale = state.scale;
        viewport.classList.remove('is-panning');
      }
    });

    viewport.addEventListener('pointermove', (event) => {
      if (!state.pointers.has(event.pointerId)) return;

      showControls();

      state.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

      if (state.pointers.size >= 2) {
        const [firstPointer, secondPointer] = Array.from(state.pointers.values());
        const currentDistance = getPointerDistance(firstPointer, secondPointer);
        if (state.pinchStartDistance > 0 && currentDistance > 0) {
          const midpoint = getPointerMidpoint(firstPointer, secondPointer);
          const viewportRect = viewport.getBoundingClientRect();
          const anchorX = midpoint.x - viewportRect.left;
          const anchorY = midpoint.y - viewportRect.top;
          const zoomFactor = currentDistance / state.pinchStartDistance;
          zoomAtPoint(state, state.pinchStartScale * zoomFactor, anchorX, anchorY);
        }
        return;
      }

      if (state.pointerId !== event.pointerId) return;
      const deltaX = event.clientX - state.lastPointerX;
      const deltaY = event.clientY - state.lastPointerY;
      state.lastPointerX = event.clientX;
      state.lastPointerY = event.clientY;
      panBy(state, deltaX, deltaY);
    });

    const clearPointer = (event) => {
      if (!state.pointers.has(event.pointerId)) return;

      state.pointers.delete(event.pointerId);

      if (state.pointers.size === 0) {
        state.pointerId = null;
        state.pinchStartDistance = 0;
        viewport.classList.remove('is-panning');
      } else if (state.pointers.size === 1) {
        const [remainingPointerId, remainingPointer] = Array.from(state.pointers.entries())[0];
        state.pointerId = remainingPointerId;
        state.lastPointerX = remainingPointer.x;
        state.lastPointerY = remainingPointer.y;
        state.pinchStartDistance = 0;
        viewport.classList.add('is-panning');
      } else {
        const [firstPointer, secondPointer] = Array.from(state.pointers.values());
        state.pointerId = null;
        state.pinchStartDistance = getPointerDistance(firstPointer, secondPointer);
        state.pinchStartScale = state.scale;
        viewport.classList.remove('is-panning');
      }

      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId);
      }
    };

    viewport.addEventListener('pointerup', clearPointer);
    viewport.addEventListener('pointercancel', clearPointer);
    viewport.addEventListener('pointerleave', clearPointer);

    if ('ResizeObserver' in window) {
      state.resizeObserver = new ResizeObserver(() => {
        setViewportHeight(state);
        state.initialScale = 1;
        if (state.scale < state.initialScale) {
          state.scale = state.initialScale;
        }
        refreshViewportMetrics(state);
        applyTransform(state);
      });
      state.resizeObserver.observe(viewport);
    }

    interactiveMermaid.set(container, state);
  };

  const setupMermaidInteractionsForRendered = () => {
    document.querySelectorAll(MERMAID_RENDER_QUERY).forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      if (node.getAttribute('data-processed') !== 'true') return;
      setupMermaidInteractions(node);
    });
  };

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
    const selectors = [
      'pre > code.language-mermaid',
      'pre.astro-code[data-language="mermaid"] > code',
      'pre[data-language="mermaid"] > code',
      'code.language-mermaid',
    ];
    document.querySelectorAll(selectors.join(',')).forEach((code) => {
      if (!(code instanceof HTMLElement)) return;
      const pre = code.closest('pre');
      if (!pre || pre.dataset.mermaidRendered === 'true') return;
      const source = code.textContent || '';
      if (!source.trim()) return;
      const container = document.createElement('div');
      container.className = 'mermaid';
      container.dataset.mermaidSource = source;
      container.textContent = source;
      pre.dataset.mermaidRendered = 'true';
      pre.replaceWith(container);
    });
  };

  const resetMermaidContainers = () => {
    document.querySelectorAll(MERMAID_QUERY).forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      const interactiveState = interactiveMermaid.get(node);
      if (interactiveState?.resizeObserver) {
        interactiveState.resizeObserver.disconnect();
      }
      if (interactiveState?.controlsTimeoutId !== null) {
        window.clearTimeout(interactiveState.controlsTimeoutId);
      }
      interactiveMermaid.delete(node);
      node.classList.remove('mermaid--interactive');
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
      setupMermaidInteractionsForRendered();
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
