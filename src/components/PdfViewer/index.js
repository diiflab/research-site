import React, { useRef, useState } from 'react';
import {translate} from '@docusaurus/Translate';
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
          {hidden ? translate({id: 'pdfViewer.show', message: 'Show {name}'}, {name}) : translate({id: 'pdfViewer.hide', message: 'Hide {name}'}, {name})}
        </button>
        {!hidden && (
          <>
            <button type="button" className={styles.button} onClick={() => setExpanded((v) => !v)}>
              {expanded ? translate({id: 'pdfViewer.collapse', message: 'Collapse'}) : translate({id: 'pdfViewer.expand', message: 'Expand'})}
            </button>
            <button type="button" className={styles.button} onClick={toggleFullscreen}>
              {translate({id: 'pdfViewer.fullscreen', message: 'Full screen'})}
            </button>
          </>
        )}
        <a className={styles.button} href={href} target="_blank" rel="noopener noreferrer">
          {translate({id: 'pdfViewer.newTab', message: 'Open in new tab'})}
        </a>
        <a className={`${styles.button} ${styles.primary}`} href={href} download={downloadName || true}>
          {label ? translate({id: 'pdfViewer.downloadLabel', message: 'Download "{label}"'}, {label}) : translate({id: 'pdfViewer.download', message: 'Download PDF'})}
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
          <p className={styles.hint}>{translate({id: 'pdfViewer.hint', message: 'Drag the bottom-right corner to resize the viewer.'})}</p>
        </>
      )}
    </div>
  );
}
