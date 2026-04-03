import { type Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function treeView(theme: Theme): Record<string, unknown> {
  return {
    MuiTreeItem: {
      styleOverrides: {
        label: {
          ...theme.typography.body2,
        },
        iconContainer: {
          width: 'auto',
        },
      },
    },
  };
}
