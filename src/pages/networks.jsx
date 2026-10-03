import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import CollabGlobe from '@site/src/components/CollabGlobe';
import collaborations from '@site/src/data/collaborations.json';
import styles from './networks.module.css';

// ISO 3166-1 alpha-2 code → flag emoji (regional indicator symbols).
function flagEmoji(code) {
  return String.fromCodePoint(...[...code.toUpperCase()].map((ch) => 0x1f1a5 + ch.charCodeAt(0)));
}

// The affiliation cards show the strongest partnerships; the globe and the
// chip strip above still cover every country. collaborations.countries is
// pre-sorted by number of co-authored works (descending).
const TOP_COUNTRIES = 10;

const getStats = () => [
  {value: collaborations.totals.countries, label: translate({id: 'networks.stat.countries', message: 'Countries'})},
  {value: collaborations.totals.institutions, label: translate({id: 'networks.stat.institutions', message: 'Institutions'})},
  {value: collaborations.totals.resolved, label: translate({id: 'networks.stat.works', message: 'Works'})},
];

function CountryCard({country}) {
  const {i18n} = useDocusaurusContext();
  const name = (i18n.currentLocale === 'ko' && country.nameKo) || country.name;
  const shown = country.institutions.slice(0, 4);
  const more = country.institutions.length - shown.length;
  return (
    <div className={styles.countryCard}>
      <div className={styles.countryHead}>
        <span className={styles.countryFlag} aria-hidden="true">
          {flagEmoji(country.code)}
        </span>
        <h3 className={styles.countryName}>{name}</h3>
        <span className={styles.countryWorks}>
          {country.works} {country.works === 1 ? translate({id: 'globe.work', message: 'work'}) : translate({id: 'globe.works', message: 'works'})}
        </span>
      </div>
      <ul className={styles.institutionList}>
        {shown.map((inst) => (
          <li key={inst}>{inst}</li>
        ))}
      </ul>
      {more > 0 && (
        <details className={styles.moreInstitutions}>
          <summary>{translate({id: 'networks.more', message: '+{n} more'}, {n: more})}</summary>
          <ul className={styles.institutionList}>
            {country.institutions.slice(4).map((inst) => (
              <li key={inst}>{inst}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

export default function Networks() {
  return (
    <Layout
      title={translate({id: 'networks.meta.title', message: 'Networks'})}
      description={translate({id: 'networks.meta.description', message: 'Applied INtelligence (AIN) Lab’s global collaboration network — co-author affiliations from our publications, visualized from Seoul to the world.'})}>
      {/* Wrapper classes mirror Docusaurus's MDX page layout exactly, and the
          section-with-bg-logo watermark matches every other content page. */}
      <main className="container container--fluid margin-vert--lg">
        <section className="section-with-bg-logo">
        <div className="page-shell">
          <div className="page-header">
            <p className="page-kicker"><Translate id="networks.kicker">Global network</Translate></p>
            <h1><Translate id="networks.title">From Seoul to the world.</Translate></h1>
            <p className="page-lead">
              <Translate
                id="networks.lead"
                values={{
                  publications: <Link to="/publications"><Translate id="networks.lead.publications">publications</Translate></Link>,
                  countries: collaborations.totals.countries,
                }}>
                {'Every co-author affiliation behind our {publications}, resolved from their DOIs and drawn live — {countries} countries, one blue thread from home.'}
              </Translate>
            </p>
          </div>

          <CollabGlobe
            home={collaborations.home}
            countries={collaborations.countries}
            totals={collaborations.totals}
          />

          <div className={styles.statRow}>
            {getStats().map((stat) => (
              <div key={stat.label} className={styles.statTile}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>

          <section className={styles.affiliations}>
            <h2><Translate id="networks.affiliations.title">Affiliations by country.</Translate></h2>
            <p className={styles.affiliationsLead}>
              {translate(
                {id: 'networks.affiliations.lead', message: 'Our top {top} country partnerships by shared output, from {works} DOI-resolved works. All {countries} countries appear on the globe and chip strip above.'},
                {top: TOP_COUNTRIES, works: collaborations.totals.resolved, countries: collaborations.totals.countries},
              )}
            </p>
            <div className={styles.countryGrid}>
              {collaborations.countries.slice(0, TOP_COUNTRIES).map((country) => (
                <CountryCard key={country.code} country={country} />
              ))}
            </div>
            <p className={styles.dataNote}>
              <em>
                <Translate
                  id="networks.dataNote"
                  values={{
                    openalex: (
                      <a href="https://openalex.org" target="_blank" rel="noopener noreferrer">
                        OpenAlex
                      </a>
                    ),
                  }}>
                  {'Affiliation data is derived automatically from publication DOIs via {openalex} and may contain errors.'}
                </Translate>
              </em>
            </p>
          </section>
        </div>
        </section>
      </main>
    </Layout>
  );
}
