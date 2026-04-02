import { fabClasses, type FabProps } from "@mui/material/Fab";
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
declare module "@mui/material/Fab" {
  interface FabPropsVariantOverrides {
    outlined: true;
    outlinedExtended: true;
    soft: true;
    softExtended: true;
  }
}

// ----------------------------------------------------------------------

export function fab(theme: Theme) {
  const lightMode = theme.palette.mode === "light";

  const rootStyles = (ownerState: FabProps) => {
    const defaultColor = ownerState.color === "default";

    const inheritColor = ownerState.color === "inherit";

    const circularVariant = ownerState.variant === "circular";

    const extendedVariant = ownerState.variant === "extended";

    const outlinedVariant = ownerState.variant === "outlined";

    const outlinedExtendedVariant = ownerState.variant === "outlinedExtended";

    const softVariant = ownerState.variant === "soft";

    const softExtendedVariant = ownerState.variant === "softExtended";

    const defaultStyle = {
      "&:hover, &:active": {
        boxShadow: "none",
      },
      // FILLED
      ...((circularVariant || extendedVariant) && {
        ...((defaultColor || inheritColor) && {
          boxShadow: theme.customShadows.z8,
        }),
        ...(inheritColor && {
          backgroundColor: theme.palette.text.primary,
          color: lightMode
            ? theme.palette.common.white
            : theme.palette.grey[800],
          "&:hover": {
            backgroundColor: lightMode
              ? theme.palette.grey[700]
              : theme.palette.grey[400],
          },
        }),
      }),
      // OUTLINED
      ...((outlinedVariant || outlinedExtendedVariant) && {
        boxShadow: "none",
        backgroundColor: "transparent",
        ...((defaultColor || inheritColor) && {
          border: `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
        }),
        ...(defaultColor && {
          ...(!lightMode && {
            color: theme.palette.text.secondary,
          }),
        }),

        "&:hover": {
          borderColor: "currentColor",
          boxShadow: "0 0 0 0.5px currentColor",
          backgroundColor: theme.palette.action.hover,
        },
      }),
      // SOFT
      ...((softVariant || softExtendedVariant) && {
        boxShadow: "none",
        ...(defaultColor && {
          color: theme.palette.grey[800],
          backgroundColor: theme.palette.grey[300],
          "&:hover": {
            backgroundColor: theme.palette.grey[400],
          },
        }),
        ...(inheritColor && {
          backgroundColor: alpha(theme.palette.grey[500], 0.08),
          "&:hover": {
            backgroundColor: alpha(theme.palette.grey[500], 0.24),
          },
        }),
      }),
    };

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.color === color && {
        // FILLED
        ...((circularVariant || extendedVariant) && {
          boxShadow: theme.customShadows[color],
          "&:hover": {
            backgroundColor: theme.palette[color].dark,
          },
        }),
        // OUTLINED
        ...((outlinedVariant || outlinedExtendedVariant) && {
          color: theme.palette[color].main,
          border: `solid 1px ${alpha(theme.palette[color].main, 0.48)}`,
          "&:hover": {
            backgroundColor: alpha(theme.palette[color].main, 0.08),
          },
        }),
        // SOFT
        ...((softVariant || softExtendedVariant) && {
          color: theme.palette[color][lightMode ? "dark" : "light"],
          backgroundColor: alpha(theme.palette[color].main, 0.16),
          "&:hover": {
            backgroundColor: alpha(theme.palette[color].main, 0.32),
          },
        }),
      }),
    }));

    const disabledState = {
      [`&.${fabClasses.disabled}`]: {
        ...((outlinedVariant || outlinedExtendedVariant) && {
          backgroundColor: "transparent",
          border: `solid 1px ${theme.palette.action.disabledBackground}`,
        }),
      },
    };

    const size = {
      ...((extendedVariant ||
        outlinedExtendedVariant ||
        softExtendedVariant) && {
        width: "auto",
        "& svg": {
          marginRight: theme.spacing(1),
        },
        ...(ownerState.size === "small" && {
          height: 34,
          minHeight: 34,
          borderRadius: 17,
          padding: theme.spacing(0, 1),
        }),
        ...(ownerState.size === "medium" && {
          height: 40,
          minHeight: 40,
          borderRadius: 20,
          padding: theme.spacing(0, 2),
        }),
        ...(ownerState.size === "large" && {
          height: 48,
          minHeight: 48,
          borderRadius: 24,
          padding: theme.spacing(0, 2),
        }),
      }),
    };

    return [defaultStyle, ...colorStyle, disabledState, size];
  };

  return {
    MuiFab: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: FabProps }) =>
          rootStyles(ownerState),
      },
    },
  };
}
