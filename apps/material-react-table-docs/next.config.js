/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ['material-react-table', '@mui/x-charts'],
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async redirects() {
    return [
      {
        source: '/migrating-to-v2',
        destination: '/docs/getting-started/migrating-to-v2',
        permanent: true,
      },
      {
        source: '/docs/guides/memoize-components',
        destination: '/docs/guides/memoization',
        permanent: true,
      },
      {
        source: '/docs/guides/aggregation-and-grouping',
        destination: '/docs/guides/column-grouping',
        permanent: true,
      },
      {
        source: '/docs/guides/typescript',
        destination: '/docs/guides/best-practices',
        permanent: true,
      },
      {
        source: '/docs/examples/data-export',
        destination: '/docs/examples/export-csv',
        permanent: true,
      },
      {
        source: '/docs/guides/customize-toolbars',
        destination: '/docs/guides/toolbar-customization',
        permanent: true,
      },
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
      {
        source: '/docs/api/props',
        destination: '/docs/api/table-options',
        permanent: true,
      },
      {
        source: '/docs/guides/table-state-management',
        destination: '/docs/guides/state-management',
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
