/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'User1',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/docusaurus.svg'.
    image: '/diary/img/logo.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

const siteConfig = {
  title: '日记' /* title for your website */,
  tagline: 'The Diary of Shiyong Yin',
  url: 'https://your-docusaurus-test-site.com' /* your website url */,
  baseUrl: '/diary/' /* base url for your project */,
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'diary',
  organizationName: 'ysyfff',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    // {doc: 'doc1', label: 'Docs'},
    // {doc: 'doc4', label: 'API'},
    // {page: 'help', label: 'Help'},
    { blog: true, label: 'Diary' },
    {
      href: 'https://github.com/ysyfff/diary',
      label: 'GitHub',
    },
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/logo.svg',
  footerIcon: 'img/docusaurus.svg',
  favicon: 'img/favicon/favicon.ico',

  /* colors for website */
  colors: {
    // primaryColor: '#ff4081',
    primaryColor: '#21c555',
    secondaryColor: 'blue',
  },

  /* custom fonts for website */
  /*fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' + 
    '2018-' +
    new Date().getFullYear() +
    ' Shiyong Yin',

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'atom-one-dark',
  },

  // Add custom scripts here that would be placed in <script> tags
  scripts: ['https://buttons.github.io/buttons.js'],

  /* On page navigation for the current documentation page */
  onPageNav: 'separate',

  /* Open Graph and Twitter card images */
  ogImage: 'img/docusaurus.png',
  twitterImage: 'img/docusaurus.png',

  blogSidebarCount: 'ALL',
  scrollToTop: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
  algolia: {
    apiKey: 'ab87fbb1dabfa3bd00662f0f793a313f',
    indexName: 'ysyfff',
    algoliaOptions: {} // Optional, if provided by Algolia
  },
};

module.exports = siteConfig;


