type RouteItem = { href: string; label: string; items?: RouteItem[] };

export const routes: Array<RouteItem> = [
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
    href: '/docs/getting-started',
    items: [
      {
        href: '/docs/getting-started/install',
        label: 'Install',
      },
      {
        href: '/docs/getting-started/usage',
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
        href: '/docs/examples/data-export',
        label: 'Data Export Example',
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
      {
        href: '/docs/examples/infinite-scrolling',
        label: 'Infinite Scrolling Example',
      },
    ],
  },
  {
    label: 'Guides',
    href: '/docs/guides',
    items: [
      {
        label: 'Fundamentals',
        href: '/docs/guides#fundamentals',
        items: [
          {
            href: '/docs/guides/data-columns',
            label: 'Create Data Columns',
          },
          {
            href: '/docs/guides/display-columns',
            label: 'Create Display Columns',
          },
          {
            href: '/docs/guides/customize-components',
            label: 'Customize Components',
          },
          {
            href: '/docs/guides/customize-icons',
            label: 'Customize Icons',
          },
          {
            href: '/docs/guides/customize-toolbars',
            label: 'Customize Toolbars',
          },
          {
            href: '/docs/guides/localization',
            label: 'Localization (i18n)',
          },
          {
            href: '/docs/guides/table-event-listeners',
            label: 'Table Event Listeners',
          },
          {
            href: '/docs/guides/table-state-management',
            label: 'Table State Management',
          },
        ],
      },
      {
        label: 'Feature Guides',
        href: '/docs/guides#feature-guides',
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
            href: '/docs/guides/column-actions',
            label: 'Column Actions',
          },
          {
            href: '/docs/guides/column-dragging',
            label: 'Column Dragging',
          },
          {
            href: '/docs/guides/column-filtering',
            label: 'Column Filtering',
          },
          {
            href: '/docs/guides/column-hiding',
            label: 'Column Hiding',
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
            href: '/docs/guides/column-resizing',
            label: 'Column Resizing',
          },
          {
            href: '/docs/guides/density-toggle',
            label: 'Density Toggle',
          },
          {
            href: '/docs/guides/detail-panel',
            label: 'Detail Panel (Expanding)',
          },
          {
            href: '/docs/guides/editing',
            label: 'Editing (Editable)',
          },
          {
            href: '/docs/guides/expanding-sub-rows',
            label: 'Expanding Sub-Rows (Tree)',
          },
          {
            href: '/docs/guides/full-screen-toggle',
            label: 'Full Screen Toggle',
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
            href: '/docs/guides/row-actions',
            label: 'Row Actions (Buttons)',
          },
          {
            href: '/docs/guides/row-dragging',
            label: 'Row Dragging',
          },
          {
            href: '/docs/guides/row-numbers',
            label: 'Row Numbers',
          },
          {
            href: '/docs/guides/row-ordering',
            label: 'Row Ordering (DnD)',
          },
          {
            href: '/docs/guides/row-selection',
            label: 'Row Selection (Checkboxes)',
          },
          {
            href: '/docs/guides/row-virtualization',
            label: 'Row Virtualization',
          },
          {
            href: '/docs/guides/sorting',
            label: 'Sorting',
          },
          {
            href: '/docs/guides/sticky-header',
            label: 'Sticky Header',
          },
        ],
      },
    ],
  },
];
