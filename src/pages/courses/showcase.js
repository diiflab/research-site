import React, { useMemo, useState } from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import showcaseProjects from '@site/src/data/courses/showcaseProjects';
import styles from './showcase.module.css';

const getSortOptions = () => ({
  featured: translate({id: 'showcase.sort.featured', message: 'Featured'}),
  newest: translate({id: 'showcase.sort.newest', message: 'Newest First'}),
  az: translate({id: 'showcase.sort.az', message: 'A → Z'}),
});

export default function ShowcasePage() {
  const [courseFilter, setCourseFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');

  const courses = useMemo(() => {
    const set = new Set(showcaseProjects.map((p) => p.course));
    return Array.from(set).sort();
  }, []);

  const stats = useMemo(() => {
    const totalProjects = showcaseProjects.length;
    const totalCourses = new Set(showcaseProjects.map((p) => p.course)).size;
    const totalTools = new Set(showcaseProjects.flatMap((p) => p.tools)).size;
    return { totalProjects, totalCourses, totalTools };
  }, []);

  const visibleProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filtered = showcaseProjects.filter((project) => {
      const coursePass = courseFilter === 'all' || project.course === courseFilter;
      const searchPass =
        normalizedSearch.length === 0 ||
        project.title.toLowerCase().includes(normalizedSearch) ||
        project.team.toLowerCase().includes(normalizedSearch) ||
        project.description.toLowerCase().includes(normalizedSearch) ||
        project.tools.join(' ').toLowerCase().includes(normalizedSearch);
      return coursePass && searchPass;
    });

    if (sortBy === 'newest') {
      return [...filtered].sort((a, b) => b.id - a.id);
    }
    if (sortBy === 'az') {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }
    // featured first
    return [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }, [courseFilter, searchTerm, sortBy]);

  return (
    <Layout
      title={translate({id: 'showcase.meta.title', message: 'Showcase'})}
      description={translate({id: 'showcase.meta.description', message: 'Student project showcase from courses taught by Muhammad Syafrudin'})}>
      {/* container--fluid + page-shell matches the JSX-page pattern used by
          networks.jsx, so the courses pages get the same gutters as MDX pages. */}
      <main className="container container--fluid margin-vert--lg">
        <section className="section-with-bg-logo">
          <div className="page-shell">
          <div className="page-header">
            <p className="page-kicker"><Translate id="showcase.kicker">Student Projects</Translate></p>
            <h1><Translate id="showcase.title">Showcase</Translate></h1>
            <p className="page-lead">
              <em>
                <Translate id="showcase.lead">
                  Explore outstanding projects built by students across semesters — from web apps and dashboards to deep learning models and data pipelines.
                </Translate>
              </em>
            </p>
          </div>

          <div className="page-quickfacts">
            <div className="page-quickfact reveal">
              <p className="page-quickfact-label"><Translate id="showcase.fact.projects">Total Projects</Translate></p>
              <p className="page-quickfact-value">{stats.totalProjects}</p>
            </div>
            <div className="page-quickfact reveal">
              <p className="page-quickfact-label"><Translate id="showcase.fact.courses">Courses</Translate></p>
              <p className="page-quickfact-value">{stats.totalCourses}</p>
            </div>
            <div className="page-quickfact reveal">
              <p className="page-quickfact-label"><Translate id="showcase.fact.tools">Tools & Technologies</Translate></p>
              <p className="page-quickfact-value">{stats.totalTools}</p>
            </div>
          </div>

          <div className="page-content">
            <div className={styles.controls}>
              <label className={styles.searchWrap}>
                <span><Translate id="reviews.search.label">Search</Translate></span>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={translate({id: 'showcase.search.placeholder', message: 'Try: dashboard, React, deep learning'})}
                  aria-label={translate({id: 'showcase.search.ariaLabel', message: 'Search projects'})}
                />
              </label>

              <label className={styles.courseWrap}>
                <span><Translate id="showcase.filter.course">Course</Translate></span>
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}>
                  <option value="all">{translate({id: 'showcase.filter.all', message: 'All Courses'})}</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.sortWrap}>
                <span><Translate id="reviews.sort.label">Sort</Translate></span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  {Object.entries(getSortOptions()).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <p className={styles.resultInfo}>
              {translate({id: 'showcase.results', message: 'Showing {shown} of {total} projects.'}, {shown: visibleProjects.length, total: showcaseProjects.length})}
            </p>

            <div className={styles.projectGrid}>
              {visibleProjects.map((project) => (
                <article key={project.id} className={styles.projectCard}>
                  <div className={styles.screenshotWrap}>
                    <img
                      src={project.screenshot}
                      alt={translate({id: 'showcase.screenshotAlt', message: '{title} screenshot'}, {title: project.title})}
                      className={styles.screenshot}
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className={styles.screenshotFallback} style={{ display: 'none' }}>
                      <span>📸</span>
                      <p><Translate id="showcase.screenshotSoon">Screenshot coming soon</Translate></p>
                    </div>
                    {project.featured && (
                      <span className={styles.featuredBadge}>★ <Translate id="showcase.featured">Featured</Translate></span>
                    )}
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
                      <span className={styles.courseBadge}>{project.course}</span>
                      <span className={styles.semesterBadge}>{project.semester}</span>
                    </div>

                    <h3 className={styles.projectTitle}>{project.title}</h3>

                    <p className={styles.teamName}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      {project.team}
                    </p>

                    <p className={styles.description}>{project.description}</p>

                    <div className={styles.toolsRow}>
                      {project.tools.map((tool) => (
                        <span key={`${project.id}-${tool}`} className={styles.toolTag}>
                          {tool}
                        </span>
                      ))}
                    </div>
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
