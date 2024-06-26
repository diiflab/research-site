import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Data',
    Svg: require('@site/static/img/undraw_mountain_learning.svg').default,
    description: (
      <>
        Internet of things, Radio-frequency identification (RFID), sensors, big data, etc.
      </>
    ),
  },
  {
    title: 'Intelligence',
    Svg: require('@site/static/img/undraw_react_learning.svg').default,
    description: (
      <>
        Artificial Intelligence, Machine Learning, Data Mining, Forecasting, Diagnosis, Prognosis, Traceability, etc.
      </>
    ),
  },
  {
    title: 'Informatics',
    Svg: require('@site/static/img/undraw_tree_learning.svg').default,
    description: (
      <>
       Application in many areas, such as healthcare, manufacturing, retail, e-commerce, supply chain, etc.
      </>
    ),
  },
  
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
