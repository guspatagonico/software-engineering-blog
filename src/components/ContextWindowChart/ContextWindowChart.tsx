import { useState } from 'react';
import './ContextWindowChart.css';

interface ModelData {
  name: string;
  provider: string;
  contextK: number;
  smartContextK: number;
  year: number;
}

interface ContextWindowChartProps {
  models: ModelData[];
}

export default function ContextWindowChart({ models }: ContextWindowChartProps) {
  const [showSmartContext, setShowSmartContext] = useState(false);
  const maxContext = Math.max(...models.map((m) => m.contextK));

  function formatK(value: number): string {
    if (value >= 1000) return `${(value / 1000).toFixed(0)}M`;
    return `${value}K`;
  }

  function providerColor(provider: string): string {
    const colors: Record<string, string> = {
      Google: 'var(--teal)',
      OpenAI: 'var(--amber)',
      Anthropic: 'var(--red)',
    };
    return colors[provider] || 'var(--text-dim)';
  }

  return (
    <div className="ctx-chart">
      <div className="ctx-chart__controls">
        <button
          type="button"
          className={`ctx-chart__toggle ${!showSmartContext ? 'ctx-chart__toggle--active' : ''}`}
          onClick={() => setShowSmartContext(false)}
        >
          Context Window
        </button>
        <button
          type="button"
          className={`ctx-chart__toggle ${showSmartContext ? 'ctx-chart__toggle--active' : ''}`}
          onClick={() => setShowSmartContext(true)}
        >
          Smart Context (÷2)
        </button>
      </div>

      <div className="ctx-chart__legend">
        <span className="ctx-chart__legend-item">
          <span className="ctx-chart__legend-dot" style={{ background: 'var(--teal)' }} />
          Google
        </span>
        <span className="ctx-chart__legend-item">
          <span className="ctx-chart__legend-dot" style={{ background: 'var(--amber)' }} />
          OpenAI
        </span>
        <span className="ctx-chart__legend-item">
          <span className="ctx-chart__legend-dot" style={{ background: 'var(--red)' }} />
          Anthropic
        </span>
      </div>

      <div className="ctx-chart__bars">
        {models.map((model) => {
          const value = showSmartContext ? model.smartContextK : model.contextK;
          const pct = (value / maxContext) * 100;

          return (
            <div key={model.name} className="ctx-chart__row">
              <div className="ctx-chart__label">
                <span className="ctx-chart__model-name">{model.name}</span>
                <span className="ctx-chart__model-year">{model.year}</span>
              </div>
              <div className="ctx-chart__bar-track">
                <div
                  className="ctx-chart__bar-fill"
                  style={{
                    width: `${pct}%`,
                    background: providerColor(model.provider),
                  }}
                />
                <span className="ctx-chart__bar-value">{formatK(value)}</span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="ctx-chart__note">
        {showSmartContext
          ? 'Smart Context = context window / 2. Espacio útil real considerando instrucciones del sistema, herramientas, historial y respuesta.'
          : 'Tamaños nominales de ventana de contexto publicados por cada proveedor.'}
      </p>
    </div>
  );
}
