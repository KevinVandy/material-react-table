import { type Theme } from '@mui/material/styles';

import { menuItem } from '../../css';
import { Components } from '@mui/material';

// ----------------------------------------------------------------------

export function menu(theme: Theme): Components {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...menuItem(theme),
        },
      },
    },
  };
}
