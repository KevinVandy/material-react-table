module.exports = {
  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-addon-paddings',
    '@storybook/addon-storysource',
    'storybook-addon-performance/register',
    'storybook-dark-mode',
    '@etchteam/storybook-addon-status',
  ],
  typescript: {
    check: true,
  },
};
