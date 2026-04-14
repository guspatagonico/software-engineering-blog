import { useMemo } from 'react';

const X0 = 48;
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

function buildFillArea(): string {
  let d = `M ${X0},${Yc}`;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    d += ` L ${xOf(t).toFixed(2)},${yEnvTop(t).toFixed(2)}`;
  }
  for (let i = N; i >= 0; i--) {
    const t = i / N;
    d += ` L ${xOf(t).toFixed(2)},${yEnvBot(t).toFixed(2)}`;
  }
  return `${d} Z`;
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

export default function ConvergentEnvelope() {
  const signalPoints = useMemo(() => buildPoints(ySignal), []);
  const topPath = useMemo(() => buildPath(yEnvTop), []);
  const botPath = useMemo(() => buildPath(yEnvBot), []);
  const fillArea = useMemo(() => buildFillArea(), []);

  const dividers = useMemo(
    () =>
      [0.2, 0.4, 0.6].map((t) => ({
        x: xOf(t),
        y1: yEnvTop(t) - 6,
        y2: yEnvBot(t) + 6,
      })),
    []
  );

  const legY = 255;

  return (
    <div className="funnel-container post-panel post-panel-lg">
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

        {/* Filled area between envelopes */}
        <path d={fillArea} fill="rgba(0,212,170,0.04)" stroke="none" />

        {/* Upper envelope */}
        <path
          d={topPath}
          fill="none"
          stroke="url(#envGradTop)"
          strokeWidth={1.5}
          strokeDasharray="6,4"
          opacity={0.75}
          filter="url(#envGlow)"
        />

        {/* Lower envelope */}
        <path
          d={botPath}
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
          points={signalPoints}
          fill="none"
          stroke="url(#trajGrad)"
          strokeWidth={2.3}
          strokeLinejoin="round"
          strokeLinecap="round"
          filter="url(#glow)"
          opacity={0.96}
        />

        {/* Phase dividers */}
        {dividers.map((d, i) => (
          <line
            key={i}
            x1={d.x}
            y1={d.y1}
            x2={d.x}
            y2={d.y2}
            stroke="#1e2d45"
            strokeWidth={1}
            strokeDasharray="3,5"
          />
        ))}

        {/* Start node */}
        <circle
          cx={X0}
          cy={Yc}
          r={11}
          fill="none"
          stroke="#00d4aa"
          strokeWidth={1}
          opacity={0.22}
        />
        <circle cx={X0} cy={Yc} r={5.5} fill="#00d4aa" opacity={0.9} />

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

        {/* Phase labels */}
        {phaseLabels.map((label, i) => (
          <text
            key={i}
            x={xOf(label.t)}
            y={22}
            fontFamily="Inter, sans-serif"
            fontSize={12}
            fontWeight={700}
            textAnchor="middle"
            fill={label.fill}
          >
            {label.text}
          </text>
        ))}

        {/* Converge label */}
        <text
          x={X1}
          y={22}
          fontFamily="Inter, sans-serif"
          fontSize={12}
          fontWeight={700}
          textAnchor="middle"
          fill="#00d4aa"
        >
          ✓ converge
        </text>

        {/* Formula */}
        <text
          x={xOf(0.72)}
          y={yEnvTop(0.72) - 10}
          fontFamily="Inter, sans-serif"
          fontSize={11}
          fontWeight={500}
          fontStyle="italic"
          fill="#607090"
          opacity={0.7}
        >
          y = A·e⁻λt·sin(ωt)
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
          fontSize={12}
          fontWeight={600}
          fill="#a08040"
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
          fontSize={12}
          fontWeight={600}
          fill="#2a8a70"
        >
          envolvente e⁻λt
        </text>
      </svg>
    </div>
  );
}
