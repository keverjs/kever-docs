module.exports = {
  title: 'kever.js',
  description: 'node.js framework',
  base: '/kever-docs/',
  themeConfig: {
    logo: '/assets/img/logo.png',
    nav: require('./nav/index.js'),
    sidebar: {
      '/guide/': require('./sidebar/guide.js'),
      '/api/': require('./sidebar/api.js'),
    },
    lastUpdated: 'Last Updated',
    nextLinks: false,
    prevLinks: false,
    smoothScroll: true,
  },
}
