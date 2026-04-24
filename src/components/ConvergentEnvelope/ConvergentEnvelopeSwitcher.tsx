import { useEffect, useId, useRef, useState } from 'react';

import { readStorage, updateStorage } from '@/utils/storage';
import ConvergentEnvelope from './ConvergentEnvelope';
import styles from './convergentEnvelopeSwitcher.module.css';

const LEGACY_STORAGE_KEY = 'convergent-envelope-mode';

export default function ConvergentEnvelopeSwitcher() {
  const [mode, setMode] = useState<'static' | 'animated'>('animated');
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [previousMode, setPreviousMode] = useState<'static' | 'animated' | null>(null);
  const timeoutRef = useRef<number[]>([]);
  const switchId = useId();

  useEffect(() => {
    const stored = readStorage().convergentEnvelopeMode;
    const legacy = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    const initial =
      stored === 'static' || stored === 'animated'
        ? stored
        : legacy === 'static' || legacy === 'animated'
          ? legacy
          : 'animated';

    setMode(initial);
    updateStorage((prev) => ({
      ...prev,
      convergentEnvelopeMode: initial,
    }));

    return () => {
      timeoutRef.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      timeoutRef.current = [];
    };
  }, []);

  const handleToggle = () => {
    if (isCrossfading) return;
    const nextMode = mode === 'static' ? 'animated' : 'static';

    setPreviousMode(mode);
    setMode(nextMode);
    updateStorage((prev) => ({
      ...prev,
      convergentEnvelopeMode: nextMode,
    }));
    setIsCrossfading(true);
    timeoutRef.current.push(
      window.setTimeout(() => {
        setIsCrossfading(false);
        setPreviousMode(null);
      }, 300)
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <div className={styles.switchGroup}>
          <span className={mode === 'static' ? styles.activeLabel : styles.inactiveLabel}>
            Estático
          </span>
          <label className={styles.switch} htmlFor={switchId}>
            <input
              id={switchId}
              type="checkbox"
              checked={mode === 'animated'}
              onChange={handleToggle}
              aria-label="Toggle animated diagram"
            />
            <span className={styles.slider} />
          </label>
          <span className={mode === 'animated' ? styles.activeLabel : styles.inactiveLabel}>
            Animado
          </span>
        </div>
      </div>

      <div className={styles.diagramFrame}>
        <ConvergentEnvelope mode={mode} isCrossfading={isCrossfading} previousMode={previousMode} />
      </div>
    </div>
  );
}
