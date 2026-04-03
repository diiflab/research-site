import React, {useEffect, useState} from 'react';

export default function Root({children}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const adjustLayoutColumns = () => {
      const rows = document.querySelectorAll('main .row');

      rows.forEach((row) => {
        const contentCol = row.querySelector(':scope > .col.col--10, :scope > .col.col--9, :scope > .col.col--12, :scope > .col.col--8');
        if (!contentCol) {
          return;
        }

        // Limit behavior to page/blog layout rows only, not arbitrary content rows.
        const hasArticleAsDirectChild = contentCol.querySelector(':scope > article');
        if (!hasArticleAsDirectChild) {
          return;
        }

        const hasToc = Boolean(row.querySelector(':scope > .col.col--2 .tableOfContents_bqdL, :scope > .col.col--3 .tableOfContents_bqdL'));

        if (!hasToc) {
          contentCol.classList.remove('col--8', 'col--9', 'col--12');
          contentCol.classList.add('col--12');
        } else {
          contentCol.classList.remove('col--12');
          if (!contentCol.classList.contains('col--10') && !contentCol.classList.contains('col--9')) {
            contentCol.classList.add('col--10');
          }
        }
      });
    };

    const rafAdjust = () => {
      window.requestAnimationFrame(adjustLayoutColumns);
    };

    rafAdjust();

    const observer = new MutationObserver(rafAdjust);
    observer.observe(document.body, {childList: true, subtree: true});

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 320);
    };

    window.addEventListener('scroll', onScroll, {passive: true});
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <>
      {children}
      <button
        type="button"
        className={`global-back-to-top ${isVisible ? 'is-visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        Back to top
      </button>
    </>
  );
}