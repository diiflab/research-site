import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import {ThemeClassNames} from '@docusaurus/theme-common';

// Site footer. Formerly a raw HTML string in themeConfig.footer.copyright,
// which could neither be translated nor follow the active locale (its
// href="/team" links always pointed at the English pages). Rendered as JSX so
// internal links go through <Link> (auto-prefixed with /ko/ on the Korean
// site) and labels through <Translate> (i18n/<locale>/code.json).
//
// The markup mirrors the theme footer's wrappers (footer > container >
// footer__bottom > footer__copyright) so custom.css — including the
// intro-pending/intro-running rules that hide `.footer` — applies unchanged.

// Built per render so translate() resolves against the active locale; each
// label is a literal translate() call so write-translations can extract it.
const getNav = () => [
  {to: '/', label: translate({id: 'footer.nav.home', message: 'Home'})},
  {to: '/team', label: translate({id: 'footer.nav.team', message: 'The Team'})},
  {to: '/projects', label: translate({id: 'footer.nav.projects', message: 'Projects'})},
  {to: '/publications', label: translate({id: 'footer.nav.publications', message: 'Publications'})},
  {to: '/gallery', label: translate({id: 'footer.nav.gallery', message: 'Gallery'})},
  {to: '/updates', label: translate({id: 'footer.nav.updates', message: 'Updates'})},
  {to: '/courses', label: translate({id: 'footer.nav.courses', message: 'Courses'})},
  {to: '/contact', label: translate({id: 'footer.nav.contact', message: 'Contact'})},
  {to: '/email-policy', label: translate({id: 'footer.nav.emailPolicy', message: 'Email Policy'})},
];

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={clsx(ThemeClassNames.layout.footer.container, 'footer', 'footer--dark')}>
      <div className="container container-fluid">
        <div className="footer__bottom text--center">
          <div className="footer__copyright">
            <div className="footer-shell">
              <nav
                className="footer-nav-row"
                aria-label={translate({id: 'footer.nav.ariaLabel', message: 'Footer'})}
              >
                {getNav().map(({to, label}) => (
                  <Link key={to} to={to}>
                    {label}
                  </Link>
                ))}
              </nav>

              <p className="footer-copy">
                <Translate
                  id="footer.copyright"
                  values={{year: YEAR}}
                  description="Footer copyright line; {year} is the build year">
                  {'Copyright © {year} Applied INtelligence (AIN) Lab; Led by Muhammad Syafrudin.'}
                </Translate>
                <br />
                <Translate
                  id="footer.builtWith"
                  values={{
                    credits: (
                      <Link to="/credits">
                        <Translate id="footer.builtWith.link">Docusaurus & others.</Translate>
                      </Link>
                    ),
                  }}>
                  {'Built with {credits} Assisted with 🤖.'}
                </Translate>{' '}
                <span>
                  <Translate id="footer.followUs">Follow us on</Translate>
                </span>
                <a
                  className="footer-social"
                  href="https://www.linkedin.com/company/ainlab"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
