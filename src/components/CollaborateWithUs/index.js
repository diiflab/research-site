import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const MissionVisionList = [
  {
    title: 'Collaborate With AINTLab',
    description: (
      <>
        <em>We welcome research partners, visiting scholars, and industry collaborators who share our vision of advancing artificial intelligence for a sustainable and connected world.</em>

        <br/><br/>At AINTLab, <b>collaboration is at the heart of everything we do.</b> We work across disciplines—from machine learning and intelligent systems to sustainability and data science—to build AI solutions that matter.
        <br/><br/>
        We actively collaborate with:
        <ul>
        <li><b>Universities and research institutes</b> on joint projects and publications.</li>
        <li><b>Industry partners</b> seeking AI expertise in data analytics, IoT, and intelligent technologies.</li>
        <li><b>Students and visiting researchers</b> looking to learn, contribute, and grow in an innovative environment.</li>
        </ul>
        <em>If you are interested in collaborating with us, please <a href="/contact" target="_blank" rel="noopener noreferrer">contact us.</a></em>
</>
    ),
  },
  {
    title: 'Collaborator Network Map',
    description: (
      <>
        <em>Explore the collaboration map from the past five years.</em>
      <br/>
      <a href="https://sejong.elsevierpure.com/en/persons/muhammad-syafrudin/network-map#network-map-container" target="_blank" rel="noopener noreferrer"><img loading="lazy" src="/team/collaboration_map.png" class="img_ev3q"/></a>
      </>
    ),
  },
  
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--6')}>
      <div className="padding-horiz--md">
        <h3 className="text--center">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function MissionVision() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h1 className="text--center">Collaborate With Us</h1>
        <div className="row">
          {MissionVisionList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <hr className="fade-divider"/>
      </div>
    </section>
  );
}
