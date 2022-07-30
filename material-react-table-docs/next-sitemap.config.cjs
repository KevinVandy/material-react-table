/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://www.material-react-table.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/data'],
      },
    ],
  },
};

module.exports = config;
