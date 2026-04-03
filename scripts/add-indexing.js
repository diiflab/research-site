/**
 * Adds `indexing` field to journals.json, conferences.json, books.json
 * based on known journal/conference indexing in Scopus, SCIE, SSCI.
 *
 * Run: node scripts/add-indexing.js
 */

const fs = require('fs');
const path = require('path');

// --- Journal indexing lookup ---
// Each entry: [substringToMatch (case-insensitive), [...indexLabels]]
// Rules are evaluated top-to-bottom; first match wins.
const JOURNAL_RULES = [
  // SCIE + Scopus
  ['scientific reports',          ['SCIE', 'Scopus']],
  ['sci rep',                     ['SCIE', 'Scopus']],
  ['ieee access',                 ['SCIE', 'Scopus']],
  ['plos one',                    ['SCIE', 'Scopus']],
  ['plos ONE',                    ['SCIE', 'Scopus']],
  ['peerj computer science',      ['SCIE', 'Scopus']],
  ['applied sciences',            ['SCIE', 'Scopus']],
  ['appl. sci.',                  ['SCIE', 'Scopus']],
  ['mathematics',                 ['SCIE', 'Scopus']],
  ['sensors',                     ['SCIE', 'Scopus']],
  ['expert systems with applications', ['SCIE', 'Scopus']],
  ['alexandria engineering journal',   ['SCIE', 'Scopus']],
  ['ain shams engineering journal',    ['SCIE', 'Scopus']],
  ['digital health',              ['SCIE', 'Scopus']],
  ['computers and electronics in agriculture', ['SCIE', 'Scopus']],
  ['biocybernetics and biomedical engineering', ['SCIE', 'Scopus']],
  ['food control',                ['SCIE', 'Scopus']],
  ['marine pollution bulletin',   ['SCIE', 'Scopus']],
  // NRE = NeuroRehabilitation (IOS Press, doi prefix 10.3233)
  ['nre,',                        ['SCIE', 'Scopus']],
  ['neurorehabilitation',         ['SCIE', 'Scopus']],
  ['sustainability',              ['SCIE', 'Scopus']],

  // SSCI + Scopus
  ['asia pacific journal of marketing and logistics', ['SSCI', 'Scopus']],
  ['sustainable development',     ['SSCI', 'Scopus']],

  // Scopus only (ESCI / not in WoS master list)
  ['ijerph',                      ['Scopus']],
  ['international journal of environmental research and public health', ['Scopus']],
  ['computers',                   ['Scopus']],
  ['future internet',             ['Scopus']],
  ['information',                 ['Scopus']],
  ['prosthesis',                  ['Scopus']],
  ['journal of advanced research in applied sciences', ['Scopus']],
  ['jurnal resti',                ['Scopus']],
];

// --- Conference indexing lookup ---
// IEEE, Procedia, E3S, IOP are reliably Scopus-indexed.
// Korean domestic conferences (KSMTE, KDMS, KSPE, KIPS/WCITAS, KMIS) are not.
const CONFERENCE_RULES = [
  ['ieee',                        ['Scopus']],
  ['procedia computer science',   ['Scopus']],
  ['e3s web conf',                ['Scopus']],
  ['e3s web',                     ['Scopus']],
  ['iop conference',              ['Scopus']],
  ['acm digital',                 ['Scopus']],
  ['acm',                         ['Scopus']],
  ['3ict',                        ['Scopus']],
  ['dasa',                        ['Scopus']],
  ['isriti',                      ['Scopus']],
  ['icitacee',                    ['Scopus']],
  ['icetsis',                     ['Scopus']],
  ['i3ct',                        ['Scopus']],
  ['icst',                        ['Scopus']],
  // Korean domestic — no indexing
  ['korean society',              []],
  ['korea business intelligence', []],
  ['ksmte',                       []],
  ['kdms',                        []],
  ['kspe',                        []],
  ['kmis',                        []],
  ['kips',                        []],
  ['isgma',                       []],
  ['wcitas',                      []],
];

function resolveIndexing(venue, citation, rules) {
  const text = ((venue || '') + ' ' + (citation || '')).toLowerCase();
  for (const [pattern, labels] of rules) {
    if (text.includes(pattern.toLowerCase())) {
      return labels;
    }
  }
  return [];
}

function enrichFile(filePath, type) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const rules = type === 'journal' ? JOURNAL_RULES : type === 'conference' ? CONFERENCE_RULES : [];

  const updated = data.map(entry => ({
    ...entry,
    indexing: resolveIndexing(entry.venue, entry.citation, rules),
  }));

  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf8');

  // Summary
  const counts = {};
  updated.forEach(e => {
    const key = e.indexing.length ? e.indexing.join('+') : 'none';
    counts[key] = (counts[key] || 0) + 1;
  });
  console.log(`${path.basename(filePath)}: ${updated.length} entries`);
  Object.entries(counts).sort().forEach(([k, v]) => console.log(`  ${k}: ${v}`));
}

const dataDir = path.join(__dirname, '..', 'src', 'data');
enrichFile(path.join(dataDir, 'journals.json'), 'journal');
enrichFile(path.join(dataDir, 'conferences.json'), 'conference');
enrichFile(path.join(dataDir, 'books.json'), 'book');

console.log('\nDone. Review the indexing field in each JSON file.');
