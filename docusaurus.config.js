// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Applied INTelligence Lab (AINTLab)',
  tagline: '"AINTLab" is not only a laboratory but also a playground to learn and explore things related to applied intelligence and the internet of things.',
  url: 'https://aintlab.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/img/favicon.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  //organizationName: 'justudin', // Usually your GitHub org/user name.
  //projectName: 'research-site', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          routeBasePath: '/updates',
          blogTitle: 'Recent updates',
          blogSidebarCount: 0,
          postsPerPage: 7,
          showReadingTime: true,
          feedOptions: {
            type: 'all',
            copyright: `Copyright © 2019-${new Date().getFullYear()} Applied INTelligence Lab (AINTLab), Department of Artificial Intelligence and Data Science, Sejong University, Seoul 05006, Republic of Korea; Lead by Muhammad Syafrudin.`,
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:{
    // Declare some <meta> tags
    metadata: [
      {name: 'keywords', content: 'Applied Intelligence Lab, AINTLab, AI research publications, artificial intelligence papers, machine learning publications, deep learning research, IoT research, RFID in supply chain, sustainable agriculture papers, self-supervised learning, self-organizing maps, vessel detection, human action recognition, transformer models, agricultural technology research, AgriTech publications, predictive analytics papers, AI for agriculture, AI-powered innovation, scientific articles, AI in agriculture, academic publications, AI research, machine learning, deep learning, artificial intelligence lab, IoT, RFID, sustainable agriculture, satellite imagery, AI-powered solutions, food security, agricultural data analysis, AgriTech solutions, AI innovation, Applied INTelligence Lab (AINTLab), Department of Artificial Intelligence and Data Science, Sejong University, Seoul 05006, Republic of Korea'},
      {name: 'twitter:card', content: 'Applied INTelligence Lab (AINTLab) - AINTLab.com is not only a laboratory but also a playground to learn and explore things related to applied intelligence and the internet of things. AINTLab is a hub for learning and innovation in applied intelligence and IoT. Pioneering Artificial Intelligence research, AINTLab focuses on machine learning, deep learning, IoT, and self-supervised learning. Our expertise drives agricultural innovation, vessel detection, human action recognition, and predictive analytics, promoting sustainable agriculture and global food security. Explore our extensive collection of research publications on AI, machine learning, IoT, and sustainable agriculture, featuring groundbreaking work on transformer models, predictive analytics, and more.'},
      {name: 'description', content: 'Applied INTelligence Lab (AINTLab) - AINTLab.com is not only a laboratory but also a playground to learn and explore things related to applied intelligence and the internet of things. AINTLab is a hub for learning and innovation in applied intelligence and IoT. Pioneering Artificial Intelligence research, AINTLab focuses on machine learning, deep learning, IoT, and self-supervised learning. Our expertise drives agricultural innovation, vessel detection, human action recognition, and predictive analytics, promoting sustainable agriculture and global food security. Explore our extensive collection of research publications on AI, machine learning, IoT, and sustainable agriculture, featuring groundbreaking work on transformer models, predictive analytics, and more.'},
    ],
    headTags: [
      // Declare some json-ld structured data
      {
        tagName: 'script',
        attributes: {
          type: 'application/ld+json',
        },
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org/',
          '@type': 'Organization',
          name: 'Applied INTelligence Lab (AINTLab)',
          url: 'https://aintlab.com/',
          description: 'Applied INTelligence Lab (AINTLab) - AINTLab.com is not only a laboratory but also a playground to learn and explore things related to applied intelligence and the internet of things. AINTLab is a hub for learning and innovation in applied intelligence and IoT. Pioneering Artificial Intelligence research, AINTLab focuses on machine learning, deep learning, IoT, and self-supervised learning. Our expertise drives agricultural innovation, vessel detection, human action recognition, and predictive analytics, promoting sustainable agriculture and global food security. Explore our extensive collection of research publications on AI, machine learning, IoT, and sustainable agriculture, featuring groundbreaking work on transformer models, predictive analytics, and more.',
          foundingDate: '2019',
          founder: {
            '@type': 'Person',
            name: 'Muhammad Syafrudin',
            identifier: [
              'https://www.wikidata.org/entity/Q61147698',
              'https://mathgenealogy.org/id.php?id=297235',
              'https://www.google.com/search?kgmid=/g/11fmgyc_gp',
              'https://dblp.org/pid/216/5849.html',
              'https://orcid.org/0000-0002-5640-4413',
              'https://www.webofscience.com/wos/author/record/1733012',
              'https://scholar.google.co.kr/citations?user=WLTzkOMAAAAJ&hl=en',
              'https://muhammadsyafrudin.com/',
              'https://www.scopus.com/authid/detail.uri?authorId=57197741727',
              'https://www.researchgate.net/profile/Muhammad-Syafrudin',
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
            'email': 'udin@aintlab.com',
            'telephone': '+82-2-3408-1879'
          },
          sameAs: [
            'https://www.linkedin.com/company/aintlab',
          ],
          logo: 'https://aintlab.com/img/favicon.png',
        }),
      },
    ],
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      navbar: {
        title: '',
        logo: {
          alt: '"AINTLab" is not only a laboratory but also a playground to learn and explore things related to applied intelligence and the internet of things.',
          src: '/img/research.svg',
          srcDark: '/img/research-dark.svg',
        },
        items: [
        /**
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'All Research',
          },
          **/
          {
            to: 'team',
            position: 'left',
            label: 'Our Team',
          },
          {
            to: 'projects',
            position: 'left',
            label: 'Projects',
          },
          {
            to: 'publications',
            position: 'left',
            label: 'Publications',
          },
          {
            to: 'books',
            position: 'left',
            label: 'Books',
          },
          {
            to: 'updates',
            position: 'left',
            label: 'Updates',
          },
          {
            to: 'contact',
            position: 'left',
            label: 'Contact',
          },
          {
            href: 'https://courses.muhammadsyafrudin.com',
            position: 'right',
            label: 'Courses',
          }
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © 2019-${new Date().getFullYear()} <a href="https://aintlab.com/" style="color:white"target="_blank">Applied INTelligence Lab (AINTLab)</a>, Department of Artificial Intelligence and Data Science, Sejong University, Seoul 05006, Republic of Korea; Lead by <a href="https://muhammadsyafrudin.com/" style="color:white"target="_blank">Muhammad Syafrudin</a>. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
  },
};

module.exports = config;
