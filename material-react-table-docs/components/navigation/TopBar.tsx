import { FC } from 'react';
import {
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  styled,
  Toolbar as MuiToolbar,
  Typography,
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
});

const IconButton = styled(MuiIconButton)({
  color: '#fff',
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
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Flex>
          <IconButton onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? (
              <MenuOpenIcon color="inherit" />
            ) : (
              <MenuIcon color="inherit" />
            )}
          </IconButton>
          <Typography
            style={{ fontSize: '2rem', paddingLeft: '1.5rem' }}
            variant="h1"
          >
            Material React Table
          </Typography>
        </Flex>
        <Flex>
          <IconButton onClick={() => setDarkTheme(!darkTheme)}>
            {darkTheme ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Flex>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
