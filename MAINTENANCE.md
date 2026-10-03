# Maintenance Guide

How to keep the AIN Lab website up to date: adding publications, people,
projects, news, and courses; keeping the English and Korean versions in sync;
regenerating derived data; and checking a change before it goes live.

> **Read this first.** The site is bilingual. English is the source of truth
> at `/`, and Korean lives under `/ko/`. Most updates need a matching Korean
> edit. Section 3 says exactly where, and Section 6 has the list of
> English pages that have Korean copies.

**Contents**

1. [Setup and everyday commands](#1-setup-and-everyday-commands)
2. [Where things live](#2-where-things-live)
3. [Common updates (step by step)](#3-common-updates-step-by-step)
4. [Generated data and scripts](#4-generated-data-and-scripts)
5. [Site-wide settings](#5-site-wide-settings)
6. [Bilingual (English / Korean) rules](#6-bilingual-english--korean-rules)
7. [Checking a change before publishing](#7-checking-a-change-before-publishing)
8. [Known pitfalls](#8-known-pitfalls)
9. [Reference](#9-reference)

---

## 1. Setup and everyday commands

Requires **Node.js 18 or newer**.

```bash
npm install            # once, and after pulling dependency changes
npm start              # English dev server  → http://localhost:3000
npm run start:ko       # Korean dev server   → http://localhost:3000/ko/
npm run build          # production build of BOTH languages into build/
npm run serve          # serve build/ locally (test the real output)
```

| Command | What it does |
|---|---|
| `npm start` | Dev server on your machine only, with hot reload. Shows **one language** (English). |
| `npm run start:ko` | Same, but Korean. The dev server cannot show both languages at once. |
| `npm run start:lan` | Dev server reachable from other devices on your network (used by Docker). |
| `npm run build` | Full build of both languages (about 6 minutes). Run this before publishing. |
| `npm run serve` | Serves the finished `build/` folder, with both languages and language switching. |
| `npm run write-translations -- --locale ko` | Adds any new interface strings to `i18n/ko/code.json` (see §6). |
| `npm run generate:network` | Rebuilds the collaboration globe data from publication DOIs (see §4). |
| `npm run generate:credits` | Rebuilds the credits page (runs automatically before every build and start). |

`npm start` and `npm run build` regenerate `src/pages/credits.mdx` and
`i18n/ko/.../credits.mdx` first, so those files show up as changed after
any dependency update. That's expected, and you should commit them.

---

## 2. Where things live

```
docusaurus.config.js        Site settings: navbar, announcement bar, languages, SEO, search
src/
  pages/                    One file = one page. .mdx = content pages, .js/.jsx = React pages
    index.js                Homepage
    team.mdx, alumni.mdx, prospective.mdx, books.mdx, contact.mdx, gs2027.mdx …
    courses/                /courses landing, about, reviews, showcase
  data/                     ← Most routine updates happen here
    journals.json           Journal articles      ┐
    conferences.json        Conference papers     ├ /publications list
    books.json              Books and chapters    ┘
    projects.data.json      /projects (current + past)
    gallery.json            /gallery (with Korean captions)
    collaborations.json     /networks globe + homepage map (GENERATED, see §4)
    gratitude.json          Thank-you bullets on /credits
    courses/                Teaching stats, reviews, showcase projects
  components/               Reusable React pieces (PublicationsList, GalleryList, globe …)
  theme/                    Overrides of Docusaurus's built-in components (footer, 404, blog chrome …)
  css/custom.css            Global styles and fonts
blog/                       News posts → /updates  (one Markdown file per post)
courses-docs/               Course catalog → /courses/learn
i18n/ko/                    ← Everything Korean (see §6)
static/                     Files served as-is: images, PDFs, fonts (/img/x.png → static/img/x.png)
scripts/                    Data generators (see §4)
```

---

## 3. Common updates (step by step)

Each recipe ends with a **Korean** step. Don't skip it: if there's no Korean
copy, `/ko/` keeps showing the old content.

### 3.1 Add a publication

Publications are JSON records in `src/data/journals.json`,
`conferences.json`, or `books.json`. Add the new entry **at the top of the
array** (newest first):

```json
{
  "citation": "Full citation string, as you would write it in a CV.",
  "year": 2026,
  "authors": "Lastname, A., Syafrudin, M.*, Lastname, B.",
  "title": "Paper title",
  "venue": "Journal Name, 12, 345. https://doi.org/10.xxxx/yyyy",
  "doi": "https://doi.org/10.xxxx/yyyy",
  "scholar": "https://scholar.google.com/citations?view_op=view_citation&...",
  "note": null,
  "role": "corresponding",
  "indexing": ["SCIE", "Scopus"],
  "impactFactor": 4.2,
  "citeScore": 8.7
}
```

| Field | Notes |
|---|---|
| `role` | `first`, `co-first`, `corresponding`, or `member` (books: `editor`, …). Controls the *Corresponding Author* / *Co-First Author* badges. |
| `indexing` | Any of `SCIE`, `SSCI`, `ESCI`, `Scopus`. Drives the indexing filter and badges. `node scripts/add-indexing.js` can fill it in from known venues. |
| `impactFactor`, `citeScore` | Optional numbers. Shown as badges when present. |
| `featured` | Optional `true`. Puts the paper first under the default "Featured first" sort and adds a badge. |
| `authors` | `Syafrudin, M.` is highlighted automatically. |

**Numbering** (`J85`, `C24`, `B5` …) is calculated, never typed. Each type is
sorted oldest year first and numbered 1, 2, 3 …, so a new paper gets the next
number. Inserting an *older* paper shifts the numbers after it.

**Afterwards:**
1. Run `npm run generate:network` so the globe and the homepage map include the
   new co-authors (§4.1).
2. *(Optional)* To feature the paper on the homepage, see §3.10.
3. **Korean:** nothing to do. The list's labels are already translated, and paper data stays in English.

### 3.2 Add or update a team member

Edit `src/pages/team.mdx`. Copy an existing member block:

```mdx
<div className="row reveal">
<div className="col col--2"><img src="/team/NewPerson.png" alt="New Person"/></div>
<div className="col col--10">
<h3>New Person</h3>

<i>MS@KMU, Spring 2027</i>
<br/>Research interests: Topic A, Topic B
</div>
</div>
```

- Put the photo in `static/team/` (square, roughly 400×400; `.png`, `.jpg`, or `.webp`).
- **Keep the blank line after `<h3>…</h3>`.** Without it the page breaks in production (see §8.1).

**Korean:** make the same change in
`i18n/ko/docusaurus-plugin-content-pages/team.mdx` and translate the role line
(for example `국민대학교 석사과정 (2027년 봄학기)`) and the research interests.

### 3.3 Move someone to alumni

1. Remove their block from `team.mdx`, in both English and Korean.
2. In `src/pages/alumni.mdx`, add an `alumni-item` under the right section:

   ```mdx
   <div className="alumni-item">
     <p className="alumni-name">홍길동 (Gildong Hong)</p>
     <p className="alumni-meta">Undergraduate</p>
     <p className="alumni-pubs">Publications: <a href='/publications?q=10.xxxx/yyyy'>J90</a></p>
   </div>
   ```

   The `?q=` link opens the publications page pre-filtered to that DOI.
3. **Korean:** add the same item in `i18n/ko/docusaurus-plugin-content-pages/alumni.mdx`, using
   `학부생` / `연구실 연구원` in place of `Undergraduate` / `Lab Researcher`, and
   `논문:` in place of `Publications:`.

### 3.4 Add a project

Edit `src/data/projects.data.json`. New projects go in `current`; move
finished ones to `past`.

```json
{
  "id": "unique-slug-2026",
  "type": "Funded Project",
  "title": "Project title",
  "organization": "한국연구재단",
  "program": "Program name (optional)",
  "startDate": "2026-03-01",
  "endDate": "2027-02-28",
  "role": "연구책임자",
  "funding": 50000000,
  "currency": "KRW"
}
```

- Use `startDate`/`endDate` (`YYYY-MM-DD`), **or** `periodLabel` (`"2026-2031"`) when exact dates aren't known.
- `type`: `Funded Project` or `Collaboration`.
- `role`: existing values are `연구책임자`, `공동연구원`, `참여연구원`, `Principal Investigator`, `Foreign Collaborator`.
- `funding` is stored but not displayed.

**Korean:** none, as long as you reuse an existing `type`/`role`. For a **new**
English `type` or `role`, add it to `typeLabel()`/`roleLabel()` at the top of
`src/pages/ProjectsCatalog.jsx` as a `translate({id, message})` entry, then
follow §6.2.

### 3.5 Post a news update (blog)

Create `blog/YYYY-MM-DD-Short-Title.md`:

```md
---
title: Short, specific headline
date: '2026-10-20'
tags: ['award', 'AI']
published: true
---

<img src="/updates/my-image.webp" alt="Describe the image"/>

Body text in Markdown…
```

- Put images in `static/updates/` and **use WebP** (see §8.4). Always include `alt`.
- Some older posts have a `cover:` field; nothing on the site reads it, so new posts can leave it out.
- The 5 newest posts appear automatically under "Latest updates" on the homepage.
- **Korean:** optional. Untranslated posts appear in English under `/ko/updates`.
  To translate one, copy the file to
  `i18n/ko/docusaurus-plugin-content-blog/` with the **same filename** and translate it.

### 3.6 Add a gallery item

Add an entry to `src/data/gallery.json`. Put the image in `static/gallery/`.

```json
{
  "title": "Award title",
  "image": "/gallery/MyPhoto.jpg",
  "category": "award",
  "description": "One or two sentences.",
  "date": "October 2026",
  "year": 2026,
  "featured": true,
  "ko": {
    "title": "수상 제목",
    "description": "한두 문장 설명.",
    "date": "2026년 10월"
  }
}
```

- `category`: `community`, `book`, `research`, or `award` (Korean labels already exist).
  A new category also needs a line in `categoryLabel()` in
  `src/components/GalleryList/index.js`.
- **Korean:** the `ko` block. Leave it out and the Korean site shows the English caption.

### 3.7 Add a course offering

The catalog lives in `courses-docs/<course-folder>/`. One Markdown file per semester:

```md
---
sidebar_position: 5
---

# Fall 2026

## Course Name (과목명)
…
```

- A **new course** is a new folder with a `_category_.json` (copy one from an existing course).
- Update the teaching statistics in `src/data/courses/teachingStats.js`. Add the
  semester, enrolment, and evaluation score to the right course. The `/courses`
  numbers are calculated from this file.
- **Korean:** course pages are not translated, by design. Course **category
  names** in the sidebar are translated in
  `i18n/ko/docusaurus-plugin-content-docs-courses/current.json`. Run
  `npm run write-translations -- --locale ko` after adding a course folder, then
  fill in the new entries.

### 3.8 Add student reviews

| File | Shown on |
|---|---|
| `src/data/courses/reviews.json` | `/courses/reviews`: `{id, quote, language: "ko"\|"en", focus: [...]}` |
| `src/data/courses/studentReviews.js` | Carousel on `/courses`: `{id, reviewText, courseName, semester, year, studentName}` |
| `src/data/courses/showcaseProjects.js` | `/courses/showcase` (not linked in the navbar at the moment) |

Reviews are quoted in the student's own language and are never translated.

### 3.9 Change the announcement bar

In `docusaurus.config.js` → `themeConfig.announcementBar`:

1. Change `content` (HTML is allowed; write internal links as `href="/page"`).
2. **Change `id`** (for example `gs2027` → `fall2027`). Visitors who closed the old bar will then see the new one.
3. **Korean:** add the translation under the **new id** in
   `src/theme/AnnouncementBar/Content/index.js` (`TRANSLATIONS`). Links are
   prefixed with `/ko` automatically.

To remove the bar, delete the whole `announcementBar` block.

### 3.10 Change the homepage featured papers

Edit `FeatureList` in `src/components/FeaturedPapers/index.js` (title, image,
DOI, outlet line, three summary rows). Images go in `static/img/`, as WebP about 700 px wide.

**Korean:** the matching entry in `FEATURE_LIST_KO` (same position) holds the
Korean `outlet` and the three summary sentences. Titles stay in English.

### 3.11 Partner logos (homepage slider)

Edit the logo list at the top of `src/components/LogoSlider/index.js`. Files go in
`static/img/logos/`, and you must give the real `width`/`height` in pixels.

### 3.12 Contact details

Contact info appears in **four** places. Change all of them together:

1. `src/pages/contact.mdx`
2. `i18n/ko/docusaurus-plugin-content-pages/contact.mdx`
3. The JSON-LD `contactPoint` (email, phone) in `docusaurus.config.js`
4. `src/pages/team.mdx` (and the Korean copy) for the director's links

---

## 4. Generated data and scripts

Some data files are **produced by scripts**. Don't edit them by hand; run the
script and commit its output.

| Output | Script | When to run | Network? |
|---|---|---|---|
| `src/data/collaborations.json` | `npm run generate:network` | After adding publications | Yes (OpenAlex) |
| `src/pages/credits.mdx` + `i18n/ko/.../credits.mdx` | `npm run generate:credits` | Automatic before `start`/`build` | No |
| `static/api/publications.json` | `npm run generate:publications` | To refresh the search index export | Yes (SerpApi key) |
| `static/api/reviews.json` | `npm run generate:reviews` | To refresh ORCID peer-review data | Yes (ORCID) |
| `src/data/landdots.json` | `node scripts/generate-land-dots.js <map.jpg>` | Practically never (globe dot density) | No |
| `indexing` fields in publication JSON | `node scripts/add-indexing.js` | After adding papers in new venues | No |

### 4.1 Collaboration network (`generate:network`)

- Reads every DOI in `journals.json`, `conferences.json`, and `books.json`, looks up
  co-author affiliations on [OpenAlex](https://openalex.org), and writes
  `src/data/collaborations.json` (countries, institutions, totals).
- Responses are cached in `scripts/.network-cache.json` (committed), so re-runs only
  fetch new DOIs.
- Each country gets an English `name` and a Korean `nameKo`. `nameKo` comes from the
  built-in Korean region names (`Intl.DisplayNames`), so new countries are
  translated automatically.
- If the run reports an **unmapped country code**, add that country's
  approximate centre to the `COUNTRIES` table at the top of
  `scripts/generate-collaboration-network.js` and run again.
- The homepage and `/networks` round their counts down to the nearest 10 ("110+").

### 4.2 Credits page (`generate:credits`)

Lists every npm package and its licence. It writes the English page and the
Korean page from the same data. The Korean headings live in the `STRINGS.ko`
object in `scripts/generate-credits-page.js`. The thank-you bullets come from
`src/data/gratitude.json`, with Korean versions under its `ko` key.

### 4.3 Publications export (`generate:publications`)

Needs a SerpApi key. Copy `scripts/keys.example.json` to `scripts/keys.json` and fill
it in. `keys.json` is gitignored; **never commit it**. The output is uploaded
to Algolia by hand (instructions are at the top of the script).

---

## 5. Site-wide settings

All in `docusaurus.config.js` unless noted.

| Setting | Where |
|---|---|
| Navbar menus | `themeConfig.navbar.items`. Korean labels: `i18n/ko/docusaurus-theme-classic/navbar.json` |
| Footer links and text | `src/theme/Footer/index.js` (not the config). Korean: `i18n/ko/code.json` (`footer.*`) |
| SEO description, keywords, social card | `themeConfig.metadata`, `themeConfig.image` (`static/img/social-media.png`). Keep the description under about 160 characters. |
| Structured data (organisation, contact) | `headTags` → JSON-LD block |
| Search (Algolia DocSearch) | `themeConfig.algolia`. The key is the public search-only key. |
| AI assistant (AINBot) | `themeConfig.algolia.askAi` plus `src/components/AskAiWidget/` |
| Light/dark mode | `themeConfig.colorMode` |
| Old URL redirects | `@docusaurus/plugin-client-redirects` block, plus `_redirects` for host-level redirects |
| Fonts | `src/css/custom.css`: Inter (Latin, self-hosted) and Pretendard (Korean, from the `pretendard` package) |

**Homepage first-visit intro.** The cinematic intro plays once per browser. It
uses the localStorage key `aintlab.introSeen.v1`; clear that key in DevTools
to see it again. Its voiceover and subtitles are English in both languages, and
the subtitles are timed to the audio, so don't edit them without re-timing.

---

## 6. Bilingual (English / Korean) rules

### 6.1 How it works

- English pages are the source. Korean is served under `/ko/` from the files in
  `i18n/ko/`.
- **If a Korean file is missing, the English content is shown under `/ko/`.**
  Nothing breaks, but it isn't translated.
- Locale settings: `i18n` in `docusaurus.config.js`. The language dropdown is the
  `localeDropdown` item in the navbar.

There are four kinds of translated text:

| Kind | Where the Korean lives | How to update |
|---|---|---|
| **Whole content pages** (`.mdx`) | `i18n/ko/docusaurus-plugin-content-pages/<same path>.mdx` | Edit both files by hand |
| **Interface strings** in React code (buttons, labels, headings) | `i18n/ko/code.json` | §6.2 |
| **Navbar, blog title, course sidebar** | `i18n/ko/docusaurus-theme-classic/navbar.json`, `…-blog/options.json`, `…-docs-courses/current.json` | Edit the `message` values |
| **Data with a `ko` field** | Inside the data file (`gallery.json`, `gratitude.json`, `nameKo` in `collaborations.json`, `FEATURE_LIST_KO` in FeaturedPapers) | Edit the `ko` values |

### 6.2 Adding or changing interface text in React code

Never write visible text directly in JSX. Wrap it:

```jsx
import Translate, {translate} from '@docusaurus/Translate';

<h2><Translate id="section.myTitle">My title</Translate></h2>
<input placeholder={translate({id: 'section.search', message: 'Search…'})} />
{translate({id: 'section.count', message: '{n} items'}, {n: items.length})}
```

Then:

```bash
npm run write-translations -- --locale ko   # adds the new ids to i18n/ko/code.json
```

Open `i18n/ko/code.json`, find your new ids (their `message` is still English),
and write the Korean. Rules:

- The `id` and the message must be **literal strings**. `translate({id: someVariable})`
  can't be collected by `write-translations`. For a list, write one literal call per item.
- Call `translate()` **inside a component or function**, not at the top level of a
  module. The existing code uses `getSomething = () => [...]` helpers for this.
- `{placeholders}` must keep the same names in Korean; their order can change.

### 6.3 English pages that have Korean copies

When you edit any of these English files, update the Korean copy too. Each Korean
file names its English source in a comment in its frontmatter.

| English | Korean copy |
|---|---|
| `src/pages/team.mdx` | `i18n/ko/docusaurus-plugin-content-pages/team.mdx` |
| `src/pages/alumni.mdx` | `…/alumni.mdx` |
| `src/pages/_colabs.mdx` | `…/_colabs.mdx` |
| `src/pages/books.mdx` | `…/books.mdx` |
| `src/pages/contact.mdx` | `…/contact.mdx` |
| `src/pages/email-policy.mdx` | `…/email-policy.mdx` |
| `src/pages/gallery.mdx` | `…/gallery.mdx` |
| `src/pages/gs2027.mdx` | `…/gs2027.mdx` (keep the `OPEN`/`CLOSE` dates in sync) |
| `src/pages/projects.mdx` | `…/projects.mdx` |
| `src/pages/prospective.mdx` | `…/prospective.mdx` |
| `src/pages/publications.mdx` | `…/publications.mdx` |
| `src/pages/credits.mdx` | `…/credits.mdx`: **generated, don't edit** |

Things to remember in Korean `.mdx` copies:

- Import local files with `@site/…` paths, not `./…`. For example
  `import styles from '@site/src/pages/team.module.css'`. Relative paths point
  inside `i18n/` and fail.
- Headings that other pages link to keep their English anchor with `{#id}`:
  `### <Highlight color="#0184c6">방문 교수 / 방문 연구자</Highlight> {#visiting-professorsresearchers}`.
  Without it, links like `/alumni/#visiting-professorsresearchers` break (the build warns about it).
- Give each Korean page a `description:` in its frontmatter. Otherwise search
  results show the first line of the page.

### 6.4 Deliberately left in English

Names, paper and book titles, journal data, student review quotes, blog posts,
course pages, the cinematic intro (voice and subtitles), the sample email templates
on `/prospective`, and the large faded background words (decorative).

### 6.5 Korean typography

Rules in `src/css/custom.css` under `html[lang='ko']`: Pretendard first, word-level
line breaking (`word-break: keep-all`), and looser letter-spacing on headings and
small labels. You shouldn't need to touch them.

---

## 7. Checking a change before publishing

1. **Build both languages:** `npm run build`. It must end with two `[SUCCESS]` lines
   and **no `[WARNING]`** about broken links or anchors.
2. **Preview:** `npm run serve`, then open the pages you changed **in both languages**
   (switch with the 한국어 / English menu).
3. **Open the browser console (F12)** on the changed pages. There should be no red
   errors. A `Minified React error #418` / `#423` means the page's HTML is
   malformed; see §8.1.
4. **Look at mobile width:** DevTools → device toolbar, about 390 px wide.
5. **Commit** the generated files together with your change (`collaborations.json`,
   `credits.mdx`, `i18n/ko/code.json`).

**Deployment.** The output is the static `build/` folder (both languages; Korean
in `build/ko/`). Upload or deploy it wherever the site is hosted. The public URL
used for SEO tags is `url` in `docusaurus.config.js`. Before deploying, make sure it
matches the domain the site is actually served from.

---

## 8. Known pitfalls

### 8.1 MDX: block elements inside paragraphs (React errors #418 / #423)

MDX wraps consecutive lines into one paragraph. If those lines contain an `<h3>`,
a `<div>`, a list, or a code block, the browser's HTML parser rearranges them and
React reports a hydration error. **Production builds then re-render the whole page**,
which is slow and flickers. Rules:

- Leave a **blank line after every `<h3>…</h3>`** inside a `<div>`.
- Don't use `<p className="…">` around text that has blank lines. Use `<div className="…">`.
- Don't spread a single `<i>…</i>` or `<b>…</b>` over several lines inside an admonition
  (`:::info`). Use Markdown `*italic*` on one line instead.
- Code fences take a real language: ```` ```text ````, ```` ```python ````, and so on.

### 8.2 MDX: custom components must be capitalised and imported

`<highlight>` (lowercase) renders as a meaningless HTML tag and the style is
lost. Always do this:

```mdx
import Highlight from '@site/src/components/Highlight';

<Highlight color="#0184c6">Label</Highlight>
```

### 8.3 Use `className`, not `class`, in `.mdx`

`class="…"` triggers React warnings. Write `className="…"`.

### 8.4 Image sizes

Anything in `static/` is downloaded by visitors as-is. Keep photos under about 300 KB:
use **WebP**, at most 1600 px wide. An online converter such as [Squoosh](https://squoosh.app)
(WebP, quality about 80) works well. Avoid multi-MB PNG screenshots.

### 8.5 Dev server limitations

- `npm start` shows one language. Use `npm run start:ko` for Korean, or `build` + `serve` for both.
- The dev server doesn't produce hydration errors (§8.1). Only a production build does, so always
  check with `build` + `serve` before publishing.
- If `localhost:3000` refuses to connect on Windows, try `http://[::1]:3000`.

### 8.6 Line endings

The repo uses LF; Git converts to CRLF on Windows checkouts (`core.autocrlf`).
That's harmless. Scripts that search file contents should normalise `\r\n` first.

---

## 9. Reference

### 9.1 Browser storage keys

| Key | Storage | Purpose |
|---|---|---|
| `aintlab.introSeen.v1` | localStorage | First-visit cinematic intro has been seen or skipped |
| `aintlab.askAiNudge.v1` | localStorage | Visitor dismissed the AINBot tip bubble |
| `aintlab.askAiNudge.seen` | sessionStorage | Tip already shown this session |
| `theme` | localStorage | Light/dark choice (Docusaurus) |
| `docusaurus.announcement.id`, `docusaurus.announcement.dismiss` | localStorage | Announcement bar dismissed; reset when the bar's `id` changes (Docusaurus) |

### 9.2 Overridden ("swizzled") Docusaurus components

Docusaurus upgrades can change the components these override. After upgrading
`@docusaurus/*`, check these pages first.

| File | Why it exists |
|---|---|
| `src/theme/Root.js` | Dark-mode fix, layout-column fix, scroll reveals, back-to-top button, AINBot |
| `src/theme/Footer/` | Translatable footer with language-correct links |
| `src/theme/AnnouncementBar/Content/` | Translated announcement text and `/ko` link prefixing |
| `src/theme/SearchBar/` | Enables the AINBot Agent Studio flag; strips Algolia tracking parameters |
| `src/theme/NotFound/Content/` | Animated 404 page |
| `src/theme/Blog*/`, `BlogPostItem/` | Page headers and breadcrumbs for `/updates` |
| `src/theme/DocBreadcrumbs/` | "Courses home" breadcrumb |
| `src/theme/MDXComponents.js` | Legacy lowercase `highlight` mapping (prefer importing `Highlight`, §8.2) |

### 9.3 Legacy files

`src/data/pubs-archive/*.mdx`, `src/pages/pubs/journals.mdx`, and
`scripts/parse-publications.js` come from before publications moved to JSON (`/pubs/journals` still builds but nothing links to it). The
live list is driven by the JSON files in `src/data/`. Don't add new papers to the
`.mdx` archives.
