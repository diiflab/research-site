import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

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
            Meet the team
          </Link>
          <Link
            className="button button--md"
            to="updates">
            Read recent updates
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
      description="Applied INTelligence Lab (AINTLab) - Research together with Muhammad Syafrudin - AINTLab.com - "AINTLab" is not only a laboratory but also a playground to learn and explore things related to applied intelligence and the internet of things. - Applied INTelligence Lab (AINTLab), Department of Artificial Intelligence and Data Science, Sejong University, Seoul 05006, Republic of Korea; Lead by Muhammad Syafrudin.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
