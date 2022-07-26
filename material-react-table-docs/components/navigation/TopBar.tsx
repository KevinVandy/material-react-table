import { FC } from 'react';
import Link from 'next/link';
import {
  AppBar as MuiAppBar,
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
  gap: '0.5rem',
});

const IconButton = styled(MuiIconButton)({
  color: '#fff',
  height: '3rem',
  width: '3rem',
});

interface Props {
  darkTheme: boolean;
  navOpen: boolean;
  setDarkTheme: (darkTheme: boolean) => void;
  setNavOpen: (navOpen: boolean) => void;
}

const TopBar: FC<Props> = ({
  darkTheme,
  navOpen,
  setDarkTheme,
  setNavOpen,
}) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');
  const isDesktop = useMediaQuery('(min-width: 1500px)');

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
              {!isMobile && (
                <Image
                  alt="MRT logo"
                  src="/mrt_logo.svg"
                  height={50}
                  width={50}
                />
              )}
              {isMobile ? 'MRT' : 'Material React Table'}
            </Typography>
          </Link>
        </Flex>
        <Flex>
          <Tooltip arrow title="Github">
            <a
              href="https://github.com/KevinVandy/material-react-table"
              rel="noreferrer"
              target="_blank"
            >
              <IconButton aria-label="Github">
                <GitHubIcon fontSize="large" />
              </IconButton>
            </a>
          </Tooltip>
          <Tooltip arrow title="Discord">
            <a
              href="https://discord.gg/5wqyRx6fnm"
              rel="noreferrer"
              target="_blank"
            >
              <IconButton aria-label="Discord">
                <img
                  alt="Discord"
                  height={25}
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
              onClick={() => setDarkTheme(!darkTheme)}
            >
              {darkTheme ? (
                <DarkModeIcon fontSize="large" />
              ) : (
                <LightModeIcon fontSize="large" />
              )}
            </IconButton>
          </Tooltip>
        </Flex>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
