module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "link-shortener",
  },
  plugins: ['gatsby-plugin-sass', {
    resolve: 'gatsby-plugin-apollo',
    options: {
      uri: 'http://localhost:4000'
    }
  }],
};
