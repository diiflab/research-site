/**
 * fetch-orcid-reviews.js
 *
 * Fetches ORCID peer-review data and saves it as a JSON file.
 *
 * Usage:
 *   node scripts/fetch-orcid-reviews.js
 *
 * Requires Node.js 18+ (built-in fetch). For older Node versions,
 * install node-fetch: npm install node-fetch
 * and uncomment the import line below.
 */

// const fetch = require('node-fetch'); // uncomment if Node < 18
const fs = require('fs');
const path = require('path');
const YOUR_ORCID = "0000-0002-5640-4413"; // change this value with your actual ORCID

const SOURCE_URL = `https://orcid.org/${YOUR_ORCID}/peer-reviews-minimized.json?sortAsc=true`;
const OUTPUT_FILE = path.join(__dirname, '../static/api/reviews.json');

async function main() {
  console.log('Fetching data from ORCID...');

  const response = await fetch(SOURCE_URL);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();

  // Write the raw JSON data to file, nicely formatted
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2), 'utf-8');

  console.log(`Done. Saved ${data.length} entries to: ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
