/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ['material-react-table'],
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
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
      {
        source: '/docs/guides/row-virtualization',
        destination: '/docs/guides/virtualization',
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
