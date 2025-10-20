import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Data',
    Svg: require('@site/static/img/undraw_mountain_learning.svg').default,
    description: (
      <>
      <ul>
        <li><b>Sensor & multimodal inputs:</b> IoT sensors, images/3D scans, biosignals and multimodal fusion. </li>
        <li><b>Time-series & sequence streams:</b> Forecasting, fusion, sequence modelling pipelines. </li>
        <li><b>Representation & features:</b> Autoencoders, representation learning, transfer & pixel-level feature engineering. </li>
      </ul>
      </>
    ),
  },
  {
    title: 'Intelligence',
    Svg: require('@site/static/img/undraw_react_learning.svg').default,
    description: (
      <>
        <ul>
        <li><b>Deep & sequence learners + transformers:</b> CNNs, LSTM, hybrids, Tab/domain transformers and LLM methods.</li>
        <li><b>Ensembles & optimization:</b> Stacking/bagging/meta-ensembles, hyperparameter tuning and meta-heuristics. </li>
        <li><b>Explainability & structured models:</b> Explainable AI, graph-attention/graph methods, statistical & signal-fusion techniques.</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Applications',
    Svg: require('@site/static/img/undraw_tree_learning.svg').default,
    description: (
      <>
       <ul>
        <li><b>Health & human systems:</b> Medical diagnostics, physiological monitoring, pose/physiotherapy analysis.</li>
        <li><b>Agri / environment / energy:</b> Plant disease detection, crop & AQI forecasting, flood risk, battery SOH and energy forecasting. </li>
        <li><b>Industry & security:</b> Manufacturing, finance, cybersecurity / fraud detection.</li>
       </ul>
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
      <div className="padding-horiz--md">
        <h3 className="text--center">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h1 className="text--center">Research Area</h1>
        <p className="text--center"><em>AINTLab — applied ML, AI & DS for real-world decision support across data, intelligence, and applications.</em></p>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <hr className="fade-divider"/>
      </div>
    </section>
  );
}
