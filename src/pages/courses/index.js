import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import StudentReviews from '@site/src/components/courses/StudentReviews';
import {calculateStats} from '@site/src/data/courses/teachingStats';

import styles from './index.module.css';

// Live figures from the course evaluation data
// (src/data/courses/teachingStats.js).
const stats = calculateStats();

// Built per render so translate() resolves against the active locale.
const getTeachingStats = () => [
  {
    value: `${stats.yearsExperience}+`,
    label: translate({id: 'courses.stats.years.label', message: 'Years teaching'}),
    detail: translate({id: 'courses.stats.years.detail', message: 'Lecturing across universities.'}),
    to: '/courses/learn',
  },
  {
    value: `${stats.totalCourses}`,
    label: translate({id: 'courses.stats.offerings.label', message: 'Course offerings'}),
    detail: translate({id: 'courses.stats.offerings.detail', message: 'Semester by semester, from 2019 to the present.'}),
    to: '/courses/learn',
  },
  {
    value: `${stats.totalStudents}+`,
    label: translate({id: 'courses.stats.students.label', message: 'Students taught'}),
    detail: translate({id: 'courses.stats.students.detail', message: 'Undergraduate and graduate courses.'}),
    to: '/courses/learn',
  },
  {
    value: `${stats.averageEvaluation}`,
    label: translate({id: 'courses.stats.rating.label', message: 'Average rating'}),
    detail: translate({id: 'courses.stats.rating.detail', message: 'Out of 5.0, from official course evaluations.'}),
    to: '/courses/reviews',
  },
];

// The three ideas the courses are built on. Content comes from the former
// courses site's feature cards, reduced to the pillar form the research
// homepage uses for the same job.
const getCoursePillars = () => [
  {
    title: translate({id: 'courses.why.pillar1.title', message: 'Industry-focused learning'}),
    description: translate({id: 'courses.why.pillar1.description', message: 'Curriculum built with industry practice in mind, so the tools and methods are the ones used in production.'}),
  },
  {
    title: translate({id: 'courses.why.pillar2.title', message: 'Project-based mastery'}),
    description: translate({id: 'courses.why.pillar2.description', message: 'Every course centres on building something real — complete applications, actual debugging, the full development cycle.'}),
  },
  {
    title: translate({id: 'courses.why.pillar3.title', message: 'A progressive path'}),
    description: translate({id: 'courses.why.pillar3.description', message: 'Foundations first, then advanced work, with clear milestones so each module builds on the last.'}),
  },
];

function CoursesHero() {
  const videoRef = React.useRef(null);

  // Respect prefers-reduced-motion: the 6 MB welcome clip should not autoplay
  // or loop for visitors who opt out of motion. Playback is driven from here
  // (not the autoPlay attribute) so it never starts for them — they get the
  // first frame as a still image via preload="metadata".
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const apply = () => {
      if (motionQuery.matches) {
        video.loop = false;
        video.pause();
      } else {
        video.loop = true;
        const started = video.play();
        if (started && typeof started.catch === 'function') {
          started.catch(() => {});
        }
      }
    };

    apply();
    motionQuery.addEventListener('change', apply);
    return () => motionQuery.removeEventListener('change', apply);
  }, []);

  return (
    <header id="hero" className={clsx('hero hero--primary', styles.heroBanner)}>
      {/* Sits where Hero3D sits on the research homepage, so the global .hero
          scrim and bottom-anchored type treatment apply unchanged. Playback is
          started in the effect above so prefers-reduced-motion is honoured. */}
      <video
        ref={videoRef}
        className={styles.heroVideo}
        src="/courses/welcome.mp4"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className={clsx('container', styles.heroContent)}>
        <h1 className="hero__title"><Translate id="courses.hero.title">Begin your learning journey.</Translate></h1>
        <p className="hero__subtitle">
          <Translate id="courses.hero.subtitle">
            Courses in programming, data, and machine learning — learn by building, and grow together.
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link className="button button--secondary" to="/courses/learn">
            <Translate id="courses.hero.explore">Explore courses</Translate>
          </Link>
          <Link className="button white-btn" to="/courses/reviews">
            <Translate id="courses.hero.reviews">Read student reviews</Translate>
          </Link>
        </div>
      </div>
      <a className={styles.scrollCue} href="#teaching-numbers" aria-label={translate({id: 'home.hero.scrollCue', message: 'Scroll to explore'})}>
        <span className={styles.scrollCueChevron} aria-hidden="true" />
      </a>
    </header>
  );
}

function TeachingNumbers() {
  return (
    <section
      id="teaching-numbers"
      className={`${styles.numbersSection} section-with-bg-text bg-text--teaching`}>
      <div className="container">
        <p className={clsx(styles.kicker, 'text--center')}><Translate id="home.stats.kicker">Impact</Translate></p>
        <h1 className="text--center"><Translate id="courses.stats.title">By the numbers.</Translate></h1>
        <div className={styles.statMetrics}>
          {getTeachingStats().map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className={clsx(styles.statMetric, styles.statLink, 'reveal')}>
              <div className={styles.statValue}>{item.value}</div>
              <h2 className={styles.statLabel}>{item.label}</h2>
              <p className={styles.statDetail}>{item.detail}</p>
            </Link>
          ))}
        </div>
        <p className={styles.statsFootnote}>
          <Translate id="courses.stats.footnote">
            Calculated from official course evaluations and enrolment data since 2019.
          </Translate>
        </p>
      </div>
    </section>
  );
}

function WhyLearnHere() {
  return (
    <section
      id="why-learn-here"
      className={`${styles.whySection} section-with-bg-text bg-text--learning`}>
      <div className="container">
        <p className={clsx(styles.kicker, 'text--center')}><Translate id="courses.why.kicker">Approach</Translate></p>
        <h1 className="text--center"><Translate id="courses.why.title">Why learn here.</Translate></h1>
        <p className="text--center">
          <em><Translate id="courses.why.subtitle">Practical, hands-on, and built to carry into real work.</Translate></em>
        </p>
        <div className={styles.pillarList}>
          {getCoursePillars().map((pillar, i) => (
            <div key={i} className={clsx(styles.pillarItem, 'reveal')}>
              <h2>{pillar.title}</h2>
              <p>{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StartLearning() {
  return (
    <section
      id="start-learning"
      className={`${styles.ctaSection} section-with-bg-text bg-text--future`}>
      <div className="container">
        <div className={clsx(styles.ctaCard, 'reveal')}>
          <p className={styles.kicker}><Translate id="courses.cta.kicker">Get started</Translate></p>
          <h1><Translate id="courses.cta.title">Ready to start learning?</Translate></h1>
          <p>
            <Translate id="courses.cta.description">
              Browse the full catalog, see what students have built, or read how the courses are taught.
            </Translate>
          </p>
          <div className={styles.ctaActions}>
            <Link className="button button--primary button--lg" to="/courses/learn">
              <Translate id="courses.cta.catalog">Browse the catalog</Translate>
            </Link>
            <Link className="button cta-secondary-btn button--lg" to="/courses/about">
              <Translate id="courses.cta.about">How these courses work</Translate>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CoursesHome() {
  return (
    <Layout
      title={translate({id: 'courses.meta.title', message: 'Courses'})}
      description={translate({id: 'courses.meta.description', message: 'Courses in programming, data, and machine learning, taught by Muhammad Syafrudin.'})}>
      <CoursesHero />
      <main>
        <TeachingNumbers />
        <WhyLearnHere />
        <section id="student-voices" className="section-with-bg-text bg-text--success">
          <StudentReviews />
        </section>
        <StartLearning />
      </main>
    </Layout>
  );
}
