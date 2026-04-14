import { useEffect, useId, useRef, useState } from 'react';

import ConvergentEnvelope from './ConvergentEnvelope';
import styles from './convergentEnvelopeSwitcher.module.css';

const STORAGE_KEY = 'convergent-envelope-mode';

export default function ConvergentEnvelopeSwitcher() {
  const [mode, setMode] = useState<'static' | 'animated'>('animated');
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [previousMode, setPreviousMode] = useState<'static' | 'animated' | null>(null);
  const timeoutRef = useRef<number[]>([]);
  const switchId = useId();

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'static' || stored === 'animated') {
      setMode(stored);
    } else {
      window.localStorage.setItem(STORAGE_KEY, 'animated');
    }

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
    window.localStorage.setItem(STORAGE_KEY, nextMode);
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
        <div className={styles.title}>Diagrama de la envolvente</div>
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
