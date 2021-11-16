module.exports = {
  pathPrefix: '/memory-match',
  plugins: [
    'gatsby-plugin-csp',
    'gatsby-plugin-postcss',
    'gatsby-plugin-preact',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en'
      }
    }
  ],
  siteMetadata: {
    title: 'Memory Match',
    description: 'Single player version of Memory Match',
    author: 'Jaskarn Mankoo'
  }
};
