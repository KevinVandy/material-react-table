export const routes = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/about',
    label: 'About & FAQ',
  },
  {
    href: '/changelog',
    label: 'Changelog & Roadmap',
  },
  {
    label: 'Getting Started',
    href: '/docs',
    items: [
      {
        href: '/docs/install',
        label: 'Install',
      },
      {
        href: '/docs/usage',
        label: 'Usage',
      },
    ],
  },
  {
    label: 'API Reference',
    href: '/docs/api',
    items: [
      {
        href: '/docs/api/props',
        label: 'Props',
      },
      {
        href: '/docs/api/column-options',
        label: 'Column Options',
      },
      {
        href: '/docs/api/state-options',
        label: 'State Options',
      },
    ],
  },
  {
    label: 'Quick Examples',
    href: '/docs/examples',
    items: [
      {
        href: '/docs/examples/basic',
        label: 'Basic Example',
      },
      {
        href: '/docs/examples/minimal',
        label: 'Minimal Example',
      },
      {
        href: '/docs/examples/advanced',
        label: 'Advanced Example',
      },
      {
        href: '/docs/examples/remote',
        label: 'Remote Data Example',
      },
      {
        href: '/docs/examples/react-query',
        label: 'React Query Example',
      },
      {
        href: '/docs/examples/virtualized',
        label: 'Virtualized Example',
      },
    ],
  },
  {
    label: 'Guides',
    href: '/docs/guides',
    items: [
      {
        label: 'Customization',
        href: '/docs/guides#customization',
        items: [
          {
            href: '/docs/guides/customize-css',
            label: 'Customize CSS',
          },
          {
            href: '/docs/guides/customize-mui',
            label: 'Customize MUI',
          },
          {
            href: '/docs/guides/customize-icons',
            label: 'Customize Icons',
          },
          {
            href: '/docs/guides/localization',
            label: 'Localization (i18n)',
          },
        ],
      },
      {
        label: 'Default Feature Guides',
        href: '/docs/guides#default-feature-guides',
        items: [
          {
            href: '/docs/guides/column-actions',
            label: 'Column Actions',
          },
          {
            href: '/docs/guides/column-hiding',
            label: 'Column Hiding',
          },
          {
            href: '/docs/guides/density-toggle',
            label: 'Density Toggle',
          },
          {
            href: '/docs/guides/full-screen-toggle',
            label: 'Full Screen Toggle',
          },
          {
            href: '/docs/guides/filtering',
            label: 'Filtering',
          },
          {
            href: '/docs/guides/global-filtering',
            label: 'Global Filtering (Search)',
          },
          {
            href: '/docs/guides/pagination',
            label: 'Pagination',
          },
          {
            href: '/docs/guides/sorting',
            label: 'Sorting',
          },
        ],
      },
      {
        label: 'More Feature Guides',
        href: '/docs/guides#more-feature-guides',
        items: [
          {
            href: '/docs/guides/aggregation-and-grouping',
            label: 'Aggregation and Grouping',
          },
          {
            href: '/docs/guides/click-to-copy',
            label: 'Click to Copy',
          },
          {
            href: '/docs/guides/column-resizing',
            label: 'Column Resizing',
          },
          {
            href: '/docs/guides/column-ordering',
            label: 'Column Ordering (DnD)',
          },
          {
            href: '/docs/guides/column-pinning',
            label: 'Column Pinning',
          },
          {
            href: '/docs/guides/customize-toolbars',
            label: 'Customize Toolbars',
          },
          {
            href: '/docs/guides/editing',
            label: 'Data Editing (Editable)',
          },
          {
            href: '/docs/guides/detail-panel',
            label: 'Detail Panel (Expanding)',
          },
          {
            href: '/docs/guides/expanded-rows',
            label: 'Expanded Rows (Sub-Rows)',
          },
          {
            href: '/docs/guides/row-actions',
            label: 'Row Actions (Buttons)',
          },
          {
            href: '/docs/guides/row-numbers',
            label: 'Row Numbers',
          },
          {
            href: '/docs/guides/row-selection',
            label: 'Row Selection (Checkboxes)',
          },
          {
            href: '/docs/guides/sticky-header',
            label: 'Sticky Header',
          },
          {
            href: '/docs/guides/row-virtualization',
            label: 'Row Virtualization',
          },
        ],
      },
      {
        label: 'Other Advanced Guides',
        href: '/docs/guides#other-advanced-guides',
        items: [
          {
            href: '/docs/guides/persistent-state',
            label: 'Persistent State',
          },
          {
            href: '/docs/guides/table-state-management',
            label: 'Table State Management',
          },
          {
            href: '/docs/guides/typescript',
            label: 'TypeScript Usage',
          },
        ],
      },
    ],
  },
];
