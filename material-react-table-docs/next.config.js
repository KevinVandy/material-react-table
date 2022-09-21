/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          {
            key: 'Access-Control-Allow-Origin',
            value:
              'https://www.material-react-table.com/, https://xb1wck.sse.codesandbox.io/',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/docs/guides/filtering',
        destination: '/docs/guides/column-filtering',
        permanent: true,
      },
      {
        source: '/docs/install',
        destination: '/docs/getting-started/install',
        permanent: true,
      },
      {
        source: '/docs/usage',
        destination: '/docs/getting-started/usage',
        permanent: true,
      },
      {
        source: '/docs/guides/column-ordering',
        destination: '/docs/guides/column-ordering-dnd',
        permanent: true,
      },
      {
        source: '/docs/guides/column-dragging',
        destination: '/docs/guides/column-ordering-dnd',
        permanent: true,
      },
      {
        source: '/docs/guides/row-dragging',
        destination: '/docs/guides/row-ordering-dnd',
        permanent: true,
      },
      {
        source: '/docs/guides/row-ordering',
        destination: '/docs/guides/row-ordering-dnd',
        permanent: true,
      },
    ];
  },
};

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
  },
});

const { withPlausibleProxy } = require('next-plausible');

module.exports = {
  ...withPlausibleProxy()({ ...nextConfig }),
  ...withMDX({
    pageExtensions: ['js', 'ts', 'tsx', 'jsx', 'md', 'mdx'],
  }),
};
