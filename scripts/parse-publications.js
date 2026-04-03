/**
 * Parse MDX publication files into structured JSON data.
 * Usage: node scripts/parse-publications.js
 */
const fs = require('fs');
const path = require('path');

function extractLinks(html) {
  const links = [];
  const linkRegex = /<a[^>]*href='([^']*)'[^>]*>\[([^\]]*)\]<\/a>/g;
  let m;
  while ((m = linkRegex.exec(html)) !== null) {
    links.push({ url: m[1], label: m[2] });
  }
  return links;
}

function stripHtmlTags(html) {
  return html
    .replace(/<\/?[^>]+>/g, '')
    .replace(/\\\*/g, '*')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractAuthorRole(liHtml) {
  // Check for bold Syafrudin with markers
  if (liHtml.includes('<b>Syafrudin, M.\\*</b>') || liHtml.includes('<b>Syafrudin, M.*</b>')) {
    return 'corresponding';
  }
  if (liHtml.includes('<sup>†</sup></b>')) {
    return 'co-first';
  }
  return 'member';
}

function extractNote(text) {
  // Extract impact factor / ranking info in parentheses at the end
  const noteMatch = text.match(/\(S[SC]I[E]?,\s*IF\s+Top\s+[^)]+\)/);
  return noteMatch ? noteMatch[0] : null;
}

function parseListItem(liContent) {
  // Remove leading/trailing whitespace and any newlines within
  let html = liContent.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

  const links = extractLinks(html);
  const role = extractAuthorRole(html);

  // Remove link elements and trailing pipe separators for text extraction
  let textHtml = html
    .replace(/<a[^>]*>\[Link\]<\/a>/g, '')
    .replace(/<a[^>]*>\[GoogleScholar\]<\/a>/g, '')
    .replace(/\|/g, '')
    .trim();

  // Extract impact factor note (italic text at the end)
  let note = null;
  const italicNoteMatch = textHtml.match(/<i>\(S[SC]I[E]?,.*?<\/i>/);
  if (italicNoteMatch) {
    note = stripHtmlTags(italicNoteMatch[0]);
    textHtml = textHtml.replace(italicNoteMatch[0], '').trim();
  }

  // Get clean citation text
  let citation = stripHtmlTags(textHtml).replace(/[,.]?\s*$/, '').trim();
  // Remove trailing dot or comma
  citation = citation.replace(/[,.\s]+$/, '').trim();

  // Try to extract year
  let year = null;
  // Look for (YYYY) pattern
  const yearParenMatch = citation.match(/\((\d{4})\)/);
  if (yearParenMatch) {
    year = parseInt(yearParenMatch[1]);
  } else {
    // Look for standalone year patterns like "2025," or "2024."
    const yearMatch = citation.match(/\b(20\d{2})\b/);
    if (yearMatch) {
      year = parseInt(yearMatch[1]);
    }
  }

  // Try to extract title - it's usually after the year and before the journal
  // For journals: "Authors (Year) Title. Journal..."
  // For conferences: "Authors Title. In Conference..."
  let title = null;
  let authors = null;
  let venue = null;

  // Pattern: Authors (YYYY) Title. Venue
  const pattern1 = citation.match(/^(.+?)\((\d{4})\)[.\s]*(.+)/);
  if (pattern1) {
    authors = pattern1[1].replace(/[,&\s]+$/, '').trim();
    // The rest contains title and venue
    const rest = pattern1[3].trim();
    // Try to split on period followed by journal/venue
    const periodSplit = rest.match(/^(.+?)\.\s+(.+)/);
    if (periodSplit) {
      title = periodSplit[1].trim();
      venue = periodSplit[2].replace(/[,.\s]+$/, '').trim();
    } else {
      title = rest;
    }
  } else {
    // Pattern: Authors Title. Venue Year, ...
    const pattern2 = citation.match(/^(.+?(?:M\.|G\.|J\.))\s+(.+)/);
    if (pattern2) {
      authors = pattern2[1].trim();
      const rest = pattern2[2];
      const periodSplit = rest.match(/^(.+?)\.\s+(.+)/);
      if (periodSplit) {
        title = periodSplit[1].trim();
        venue = periodSplit[2].replace(/[,.\s]+$/, '').trim();
      } else {
        title = rest;
      }
    } else {
      title = citation;
    }
  }

  // Extract DOI from links
  const doiLink = links.find(l => l.label === 'Link');
  const scholarLink = links.find(l => l.label === 'GoogleScholar');

  return {
    citation,
    year,
    authors: authors || '',
    title: title || '',
    venue: venue || '',
    doi: doiLink ? doiLink.url : null,
    scholar: scholarLink ? scholarLink.url : null,
    note,
    role,
  };
}

function parseMdxFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract all <li>...</li> content, handling multi-line entries
  const items = [];
  const liRegex = /<li>([\s\S]*?)<\/li>/g;
  let match;
  while ((match = liRegex.exec(content)) !== null) {
    const parsed = parseListItem(match[1]);
    items.push(parsed);
  }
  return items;
}

// Parse all three files
const baseDir = path.join(__dirname, '..', 'src', 'pages', 'pubs');
const dataDir = path.join(__dirname, '..', 'src', 'data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const files = [
  { input: 'journals.mdx', output: 'journals.json' },
  { input: 'conferences.mdx', output: 'conferences.json' },
  { input: 'books.mdx', output: 'books.json' },
];

for (const f of files) {
  const inputPath = path.join(baseDir, f.input);
  const outputPath = path.join(dataDir, f.output);
  const items = parseMdxFile(inputPath);
  fs.writeFileSync(outputPath, JSON.stringify(items, null, 2), 'utf-8');
  console.log(`Parsed ${items.length} items from ${f.input} -> ${f.output}`);
}
