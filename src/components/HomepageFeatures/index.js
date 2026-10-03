import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import clsx from 'clsx';
import styles from './styles.module.css';


// Built per render so translate() resolves against the active locale.
const getFeatureList = () => [
  {
    title: translate({id: 'home.areas.0.title', message: 'Data'}),
    Svg: require('@site/static/img/undraw_mountain_learning.svg').default,
    items: [
      {
        label: translate({id: 'home.areas.0.item0.label', message: 'Sensor & multimodal inputs'}),
        detail: translate({id: 'home.areas.0.item0.detail', message: 'IoT sensors, images/3D scans, biosignals and multimodal fusion.'}),
      },
      {
        label: translate({id: 'home.areas.0.item1.label', message: 'Time-series & sequence streams'}),
        detail: translate({id: 'home.areas.0.item1.detail', message: 'Forecasting, fusion, sequence modelling pipelines.'}),
      },
      {
        label: translate({id: 'home.areas.0.item2.label', message: 'Representation & features'}),
        detail: translate({id: 'home.areas.0.item2.detail', message: 'Autoencoders, representation learning, transfer & pixel-level feature engineering.'}),
      },
    ],
  },
  {
    title: translate({id: 'home.areas.1.title', message: 'Intelligence'}),
    Svg: require('@site/static/img/undraw_react_learning.svg').default,
    items: [
      {
        label: translate({id: 'home.areas.1.item0.label', message: 'Deep & sequence learners + transformers'}),
        detail: translate({id: 'home.areas.1.item0.detail', message: 'CNNs, LSTM, hybrids, Tab/domain transformers and LLM methods.'}),
      },
      {
        label: translate({id: 'home.areas.1.item1.label', message: 'Ensembles & optimization'}),
        detail: translate({id: 'home.areas.1.item1.detail', message: 'Stacking/bagging/meta-ensembles, hyperparameter tuning and meta-heuristics.'}),
      },
      {
        label: translate({id: 'home.areas.1.item2.label', message: 'Explainability & structured models'}),
        detail: translate({id: 'home.areas.1.item2.detail', message: 'Explainable AI, graph-attention/graph methods, statistical & signal-fusion techniques.'}),
      },
    ],
  },
  {
    title: translate({id: 'home.areas.2.title', message: 'Applications'}),
    Svg: require('@site/static/img/undraw_tree_learning.svg').default,
    items: [
      {
        label: translate({id: 'home.areas.2.item0.label', message: 'Health & human systems'}),
        detail: translate({id: 'home.areas.2.item0.detail', message: 'Medical diagnostics, physiological monitoring, pose/physiotherapy analysis.'}),
      },
      {
        label: translate({id: 'home.areas.2.item1.label', message: 'Agri / environment / energy'}),
        detail: translate({id: 'home.areas.2.item1.detail', message: 'Plant disease detection, crop & AQI forecasting, flood risk, battery SOH and energy forecasting.'}),
      },
      {
        label: translate({id: 'home.areas.2.item2.label', message: 'Industry & security'}),
        detail: translate({id: 'home.areas.2.item2.detail', message: 'Manufacturing, finance, cybersecurity / fraud detection.'}),
      },
    ],
  },
  
];

function Feature({Svg, title, items}) {
  return (
    <div className={clsx('col col--4', styles.cardCol, 'reveal')}>
      <article className={styles.card}>
      <div className={styles.iconWrap}>
        <Svg loading="lazy" className={styles.featureSvg} aria-hidden="true" />
      </div>
      <div>
        <h2 className={styles.cardTitle}>{title}</h2>
        <div className={styles.cardBody}>
          <ul className={styles.detailList}>
            {items.map((item) => (
              <li key={item.detail} className={styles.detailItem}>
                <details className={styles.detailDisclosure}>
                  <summary>{item.label}</summary>
                  <p>{item.detail}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </article>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features} id="ResearchArea">
      <div className="container">
        <p className={styles.kicker}>
          <Translate id="home.areas.kicker">Core domains</Translate>
        </p>
        <h1 className="text--center">
          <Translate id="home.areas.title">Research areas.</Translate>
        </h1>
        <p className="text--center">
          <em><Translate id="home.areas.subtitle">From raw data to applied intelligence.</Translate></em>
        </p>
        <div className="row">
          {getFeatureList().map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
