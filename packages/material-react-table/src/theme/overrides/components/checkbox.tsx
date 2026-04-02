import { type Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export function checkbox(theme: Theme) {
  return {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
  };
}
