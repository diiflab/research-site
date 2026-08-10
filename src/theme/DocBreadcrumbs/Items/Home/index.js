import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {translate} from '@docusaurus/Translate';
import IconHome from '@theme/Icon/Home';
import styles from './styles.module.css';

// Swizzled from theme-classic. The only docs instance on this site is the
// course catalog, mounted at /courses/learn, so its breadcrumb "home" should
// return to the Courses overview (/courses) — not the research-site root (/),
// which is where the stock component points via useBaseUrl('/').
export default function HomeBreadcrumbItem() {
  const coursesHref = useBaseUrl('/courses');
  return (
    <li className="breadcrumbs__item">
      <Link
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.home',
          message: 'Courses home',
          description: 'The ARIA label for the courses home in the breadcrumbs',
        })}
        className="breadcrumbs__link"
        href={coursesHref}>
        <IconHome className={styles.breadcrumbHomeIcon} />
      </Link>
    </li>
  );
}
