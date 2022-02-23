import { FC } from 'react';
import {
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  styled,
  Toolbar as MuiToolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const AppBar = styled(MuiAppBar)({
  zIndex: 2,
});

const Toolbar = styled(MuiToolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const Flex = styled('div')({
  display: 'flex',
  alignItems: 'center',
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

  return (
    <AppBar position="fixed">
      <Toolbar variant={isMobile ? 'dense' : 'regular'}>
        <Flex>
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
          <Typography
            style={{ fontSize: isMobile ? '1.6rem' : undefined }}
            variant="h1"
          >
            Material React Table
          </Typography>
        </Flex>
        <Flex>
          <Tooltip arrow title="Toggle Light/Dark Mode">
            <IconButton
              aria-label="Toggle Light/Dark Mode"
              onClick={() => setDarkTheme(!darkTheme)}
            >
              {darkTheme ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
        </Flex>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
