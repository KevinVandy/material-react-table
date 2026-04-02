import { Components } from '@mui/material';
import { type Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function radio(theme: Theme): Components {
  return {
    // CHECKBOX, RADIO, SWITCH
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          ...theme.typography.body2,
        },
      },
    },

    MuiRadio: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
  };
}
