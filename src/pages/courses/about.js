import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import styles from './about.module.css';

// Belief cards mix plain text with highlighted phrases, so each locale keeps
// its own JSX (locales without an entry fall back to English).
const BELIEFS = {
  en: (h) => [
    <>Universities are primarily {h('educational')}{' '}institutions.</>,
    <>Teaching and {h('learning')} should come before research output.</>,
    <>The most effective method is{' '}{h('learning by doing')}.</>,
    <>Students should actively join{' '}{h('practical research')} and real-world projects.</>,
    <>We run many projects while focusing on{' '}{h('practical')} applications.</>,
    <>Continuous guidance and collaboration help students grow with confidence.</>,
  ],
  ko: (h) => [
    <>대학은 무엇보다 {h('교육')} 기관입니다.</>,
    <>{h('가르침과 배움')}이 연구 성과보다 우선해야 합니다.</>,
    <>가장 효과적인 방법은 {h('직접 해 보며 배우는 것')}입니다.</>,
    <>학생들은 {h('실용적인 연구')}와 실제 프로젝트에 적극적으로 참여해야 합니다.</>,
    <>우리는 {h('실용적인')} 응용에 집중하며 다양한 프로젝트를 수행합니다.</>,
    <>지속적인 지도와 협력은 학생들이 자신감을 갖고 성장하도록 돕습니다.</>,
  ],
};

export default function AboutPage() {
  const {i18n} = useDocusaurusContext();
  const highlight = (text) => <span className={styles.highlight}>{text}</span>;
  const beliefs = (BELIEFS[i18n.currentLocale] || BELIEFS.en)(highlight);
  return (
    <Layout
      title={translate({id: 'courses.about.meta.title', message: 'About'})}
      description={translate({id: 'courses.about.meta.description', message: 'About courses and learning philosophy'})}>
      {/* container--fluid + page-shell matches the JSX-page pattern used by
          networks.jsx, so the courses pages get the same gutters as MDX pages. */}
      <main className="container container--fluid margin-vert--lg">
        <section className="section-with-bg-logo">
          <div className="page-shell">
          <div className="page-header">
            <p className="page-kicker"><Translate id="courses.about.kicker">Learning Philosophy</Translate></p>
            <h1><Translate id="courses.about.title">About</Translate></h1>
            <p className="page-lead">
              <em>
                <Translate id="courses.about.lead">
                  We prioritize practical, human-centered learning where students build skills by solving real problems together.
                </Translate>
              </em>
            </p>
          </div>

          <div className="page-content">
            <h2><Translate id="courses.about.believe">What We Believe</Translate></h2>
            <p className={styles.sectionIntro}>
              <Translate id="courses.about.believe.intro">
                In memory of Professor Yong-Han Lee (1965-2017), this page reflects the values guiding every course.
              </Translate>
            </p>

            <div className={styles.beliefGrid}>
              {beliefs.map((belief, i) => (
                <article key={i} className={styles.beliefCard}>
                  <p>{belief}</p>
                </article>
              ))}
            </div>

            <h2><Translate id="courses.about.motto">Motto</Translate></h2>
            <div className={styles.mottoGrid}>
              <div className={styles.mottoItem}><Translate id="courses.about.motto.research">Passion for Research</Translate></div>
              <div className={styles.mottoItem}><Translate id="courses.about.motto.people">Compassion for People</Translate></div>
              <div className={styles.mottoItem}><Translate id="courses.about.motto.colleagues">Collegiality with Colleagues</Translate></div>
              <div className={styles.mottoItem}><Translate id="courses.about.motto.balance">Balance in Life</Translate></div>
            </div>

            <h2><Translate id="courses.about.community">Our community and partners</Translate></h2>
            <div className={styles.communityWrap}>
              
              <div className={styles.logoRow}>
                <div className={styles.logoCard}>
                  <img src="/img/logos/ms.png" alt="MS logo" />
                </div>
                <div className={styles.logoCard}>
                  <img src="/img/logos/kmu.png" alt="KMU logo" />
                </div>
                <div className={styles.logoCard}>
                  <img src="/img/research.png" alt="AIN Lab" />
                </div>
              </div>
            </div>

            <p className={styles.footnote}><Translate id="courses.about.footnote">In memory of Professor Yong-Han Lee (1965-2017)</Translate></p>
          </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
