import { useEffect, useRef } from 'react';
import styles from './MatrixBackground.module.css';

const LATIN_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%&*<>[]{}';
const JAPANESE_CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポァィゥェォッャュョヮ';
const JAPANESE_RATIO = 0.3; // 30% Japanese, 70% Latin

// Hidden gems - special words that appear seldom
const GEM_WORDS = [
  'gustavo',
  'salvini',
  'turdera nevada',
  'argentina',
  'engineering',
  'software',
  'development',
  'artificial intelligence',
  'agents',
  'harness',
  'convergence',
  'code',
  'memory',
  'security',
  'artemis',
  'make it happen!',
  'ecimtech',
  'robotics',
  'automation',
  'ralph loops',
  'uucp',
  'fidonet',
  'bbs',
  'remote access',
  'ssh',
  'kernel panic',
  'posix',
  'dennis ritchie',
  'brian kernighan',
  'linus torvalds',
  'psy',
  'la plata',
  'nico',
  'luca',
  'lucila',
  'cecilia',
  'luciano',
  'julia',
  'italia',
  'msx',
  'spectrum',
  'commodore',
  'alejo simon',
  'carpinchos',
];

// Layer configuration - each layer has different depth characteristics (40% larger sizes)
const LAYERS = [
  { depth: 0.2, speed: 0.8, fontSize: 14, alpha: 0.18, columns: 0.4 }, // Far background
  { depth: 0.4, speed: 1.2, fontSize: 15, alpha: 0.28, columns: 0.6 }, // Mid-background
  { depth: 0.6, speed: 1.6, fontSize: 18, alpha: 0.45, columns: 0.8 }, // Mid-ground
  { depth: 0.8, speed: 2.0, fontSize: 21, alpha: 0.65, columns: 1.0 }, // Near foreground
  { depth: 1.0, speed: 2.5, fontSize: 24, alpha: 1.0, columns: 1.2 }, // Foreground
];

const STREAM_MIN_LENGTH = 15;
const STREAM_MAX_LENGTH = 35;
const STREAM_MIN_LENGTH_MOBILE = 8;
const STREAM_MAX_LENGTH_MOBILE = 18;
const MOUSE_RADIUS = 200;
const CHAR_CHANGE_RATE = 0.3; // Lower for more streams
const CHAR_CHANGE_COUNT = 2; // Fewer changes

interface Stream {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  brightness: number[];
  layerIndex: number;
  streamLength: number;
  gemPositions: boolean[]; // true if position is part of a gem word
  gemTimers: number[]; // Timer for each gem position (frames until next flicker)
  originalGems: string[]; // Store original gem characters
}

// Insert a gem word at a random position in the stream
function insertGemWord(
  chars: string[],
  brightness: number[]
): {
  chars: string[];
  brightness: number[];
  gemPositions: boolean[];
  gemTimers: number[];
  originalGems: string[];
} {
  const gemPositions: boolean[] = new Array(chars.length).fill(false);
  const gemTimers: number[] = new Array(chars.length).fill(0);
  const originalGems: string[] = new Array(chars.length).fill('');

  // Clone arrays
  const newChars = [...chars];
  const newBrightness = [...brightness];

  // Much higher chance - 1 to 2 gem words per stream (reduced)
  const numGems = Math.random() < 0.7 ? 1 : 0; // 70% chance of 1 gem

  for (let g = 0; g < numGems; g++) {
    if (newChars.length < 5) continue;

    const word = GEM_WORDS[Math.floor(Math.random() * GEM_WORDS.length)];
    // Word must fit - leave at least 3 chars before and after
    const maxStart = newChars.length - word.length - 3;
    if (maxStart < 3) continue;

    const startPos = 3 + Math.floor(Math.random() * (maxStart - 2));

    // Check if this position already has a gem
    let hasOverlap = false;
    for (let checkIdx = startPos; checkIdx < startPos + word.length + 2; checkIdx++) {
      if (checkIdx < gemPositions.length && gemPositions[checkIdx]) {
        hasOverlap = true;
        break;
      }
    }
    if (hasOverlap) continue;

    // Insert word characters (reversed so it reads top-to-bottom when stream falls)
    for (let i = 0; i < word.length; i++) {
      // Reverse: put first letter at higher index (top), last letter at lower index (bottom)
      const reverseIdx = word.length - 1 - i;
      newChars[startPos + reverseIdx] = word[i];
      newBrightness[startPos + reverseIdx] = 1.0;
      gemPositions[startPos + reverseIdx] = true;
      gemTimers[startPos + reverseIdx] = Math.floor(20 + Math.random() * 40);
      originalGems[startPos + reverseIdx] = word[i];
    }
  }

  return { chars: newChars, brightness: newBrightness, gemPositions, gemTimers, originalGems };
}

function generateChar(): string {
  if (Math.random() < JAPANESE_RATIO) {
    return JAPANESE_CHARS[Math.floor(Math.random() * JAPANESE_CHARS.length)];
  }
  return LATIN_CHARS[Math.floor(Math.random() * LATIN_CHARS.length)];
}

function generateStream(
  layerIndex: number,
  canvasWidth: number,
  startY: number,
  isMobile: boolean = false
): Stream {
  const layer = LAYERS[layerIndex];
  const minLen = isMobile ? STREAM_MIN_LENGTH_MOBILE : STREAM_MIN_LENGTH;
  const maxLen = isMobile ? STREAM_MAX_LENGTH_MOBILE : STREAM_MAX_LENGTH;
  const streamLength = minLen + Math.floor(Math.random() * (maxLen - minLen));
  const chars: string[] = [];
  const brightness: number[] = [];

  for (let j = 0; j < streamLength; j++) {
    chars.push(generateChar());
    brightness.push(1 - (j / streamLength) * 0.85);
  }

  // Insert gem words
  const {
    chars: finalChars,
    brightness: finalBrightness,
    gemPositions,
    gemTimers,
    originalGems,
  } = insertGemWord(chars, brightness);

  return {
    x: Math.random() * canvasWidth,
    y: startY,
    speed: layer.speed + Math.random() * 0.3,
    chars: finalChars,
    brightness: finalBrightness,
    layerIndex,
    streamLength,
    gemPositions,
    gemTimers,
    originalGems,
  };
}

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamsRef = useRef<Stream[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const observerRef = useRef<MutationObserver | null>(null);
  const themeRef = useRef<string>('dark');
  const isMobileRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize theme from DOM
    const initTheme = () => {
      const attr = document.documentElement.getAttribute('data-theme');
      themeRef.current = attr || 'dark';
    };
    initTheme();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStreams();
    };

    const initStreams = () => {
      streamsRef.current = [];
      // Different stream counts for mobile/tablet/desktop
      const width = window.innerWidth;
      isMobileRef.current = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const totalColumns = isMobileRef.current ? 60 : isTablet ? 180 : 220;

      for (let i = 0; i < totalColumns; i++) {
        // Distribute across layers (more in background, fewer in foreground)
        const layerWeights = [0.35, 0.28, 0.2, 0.12, 0.05];
        const rand = Math.random();
        let cumWeight = 0;
        let layerIndex = 0;
        for (let j = 0; j < layerWeights.length; j++) {
          cumWeight += layerWeights[j];
          if (rand < cumWeight) {
            layerIndex = j;
            break;
          }
        }

        const stream = generateStream(
          layerIndex,
          canvas.width,
          Math.random() * canvas.height * 1.5 - canvas.height * 0.5,
          isMobileRef.current
        );
        stream.x = (i / totalColumns) * canvas.width + Math.random() * 10;
        streamsRef.current.push(stream);
      }
    };

    const getTheme = () => {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };

    themeRef.current = getTheme();
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleThemeChange = (e: StorageEvent) => {
      if (e.key === 'theme') {
        themeRef.current = e.newValue || 'dark';
      }
    };

    const handleThemeEvent = (e: Event) => {
      // Read theme directly from DOM attribute - more reliable than custom event detail
      const attr = document.documentElement.getAttribute('data-theme');
      themeRef.current = attr || 'dark';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('storage', handleThemeChange);
    window.addEventListener('theme-changed', handleThemeEvent);

    // Also watch for attribute changes directly
    observerRef.current = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const attr = document.documentElement.getAttribute('data-theme');
          themeRef.current = attr || 'dark';
        }
      });
    });
    observerRef.current.observe(document.documentElement, { attributes: true });

    const draw = () => {
      const isDark = themeRef.current === 'dark';

      // Clear
      ctx.fillStyle = isDark ? 'rgba(8, 12, 18, 0.97)' : 'rgba(245, 247, 250, 0.98)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // No sort needed - streams created in roughly correct layer order based on weighted distribution
      streamsRef.current.forEach((stream) => {
        const layer = LAYERS[stream.layerIndex];
        const fontSize = layer.fontSize;

        // Calculate mouse influence - more dynamic awesome effect
        const dx = stream.x - mouseRef.current.x;
        const dy = stream.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let offsetX = 0;
        let offsetY = 0;
        let isAffected = false;
        let shockwaveIntensity = 0;

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = Math.pow((MOUSE_RADIUS - dist) / MOUSE_RADIUS, 1.5); // Exponential falloff
          const angle = Math.atan2(dy, dx);

          // Horizontal displacement - more subtle
          const wavePhase = Date.now() * 0.015 + stream.x * 0.02;
          const wave = Math.sin(wavePhase) * 0.5;
          offsetX = Math.cos(angle) * force * (25 + wave * 10) * layer.depth;

          // Vertical displacement - more subtle
          offsetY = Math.sin(angle) * force * 15 * layer.depth;

          // Shockwave effect - subtle
          shockwaveIntensity = force;
          isAffected = true;
        }

        const drawX = stream.x + offsetX;
        const drawY = stream.y + offsetY;
        ctx.font = `bold ${fontSize}px "Noto Sans Mono", "MS Gothic", "Hiragino Sans", monospace`;
        ctx.textAlign = 'center';

        // Draw each character in the stream
        for (let i = 0; i < stream.chars.length; i++) {
          const charY = drawY - i * fontSize;

          if (charY < -fontSize || charY > canvas.height + fontSize * 5) continue;

          let alpha = stream.brightness[i] * layer.alpha;

          // Check if this is part of a gem word for special styling
          const isGem = stream.gemPositions && stream.gemPositions[i];

          // Random flash for gem words - brighter green
          let flashIntensity = 0;
          if (isGem) {
            flashIntensity = Math.random() < 0.02 ? 1 : 0; // 2% chance per frame to flash
            if (flashIntensity) {
              alpha = Math.min(alpha * 1.5, 1.0); // Boost alpha for flash
            }
          }

          // Mouse affects closer layers more
          if (isAffected && stream.layerIndex >= 2 && i < 3) {
            alpha *= 0.4;
          }

          // Color based on theme and layer depth + shockwave effect
          if (isDark) {
            // Calculate hue shift based on depth - deeper = more blue/teal, closer = more green
            const depthFactor = layer.depth;

            // Shockwave makes characters brighter/whiter
            const shockwaveBoost = shockwaveIntensity * 0.5;

            // Gem flash - subtle bright green with glow
            if (isGem) {
              if (flashIntensity) {
                // Full flash - brighter but not too bright
                ctx.fillStyle = `rgba(100, 230, 150, ${alpha})`;
                ctx.shadowColor = 'rgba(80, 220, 120, 0.8)';
                ctx.shadowBlur = 10;
              } else {
                // Normal gem - subtle bright green
                ctx.fillStyle = `rgba(0, 200, 130, ${alpha * 0.8})`;
                ctx.shadowColor = 'rgba(0, 200, 130, 0.6)';
                ctx.shadowBlur = 5;
              }
            } else if (i === 0) {
              // Head - white with slight green tint based on depth
              const r = Math.floor(200 + 55 * depthFactor + shockwaveBoost * 55);
              const g = Math.floor(255 + shockwaveBoost * 20);
              const b = Math.floor(200 + 55 * (1 - depthFactor) + shockwaveBoost * 55);
              ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
              ctx.shadowColor = `rgba(0, 255, ${100 + 100 * depthFactor}, 0.8)`;
              ctx.shadowBlur = 6 * depthFactor + shockwaveIntensity * 10;
            } else if (i < 4) {
              // Near head - green to cyan based on depth
              const g = Math.floor(200 + 55 * depthFactor + shockwaveBoost * 55);
              ctx.fillStyle = `rgba(0, ${g}, ${Math.floor(150 * depthFactor)}, ${alpha * 0.85})`;
              ctx.shadowBlur = 3 * depthFactor + shockwaveIntensity * 6;
            } else {
              // Tail - progressively more blue/teal and dimmer
              const tealAlpha = alpha * (0.4 + 0.3 * (1 - depthFactor));
              ctx.fillStyle = `rgba(0, ${Math.floor(180 * depthFactor)}, ${Math.floor(140 * depthFactor)}, ${tealAlpha})`;
              ctx.shadowBlur = 0;
            }
          } else {
            // Light mode - subtle dark teal
            if (i === 0) {
              ctx.fillStyle = `rgba(0, 60, 50, ${alpha * 0.9})`;
            } else {
              ctx.fillStyle = `rgba(0, 100, 80, ${alpha * 0.35})`;
            }
            ctx.shadowBlur = 0;
          }

          ctx.fillText(stream.chars[i], drawX, charY);
        }

        // Reset shadow
        ctx.shadowBlur = 0;

        // Update position - closer layers move faster
        stream.y += stream.speed;

        // Update gem timers and manage flickering (only for gem positions)
        if (stream.gemTimers && stream.gemPositions) {
          for (let t = 0; t < stream.gemPositions.length; t++) {
            if (stream.gemPositions[t]) {
              // Decrement timer
              if (stream.gemTimers[t] > 0) {
                stream.gemTimers[t]--;
              } else {
                // Timer expired - flicker
                if (stream.originalGems[t]) {
                  if (Math.random() < 0.25) {
                    stream.chars[t] = generateChar();
                    stream.gemTimers[t] = Math.floor(4 + Math.random() * 8);
                  } else {
                    stream.chars[t] = stream.originalGems[t];
                    stream.gemTimers[t] = Math.floor(30 + Math.random() * 90);
                  }
                }
              }
            }
          }
        }

        // Regular characters change rapidly
        if (Math.random() < CHAR_CHANGE_RATE) {
          const numChanges = 1 + Math.floor(Math.random() * CHAR_CHANGE_COUNT);
          for (let c = 0; c < numChanges; c++) {
            const changeIndex = Math.floor(Math.random() * stream.chars.length);
            // Skip gem positions - they have their own timing
            if (!stream.gemPositions || !stream.gemPositions[changeIndex]) {
              stream.chars[changeIndex] = generateChar();
            }
          }
        }

        // Reset when off screen
        if (stream.y - stream.streamLength * layer.fontSize > canvas.height) {
          stream.y = -stream.streamLength * layer.fontSize - Math.random() * canvas.height * 0.3;
          stream.x = Math.random() * canvas.width;

          // Regenerate stream
          const isMobileNow = canvas.width < 768;
          const minLen = isMobileNow ? STREAM_MIN_LENGTH_MOBILE : STREAM_MIN_LENGTH;
          const maxLen = isMobileNow ? STREAM_MAX_LENGTH_MOBILE : STREAM_MAX_LENGTH;
          stream.streamLength = minLen + Math.floor(Math.random() * (maxLen - minLen));
          stream.chars = [];
          stream.brightness = [];
          for (let j = 0; j < stream.streamLength; j++) {
            stream.chars.push(generateChar());
            stream.brightness.push(1 - (j / stream.streamLength) * 0.85);
          }
          // Insert gem words on regeneration too
          const {
            chars: finalChars,
            brightness: finalBrightness,
            gemPositions,
            gemTimers,
            originalGems,
          } = insertGemWord(stream.chars, stream.brightness);
          stream.chars = finalChars;
          stream.brightness = finalBrightness;
          stream.gemPositions = gemPositions;
          stream.gemTimers = gemTimers;
          stream.originalGems = originalGems;
          stream.speed = layer.speed + Math.random() * 0.3;
        }

        // Mouse vortex effect - pull streams spiraling toward cursor - subtle
        if (dist < MOUSE_RADIUS && dist > 30) {
          const pullStrength =
            Math.pow((MOUSE_RADIUS - dist) / MOUSE_RADIUS, 1.5) * 0.5 * layer.depth;

          // Oscillating pull direction
          const time = Date.now() * 0.004;
          const verticalOffset = Math.sin(time + stream.x * 0.01) * 30;

          // Subtle pull toward mouse
          stream.y += (mouseRef.current.y + verticalOffset - stream.y) * 0.008 * pullStrength;
          stream.x += (mouseRef.current.x - stream.x) * 0.008 * pullStrength;
        }
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('storage', handleThemeChange);
      window.removeEventListener('theme-changed', handleThemeEvent);
      observerRef.current?.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
