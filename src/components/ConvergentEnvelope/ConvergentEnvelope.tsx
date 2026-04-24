import { useEffect, useMemo, useRef, useState } from 'react';

import styles from './convergentEnvelope.module.css';

const X0 = 28;
const X1 = 592;
const Yc = 130;
const W = X1 - X0;
const A = 82;
const lambda = 2.8;
const omega = 5 * Math.PI;
const N = 400;

const xOf = (t: number) => X0 + t * W;
const ySignal = (t: number) => Yc - A * Math.exp(-lambda * t) * Math.sin(omega * t);
const yEnvTop = (t: number) => Yc - A * Math.exp(-lambda * t);
const yEnvBot = (t: number) => Yc + A * Math.exp(-lambda * t);

function buildPoints(fn: (t: number) => number): string {
  const pts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    pts.push(`${xOf(t).toFixed(2)},${fn(t).toFixed(2)}`);
  }
  return pts.join(' ');
}

function buildPath(fn: (t: number) => number): string {
  let d = '';
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const x = xOf(t).toFixed(2);
    const y = fn(t).toFixed(2);
    d += i === 0 ? `M ${x},${y}` : ` L ${x},${y}`;
  }
  return d;
}

function buildFillArea(top: (t: number) => number, bot: (t: number) => number): string {
  let d = `M ${X0},${Yc}`;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    d += ` L ${xOf(t).toFixed(2)},${top(t).toFixed(2)}`;
  }
  for (let i = N; i >= 0; i--) {
    const t = i / N;
    d += ` L ${xOf(t).toFixed(2)},${bot(t).toFixed(2)}`;
  }
  return `${d} Z`;
}

function buildDividerPoints(top: (t: number) => number, bot: (t: number) => number) {
  return [0.2, 0.4, 0.6].map((t) => ({
    x: xOf(t),
    y1: top(t) - 6,
    y2: bot(t) + 6,
  }));
}

interface PhaseLabel {
  text: string;
  t: number;
  fill: string;
}

const phaseLabels: PhaseLabel[] = [
  { text: 'inicio', t: 0, fill: '#8a9ab8' },
  { text: 'fork', t: 0.2, fill: '#8a9ab8' },
  { text: 'join', t: 0.4, fill: '#8a9ab8' },
  { text: 'validación', t: 0.6, fill: '#8a9ab8' },
];

interface ConvergentEnvelopeProps {
  mode?: 'static' | 'animated';
  isCrossfading?: boolean;
  previousMode?: 'static' | 'animated' | null;
}

export default function ConvergentEnvelope({
  mode = 'static',
  isCrossfading = false,
  previousMode = null,
}: ConvergentEnvelopeProps) {
  const staticSignalPoints = useMemo(() => buildPoints(ySignal), []);
  const staticTopPath = useMemo(() => buildPath(yEnvTop), []);
  const staticBotPath = useMemo(() => buildPath(yEnvBot), []);
  const staticFillArea = useMemo(() => buildFillArea(yEnvTop, yEnvBot), []);
  const staticDividers = useMemo(() => buildDividerPoints(yEnvTop, yEnvBot), []);

  const [animatedSignalPoints, setAnimatedSignalPoints] = useState(staticSignalPoints);
  const [animatedTopPath, setAnimatedTopPath] = useState(staticTopPath);
  const [animatedBotPath, setAnimatedBotPath] = useState(staticBotPath);
  const [animatedFillArea, setAnimatedFillArea] = useState(staticFillArea);
  const [animatedDividers, setAnimatedDividers] = useState(staticDividers);
  const frameRef = useRef<number | null>(null);
  const shouldAnimate = mode === 'animated' || (isCrossfading && previousMode === 'animated');

  useEffect(() => {
    if (!shouldAnimate) {
      setAnimatedSignalPoints(staticSignalPoints);
      setAnimatedTopPath(staticTopPath);
      setAnimatedBotPath(staticBotPath);
      setAnimatedFillArea(staticFillArea);
      setAnimatedDividers(staticDividers);
      return;
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setAnimatedSignalPoints(staticSignalPoints);
      setAnimatedTopPath(staticTopPath);
      setAnimatedBotPath(staticBotPath);
      setAnimatedFillArea(staticFillArea);
      setAnimatedDividers(staticDividers);
      return;
    }

    const animate = (time: number) => {
      const tSec = time / 1000;
      const wobble = (freq: number, amp: number, phase: number) =>
        amp * Math.sin(tSec * freq + phase);

      const envA = A * (1 + wobble(0.7, 0.12, 0.4) + wobble(1.3, 0.06, 2.1));
      const envLambda = lambda * (1 + wobble(0.5, 0.1, 1.1));
      const envOmega =
        omega * (1 + wobble(1.2, 0.24, 0.2) + wobble(2.4, 0.12, 1.4) + wobble(3.2, 0.06, 2.6));
      const phaseShift = wobble(1.1, 0.9, 0.9) + wobble(2.8, 0.35, 1.8);
      const touchFactor = 0.88 + 0.12 * (0.5 + 0.5 * Math.sin(tSec * 1.2 + 0.7));
      const signalAmp = envA * touchFactor;

      const yTop = (t: number) => Yc - envA * Math.exp(-envLambda * t);
      const yBot = (t: number) => Yc + envA * Math.exp(-envLambda * t);
      const ySig = (t: number) =>
        Yc - signalAmp * Math.exp(-envLambda * t) * Math.sin(envOmega * t + phaseShift);

      setAnimatedSignalPoints(buildPoints(ySig));
      setAnimatedTopPath(buildPath(yTop));
      setAnimatedBotPath(buildPath(yBot));
      setAnimatedFillArea(buildFillArea(yTop, yBot));
      setAnimatedDividers(buildDividerPoints(yTop, yBot));
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [
    shouldAnimate,
    staticBotPath,
    staticDividers,
    staticFillArea,
    staticSignalPoints,
    staticTopPath,
  ]);

  const legY = 255;

  return (
    <div className="funnel-container post-panel post-panel-lg" data-mode={mode}>
      <svg
        viewBox="0 0 640 270"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Convergent envelope diagram"
      >
        <defs>
          <linearGradient id="envGradTop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4aa" stopOpacity={0.85} />
            <stop offset="100%" stopColor="#00d4aa" stopOpacity={0.15} />
          </linearGradient>
          <linearGradient id="envGradBot" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4aa" stopOpacity={0.85} />
            <stop offset="100%" stopColor="#00d4aa" stopOpacity={0.15} />
          </linearGradient>
          <linearGradient id="trajGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f0a020" stopOpacity={1} />
            <stop offset="100%" stopColor="#f0a020" stopOpacity={0.5} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation={2} result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="envGlow">
            <feGaussianBlur stdDeviation={1} result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g className={styles.curves} style={{ opacity: mode === 'static' ? 1 : 0 }}>
          {/* Filled area between envelopes */}
          <path d={staticFillArea} fill="rgba(0,212,170,0.04)" stroke="none" />

          {/* Upper envelope */}
          <path
            d={staticTopPath}
            fill="none"
            stroke="url(#envGradTop)"
            strokeWidth={1.5}
            strokeDasharray="6,4"
            opacity={0.75}
            filter="url(#envGlow)"
          />

          {/* Lower envelope */}
          <path
            d={staticBotPath}
            fill="none"
            stroke="url(#envGradBot)"
            strokeWidth={1.5}
            strokeDasharray="6,4"
            opacity={0.75}
            filter="url(#envGlow)"
          />

          {/* Center line */}
          <line
            x1={X0}
            y1={Yc}
            x2={X1}
            y2={Yc}
            stroke="#00d4aa"
            strokeWidth={0.6}
            opacity={0.13}
            strokeDasharray="2,10"
          />

          {/* Signal polyline */}
          <polyline
            points={staticSignalPoints}
            fill="none"
            stroke="url(#trajGrad)"
            strokeWidth={2.3}
            strokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#glow)"
            opacity={0.96}
          />

          {/* Phase dividers */}
          {staticDividers.map((d) => (
            <line
              key={`static-${d.x}-${d.y1}`}
              x1={d.x}
              y1={d.y1}
              x2={d.x}
              y2={d.y2}
              stroke="#1e2d45"
              strokeWidth={1}
              strokeDasharray="3,5"
            />
          ))}

          {/* End node */}
          <circle
            cx={X1}
            cy={Yc}
            r={9}
            fill="none"
            stroke="#00d4aa"
            strokeWidth={1.5}
            opacity={0.55}
          />
          <circle cx={X1} cy={Yc} r={4} fill="#00d4aa" opacity={0.88} />
        </g>

        <g className={styles.curves} style={{ opacity: mode === 'animated' ? 1 : 0 }}>
          {/* Filled area between envelopes */}
          <path d={animatedFillArea} fill="rgba(0,212,170,0.04)" stroke="none" />

          {/* Upper envelope */}
          <path
            d={animatedTopPath}
            fill="none"
            stroke="url(#envGradTop)"
            strokeWidth={1.5}
            strokeDasharray="6,4"
            opacity={0.75}
            filter="url(#envGlow)"
          />

          {/* Lower envelope */}
          <path
            d={animatedBotPath}
            fill="none"
            stroke="url(#envGradBot)"
            strokeWidth={1.5}
            strokeDasharray="6,4"
            opacity={0.75}
            filter="url(#envGlow)"
          />

          {/* Center line */}
          <line
            x1={X0}
            y1={Yc}
            x2={X1}
            y2={Yc}
            stroke="#00d4aa"
            strokeWidth={0.6}
            opacity={0.13}
            strokeDasharray="2,10"
          />

          {/* Signal polyline */}
          <polyline
            points={animatedSignalPoints}
            fill="none"
            stroke="url(#trajGrad)"
            strokeWidth={2.3}
            strokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#glow)"
            opacity={0.96}
          />

          {/* Phase dividers */}
          {animatedDividers.map((d) => (
            <line
              key={`animated-${d.x}-${d.y1}`}
              x1={d.x}
              y1={d.y1}
              x2={d.x}
              y2={d.y2}
              stroke="#1e2d45"
              strokeWidth={1}
              strokeDasharray="3,5"
            />
          ))}

          {/* End node */}
          <circle
            cx={X1}
            cy={Yc}
            r={9}
            fill="none"
            stroke="#00d4aa"
            strokeWidth={1.5}
            opacity={0.55}
          />
          <circle cx={X1} cy={Yc} r={4} fill="#00d4aa" opacity={0.88} />
        </g>

        {/* Phase labels */}
        {phaseLabels.map((label) => (
          <text
            key={label.text}
            x={xOf(label.t)}
            y={22}
            fontFamily="Inter, sans-serif"
            fontWeight={700}
            textAnchor="middle"
            fill={label.fill}
            className="funnel-phase-label"
          >
            {label.text}
          </text>
        ))}

        {/* Converge label */}
        <text
          x={X1-20}
          y={22}
          fontFamily="Inter, sans-serif"
          fontWeight={700}
          textAnchor="middle"
          fill="#00d4aa"
          className="funnel-converge-label"
        >
          ✓ converge
        </text>

        {/* Legend */}
        <line
          x1={60}
          y1={legY}
          x2={96}
          y2={legY}
          stroke="#f0a020"
          strokeWidth={2.3}
          opacity={0.85}
        />
        <circle cx={78} cy={legY} r={3} fill="#f0a020" opacity={0.75} />
        <text
          x={103}
          y={legY + 4}
          fontFamily="Inter, sans-serif"
          fontWeight={600}
          fill="#a08040"
          className="funnel-legend-label"
        >
          trayectoria del agente
        </text>
        <line
          x1={320}
          y1={legY}
          x2={356}
          y2={legY}
          stroke="#00d4aa"
          strokeWidth={1.5}
          strokeDasharray="5,4"
          opacity={0.65}
        />
        <text
          x={363}
          y={legY + 4}
          fontFamily="Inter, sans-serif"
          fontWeight={600}
          fill="#2a8a70"
          className="funnel-legend-label"
        >
          envolvente e⁻λt
        </text>
      </svg>
    </div>
  );
}
