import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import MissionVision from '@site/src/components/MissionVision';
import RecentUpdates from '@site/src/components/RecentUpdates';
import FeaturedPapers from '@site/src/components/FeaturedPapers';
import CollaborateWithUs from '@site/src/components/CollaborateWithUs';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
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
            className="button button--md"
            to="publications">
            | Discover Our Research
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Applied INTelligence Lab (AINTLab) - Research together with Muhammad Syafrudin - AINTLab.com`}
      description="Applied INTelligence Lab (AINTLab) - 아인트랩 is not only a laboratory but also a playground to learn and explore the frontier of artificial intelligence, data science, and intelligent networks. We design AI-driven solutions that connect systems, enhance communication, and promote sustainability. Through collaboration across academia and industry, we aim to build technologies that shape a smarter, more connected world. AINTLab is a hub for learning and innovation in applied intelligence and IoT. Pioneering Artificial Intelligence research, AINTLab focuses on machine learning, deep learning, IoT, and self-supervised learning. Our expertise drives agricultural innovation, vessel detection, human action recognition, and predictive analytics, promoting sustainable agriculture and global food security. Explore our extensive collection of research publications on AI, machine learning, IoT, and sustainable agriculture, featuring groundbreaking work on transformer models, predictive analytics, and more. Applied INTelligence Lab (AINTLab), Department of Artificial Intelligence and Data Science, Sejong University, Seoul 05006, Republic of Korea, Lead by Muhammad Syafrudin.">
      <HomepageHeader />
      <main>
        <MissionVision />
        <HomepageFeatures />
        <CollaborateWithUs/>
        <FeaturedPapers/>
        <RecentUpdates />
      </main>
    </Layout>
  );
}
