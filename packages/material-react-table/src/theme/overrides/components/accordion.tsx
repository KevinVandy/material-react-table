import type { Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export function accordion(theme: Theme) {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: `solid 1px ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          "&:before": {
            display: "none",
          },
          "&.Mui-expanded": {
            margin: 0,
          },
        },
      },
    },
  };
}
