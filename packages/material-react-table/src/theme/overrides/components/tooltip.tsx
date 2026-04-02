import { type Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export function tooltip(theme: Theme) {
  const lightMode = theme.palette.mode === "light";

  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.grey[lightMode ? 800 : 700],
        },
        arrow: {
          color: theme.palette.grey[lightMode ? 800 : 700],
        },
      },
    },
    defaultProps: {
      slotProps: {
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -16],
              },
            },
          ],
        },
      },
    },
  };
}
