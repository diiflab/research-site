import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

// Rich-text blocks (inline <b>/<em>/lists) are kept as JSX per locale rather
// than split into many <Translate> fragments — easier to read and to word
// naturally in each language. Locales without an entry fall back to English.
const MissionVisionList = {
  en: [
    {
      title: 'Our Mission',
      description: (
        <>
        Advance the science and application of <b>AI, machine learning, and data science</b> to create intelligent, sustainable, and interconnected systems — from smart cities and IoT to green computing.

        <br/><br/>Our research bridges theory and <b>real-world impact</b>, combining academic excellence with practical innovation.
        <br/><br/>
        <em>"Applied INtelligence (AIN) Lab is not just a lab — it's a playground for ideas, collaboration, and discovery."–</em>
        </>
      ),
    },
    {
      title: 'Our Vision',
      description: (
        <>
          A world where <b>intelligent systems enhance human life responsibly and sustainably</b> — a hub where curiosity meets purpose.
  <br/><br/>
  We are committed to:
  <br/>
          <ul>
          <li>Advancing <b>AI and intelligent systems</b> that are explainable and scalable.</li>
          <li>Building <b>collaborative bridges</b> across academia, industry, and research communities.</li>
          <li>Educating the next generation of <b>AI innovators</b>.</li>
          </ul>
        </>
      ),
    },
  ],
  ko: [
    {
      title: '미션',
      description: (
        <>
        <b>인공지능, 머신러닝, 데이터 과학</b>의 연구와 응용을 발전시켜 스마트 시티와 IoT부터 그린 컴퓨팅까지, 지능적이고 지속 가능하며 서로 연결된 시스템을 만듭니다.

        <br/><br/>우리의 연구는 학문적 탁월함과 실용적 혁신을 결합하여 이론과 <b>현실 세계의 임팩트</b>를 잇습니다.
        <br/><br/>
        <em>"Applied INtelligence (AIN) Lab은 단순한 연구실이 아니라 아이디어와 협력, 발견을 위한 놀이터입니다."–</em>
        </>
      ),
    },
    {
      title: '비전',
      description: (
        <>
          <b>지능형 시스템이 인간의 삶을 책임감 있고 지속 가능하게 향상시키는</b> 세상, 호기심이 목적을 만나는 허브를 지향합니다.
  <br/><br/>
  우리는 다음을 위해 노력합니다.
  <br/>
          <ul>
          <li>설명 가능하고 확장 가능한 <b>AI와 지능형 시스템</b>의 발전</li>
          <li>학계, 산업계, 연구 커뮤니티를 잇는 <b>협력의 다리</b> 구축</li>
          <li>차세대 <b>AI 혁신가</b> 양성</li>
          </ul>
        </>
      ),
    },
  ],
};

function Feature({ title, description }) {
  return (
    <div className={clsx('col col--6', styles.cardCol, 'reveal')}>
      <article className={styles.narrativeBlock}>
        <h2 className={styles.blockTitle}>{title}</h2>
        <div className={styles.blockContent}>{description}</div>
      </article>
    </div>
  );
}

export default function MissionVision() {
  const {i18n} = useDocusaurusContext();
  const list = MissionVisionList[i18n.currentLocale] || MissionVisionList.en;
  return (
    <section className={styles.features} id="mission">
      <div className="container">
        <p className={styles.kicker}>
          <Translate id="home.mission.kicker">Purpose</Translate>
        </p>
        <h1 className="text--center">
          <Translate id="home.mission.title">Mission & vision.</Translate>
        </h1>
        <p className="text--center">
          <em><Translate id="home.mission.subtitle">Where curiosity meets purpose.</Translate></em>
        </p>
        <div className="row">
          {list.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>

      </div>
    </section>
  );
}
