import { FC, Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  alpha,
  Divider,
  Drawer,
  List,
  ListItem as MuiListItem,
  Link as MuiLink,
  styled,
  useMediaQuery,
} from '@mui/material';
import { routes } from './routes';

const ListItemLevel1 = styled(MuiListItem)(({ theme }) => ({
  color: theme.palette.primary.dark,
  cursor: 'pointer',
  fontSize: '1rem',
  height: '2.5rem',
  padding: '0',
  transition: 'all .3s ease',
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

const ListItemLevel2 = styled(ListItemLevel1)({
  '> a': {
    paddingLeft: '2rem',
  },
});

const ListItemLevel3 = styled(ListItemLevel2)({
  '> a': {
    paddingLeft: '3rem',
  },
});

const ListItemHeaderLevel1 = styled(MuiListItem)(({ theme }) => ({
  cursor: 'pointer',
  fontSize: '1.25rem',
  height: '2.5rem',
  padding: '0',
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
  fontSize: '1rem',
  '> a': {
    paddingLeft: '2rem',
  },
}));

const MenuLink = styled(MuiLink)({
  color: 'inherit',
  textDecoration: 'none',
  display: 'block',
  padding: '0.6rem 1rem',
  height: '100%',
  width: '100%',
});

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
        {routes.map(({ href: href1, items: items1, label: label1 }) => {
          if (items1?.length) {
            return (
              <Fragment key={label1}>
                <li>
                  <Divider />
                </li>
                <Link href={href1 ?? ''} passHref>
                  <ListItemHeaderLevel1>
                    <Link href={href1 ?? ''} passHref>
                      <MenuLink>{label1}</MenuLink>
                    </Link>
                  </ListItemHeaderLevel1>
                </Link>
                {items1?.map(
                  ({ href: href2, label: label2, items: items2 }: any) => {
                    if (items2?.length) {
                      return (
                        <Fragment key={label2}>
                          <ListItemHeaderLevel2>
                            <Link href={href2 ?? ''} passHref>
                              <MenuLink>{label2}</MenuLink>
                            </Link>
                          </ListItemHeaderLevel2>
                          {items2?.map(({ href: href3, label: label3 }) => {
                            return (
                              <ListItemLevel3
                                onClick={handleCloseMenu}
                                selected={pathname === href3}
                                key={label3}
                              >
                                <Link href={href3 ?? ''} passHref>
                                  <MenuLink>{label3}</MenuLink>
                                </Link>
                              </ListItemLevel3>
                            );
                          })}
                        </Fragment>
                      );
                    }
                    return (
                      <ListItemLevel2
                        onClick={handleCloseMenu}
                        selected={pathname === href2}
                        key={label2}
                      >
                        <Link href={href2 ?? ''} passHref>
                          <MenuLink>{label2}</MenuLink>
                        </Link>
                      </ListItemLevel2>
                    );
                  },
                )}
              </Fragment>
            );
          } else {
            return (
              <ListItemLevel1
                onClick={handleCloseMenu}
                selected={pathname === href1}
                key={label1}
              >
                <Link href={href1 ?? ''} passHref>
                  <MenuLink>{label1}</MenuLink>
                </Link>
              </ListItemLevel1>
            );
          }
        })}
      </List>
    </Drawer>
  );
};

export default SideBar;
