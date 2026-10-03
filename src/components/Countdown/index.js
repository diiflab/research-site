import React, { useEffect, useState } from 'react';
import {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

function split(diff) {
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

// Built per render so translate() resolves against the active locale.
const getUnits = () => [
  ['days', translate({id: 'countdown.days', message: 'Days'})],
  ['hours', translate({id: 'countdown.hours', message: 'Hours'})],
  ['minutes', translate({id: 'countdown.minutes', message: 'Minutes'})],
  ['seconds', translate({id: 'countdown.seconds', message: 'Seconds'})],
];

function Timer({ label, parts, className = '' }) {
  return (
    <div className={`${styles.countdown} ${className}`} role="timer" aria-live="off">
      <p className={styles.label}>{label}</p>
      <div className={styles.units}>
        {getUnits().map(([key, text]) => (
          <div key={key} className={styles.unit}>
            <span className={styles.value}>
              {parts ? String(parts[key]).padStart(2, '0') : '--'}
            </span>
            <span className={styles.unitLabel}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Counts down to `target` (submission opens). If `end` is given, it then
 * counts down to `end` (submission closes), and finally shows `closedMessage`.
 */
export default function Countdown({
  target,
  end,
  label = translate({id: 'countdown.opensIn', message: 'Submission opens in'}),
  endLabel = translate({id: 'countdown.closesIn', message: 'Submission is open · closes in'}),
  openMessage = translate({id: 'countdown.open', message: 'Submission is now open.'}),
  closedMessage = translate({id: 'countdown.closed', message: 'Submission is closed.'}),
}) {
  const startMs = new Date(target).getTime();
  const endMs = end ? new Date(end).getTime() : null;
  // Render nothing time-dependent until mounted to avoid SSR hydration mismatch.
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null || now < startMs) {
    return <Timer label={label} parts={now === null ? null : split(startMs - now)} />;
  }

  if (endMs !== null && now < endMs) {
    return <Timer label={endLabel} parts={split(endMs - now)} className={styles.open} />;
  }

  return (
    <div className={`${styles.countdown} ${styles.message} ${endMs !== null ? styles.closed : styles.open}`} role="status">
      {endMs !== null ? closedMessage : openMessage}
    </div>
  );
}
