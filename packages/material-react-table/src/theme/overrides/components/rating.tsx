import { ratingClasses } from "@mui/material/Rating";
import { alpha, type Theme } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";

// ----------------------------------------------------------------------

export function rating(theme: Theme) {
  return {
    MuiRating: {
      styleOverrides: {
        root: {
          [`&.${ratingClasses.disabled}`]: {
            opacity: 0.48,
          },
        },
        iconEmpty: {
          color: alpha(theme.palette.grey[500], 0.48),
        },
        sizeSmall: {
          [`& .${svgIconClasses.root}`]: {
            width: 20,
            height: 20,
          },
        },
        sizeMedium: {
          [`& .${svgIconClasses.root}`]: {
            width: 24,
            height: 24,
          },
        },
        sizeLarge: {
          [`& .${svgIconClasses.root}`]: {
            width: 28,
            height: 28,
          },
        },
      },
    },
  };
}
