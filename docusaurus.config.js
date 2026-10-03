// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes: prismThemes} = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Applied INtelligence (AIN) Lab',
  tagline: 'Applied INtelligence (AIN) Lab is not only a laboratory but also a playground to learn and explore things related to applied intelligence.',
  url: 'https://ain.kookmin.ac.kr',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: '/img/favicon.png',

  // English is the default and lives at /. Korean lives under /ko/; any page
  // without a Korean translation (i18n/ko/...) falls back to the English
  // content, so translation can proceed page by page. UI strings live in
  // i18n/ko/code.json and i18n/ko/docusaurus-theme-classic/*.json — run
  // `npm run write-translations -- --locale ko` to pick up new ones.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ko'],
    localeConfigs: {
      en: {label: 'English', htmlLang: 'en'},
      ko: {label: '한국어', htmlLang: 'ko'},
    },
  },

  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  plugins: [
    [
      // Safety net for links that used to live on the courses subdomain. If
      // courses.muhammadsyafrudin.com is 301'd to this site preserving the
      // path, these catch the result and move it under /courses.
      //
      // The old courses root (/) is deliberately NOT redirected here — that
      // path is this site's own homepage. Mapping the subdomain root to
      // /courses has to happen at the host level (see README).
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            // The courses site had its own auto-generated credits page. After
            // the merge both sites share one dependency tree, so /credits is
            // the single source of truth.
            from: '/courses/credits',
            to: '/credits',
          },
        ],
        createRedirects(existingPath) {
          if (existingPath.startsWith('/courses/learn')) {
            return [existingPath.replace('/courses/learn', '/learn')];
          }
          if (
            existingPath === '/courses/reviews' ||
            existingPath === '/courses/showcase' ||
            existingPath === '/courses/about'
          ) {
            return [existingPath.replace('/courses', '')];
          }
          return undefined;
        },
      },
    ],
    [
      // Course catalog, merged in from the former courses.muhammadsyafrudin.com
      // site. A dedicated docs instance (rather than a second sidebar on a
      // shared instance) keeps the catalog on its own content root, so it can
      // be reorganised or versioned independently of the research site.
      // The classic preset's default docs instance stays disabled.
      '@docusaurus/plugin-content-docs',
      {
        id: 'courses',
        path: 'courses-docs',
        routeBasePath: 'courses/learn',
        sidebarPath: require.resolve('./sidebarsCourses.js'),
      },
    ],
    [
      // Wrapped blog plugin (see plugins/blog-plugin.js) — same options as the
      // classic preset's blog, plus recent posts exposed as global data.
      require.resolve('./plugins/blog-plugin'),
      {
        routeBasePath: '/updates',
        blogTitle: 'Recent updates',
        blogSidebarCount: 0,
        postsPerPage: 7,
        showReadingTime: true,
        feedOptions: {
          type: 'all',
          copyright: `Copyright © ${new Date().getFullYear()} Applied INtelligence (AIN) Lab; Led by Muhammad Syafrudin.`,
        },
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  headTags: [
    // First-visit cinema mode, pre-paint: on the homepage, when the intro has
    // not been seen (aintlab.introSeen.v1) and motion is allowed, mark the
    // document before the first paint so the navbar/page content never flash
    // ahead of the Hero3D intro. The class is reconciled (removed or swapped
    // for intro-running) by HomepageHeader once React hydrates; a CSS timer
    // fallback in custom.css restores the page if hydration never happens.
    // Matches every locale's homepage (/ and /ko/) — the homepage component
    // decides on the intro from localStorage alone, so this must agree.
    {
      tagName: 'script',
      attributes: {},
      innerHTML:
        "(function(){try{var p=location.pathname;if(!/^\\/(ko\\/?)?(index\\.html)?$/.test(p))return;if(window.localStorage.getItem('aintlab.introSeen.v1')==='1')return;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('intro-pending');d.setAttribute('data-intro-pending','1');}catch(e){}})();",
    },
    // Preload the two most-used self-hosted Inter weights (body text + bold
    // headings) so they're discovered by the browser's preload scanner
    // immediately, instead of waiting on CSS to be parsed.
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        href: '/fonts/inter/inter-400-latin.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        href: '/fonts/inter/inter-700-latin.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous',
      },
    },
    // Declare some json-ld structured data
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'Organization',
        name: 'Applied INtelligence (AIN) Lab',
        url: 'https://ain.kookmin.ac.kr/',
        description: 'Applied INtelligence (AIN) Lab is not only a laboratory but also a playground to learn and explore things related to applied intelligence. We explore the frontier of artificial intelligence, data science, and intelligent systems. We design AI-driven solutions that connect systems, enhance communication, and promote sustainability. Through collaboration across academia and industry, we aim to build systems that shape a smarter, more connected world. AIN Lab is a hub for learning and innovation in applied intelligence and IoT. Pioneering Artificial Intelligence research, AIN Lab focuses on machine learning, deep learning, IoT, and self-supervised learning. Our expertise drives agricultural innovation, vessel detection, human action recognition, and predictive analytics, promoting sustainable agriculture and global food security. Explore our extensive collection of research publications on AI, machine learning, IoT, and sustainable agriculture, featuring groundbreaking work on transformer models, predictive analytics, and more.',
        foundingDate: '2019',
        founder: {
          '@type': 'Person',
          name: 'Muhammad Syafrudin',
          identifier: [
            'https://mathgenealogy.org/id.php?id=297235',
            'https://www.google.com/search?kgmid=/g/11fmgyc_gp',
            'https://orcid.org/0000-0002-5640-4413',
            'https://scholar.google.co.kr/citations?user=WLTzkOMAAAAJ&hl=en',
            'https://ain.my.id/courses',
            'https://ain.my.id/',
            'https://ain.kookmin.ac.kr/courses',
            'https://ain.kookmin.ac.kr/',
          ]
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Seoul',
          addressCountry: 'KR'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          'contactType': 'Contact Support',
          'email': 'hi@ain.my.id',
          'telephone': '+82-2-910-6853'
        },
        sameAs: [
          'https://www.linkedin.com/company/ainlab',
        ],
        logo: 'https://ain.kookmin.ac.kr/img/favicon.png',
      }),
    },
  ],

  themeConfig:{
    // Site-wide banner above the navbar. Bump `id` when the message changes so
    // visitors who dismissed the previous one see the new announcement.
    announcementBar: {
      id: 'gs2027',
      // English source. Translations (keyed by `id`) and locale-prefixed
      // links are handled by src/theme/AnnouncementBar/Content — add the
      // Korean copy there when you bump the id.
      content:
        '📢 We\'re hiring graduate students for Spring 2027! Applications open 8 October, 10:00 KST. <a href="/gs2027">See the call for applications →</a>',
      backgroundColor: '#0e59a9',
      textColor: '#ffffff',
      isCloseable: true,
    },
    // Colour mode: follow the visitor's OS light/dark preference on first
    // visit, keep the navbar toggle so they can override it, and let Docusaurus
    // persist that choice in localStorage (key: "theme") across sessions.
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    // Algolia DocSearch (rendered by @docusaurus/theme-search-algolia from the
    // classic preset). The apiKey is the public search-only key from the
    // DocSearch dashboard — safe to commit. contextualSearch is off because the
    // index is a plain DocSearch crawl without docusaurus_tag facets; leaving
    // it on would filter every result out.
    algolia: {
      appId: 'EL5FDZ45P0',
      apiKey: 'aa7c0138715588bb95f31148084ec7d4',
      indexName: 'AIN Website',
      contextualSearch: false,
      // Ask AI assistant (Algolia Agent Studio). The validator auto-fills
      // appId/apiKey/indexName from the fields above. The assistant also needs
      // `agentStudio: true`, which the theme's config validator doesn't accept
      // yet — src/theme/SearchBar/index.js injects it at render time.
      askAi: {
        assistantId: '8af6b335-c3bf-4659-92cc-7d21d8221a49',
      },
    },
    // Social card used for og:image / twitter:image on every page.
    image: 'img/social-media.png',
    // Declare some <meta> tags. Keep the description under ~160 characters —
    // search engines truncate anything longer.
    metadata: [
      {name: 'keywords', content: 'Applied INtelligence Lab, AIN Lab, Kookmin University, artificial intelligence, machine learning, deep learning, IoT, RFID, self-supervised learning, sustainable agriculture, AgriTech, predictive analytics, vessel detection, human action recognition, AI research publications'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'description', content: 'Applied INtelligence (AIN) Lab at Kookmin University, Seoul — research in applied AI, machine learning, deep learning, IoT, and AI for sustainable agriculture.'},
    ],
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      navbar: {
        title: '',
        logo: {
          alt: 'Applied INtelligence (AIN) Lab home',
          src: '/img/favicon.svg',
          srcDark: '/img/favicon-dark.svg',
          width: 64,
          height: 64,
        },
        items: [
          {
            // Research output, grouped so the bar balances around the centred
            // logo instead of carrying six flat left-aligned links.
            type: 'dropdown',
            position: 'left',
            label: 'Our Research',
            items: [
              {
                to: '/projects',
                label: 'Projects',
              },
              {
                to: '/publications',
                label: 'Publications',
              },
            ],
          },
          {
            // Everything about the lab itself — people, life, and news.
            type: 'dropdown',
            position: 'left',
            label: 'AIN Lab',
            items: [
              {
                to: '/team',
                label: 'The Team',
              },
              {
                to: '/gallery',
                label: 'Gallery',
              },
              {
                to: '/updates',
                label: 'Updates',
              },
            ],
          },
          {
            // Formerly an external link to courses.muhammadsyafrudin.com; the
            // courses site now lives under /courses. The dropdown carries the
            // old site's own nav (All Courses / Reviews / Showcase / About)
            // without adding top-level items to the main navbar.
            type: 'dropdown',
            position: 'left',
            label: 'Courses',
            to: '/courses',
            items: [
              {
                to: '/courses',
                label: 'Overview',
              },
              {
                type: 'docSidebar',
                docsPluginId: 'courses',
                sidebarId: 'coursesSidebar',
                label: 'All Courses',
              },
              /*
              {
                to: '/courses/reviews',
                label: 'Reviews',
              },
              {
                to: '/courses/showcase',
                label: 'Showcase',
              },
              */
              {
                to: '/courses/about',
                label: 'About',
              },
            ],
          },
          {
            to: 'contact',
            position: 'right',
            label: 'Contact Us',
          },
          {
            // English ⇄ 한국어. Pages without a Korean translation fall back
            // to English content under the /ko/ prefix.
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      // Rendered by the swizzled src/theme/Footer (locale-aware links and
      // translatable labels); only the style is read from here.
      footer: {
        style: 'dark',
      },
      // Applies to the `courses` docs instance — the only docs instance on the
      // site. Carried over from the former courses site's themeConfig.
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
  },
};

module.exports = config;
