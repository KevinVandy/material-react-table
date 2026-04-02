import { chipClasses, type ChipProps } from "@mui/material/Chip";
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
declare module "@mui/material/Chip" {
  interface ChipPropsVariantOverrides {
    soft: true;
  }
}

// ----------------------------------------------------------------------

export function chip(theme: Theme) {
  const lightMode = theme.palette.mode === "light";

  const rootStyles = (ownerState: ChipProps) => {
    const defaultColor = ownerState.color === "default";

    const filledVariant = ownerState.variant === "filled";

    const outlinedVariant = ownerState.variant === "outlined";

    const softVariant = ownerState.variant === "soft";

    const defaultStyle = {
      [`& .${chipClasses.deleteIcon}`]: {
        opacity: 0.48,
        color: "currentColor",
        "&:hover": {
          opacity: 1,
          color: "currentColor",
        },
      },

      ...(defaultColor && {
        [`& .${chipClasses.avatar}`]: {
          color: theme.palette.text.primary,
        },
        // FILLED
        ...(filledVariant && {
          color: lightMode
            ? theme.palette.common.white
            : theme.palette.grey[800],
          backgroundColor: theme.palette.text.primary,
          "&:hover": {
            backgroundColor: lightMode
              ? theme.palette.grey[700]
              : theme.palette.grey[100],
          },
          [`& .${chipClasses.icon}`]: {
            color: lightMode
              ? theme.palette.common.white
              : theme.palette.grey[800],
          },
        }),
        // OUTLINED
        ...(outlinedVariant && {
          border: `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
        }),
        // SOFT
        ...(softVariant && {
          color: theme.palette.text.primary,
          backgroundColor: alpha(theme.palette.grey[500], 0.16),
          "&:hover": {
            backgroundColor: alpha(theme.palette.grey[500], 0.32),
          },
        }),
      }),
    };

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.color === color && {
        [`& .${chipClasses.avatar}`]: {
          color: theme.palette[color].lighter,
          backgroundColor: theme.palette[color].dark,
        },
        // SOFT
        ...(softVariant && {
          color: theme.palette[color][lightMode ? "dark" : "light"],
          backgroundColor: alpha(theme.palette[color].main, 0.16),
          "&:hover": {
            backgroundColor: alpha(theme.palette[color].main, 0.32),
          },
        }),
      }),
    }));

    const disabledState = {
      [`&.${chipClasses.disabled}`]: {
        opacity: 1,
        color: theme.palette.action.disabled,
        [`& .${chipClasses.icon}`]: {
          color: theme.palette.action.disabled,
        },
        [`& .${chipClasses.avatar}`]: {
          color: theme.palette.action.disabled,
          backgroundColor: theme.palette.action.disabledBackground,
        },
        // FILLED
        ...(filledVariant && {
          backgroundColor: theme.palette.action.disabledBackground,
        }),
        // OUTLINED
        ...(outlinedVariant && {
          borderColor: theme.palette.action.disabledBackground,
        }),
        // SOFT
        ...(softVariant && {
          backgroundColor: theme.palette.action.disabledBackground,
        }),
      },
    };

    return [
      defaultStyle,
      ...colorStyle,
      disabledState,
      {
        fontWeight: 500,
        borderRadius: theme.shape.borderRadius,
      },
    ];
  };

  return {
    MuiChip: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: ChipProps }) =>
          rootStyles(ownerState),
      },
    },
  };
}
