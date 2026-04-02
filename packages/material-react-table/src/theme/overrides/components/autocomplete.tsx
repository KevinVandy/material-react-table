import { autocompleteClasses } from '@mui/material/Autocomplete';
import { alpha, type Theme } from '@mui/material/styles';
import { svgIconClasses } from '@mui/material/SvgIcon';

import { menuItem, paper } from '../../css';
import { Components } from '@mui/material';

// ----------------------------------------------------------------------

export function autocomplete(theme: Theme): Components {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          [`& span.${autocompleteClasses.tag}`]: {
            ...theme.typography.subtitle2,
            height: 24,
            minWidth: 24,
            lineHeight: '24px',
            textAlign: 'center',
            padding: theme.spacing(0, 0.75),
            color: theme.palette.text.secondary,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.grey[500], 0.16),
          },
        },
        paper: {
          ...paper({ theme, dropdown: true }),
        },
        listbox: {
          padding: 0,
          [`& .${autocompleteClasses.option}`]: {
            ...menuItem(theme),
          },
        },
        endAdornment: {
          [`& .${svgIconClasses.root}`]: {
            width: 18,
            height: 18,
          },
        },
      },
    },
  };
}
