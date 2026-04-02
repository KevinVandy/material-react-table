import {
  buttonGroupClasses,
  type ButtonGroupProps,
} from "@mui/material/ButtonGroup";
import { alpha, type Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

const COLORS = [
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "error",
] as const;

// NEW VARIANT
declare module "@mui/material/ButtonGroup" {
  interface ButtonGroupPropsVariantOverrides {
    soft: true;
  }
}

// ----------------------------------------------------------------------

export function buttonGroup(theme: Theme) {
  const rootStyles = (ownerState: ButtonGroupProps) => {
    const inheritColor = ownerState.color === "inherit";

    const containedVariant = ownerState.variant === "contained";

    const outlinedVariant = ownerState.variant === "outlined";

    const textVariant = ownerState.variant === "text";

    const softVariant = ownerState.variant === "soft";

    const horizontalOrientation = ownerState.orientation === "horizontal";

    const verticalOrientation = ownerState.orientation === "vertical";

    const defaultStyle = {
      [`& .${buttonGroupClasses.grouped}`]: {
        "&:not(:last-of-type)": {
          ...(!outlinedVariant && {
            borderStyle: "solid",
            ...(inheritColor && {
              borderColor: alpha(theme.palette.grey[500], 0.32),
            }),
            // HORIZONTAL
            ...(horizontalOrientation && {
              borderWidth: "0px 1px 0px 0px",
            }),
            // VERTICAL
            ...(verticalOrientation && {
              borderWidth: "0px 0px 1px 0px",
            }),
          }),
        },
      },
    };

    const colorStyle = COLORS.map((color) => ({
      [`& .${buttonGroupClasses.grouped}`]: {
        "&:not(:last-of-type)": {
          ...(!outlinedVariant && {
            ...(ownerState.color === color && {
              // CONTAINED
              ...(containedVariant && {
                borderColor: alpha(theme.palette[color].dark, 0.48),
              }),
              // TEXT
              ...(textVariant && {
                borderColor: alpha(theme.palette[color].main, 0.48),
              }),
              // SOFT
              ...(softVariant && {
                borderColor: alpha(theme.palette[color].dark, 0.24),
              }),
            }),
          }),
        },
      },
    }));

    const disabledState = {
      [`& .${buttonGroupClasses.grouped}`]: {
        [`&.${buttonGroupClasses.disabled}`]: {
          "&:not(:last-of-type)": {
            borderColor: theme.palette.action.disabledBackground,
          },
        },
      },
    };

    return [defaultStyle, ...colorStyle, disabledState];
  };

  return {
    MuiButtonGroup: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonGroupProps }) =>
          rootStyles(ownerState),
      },
    },
  };
}
