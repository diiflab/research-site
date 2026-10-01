import { useEffect, useState } from 'react';

/**
 * Renders `children` only while the current time is within [start, end).
 * Outside that window (and during SSR, before mount) it renders `fallback`,
 * so the gated content never appears in the static HTML.
 */
export default function TimeWindow({ start, end, fallback = null, children }) {
  const startMs = start ? new Date(start).getTime() : -Infinity;
  const endMs = end ? new Date(end).getTime() : Infinity;
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null || now < startMs || now >= endMs) {
    return fallback;
  }
  return children;
}
