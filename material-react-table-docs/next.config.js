/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
};

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

module.exports = withMDX({
  ...nextConfig,
  pageExtensions: ['js', 'ts', 'tsx', 'jsx', 'md', 'mdx'],
});
