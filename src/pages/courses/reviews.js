import React, { useMemo, useState } from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import reviewsData from '@site/src/data/courses/reviews.json';
import styles from './reviews.module.css';

const getSortOptions = () => ({
  featured: translate({id: 'reviews.sort.featured', message: 'Featured'}),
  longest: translate({id: 'reviews.sort.longest', message: 'Longest First'}),
  shortest: translate({id: 'reviews.sort.shortest', message: 'Shortest First'}),
});

function getProjectMentions(reviews) {
  const keywords = ['project', 'practice', '실습', '과제'];
  return reviews.filter((review) => {
    const normalized = review.quote.toLowerCase();
    return keywords.some((keyword) => normalized.includes(keyword.toLowerCase()));
  }).length;
}

export default function ReviewsPage() {
  const [languageFilter, setLanguageFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = useMemo(() => {
    const total = reviewsData.length;
    const korean = reviewsData.filter((review) => review.language === 'ko').length;
    const english = reviewsData.filter((review) => review.language === 'en').length;
    const projectMentions = getProjectMentions(reviewsData);

    return {
      total,
      korean,
      english,
      projectMentions,
    };
  }, []);

  const visibleReviews = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filtered = reviewsData.filter((review) => {
      const languagePass = languageFilter === 'all' || review.language === languageFilter;
      const searchPass =
        normalizedSearch.length === 0 ||
        review.quote.toLowerCase().includes(normalizedSearch) ||
        review.focus.join(' ').toLowerCase().includes(normalizedSearch);

      return languagePass && searchPass;
    });

    if (sortBy === 'longest') {
      return [...filtered].sort((a, b) => b.quote.length - a.quote.length);
    }

    if (sortBy === 'shortest') {
      return [...filtered].sort((a, b) => a.quote.length - b.quote.length);
    }

    return filtered;
  }, [languageFilter, searchTerm, sortBy]);

  return (
    <Layout
      title={translate({id: 'reviews.meta.title', message: 'Reviews'})}
      description={translate({id: 'reviews.meta.description', message: 'Student testimonials from courses taught by Muhammad Syafrudin'})}>
      {/* container--fluid + page-shell matches the JSX-page pattern used by
          networks.jsx, so the courses pages get the same gutters as MDX pages. */}
      <main className="container container--fluid margin-vert--lg">
        <section className="section-with-bg-logo">
          <div className="page-shell">
          <div className="page-header">
            <p className="page-kicker"><Translate id="reviews.kicker">Student Voiceboard</Translate></p>
            <h1><Translate id="reviews.title">Reviews</Translate></h1>
            <p className="page-lead">
              <em>
                <Translate id="reviews.lead">
                  A curated collection of student feedback across semesters, focused on practical learning, mentorship quality, and course impact.
                </Translate>
              </em>
            </p>
          </div>

          <div className="page-quickfacts">
            <div className="page-quickfact reveal">
              <p className="page-quickfact-label"><Translate id="reviews.fact.total">Total Reviews</Translate></p>
              <p className="page-quickfact-value">{stats.total}</p>
            </div>
            <div className="page-quickfact reveal">
              <p className="page-quickfact-label"><Translate id="reviews.fact.languages">Korean / English</Translate></p>
              <p className="page-quickfact-value">
                {stats.korean} / {stats.english}
              </p>
            </div>
            <div className="page-quickfact reveal">
              <p className="page-quickfact-label"><Translate id="reviews.fact.mentions">Project + Practice Mentions</Translate></p>
              <p className="page-quickfact-value">{stats.projectMentions}</p>
            </div>
          </div>

          <div className="page-content">
            <div className={styles.controls}>
              <label className={styles.searchWrap}>
                <span><Translate id="reviews.search.label">Search</Translate></span>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder={translate({id: 'reviews.search.placeholder', message: 'Try: project, 실습, feedback'})}
                  aria-label={translate({id: 'reviews.search.ariaLabel', message: 'Search reviews'})}
                />
              </label>

              <div className={styles.languageToggle} role="group" aria-label={translate({id: 'reviews.filter.ariaLabel', message: 'Filter by language'})}>
                <button
                  type="button"
                  className={languageFilter === 'all' ? styles.activeButton : ''}
                  onClick={() => setLanguageFilter('all')}>
                  <Translate id="reviews.filter.all">All</Translate>
                </button>
                <button
                  type="button"
                  className={languageFilter === 'ko' ? styles.activeButton : ''}
                  onClick={() => setLanguageFilter('ko')}>
                  <Translate id="reviews.lang.ko">Korean</Translate>
                </button>
                <button
                  type="button"
                  className={languageFilter === 'en' ? styles.activeButton : ''}
                  onClick={() => setLanguageFilter('en')}>
                  <Translate id="reviews.lang.en">English</Translate>
                </button>
              </div>

              <label className={styles.sortWrap}>
                <span><Translate id="reviews.sort.label">Sort</Translate></span>
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                  {Object.entries(getSortOptions()).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <p className={styles.resultInfo}>
              {translate({id: 'reviews.results', message: 'Showing {shown} of {total} reviews.'}, {shown: visibleReviews.length, total: reviewsData.length})}
            </p>

            <div className={styles.reviewGrid}>
              {visibleReviews.map((review) => (
                <article key={review.id} className={styles.reviewCard}>
                  <div className={styles.cardTopRow}>
                    <span className={styles.languageBadge}>
                      {review.language === 'ko' ? translate({id: 'reviews.lang.ko', message: 'Korean'}) : translate({id: 'reviews.lang.en', message: 'English'})}
                    </span>
                    <span className={styles.idBadge}>#{review.id}</span>
                  </div>

                  <p className={styles.quoteMark}>“</p>
                  <p className={styles.quote}>{review.quote}</p>

                  <div className={styles.focusRow}>
                    {review.focus.map((item) => (
                      <span key={`${review.id}-${item}`} className={styles.focusTag}>
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}