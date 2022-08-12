import { FC, useEffect } from 'react';
import Link from 'next/link';
import {
  AppBar as MuiAppBar,
  Box,
  IconButton as MuiIconButton,
  styled,
  Toolbar as MuiToolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import Image from 'next/image';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import docsearch from '@docsearch/js';
import '@docsearch/css';

const AppBar = styled(MuiAppBar)({
  zIndex: 5,
});

const Toolbar = styled(MuiToolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const Flex = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
});

const IconButton = styled(MuiIconButton)({
  color: '#fff',
  height: '3rem',
  width: '3rem',
});

interface Props {
  isLightTheme: boolean;
  navOpen: boolean;
  setIsLightTheme: (isLightTheme: boolean) => void;
  setNavOpen: (navOpen: boolean) => void;
}

const TopBar: FC<Props> = ({
  isLightTheme,
  navOpen,
  setIsLightTheme,
  setNavOpen,
}) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');
  const isDesktop = useMediaQuery('(min-width: 1500px)');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      docsearch({
        appId: '1W9SWN5ZAH',
        apiKey: '680b219eaef484622046bf76cef8544a',
        indexName: 'material-react-table',
        container: '#docsearch',
      });
    }
  }, []);

  return (
    <AppBar position="fixed">
      <Toolbar variant={isTablet ? 'dense' : 'regular'}>
        <Flex>
          {!isDesktop && (
            <IconButton
              aria-label="Open nav menu"
              onClick={() => setNavOpen(!navOpen)}
            >
              {navOpen ? (
                <MenuOpenIcon color="inherit" />
              ) : (
                <MenuIcon color="inherit" />
              )}
            </IconButton>
          )}
          <Link href="/" passHref>
            <Typography
              sx={{
                alignItems: 'center',
                cursor: 'pointer',
                display: 'flex',
                fontSize: isTablet ? '1.6rem' : undefined,
                gap: '1rem',
              }}
              variant="h1"
            >
              <Image
                alt="MRT logo"
                src="/mrt_logo.svg"
                height={50}
                width={50}
              />
              {!isMobile && 'Material React Table'}
            </Typography>
          </Link>
        </Flex>
        <Box
          id="docsearch"
          sx={{ display: 'grid', width: !isTablet ? '250px' : undefined }}
        />
        <Flex>
          <Tooltip arrow title="Github">
            <a
              href="https://github.com/KevinVandy/material-react-table"
              rel="noreferrer"
              target="_blank"
            >
              <IconButton
                aria-label="Github"
                size={isMobile ? 'small' : 'large'}
              >
                <GitHubIcon fontSize={isMobile ? 'medium' : 'large'} />
              </IconButton>
            </a>
          </Tooltip>
          <Tooltip arrow title="Discord">
            <a
              href="https://discord.gg/5wqyRx6fnm"
              rel="noreferrer"
              target="_blank"
            >
              <IconButton
                aria-label="Discord"
                size={isMobile ? 'small' : 'large'}
              >
                <img
                  alt="Discord"
                  height={isMobile ? 20 : 25}
                  style={{
                    padding: '-3px',
                    borderRadius: '50%',
                  }}
                  src="/Discord-Logo-White.svg"
                />
              </IconButton>
            </a>
          </Tooltip>
          <Tooltip arrow title="Toggle Light/Dark Mode">
            <IconButton
              aria-label="Toggle Light/Dark Mode"
              onClick={() => setIsLightTheme(!isLightTheme)}
              size={isMobile ? 'small' : 'large'}
            >
              {isLightTheme ? (
                <LightModeIcon fontSize={isMobile ? 'medium' : 'large'} />
              ) : (
                <DarkModeIcon fontSize={isMobile ? 'medium' : 'large'} />
              )}
            </IconButton>
          </Tooltip>
        </Flex>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
