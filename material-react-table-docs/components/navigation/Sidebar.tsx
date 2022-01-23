import type { NextPage } from 'next';
import {
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List as MuiList,
  ListItem,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

const Drawer = styled(MuiDrawer)({
  zIndex: 1,
  position: 'relative',
});

const List = styled(MuiList)({
  paddingTop: '100px',
});

const SideBar: NextPage = ({ navOpen, setNavOpen }) => {
  return (
    <Drawer open={navOpen} variant="permanent">
      <List style={{ width: navOpen ? '200px' : '0', transition: 'all .2s' }}>
        <ListItem>
          <Link href="/">Home</Link>
        </ListItem>
        <Divider />
        <ListItem>
          <Link href="/docs/getting-started">Getting Started</Link>
        </ListItem>
        <ListItem>
          <Link href="/docs/install">Install</Link>
        </ListItem>
        <ListItem>
          <Typography>Examples</Typography>
        </ListItem>
        <ListItem>
          <Link href="/docs/examples/basic">Basic</Link>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideBar;
