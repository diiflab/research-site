import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';


const FeatureList = [
  {
    title: 'FLTrans-Net: Transformer-based feature learning network for wheat head detection',
    img_url: "/img/wheat.webp",
    imgWidth: 700,
    imgHeight: 290,
    doi: "https://doi.org/10.1016/j.compag.2024.109706",
    outlet: "Published in Computers and Electronics in Agriculture (Elsevier, 2025) - SCIE (Q1); IF=8.9; Rank=2/94; IF(%)=1.6%.",
    details: [
      {
        label: 'Data',
        content: 'Wheat-field images with overlapping small spikes, complex backgrounds; multi-scale visual features for detection.',
      },
      {
        label: 'Intelligence',
        content: 'FLTrans-Net: transformer-based multi-scale fusion, spatial attention, and lightweight RetinaNet for noise-robust feature learning.',
      },
      {
        label: 'Applications',
        content: 'Real-time wheat-head detection for yield assessment and field management on resource-constrained devices.',
      },
    ],
  },
  {
    title: 'AE-BPNN: autoencoder and backpropagation neural network-based model for lithium-ion battery state of health estimation',
    img_url: "/img/battery.webp",
    imgWidth: 685,
    imgHeight: 247,
    doi: "https://doi.org/10.1038/s41598-025-12771-4",
    outlet: "Published in Scientific Reports (Nature Portfolio, 2025) - SCIE (Q1); IF=3.9; Rank=25/136; IF(%)=18.0%.",
    details: [
      {
        label: 'Data',
        content: 'EIS measurements from Li-ion cells across multiple temperatures and operating states.',
      },
      {
        label: 'Intelligence',
        content: 'AE-BPNN with SCG/RBP optimization for feature reduction and State-of-Health (SOH) estimation.',
      },
      {
        label: 'Applications',
        content: 'Accurate battery SOH prediction for energy storage systems.',
      },
    ],
  },
  {
    title: 'Tweeting Circular Economy: Unveiling Current Discourse Through Natural Language Processing',
    img_url: "/img/circulareconomy.webp",
    imgWidth: 700,
    imgHeight: 352,
    doi: "https://doi.org/10.1002/sd.3323",
    outlet: "Published in Sustainable Development (Wiley, 2025) - SSCI (Q1); IF=9.9; Rank=1/63; IF(%)=0.8%.",
    details: [
      {
        label: 'Data',
        content: '389k Twitter posts on circular economy (CE) (2012-2022).',
      },
      {
        label: 'Intelligence',
        content: 'NLP-based theme extraction and trend analysis.',
      },
      {
        label: 'Applications',
        content: 'Public insight for CE policy and stakeholder engagement.',
      },
    ],
  },
  
];

// Korean copy for each paper above, by position (titles stay in English).
const FEATURE_LIST_KO = [
  {
    "outlet": "Computers and Electronics in Agriculture (Elsevier, 2025) 게재 - SCIE (Q1); IF=8.9; 순위=2/94; IF(%)=1.6%.",
    "details": [
      "작은 이삭이 겹쳐 있고 배경이 복잡한 밀밭 이미지, 탐지를 위한 다중 스케일 시각 특징.",
      "FLTrans-Net: 노이즈에 강한 특징 학습을 위한 트랜스포머 기반 다중 스케일 융합, 공간 어텐션, 경량 RetinaNet.",
      "자원이 제한된 기기에서 수확량 평가와 농장 관리를 위한 실시간 밀 이삭 탐지."
    ]
  },
  {
    "outlet": "Scientific Reports (Nature Portfolio, 2025) 게재 - SCIE (Q1); IF=3.9; 순위=25/136; IF(%)=18.0%.",
    "details": [
      "여러 온도와 작동 상태에서 측정한 리튬이온 셀의 EIS 데이터.",
      "특징 축소와 배터리 건전성(SOH) 추정을 위한 SCG/RBP 최적화 기반 AE-BPNN.",
      "에너지 저장 시스템을 위한 정확한 배터리 SOH 예측."
    ]
  },
  {
    "outlet": "Sustainable Development (Wiley, 2025) 게재 - SSCI (Q1); IF=9.9; 순위=1/63; IF(%)=0.8%.",
    "details": [
      "순환 경제(CE)에 관한 트위터 게시물 38만 9천 건 (2012–2022).",
      "NLP 기반 주제 추출 및 트렌드 분석.",
      "CE 정책과 이해관계자 참여를 위한 대중 인식 분석."
    ]
  }
];

// Summary row labels shared with the research-areas section.
const getDetailLabels = () => [
  translate({id: 'home.areas.0.title', message: 'Data'}),
  translate({id: 'home.areas.1.title', message: 'Intelligence'}),
  translate({id: 'home.areas.2.title', message: 'Applications'}),
];

function Feature({img_url, imgWidth, imgHeight, doi, title, outlet, details}) {
  return (
    <div className={clsx('col col--4', styles.cardCol, 'reveal')}>
      <article className={styles.card}>
      <div className={styles.mediaWrap}>
        <img loading="lazy" alt={title} className={styles.featureSvg} role="img" src={img_url} width={imgWidth} height={imgHeight}/>
      </div>
      <div className={styles.contentWrap}>
        <h2 className={styles.paperTitle}>
        <Link to={doi}>{title}</Link>
        </h2>
        <div className={styles.paperBody}>
          <details className={styles.detailDisclosure}>
            <summary><Translate id="home.papers.summary">Research Summary</Translate></summary>
            <ul className={styles.detailList}>
              {details.map((item, i) => (
                <li key={i} className={styles.detailItem}>
                  <span className={styles.summaryKey}>{getDetailLabels()[i] || item.label}</span>
                  <span className={styles.summaryValue}>{item.content}</span>
                </li>
              ))}
            </ul>
          </details>
        </div>
        <p className={styles.outlet}>{outlet}</p>
      </div>
      </article>
    </div>
  );
}

export default function HomepageFeatures() {
  const {i18n} = useDocusaurusContext();
  const list = i18n.currentLocale === 'ko'
    ? FeatureList.map((paper, i) => {
      const ko = FEATURE_LIST_KO[i];
      if (!ko) return paper;
      return {
        ...paper,
        outlet: ko.outlet,
        details: paper.details.map((d, j) => ({...d, content: ko.details[j] || d.content})),
      };
    })
    : FeatureList;
  return (
    <section className={styles.features} id="FeaturedResearch">
      <div className="container">
        <p className={styles.kicker}>
          <Translate id="home.papers.kicker">Selected works</Translate>
        </p>
        <h1 className="text--center">
          <Translate id="home.papers.title">Featured research.</Translate>
        </h1>
        <p className="text--center">
          <em>
            <Translate
              id="home.papers.subtitle"
              values={{
                link: (
                  <Link to="/publications">
                    <Translate id="home.papers.subtitle.link">view all publications</Translate>
                  </Link>
                ),
              }}>
              {'Highlights from Q1 journals — {link}.'}
            </Translate>
          </em>
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
