import React, { useRef, useState } from 'react';
import styles from './styles.module.css';

export default function PdfViewer({
  src,
  title,
  height = 600,
  expandedHeight = '90vh',
  downloadName,
  defaultHidden = false,
  label,
}) {
  const frameRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [hidden, setHidden] = useState(defaultHidden);
  const href = encodeURI(src);
  const name = label ? `"${label}" PDF` : 'PDF';

  const toggleFullscreen = () => {
    const el = frameRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      el.requestFullscreen?.();
    }
  };

  return (
    <div className={styles.viewer}>
      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.button}
          onClick={() => setHidden((v) => !v)}
          aria-expanded={!hidden}
        >
          {hidden ? `Show ${name}` : `Hide ${name}`}
        </button>
        {!hidden && (
          <>
            <button type="button" className={styles.button} onClick={() => setExpanded((v) => !v)}>
              {expanded ? 'Collapse' : 'Expand'}
            </button>
            <button type="button" className={styles.button} onClick={toggleFullscreen}>
              Full screen
            </button>
          </>
        )}
        <a className={styles.button} href={href} target="_blank" rel="noopener noreferrer">
          Open in new tab
        </a>
        <a className={`${styles.button} ${styles.primary}`} href={href} download={downloadName || true}>
          {label ? `Download "${label}"` : 'Download PDF'}
        </a>
      </div>
      {!hidden && (
        <>
          <div
            className={styles.frameWrap}
            style={{ height: expanded ? expandedHeight : height }}
          >
            <iframe ref={frameRef} src={href} title={title} className={styles.frame} allowFullScreen />
          </div>
          <p className={styles.hint}>Drag the bottom-right corner to resize the viewer.</p>
        </>
      )}
    </div>
  );
}
