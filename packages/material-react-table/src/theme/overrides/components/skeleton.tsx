import { type Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export function skeleton(theme: Theme) {
  return {
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[300],
        },
        rounded: {
          borderRadius: theme.shape.borderRadius,
        },
      },
    },
  };
}
