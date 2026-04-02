import { type Theme, alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export function paper(theme: Theme) {
  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        outlined: {
          borderColor: alpha(theme.palette.grey[500], 0.16),
        },
      },
    },
  };
}
