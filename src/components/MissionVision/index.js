import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const MissionVisionList = [
  {
    title: 'Our Mission',
    description: (
      <>
      At AINTLab , our mission is to advance the science and application of artificial intelligence (AI), machine learning (ML), and data science (DS) to create intelligent, sustainable, and interconnected systems for the future.

      <br/><br/>We explore the intersection of <b>AI, DS, and intelligent systems</b>, developing systems that empower people, improve efficiency, and address pressing global challenges — from smart cities and IoT to green computing and advanced AI.

      <br/><br/>Our research bridges theory and <b>real-world impact, combining academic excellence with practical innovation.</b>
      <br/><br/>
      <em>“AINTLab is not just a lab — it’s a playground for ideas, collaboration, and discovery.” (– Director, AINTLab)</em>
      </>
    ),
  },
  {
    title: 'Our Vision',
    description: (
      <>
        We envision a world where <b>intelligent systems enhance human life responsibly and sustainably</b>.
AINTLab aims to be a hub of interdisciplinary research and collaboration — where curiosity meets purpose, and where ideas grow into systems that shape tomorrow’s connected society.
<br/><br/>
We are committed to:
<br/>
        <ul>
        <li>Advancing <b>AI and intelligent systems</b> that are explainable, and scalable.</li>
        <li>Building <b>collaborative bridges</b> across academia, industry, and international research communities. </li>
        <li>Educating the next generation of <b>AI innovators</b> who think critically, act responsibly, and innovate boldly.</li>
        </ul>
      </>
    ),
  },
  
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--6')}>
      <div className="padding-horiz--md">
        <p><strong>{title}:</strong><br/>{description}</p>
      </div>
    </div>
  );
}

export default function MissionVision() {
  return (
    <section className={styles.features} id="mission">
      <div className="container">
        <h1 className="text--center">Our Mission & Vision</h1>
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
