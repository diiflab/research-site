import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CollabMap2D from '@site/src/components/CollabMap2D'

// Rich-text blocks are kept as JSX per locale (see MissionVision); locales
// without an entry fall back to English.
const CollaborateList = {
  en: [
    {
      title: 'Collaborate With Applied INtelligence (AIN) Lab',
      description: (
        <>
          <em>We welcome research partners, visiting scholars, and industry collaborators who share our vision of advancing AI for a sustainable and connected world.</em>

          <br/><br/>At AIN Lab, <b>collaboration is at the heart of everything we do.</b> We work across disciplines—from ML and intelligent systems to sustainability and DS—to build AI solutions that matter.
          <br/><br/>
          We actively collaborate with:
          <ul>
          <li><b>Universities and research institutes</b> on <Link to="/projects">joint projects</Link> and <Link to="/publications">publications.</Link></li>
          <li><b>Industry partners</b> seeking AI expertise in data analytics, and intelligent systems.</li>
          <li><b><Link to="/prospective">Students </Link>and <Link to="/alumni/#visiting-professorsresearchers">visiting researchers</Link></b> looking to learn, contribute, and grow in an innovative environment.</li>
          </ul>
  </>
      ),
    },
    {
      title: 'Collaborator Network Map',
      description: (
        <>
        <br/>
        <CollabMap2D minWorks={4} />
        <p className={styles.mapCaption}><em>Countries with 4+ co-authored works, live from our publication DOIs — or <Link to="/contact">contact us</Link> to join the map.</em></p>
        </>
      ),
    },
  ],
  ko: [
    {
      title: 'Applied INtelligence (AIN) Lab과 함께하세요',
      description: (
        <>
          <em>지속 가능하고 연결된 세상을 위한 AI 발전이라는 비전을 공유하는 연구 파트너, 방문 연구자, 산업계 협력자를 환영합니다.</em>

          <br/><br/>AIN Lab에서는 <b>협력이 모든 일의 중심입니다.</b> 머신러닝과 지능형 시스템부터 지속 가능성과 데이터 과학까지, 분야를 넘나들며 의미 있는 AI 솔루션을 만듭니다.
          <br/><br/>
          다음과 같은 분들과 활발히 협력하고 있습니다.
          <ul>
          <li><b>대학 및 연구기관</b>과의 <Link to="/projects">공동 프로젝트</Link> 및 <Link to="/publications">공동 논문</Link></li>
          <li>데이터 분석과 지능형 시스템 분야의 AI 전문성이 필요한 <b>산업계 파트너</b></li>
          <li>혁신적인 환경에서 배우고, 기여하고, 성장하고자 하는 <b><Link to="/prospective">학생</Link>과 <Link to="/alumni/#visiting-professorsresearchers">방문 연구자</Link></b></li>
          </ul>
  </>
      ),
    },
    {
      title: '협력 네트워크 지도',
      description: (
        <>
        <br/>
        <CollabMap2D minWorks={4} />
        <p className={styles.mapCaption}><em>논문 DOI를 기반으로 공동 저작 4편 이상인 국가를 실시간으로 표시합니다. 지도에 함께하고 싶다면 <Link to="/contact">연락해 주세요</Link>.</em></p>
        </>
      ),
    },
  ],
};

function Feature({ title, description }) {
  return (
    <div className={clsx('col col--6', styles.cardCol, 'reveal')}>
      <article className={styles.narrativeBlock}>
        <h2>{title}</h2>
        <div className={styles.narrativeBody}>{description}</div>
      </article>
      </div>
  );
}

export default function CollaborateWithUs() {
  const {i18n} = useDocusaurusContext();
  const list = CollaborateList[i18n.currentLocale] || CollaborateList.en;
  return (
    <section className={styles.features} id="CollaborateWithUs">
      <div className="container">
        <p className={styles.kicker}>
          <Translate id="home.collaborate.kicker">Partnership</Translate>
        </p>
        <h1 className="text--center">
          <Translate id="home.collaborate.title">Collaborate with us.</Translate>
        </h1>
        <p className="text--center">
          <em><Translate id="home.collaborate.subtitle">Academia, industry, and future researchers — together.</Translate></em>
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
