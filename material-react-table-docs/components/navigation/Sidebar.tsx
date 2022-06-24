import { FC, Fragment, Key } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  alpha,
  Divider,
  Drawer,
  List,
  ListItem as MuiListItem,
  styled,
  useMediaQuery,
} from '@mui/material';

const ListItemLevel1 = styled(MuiListItem)(({ theme }) => ({
  color: theme.palette.primary.dark,
  cursor: 'pointer',
  fontSize: '1rem',
  height: '2.5rem',
  padding: '1rem',
  transition: 'all .3s ease',
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

const ListItemLevel2 = styled(ListItemLevel1)({
  paddingLeft: '2rem',
  height: '2rem',
});

const ListItemLevel3 = styled(ListItemLevel2)({
  paddingLeft: '3rem',
});

const ListItemHeaderLevel1 = styled(MuiListItem)(({ theme }) => ({
  cursor: 'pointer',
  fontSize: '1.25rem',
  height: '2.5rem',
  padding: '1rem',
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

const ListItemHeaderLevel2 = styled(ListItemHeaderLevel1)(({ theme }) => ({
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.grey[300]
      : theme.palette.grey[700],
  cursor: 'default',
  fontSize: '1rem',
  paddingLeft: '2rem',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0),
  },
}));

const navItems = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/about',
    label: 'About',
  },
  {
    label: 'Getting Started',
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
    label: 'API',
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
    ],
  },
  {
    label: 'Guides',
    href: '/docs/guides',
    items: [
      {
        label: 'Customization',
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
            href: '/docs/guides/filtering',
            label: 'Filtering',
          },
          {
            href: '/docs/guides/global-filtering',
            label: 'Global Filtering (Search)',
          },
          {
            href: '/docs/guides/full-screen-toggle',
            label: 'Full Screen Toggle',
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
            href: '/docs/guides/persistent-state',
            label: 'Persistent State',
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
        items: [
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

interface Props {
  navOpen: boolean;
  setNavOpen: (navOpen: boolean) => void;
}

const SideBar: FC<Props> = ({ navOpen, setNavOpen }) => {
  const { pathname } = useRouter();
  const isTablet = useMediaQuery('(max-width: 900px)');

  const handleCloseMenu = () => {
    if (isTablet) setTimeout(() => setNavOpen(false), 400);
  };

  return (
    <Drawer
      // @ts-ignore
      PaperProps={{ component: 'aside' }}
      open={navOpen}
      onClose={() => setNavOpen(false)}
      variant={isTablet ? 'temporary' : 'permanent'}
      sx={{
        zIndex: 4,
        position: 'relative',
      }}
    >
      <List
        sx={{
          overflow: 'visible',
          overflowY: navOpen ? 'overlay' : 'hidden',
          mt: '64px',
          p: 0,
          pb: '10rem',
          transition: 'all .2s',
          width: navOpen ? '280px' : 0,
          '@media (max-width: 900px)': {
            mt: '50px',
          },
        }}
      >
        {navItems.map(
          ({ href: href1, items: items1, label: label1 }, index1) => {
            if (items1?.length) {
              return (
                <Fragment key={index1}>
                  <Divider />
                  <Link href={href1 ?? ''} passHref>
                    <ListItemHeaderLevel1>{label1}</ListItemHeaderLevel1>
                  </Link>
                  {items1?.map(
                    (
                      { href: href2, label: label2, items: items2 }: any,
                      index2,
                    ) => {
                      if (items2?.length) {
                        return (
                          <Fragment key={index2}>
                            <Link href={href2 ?? ''} passHref>
                              <ListItemHeaderLevel2>
                                {label2}
                              </ListItemHeaderLevel2>
                            </Link>
                            {items2?.map(
                              ({ href: href3, label: label3 }, index3) => {
                                return (
                                  <Link
                                    key={index3}
                                    href={href3 ?? ''}
                                    passHref
                                  >
                                    <ListItemLevel3
                                      onClick={handleCloseMenu}
                                      selected={pathname === href3}
                                    >
                                      {label3}
                                    </ListItemLevel3>
                                  </Link>
                                );
                              },
                            )}
                          </Fragment>
                        );
                      }
                      return (
                        <Link key={index2} href={href2 ?? ''} passHref>
                          <ListItemLevel2
                            onClick={handleCloseMenu}
                            selected={pathname === href2}
                          >
                            {label2}
                          </ListItemLevel2>
                        </Link>
                      );
                    },
                  )}
                </Fragment>
              );
            } else {
              return (
                <Link key={index1} href={href1 ?? ''} passHref>
                  <ListItemLevel1
                    onClick={handleCloseMenu}
                    selected={pathname === href1}
                  >
                    {label1}
                  </ListItemLevel1>
                </Link>
              );
            }
          },
        )}
      </List>
    </Drawer>
  );
};

export default SideBar;
