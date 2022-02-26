import Link from 'next/link';
import { FC } from 'react';
import {
  alpha,
  Divider,
  Drawer as MuiDrawer,
  List as MuiList,
  ListItem as MuiListItem,
  styled,
} from '@mui/material';

const Drawer = styled(MuiDrawer)({
  zIndex: 1,
  position: 'relative',
});

const List = styled(MuiList, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ navOpen?: boolean }>(({ navOpen }) => ({
  overflow: 'visible',
  overflowY: navOpen ? 'auto' : 'hidden',
  marginTop: '64px',
  padding: 0,
  transition: 'all .2s',
  width: navOpen ? '260px' : '0',
}));

const ListItemLevel1 = styled(MuiListItem)(({ theme }) => ({
  color: theme.palette.primary.dark,
  cursor: 'pointer',
  fontWeight: 'bold',
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
  whiteSpace: 'nowrap',
});

interface Props {
  navOpen: boolean;
  setNavOpen: (navOpen: boolean) => void;
}

const SideBar: FC<Props> = ({ navOpen }) => {
  return (
    <Drawer open={navOpen} variant="permanent">
      <List navOpen={navOpen}>
        <Link href="/" passHref>
          <ListItemLevel1>Home</ListItemLevel1>
        </Link>
        <Link href="/about" passHref>
          <ListItemLevel1>About</ListItemLevel1>
        </Link>

        <Divider />

        <ListItemHeader>Getting Started</ListItemHeader>
        <Link href="/docs/install" passHref>
          <ListItemLevel2>Install</ListItemLevel2>
        </Link>
        <Link href="/docs/usage" passHref>
          <ListItemLevel2>Usage</ListItemLevel2>
        </Link>
        <Link href="/docs/props" passHref>
          <ListItemLevel2>All Props</ListItemLevel2>
        </Link>

        <Divider />

        <ListItemHeader>Examples</ListItemHeader>

        <Link href="/docs/examples/basic" passHref>
          <ListItemLevel2>Basic Example</ListItemLevel2>
        </Link>
        <Link href="/docs/examples/minimal" passHref>
          <ListItemLevel2>Minimal Example</ListItemLevel2>
        </Link>
        <Link href="/docs/examples/advanced" passHref>
          <ListItemLevel2>Advanced Example</ListItemLevel2>
        </Link>

        <Divider />

        <ListItemHeader>Default Features</ListItemHeader>
        <Link href="/docs/features/column-actions" passHref>
          <ListItemLevel2>Column Actions</ListItemLevel2>
        </Link>
        <Link href="/docs/features/column-hiding" passHref>
          <ListItemLevel2>Column Hiding</ListItemLevel2>
        </Link>
        <Link href="/docs/features/dense-padding-toggle" passHref>
          <ListItemLevel2>Dense Padding Toggle</ListItemLevel2>
        </Link>
        <Link href="/docs/features/detail-panel" passHref>
          <ListItemLevel2>Detail Panel</ListItemLevel2>
        </Link>
        <Link href="/docs/features/filtering" passHref>
          <ListItemLevel2>Filtering</ListItemLevel2>
        </Link>
        <Link href="/docs/features/full-screen-toggle" passHref>
          <ListItemLevel2>Full Screen Toggle</ListItemLevel2>
        </Link>
        <Link href="/docs/features/pagination" passHref>
          <ListItemLevel2>Pagination</ListItemLevel2>
        </Link>
        <Link href="/docs/features/search" passHref>
          <ListItemLevel2>Search (Global Filtering)</ListItemLevel2>
        </Link>
        <Link href="/docs/features/sorting" passHref>
          <ListItemLevel2>Sorting</ListItemLevel2>
        </Link>

        <ListItemHeader>More Features</ListItemHeader>
        <Link href="/docs/features/customize-css" passHref>
          <ListItemLevel2>Customize CSS</ListItemLevel2>
        </Link>
        <Link href="/docs/features/customize-icons" passHref>
          <ListItemLevel2>Customize Icons</ListItemLevel2>
        </Link>
        <Link href="/docs/features/customize-toolbars" passHref>
          <ListItemLevel2>Customize Toolbars</ListItemLevel2>
        </Link>
        <Link href="/docs/features/column-grouping" passHref>
          <ListItemLevel2>Column Grouping</ListItemLevel2>
        </Link>
        <Link href="/docs/features/column-resizing" passHref>
          <ListItemLevel2>Column Resizing</ListItemLevel2>
        </Link>
        <Link href="/docs/features/localization" passHref>
          <ListItemLevel2>Localization</ListItemLevel2>
        </Link>
        <Link href="/docs/features/row-actions" passHref>
          <ListItemLevel2>Row Actions</ListItemLevel2>
        </Link>
        <Link href="/docs/features/row-editing" passHref>
          <ListItemLevel2>Row (Data) Editing</ListItemLevel2>
        </Link>
        <Link href="/docs/features/row-numbers" passHref>
          <ListItemLevel2>Row Numbers</ListItemLevel2>
        </Link>
        <Link href="/docs/features/row-selection" passHref>
          <ListItemLevel2>Row Selection</ListItemLevel2>
        </Link>
      </List>
    </Drawer>
  );
};

export default SideBar;
