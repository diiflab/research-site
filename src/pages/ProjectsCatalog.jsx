import React, { useState } from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import projectsData from '../data/projects.data.json';
import styles from './projects.module.css';

// Display labels for the data's type/role values; unknown values pass through.
const typeLabel = (type) => ({
  'Funded Project': translate({id: 'projects.type.funded', message: 'Funded Project'}),
  Collaboration: translate({id: 'projects.type.collaboration', message: 'Collaboration'}),
}[type] || type);
const roleLabel = (role) => ({
  'Foreign Collaborator': translate({id: 'projects.role.foreignCollaborator', message: 'Foreign Collaborator'}),
  'Principal Investigator': translate({id: 'projects.role.principalInvestigator', message: 'Principal Investigator'}),
}[role] || role);

const formatMonth = (dateString) => {
  if (!dateString) {
    return null;
  }

  const [year, month] = dateString.split('-');
  return `${year}.${month}`;
};

const formatPeriod = (project) => {
  if (project.periodLabel) {
    return project.periodLabel;
  }

  if (project.startDate && project.endDate) {
    return `${formatMonth(project.startDate)} - ${formatMonth(project.endDate)}`;
  }

  if (project.startDate) {
    return formatMonth(project.startDate);
  }

  return translate({id: 'projects.datesNotListed', message: 'Dates not listed'});
};

const formatFunding = (amount, currency = 'KRW') => {
  if (!amount) {
    return null;
  }

  return `${currency} ${Number(amount).toLocaleString('en-US')}`;
};

const getSortValue = (project) => {
  if (project.endDate) {
    return new Date(project.endDate).getTime();
  }

  if (project.periodLabel) {
    const years = (project.periodLabel.match(/\d{4}/g) || []).map(Number);

    if (years.length > 0) {
      return new Date(Math.max(...years), 11, 31).getTime();
    }
  }

  return 0;
};

const sortProjects = (projects) =>
  [...projects].sort((left, right) => getSortValue(right) - getSortValue(left) || left.title.localeCompare(right.title));

const currentProjects = sortProjects(projectsData.current);
const pastProjects = sortProjects(projectsData.past);
const allProjects = [...currentProjects, ...pastProjects];
const organizations = new Set(allProjects.map((project) => project.organization).filter(Boolean));
const archiveRoles = [...new Set(pastProjects.map((project) => project.role).filter(Boolean))].sort((left, right) =>
  left.localeCompare(right)
);
const archiveTypes = [...new Set(pastProjects.map((project) => project.type).filter(Boolean))].sort((left, right) =>
  left.localeCompare(right)
);
const years = allProjects.flatMap((project) => {
  if (project.startDate) {
    return [Number(project.startDate.slice(0, 4))];
  }

  return (project.periodLabel?.match(/\d{4}/g) || []).map(Number);
});

const portfolioStart = years.length > 0 ? Math.min(...years) : null;

const normalizeText = (value) => (value || '').toString().toLowerCase();

const matchesSearch = (project, query) => {
  if (!query) {
    return true;
  }

  const searchableText = [project.title, project.organization, project.program, project.role, project.type, formatPeriod(project)]
    .filter(Boolean)
    .map(normalizeText)
    .join(' ');

  return searchableText.includes(query);
};

function ProjectsCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortMode, setSortMode] = useState('period-desc');

  const normalizedQuery = normalizeText(searchQuery.trim());
  const displayedPastProjects = pastProjects
    .filter((project) => selectedRole === 'all' || project.role === selectedRole)
    .filter((project) => selectedType === 'all' || project.type === selectedType)
    .filter((project) => matchesSearch(project, normalizedQuery))
    .sort((left, right) => {
      if (sortMode === 'period-asc') {
        return getSortValue(left) - getSortValue(right) || left.title.localeCompare(right.title);
      }

      if (sortMode === 'period-desc') {
        return getSortValue(right) - getSortValue(left) || left.title.localeCompare(right.title);
      }

      if (sortMode === 'role-asc') {
        return left.role.localeCompare(right.role) || getSortValue(right) - getSortValue(left);
      }

      if (sortMode === 'role-desc') {
        return right.role.localeCompare(left.role) || getSortValue(right) - getSortValue(left);
      }

      if (sortMode === 'org-asc') {
        return left.organization.localeCompare(right.organization) || getSortValue(right) - getSortValue(left);
      }

      return left.title.localeCompare(right.title) || getSortValue(right) - getSortValue(left);
  });

  const resetArchiveControls = () => {
    setSearchQuery('');
    setSelectedRole('all');
    setSelectedType('all');
    setSortMode('period-desc');
  };

  return (
    <div className={styles.projectsCatalog}>
      <section className={styles.overviewPanel} style={{ display: 'none' }}>
    
        <div className={styles.metricsGrid}>
          <div className={`${styles.metricCard} reveal`}>
            <p className={styles.metricLabel}><Translate id="projects.metric.active">Active</Translate></p>
            <p className={styles.metricValue}>{currentProjects.length}</p>
          </div>
          <div className={`${styles.metricCard} reveal`}>
            <p className={styles.metricLabel}><Translate id="projects.metric.archive">Archive</Translate></p>
            <p className={styles.metricValue}>{pastProjects.length}</p>
          </div>
          <div className={`${styles.metricCard} reveal`}>
            <p className={styles.metricLabel}><Translate id="projects.metric.institutions">Institutions</Translate></p>
            <p className={styles.metricValue}>{organizations.size}</p>
          </div>
          <div className={`${styles.metricCard} reveal`}>
            <p className={styles.metricLabel}><Translate id="projects.metric.coverage">Coverage</Translate></p>
            <p className={styles.metricValue}>{portfolioStart ? `${portfolioStart}-2026` : 'Portfolio'}</p>
          </div>
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionKicker}><Translate id="projects.current.kicker">Live Portfolio</Translate></p>
            <h2><Translate id="projects.current.title">Current projects</Translate></h2>
          </div>
        </div>

        <div className={styles.currentGrid}>
          {currentProjects.map((project) => (
            <article key={project.id} className={`${styles.currentCard} reveal`}>
              <div className={styles.cardBadgeRow}>
                <span className={styles.statusBadge}><Translate id="projects.metric.active">Active</Translate></span>
                <span className={styles.typeBadge}>{typeLabel(project.type)}</span>
              </div>

              <h3>{project.title}</h3>
              <p className={styles.cardOrg}>{project.organization}</p>
              {project.program ? <p className={styles.cardProgram}>{project.program}</p> : null}

              <dl className={styles.cardFacts}>
                <div>
                  <dt><Translate id="projects.col.period">Period</Translate></dt>
                  <dd>{formatPeriod(project)}</dd>
                </div>
                <div>
                  <dt><Translate id="projects.col.role">Role</Translate></dt>
                  <dd>{roleLabel(project.role)}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionKicker}><Translate id="projects.metric.archive">Archive</Translate></p>
            <h2><Translate id="projects.past.title">Past projects</Translate></h2>
          </div>
        </div>

        <div className={styles.archiveToolbar}>
          <label className={`${styles.controlGroup} ${styles.searchControl}`}>
            <span className={styles.controlLabel}><Translate id="projects.search.label">Search archive</Translate></span>
            <input
              type="search"
              className={styles.controlField}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={translate({id: 'projects.search.placeholder', message: 'Search title, organization, role, or program'})}
            />
          </label>

          <label className={styles.controlGroup}>
            <span className={styles.controlLabel}><Translate id="projects.filter.role">Filter by role</Translate></span>
            <select className={styles.controlField} value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)}>
              <option value="all">{translate({id: 'projects.filter.allRoles', message: 'All roles'})}</option>
              {archiveRoles.map((role) => (
                <option key={role} value={role}>
                  {roleLabel(role)}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.controlGroup}>
            <span className={styles.controlLabel}><Translate id="projects.filter.type">Filter by type</Translate></span>
            <select className={styles.controlField} value={selectedType} onChange={(event) => setSelectedType(event.target.value)}>
              <option value="all">{translate({id: 'projects.filter.allTypes', message: 'All types'})}</option>
              {archiveTypes.map((type) => (
                <option key={type} value={type}>
                  {typeLabel(type)}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.controlGroup}>
            <span className={styles.controlLabel}><Translate id="projects.sort.label">Order archive</Translate></span>
            <select className={styles.controlField} value={sortMode} onChange={(event) => setSortMode(event.target.value)}>
              <option value="period-desc">{translate({id: 'projects.sort.periodDesc', message: 'Period: Newest first'})}</option>
              <option value="period-asc">{translate({id: 'projects.sort.periodAsc', message: 'Period: Oldest first'})}</option>
              <option value="role-asc">{translate({id: 'projects.sort.roleAsc', message: 'Role A-Z'})}</option>
              <option value="role-desc">{translate({id: 'projects.sort.roleDesc', message: 'Role Z-A'})}</option>
              <option value="org-asc">{translate({id: 'projects.sort.orgAsc', message: 'Organization A-Z'})}</option>
              <option value="title-asc">{translate({id: 'projects.sort.titleAsc', message: 'Title A-Z'})}</option>
            </select>
          </label>

          <button type="button" className={styles.resetButton} onClick={resetArchiveControls}>
            <Translate id="projects.reset">Reset</Translate>
          </button>
        </div>

        <p className={styles.resultsSummary}>
          {translate({id: 'projects.results', message: '{n} archive project(s) shown.'}, {n: displayedPastProjects.length})}
        </p>

        <div className={styles.archiveFrame}>
          <table className={styles.archiveTable}>
            <thead>
              <tr>
                <th><Translate id="projects.col.project">Project</Translate></th>
                <th><Translate id="projects.col.organization">Organization</Translate></th>
                <th><Translate id="projects.col.program">Program</Translate></th>
                <th><Translate id="projects.col.period">Period</Translate></th>
                <th><Translate id="projects.col.role">Role</Translate></th>
              </tr>
            </thead>
            <tbody>
              {displayedPastProjects.map((project) => (
                <tr key={project.id}>
                  <td data-label={translate({id: 'projects.col.project', message: 'Project'})}>
                    <div className={styles.tableProjectCell}>
                      <p className={styles.tableTitle}>{project.title}</p>
                      <div className={styles.tableBadges}>
                        <span className={styles.typeBadge}>{typeLabel(project.type)}</span>
                        {/* {project.funding ? <span className={styles.fundingBadge}>{formatFunding(project.funding, project.currency)}</span> : null} */}
                      </div>
                    </div>
                  </td>
                  <td data-label={translate({id: 'projects.col.organization', message: 'Organization'})}>{project.organization}</td>
                  <td data-label={translate({id: 'projects.col.program', message: 'Program'})}>{project.program || translate({id: 'projects.collaborativeResearch', message: 'Collaborative research'})}</td>
                  <td data-label={translate({id: 'projects.col.period', message: 'Period'})}>{formatPeriod(project)}</td>
                  <td data-label={translate({id: 'projects.col.role', message: 'Role'})}>
                    <span className={styles.rolePill}>{roleLabel(project.role)}</span>
                  </td>
                </tr>
              ))}

              {displayedPastProjects.length === 0 ? (
                <tr>
                  <td data-label={translate({id: 'projects.col.project', message: 'Project'})} colSpan="5">
                    <p className={styles.emptyState}><Translate id="projects.empty">No archive projects match the current search and filters.</Translate></p>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default ProjectsCatalog;