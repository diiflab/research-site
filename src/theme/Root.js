import React, {useEffect, useState} from 'react';
import AskAiWidget from '@site/src/components/AskAiWidget';

const BackToTopIcon = require('@site/static/img/favicon.svg').default;

export default function Root({children}) {
  const [isVisible, setIsVisible] = useState(false);

  // Color-mode corrector.
  // Docusaurus's pre-paint head script sets html[data-theme] from the stored
  // choice / OS preference, but react-helmet re-applies <html> attributes
  // wholesale during hydration on this site (the same behaviour that clobbers
  // the intro veil's className), resetting data-theme to the SSR default
  // ("light") a few hundred ms in — so a stored dark choice (or a dark OS
  // preference) is silently dropped on every load. Re-assert the intended
  // theme after hydration and pin it: the persisted choice
  // (html[data-theme-choice], mirrored to localStorage "theme") wins;
  // otherwise follow the OS preference. data-theme-choice is left to
  // Docusaurus so the navbar toggle keeps working.
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const intendedTheme = () => {
      let choice = root.getAttribute('data-theme-choice');
      if (choice !== 'dark' && choice !== 'light') {
        try {
          const stored = window.localStorage.getItem('theme');
          if (stored === 'dark' || stored === 'light') {
            choice = stored;
          }
        } catch (err) {
          // localStorage unavailable — fall through to the OS preference.
        }
      }
      if (choice === 'dark' || choice === 'light') {
        return choice;
      }
      return media.matches ? 'dark' : 'light';
    };

    const apply = () => {
      const want = intendedTheme();
      if (root.getAttribute('data-theme') !== want) {
        // Setting it back triggers the observer again, but the next pass finds
        // the value already correct and stops — no loop.
        root.setAttribute('data-theme', want);
      }
    };

    apply();
    const observer = new MutationObserver(apply);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-theme-choice'],
    });
    media.addEventListener('change', apply);

    return () => {
      observer.disconnect();
      media.removeEventListener('change', apply);
    };
  }, []);

  // Layout-column fix-up and scroll reveals both need to re-run whenever the
  // page content changes (client-side navigation, lazy sections). They share
  // ONE body-level MutationObserver, coalesced to a single rAF per batch of
  // mutations — a subtree observer fires on every DOM write (the gs2027
  // countdown ticks every second), so per-mutation work adds up fast.
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

        // Stable theme class names only — CSS-module hashes such as
        // `tableOfContents_bqdL` change between Docusaurus releases.
        const hasToc = Boolean(row.querySelector(':scope > .col.col--2 .table-of-contents, :scope > .col.col--3 .table-of-contents'));

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

    const revealedClass = 'reveal-visible';
    const revealObserver = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(revealedClass);
              obs.unobserve(entry.target);
            }
          });
        },
        {threshold: 0.15, rootMargin: '0px 0px -8% 0px'},
      );

    const observeReveals = () => {
      document.querySelectorAll(`.reveal:not(.${revealedClass})`).forEach((el) => {
        if (revealObserver) {
          revealObserver.observe(el);
        } else {
          el.classList.add(revealedClass);
        }
      });
    };

    let frame = 0;
    const run = () => {
      frame = 0;
      adjustLayoutColumns();
      observeReveals();
    };
    const schedule = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(run);
      }
    };

    run();
    const mutationObserver = new MutationObserver(schedule);
    mutationObserver.observe(document.body, {childList: true, subtree: true});

    return () => {
      mutationObserver.disconnect();
      revealObserver?.disconnect();
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 320);

      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.toggle('navbar--scrolled', scrollY > 8);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateScrollState);
      }
    };

    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll, {passive: true});
    updateScrollState();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
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
        title="Back to top"
      >
        <BackToTopIcon className="global-back-to-top-icon" aria-hidden="true" />
      </button>
      <AskAiWidget />
    </>
  );
}
