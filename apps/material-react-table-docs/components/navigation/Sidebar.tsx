import { Drawer, List, useMediaQuery } from '@mui/material';
import { SideBarItems } from './SidebarItems';
import { routes } from './routes';

interface Props {
  navOpen: boolean;
  setNavOpen: (navOpen: boolean) => void;
}

export const SideBar = ({ navOpen, setNavOpen }: Props) => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  return (
    <Drawer
      // @ts-ignore
      PaperProps={{ component: 'aside' }}
      open={navOpen}
      onClose={() => setNavOpen(false)}
      variant={isMobile ? 'temporary' : 'permanent'}
      sx={{
        zIndex: 4,
        position: 'relative',
      }}
    >
      <List
        sx={{
          overflow: 'visible',
          overflowY: navOpen ? 'overlay' : 'hidden',
          mt: '52px',
          p: 0,
          pb: '10rem',
          scrollPaddingTop: '20%',
          transition: 'all .2s',
          width: navOpen ? '300px' : 0,
          '@media (max-width: 900px)': {
            mt: '50px',
          },
        }}
      >
        <SideBarItems routes={routes} setNavOpen={setNavOpen} />
      </List>
    </Drawer>
  );
};
