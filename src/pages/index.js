import React from 'react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import MissionVision from '@site/src/components/MissionVision';
import RecentUpdates from '@site/src/components/RecentUpdates';
import FeaturedPapers from '@site/src/components/FeaturedPapers';
import CollaborateWithUs from '@site/src/components/CollaborateWithUs';
import backgroundVideo from '../assets/background.mp4';
import backgroundImg from '../assets/background.webp';

import styles from './index.module.css';


function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
    <video
        autoPlay
        loop
        muted
        playsInline
        className="background-video" 
      >
        <source src={backgroundVideo} type="video/mp4" alt={siteConfig.tagline}/>
        <img src={backgroundImg} alt={siteConfig.tagline} /> 
      </video>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary"
            to="team">
            Meet the Team 
          </Link>
          <Link
            className="button white-btn"
            to="#CollaborateWithUs">
            | Collaborate with Us
          </Link>
        </div>
      </div>
    </header>
  );
}

function AcademicGenealogy() {
  const {siteConfig} = useDocusaurusContext();
  const Svg = require('../assets/directortree_desktop.svg').default
   return (
    <section className={styles.academic} id="AcademicGenealogy">
      <div className="container">
        <h1 className="text--center">Academic Genealogy</h1>
        <div className="row">
          <div className={clsx('col col--12')}>
            <div className="text--center">
              <Svg loading="lazy" className={styles.featureSvg} alt="AINTLab - Research Area" role="img" />
            </div>
          </div>
        </div>
        <hr className="fade-divider"/>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <AcademicGenealogy />
        <MissionVision />
        <HomepageFeatures />
        <CollaborateWithUs/>
        <FeaturedPapers/>
        <RecentUpdates />
      </main>
    </Layout>
  );
}
