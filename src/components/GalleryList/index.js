import React, {useMemo, useState} from 'react';
import galleryData from '@site/src/data/gallery.json';
import styles from './styles.module.css';

export default function GalleryList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const normalizedData = useMemo(
    () =>
      galleryData.map((item, index) => ({
        id: `${item.year}-${index + 1}`,
        ...item,
      })),
    [],
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
      <div className={styles.galleryMetrics}>
        <div className={styles.metricCard}>
          <p className={styles.metricLabel}>Total Items</p>
          <p className={styles.metricValue}>{stats.total}</p>
        </div>
        <div className={styles.metricCard}>
          <p className={styles.metricLabel}>Year Coverage</p>
          <p className={styles.metricValue}>{stats.years}</p>
        </div>
        <div className={styles.metricCard}>
          <p className={styles.metricLabel}>Latest Year</p>
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
            placeholder="Search gallery by title, description, or year..."
            aria-label="Search gallery"
          />
        </div>

        {/* Filter and Sort */}
        <div className={styles.filterSort}>
          <div className={styles.filterGroup}>
            <label>Category:</label>
            <select
              className={styles.select}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label="Filter gallery by category"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all'
                    ? `All (${categoryStats.all || 0})`
                    : `${category} (${categoryStats[category] || 0})`}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Sort by:</label>
            <select
              className={styles.select}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort gallery"
            >
              <option value="featured">Featured First</option>
              <option value="year-desc">Year (Newest)</option>
              <option value="year-asc">Year (Oldest)</option>
              <option value="title-asc">Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      <p className={styles.resultSummary}>
        Showing <strong>{displayedItems.length}</strong> of <strong>{stats.total}</strong> item
        {stats.total !== 1 ? 's' : ''}.
      </p>

      <div className={styles.galleryGrid}>
        {displayedItems.map((item) => (
          <article key={item.id} className={styles.galleryCard}>
            <div className={styles.imageWrap}>
              <img src={item.image} alt={item.title} loading="lazy" />
              {item.featured && <span className={styles.featuredBadge}>Featured</span>}
              <span className={styles.categoryBadge}>{item.category || 'General'}</span>
              <span className={styles.yearBadge}>{item.year}</span>
            </div>
            <div className={styles.cardBody}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p className={styles.dateMeta}>{item.date}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
