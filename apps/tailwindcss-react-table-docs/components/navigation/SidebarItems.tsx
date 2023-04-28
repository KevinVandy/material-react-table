import { Fragment, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { alpha, ListItemButton, useMediaQuery, Box } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { RouteItem } from './routes';

interface Props {
  depth?: number;
  routes: RouteItem[];
  setNavOpen: (navOpen: boolean) => void;
}

export const SideBarItems = ({ depth = 1, routes, setNavOpen }: Props) => {
  const { pathname } = useRouter();
  const isMobile = useMediaQuery('(max-width: 900px)');

  const handleCloseMenu = () => {
    if (isMobile) setTimeout(() => setNavOpen(false), 200);
  };

  const selectedItemRef = useCallback((node, selected) => {
    if (node && selected) {
      node.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      {routes.map(({ href, items, label, divider, external }) => (
        <Fragment key={label}>
          <Link href={href} target={external ? '_blank' : undefined}>
            <ListItemButton
              divider={divider}
              selected={pathname === href}
              ref={(node) => selectedItemRef(node, pathname === href)}
              onClick={handleCloseMenu}
              sx={(theme) => ({
                color: !items
                  ? theme.palette.mode === 'dark'
                    ? theme.palette.primary.main
                    : theme.palette.primary.dark
                  : depth === 1
                  ? theme.palette.text.primary
                  : theme.palette.text.secondary,
                fontSize: !items ? '0.9rem' : depth === 1 ? '1.25rem' : '1rem',
                height: items ? '2.5rem' : '2rem',
                lineHeight: depth === 0 && !items ? '1.25rem' : '0.75rem',
                padding: '0',
                whiteSpace: 'nowrap',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
              })}
            >
              <Box
                sx={{
                  ml: `${depth}rem`,
                }}
              >
                {label}
                {external && (
                  <LaunchIcon fontSize="small" sx={{ m: '-0.25rem 4px' }} />
                )}
              </Box>
            </ListItemButton>
          </Link>
          {items && (
            <SideBarItems
              routes={items}
              depth={depth + 1}
              setNavOpen={setNavOpen}
            />
          )}
        </Fragment>
      ))}
    </>
  );
};
