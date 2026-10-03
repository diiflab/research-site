import React from 'react';
import clsx from 'clsx';
import {useThemeConfig} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

// Locale-aware announcement bar. themeConfig.announcementBar.content is one
// raw HTML string (English) that i18n JSON can't translate, and its
// href="/…" links would always point at the English pages. This swizzle:
//   1. swaps in a translated string when one exists for the bar's `id`, and
//   2. prefixes root-relative hrefs with the locale's baseUrl ("/ko/").
//
// When you change the announcement, bump its `id` in docusaurus.config.js and
// add the translation here under the new id. Without one, the English
// content is shown (with locale-correct links).
const TRANSLATIONS = {
  gs2027: {
    ko: '📢 2027년 봄학기 대학원생을 모집합니다! 지원 접수는 10월 8일 오전 10시(KST)에 시작됩니다. <a href="/gs2027">모집 공고 보기 →</a>',
  },
};

export default function AnnouncementBarContent(props) {
  const {announcementBar} = useThemeConfig();
  const {siteConfig, i18n} = useDocusaurusContext();
  const raw = TRANSLATIONS[announcementBar.id]?.[i18n.currentLocale] ?? announcementBar.content;
  // baseUrl is "/" on the default locale and "/ko/" on Korean pages.
  const html = raw.replace(/href="\/(?!\/)/g, `href="${siteConfig.baseUrl}`);
  return (
    <div
      {...props}
      className={clsx(styles.content, props.className)}
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: html}}
    />
  );
}
