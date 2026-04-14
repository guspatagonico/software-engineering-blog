import { useId, useState } from 'react';

import ConvergentEnvelope from './ConvergentEnvelope';
import styles from './convergentEnvelopeSwitcher.module.css';

export default function ConvergentEnvelopeSwitcher() {
  const [isAnimated, setIsAnimated] = useState(false);
  const switchId = useId();

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <div className={styles.title}>Diagrama de la envolvente</div>
        <div className={styles.switchGroup}>
          <span className={!isAnimated ? styles.activeLabel : styles.inactiveLabel}>Static</span>
          <label className={styles.switch} htmlFor={switchId}>
            <input
              id={switchId}
              type="checkbox"
              checked={isAnimated}
              onChange={() => setIsAnimated((prev) => !prev)}
              aria-label="Toggle animated diagram"
            />
            <span className={styles.slider} />
          </label>
          <span className={isAnimated ? styles.activeLabel : styles.inactiveLabel}>Animado</span>
        </div>
      </div>

      <div className={styles.diagramFrame}>
        {isAnimated ? <ConvergentEnvelope mode="animated" /> : <ConvergentEnvelope mode="static" />}
      </div>
    </div>
  );
}
