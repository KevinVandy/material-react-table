/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://www.tailwindcss-react-table.com',
  generateRobotsTxt: true,
  changefreq: null,
  priority: null,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/data', '/proxy'],
      },
    ],
  },
};

module.exports = config;
