/**
 * Generate a themed credits page with open-source dependency licenses.
 *
 * Run manually:
 *   node scripts/generate-credits-page.js
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const packageJsonPath = path.join(rootDir, 'package.json');
const packageLockPath = path.join(rootDir, 'package-lock.json');
const outputPath = path.join(rootDir, 'src', 'pages', 'credits.mdx');
// Korean copy for the /ko/ site (Docusaurus serves i18n/<locale>/... pages
// in place of the English ones). Same data, translated chrome.
const outputPathKo = path.join(rootDir, 'i18n', 'ko', 'docusaurus-plugin-content-pages', 'credits.mdx');

const STRINGS = {
  en: {
    title: 'Credits',
    description: 'Gratitude and open-source acknowledgements for this website.',
    kicker: 'Gratitude',
    heading: 'Credits and Acknowledgements',
    lead: 'With thanks to the open-source community that helps power this website.',
    intro: 'Thank you to every maintainer, reviewer, and contributor behind the libraries used in this website.',
    gratitude: 'Gratitude',
    research: 'Research and collaboration',
    communities: 'Open-source communities',
    runtime: 'Runtime dependencies',
    tooling: 'Build and tooling dependencies',
    transitive: 'Transitive dependencies (unique packages)',
    viewTransitive: (n) => `View full transitive dependency list (${n})`,
    updated: (date) => `Updated as of ${date}.`,
    packageCol: 'Package',
    licenseCol: 'License',
    countCol: 'Package count',
    noPackages: '_No packages found._',
    noLicenses: '_No package license data found._',
  },
  ko: {
    title: '크레딧',
    description: '이 웹사이트를 만든 분들과 오픈소스에 대한 감사의 말.',
    kicker: '감사의 말',
    heading: '크레딧 및 감사의 말',
    lead: '이 웹사이트를 움직이는 오픈소스 커뮤니티에 감사드립니다.',
    intro: '이 웹사이트에 사용된 라이브러리를 만들고, 검토하고, 기여해 주신 모든 분들께 감사드립니다.',
    gratitude: '감사의 말',
    research: '연구 및 협력',
    communities: '오픈소스 커뮤니티',
    runtime: '런타임 의존성',
    tooling: '빌드 및 도구 의존성',
    transitive: '간접 의존성 (고유 패키지)',
    viewTransitive: (n) => `전체 간접 의존성 목록 보기 (${n})`,
    updated: (date) => `${date} 기준으로 업데이트되었습니다.`,
    packageCol: '패키지',
    licenseCol: '라이선스',
    countCol: '패키지 수',
    noPackages: '_패키지를 찾을 수 없습니다._',
    noLicenses: '_패키지 라이선스 데이터가 없습니다._',
  },
};
const gratitudeConfigPath = path.join(rootDir, 'src', 'data', 'gratitude.json');

const DEFAULT_GRATITUDE = {
  collaborators: [
    'Lab members, alumni, and visiting researchers',
    'Academic and industry partners supporting collaborative projects',
    'Students and community members who provide feedback and testing',
  ],
  communities: [
    'Docusaurus maintainers and contributors',
    'React and MDX communities',
    'Open-source maintainers across the JavaScript ecosystem',
  ],
};

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function escapeCell(value) {
  return String(value ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, ' ')
    .trim();
}

function makeMarkdownTable(rows, t = STRINGS.en) {
  if (!rows.length) {
    return t.noPackages;
  }

  // Version and npm source columns are deliberately omitted: publishing exact
  // dependency versions makes it trivial to match the site against known CVEs
  // for those versions, so the credits page lists only package name + license.
  const header = `| ${t.packageCol} | ${t.licenseCol} |`;
  const separator = '| --- | --- |';
  const body = rows
    .map((row) => {
      const pkg = escapeCell(row.name);
      const license = escapeCell(row.license || 'Unknown');
      return `| ${pkg} | ${license} |`;
    })
    .join('\n');

  return [header, separator, body].join('\n');
}

function makeLicenseSummaryTable(rows, t = STRINGS.en) {
  if (!rows.length) {
    return t.noLicenses;
  }

  const grouped = rows.reduce((acc, row) => {
    const key = row.license || 'Unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const sorted = Object.entries(grouped).sort((a, b) => {
    if (b[1] !== a[1]) {
      return b[1] - a[1];
    }
    return a[0].localeCompare(b[0]);
  });

  const header = `| ${t.licenseCol} | ${t.countCol} |`;
  const separator = '| --- | ---: |';
  const body = sorted
    .map(([license, count]) => `| ${escapeCell(license)} | ${count} |`)
    .join('\n');

  return [header, separator, body].join('\n');
}

function getDirectPackages(packageJson, sectionName) {
  const section = packageJson[sectionName] || {};
  return Object.entries(section)
    .map(([name, range]) => ({
      name,
      range,
      section: sectionName,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function getLockMetadata(lockData, packageName) {
  if (!lockData) {
    return null;
  }

  // npm lockfile v2/v3 keeps package entries under packages[node_modules/<name>]
  if (lockData.packages) {
    const entry = lockData.packages[`node_modules/${packageName}`];
    if (entry) {
      return {
        version: entry.version,
        license: entry.license,
      };
    }
  }

  // npm lockfile v1 keeps top-level dependencies map
  if (lockData.dependencies && lockData.dependencies[packageName]) {
    const entry = lockData.dependencies[packageName];
    return {
      version: entry.version,
      license: entry.license,
    };
  }

  return null;
}

function combineRows(packageJson, lockData) {
  const deps = getDirectPackages(packageJson, 'dependencies').map((pkg) => {
    const lockMeta = getLockMetadata(lockData, pkg.name);
    return {
      name: pkg.name,
      version: lockMeta?.version || pkg.range,
      license: lockMeta?.license || 'See package source',
      section: 'Runtime dependencies',
    };
  });

  const devDeps = getDirectPackages(packageJson, 'devDependencies').map((pkg) => {
    const lockMeta = getLockMetadata(lockData, pkg.name);
    return {
      name: pkg.name,
      version: lockMeta?.version || pkg.range,
      license: lockMeta?.license || 'See package source',
      section: 'Build and tooling dependencies',
    };
  });

  return { deps, devDeps };
}

function normalizePackageNameFromLockPath(lockPath) {
  const marker = 'node_modules/';
  const lastMarkerIndex = lockPath.lastIndexOf(marker);
  if (lastMarkerIndex === -1) {
    return null;
  }
  return lockPath.slice(lastMarkerIndex + marker.length);
}

function getTransitiveRows(lockData, directPackageNames) {
  if (!lockData || !lockData.packages) {
    return [];
  }

  const grouped = new Map();
  const directSet = new Set(directPackageNames);

  for (const [lockPath, entry] of Object.entries(lockData.packages)) {
    if (!lockPath || lockPath === '') {
      continue;
    }
    if (!lockPath.includes('node_modules/')) {
      continue;
    }

    const name = normalizePackageNameFromLockPath(lockPath);
    if (!name || directSet.has(name)) {
      continue;
    }

    if (!grouped.has(name)) {
      grouped.set(name, {
        versions: new Set(),
        licenses: new Set(),
      });
    }

    const bucket = grouped.get(name);
    bucket.versions.add(entry?.version || 'Unknown');
    bucket.licenses.add(entry?.license || 'See package source');
  }

  const rows = Array.from(grouped.entries()).map(([name, values]) => {
    const versions = Array.from(values.versions).sort();
    const licenses = Array.from(values.licenses).sort();

    const versionLabel = versions.length === 1
      ? versions[0]
      : `${versions[0]} (+${versions.length - 1} more)`;

    const licenseLabel = licenses.length === 1
      ? licenses[0]
      : `Multiple (${licenses.length})`;

    return {
      name,
      version: versionLabel,
      license: licenseLabel,
      section: 'Transitive dependencies',
    };
  });

  rows.sort((a, b) => {
    const nameCmp = a.name.localeCompare(b.name);
    if (nameCmp !== 0) {
      return nameCmp;
    }
    return String(a.version).localeCompare(String(b.version));
  });

  return rows;
}

function readGratitudeConfig() {
  const config = readJson(gratitudeConfigPath);
  if (!config) {
    return DEFAULT_GRATITUDE;
  }

  const collaborators = Array.isArray(config.collaborators) && config.collaborators.length
    ? config.collaborators
    : DEFAULT_GRATITUDE.collaborators;

  const communities = Array.isArray(config.communities) && config.communities.length
    ? config.communities
    : DEFAULT_GRATITUDE.communities;

  // Optional per-locale override: { "ko": { collaborators, communities } }.
  const ko = config.ko && typeof config.ko === 'object'
    ? {
      collaborators: Array.isArray(config.ko.collaborators) && config.ko.collaborators.length ? config.ko.collaborators : collaborators,
      communities: Array.isArray(config.ko.communities) && config.ko.communities.length ? config.ko.communities : communities,
    }
    : { collaborators, communities };

  return { collaborators, communities, ko };
}

function toBullets(items) {
  return items.map((item) => `- ${escapeCell(item)}`).join('\n');
}

function buildPage({
  projectName,
  generatedOn,
  deps,
  devDeps,
  transitiveDeps,
  projectLicense,
  gratitude,
}, t = STRINGS.en) {
  const runtimeTable = makeMarkdownTable(deps, t);
  const toolingTable = makeMarkdownTable(devDeps, t);
  const transitiveTable = makeMarkdownTable(transitiveDeps, t);
  const allPackages = [...deps, ...devDeps, ...transitiveDeps];
  const licenseSummaryTable = makeLicenseSummaryTable(allPackages, t);
  const collaboratorsBullets = toBullets(gratitude.collaborators);
  const communitiesBullets = toBullets(gratitude.communities);
  const projectLicenseLabel = projectLicense
    && projectLicense !== 'UNKNOWN'
    && !String(projectLicense).toLowerCase().includes('see license')
    ? `the **${projectLicense}** license`
    : 'the license described in the repository LICENSE file';

  return `---
title: ${t.title}
description: ${t.description}
---

<section className="section-with-bg-logo">
<div className="page-shell">
<div className="page-header">
<p className="page-kicker">${t.kicker}</p>
<h1>${t.heading}</h1>
<p className="page-lead"><em>${t.lead}</em></p>
</div>

<div className="page-content">

${t.intro}

## ${t.gratitude}

### ${t.research}

${collaboratorsBullets}

### ${t.communities}

${communitiesBullets}

## ${t.runtime}

${runtimeTable}

## ${t.tooling}

${toolingTable}

## ${t.transitive}

<details>
  <summary>${t.viewTransitive(transitiveDeps.length)}</summary>

${transitiveTable}

</details>

${t.updated(generatedOn)}

</div>
</div>
</section>
`;
}

function main() {
  const packageJson = readJson(packageJsonPath);
  if (!packageJson) {
    throw new Error('Cannot generate credits page: package.json was not found.');
  }

  const lockData = readJson(packageLockPath);
  const { deps, devDeps } = combineRows(packageJson, lockData);
  const directPackageNames = [...deps, ...devDeps].map((pkg) => pkg.name);
  const transitiveDeps = getTransitiveRows(lockData, directPackageNames);
  const gratitude = readGratitudeConfig();

  const pageData = {
    projectName: packageJson.name || 'this project',
    generatedOn: new Date().toISOString().slice(0, 10),
    deps,
    devDeps,
    transitiveDeps,
    projectLicense: packageJson.license || 'See LICENSE file',
    gratitude,
  };

  fs.writeFileSync(outputPath, buildPage(pageData, STRINGS.en), 'utf8');
  fs.mkdirSync(path.dirname(outputPathKo), {recursive: true});
  fs.writeFileSync(outputPathKo, buildPage({...pageData, gratitude: pageData.gratitude.ko || pageData.gratitude}, STRINGS.ko), 'utf8');
  const total = deps.length + devDeps.length + transitiveDeps.length;
  console.log(`Generated ${path.relative(rootDir, outputPath)} with ${total} package entries.`);
}

main();
