import React, { useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';
import { studentReviews } from '@site/src/data/courses/studentReviews';
import styles from './styles.module.css';

function ReviewCard({ review, isActive }) {
  return (
    <div
      className={clsx(styles.reviewCard, isActive && styles.active)}
      aria-hidden={!isActive}>
      <div className={styles.quoteIcon}>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6,17C6,15 4,10.5 4,6C4,4.5 4.5,4 6,4V2C3.5,2 2,3.5 2,6C2,11.5 4,16 6,17M18,17C18,15 16,10.5 16,6C16,4.5 16.5,4 18,4V2C15.5,2 14,3.5 14,6C14,11.5 16,16 18,17"/>
        </svg>
      </div>

      <div className={styles.reviewContent}>
        <p className={styles.reviewText}>{review.reviewText}</p>

        <div className={styles.reviewMeta}>
          <div className={styles.courseInfo}>
            <span className={styles.courseName}>{review.courseName}</span>
            <span className={styles.semester}>{review.semester} {review.year}</span>
          </div>
          <div className={styles.studentName}>{review.studentName}</div>
        </div>
      </div>
    </div>
  );
}

function NavigationDots({ currentIndex, totalReviews, onDotClick }) {
  return (
    <div className={styles.navigationDots}>
      {Array.from({ length: totalReviews }, (_, index) => (
        <button
          key={index}
          type="button"
          className={clsx(styles.dot, index === currentIndex && styles.activeDot)}
          onClick={() => onDotClick(index)}
          aria-label={`Go to review ${index + 1}`}
          aria-current={index === currentIndex} />
      ))}
    </div>
  );
}

export default function StudentReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  // `paused` is user/interaction intent; `hovered` pauses while pointing at the
  // slider; `reducedMotion` disables auto-advance entirely.
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const resumeTimer = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Honour prefers-reduced-motion — no auto-advancing content for opted-out
  // users. They still get the arrows and dots to browse at their own pace.
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReducedMotion(motionQuery.matches);
    apply();
    motionQuery.addEventListener('change', apply);
    return () => motionQuery.removeEventListener('change', apply);
  }, []);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  const advance = useCallback(() => {
    setCurrentIndex((prev) => (prev === studentReviews.length - 1 ? 0 : prev + 1));
  }, []);

  // Auto-advance only when nothing says otherwise.
  const autoPlaying = !paused && !reducedMotion;
  useEffect(() => {
    if (!autoPlaying || hovered) return undefined;
    const interval = setInterval(advance, isMobile ? 8000 : 6000);
    return () => clearInterval(interval);
  }, [autoPlaying, hovered, isMobile, advance]);

  // A manual nav interaction pauses briefly, then auto-play resumes.
  const pauseTemporarily = () => {
    setPaused(true);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), isMobile ? 15000 : 10000);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    pauseTemporarily();
  };

  const handlePrevClick = () => {
    setCurrentIndex((prev) => (prev === 0 ? studentReviews.length - 1 : prev - 1));
    pauseTemporarily();
  };

  const handleNextClick = () => {
    advance();
    pauseTemporarily();
  };

  // The explicit pause/play toggle — the WCAG 2.2.2 mechanism to stop motion.
  const togglePlay = () => {
    clearTimeout(resumeTimer.current);
    setPaused((prev) => !prev);
  };

  return (
    <section className={styles.reviewsSection}>
      <div className="container">
        {/* Same kicker / period-terminated h1 / italic lead as every other
            section on this page and on the research homepage. */}
        <div className={styles.reviewsHeader}>
          <p className={clsx(styles.reviewsEyebrow, 'text--center')}>Student voices</p>
          <h1 className="text--center">What students say.</h1>
          <p className="text--center">
            <em>Feedback from across semesters, in the students&rsquo; own words.</em>
          </p>
        </div>

        <div
          className={styles.reviewsSlider}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}>
          {!isMobile && (
            <button
              type="button"
              className={clsx(styles.navButton, styles.prevButton)}
              onClick={handlePrevClick}
              aria-label="Previous review">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/>
              </svg>
            </button>
          )}

          <div
            className={styles.reviewsContainer}
            role="group"
            aria-roledescription="carousel"
            aria-label="Student reviews">
            <div
              className={styles.reviewsTrack}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {studentReviews.map((review, index) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  isActive={index === currentIndex} />
              ))}
            </div>
          </div>

          {!isMobile && (
            <button
              type="button"
              className={clsx(styles.navButton, styles.nextButton)}
              onClick={handleNextClick}
              aria-label="Next review">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
              </svg>
            </button>
          )}
        </div>

        <NavigationDots
          currentIndex={currentIndex}
          totalReviews={studentReviews.length}
          onDotClick={handleDotClick} />

        {/* Real button, not decoration — lets anyone stop the auto-advance.
            Hidden under reduced motion, where nothing auto-advances anyway. */}
        {!reducedMotion && (
          <button
            type="button"
            className={styles.autoPlayToggle}
            onClick={togglePlay}
            aria-pressed={paused}
            aria-label={autoPlaying ? 'Pause automatic review rotation' : 'Resume automatic review rotation'}>
            <span className={clsx(styles.playIcon, autoPlaying && styles.playing)}>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                {autoPlaying ? (
                  <path d="M14,19.14H18V5.14H14M6,19.14H10V5.14H6V19.14Z" />
                ) : (
                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                )}
              </svg>
            </span>
            <span className={styles.autoPlayText}>
              {autoPlaying ? 'Pause' : 'Play'}
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
