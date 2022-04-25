import { FC, Fragment } from 'react';
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
});

const ListItemHeader = styled(MuiListItem)({
  padding: '1rem',
  height: '2.5rem',
  whiteSpace: 'nowrap',
});

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
    title: 'Getting Started',
    items: [
      {
        href: '/docs/install',
        label: 'Install',
      },
      {
        href: '/docs/usage',
        label: 'Usage',
      },
      {
        href: '/docs/props',
        label: 'All Props',
      },
    ],
  },
  {
    title: 'Quick Examples',
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
        href: '/docs/examples/ssr',
        label: 'SSR Example',
      },
    ],
  },
  {
    title: 'Customization',
    items: [
      {
        href: '/docs/guides/customize-css',
        label: 'Customize CSS & MUI',
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
    title: 'Default Feature Guides',
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
        href: '/docs/guides/dense-padding-toggle',
        label: 'Dense Padding Toggle',
      },
      {
        href: '/docs/guides/filtering',
        label: 'Filtering',
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
        href: '/docs/guides/search',
        label: 'Search (Global Filtering)',
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
  {
    title: 'More Feature Guides',
    items: [
      {
        href: '/docs/guides/click-to-copy',
        label: 'Click to Copy',
      },
      {
        href: '/docs/guides/column-grouping',
        label: 'Column Grouping',
      },
      {
        href: '/docs/guides/column-resizing',
        label: 'Column Resizing',
      },
      {
        href: '/docs/guides/customize-toolbars',
        label: 'Customize Toolbars',
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
        href: '/docs/guides/row-editing',
        label: 'Row Editing (Editable)',
      },
      {
        href: '/docs/guides/row-numbers',
        label: 'Row Numbers',
      },
      {
        href: '/docs/guides/selection',
        label: 'Selection (Checkboxes)',
      },
    ],
  },
  {
    title: 'Other Advanced Guides',
    items: [
      {
        href: '/docs/guides/typescript',
        label: 'TypeScript Usage',
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
        zIndex: 1,
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
          width: navOpen ? '260px' : 0,
          '@media (max-width: 900px)': {
            mt: '50px',
          },
        }}
      >
        {navItems.map(({ title, href, label, items }, index) => {
          if (title && !!items?.length) {
            return (
              <Fragment key={index}>
                <Divider />
                <ListItemHeader>{title}</ListItemHeader>
                {items?.map(({ href: href2, label: label2 }, index2) => {
                  return (
                    <Link key={index2} href={href2} passHref>
                      <ListItemLevel2
                        onClick={handleCloseMenu}
                        selected={pathname === href2}
                      >
                        {label2}
                      </ListItemLevel2>
                    </Link>
                  );
                })}
              </Fragment>
            );
          } else {
            return (
              <Link key={index} href={href as string} passHref>
                <ListItemLevel1
                  onClick={handleCloseMenu}
                  selected={pathname === href}
                >
                  {label}
                </ListItemLevel1>
              </Link>
            );
          }
        })}
      </List>
    </Drawer>
  );
};

export default SideBar;
