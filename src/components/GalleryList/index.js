import React, {useMemo, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, {translate} from '@docusaurus/Translate';
import {PhotoProvider, PhotoView} from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import galleryData from '@site/src/data/gallery.json';
import styles from './styles.module.css';

// Display label for a gallery category value; unknown values pass through.
const categoryLabel = (category) => ({
  general: translate({id: 'gallery.category.general', message: 'General'}),
  community: translate({id: 'gallery.category.community', message: 'community'}),
  book: translate({id: 'gallery.category.book', message: 'book'}),
  research: translate({id: 'gallery.category.research', message: 'research'}),
  award: translate({id: 'gallery.category.award', message: 'award'}),
}[category] || category);

export default function GalleryList() {
  const {i18n} = useDocusaurusContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const normalizedData = useMemo(
    () =>
      galleryData.map((item, index) => ({
        id: `${item.year}-${index + 1}`,
        ...item,
        // Per-locale overrides (gallery.json "ko": {title, description, date}).
        ...(item[i18n.currentLocale] || {}),
      })),
    [i18n.currentLocale],
  );

  const categories = useMemo(() => {
    const unique = new Set(normalizedData.map((item) => item.category).filter(Boolean));
    return ['all', ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
  }, [normalizedData]);

  const categoryStats = useMemo(() => {
    return categories.reduce((acc, category) => {
      if (category === 'all') {
        acc.all = normalizedData.length;
      } else {
        acc[category] = normalizedData.filter((item) => item.category === category).length;
      }
      return acc;
    }, {});
  }, [categories, normalizedData]);

  const displayedItems = useMemo(() => {
    let result = normalizedData;

    if (categoryFilter !== 'all') {
      result = result.filter((item) => item.category === categoryFilter);
    }

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          String(item.year).includes(query) ||
          (item.category || '').toLowerCase().includes(query),
      );
    }

    const sorted = [...result];
    if (sortBy === 'featured') {
      sorted.sort((a, b) => {
        const aFeatured = a.featured ? 1 : 0;
        const bFeatured = b.featured ? 1 : 0;
        return bFeatured - aFeatured || b.year - a.year || b.date.localeCompare(a.date);
      });
    } else if (sortBy === 'year-desc') {
      sorted.sort((a, b) => b.year - a.year || b.date.localeCompare(a.date));
    } else if (sortBy === 'year-asc') {
      sorted.sort((a, b) => a.year - b.year || a.date.localeCompare(b.date));
    } else {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    return sorted;
  }, [categoryFilter, normalizedData, searchTerm, sortBy]);

  const stats = useMemo(() => {
    const years = normalizedData.map((item) => item.year);
    const uniqueYears = new Set(years);
    return {
      total: normalizedData.length,
      years: uniqueYears.size,
      latest: years.length ? Math.max(...years) : '-',
    };
  }, [normalizedData]);

  return (
    <div className={styles.galleryShell}>
      <div className={styles.galleryMetrics} style={{ display: 'none' }}>
        <div className={`${styles.metricCard} reveal`}>
          <p className={styles.metricLabel}><Translate id="gallery.metric.total">Total Items</Translate></p>
          <p className={styles.metricValue}>{stats.total}</p>
        </div>
        <div className={`${styles.metricCard} reveal`}>
          <p className={styles.metricLabel}><Translate id="gallery.metric.years">Year Coverage</Translate></p>
          <p className={styles.metricValue}>{stats.years}</p>
        </div>
        <div className={`${styles.metricCard} reveal`}>
          <p className={styles.metricLabel}><Translate id="gallery.metric.latest">Latest Year</Translate></p>
          <p className={styles.metricValue}>{stats.latest}</p>
        </div>
      </div>

      <div className={styles.controls}>
        {/* Search */}
        <div className={styles.searchBox}>
          <input
            type="text"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={translate({id: 'gallery.search.placeholder', message: 'Search gallery by title, description, or year...'})}
            aria-label={translate({id: 'gallery.search.ariaLabel', message: 'Search gallery'})}
          />
        </div>

        {/* Filter and Sort */}
        <div className={styles.filterSort}>
          <div className={styles.filterGroup}>
            <label><Translate id="gallery.filter.category">Category:</Translate></label>
            <select
              className={styles.select}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label={translate({id: 'gallery.filter.ariaLabel', message: 'Filter gallery by category'})}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all'
                    ? translate({id: 'gallery.filter.all', message: 'All ({n})'}, {n: categoryStats.all || 0})
                    : `${categoryLabel(category)} (${categoryStats[category] || 0})`}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label><Translate id="gallery.sort.label">Sort by:</Translate></label>
            <select
              className={styles.select}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label={translate({id: 'gallery.sort.ariaLabel', message: 'Sort gallery'})}
            >
              <option value="featured">{translate({id: 'gallery.sort.featured', message: 'Featured First'})}</option>
              <option value="year-desc">{translate({id: 'gallery.sort.yearDesc', message: 'Year (Newest)'})}</option>
              <option value="year-asc">{translate({id: 'gallery.sort.yearAsc', message: 'Year (Oldest)'})}</option>
              <option value="title-asc">{translate({id: 'gallery.sort.titleAsc', message: 'Title (A-Z)'})}</option>
            </select>
          </div>
        </div>
      </div>

      <p className={styles.resultSummary}>
        <Translate
          id="gallery.results"
          values={{shown: <strong>{displayedItems.length}</strong>, total: <strong>{stats.total}</strong>}}>
          {'Showing {shown} of {total} items.'}
        </Translate>
      </p>

      <PhotoProvider
        overlayRender={({index}) => {
          const currentItem = displayedItems[index ?? 0];
          if (!currentItem) {
            return null;
          }

          return (
            <div className={styles.lightboxCaption}>
              <h3>{currentItem.title}</h3>
              <p>{currentItem.description}</p>
              <p className={styles.lightboxMeta}>
                {categoryLabel(currentItem.category || 'general')} - {currentItem.year} - {currentItem.date}
                {currentItem.featured ? ` - ${translate({id: 'gallery.featured', message: 'Featured'})}` : ''}
              </p>
            </div>
          );
        }}
      >
        <div className={styles.galleryGrid}>
          {displayedItems.map((item) => (
            <article
              key={item.id}
              className={`${styles.galleryCard} reveal ${item.featured ? styles.featuredCard : ''}`}
            >
              <PhotoView src={item.image}>
                <button
                  type="button"
                  className={styles.imageButton}
                  aria-label={translate({id: 'gallery.openImage', message: 'Open image: {title}'}, {title: item.title})}
                >
                  <div className={styles.imageWrap}>
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </div>

                  <div className={styles.cardOverlay}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p className={styles.overlayMeta}>
                      {categoryLabel(item.category || 'general')} · {item.year} · {item.date}
                      {item.featured ? ` · ${translate({id: 'gallery.featured', message: 'Featured'})}` : ''}
                    </p>
                  </div>
                </button>
              </PhotoView>
            </article>
          ))}
        </div>
      </PhotoProvider>
    </div>
  );
}
