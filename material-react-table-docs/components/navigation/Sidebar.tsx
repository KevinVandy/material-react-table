import Link from 'next/link';
import { FC } from 'react';
import {
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

const List = styled(MuiList)({
  padding: '80px 0',
});

const ListItemLevel1 = styled(MuiListItem)(({ theme }) => ({
  color: theme.palette.primary.dark,
  cursor: 'pointer',
  fontWeight: 'bold',
  padding: '1rem',
  transition: 'all .3s ease',
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
}));

const ListItemLevel2 = styled(ListItemLevel1)({
  paddingLeft: '2rem',
});

const ListItemHeader = styled(MuiListItem)({
  padding: '1rem',
});

interface Props {
  navOpen: boolean;
  setNavOpen: (navOpen: boolean) => void;
}

const SideBar: FC<Props> = ({ navOpen, setNavOpen }) => {
  return (
    <Drawer open={navOpen} variant="permanent">
      <List style={{ width: navOpen ? '240px' : '0', transition: 'all .2s' }}>
        <Link href="/" passHref>
          <ListItemLevel1>Home</ListItemLevel1>
        </Link>
        <Divider />
        <ListItemHeader>Getting Started</ListItemHeader>
        <Link href="/docs/install" passHref>
          <ListItemLevel2>Install</ListItemLevel2>
        </Link>
        <Link href="/docs/props" passHref>
          <ListItemLevel2>All Props</ListItemLevel2>
        </Link>
        <Divider />
        <ListItemHeader>Examples</ListItemHeader>
        <Link href="/docs/examples/basic" passHref>
          <ListItemLevel2>Basic</ListItemLevel2>
        </Link>
      </List>
    </Drawer>
  );
};

export default SideBar;
